# Admin Credentials Setup Guide

## Overview
This guide explains how to create admin usernames and passwords with secure bcrypt hashing for the REHAS admin dashboard.

---

## Method 1: Using the Password Generator Script (Recommended)

### Step 1: Run the Password Generator

```bash
cd /home/abhishek/Work/REHAS/website/rehas-website

# Generate hash for a custom password
npx ts-node src/lib/generateAdminPassword.ts "YourSecurePassword123!"

# Or use default password (Admin@123)
npx ts-node src/lib/generateAdminPassword.ts
```

### Step 2: Copy the Generated Hash

The script will output:
- ✅ The plain text password (for your records)
- 📌 The bcrypt hash (for database)
- 📋 SQL INSERT statement (ready to copy-paste)

### Step 3: Insert into Supabase

1. Go to Supabase Dashboard
2. Select your project
3. Go to **SQL Editor**
4. Copy the SQL INSERT statement from script output
5. Paste and execute

---

## Method 2: Manual Password Generation

### Using Node.js REPL

```bash
cd /home/abhishek/Work/REHAS/website/rehas-website

# Open Node.js interactive shell
node

# Then type:
const bcryptjs = require('bcryptjs');
bcryptjs.hash('YourPassword123', 12).then(hash => console.log(hash));
```

### Using Online Tool (Less Secure)
- Visit: https://bcrypt-generator.com/
- Enter your password
- Click "Hash"
- Copy the generated hash

---

## Method 3: Direct Database Entry

### Via Supabase Dashboard UI

1. Go to Supabase Dashboard → **SQL Editor**
2. Create admin user with this query:

```sql
INSERT INTO admin_users (username, password_hash, email, is_active)
VALUES (
  'your_username',
  'bcrypt_hash_here',
  'email@example.com',
  true
);
```

3. Then use the script to generate the hash

---

## Password Requirements & Best Practices

