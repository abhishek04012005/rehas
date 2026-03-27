# Dual Popup System - Implementation Guide

## Overview
The REHAS website now features a customizable dual-popup system where admins can toggle between:
1. **Enquiry Popup** - Collects visitor contact information
2. **Free Programs Popup** - Promotes FREE programs (YOGA, SELF HEALING, Stress Management)

Both can be enabled/disabled independently through the admin settings panel.

---

## 📋 Database Setup

### Step 1: Update Settings Table
Run the following SQL in your Supabase SQL Editor:

```sql
-- Alter settings table to add new columns
ALTER TABLE settings ADD COLUMN IF NOT EXISTS show_enquiry_popup BOOLEAN DEFAULT true;
ALTER TABLE settings ADD COLUMN IF NOT EXISTS show_free_programs_popup BOOLEAN DEFAULT true;
ALTER TABLE settings ADD COLUMN IF NOT EXISTS free_programs_title VARCHAR(255) DEFAULT 'FREE Programs';

-- Update existing records to include new columns
UPDATE settings 
SET 
  show_enquiry_popup = true,
  show_free_programs_popup = true,
  free_programs_title = 'FREE Programs'
WHERE show_enquiry_popup IS NULL;
```

**Or**, if creating a fresh setup, use `src/db/settings_table.sql`.

---

## 🎨 Components Created

### 1. FreeProgramsPopup Component
**Location**: `src/components/freeProgramsPopup/`

Features:
- Displays 3 FREE programs:
  - 🧘 YOGA Practice Session (Mon-Fri, 5-6 AM)
  - 💚 SELF HEALING Practice & Webinar (Every Saturday)
  - 🧠 Stress & Anxiety Management (Every Sunday)
- **"Enquiry Now" button** links to enquiry modal
- Modern card-based design
- Fully responsive
- Customizable title

### 2. Updated AutoEnquiryPopup Component
**Location**: `src/components/autoEnquiryPopup/autoEnquiryPopup.tsx`

Logic:
- Fetches popup settings from database
- Prioritizes Free Programs popup if both enabled
- Falls back to Enquiry popup only if Free Programs disabled
- Session storage prevents repeated displays
- Smart error handling with safe defaults

### 3. Enhanced Settings Dashboard
**Location**: `src/admin/settingsDashboard/`

New Controls:
- **Enable Popups** - Master toggle for all popups
- **Show Enquiry Popup** - Toggle enquiry form visibility
- **Show Free Programs Popup** - Toggle free programs visibility
- **Free Programs Title** - Customize popup title (e.g., "FREE Programs", "Special Offers", etc.)

---

## 🔧 Admin Settings

### Access Settings Panel
1. Login to `/admin/login`
2. Navigate to `/admin/settings`
3. Scroll to "Popup Settings"

### Configuration Options

| Setting | Type | Default | Purpose |
|---------|------|---------|---------|
| Enable Popups | Toggle | ON | Master switch (turn OFF to disable all popups) |
| Show Enquiry Popup | Toggle | ON | Display enquiry form popup |
| Show Free Programs Popup | Toggle | ON | Display free programs popup |
| Free Programs Title | Text | "FREE Programs" | Popup title customization |

### Popup Priority Logic
When both popups are enabled:
- **Free Programs popup** shows first
- User can click "Enquiry Now" to open enquiry form
- User can close free programs popup to skip enquiry

---

## 📱 Popup Behavior

### Timeline
1. **Page Load**: Settings fetched from database
2. **After 3 seconds**: Popup appears (if enabled)
3. **Session Storage**: Popup marked as shown in current session
4. **User Can**:
   - Close with X button
   - Click "Enquiry Now" (only in Free Programs popup)
   - Interact with enquiry form if it opens

### Fallback Behavior
If database is unavailable:
- Both popups enabled by default (safe fallback)
- Warning logged to console
- No blocking errors

---

## 📝 Customization Examples

### Scenario 1: Only Show Enquiry Popup
Settings:
- Show Enquiry Popup: **ON**
- Show Free Programs Popup: **OFF**

Result: Only enquiry form popup appears

### Scenario 2: Only Show Free Programs
Settings:
- Show Enquiry Popup: **OFF**
- Show Free Programs Popup: **ON**

