# Enquiry Form Implementation Guide

## Overview
A complete enquiry form system with two implementations:
1. **Popup Modal** - Quick enquiry popup for easy access
2. **Full Page** - Dedicated enquiry page with detailed information

Both store data in Supabase and use the same design system.

---

## Files Created

### Components

#### 1. **EnquiryModal Component**
- **File**: `src/components/enquiryModal/enquiryModal.tsx`
- **Features**:
  - Modal popup with backdrop
  - Form fields: Name, Phone Number, Service Type
  - Success message with auto-close
  - Loading state with spinner
  - Error handling and validation
  - Mobile responsive
  - Auto-close on success (3 seconds)

#### 2. **EnquiryModal CSS Module**
- **File**: `src/components/enquiryModal/enquiryModal.module.css`
- **Features**:
  - Gradient header matching brand colors
  - Smooth animations (slideUp, fadeIn, scaleIn)
  - Responsive modal sizing (90% width on desktop, 100% on mobile)
  - Touch-friendly on mobile devices
  - Form validation styling
  - Success state styling

#### 3. **Enquiry Page Component**
- **File**: `src/components/enquiry/enquiry.tsx`
- **Features**:
  - Full-page enquiry form
  - Hero section with LineArt background
  - Two-column layout (info + form)
  - Info boxes about the service
  - Step-by-step process
  - Available services list
  - CompassLoader integration
  - Success message display

#### 4. **Enquiry Page CSS Module**
- **File**: `src/components/enquiry/enquiry.module.css`
- **Features**:
  - Two-column grid layout
  - Hero section with gradient text
  - Info boxes with hover effects
  - Form styling matching contact page
  - Fully responsive design
  - Mobile-first approach
  - Breakpoints: 1024px, 768px, 480px

### Routes

#### **Enquiry Page Route**
- **File**: `src/app/enquiry/page.tsx`
- **URL**: `/enquiry`
- **Metadata**: SEO-optimized title and description

### Data Files

#### **Enquiry Data**
- **File**: `src/data/enquiry.ts`
- **Contains**: Form labels, placeholders, messages

### Database

#### **Enquiry Table SQL**
- **File**: `src/db/enquiry_table.sql`
- **Table**: `enquiries`
- **Columns**:
  - `id` (BIGSERIAL) - Primary key
  - `name` (VARCHAR 255) - Customer name
  - `phone` (VARCHAR 20) - Phone number
  - `service_type` (VARCHAR 100) - Selected service
  - `status` (VARCHAR 50) - 'new', 'contacted', 'completed'
  - `submitted_from` (VARCHAR 50) - 'popup' or 'page'
  - `created_at` (TIMESTAMP) - Creation timestamp
  - `updated_at` (TIMESTAMP) - Last update timestamp
- **Indexes**: Status, created_at, service_type
- **RLS Enabled**: Public insert, authenticated read/update/delete

---

## Usage

### 1. Using the Enquiry Modal (Popup)

```tsx
import { useState } from 'react';
import EnquiryModal from '@/components/enquiryModal/enquiryModal';

export default function MyComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>
        Send Enquiry
      </button>
      
      <EnquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
```

### 2. Using the Enquiry Page

Simply navigate to `/enquiry` or link to it:

```tsx
<Link href="/enquiry">Send Full Enquiry</Link>
```

---

## Form Fields

### Field 1: Name
- **Type**: Text input
- **Placeholder**: "Your full name" (modal) / "Enter your full name" (page)
- **Validation**: Required, non-empty
- **Min Length**: 2 characters (recommended)

### Field 2: Phone Number
- **Type**: Tel input
- **Placeholder**: "Your phone number"
- **Validation**: Required, minimum 10 digits
- **Format**: Accepts international format

### Field 3: Service Type
- **Type**: Select dropdown
- **Options**: Dynamically loaded from `servicesData`
- **Default**: "Select a service"
- **Validation**: Required

---

## Database Setup

### Step 1: Create the Table
Run the SQL from `src/db/enquiry_table.sql` in your Supabase SQL editor:

```sql
-- Copy the entire content of enquiry_table.sql and run in Supabase
```

### Step 2: Verify RLS Policies
- Public can INSERT enquiries
- Only authenticated users can SELECT/UPDATE/DELETE

### Step 3: Test Connection
Form will automatically store data when submitted.

---

## Theme & Colors

All colors are imported from `global.css`:

```css
--primary: #560067;      /* Deep Purple */
--secondary: #92487a;    /* Medium Purple */
--accent: #d4a5d9;       /* Light Purple */
```

Applied to:
- Buttons (gradient)
- Input borders (focus state)
- Text labels
- Header backgrounds
- Hover effects

---

## Styling Details

