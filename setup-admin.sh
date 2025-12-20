#!/bin/bash
# Installation & Setup Script for REHAS Admin Dashboard
# Run this script to set up all necessary components

echo "================================"
echo "REHAS Admin Dashboard Setup"
echo "================================"
echo ""

# Step 1: Install Dependencies
echo "📦 Step 1: Installing npm dependencies..."
npm install @supabase/supabase-js bcryptjs @types/bcryptjs
echo "✓ Dependencies installed"
echo ""

# Step 2: Verify Environment Variables
echo "📋 Step 2: Checking environment variables..."
if [ -f ".env.local" ]; then
    echo "✓ .env.local file exists"
    if grep -q "NEXT_PUBLIC_SUPABASE_URL" .env.local; then
        echo "✓ Supabase URL configured"
    else
        echo "✗ NEXT_PUBLIC_SUPABASE_URL not found in .env.local"
    fi
else
    echo "✗ .env.local file not found"
    echo "Create .env.local with the following:"
    echo "NEXT_PUBLIC_SUPABASE_URL=your_supabase_url"
    echo "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_key"
fi
echo ""

# Step 3: Build Project
echo "🔨 Step 3: Building project..."
npm run build
if [ $? -eq 0 ]; then
    echo "✓ Build successful"
else
    echo "✗ Build failed"
    exit 1
fi
echo ""

# Step 4: Instructions
echo "✅ Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Go to Supabase Dashboard"
echo "2. Navigate to SQL Editor"
echo "3. Copy & paste SQL from SUPABASE_SETUP.md"
echo "4. Execute all queries"
echo "5. Insert admin user with bcrypt hash"
echo "6. Navigate to http://localhost:3000/admin/login"
echo "7. Login with admin credentials"
echo ""
echo "For local development:"
echo "  npm run dev"
echo ""
echo "Default admin credentials (after setup):"
echo "  Username: admin"
echo "  Password: Admin@123"
echo ""
echo "To generate new admin password hash:"
echo "  npx bcryptjs hash YourPassword123"
echo ""
