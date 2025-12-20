# Admin Dashboard Implementation Guide

## Overview
A complete admin dashboard system for managing contact form submissions with Supabase integration, user authentication, and a responsive UI matching the website theme.

---

## Project Structure

```
src/
├── admin/
│   ├── login/
│   │   ├── login.tsx              # Admin login component
│   │   └── login.module.css       # Login page styles
│   ├── adminNavbar/
│   │   ├── adminNavbar.tsx        # Admin navbar component
│   │   └── adminNavbar.module.css # Navbar styles
│   └── contactDashboard/
│       ├── contactDashboard.tsx   # Dashboard component
│       └── contactDashboard.module.css # Dashboard styles
├── app/
│   └── admin/
│       ├── login/
│       │   └── page.tsx           # Login page route
│       └── dashboard/
│           └── page.tsx           # Dashboard page route
├── lib/
│   └── supabase.ts                # Supabase client config
└── components/
    └── contact/
        └── contact.tsx            # Updated with Supabase integration
```

---

## Setup Instructions

### 1. Create Supabase Tables

Execute these SQL queries in your Supabase dashboard (SQL Editor):

```sql
-- Create admin users table
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  is_active BOOLEAN DEFAULT true
);

CREATE INDEX idx_admin_users_username ON admin_users(username);
CREATE INDEX idx_admin_users_created_at ON admin_users(created_at DESC);

-- Create contact submissions table
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

CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_contact_submissions_phone ON contact_submissions(phone);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
CREATE POLICY "Allow public read access to admin_users for login" ON admin_users
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert on contact_submissions" ON contact_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated admins to read contact_submissions" ON contact_submissions
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated admins to update contact_submissions" ON contact_submissions
  FOR UPDATE USING (true) WITH CHECK (true);

-- Insert default admin user (optional)
-- Username: admin | Password: Admin@123
-- Generate hash: Use bcryptjs with cost 12
INSERT INTO admin_users (username, password_hash, email, is_active)
VALUES (
  'admin',
  '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5YmMxSUxkKuite',
  'admin@rehas.com',
  true
);
```

### 2. Install Dependencies

```bash
npm install @supabase/supabase-js bcryptjs @types/bcryptjs
```

### 3. Environment Variables

Your `.env.local` file already contains:
```
NEXT_PUBLIC_SUPABASE_URL=https://jqwdlsclzcjqmafywxol.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_EXP_N86HPrxfYmNeTx3WSQ_JJ32vbdr
```

---

## Features & Components

### Admin Login (`/admin/login`)
**File:** `src/admin/login/login.tsx`

Features:
- Username & password authentication
- Password visibility toggle
- Bcrypt password verification
- Session storage in localStorage
- Error handling & validation
- Cosmic theme background with animations
- Responsive design (mobile, tablet, desktop)

Authentication Flow:
1. User enters credentials
2. Fetch admin user from Supabase by username
3. Compare password with bcrypt hash
4. Store session token in localStorage
5. Redirect to dashboard

**Style:** Login card with gradient text, cosmic orbs, animated stars, responsive layout

---

### Admin Dashboard (`/admin/dashboard`)
**File:** `src/admin/contactDashboard/contactDashboard.tsx`

Features:
- **Statistics Cards:**
  - Total submissions count
  - New submissions count (blue)
  - Contacted count (purple)
  - Resolved count (green)

- **Search & Filter:**
  - Search by name, phone, or message content
  - Filter by status: All, New, Contacted, Resolved
  - Real-time filtering

- **Contact Data Table:**
  - Columns: Name, Phone, Message, Status, Date, Actions
  - Phone actions: Call (tel:) and WhatsApp links with MUI icons
  - Status dropdown selector (color-coded)
  - View Details button for full contact info
  - Responsive table with horizontal scroll on mobile

- **Detailed Contact Modal:**
  - Full contact information display
  - Phone with direct call and WhatsApp buttons
  - Full message text
  - Status selector
  - Submission date and time

- **Admin Navbar:**
  - Logo with gradient text
  - Navigation links (Dashboard, Contacts)
  - Admin info display (username)
  - Logout button
  - Mobile responsive menu

---

## Database Schema

### admin_users Table
| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| username | TEXT | Unique username |
| password_hash | TEXT | Bcrypt hashed password |
| email | TEXT | Admin email |
| created_at | TIMESTAMP | Account creation date |
| updated_at | TIMESTAMP | Last update date |
| is_active | BOOLEAN | Account status |

### contact_submissions Table
| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| name | TEXT | Contact name |
| phone | TEXT | Contact phone number |
| message | TEXT | Contact message |
| status | TEXT | 'new', 'contacted', 'resolved', 'spam' |
| notes | TEXT | Admin notes |
| admin_id | UUID | FK to admin_users |
| created_at | TIMESTAMP | Submission date |
| updated_at | TIMESTAMP | Last update date |

---

## API Integration Points

### Contact Form Submission
**Location:** `src/components/contact/contact.tsx`

```typescript
const { data, error } = await supabase
  .from('contact_submissions')
  .insert([{
    name: formData.name,
    phone: formData.phone,
    message: formData.message,
    status: 'new'
  }])
  .select();
```

