# Google OAuth Setup Guide

To enable Google authentication in your stock prediction app, follow these steps:

## 1. Create Google OAuth Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API (if not already enabled)
4. Go to "Credentials" in the left sidebar
5. Click "Create Credentials" → "OAuth 2.0 Client IDs"
6. Choose "Web application" as the application type
7. Add these authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `http://localhost:3001/api/auth/callback/google` (if using port 3001)
8. Copy the Client ID and Client Secret

## 2. Update Environment Variables

Create or update your `.env.local` file with:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## 3. Generate NEXTAUTH_SECRET

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

Or use any random string for development.

## 4. Restart the Development Server

After updating the environment variables, restart your development server:

```bash
npm run dev
```

## Troubleshooting

- Make sure your redirect URIs match exactly (including the port)
- Ensure the Google+ API is enabled in your Google Cloud project
- Check that your environment variables are properly set
- Clear your browser cache if you're still seeing the old error 