### Minimum Requirements
- ✓ At least 12 characters
- ✓ Mix of uppercase & lowercase letters
- ✓ Include numbers (0-9)
- ✓ Include special characters (!@#$%^&*)
- ✓ Avoid common words or patterns

### Example Strong Passwords
```
✓ MyRehas@Cosmic2024!
✓ Admin$eqoFr#892@Wise
✓ Wellness*Portal@123Cosmic
✗ admin123 (too simple)
✗ password (dictionary word)
✗ 123456 (only numbers)
```

### Security Tips
1. **Never share** password hashes or plain passwords
2. **Use unique** usernames (not "admin" or "root")
3. **Change default** credentials immediately after setup
4. **Use HTTPS** always in production
5. **Store passwords** in password manager
6. **Enable 2FA** when available

---

## Creating Multiple Admin Users

### Step 1: Generate Hashes for Each User

```bash
# Admin user 1
npx ts-node src/lib/generateAdminPassword.ts "Admin@User1Password!"

# Admin user 2
npx ts-node src/lib/generateAdminPassword.ts "Admin@User2Password!"

# Admin user 3
npx ts-node src/lib/generateAdminPassword.ts "Admin@User3Password!"
```

### Step 2: Insert All Users

```sql
INSERT INTO admin_users (username, password_hash, email, is_active)
VALUES 
  ('admin_priya', '$2b$12$...hash1...', 'priya@rehas.com', true),
  ('admin_rajesh', '$2b$12$...hash2...', 'rajesh@rehas.com', true),
  ('admin_support', '$2b$12$...hash3...', 'support@rehas.com', true);
```

---

## Logging In to Dashboard

### Step 1: Navigate to Admin Login
```
https://your-domain.com/admin/login
```

### Step 2: Enter Credentials
- **Username**: The username you created
- **Password**: The plain text password (not the hash)

### Step 3: Access Dashboard
After login, you'll see:
- 📊 Contact submission statistics
- 📧 All contact submissions table
- 🔍 Search and filter options
- 📞 Call and WhatsApp buttons
- ✏️ Status management (New, Contacted, Resolved, Spam)
- 👁️ View full contact details

---

## Resetting Admin Password

### If You Forget the Password

1. Go to Supabase SQL Editor
2. Run this query:

```sql
UPDATE admin_users
SET password_hash = 'new_bcrypt_hash_here'
WHERE username = 'your_username';
```

3. Generate new hash using the script
4. Update the query with the new hash

### Example:

```bash
# Generate new hash
npx ts-node src/lib/generateAdminPassword.ts "NewPassword123!"
```

Then in Supabase SQL Editor:

```sql
UPDATE admin_users
SET password_hash = '$2b$12$YourNewHashHere...'
WHERE username = 'admin_priya';
```

---

## Database Credentials Reference

### Table: `admin_users`
```
Column Name    | Type        | Description
─────────────────────────────────────────
id             | UUID        | Primary key
username       | TEXT        | Unique username
password_hash  | TEXT        | Bcrypt hashed password
email          | TEXT        | Admin email
created_at     | TIMESTAMP   | Account creation time
updated_at     | TIMESTAMP   | Last update time
is_active      | BOOLEAN     | Account status
```

### Table: `contact_submissions`
```
Column Name    | Type        | Description
─────────────────────────────────────────
id             | UUID        | Primary key
name           | TEXT        | Contact's name
phone          | TEXT        | Contact's phone
message        | TEXT        | Contact's message
status         | TEXT        | new/contacted/resolved/spam
created_at     | TIMESTAMP   | Submission time
updated_at     | TIMESTAMP   | Last update time
notes          | TEXT        | Admin notes
admin_id       | UUID        | Admin who handled it
```

---

## Security Checklist

- [ ] Generated strong password (12+ chars with special chars)
- [ ] Used bcryptjs to hash (12 rounds minimum)
- [ ] Stored hash in database (never plain text)
- [ ] Verified login works
- [ ] Changed default username
- [ ] Backed up credentials in password manager
- [ ] Enabled HTTPS in production
- [ ] Tested logout functionality
- [ ] Checked admin routes are protected
- [ ] Verified contact form data is saved

---

## Troubleshooting

### "Invalid username or password"
- Check username is correct (case-sensitive)
- Verify password is entered correctly
- Ensure user is marked as `is_active = true` in database

### "Hash doesn't match"
- Password comparison failed
- Regenerate hash using the script
- Use exact same password

### "Module not found: bcryptjs"
```bash
npm install bcryptjs @types/bcryptjs
```

### Script not running
```bash
# Make sure you're in the correct directory
cd /home/abhishek/Work/REHAS/website/rehas-website

# Try with npx
npx ts-node src/lib/generateAdminPassword.ts "password"
```

---

## Example Setup Walkthrough

### Complete Admin Creation Process

```bash
# 1. Generate hash
npx ts-node src/lib/generateAdminPassword.ts "MySecurePass2024!"

# Output will be:
# Hash: $2b$12$abcd1234...
# 
# SQL:
# INSERT INTO admin_users (username, password_hash, email, is_active)
# VALUES (
#   'admin',
#   '$2b$12$abcd1234...',
#   'admin@rehas.com',
#   true
# );
```

```sql
-- 2. Execute in Supabase SQL Editor
INSERT INTO admin_users (username, password_hash, email, is_active)
VALUES (
  'admin',
  '$2b$12$abcd1234...',
  'admin@rehas.com',
  true
);
```

```
-- 3. Navigate to login page
https://your-domain.com/admin/login

-- 4. Login with credentials
Username: admin
Password: MySecurePass2024!

-- 5. Access dashboard
https://your-domain.com/admin/dashboard
```

---

## Support & Security

For security concerns or issues:
1. Check the troubleshooting section
2. Verify Supabase environment variables
3. Ensure HTTPS is enabled
4. Review Supabase security settings
5. Contact support if issues persist

**Remember**: Never share admin credentials or password hashes!
