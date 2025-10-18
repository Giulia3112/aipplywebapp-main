# ✅ Environment Variables Setup Checklist

## Your .env.local Should Contain:

```env
# Railway API (Required for AI search)
VITE_RAILWAY_API_URL=https://your-railway-app.up.railway.app

# Supabase (Required for waitlist and user data)
VITE_SUPABASE_URL=https://qphnyfdtjxrqmdbjspoe.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwaG55ZmR0anhycW1kYmpzcG9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwMTA4NTYsImV4cCI6MjA2NzU4Njg1Nn0.XPqD6vd3TOLk-aMVVU8XLXWr7zBj9NzDIpifTIakebg
```

## ✅ How to Verify It's Working:

### Method 1: Browser Console (Automatic Check)
1. Open http://localhost:5173
2. Press F12 to open Developer Tools
3. Click the "Console" tab
4. You should see:
   ```
   🔍 Environment Variables Check:
   Railway API URL: ✅ (shows your URL)
   Supabase URL: ✅ (shows your URL)
   Supabase Key: ✅ SET
   ```

### Method 2: Test the Features

#### Test Supabase (Waitlist):
1. Go to http://localhost:5173
2. Scroll to the email input
3. Enter your email
4. Click "Join Waitlist"
5. Should see success message ✅

#### Test Railway API (Search):
1. Go to http://localhost:5173/search-demo
2. Enter a search query (e.g., "computer science scholarships")
3. Click "Search"
4. Should see results from your Railway API ✅

## 🐛 Troubleshooting:

### If Railway API URL shows "❌ NOT SET":
1. Make sure `.env.local` exists in project root
2. Check variable name is exactly: `VITE_RAILWAY_API_URL`
3. Restart dev server: Stop (Ctrl+C) and run `npm run dev`

### If Supabase shows "❌ NOT SET":
1. Check variable names are exactly:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
2. Restart dev server

### If environment variables aren't loading:
1. **File name must be** `.env.local` (not `.env` or `.env.development`)
2. **File location must be** in project root (same folder as `package.json`)
3. **Variables must start with** `VITE_` (Vite requirement)
4. **Must restart server** after creating/editing `.env.local`

## 📍 Where is Your .env.local?

The file should be here:
```
AIpply website hostinger code/
├── .env.local          ← HERE (same level as package.json)
├── package.json
├── vite.config.js
├── src/
└── ...
```

## 🔒 Security Notes:

✅ **DO:**
- Keep `.env.local` in your `.gitignore` (it already is)
- Use environment variables for all secrets
- Set these same variables on Hostinger when deploying

❌ **DON'T:**
- Commit `.env.local` to Git
- Share your keys publicly
- Use the same keys for dev and production (if possible)

## 🚀 For Production Deployment (Hostinger):

When you deploy to Hostinger, set these environment variables in your hosting dashboard:
1. `VITE_RAILWAY_API_URL` - Your Railway production URL
2. `VITE_SUPABASE_URL` - Your Supabase URL
3. `VITE_SUPABASE_ANON_KEY` - Your Supabase anon key

---

**Everything configured? Check the browser console to verify!** 🎉

