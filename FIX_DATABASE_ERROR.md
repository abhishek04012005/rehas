# Quick Fix: Database Error - Age Column Not Found

## 🔴 Critical Issue

The checkout is failing because the `orders` table doesn't exist in your Supabase database.

```
✕ Database error: Could not find the 'age' column of 'orders' in the schema cache
```

## ✅ Solution (2 Minutes)

### Quick Steps:
1. **Open Supabase Console**: https://supabase.com/
2. **Login** to your project
3. **Go to**: SQL Editor (left sidebar)
4. **Copy all content from**: `src/db/orders_table.sql`
5. **Paste** into SQL Editor
6. **Press**: Run (or Ctrl+Enter)
7. **Done!** ✅ Table is created

## What Gets Created

When you execute the SQL, it creates:
- ✅ `orders` table with 40 columns
- ✅ 9 performance indexes
- ✅ 2 automatic triggers
- ✅ 3 RLS security policies

## After Migration

- Users can fill checkout form
- Data saves to database
- Orders appear in Supabase dashboard

## If Already Have orders Table

If you see error: "table 'orders' already exists", run this instead:

```sql
ALTER TABLE orders ADD COLUMN age INT;
```

---

**File with complete SQL**: `src/db/orders_table.sql`  
**Setup Instructions**: `DATABASE_SETUP_INSTRUCTIONS.md`  
**API Endpoint**: `/api/orders/create`  
**Time to Fix**: < 2 minutes
