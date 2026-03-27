# Customizable Free Programs Popup - Complete Guide

## Overview

The redesigned Free Programs popup now features:
- **Premium UI/UX** with gradient backgrounds, smooth animations, and interactive hover effects
- **MUI Icons** for professional appearance (FitnessCenter, Favorite, Psychology)
- **Full Customization** through admin panel - edit everything without code
- **Responsive Design** that works perfectly on mobile and desktop

---

## Database Setup

### Step 1: Run Migration SQL

Execute these queries in your Supabase SQL Editor to update your existing `settings` table:

```sql
-- Add new columns to customize popup content
ALTER TABLE settings ADD COLUMN IF NOT EXISTS free_programs_subtitle VARCHAR(255) DEFAULT 'Limited Time Offers - Join Now!';
ALTER TABLE settings ADD COLUMN IF NOT EXISTS free_programs_cta_text VARCHAR(255) DEFAULT 'Ready to start your wellness journey?';
ALTER TABLE settings ADD COLUMN IF NOT EXISTS programs_config JSONB DEFAULT '[
  {
    "id": "yoga",
    "title": "YOGA Practice Session",
    "schedule": "Monday to Friday",
    "time": "5:00 AM - 6:00 AM",
    "description": "Start your day with energizing yoga practice. Perfect for beginners and experienced practitioners."
  },
  {
    "id": "healing",
    "title": "SELF HEALING Practice & Webinar",
    "schedule": "Every Saturday",
    "time": "Interactive Session",
    "description": "Learn powerful self-healing techniques and join our expert-led webinars to transform your wellness."
  },
  {
    "id": "stress",
    "title": "Stress & Anxiety Management & Meditation",
    "schedule": "Every Sunday",
    "time": "Meditation & Coaching",
    "description": "Master stress relief and anxiety management through guided meditation and expert coaching."
  }
]'::jsonb;
```

---

## What You Can Customize

### 1. Popup Display Settings

Navigate to `/admin/settings` and toggle:

- **Enable Popups** - Master toggle to turn all popups on/off
- **Show Enquiry Popup** - Display enquiry form popup
- **Show Free Programs Popup** - Display promotional popup (recommended: ON)

### 2. Popup Text Content

Edit these fields in the admin panel:

| Field | Current Value | Purpose |
|-------|---------------|---------|
| **Free Programs Title** | `FREE Programs` | Main heading in popup |
| **Subtitle** | `Limited Time Offers - Join Now!` | Secondary heading |
| **CTA Text** | `Ready to start your wellness journey?` | Text before "Enquiry Now" button |

**Example customization:**
- Title: `OUR WELLNESS PROGRAMS`
- Subtitle: `Transform Your Life Today`
- CTA: `Join Our Community Now`

### 3. Program Details

Each program card can be fully customized:

#### Program 1: YOGA
- **Title** → Change program name
- **Schedule** → Edit day/frequency (e.g., "Monday to Friday")
- **Time** → Edit time slot (e.g., "5:00 AM - 6:00 AM")
- **Description** → Full program description

#### Program 2: HEALING
- Complete control over all 4 fields above

#### Program 3: STRESS MANAGEMENT
- Complete control over all 4 fields above

---

## Admin Panel Navigation

### Accessing Settings

1. Go to `/admin/login`
2. Login with admin credentials
3. Navigate to `/admin/settings`
4. Scroll to **Popup Settings** section

### Making Changes

1. Toggle any switch to enable/disable features
2. Edit text fields directly
3. For programs, scroll to **Customize Programs** section
4. Click the field and start typing to edit
5. Click **Save Settings** button

### Changes Take Effect

- ✅ Immediately on homepage (within 3 seconds of page load)
- ✅ Applied across all sessions
- ✅ Database persists changes

---

## Visual Design Features

### Color Scheme (from globals.css)

The popup uses your theme colors:
- **Primary**: #560067 (purple)
- **Secondary**: #92487a (mauve)
- **Accent**: #d4a5d9 (light purple)

### UI Components

1. **Header**
   - Gradient background (purple → mauve)
   - Large, bold title
   - Decorative circular elements
   - Close button (X icon)

2. **Program Cards**
   - Hover animation (slight move right, shadow expansion)
   - Icon box (background changes on hover)
   - MUI icon (FitnessCenter, Favorite, Psychology)
   - Schedule info with inline icons (Calendar, Clock)
   - Description text
   - FREE badge (gradient background)
   - Arrow icon (appears on hover)

3. **CTA Section**
   - Text prompt for user
   - Prominent "Enquiry Now" button
   - Button icon animates on hover

4. **Mobile Responsive**
   - Cards stack vertically on mobile
   - Icons and arrows hide on small screens
   - Text sizes adjust for readability
   - Modal width optimized for mobile

---

## Popup Display Logic

### Priority System

When homepage loads, popup appears after 3 seconds:

```
IF both Enquiry and Free Programs enabled:
  → Show FREE Programs popup (higher priority)
ELSE IF only Enquiry enabled:
  → Show Enquiry popup
ELSE IF only Free Programs enabled:
  → Show Free Programs popup
ELSE:
  → No popup shown
```

### Session Storage

- Popup shows only once per session
- Refreshing page doesn't re-show popup
- Clearing session storage resets popup display
- Closing popup sets session marker

---

## Integration Features

### Cross-Popup Linking

