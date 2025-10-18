#!/usr/bin/env python3
"""
Prepare files for Railway deployment
Run this to create a deployment-ready folder
"""

import os
import shutil

print("🚀 Preparing Railway Deployment Package...\n")

# Create deployment folder
deploy_dir = "railway_deploy"
if os.path.exists(deploy_dir):
    shutil.rmtree(deploy_dir)
os.makedirs(deploy_dir)
os.makedirs(f"{deploy_dir}/services")

print(f"✅ Created {deploy_dir}/ directory")

# Copy files
files_to_copy = [
    ("main_with_db.py", "main.py"),  # Rename on copy
    ("database_setup.py", "database_setup.py"),
    ("requirements_db.txt", "requirements.txt"),  # Rename on copy
    ("services/db_service.py", "services/db_service.py"),
    ("services/run_scraper.py", "services/run_scraper.py"),
    ("services/__init__.py", "services/__init__.py"),
]

for src, dest in files_to_copy:
    if os.path.exists(src):
        shutil.copy2(src, f"{deploy_dir}/{dest}")
        print(f"✅ Copied {src} → {dest}")
    else:
        print(f"⚠️  Missing: {src}")

# Create Procfile
procfile_content = "web: uvicorn main:app --host 0.0.0.0 --port $PORT\n"
with open(f"{deploy_dir}/Procfile", "w") as f:
    f.write(procfile_content)
print(f"✅ Created Procfile")

# Create railway.json (optional config)
railway_config = """{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "uvicorn main:app --host 0.0.0.0 --port $PORT",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
"""
with open(f"{deploy_dir}/railway.json", "w") as f:
    f.write(railway_config)
print(f"✅ Created railway.json")

print(f"\n🎉 Deployment package ready in '{deploy_dir}/' folder!")
print("\n📋 Next Steps:")
print("1. Copy all files from railway_deploy/ to your Railway backend repository")
print("2. Commit and push to trigger deployment")
print("3. Verify DATABASE_URL is set in Railway environment")
print("4. Check deployment logs in Railway dashboard")
print("\nOr use Railway CLI:")
print(f"  cd {deploy_dir}")
print("  railway link")
print("  railway up")

