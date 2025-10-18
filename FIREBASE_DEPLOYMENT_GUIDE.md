# 🚀 Firebase Hosting Deployment Guide for AIpply

This guide will walk you through deploying your AIpply website to Firebase Hosting.

## 📋 Prerequisites

Before you begin, make sure you have:
- A Google account
- Node.js and npm installed
- Your Railway API URL
- Your Supabase credentials

## 🔧 Step 1: Install Firebase CLI

Open your terminal and install the Firebase CLI globally:

```bash
npm install -g firebase-tools
```

Verify the installation:

```bash
firebase --version
```

## 🔑 Step 2: Login to Firebase

Login to your Firebase account:

```bash
firebase login
```

This will open a browser window for you to authenticate with your Google account.

## 🏗️ Step 3: Create a Firebase Project

### Option A: Using Firebase Console (Recommended for first-time users)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `aipply-website` (or your preferred name)
4. Accept the terms and click "Continue"
5. Disable Google Analytics (optional, you can enable it later)
6. Click "Create project"
7. Wait for the project to be created, then click "Continue"

### Option B: Using Firebase CLI

```bash
firebase projects:create aipply-website
```

## 🎯 Step 4: Initialize Firebase in Your Project

In your project directory, run:

```bash
firebase init hosting
```

Answer the prompts as follows:

