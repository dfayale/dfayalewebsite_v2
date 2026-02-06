import crypto from 'crypto';

module.exports = async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Email is required" });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  // Get Mailchimp credentials from environment variables
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX; // e.g., 'us1', 'us6', etc.

  if (!apiKey || !audienceId || !serverPrefix) {
    console.error("Missing Mailchimp environment variables");
    return res.status(500).json({ 
      error: "Server configuration error. Please contact administrator." 
    });
  }

  try {
    // Create subscriber hash (MD5 of lowercase email)
    const subscriberHash = crypto
      .createHash('md5')
      .update(email.toLowerCase())
      .digest('hex');

    // Mailchimp API endpoint to add/update a list member
    const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members/${subscriberHash}`;

    const response = await fetch(url, {
      method: 'PUT', // PUT will create or update
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status_if_new: 'subscribed', // Subscribe immediately (or use 'pending' for double opt-in)
        status: 'subscribed',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Mailchimp API error:', data);
      
      // Handle specific Mailchimp errors
      if (data.title === 'Member Exists') {
        return res.status(400).json({ 
          error: 'This email is already subscribed to our newsletter.' 
        });
      }
      
      if (data.title === 'Invalid Resource') {
        return res.status(400).json({ 
          error: 'Invalid email address.' 
        });
      }

      return res.status(response.status).json({ 
        error: data.detail || 'Failed to subscribe. Please try again.' 
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Successfully subscribed to newsletter!',
      email: data.email_address,
    });

  } catch (error: any) {
    console.error('Error subscribing to Mailchimp:', error);
    return res.status(500).json({ 
      error: 'An error occurred while subscribing. Please try again.' 
    });
  }
};
