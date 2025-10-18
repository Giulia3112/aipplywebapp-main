# 🔐 Production Environment Variables Setup

## Instructions

Since `.env.production` files shouldn't be committed to Git, follow these steps to set up your production environment variables:

## 1. Create `.env.production` file

In your project root directory, create a new file called `.env.production`:

**Windows (PowerShell):**
```powershell
New-Item -Path ".env.production" -ItemType File
```

**Mac/Linux (Terminal):**
```bash
touch .env.production
```

## 2. Add Your Production Values

Open `.env.production` in your code editor and add:

```env
# Production Environment Variables for Firebase Hosting

# Railway API URL - Get this from your Railway dashboard
VITE_RAILWAY_API_URL=https://your-railway-api-url.up.railway.app

# Supabase Configuration - Get these from your Supabase project settings
VITE_SUPABASE_URL=https://qphnyfdtjxrqmdbjspoe.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwaG55ZmR0anhycW1kYmpzcG9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwMTA4NTYsImV4cCI6MjA2NzU4Njg1Nn0.XPqD6vd3TOLk-aMVVU8XLXWr7zBj9NzDIpifTIakebg
```

## 3. Update with Your Actual Values

### Get Your Railway API URL:
1. Go to [railway.app](https://railway.app/dashboard)
2. Open your AIpply API project
3. Go to "Settings" tab
4. Copy the "Public Domain" URL (e.g., `https://aipply-api-production.up.railway.app`)
5. Replace `https://your-railway-api-url.up.railway.app` with your actual URL

### Get Your Supabase Credentials:
1. Go to [supabase.com](https://supabase.com/dashboard)
2. Open your AIpply project
3. Go to "Settings" → "API"
4. Copy the "Project URL" and "anon public" key
5. Replace the values in `.env.production`

## 4. Verify Your Setup

Before deploying, verify your environment variables are correct:

```bash
# Build with production variables
npm run build

# Test locally before deploying
npm run preview
```

Open `http://localhost:4173` and test:
- ✅ Try the AI search functionality
- ✅ Submit an email to the waitlist
- ✅ Check browser console for errors (F12)

## 5. Important Security Notes

⚠️ **DO NOT commit `.env.production` to Git!**

The `.gitignore` file should already exclude it, but double-check:

```bash
# Verify .env.production is ignored
git status
```

If you see `.env.production` in the list, add it to `.gitignore`:

```bash
echo ".env.production" >> .gitignore
```

## 6. Environment Variables in Different Environments

| Environment | File | Usage |
|-------------|------|-------|
| Local Development | `.env.local` | `npm run dev` |
| Production Build | `.env.production` | `npm run build` |
| Preview | Uses production | `npm run preview` |

## 7. Troubleshooting

### Build fails with "undefined" API URL

**Cause:** Environment variables not loaded

**Solution:**
1. Make sure `.env.production` exists
2. Check file name is exactly `.env.production` (no extra spaces)
3. Verify variable names start with `VITE_`
4. Restart your terminal and rebuild

### API calls return 404 in production

**Cause:** Wrong Railway API URL

**Solution:**
1. Double-check your Railway API URL
2. Make sure it ends with `.up.railway.app` or your custom domain
3. Don't include trailing slashes
4. Rebuild and redeploy

### Supabase errors in production

**Cause:** Wrong Supabase credentials

**Solution:**
1. Verify your Supabase project URL
2. Use the "anon public" key (not service role key)
3. Check for typos in the long key string
4. Rebuild and redeploy

## 8. Example `.env.production`

Here's a complete example with placeholder values:

```env
# Railway API (replace with your actual URL)
VITE_RAILWAY_API_URL=https://aipply-api-production-abc123.up.railway.app

# Supabase (replace with your actual values)
VITE_SUPABASE_URL=https://qphnyfdtjxrqmdbjspoe.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwaG55ZmR0anhycW1kYmpzcG9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwMTA4NTYsImV4cCI6MjA2NzU4Njg1Nn0.XPqD6vd3TOLk-aMVVU8XLXWr7zBj9NzDIpifTIakebg
```

---

## ✅ Checklist

Before deploying to Firebase:

- [ ] `.env.production` file created
- [ ] Railway API URL updated with actual value
- [ ] Supabase URL verified
- [ ] Supabase anon key verified
- [ ] Build completed successfully: `npm run build`
- [ ] Preview tested locally: `npm run preview`
- [ ] All features tested (search, waitlist)
- [ ] No console errors in browser
- [ ] `.env.production` not committed to Git

---

**Need help?** Check the [FIREBASE_DEPLOYMENT_GUIDE.md](./FIREBASE_DEPLOYMENT_GUIDE.md) for more detailed instructions.

