/**
 * @copyright 2024 codewithmutahir
 *  @license   Apache-2.0
 * @fileoverview Backend API server for chatbot - keeps API tokens secure
 */

/* eslint-env node */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration - allow frontend URL in production
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());

// Chat API Proxy Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    const HF_TOKEN = process.env.HF_TOKEN;

    if (!HF_TOKEN) {
      return res.status(500).json({ 
        error: 'Server configuration error: Hugging Face token not set' 
      });
    }

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ 
        error: 'Invalid request: messages array is required' 
      });
    }

    const response = await fetch(
      'https://router.huggingface.co/v1/chat/completions',
      {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          model: 'openchat/openchat-3.6-8b-20240522:featherless-ai',
          messages: messages,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return res.status(response.status).json({ 
        error: errorData.error || 'API request failed',
        status: response.status 
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Chat API server is running' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Chat API server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  if (process.env.FRONTEND_URL) {
    console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL}`);
  }
});

