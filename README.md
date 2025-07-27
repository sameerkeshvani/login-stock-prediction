# StockPredict AI - AI-Powered Stock Predictions

A modern, full-stack web application that provides AI-powered stock predictions with a beautiful, responsive interface.

## 🚀 Features

- **130+ Stocks Available** - Comprehensive database covering all major sectors
- **AI-Powered Predictions** - Advanced prediction algorithms with confidence scores
- **Personalized Dashboard** - User-specific recommendations and preferences
- **Sector Analysis** - Analyze predictions by market sectors
- **Bulk Predictions** - Predict multiple stocks simultaneously
- **Beautiful UI** - Modern, aesthetic design with glass morphism effects
- **Responsive Design** - Works perfectly on desktop and mobile
- **User Authentication** - Secure signup/login system

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components
- **Charts**: Recharts for data visualization
- **Authentication**: Custom session management
- **Deployment**: Vercel

## 📊 Available Stocks

### Technology
- AAPL, GOOGL, MSFT, AMZN, TSLA, NVDA, META, NFLX, AMD, INTC, CRM, ADBE, ORCL, CSCO, IBM
- Emerging Tech: SNOW, DDOG, CRWD, UBER, LYFT, SPOT, SNAP, PYPL, SQ, ROKU

### Financial
- JPM, BAC, WFC, GS, MS, C, AXP, USB, PNC, TFC, COF, SCHW, BLK, V, MA, BRK

### Healthcare
- JNJ, PFE, UNH, ABBV, MRK, TMO, ABT, DHR, BMY, AMGN, GILD, CVS, CI, ANTM

### Consumer
- KO, PG, WMT, HD, MCD, SBUX, NKE, TGT, COST, LOW, TJX, MAR, BKNG, YUM

### Energy
- XOM, CVX, COP, EOG, SLB, OXY, VLO, MPC, PSX, KMI

### Industrial
- BA, CAT, GE, MMM, HON, UPS, FDX, RTX, LMT, NOC, UNP, NSC, CSX, DE, JCI, ITW, ETN

### Communication
- DIS, CMCSA, VZ, T, CHTR, TMUS, ATVI, EA

### Real Estate
- SPG, PLD, AMT, EQIX, PSA, O, AVB, EQR

### Utilities
- DUK, SO, NEE, D, AEP, XEL, SRE, WEC

### Materials
- LIN, APD, FCX, NEM, DD, DOW, ECL, BLL

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd stock-prediction-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3000`
   - Sign up for a new account
   - Start predicting stocks!

## 🌐 Deployment

### Deploy to Vercel

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with your GitHub account
   - Click "New Project"
   - Import your repository

3. **Configure Environment Variables** (if needed)
   - In Vercel dashboard, go to Project Settings → Environment Variables
   - Add any required environment variables

4. **Deploy**
   - Vercel will automatically detect Next.js
   - Click "Deploy"
   - Your app will be live in minutes!

### Environment Variables

For production deployment, you may want to set these environment variables in Vercel:

```env
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-production-secret-key
```

## 📱 Usage

1. **Sign Up/Login** - Create an account or sign in
2. **Search Stocks** - Enter any stock symbol (e.g., AAPL, TSLA, GOOGL)
3. **Get Predictions** - View AI-powered predictions with confidence scores
4. **Explore Sectors** - Analyze predictions by market sectors
5. **Personalize** - Set your favorite sectors and risk tolerance

## 🎨 Features

- **Real-time Predictions** - Get instant AI predictions
- **Multiple Timeframes** - 1 day, 7 days, 30 days, 90 days
- **Sector Analysis** - Compare predictions across sectors
- **User Preferences** - Customize your dashboard
- **Responsive Design** - Works on all devices
- **Beautiful Animations** - Smooth, modern UI effects

## 🔧 Development

### Project Structure

```
stock-prediction-app/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard page
│   ├── login/            # Login page
│   ├── signup/           # Signup page
│   └── globals.css       # Global styles
├── components/            # React components
├── lib/                   # Utility functions
└── public/               # Static assets
```

### Key Files

- `app/api/predict/route.ts` - Stock prediction API
- `components/dashboard-content.tsx` - Main dashboard
- `lib/auth.ts` - Authentication utilities
- `lib/users.ts` - User management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues:

1. Check the browser console for errors
2. Ensure all dependencies are installed
3. Clear browser cache and cookies
4. Try in an incognito window

---

**Built with ❤️ using Next.js, React, and Tailwind CSS** 