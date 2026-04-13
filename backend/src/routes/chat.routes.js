const express = require('express');
const OpenAI = require('openai');
const router = express.Router();

const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

router.post('/', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  try {
    const result = await client.chat.completions.create({
      model: 'openrouter/free',
      messages: [
        { role: 'system', content: 'You are a helpful assistant for a car rental marketplace. Help users with car rentals, bookings, and general questions. Keep responses concise.' },
        { role: 'user', content: message },
      ],
    });
    res.json({ reply: result.choices[0].message.content });
  } catch (err) {
    console.log('FULL ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;