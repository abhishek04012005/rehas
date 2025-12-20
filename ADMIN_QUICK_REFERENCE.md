# Admin Dashboard Quick Reference

## 🚀 Quick Start (5 Minutes)

### 1. Generate Admin Password Hash
```bash
npx ts-node src/lib/generateAdminPassword.ts "YourSecurePass123!"
```
**Output**: SQL INSERT statement with hashed password

### 2. Execute SQL in Supabase
1. Supabase Dashboard → SQL Editor → New Query
2. Paste the SQL from step 1
3. Click Run

### 3. Login to Dashboard
- URL: `https://your-domain.com/admin/login`
- Username: `admin`
- Password: `YourSecurePass123!` (plain text, not hash)

### 4. Start Managing Contacts
- View all submissions in dashboard
- Search by name, phone, or message
- Filter by status (New, Contacted, Resolved, Spam)
- Call or WhatsApp directly from table
- View full details in popup modal

---

## 📊 Dashboard Features

### Stats Cards
- 📧 Total Submissions
- ✨ New (unreviewed)
- 📞 Contacted (reached out)
- ✅ Resolved (handled)

### Search & Filter
- 🔍 Search by name/phone/message
- 🏷️ Filter by status
- 📅 Auto-sorted by date (newest first)

### Contact Actions
- 📞 Call button (tel:// link)
- 💬 WhatsApp button (direct message)
- 👁️ View full details
- ✏️ Update status

### Contact Statuses
- **New**: Not yet contacted
- **Contacted**: Reached out to user
- **Resolved**: Issue handled
- **Spam**: Mark as spam

---

## 🔐 Password Management

### Generate New Password Hash
```bash
npx ts-node src/lib/generateAdminPassword.ts "MyNewPassword456!"
```

### Password Requirements
- ✓ At least 12 characters
- ✓ Mix of uppercase & lowercase
- ✓ Include numbers
- ✓ Include special characters (!@#$%^&*)

### Good Examples
```
✓ MyRehas@Cosmic2024!
✓ Admin$Welcome#892Wise
✗ admin123
✗ password
```

### Reset Forgotten Password
```sql
-- Step 1: Get new hash from password generator
-- Step 2: Run in Supabase SQL Editor
UPDATE admin_users
SET password_hash = 'NEW_HASH_HERE'
WHERE username = 'admin';
```

---

## 🗄️ Database Tables

### admin_users
```
├── id (UUID)
├── username (TEXT)
├── password_hash (TEXT)
├── email (TEXT)
├── created_at (TIMESTAMP)
├── updated_at (TIMESTAMP)
└── is_active (BOOLEAN)
```

### contact_submissions
```
├── id (UUID)
├── name (TEXT)
├── phone (TEXT)
├── message (TEXT)
├── status (TEXT: new/contacted/resolved/spam)
├── created_at (TIMESTAMP)
├── updated_at (TIMESTAMP)
├── notes (TEXT)
└── admin_id (UUID)
```

---

## 📂 File Structure

```
src/
├── admin/
│   ├── login/
│   │   ├── login.tsx
│   │   └── login.module.css
│   ├── adminNavbar/
│   │   ├── adminNavbar.tsx
│   │   └── adminNavbar.module.css
│   └── contactDashboard/
│       ├── contactDashboard.tsx
│       └── contactDashboard.module.css
├── components/
│   └── contact/
│       ├── contact.tsx
│       └── contact.module.css
├── lib/
│   ├── supabase.ts
│   └── generateAdminPassword.ts
└── app/
    └── admin/
        ├── login/
        │   └── page.tsx
        └── dashboard/
            └── page.tsx
```

---

## 🔗 Important URLs

| Page | URL | Purpose |
|------|-----|---------|
| Admin Login | `/admin/login` | Login page |
| Dashboard | `/admin/dashboard` | Contact management |
| Contact Form | `/contact` | User contact form |
| Home | `/` | Homepage |
| Footer Link | Footer → Admin | Direct link to login |

---

## ⚙️ Environment Setup

### .env.local
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-anon-key
```

### Get These From:
1. Supabase Dashboard
2. Click Settings (bottom left)
3. Click API on left sidebar
4. Copy Project URL and Anon Key

---

## 🛡️ Security Checklist

- [ ] Changed default username (not "admin")
- [ ] Used strong password (12+ chars)
- [ ] Never shared password or hash
- [ ] Enabled HTTPS in production
- [ ] Set up environment variables
- [ ] Tested login/logout
- [ ] Verified contact form works
- [ ] Checked RLS policies are enabled
- [ ] Reviewed user permissions
- [ ] Backed up credentials

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Invalid username or password" | Check spelling, ensure user is active |
| "Module not found: bcryptjs" | Run `npm install bcryptjs` |
| "Can't connect to database" | Check NEXT_PUBLIC_SUPABASE_URL |
| "Permission denied" | Verify RLS policies in Supabase |
| "Forgot admin password" | Use password generator to reset |

---

## 📞 Contact Form Flow

```
User submits contact form
        ↓
Data sent to Supabase
        ↓
Stored in contact_submissions table
        ↓
Admin sees in dashboard
        ↓
Admin can call/WhatsApp/email
        ↓
Admin updates status
```

---

## 💡 Tips & Tricks

### Bulk Import Contacts
```sql
INSERT INTO contact_submissions (name, phone, message, status)
VALUES 
  ('John Doe', '+1234567890', 'Message 1', 'new'),
  ('Jane Smith', '+0987654321', 'Message 2', 'new');
```

### Export All Contacts
```sql
SELECT * FROM contact_submissions ORDER BY created_at DESC;
```

### Check Login Attempts
```sql
SELECT username, COUNT(*) as attempts
FROM admin_users
GROUP BY username;
```

### Archive Old Contacts
```sql
DELETE FROM contact_submissions
WHERE created_at < NOW() - INTERVAL '6 months'
  AND status = 'resolved';
```

---

## 📚 Documentation Files

- **SUPABASE_SETUP.md** - Full database setup guide
- **ADMIN_SETUP_GUIDE.md** - Detailed admin setup instructions
- **generateAdminPassword.ts** - Password hash generator script
- **contact.tsx** - Contact form with Supabase integration
- **login.tsx** - Admin login page
- **contactDashboard.tsx** - Dashboard page

---

## 🎯 Next Steps

1. ✅ Run password generator
2. ✅ Create admin user in Supabase
3. ✅ Test login at `/admin/login`
4. ✅ Send test contact form
5. ✅ Verify data in dashboard
6. ✅ Test call/WhatsApp buttons
7. ✅ Deploy to production

---

## 📞 Support

For issues:
1. Check Troubleshooting section above
2. Review ADMIN_SETUP_GUIDE.md
3. Check SUPABASE_SETUP.md
4. Verify environment variables
5. Check browser console for errors
6. Review Supabase logs

**Security First**: Never log passwords or hashes!
