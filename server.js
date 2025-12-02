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
  'https://www.mutahir.online',
  'https://mutahir.online',
  'https://mutahir.qzz.io',
  'https://portfolio-git-main-mutahirs-projects.vercel.app',
  process.env.FRONTEND_URL || 'https://portfolio-git-main-mutahirs-projects.vercel.app',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list or if we're in development
    if (allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      console.log(`CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
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

    // Use Groq API (free, fast, no strict rate limits) or Hugging Face as fallback
    const USE_GROQ = process.env.USE_GROQ === 'true' || !HF_TOKEN;
    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    
    if (USE_GROQ && !GROQ_API_KEY) {
      return res.status(500).json({ 
        error: 'Server configuration error: Groq API key not set. Please set GROQ_API_KEY in environment variables.' 
      });
    }

    const API_URL = USE_GROQ 
      ? 'https://api.groq.com/openai/v1/chat/completions'
      : 'https://router.huggingface.co/v1/chat/completions';
    
    const API_KEY = USE_GROQ ? GROQ_API_KEY : HF_TOKEN;
    
    // Groq models: llama-3.1-8b-instant, llama-3.1-70b-versatile, mixtral-8x7b-32768, gemma2-9b-it
    // Using llama-3.1-8b-instant for fast, free responses (similar to OpenChat)
    const MODEL = USE_GROQ
      ? process.env.GROQ_MODEL || 'llama-3.1-8b-instant'
      : 'openchat/openchat-3.6-8b-20240522:featherless-ai';

    const requestBody = USE_GROQ
      ? {
          model: MODEL,
          messages: messages,
          temperature: 0.7,
          max_tokens: 2048,
          top_p: 1,
          stream: false,
        }
      : {
          model: MODEL,
          messages: messages,
        };

    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(requestBody),
    });

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

