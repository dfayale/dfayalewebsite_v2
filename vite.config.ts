
  import { defineConfig, loadEnv } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';
  import crypto from 'crypto';

  export default defineConfig(async ({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const notionApiKey = env.NOTION_API_KEY || process.env.NOTION_API_KEY;
    const notionDatabaseId =
      env.NOTION_DATABASE_ID || process.env.NOTION_DATABASE_ID;
    const tailwindcss = (await import('@tailwindcss/vite')).default;

    return {
    plugins: [
      tailwindcss(),
      react(),
      {
        name: 'notion-proxy',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (!req.url?.startsWith('/api/notion/query')) {
              next();
              return;
            }

            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Method not allowed' }));
              return;
            }

            if (!notionApiKey) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  error: 'Missing NOTION_API_KEY',
                })
              );
              return;
            }

            const requestUrl = new URL(req.url, 'http://localhost');
            const databaseIdParam = requestUrl.searchParams.get('databaseId');
            const databaseId = databaseIdParam || notionDatabaseId;

            if (!databaseId) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  error: 'Missing NOTION_DATABASE_ID',
                })
              );
              return;
            }

            let body = '';
            req.on('data', (chunk) => {
              body += chunk.toString();
            });

            req.on('end', async () => {
              try {
                const parsedBody = body ? JSON.parse(body) : {};

                const dbResponse = await fetch(
                  `https://api.notion.com/v1/databases/${databaseId}`,
                  {
                    method: 'GET',
                    headers: {
                      Authorization: `Bearer ${notionApiKey}`,
                      'Notion-Version': '2025-09-03',
                    },
                  }
                );

                if (!dbResponse.ok) {
                  const dbError = await dbResponse.text();
                  res.statusCode = dbResponse.status;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(dbError);
                  return;
                }

                const dbData = await dbResponse.json();
                const dataSourceId = dbData?.data_sources?.[0]?.id;

                if (!dataSourceId) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(
                    JSON.stringify({
                      error:
                        'No data_sources found. Ensure this is a regular database (not linked/wiki) and shared with the integration.',
                    })
                  );
                  return;
                }

                const response = await fetch(
                  `https://api.notion.com/v1/data_sources/${dataSourceId}/query`,
                  {
                    method: 'POST',
                    headers: {
                      Authorization: `Bearer ${notionApiKey}`,
                      'Notion-Version': '2025-09-03',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(parsedBody),
                  }
                );

                const data = await response.text();
                res.statusCode = response.status;
                res.setHeader('Content-Type', 'application/json');
                res.end(data);
              } catch (error) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(
                  JSON.stringify({
                    error: error instanceof Error ? error.message : 'Unknown error',
                  })
                );
              }
            });
          });
        },
      },
      {
        name: 'mailchimp-proxy',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (!req.url?.startsWith('/api/mailchimp/subscribe')) {
              next();
              return;
            }

            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Method not allowed' }));
              return;
            }

            const apiKey =
              env.MAILCHIMP_API_KEY || process.env.MAILCHIMP_API_KEY;
            const audienceId =
              env.MAILCHIMP_AUDIENCE_ID || process.env.MAILCHIMP_AUDIENCE_ID;
            const serverPrefix =
              env.MAILCHIMP_SERVER_PREFIX ||
              process.env.MAILCHIMP_SERVER_PREFIX;

            if (!apiKey || !audienceId || !serverPrefix) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  error:
                    'Missing Mailchimp environment variables. Please set MAILCHIMP_API_KEY, MAILCHIMP_AUDIENCE_ID, and MAILCHIMP_SERVER_PREFIX.',
                })
              );
              return;
            }

            let body = '';
            req.on('data', (chunk) => {
              body += chunk.toString();
            });

            req.on('end', async () => {
              try {
                const parsedBody = body ? JSON.parse(body) : {};
                const email = parsedBody?.email;

                if (!email || typeof email !== 'string') {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Email is required' }));
                  return;
                }

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Invalid email format' }));
                  return;
                }

                const subscriberHash = crypto
                  .createHash('md5')
                  .update(email.toLowerCase())
                  .digest('hex');

                const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members/${subscriberHash}`;
                const authHeader = `Basic ${Buffer.from(
                  `anystring:${apiKey}`
                ).toString('base64')}`;

                const response = await fetch(url, {
                  method: 'PUT',
                  headers: {
                    Authorization: authHeader,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    email_address: email,
                    status_if_new: 'subscribed',
                    status: 'subscribed',
                  }),
                });

                const data = await response.json();

                if (!response.ok) {
                  if (data?.title === 'Member Exists') {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(
                      JSON.stringify({
                        error:
                          'This email is already subscribed to our newsletter.',
                      })
                    );
                    return;
                  }

                  if (data?.title === 'Invalid Resource') {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: 'Invalid email address.' }));
                    return;
                  }

                  res.statusCode = response.status;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(
                    JSON.stringify({
                      error:
                        data?.detail ||
                        'Failed to subscribe. Please try again.',
                    })
                  );
                  return;
                }

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(
                  JSON.stringify({
                    success: true,
                    message: 'Successfully subscribed to newsletter!',
                    email: data?.email_address || email,
                  })
                );
              } catch (error) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(
                  JSON.stringify({
                    error:
                      error instanceof Error ? error.message : 'Unknown error',
                  })
                );
              }
            });
          });
        },
      },
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        'vaul@1.1.2': 'vaul',
        'sonner@2.0.3': 'sonner',
        'recharts@2.15.2': 'recharts',
        'react-resizable-panels@2.1.7': 'react-resizable-panels',
        'react-hook-form@7.55.0': 'react-hook-form',
        'react-day-picker@8.10.1': 'react-day-picker',
        'next-themes@0.4.6': 'next-themes',
        'lucide-react@0.487.0': 'lucide-react',
        'input-otp@1.4.2': 'input-otp',
        'figma:asset/ffeb47a09533130cdc2895dbc6a985c87e87ffae.png': path.resolve(__dirname, './src/assets/ffeb47a09533130cdc2895dbc6a985c87e87ffae.png'),
        'figma:asset/fe8eb4892c77866d59179faff9a17510b32333bf.png': path.resolve(__dirname, './src/assets/fe8eb4892c77866d59179faff9a17510b32333bf.png'),
        'figma:asset/fdd679b972aec945903e8d5be7ff502d77bd10d2.png': path.resolve(__dirname, './src/assets/fdd679b972aec945903e8d5be7ff502d77bd10d2.png'),
        'figma:asset/e5731f83cab627ec39480198cb839983f187bf76.png': path.resolve(__dirname, './src/assets/e5731f83cab627ec39480198cb839983f187bf76.png'),
        'figma:asset/d07af5e9b6d28faad2812d4cef674d40807934e6.png': path.resolve(__dirname, './src/assets/d07af5e9b6d28faad2812d4cef674d40807934e6.png'),
        'figma:asset/a2dc2673bbe1fd4d2d8362a8c738fbb0c504881e.png': path.resolve(__dirname, './src/assets/a2dc2673bbe1fd4d2d8362a8c738fbb0c504881e.png'),
        'figma:asset/8a422a85905442d01ff9c8145d5e0fc290a802bd.png': path.resolve(__dirname, './src/assets/8a422a85905442d01ff9c8145d5e0fc290a802bd.png'),
        'figma:asset/53f9d5244507cfb64213c506346aef8445307bdd.png': path.resolve(__dirname, './src/assets/53f9d5244507cfb64213c506346aef8445307bdd.png'),
        'figma:asset/4e3a4dc43e3ba06970d5e4b7430d251b9a24a074.png': path.resolve(__dirname, './src/assets/4e3a4dc43e3ba06970d5e4b7430d251b9a24a074.png'),
        'figma:asset/46efdca27ebd5f275f1dc1eb280f00664f4fab52.png': path.resolve(__dirname, './src/assets/46efdca27ebd5f275f1dc1eb280f00664f4fab52.png'),
        'figma:asset/42e107f1e8ebd597108e240a6a90379471bee414.png': path.resolve(__dirname, './src/assets/42e107f1e8ebd597108e240a6a90379471bee414.png'),
        'figma:asset/24e2378ba46a379c969f71ad37215288b7cb2a22.png': path.resolve(__dirname, './src/assets/24e2378ba46a379c969f71ad37215288b7cb2a22.png'),
        'figma:asset/24286423c873abf7f79325eddefcac1ab98d97eb.png': path.resolve(__dirname, './src/assets/24286423c873abf7f79325eddefcac1ab98d97eb.png'),
        'figma:asset/14fc81b44105a3a3564ff22e1b185c6a3d297d63.png': path.resolve(__dirname, './src/assets/14fc81b44105a3a3564ff22e1b185c6a3d297d63.png'),
        'embla-carousel-react@8.6.0': 'embla-carousel-react',
        'cmdk@1.1.1': 'cmdk',
        'class-variance-authority@0.7.1': 'class-variance-authority',
        '@radix-ui/react-tooltip@1.1.8': '@radix-ui/react-tooltip',
        '@radix-ui/react-toggle@1.1.2': '@radix-ui/react-toggle',
        '@radix-ui/react-toggle-group@1.1.2': '@radix-ui/react-toggle-group',
        '@radix-ui/react-tabs@1.1.3': '@radix-ui/react-tabs',
        '@radix-ui/react-switch@1.1.3': '@radix-ui/react-switch',
        '@radix-ui/react-slot@1.1.2': '@radix-ui/react-slot',
        '@radix-ui/react-slider@1.2.3': '@radix-ui/react-slider',
        '@radix-ui/react-separator@1.1.2': '@radix-ui/react-separator',
        '@radix-ui/react-select@2.1.6': '@radix-ui/react-select',
        '@radix-ui/react-scroll-area@1.2.3': '@radix-ui/react-scroll-area',
        '@radix-ui/react-radio-group@1.2.3': '@radix-ui/react-radio-group',
        '@radix-ui/react-progress@1.1.2': '@radix-ui/react-progress',
        '@radix-ui/react-popover@1.1.6': '@radix-ui/react-popover',
        '@radix-ui/react-navigation-menu@1.2.5': '@radix-ui/react-navigation-menu',
        '@radix-ui/react-menubar@1.1.6': '@radix-ui/react-menubar',
        '@radix-ui/react-label@2.1.2': '@radix-ui/react-label',
        '@radix-ui/react-hover-card@1.1.6': '@radix-ui/react-hover-card',
        '@radix-ui/react-dropdown-menu@2.1.6': '@radix-ui/react-dropdown-menu',
        '@radix-ui/react-dialog@1.1.6': '@radix-ui/react-dialog',
        '@radix-ui/react-context-menu@2.2.6': '@radix-ui/react-context-menu',
        '@radix-ui/react-collapsible@1.1.3': '@radix-ui/react-collapsible',
        '@radix-ui/react-checkbox@1.1.4': '@radix-ui/react-checkbox',
        '@radix-ui/react-avatar@1.1.3': '@radix-ui/react-avatar',
        '@radix-ui/react-aspect-ratio@1.1.2': '@radix-ui/react-aspect-ratio',
        '@radix-ui/react-alert-dialog@1.1.6': '@radix-ui/react-alert-dialog',
        '@radix-ui/react-accordion@1.2.3': '@radix-ui/react-accordion',
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'build',
    },
    server: {
      port: 3000,
      open: true,
    },
  };
  });