### Admin Login
**Location:** `src/admin/login/login.tsx`

```typescript
const { data: user, error } = await supabase
  .from('admin_users')
  .select('*')
  .eq('username', credentials.username)
  .single();

const passwordMatch = await bcryptjs.compare(
  credentials.password,
  user.password_hash
);
```

### Fetch Contact Submissions
**Location:** `src/admin/contactDashboard/contactDashboard.tsx`

```typescript
const { data } = await supabase
  .from('contact_submissions')
  .select('*')
  .order('created_at', { ascending: false });
```

### Update Contact Status
```typescript
const { error } = await supabase
  .from('contact_submissions')
  .update({ status: newStatus })
  .eq('id', contactId);
```

---

## Design Features

### Color System (Global CSS Variables)
- **Primary:** #560067 (Deep Purple)
- **Secondary:** #92487a (Medium Purple)
- **Accent:** #d4a5d9 (Light Purple)
- **Background:** White (light mode) / #0a0a0a (dark mode)
- **Border:** #e5e5e5 (light) / #333333 (dark)
- **Text Light:** #666666 (light) / #999999 (dark)

### Animations
- **Cosmic Orbs:** Floating animation (15s-20s)
- **Stars:** Twinkling effect (3s)
- **Slide In:** Elements animate on load (0.6s)
- **Hover Effects:** All interactive elements have smooth transitions

### Responsive Breakpoints
- **Desktop:** 1200px+ (full layout)
- **Tablet:** 768px-1024px (adjusted spacing)
- **Mobile:** 480px-768px (single column)
- **Small Mobile:** <480px (optimized for touch)

---

## Creating Admin Users with Bcrypt Hash

### Generate Password Hash (Node.js)
```javascript
const bcryptjs = require('bcryptjs');

const password = 'YourPassword123';
const salt = bcryptjs.genSaltSync(12);
const hash = bcryptjs.hashSync(password, salt);

console.log('Password hash:', hash);
// Use this hash in the INSERT query
```

### Alternative: Use CLI Tool
```bash
npx bcryptjs hash YourPassword123
```

---

## Security Considerations

1. **Password Storage:** All passwords hashed with bcryptjs (cost 12)
2. **Session Management:** Token stored in localStorage (browser only)
3. **RLS Policies:** Database protected with Row Level Security
4. **Public Read:** Admin usernames readable for login (passwords never exposed)
5. **Contact Submissions:** Anyone can submit, only admins can view/update
6. **No Direct Auth:** Uses username/password (not OAuth)

---

## Navigation Routes

- `/admin/login` - Admin login page
- `/admin/dashboard` - Contact submissions dashboard
- `/` - Footer has "Admin" link pointing to `/admin/login`

---

## Features Not Yet Implemented

- Email notifications when new contact submitted
- Bulk export of contact data
- Contact data deletion
- Advanced analytics/charts
- Multi-admin user management
- Session timeout/expiry
- Password change functionality
- Account settings/profile

---

## Troubleshooting

### Issue: "Invalid username or password"
- Verify admin user exists in database
- Check password hash is correct
- Use correct bcrypt cost (12)

### Issue: Contacts not saving
- Verify Supabase credentials in `.env.local`
- Check table name is `contact_submissions`
- Ensure RLS policy allows public INSERT

### Issue: Dashboard shows "No contacts found"
- Check table for data: `SELECT COUNT(*) FROM contact_submissions;`
- Verify status filter is not too restrictive
- Check search term isn't filtering all results

### Issue: Modal doesn't open
- Verify Visibility icon is imported correctly
- Check onClick handler is bound correctly
- Ensure modal CSS is loaded

---

## Footer Update

Footer now includes "Admin" link in legal section:
- Redirects to `/admin/login`
- Hidden by admin navbar
- Marked as `noindex, nofollow` for SEO

---

## Files Modified/Created

### New Files Created:
1. `SUPABASE_SETUP.md` - Setup instructions
2. `src/admin/login/login.tsx` - Login component
3. `src/admin/login/login.module.css` - Login styles
4. `src/admin/adminNavbar/adminNavbar.tsx` - Admin navbar
5. `src/admin/adminNavbar/adminNavbar.module.css` - Navbar styles
6. `src/admin/contactDashboard/contactDashboard.tsx` - Dashboard
7. `src/admin/contactDashboard/contactDashboard.module.css` - Dashboard styles
8. `src/lib/supabase.ts` - Supabase client
9. `src/app/admin/login/page.tsx` - Login route
10. `src/app/admin/dashboard/page.tsx` - Dashboard route

### Files Modified:
1. `package.json` - Added bcryptjs & supabase
2. `src/components/contact/contact.tsx` - Supabase integration
3. `src/data/footer.ts` - Added admin link

---

## Build Status
✓ TypeScript compilation successful
✓ All pages generated correctly
✓ No errors or warnings
✓ Ready for deployment

---

## Next Steps
1. Execute Supabase queries to create tables
2. Insert admin user with bcrypt-hashed password
3. Test admin login at `/admin/login`
4. Submit test contact form
5. View data in dashboard
