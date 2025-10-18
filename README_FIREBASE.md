# 🚀 AIpply Website - Firebase Hosting Setup

Welcome! This README will guide you through deploying your AIpply website to Firebase Hosting.

## 📚 Documentation Overview

We've created several guides to help you:

1. **[QUICK_DEPLOY.md](./QUICK_DEPLOY.md)** - ⚡ Fast deployment (5 minutes)
2. **[FIREBASE_DEPLOYMENT_GUIDE.md](./FIREBASE_DEPLOYMENT_GUIDE.md)** - 📖 Complete step-by-step guide
3. **[ENV_PRODUCTION_TEMPLATE.md](./ENV_PRODUCTION_TEMPLATE.md)** - 🔐 Environment variables setup
4. **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - ✅ Pre/post deployment checklist

Choose the guide that best fits your needs!

---

## ⚡ Quick Start (5 Minutes)

### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
```

### 2. Login to Firebase

```bash
firebase login
```

### 3. Create Firebase Project

Go to [console.firebase.google.com](https://console.firebase.google.com/) and create a new project named `aipply-website`.

### 4. Initialize Firebase

```bash
firebase init hosting
```

Select existing project → `aipply-website`
- Public directory: `dist`
- Single-page app: `y`
- GitHub deployment: `n`

### 5. Set Environment Variables

Make sure your `.env.local` has your production Railway API URL:

```env
VITE_RAILWAY_API_URL=https://your-railway-api.up.railway.app
VITE_SUPABASE_URL=https://qphnyfdtjxrqmdbjspoe.supabase.co
VITE_SUPABASE_ANON_KEY=your-key-here
```

### 6. Deploy

```bash
npm run deploy
```

### 7. Done! 🎉

Your site is live at: `https://aipply-website.web.app`

---

## 📁 What's Included

### Configuration Files

- **`firebase.json`** - Firebase Hosting configuration
  - Serves from `dist` folder
  - Single-page app routing
  - Cache headers for assets
  - Security headers

- **`.firebaserc`** - Firebase project settings
  - Default project: `aipply-website`
  - Can be updated with your project ID

- **`.gitignore`** - Updated to exclude Firebase files
  - Prevents committing sensitive files
  - Excludes build artifacts

### Build Optimization

Your `vite.config.js` has been optimized for production:

- **Code splitting** - Separates vendor libraries for better caching
- **Minification** - Reduces bundle size with Terser
- **Asset optimization** - Optimizes images and CSS
- **Tree shaking** - Removes unused code

### Deployment Scripts

Added to `package.json`:

```json
{
  "scripts": {
    "deploy": "npm run build && firebase deploy --only hosting",
    "deploy:preview": "npm run build && firebase hosting:channel:deploy preview"
  }
}
```

---

## 🎯 Project Structure

```
aipply-website/
├── src/                          # Source code
│   ├── pages/
│   │   ├── LandingPage.jsx      # Main landing page
│   │   ├── WorkingSearchDemoPage.jsx  # AI search demo
│   │   └── PrivacyPolicyPage.jsx
│   ├── components/              # Reusable components
│   ├── lib/
│   │   ├── railwayApiClient.js  # Railway API integration
│   │   └── customSupabaseClient.js  # Supabase client
│   └── ...
├── dist/                        # Build output (generated)
├── firebase.json                # Firebase config
├── .firebaserc                  # Firebase project
├── .env.local                   # Local environment variables
├── vite.config.js              # Vite build config (optimized)
├── package.json                # NPM scripts (with deploy)
└── Documentation/
    ├── QUICK_DEPLOY.md
    ├── FIREBASE_DEPLOYMENT_GUIDE.md
    ├── ENV_PRODUCTION_TEMPLATE.md
    └── DEPLOYMENT_CHECKLIST.md
```

---

## 🔧 Environment Variables

Your app requires these environment variables:

| Variable | Description | Where to find |
|----------|-------------|---------------|
| `VITE_RAILWAY_API_URL` | Railway API endpoint | Railway Dashboard → Settings → Public Domain |
| `VITE_SUPABASE_URL` | Supabase project URL | Supabase Dashboard → Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key | Supabase Dashboard → Settings → API |

**⚠️ Important:** 
- Variables must start with `VITE_` to be exposed to the client
- Store in `.env.local` for development
- Create `.env.production` for production builds
- Never commit these files to Git!

---

## 🌐 Features

Your AIpply website includes:

### ✨ Landing Page
- Hero section with demo CTA
- AI Search Demo promotion
- Coming soon features
- Waitlist integration
- Contact email button

### 🔍 AI Search Demo
- Real-time search through 30+ sources
- Live Railway API integration
- Results display with details
- No signup required

### 📧 Waitlist System
- Supabase integration
- Email collection
- Toast notifications
- Duplicate detection

---

