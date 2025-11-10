# Deployment Guide

This guide explains how to deploy the portfolio frontend and backend separately.

## Architecture

- **Frontend**: React + Vite (deployed on Vercel/Netlify)
- **Backend**: Express.js API server (deployed on Railway)

## Backend Deployment (Railway)

### Prerequisites
1. Railway account (sign up at [railway.app](https://railway.app))
2. Hugging Face API token

### Step 1: Prepare Backend for Railway

The backend is already configured for production. Make sure you have:
- `server.js` - Backend server file
- `package.json` - Dependencies
- `railway.json` - Railway configuration (already created)

### Step 2: Deploy to Railway

1. **Create a new project on Railway:**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo" (recommended) or "Empty Project"

2. **If using GitHub:**
   - Connect your GitHub account
   - Select your portfolio repository
   - Railway will detect the project automatically

3. **Configure Environment Variables:**
   - In Railway dashboard, go to your service
   - Click on "Variables" tab
   - Add the following environment variables:
     ```
     HF_TOKEN=your_huggingface_token_here
     NODE_ENV=production
     FRONTEND_URL=https://your-frontend-domain.com
     PORT=3001 (optional, Railway will auto-assign)
     ```

4. **Configure Build Settings:**
   - Railway should auto-detect Node.js
   - Start Command: `npm run start` (already configured in railway.json)
   - Root Directory: `/` (root of your repo)

5. **Deploy:**
   - Railway will automatically build and deploy
   - Wait for deployment to complete
   - Copy the generated URL (e.g., `https://your-app.railway.app`)

### Step 3: Get Backend URL

After deployment, Railway will provide a URL like:
```
https://your-backend-name.railway.app
```

Copy this URL - you'll need it for the frontend configuration.

## Frontend Deployment (Vercel/Netlify)

### Step 1: Update Frontend Environment Variables

Before deploying the frontend, you need to set the backend API URL.

#### For Vercel:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add:
   ```
   VITE_API_URL=https://your-backend-name.railway.app
   ```

#### For Netlify:
1. Go to Site settings
2. Navigate to "Environment variables"
3. Add:
   ```
   VITE_API_URL=https://your-backend-name.railway.app
   ```

### Step 2: Deploy Frontend

Deploy your frontend as usual. The frontend will automatically use the `VITE_API_URL` environment variable to connect to your Railway backend.

## Local Development

For local development, create a `.env` file in the root directory:

```env
# Backend (.env in root)
HF_TOKEN=your_huggingface_token_here
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
PORT=3001

# Frontend (.env in root - for Vite)
VITE_API_URL=http://localhost:3001
```

Then run:
```bash
# Run both frontend and backend
npm run dev:all

# Or run separately
npm run dev:server  # Backend only
npm run dev         # Frontend only
```

## Testing the Deployment

1. **Test Backend Health:**
   ```
   curl https://your-backend-name.railway.app/api/health
   ```
   Should return: `{"status":"ok","message":"Chat API server is running"}`

2. **Test Frontend:**
   - Visit your frontend URL
   - Open the chatbot
   - Send a test message
   - Check browser console for any errors

## Troubleshooting

### Backend Issues

1. **CORS Errors:**
   - Make sure `FRONTEND_URL` environment variable is set correctly in Railway
   - Check that your frontend URL matches exactly (including https://)

2. **API Token Issues:**
   - Verify `HF_TOKEN` is set in Railway environment variables
   - Check Railway logs for authentication errors

3. **Port Issues:**
   - Railway automatically assigns a port via `PORT` environment variable
   - Don't hardcode port numbers

### Frontend Issues

1. **API Connection Errors:**
   - Verify `VITE_API_URL` is set correctly
   - Check that backend URL is accessible
   - Ensure CORS is configured properly on backend

2. **Environment Variables Not Working:**
   - Vite requires `VITE_` prefix for environment variables
   - Rebuild frontend after changing environment variables

## Production Checklist

- [ ] Backend deployed on Railway
- [ ] `HF_TOKEN` set in Railway
- [ ] `FRONTEND_URL` set in Railway
- [ ] Backend URL copied
- [ ] `VITE_API_URL` set in frontend deployment platform
- [ ] Frontend deployed
- [ ] Health check endpoint working
- [ ] Chatbot tested and working

## Support

If you encounter issues:
1. Check Railway logs: Railway Dashboard → Your Service → Deployments → View Logs
2. Check browser console for frontend errors
3. Verify all environment variables are set correctly
4. Test backend health endpoint

