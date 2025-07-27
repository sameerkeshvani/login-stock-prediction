# 🚀 Deploy to Vercel - Step by Step Guide

## Prerequisites

1. **GitHub Account** - You need a GitHub account
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)

## Step 1: Push to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Stock Prediction App"
   ```

2. **Create a new repository on GitHub**:
   - Go to [github.com](https://github.com)
   - Click "New repository"
   - Name it `stock-prediction-app`
   - Make it public or private
   - Don't initialize with README (we already have one)

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/stock-prediction-app.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy to Vercel

1. **Go to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Sign up/Login with your GitHub account

2. **Create New Project**:
   - Click "New Project"
   - Import your `stock-prediction-app` repository
   - Vercel will automatically detect it's a Next.js project

3. **Configure Project** (Optional):
   - **Framework Preset**: Next.js (should be auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (should be auto-detected)
   - **Output Directory**: `.next` (should be auto-detected)

4. **Environment Variables** (Optional):
   - If you want to add environment variables later:
   - Go to Project Settings → Environment Variables
   - Add any required variables

5. **Deploy**:
   - Click "Deploy"
   - Wait for the build to complete (usually 2-3 minutes)
   - Your app will be live at `https://your-project-name.vercel.app`

## Step 3: Custom Domain (Optional)

1. **Add Custom Domain**:
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow the DNS configuration instructions

## Step 4: Environment Variables (If Needed)

If you need to add environment variables:

1. **Go to Vercel Dashboard**:
   - Select your project
   - Go to Settings → Environment Variables

2. **Add Variables**:
   ```
   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXTAUTH_SECRET=your-production-secret-key
   ```

## Step 5: Verify Deployment

1. **Test Your App**:
   - Visit your deployed URL
   - Test the signup/login flow
   - Test stock predictions
   - Verify all features work

2. **Check Build Logs**:
   - If there are issues, check the build logs in Vercel dashboard
   - Fix any errors and redeploy

## Troubleshooting

### Common Issues:

1. **Build Fails**:
   - Check the build logs in Vercel dashboard
   - Ensure all dependencies are in `package.json`
   - Verify the build command is correct

2. **Environment Variables**:
   - Make sure all required env vars are set in Vercel
   - Check that the variable names match your code

3. **API Routes Not Working**:
   - Verify all API routes are properly exported
   - Check that the file structure is correct

4. **Authentication Issues**:
   - Ensure session cookies work in production
   - Check domain settings

## Features After Deployment

Your deployed app will have:

✅ **130+ Stocks Available** - All major sectors covered  
✅ **AI-Powered Predictions** - Advanced algorithms  
✅ **User Authentication** - Secure signup/login  
✅ **Personalized Dashboard** - User preferences  
✅ **Sector Analysis** - Market sector insights  
✅ **Responsive Design** - Works on all devices  
✅ **Beautiful UI** - Modern, aesthetic design  

## Next Steps

1. **Monitor Performance**:
   - Use Vercel Analytics to track usage
   - Monitor build times and performance

2. **Set up CI/CD**:
   - Every push to main will auto-deploy
   - Set up preview deployments for pull requests

3. **Add Features**:
   - Real-time stock data
   - More advanced predictions
   - User portfolios
   - Email notifications

---

**🎉 Your Stock Prediction App is now live on Vercel!** 