# 🚀 FlightBooker Deployment Guide

## Free Hosting Options

### Option 1: Vercel + Render + MongoDB Atlas (Recommended)

#### 1. Database Setup (MongoDB Atlas - Free)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/flights_booking`

#### 2. Backend Deployment (Render - Free)
1. Go to [Render](https://render.com)
2. Create a free account
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: `flights-booking-backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Generate a random secret (e.g., `openssl rand -base64 32`)
   - `NODE_ENV`: `production`
   - `PORT`: `10000`
7. Deploy!

#### 3. Frontend Deployment (Vercel - Free)
1. Go to [Vercel](https://vercel.com)
2. Create a free account (GitHub integration)
3. Import your repository
4. Configure:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variable:
   - `VITE_API_URL`: Your Render backend URL (e.g., `https://your-backend.onrender.com/api`)
6. Deploy!

### Option 2: Netlify + Railway + MongoDB Atlas

#### Backend (Railway - Free)
1. Go to [Railway](https://railway.app)
2. Connect GitHub
3. Add your backend repo
4. Set build/start commands
5. Add environment variables

#### Frontend (Netlify - Free)
1. Go to [Netlify](https://netlify.com)
2. Drag & drop the `frontend/dist` folder after building locally
3. Or connect GitHub for auto-deployment

## Environment Variables Needed

### Backend (.env)
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_here
NODE_ENV=production
PORT=5000
```

### Frontend (.env.local)
```
VITE_API_URL=https://your-backend-url.com/api
```

## Quick Deploy Commands

```bash
# Build frontend for manual deployment
cd frontend
npm run build

# The dist/ folder can be deployed to any static host
```

## Live URLs

After deployment, update your frontend's `VITE_API_URL` with the backend URL.

## Free Tiers Summary

- **MongoDB Atlas**: 512MB free
- **Render**: 750 hours/month free
- **Vercel**: Unlimited static sites
- **Railway**: $5/month credit
- **Netlify**: 100GB bandwidth/month

## Need Help?

If you encounter issues, check:
1. Environment variables are set correctly
2. MongoDB IP whitelist includes `0.0.0.0/0`
3. CORS settings allow your frontend domain
4. Backend port is set to 10000 (Render requirement)