# OTP Email Fix - Quick Verification

## What Changed

✅ **EmailJS OTP email sending is now ENABLED**

The code that was commented out has been uncommented. Your OTP emails should now be sent to users' inboxes.

## Quick Checklist

### 1. Your EmailJS Configuration (Verified ✅)

From `.env.local`:
```
✅ NEXT_PUBLIC_EMAILJS_OTP_PUBLIC_KEY=configured
✅ NEXT_PUBLIC_EMAILJS_OTP_SERVICE_ID=service_fekd1ke
✅ NEXT_PUBLIC_EMAILJS_OTP_TEMPLATE_ID=template_p8cy285
```

### 2. What to Check in EmailJS Dashboard

Visit: https://dashboard.emailjs.com

1. **Email Services** section:
   - Should have service `service_fekd1ke` configured
   - Should point to Gmail or your email provider

2. **Email Templates** section:
   - Should have template `template_p8cy285` 
   - Template should use variables: `{{otp_code}}`, `{{user_email}}`, `{{to_email}}`
   - Use HTML from: `EMAIL_TEMPLATES/otp-template.html`

### 3. Restart Your Dev Server

```bash
# Stop current server (Ctrl+C)
# Then restart:
npm run dev
```

Watch server logs for:
- ✅ "Sending OTP email via EmailJS..."
- ✅ "OTP email sent successfully to: user@example.com"

### 4. Test the OTP Flow

1. Go to your app auth page
2. Click "Sign Up"
3. Enter your email and click "Send OTP"
4. **Check your email inbox** (should arrive within 10-30 seconds)
5. Copy the OTP from email
6. Enter it in the app and complete signup

## What Happens Now

**Old behavior (commented out):**
- OTP generated but NOT sent
- User had to check server logs for code

**New behavior (enabled):**
1. OTP generated and stored in database
2. OTP sent via EmailJS to user's email
3. User receives email with 6-digit code
4. User enters code in app to verify
5. Account creation proceeds

## If Emails Still Not Coming

Check these in order:

### Step 1: Verify EmailJS Service Configuration
- Go to https://dashboard.emailjs.com → Email Services
- Check that the service is **connected** (should show green checkmark)
- Test it by sending a test email

### Step 2: Check Email Template
- Go to Email Templates in EmailJS
- Open template `template_p8cy285`
- Verify it has variables: `{{otp_code}}`, `{{to_email}}`, `{{user_email}}`
- Make sure "To Email" field is set to: `{{to_email}}`

### Step 3: Check Server Logs
- Run: `npm run dev`
- When you request OTP, look for messages like:
  - `📧 Sending OTP email via EmailJS...` - sent successfully
  - `❌ EmailJS API error:` - there's an issue with EmailJS

### Step 4: Check Spam Folder
- OTP emails might go to spam/promotions
- Look for email from noreply@rehas.com

### Step 5: Check Browser Console
- Open DevTools (F12)
- Network tab
- When you click "Send OTP", look for request to EmailJS API
- Check if response status is 200 or if there's an error

## Common Issues

### "Failed to send OTP email"
- EmailJS credentials are wrong
- Service/template IDs don't exist
- Gmail OAuth token expired

**Fix:** Re-verify credentials in EmailJS dashboard

### Email arrives but OTP code is blank
- Template variable `{{otp_code}}` not used in EmailJS template
- Template is using wrong variable names

**Fix:** Edit template, check it has `{{otp_code}}`

### Error: "Service not found"
- Service ID is wrong
- Service was deleted from EmailJS

**Fix:** Create new service in EmailJS and update `.env.local`

## File Changes Made

1. **src/lib/otpService.ts**
   - Uncommented EmailJS sending code
   - Added configuration validation
   - Added error details logging
   - Now actually sends OTP emails!

2. **No changes needed to:**
   - `.env.local` (already configured ✅)
   - EmailJS templates (already set up)
   - API routes (already good)

## Next Steps

1. **Restart dev server:** `npm run dev`
2. **Test OTP signup** - you should receive emails now
3. **Check your spam folder** if not in inbox
4. **Verify EmailJS dashboard** if still not working

---

**Still having issues?** Check the detailed guide: [OTP_SETUP_GUIDE.md](OTP_SETUP_GUIDE.md)
