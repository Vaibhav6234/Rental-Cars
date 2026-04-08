const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

router.post('/', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: 'You are a helpful assistant for a car rental marketplace. Help users with car rentals, bookings, and general questions. Keep responses concise.',
    });
    const result = await model.generateContent(message);
    res.json({ reply: result.response.text() });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
});

module.exports = router;