- "Enquiry Now" button in Free Programs popup:
  - Closes Free Programs popup
  - Opens Enquiry form modal
  - User can submit contact details
  - Form is pre-integrated with contact system

### Customizable Programs Content

Each program can have:
- Custom title (e.g., "Advanced Yoga" or "Beginner Yoga")
- Custom schedule (any day/frequency)
- Custom time (any time slot)
- Custom description (marketing copy)

---

## Common Customizations

### Example 1: Weekend Programs Only

Edit programs to show weekend availability:
- Yoga: "Friday to Sunday" at "6:00 PM - 7:00 PM"
- Healing: "Saturday & Sunday" at different times
- Stress: "Sunday Evening" at "7:00 PM - 8:00 PM"

### Example 2: Multiple Program Instances

Can't change program names? Each program can have different titles:
- "Premium Yoga Class" (vs. regular "YOGA Practice Session")
- "Private Healing Sessions" (vs. "SELF HEALING Practice & Webinar")
- "Corporate Stress Workshop" (vs. "Stress & Anxiety Management")

### Example 3: Seasonal Updates

Update programs for different seasons:
- Summer: Add "5:00 PM - 6:00 PM" timings
- Winter: Change to "6:00 AM - 7:00 AM" timings
- Update descriptions with seasonal benefits

---

## Database Schema

### settings table

```sql
CREATE TABLE settings (
  id SERIAL PRIMARY KEY,
  popup_enabled BOOLEAN DEFAULT true,
  show_enquiry_popup BOOLEAN DEFAULT true,
  show_free_programs_popup BOOLEAN DEFAULT true,
  free_programs_title VARCHAR(255) DEFAULT 'FREE Programs',
  free_programs_subtitle VARCHAR(255) DEFAULT 'Limited Time Offers - Join Now!',
  free_programs_cta_text VARCHAR(255) DEFAULT 'Ready to start your wellness journey?',
  programs_config JSONB DEFAULT '[...]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### programs_config Structure

```json
[
  {
    "id": "yoga",
    "title": "YOGA Practice Session",
    "schedule": "Monday to Friday",
    "time": "5:00 AM - 6:00 AM",
    "description": "Start your day with energizing yoga practice..."
  },
  // ... more programs
]
```

---

## Troubleshooting

### Popup Not Showing

**Check:**
1. Is `popup_enabled` toggle ON in admin panel?
2. Is at least one of the popup toggles ON?
3. Did you run the database migration SQL?
4. Clear browser cache and session storage

**Fix:**
```javascript
// Clear session storage in browser console:
sessionStorage.removeItem('enquiryPopupShown');
```

### Popup Shows Immediately

**Check:**
1. Component has intentional 3-second delay
2. Session storage prevents re-display in same session
3. Refresh page to see popup again

### Programs Not Updating

**Possible Causes:**
1. Database changes not saved
2. Old page cached (clear browser cache)
3. Session storage still showing old popup
4. Check browser console for errors

**Fix:**
1. Go to `/admin/settings`
2. Click "Save Settings" again
3. Clear session: `sessionStorage.clear()`
4. Refresh homepage

### Admin Panel Shows "Loading..."

**Check:**
1. Are you logged in?
2. Does `settings` table exist in Supabase?
3. Check browser console for errors

**If table missing:**
- Run the migration SQL from Step 1
- Refresh admin page

---

## Component Files

### Modified Files

1. **[src/components/freeProgramsPopup/freeProgramsPopup.tsx](../src/components/freeProgramsPopup/freeProgramsPopup.tsx)**
   - Redesigned with MUI icons
   - Accepts customizable programs array
   - Interactive hover effects
   - Fully responsive

2. **[src/components/freeProgramsPopup/freeProgramsPopup.module.css](../src/components/freeProgramsPopup/freeProgramsPopup.module.css)**
   - Premium gradient styling
   - Smooth animations
   - Mobile-responsive layouts
   - Color-coded sections

3. **[src/components/autoEnquiryPopup/autoEnquiryPopup.tsx](../src/components/autoEnquiryPopup/autoEnquiryPopup.tsx)**
   - Fetches all customizable settings
   - Handles popup priority logic
   - Passes data to FreeProgramsPopup

4. **[src/admin/settingsDashboard/settingsDashboard.tsx](../src/admin/settingsDashboard/settingsDashboard.tsx)**
   - Full UI for customization
   - Edit all popup content
   - Edit all program details
   - Save/error handling

5. **[src/db/settings_table.sql](../src/db/settings_table.sql)**
   - Database schema definition
   - Default values for all fields

---

## Performance Notes

- ✅ Popup logic optimizes for early return (if disabled)
- ✅ Session storage prevents repeated queries
- ✅ Lazy loads on homepage via component
- ✅ No performance impact when popup disabled
- ✅ Animations use CSS (GPU-accelerated)

---

## Next Steps

1. **Run Database Migration** → Execute SQL from Step 1
2. **Visit Admin Panel** → `/admin/settings`
3. **Customize Content** → Edit all fields as needed
4. **Save** → Click "Save Settings" button
5. **Test** → Visit homepage, wait 3 seconds for popup
6. **Verify** → Check styling and customized content

---

## Support

For issues:
1. Check browser console for errors
2. Verify database table exists
3. Clear session storage
4. Run database migration again
5. Check admin login status

---

**Last Updated**: March 27, 2026  
**Version**: 2.0 - Fully Customizable Design  
**Status**: ✅ Ready for Production
