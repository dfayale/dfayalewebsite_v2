/** @type {import('next').NextConfig} */
const isCI = process.env.GITHUB_ACTIONS === 'true';
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] || '';

export default {
    output: 'export',
    images: { unoptimized: true },
    basePath: isCI ? `/${repo}` : '',
    assetPrefix: isCI ? `/${repo}/` : '',
};