# Database Setup Instructions - URGENT

## Error: Could not find the 'age' column of 'orders' in the schema cache

This means the `orders` table hasn't been created in Supabase yet.

## Solution: Execute the SQL Migration

### Step 1: Go to Supabase Dashboard
1. Open https://supabase.com and log in to your project
2. Navigate to **SQL Editor** in the left sidebar

### Step 2: Copy the SQL Schema
Copy the entire content from: `src/db/orders_table.sql`

### Step 3: Paste and Execute
1. In the SQL Editor, paste the entire SQL script
2. Click the **Run** button (or press Cmd+Enter / Ctrl+Enter)
3. Wait for the execution to complete - you should see a success message

### Step 4: Verify Table Creation
Run this query in SQL Editor to confirm:
```sql
SELECT table_name FROM information_schema.tables WHERE table_name = 'orders';
```

You should see `orders` in the results.

## If You Get an Error

### Error: "Table already exists"
If the table already exists but is missing the `age` column, run:
```sql
ALTER TABLE orders ADD COLUMN age INT;
```

### Error: "Permission denied"
Make sure you're logged into the correct Supabase project and have admin access.

## After Executing Migration

1. The orders table will be created with all 40+ columns
2. Indexes will be created for performance
3. RLS (Row Level Security) policies will be enabled
4. Checkout will start working immediately

## Testing Checkout

1. Go to http://localhost:3000/checkout
2. Fill out the form
3. Click "Continue to Payment"
4. Check Supabase dashboard → Database → orders table to see the data

---

**Status**: Database migration pending  
**Priority**: 🔴 CRITICAL - Checkout won't work until this is executed
