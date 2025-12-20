# Supabase Setup Queries

## Quick Start

### Prerequisites
- Supabase project created
- Environment variables set in `.env.local`
- Node.js and npm installed

---

## Step 1: Create Tables in Supabase

### Option A: Using SQL Editor (Recommended)

1. Go to your Supabase Dashboard
2. Click **SQL Editor** on the left sidebar
3. Click **New Query**
4. Copy and paste the queries below one by one
5. Click **Run** for each query

### Option B: Using Tables UI
1. Click **Tables** on the left sidebar
2. Click **Create a new table**
3. Add columns manually according to schema below

---

## 1. Create Admin Users Table

```sql
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  is_active BOOLEAN DEFAULT true
);

-- Create index on username for faster lookups
CREATE INDEX idx_admin_users_username ON admin_users(username);

-- Create index on created_at for sorting
CREATE INDEX idx_admin_users_created_at ON admin_users(created_at DESC);
```

---

## 2. Create Contact Submissions Table

```sql
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status TEXT DEFAULT 'new',
  notes TEXT,
  admin_id UUID REFERENCES admin_users(id),
  CONSTRAINT valid_status CHECK (status IN ('new', 'contacted', 'resolved', 'spam'))
);

-- Create index on created_at for sorting
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);

-- Create index on status for filtering
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);

-- Create index on phone for quick lookups
CREATE INDEX idx_contact_submissions_phone ON contact_submissions(phone);
```

---

## 3. Create Enquiries Table

```sql
CREATE TABLE enquiries (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  service_type VARCHAR(100) NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  submitted_from VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT valid_status CHECK (status IN ('new', 'contacted', 'completed', 'spam')),
  CONSTRAINT valid_submitted_from CHECK (submitted_from IN ('popup', 'page'))
);

-- Create indexes for better query performance
CREATE INDEX idx_enquiries_status ON enquiries(status);
CREATE INDEX idx_enquiries_created_at ON enquiries(created_at DESC);
CREATE INDEX idx_enquiries_service_type ON enquiries(service_type);
CREATE INDEX idx_enquiries_phone ON enquiries(phone);

-- Enable Row Level Security
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Allow public insert (for form submissions)
CREATE POLICY "Allow public insert on enquiries" ON enquiries
  FOR INSERT
  WITH CHECK (true);

-- Allow public read
CREATE POLICY "Allow public read enquiries" ON enquiries
  FOR SELECT
  USING (true);

-- Allow updating enquiries
CREATE POLICY "Allow update enquiries" ON enquiries
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Allow deleting enquiries (admin only)
CREATE POLICY "Allow delete enquiries" ON enquiries
  FOR DELETE
  USING (true);
```

---

## 4. Create Admin Users Table

### Step A: Generate Password Hash

```bash
cd /home/abhishek/Work/REHAS/website/rehas-website

# Run the password generator (will output SQL INSERT statement)
npx ts-node src/lib/generateAdminPassword.ts "YourSecurePassword123!"
```

The script will output:
- 📌 Hashed password
- 📋 Complete SQL INSERT statement

### Step B: Insert Admin User

Copy the SQL output from Step A and run in Supabase SQL Editor:

```sql
-- Example (replace hash with your generated hash)
INSERT INTO admin_users (username, password_hash, email, is_active)
VALUES (
  'admin',
  '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5YmMxSUxkKuite',
  'admin@rehas.com',
  true
);
```

---

## 4. Enable Row Level Security (RLS)

```sql
-- Enable RLS on both tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- For admin_users table: Allow public read (needed for login)
CREATE POLICY "Allow public read access to admin_users for login" ON admin_users
  FOR SELECT
  USING (true);

-- For contact_submissions: Allow public insert (form submissions)
CREATE POLICY "Allow public insert on contact_submissions" ON contact_submissions
  FOR INSERT
  WITH CHECK (true);

-- For contact_submissions: Allow reading all submissions
CREATE POLICY "Allow public read contact_submissions" ON contact_submissions
  FOR SELECT
  USING (true);

-- For contact_submissions: Allow updating status
CREATE POLICY "Allow updating contact_submissions" ON contact_submissions
  FOR UPDATE
  USING (true)
  WITH CHECK (true);
```

---

## 5. Create Additional Admin Users (Optional)