1. **"Please select an option:"** → Choose "Use an existing project"
2. **"Select a default Firebase project:"** → Select your project (e.g., `aipply-website`)
3. **"What do you want to use as your public directory?"** → Type `dist` and press Enter
4. **"Configure as a single-page app (rewrite all urls to /index.html)?"** → Type `y` and press Enter
5. **"Set up automatic builds and deploys with GitHub?"** → Type `n` and press Enter (we'll do this manually)
6. **"File dist/index.html already exists. Overwrite?"** → Type `N` and press Enter

## 🔐 Step 5: Set Up Environment Variables

### For Local Development (already done)

Your `.env.local` file contains your development environment variables.

### For Production

You need to create a `.env.production` file with your production values:

```bash
# Create .env.production file
echo "VITE_RAILWAY_API_URL=https://your-railway-api-url.up.railway.app" > .env.production
echo "VITE_SUPABASE_URL=https://qphnyfdtjxrqmdbjspoe.supabase.co" >> .env.production
echo "VITE_SUPABASE_ANON_KEY=your-anon-key-here" >> .env.production
```

**⚠️ IMPORTANT:** Replace the values with your actual production URLs and keys!

To get your Railway API URL:
1. Go to your Railway dashboard
2. Click on your API project
3. Go to "Settings" tab
4. Copy the "Public Domain" URL

## 🏗️ Step 6: Build Your Project

Build your project for production:

```bash
npm run build
```

This will create a `dist` folder with your optimized production files.

**✅ Expected output:**
```
vite v4.5.14 building for production...
✓ 1234 modules transformed.
dist/index.html                   0.45 kB │ gzip:  0.30 kB
dist/assets/index-abc123.css     12.34 kB │ gzip:  3.45 kB
dist/assets/index-def456.js     234.56 kB │ gzip: 78.90 kB
✓ built in 5.67s
```

## 🚀 Step 7: Deploy to Firebase

Deploy your website:

```bash
firebase deploy --only hosting
```

**✅ Expected output:**
```
=== Deploying to 'aipply-website'...

i  deploying hosting
i  hosting[aipply-website]: beginning deploy...
i  hosting[aipply-website]: found 25 files in dist
✔  hosting[aipply-website]: file upload complete
i  hosting[aipply-website]: finalizing version...
✔  hosting[aipply-website]: version finalized
i  hosting[aipply-website]: releasing new version...
✔  hosting[aipply-website]: release complete

✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/aipply-website/overview
Hosting URL: https://aipply-website.web.app
```

## 🎉 Step 8: Access Your Website

Your website is now live! You can access it at:

- **Firebase URL:** `https://aipply-website.web.app`
- **Alternative URL:** `https://aipply-website.firebaseapp.com`

## 🌐 Step 9: (Optional) Set Up Custom Domain

To use your own domain (e.g., `aipply.tech`):

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click "Hosting" in the left sidebar
4. Click "Add custom domain"
5. Enter your domain name
6. Follow the instructions to verify domain ownership
7. Add the DNS records provided by Firebase to your domain registrar
8. Wait for DNS propagation (can take up to 24 hours)

### Custom Domain DNS Records

Firebase will provide you with records like:

```
Type: A
Name: @
Value: 151.101.1.195

Type: A
Name: @
Value: 151.101.65.195

Type: TXT
Name: @
Value: firebase-verify=xxxxxxxxxxxx
```

Add these to your domain's DNS settings.

## 🔄 Future Deployments

After your initial setup, deploying updates is simple:

```bash
# 1. Build the project
npm run build

# 2. Deploy to Firebase
firebase deploy --only hosting
```

## 🛠️ Quick Deploy Script

Add this script to your `package.json` for easier deployments:

```json
"scripts": {
  "deploy": "npm run build && firebase deploy --only hosting",
  "deploy:preview": "npm run build && firebase hosting:channel:deploy preview"
}
```

Then you can deploy with:

```bash
npm run deploy
```

## 🎯 Deployment Checklist

Before deploying to production, make sure:

- ✅ `.env.production` file is created with correct values
- ✅ Railway API URL is set correctly
- ✅ Supabase credentials are correct
- ✅ `npm run build` completes successfully
- ✅ Test the build locally with `npm run preview`
- ✅ All environment variables are set
- ✅ Firebase project is created and initialized
- ✅ You're logged in to Firebase CLI

## 📊 Monitoring and Analytics

### View Deployment History

```bash
firebase hosting:channel:list
```

### View Site Statistics

Go to Firebase Console → Hosting → Usage tab to see:
- Number of requests
- Bandwidth usage
- Popular pages

### Set Up Google Analytics (Optional)

1. Go to Firebase Console
2. Click "Analytics" in the left sidebar
3. Click "Enable Google Analytics"
4. Follow the setup wizard

## 🐛 Troubleshooting

### Issue: "Command not found: firebase"

**Solution:** Install Firebase CLI globally:
```bash
npm install -g firebase-tools
```

### Issue: "Error: HTTP Error: 403, The caller does not have permission"

**Solution:** Make sure you're logged in and have the correct permissions:
```bash
firebase logout
firebase login
```

### Issue: "Build fails with environment variable errors"

**Solution:** Create `.env.production` file with all required variables.

### Issue: "404 Page Not Found after refresh"

**Solution:** Make sure your `firebase.json` has the rewrite rule:
```json
"rewrites": [
  {
    "source": "**",
    "destination": "/index.html"
  }
]
```

### Issue: "API calls fail in production"

**Solution:** 
1. Check that your `.env.production` has the correct Railway API URL
2. Rebuild your project: `npm run build`
3. Redeploy: `firebase deploy --only hosting`

### Issue: "White screen or blank page"

**Solution:**
1. Check browser console for errors (F12)
2. Make sure all environment variables are set
3. Try building locally and testing with `npm run preview`
4. Check that `dist/index.html` exists

## 🔒 Security Best Practices

1. **Never commit `.env.production` to Git**
   - Add it to `.gitignore`
   - Store sensitive values securely

2. **Use Firebase Security Rules** (if using Firestore/Storage)

3. **Enable Firebase App Check** (optional, for additional security)

4. **Set up CORS** on your Railway API to only allow requests from your Firebase domain

## 💰 Pricing

Firebase Hosting offers a generous free tier:
- **Spark Plan (Free):**
  - 10 GB storage
  - 360 MB/day bandwidth
  - Custom domain & SSL included
  
For most small to medium websites, the free tier is sufficient!

## 📚 Additional Resources

- [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

## 🎊 Success!

Your AIpply website is now live on Firebase Hosting! 🎉

**Next Steps:**
1. Test all features on the live site
2. Share your website URL
3. Set up custom domain (optional)
4. Monitor usage in Firebase Console
5. Set up CI/CD for automatic deployments (optional)

---

**Need help?** Check the [Firebase Support](https://firebase.google.com/support) page or reach out to the AIpply team at contact@aipply.tech

