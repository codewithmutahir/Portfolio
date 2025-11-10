# Railway Deployment - Quick Start

## Quick Steps to Deploy Backend on Railway

### 1. Sign up / Login to Railway
- Go to [railway.app](https://railway.app)
- Sign up or login with GitHub

### 2. Create New Project
- Click "New Project"
- Select "Deploy from GitHub repo"
- Choose your portfolio repository

### 3. Configure Environment Variables
In Railway dashboard → Your Service → Variables, add:

```
HF_TOKEN=your_huggingface_token_here
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

**Important:** Replace `your-frontend-domain.vercel.app` with your actual frontend URL after you deploy it.

### 4. Railway Auto-Detection
Railway will automatically:
- Detect Node.js
- Install dependencies
- Run `npm run start` (configured in railway.json)

### 5. Get Your Backend URL
After deployment completes:
- Railway will provide a URL like: `https://your-app.railway.app`
- Copy this URL

### 6. Update Frontend Environment Variable
In your frontend deployment (Vercel/Netlify):
- Add environment variable for Production: `VITE_API_PRODUCTION_URL=https://your-app.railway.app`
- Redeploy frontend

### 7. Test
Visit: `https://your-app.railway.app/api/health`
Should return: `{"status":"ok","message":"Chat API server is running"}`

## Troubleshooting

**CORS Errors?**
- Make sure `FRONTEND_URL` in Railway matches your frontend URL exactly
- Include `https://` in the URL

**API Not Working?**
- Check Railway logs: Dashboard → Deployments → View Logs
- Verify `HF_TOKEN` is set correctly
- Test health endpoint first

**Port Issues?**
- Railway auto-assigns port via `PORT` env var
- Don't hardcode ports

## Cost
Railway offers:
- $5 free credit monthly
- Pay-as-you-go after that
- Backend API should be very cheap (likely free tier is enough)