```bash
# Generate hash for second admin
npx ts-node src/lib/generateAdminPassword.ts "AnotherAdminPass456!"

# Generate hash for support staff
npx ts-node src/lib/generateAdminPassword.ts "SupportStaffPass789!"
```

Then insert them:

```sql
INSERT INTO admin_users (username, password_hash, email, is_active)
VALUES 
  ('admin_priya', '$2b$12$...hash1...', 'priya@rehas.com', true),
  ('admin_support', '$2b$12$...hash2...', 'support@rehas.com', true);
```

---

## Database Schema Reference

### admin_users Table

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PRIMARY KEY | Auto-generated |
| username | TEXT | UNIQUE, NOT NULL | Login identifier |
| password_hash | TEXT | NOT NULL | Bcrypt hash (never plain text) |
| email | TEXT | | Admin's email |
| created_at | TIMESTAMP | DEFAULT now() | Account creation time |
| updated_at | TIMESTAMP | DEFAULT now() | Last modified time |
| is_active | BOOLEAN | DEFAULT true | Account status |

### contact_submissions Table

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PRIMARY KEY | Auto-generated |
| name | TEXT | NOT NULL | Contact's name |
| phone | TEXT | NOT NULL | Contact's phone number |
| message | TEXT | NOT NULL | Contact's message |
| status | TEXT | DEFAULT 'new' | new/contacted/resolved/spam |
| created_at | TIMESTAMP | DEFAULT now() | Submission time |
| updated_at | TIMESTAMP | DEFAULT now() | Last updated |
| notes | TEXT | | Admin's notes |
| admin_id | UUID | FK to admin_users | Assigned admin |

---

## Indexes for Performance

The queries above create indexes for:
- ✓ Fast username lookups during login
- ✓ Sorted date queries (newest first)
- ✓ Status filtering
- ✓ Phone number searches

---

## Environment Variables

Ensure your `.env.local` has:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-key-here
```

Get these from:
1. Supabase Dashboard → Settings → API
2. Copy the Project URL
3. Copy the anon/public key

---

## Verifying Setup

### Check Tables Created

```sql
-- List all tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Check admin_users columns
\d admin_users

-- Check contact_submissions columns
\d contact_submissions
```

### Test Data

```sql
-- View all admin users
SELECT id, username, email, is_active FROM admin_users;

-- View all contacts (should be empty after setup)
SELECT id, name, phone, status, created_at FROM contact_submissions;

-- Count by status
SELECT status, COUNT(*) FROM contact_submissions GROUP BY status;
```

---

## Backup & Recovery

### Backup Your Data

```sql
-- Export admin users
SELECT * FROM admin_users;

-- Export contacts
SELECT * FROM contact_submissions;
```

### Reset Tables (Caution!)

```sql
-- Delete all contacts
DELETE FROM contact_submissions;

-- Delete all admins
DELETE FROM admin_users;

-- Drop tables (removes everything)
DROP TABLE contact_submissions;
DROP TABLE admin_users;
```

---

## Common Issues & Solutions

### Issue: "Relations does not exist"
**Solution**: Make sure you ran the CREATE TABLE queries first

### Issue: "Permission denied"
**Solution**: Check RLS policies are correctly configured

### Issue: "Unique violation on username"
**Solution**: Username already exists, use a different username

### Issue: "Invalid password hash"
**Solution**: Regenerate hash using the password generator script

---

## Next Steps

1. ✅ Create tables using SQL above
2. ✅ Generate admin password hash
3. ✅ Insert admin user credentials
4. ✅ Enable RLS policies
5. ✅ Test login at `/admin/login`
6. ✅ Access dashboard at `/admin/dashboard`
7. ✅ Test contact form submission

---

## Security Notes

- ⚠️ Never expose `.env.local` files
- ⚠️ Never log password hashes
- ⚠️ Always use HTTPS in production
- ⚠️ Regularly update admin passwords
- ⚠️ Use strong passwords (12+ characters)
- ⚠️ Enable RLS on all tables
- ⚠️ Monitor failed login attempts
- ⚠️ Keep Supabase updated

---

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Admin Setup Guide](./ADMIN_SETUP_GUIDE.md)
- [Password Generator Script](./src/lib/generateAdminPassword.ts)
- [Bcryptjs Security](https://github.com/dcodeIO/bcrypt.js)
