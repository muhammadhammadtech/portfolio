const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);
const recipient = 'mohammadhammad.tech@gmail.com';

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(500).json({ success: false, error: 'Only POST requests are supported.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const fullName = String(body.fullName || '').trim();
    const email = String(body.email || '').trim();
    const helpNeeded = String(body.helpNeeded || '').trim();
    const message = String(body.message || '').trim();

    if (!fullName || !email || !message) {
      return res.status(500).json({ success: false, error: 'Please complete your name, email, and message.' });
    }

    const { error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [recipient],
      subject: `New Contact Form Submission from ${fullName}`,
      text: [
        `Full Name: ${fullName}`,
        `Email: ${email}`,
        `What they need help with: ${helpNeeded || 'Not provided'}`,
        '',
        'Message:',
        message
      ].join('\n')
    });

    if (error) {
      return res.status(500).json({ success: false, error: error.message || 'Unable to send your message.' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message || 'Unable to send your message.' });
  }
};
