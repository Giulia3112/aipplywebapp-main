# ⚡ Quick Deploy to Firebase - TL;DR

Don't want to read the full guide? Here's the fastest way to deploy your AIpply website to Firebase Hosting.

## 🚀 5-Minute Deployment

### 1️⃣ Install Firebase CLI (One-time setup)

```bash
npm install -g firebase-tools
```

### 2️⃣ Login to Firebase

```bash
firebase login
```

### 3️⃣ Create Firebase Project

Go to [console.firebase.google.com](https://console.firebase.google.com/), click "Add project", name it `aipply-website`, and create.

### 4️⃣ Initialize Firebase

```bash
firebase init hosting
```

**Answer the prompts:**
- Use an existing project → Select `aipply-website`
- Public directory → `dist`
- Single-page app → `y`
- GitHub deployment → `n`
- Overwrite index.html → `N`

### 5️⃣ Update Environment Variables

Update `.firebaserc` with your actual Firebase project ID (if different from "aipply-website").

**Important:** Make sure your `.env.local` has your production values:
```env
VITE_RAILWAY_API_URL=https://your-actual-railway-url.up.railway.app
VITE_SUPABASE_URL=https://qphnyfdtjxrqmdbjspoe.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-key
```

### 6️⃣ Build and Deploy

```bash
npm run build
firebase deploy --only hosting
```

### 7️⃣ Done! 🎉

Your site is live at: `https://aipply-website.web.app`

---

## 🔄 Future Deployments (Even Faster!)

After initial setup, just run:

```bash
npm run deploy
```

That's it! This single command builds and deploys your site.

---

## 🐛 Common Issues

**Issue:** `firebase: command not found`
```bash
npm install -g firebase-tools
```

**Issue:** "Permission denied"
```bash
firebase logout
firebase login
```

**Issue:** API not working in production
- Check your Railway API URL in `.env.local`
- Rebuild: `npm run build`
- Redeploy: `firebase deploy --only hosting`

---

## 📚 Need More Details?

Read the full deployment guide: [FIREBASE_DEPLOYMENT_GUIDE.md](./FIREBASE_DEPLOYMENT_GUIDE.md)

---

**That's it!** Your AIpply website is now live on Firebase Hosting! 🚀

