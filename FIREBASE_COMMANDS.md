# 🔧 Firebase CLI Commands Reference

Quick reference for Firebase Hosting commands.

## Initial Setup

### Install Firebase CLI
```bash
npm install -g firebase-tools
```

### Check Version
```bash
firebase --version
```

### Login
```bash
firebase login
```

### Logout
```bash
firebase logout
```

### Check Current User
```bash
firebase login:list
```

---

## Project Management

### List All Projects
```bash
firebase projects:list
```

### Create New Project
```bash
firebase projects:create [project-id]
```

### Add Project to Current Directory
```bash
firebase use --add
```

### Switch Project
```bash
firebase use [project-id]
```

### Show Current Project
```bash
firebase use
```

---

## Initialization

### Initialize Firebase in Project
```bash
firebase init
```

### Initialize Only Hosting
```bash
firebase init hosting
```

---

## Deployment

### Deploy Everything
```bash
firebase deploy
```

### Deploy Only Hosting
```bash
firebase deploy --only hosting
```

### Deploy with Custom Message
```bash
firebase deploy -m "Your deployment message"
```

### Deploy to Specific Project
```bash
firebase deploy --only hosting --project [project-id]
```

---

## Hosting Management

### List Hosting Sites
```bash
firebase hosting:sites:list
```

### View Deployment History
```bash
firebase hosting:releases:list
```

### View Hosting Channel Deployments
```bash
firebase hosting:channel:list
```

### Deploy to Preview Channel
```bash
firebase hosting:channel:deploy [channel-name]
```

Example:
```bash
firebase hosting:channel:deploy preview
```

### Delete Preview Channel
```bash
firebase hosting:channel:delete [channel-name]
```

---

## Testing & Debugging

### Serve Locally (Emulator)
```bash
firebase serve
```

### Serve Only Hosting
```bash
firebase serve --only hosting
```

### Serve on Custom Port
```bash
firebase serve --port 5000
```

---

## NPM Scripts (Added to Your Project)

### Build and Deploy
```bash
npm run deploy
```

### Build and Deploy to Preview
```bash
npm run deploy:preview
```

### Build for Production
```bash
npm run build
```

### Preview Production Build Locally
```bash
npm run preview
```

### Development Server
```bash
npm run dev
```

---

## Rollback & History

### View Recent Releases
```bash
firebase hosting:releases:list --limit 10
```

### Clone Previous Release
```bash
firebase hosting:clone [source-site-id]:[source-version] [target-site-id]
```

---

## Configuration

### Open Firebase Console
```bash
firebase open
```

### Open Hosting Dashboard
```bash
firebase open hosting
```

### View Project Info
```bash
firebase projects:list
```

---

## Custom Domains

### List Custom Domains
```bash
firebase hosting:sites:list
```

(Custom domains must be added through Firebase Console)

---

## Troubleshooting Commands

### Check Firebase Status
```bash
firebase --version
firebase login:list
firebase use
```

### Clear Firebase Cache
```bash
firebase logout
firebase login
```

### Debug Deployment
```bash
firebase deploy --only hosting --debug
```

---

## Common Workflows

### First-Time Deployment
```bash
# 1. Install Firebase CLI
npm install -g firebase-tools

# 2. Login
firebase login

# 3. Initialize
firebase init hosting

# 4. Build
npm run build

# 5. Deploy
firebase deploy --only hosting
```

### Regular Updates
```bash
# Option 1: Use NPM script (recommended)
npm run deploy

# Option 2: Manual
npm run build
firebase deploy --only hosting
```

### Test Before Deploying
```bash
# 1. Build
npm run build

# 2. Preview locally
npm run preview

# 3. Deploy to preview channel
firebase hosting:channel:deploy preview

# 4. If good, deploy to live
firebase deploy --only hosting
```

---

## Environment-Specific Deployments

### Deploy with Specific Project
```bash
firebase use production
npm run deploy
```

### Multi-Environment Setup
```bash
# Set up projects
firebase use --add  # Add staging
firebase use --add  # Add production

# Deploy to staging
firebase use staging
npm run deploy

# Deploy to production
firebase use production
npm run deploy
```

---

## Useful Flags

| Flag | Description |
|------|-------------|
| `--only hosting` | Deploy only hosting |
| `--project [id]` | Use specific project |
| `-m "message"` | Add deployment message |
| `--debug` | Show debug output |
| `--force` | Force deployment |
| `--token [token]` | Use CI token |

---

## CI/CD Commands

### Generate CI Token
```bash
firebase login:ci
```

### Deploy with Token (for CI/CD)
```bash
firebase deploy --token "$FIREBASE_TOKEN"
```

---

## Quick Reference Card

```bash
# Setup
firebase login
firebase init hosting

# Deploy
npm run deploy

# Preview
npm run build && npm run preview

# View status
firebase hosting:releases:list

# Rollback (if needed)
firebase hosting:clone SOURCE:VERSION TARGET
```

---

## Help Commands

### General Help
```bash
firebase --help
```

### Hosting Help
```bash
firebase hosting --help
```

### Deploy Help
```bash
firebase deploy --help
```

---

## Tips

1. **Always build before deploying:**
   ```bash
   npm run build
   ```

2. **Test locally before deploying:**
   ```bash
   npm run preview
   ```

3. **Use NPM scripts for convenience:**
   ```bash
   npm run deploy
   ```

4. **Check deployment history:**
   ```bash
   firebase hosting:releases:list
   ```

5. **Use preview channels for testing:**
   ```bash
   firebase hosting:channel:deploy preview
   ```

---

## Emergency Commands

### If Deployment Stuck
```bash
# Cancel (Ctrl+C)
# Then force deploy
firebase deploy --only hosting --force
```

### If Login Issues
```bash
firebase logout
firebase login --reauth
```

### If Project Issues
```bash
firebase use
firebase projects:list
firebase use --add
```

---

**Need more help?**
- Full guide: [FIREBASE_DEPLOYMENT_GUIDE.md](./FIREBASE_DEPLOYMENT_GUIDE.md)
- Quick start: [QUICK_DEPLOY.md](./QUICK_DEPLOY.md)
- Firebase Docs: [firebase.google.com/docs](https://firebase.google.com/docs)