Result: Only free programs popup appears with "Enquiry Now" button

### Scenario 3: Custom Title
Settings:
- Free Programs Title: **"Join Our FREE Wellness Programs"**

Result: Popup displays custom title instead of default

### Scenario 4: Disable All Popups
Settings:
- Enable Popups: **OFF**

Result: No popups appear (all disabled)

---

## 🎯 Free Programs Popup Content

### Program Cards
Each card displays:
- **Icon** (emoji)
- **Program Name**
- **Schedule**
- **Time/Frequency**
- **Description**
- **FREE Badge**

### Programs Included
1. **YOGA Practice Session**
   - Schedule: Monday to Friday
   - Time: 5:00 AM - 6:00 AM
   
2. **SELF HEALING Practice & Webinar**
   - Schedule: Every Saturday
   - Interactive Session

3. **Stress & Anxiety Management & Meditation**
   - Schedule: Every Sunday
   - Guided Meditation & Coaching

---

## 💡 Integration Points

### Homepage
- `src/app/layout.tsx` includes `<AutoEnquiryPopup />`
- Automatically fires on all pages via layout

### Admin Dashboard
- Access via `/admin/settings`
- Edit popup settings in real-time
- Changes saved to `settings` table

### Supabase
- Settings stored in `settings` table
- Auto-syncs to frontend on page load

---

## 🧪 Testing Checklist

- [ ] Database setup complete (new columns added)
- [ ] Admin Settings page loads without errors
- [ ] Can toggle all 4 settings
- [ ] Can edit Free Programs title
- [ ] Settings save successfully (green popup message)
- [ ] Homepage shows correct popup after 3 seconds
- [ ] Free Programs "Enquiry Now" opens enquiry modal
- [ ] Close button hides popup
- [ ] Popup doesn't re-appear (session storage works)
- [ ] Works on mobile devices (responsive)

---

## 🔌 API Endpoints

### Popup Display Logic
- **Endpoint**: Supabase `settings` table
- **Columns Used**:
  - `popup_enabled` (boolean)
  - `show_enquiry_popup` (boolean)
  - `show_free_programs_popup` (boolean)
  - `free_programs_title` (string)

---

## 📦 Files Modified/Created

### Created
- `src/components/freeProgramsPopup/freeProgramsPopup.tsx`
- `src/components/freeProgramsPopup/freeProgramsPopup.module.css`
- `src/components/freeProgramsPopup/index.ts`

### Modified
- `src/components/autoEnquiryPopup/autoEnquiryPopup.tsx`
- `src/admin/settingsDashboard/settingsDashboard.tsx`
- `src/admin/settingsDashboard/settingsDashboard.module.css`
- `src/db/settings_table.sql`

---

## 🚀 Deployment Steps

1. **Update Database Schema**
   - Run SQL from `SUPABASE_SETUP.md` or `src/db/settings_table.sql`

2. **Deploy Code**
   - `git push` to deploy changes
   - Run `npm run build` to verify

3. **Test Admin Panel**
   - Visit `/admin/settings`
   - Test popup toggles

4. **Monitor Homepage**
   - Visit homepage
   - Wait 3 seconds for popup
   - Verify correct popup appears

---

## ⚙️ Environment Requirements

- Next.js 16.1+
- Supabase with `settings` table
- `.env.local` with Supabase credentials

---

## 🆘 Troubleshooting

### Popup not appearing
- Check `popup_enabled` is true
- Check browser console for errors
- Verify database connection
- Session storage might block it (refresh browser)

### Wrong popup showing
- Check `show_enquiry_popup` and `show_free_programs_popup` toggles
- Free Programs takes priority if both enabled

### Settings not saving
- Check Supabase table has all columns
- Verify admin session is valid
- Check browser console for errors

### "Settings table does not exist" error
- Run SQL setup from `SUPABASE_SETUP.md`
- Ensure Supabase project is initialized

---

## 📞 Support

For issues or questions:
1. Check `/admin/settings` error messages
2. Review browser console for detailed errors
3. Verify Supabase connection and table schema
4. Check database has all required columns

---

**Version**: 1.0  
**Last Updated**: March 2026