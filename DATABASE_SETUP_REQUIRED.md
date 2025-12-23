# ⚠️ Database Setup Required - Step by Step

## Error You're Seeing
```
✕ Database error: TypeError: fetch failed
```

## What This Means
The `orders` table doesn't exist in your Supabase database. The code is ready, but the database structure needs to be created.

## Fix in 3 Steps (5 minutes)

### Step 1: Open Supabase Console
- Go to: https://supabase.com/
- Log in to your account
- Select your project

### Step 2: Go to SQL Editor
- In the left sidebar, click **SQL Editor**
- You'll see a code editor

### Step 3: Execute the Migration
1. **Copy** the entire content from this file: `src/db/orders_table.sql`
2. **Paste** it into the Supabase SQL Editor
3. **Click Run** button (or press Ctrl+Enter / Cmd+Enter)
4. Wait for success message ✅

## That's it!

Once the SQL runs successfully:
- ✅ Table is created with 40 columns
- ✅ Indexes are created for performance
- ✅ Security policies are enabled
- ✅ Checkout will start working immediately

## What Was Created
```
✓ orders table
✓ 9 performance indexes
✓ 2 automatic triggers (age calculation, timestamp)
✓ 3 Row-Level Security policies
```

## Test It
1. Go to checkout page
2. Fill out the form
3. Click "Continue to Payment"
4. Check Supabase → Database → orders table to see your data

---

**Estimated Time**: 2 minutes  
**Difficulty**: Easy  
**Status**: Required before checkout works