## 🚀 Deployment Workflow

### Development
```bash
npm run dev          # Start dev server
```

### Testing Build Locally
```bash
npm run build        # Build for production
npm run preview      # Test production build locally
```

### Deploy to Firebase
```bash
npm run deploy       # Build + Deploy
```

### Preview Deployment (Test before going live)
```bash
npm run deploy:preview   # Deploy to preview channel
```

---

## 📊 Firebase Features

Once deployed, you get:

### Hosting
- ✅ Global CDN
- ✅ Free SSL certificate
- ✅ Custom domain support
- ✅ Automatic HTTPS redirect
- ✅ Generous free tier (10GB storage, 360MB/day bandwidth)

### Performance
- Fast load times (global edge network)
- Automatic caching
- Gzip compression
- HTTP/2 support

### Security
- Automatic SSL/TLS
- Security headers configured
- DDoS protection
- Firebase App Check (optional)

---

## 🎨 Customization

### Update Firebase Project ID

Edit `.firebaserc`:
```json
{
  "projects": {
    "default": "your-project-id"
  }
}
```

### Add Custom Domain

1. Go to Firebase Console
2. Hosting → Add custom domain
3. Follow verification steps
4. Add DNS records
5. Wait for SSL provisioning (up to 24 hours)

### Modify Build Settings

Edit `vite.config.js` to customize build options.

---

## 🐛 Troubleshooting

### Build Errors

**Problem:** `npm run build` fails

**Solutions:**
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install`
3. Try building again

### Deployment Fails

**Problem:** `firebase deploy` fails

**Solutions:**
1. Check you're logged in: `firebase login`
2. Verify project exists: `firebase projects:list`
3. Ensure `dist` folder exists: `npm run build`

### API Not Working in Production

**Problem:** Search returns errors

**Solutions:**
1. Verify Railway API URL in `.env.local`
2. Check Railway API is deployed and running
3. Test API endpoint directly
4. Rebuild: `npm run build`
5. Redeploy: `firebase deploy --only hosting`

### White Screen / Blank Page

**Problem:** Site loads but shows nothing

**Solutions:**
1. Open browser console (F12)
2. Look for errors
3. Check all environment variables are set
4. Test locally: `npm run preview`
5. Verify `dist/index.html` exists

### 404 on Page Refresh

**Problem:** Direct URLs return 404

**Solution:** Already fixed! `firebase.json` includes rewrite rules for single-page app routing.

---

## 📈 Monitoring

### View Deployment Status

```bash
firebase hosting:sites:list
```

### Check Recent Deployments

```bash
firebase hosting:releases:list
```

### View Usage

Go to Firebase Console → Hosting → Usage

Monitor:
- Storage used
- Bandwidth consumed
- Number of requests

---

## 🔄 CI/CD (Optional)

We've included a GitHub Actions workflow template at:
`.github/workflows/firebase-hosting.yml`

To enable automatic deployments:

1. Uncomment the workflow file
2. Add secrets to GitHub repository:
   - `VITE_RAILWAY_API_URL`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `FIREBASE_SERVICE_ACCOUNT`
3. Push to `main` branch

Deployments will now happen automatically on every push!

---

## 💰 Costs

### Firebase Hosting - Spark Plan (Free)
- 10 GB storage
- 360 MB/day bandwidth
- Custom domain included
- SSL certificates included

**Perfect for most small to medium sites!**

If you exceed the free tier, Firebase has affordable pay-as-you-go pricing.

---

## 🎓 Learning Resources

- [Firebase Hosting Docs](https://firebase.google.com/docs/hosting)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Router with Firebase](https://create-react-app.dev/docs/deployment/#firebase)

---

## ✅ Quick Checklist

Before deploying, ensure:

- [ ] Firebase CLI installed
- [ ] Firebase project created
- [ ] `.env.local` configured with production values
- [ ] `npm run build` succeeds
- [ ] `npm run preview` works locally
- [ ] Railway API is deployed and accessible
- [ ] Supabase is configured

Then deploy:

```bash
npm run deploy
```

---

## 🎉 Success!

Your AIpply website is now ready for Firebase Hosting!

**Deployment URLs:**
- Firebase: `https://aipply-website.web.app`
- Alternative: `https://aipply-website.firebaseapp.com`

**Need help?**
- Check [FIREBASE_DEPLOYMENT_GUIDE.md](./FIREBASE_DEPLOYMENT_GUIDE.md) for detailed instructions
- Use [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) to verify everything
- Email: contact@aipply.tech

---

## 📝 Next Steps

1. ✅ Deploy to Firebase
2. ✅ Test all features on live site
3. ✅ Set up custom domain (optional)
4. ✅ Enable Firebase Analytics (optional)
5. ✅ Set up CI/CD (optional)
6. ✅ Share with users!

**Happy deploying! 🚀**

