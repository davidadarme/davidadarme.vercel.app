import type { NextApiRequest, NextApiResponse } from 'next';

const SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.body;

  if (!SECRET_KEY) {
    return res.status(500).json({ success: false, error: 'Secret key is not defined' });
  }

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=${SECRET_KEY}&response=${token}`,
  });

  const data = await response.json();

  if (data.success) {
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false, error: data['error-codes'] });
    console.log('Error:', data['error-codes']);
  }
}