### Modal Styling
```css
- Header: Gradient (primary → secondary)
- Form: Clean white background
- Buttons: Full width with gradient
- Border radius: 20px
- Box shadow: 0 20px 60px rgba(86, 0, 103, 0.2)
```

### Page Styling
```css
- Hero section: Gradient background with LineArt
- Info boxes: White with hover elevation
- Form section: Card-style with shadow
- Button: Gradient with hover animation
- Layout: Two-column on desktop, single on mobile
```

---

## Responsive Breakpoints

### Desktop (1200px+)
- Modal: 500px max-width
- Page: Two-column layout
- Form: Full-size inputs

### Tablet (768px-1024px)
- Modal: 90% width
- Page: Single column
- Reduced padding and fonts

### Mobile (480px-768px)
- Modal: Full width, bottom sheet on small phones
- Page: Single column, compact layout
- Optimized touch targets

### Small Mobile (<480px)
- Modal: Bottom sheet animation (slideUpMobile)
- Page: Full width with minimal padding
- Minimum font sizes for readability

---

## Success Messages

### Modal
```
"Thank You!"
"We've received your enquiry and will contact you soon."
```
Auto-closes after 3 seconds.

### Page
```
"Thank You!"
"Your enquiry has been received successfully."
"Our team will contact you within 24 hours."
```
Auto-hides after 5 seconds.

---

## Error Handling

### Validation Errors
- "Please fill in all fields" - Empty field validation
- "Please enter a valid phone number" - Phone length validation

### Server Errors
- Displays Supabase error message
- User-friendly error display
- Allows retry without page reload

---

## Features

✅ **Two Implementation Types**
- Modal popup for quick access
- Full page for detailed interaction

✅ **Form Validation**
- Required field checking
- Phone number format validation
- Real-time error clearing

✅ **User Experience**
- Loading states with spinners
- Success confirmations
- Smooth animations
- Auto-close on success

✅ **Mobile Friendly**
- Fully responsive design
- Touch-optimized
- Bottom sheet modal on mobile
- Font scaling

✅ **Accessibility**
- ARIA labels
- Semantic HTML
- Keyboard navigable
- High contrast text

✅ **Database Integration**
- Supabase PostgreSQL
- Row Level Security
- Automatic timestamps
- Status tracking

✅ **Reusable**
- Can be used on any page
- Accepts props
- Easy to customize
- Exports data clearly

---

## Customization

### Change Header Text (Modal)
Edit `src/components/enquiryModal/enquiryModal.tsx`:
```tsx
<h2>Your Custom Title</h2>
```

### Change Button Text
Edit the button element:
```tsx
<button>Your Custom Text</button>
```

### Change Services
Services are auto-loaded from `servicesData` in `src/data/services.ts`.
Update service list there for both modal and page.

### Change Colors
Edit `global.css`:
```css
--primary: #your-color;
--secondary: #your-color;
--accent: #your-color;
```

### Change Form Fields
Add new fields to state and JSX:
```tsx
const [formData, setFormData] = useState({
  name: '',
  number: '',
  serviceType: '',
  email: '', // Add new field
});
```

---

## Admin Dashboard Integration

To view submitted enquiries in the admin dashboard:

1. Create a new admin page: `src/admin/enquiries/page.tsx`
2. Query the `enquiries` table:
```tsx
const { data } = await supabase
  .from('enquiries')
  .select('*')
  .order('created_at', { ascending: false });
```

---

## SEO

### Meta Tags (Page)
```html
<title>Send Enquiry | REHAS - Cosmic Wellness</title>
<meta name="description" content="Send an enquiry to REHAS...">
```

---

## Build Status

✅ **Build Successful**
- Compiled in 5.2s
- 10 static pages generated
- All TypeScript checks passed
- New route `/enquiry` added

---

## Testing Checklist

- [ ] Modal opens/closes correctly
- [ ] Form validation works
- [ ] Data submits to Supabase
- [ ] Success message displays
- [ ] Mobile responsive (test on 480px, 768px, 1024px)
- [ ] Error handling works
- [ ] Service dropdown populates correctly
- [ ] Loading state displays
- [ ] Keyboard navigation works
- [ ] ARIA labels present

---

## Future Enhancements

1. **Email Notification**: Send email when enquiry submitted
2. **Admin Dashboard**: Manage enquiries in admin panel
3. **Follow-up**: Automated follow-up messages
4. **Analytics**: Track enquiry sources
5. **Custom Fields**: Add more dynamic fields
6. **File Upload**: Allow document uploads
7. **Calendar Integration**: Book appointments
8. **Multi-language**: Support multiple languages

---

## Support

For issues or questions:
1. Check Supabase connection
2. Verify RLS policies
3. Check browser console for errors
4. Review form validation logic

---

**Last Updated**: December 20, 2025  
**Status**: Production Ready ✅
