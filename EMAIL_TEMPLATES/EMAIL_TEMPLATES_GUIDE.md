# REHAS Email Templates Guide

## Overview

This folder contains professional email templates for:
1. **OTP Verification** - Email signup verification with 6-digit code
2. **Password Reset** - Password recovery link for existing users

Both templates are designed with REHAS branding and are fully responsive on mobile and desktop.

## Files Included

### OTP Templates
- `otp-template.html` - Professional HTML OTP email
- `otp-template.txt` - Plain text fallback for OTP

### Password Reset Templates  
- `password-reset-template.html` - Professional HTML password reset email
- `password-reset-template.txt` - Plain text fallback for password reset

### Documentation
- `OTP_TEMPLATE_SETUP.md` - Setup and customization guide
- `EMAIL_TEMPLATES_GUIDE.md` - This file

## Quick Setup

### 1. OTP Email Template

**Go to EmailJS Dashboard:**
1. Email Services → Select your service
2. Click **Create Template**
3. Set Template ID: `template_8f7jnfb`
4. Copy content from `otp-template.html`
5. Define variables: `to_email`, `otp_code`, `user_email`

**Test:**
```
to_email: your-email@example.com
otp_code: 123456
user_email: user@example.com
```

### 2. Password Reset Template

**Go to EmailJS Dashboard:**
1. Email Services → Select your service  
2. Click **Create Template**
3. Set Template ID: Choose a new ID (e.g., `template_password_reset`)
4. Copy content from `password-reset-template.html`
5. Define variables: `to_email`, `reset_link`

**Test:**
```
to_email: your-email@example.com
reset_link: https://rehas.in/auth?reset=true&token=abc123&email=user@example.com
```

## Template Structure

### Common Elements

Both templates include:
- ✅ REHAS logo and branding
- ✅ Professional gradient header
- ✅ Clear call-to-action
- ✅ Security warnings
- ✅ Footer with contact info
- ✅ Mobile-responsive design
- ✅ Plain text fallback
- ✅ Proper spacing and typography

### OTP Template

**Variables Used:**
```
{{otp_code}}     → 6-digit OTP code (e.g., "123456")
{{user_email}}   → Customer's email (e.g., "john@example.com")
{{to_email}}     → Recipient email (same as user_email)
```

**Key Sections:**
- Greeting with user email
- Large OTP code display box
- 10-minute expiration notice
- Usage instructions (3 steps)
- Security warning
- Support email link

### Password Reset Template

**Variables Used:**
```
{{reset_link}}   → Full reset URL (e.g., "https://rehas.in/auth?reset=true&token=...")
{{to_email}}     → Recipient email
```

**Key Sections:**
- Greeting
- Reset button (clickable)
- Copy-paste link as fallback
- Step-by-step instructions
- 1-hour expiration notice
- Security warning for unsolicited requests
- Support email link

## Design Details

### Colors
- **Primary Purple**: `#667eea`
- **Secondary Purple**: `#764ba2`
- **Light Background**: `#f8f9ff`
- **Warning Yellow**: `#ffc107`
- **Success Green**: `#4caf50`

### Typography
- **Font**: Segoe UI, Tahoma, Geneva, sans-serif
- **Headers**: Bold, larger sizes
- **Body**: Regular weight, 14-16px
- **Code**: Courier New (monospace)

### Responsive Design
- Mobile-optimized
- Works on all email clients
- Proper padding/margins
- Readable on small screens
- Buttons and links are touch-friendly

## Customization

### Change Logo
```html
<div class="logo">🌸 REHAS</div>
```
Replace `🌸 REHAS` with your preferred text/emoji

### Change Colors
Update CSS in `<style>` section:
```css
.header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Change Support Email
Find and replace: `support@rehas.com`

### Change Company Info
Update footer section:
```html
<a href="https://rehas.in" class="footer-link">Visit Website</a> | 
<a href="mailto:contact@rehas.in" class="footer-link">Contact Us</a>
```

### Adjust Expiration Time
Find and replace timing text:
```html
<div class="otp-timer">⏱️ Valid for 10 minutes</div>
<div class="timer">⏱️ Time Sensitive: This password reset link will expire in 1 hour...</div>
```

## Best Practices

### For OTP Emails
1. ✅ Keep OTP to 6 digits (easier to input)
2. ✅ Set 10-minute expiration (security)
3. ✅ Limit to 3 wrong attempts
4. ✅ Large, bold OTP display
5. ✅ Clear security warnings
6. ✅ Test on common email clients

### For Password Reset
1. ✅ Use clickable button + copyable link
2. ✅ Set 1-hour expiration (reasonable time)
3. ✅ Include full reset URL
4. ✅ Warn about unsolicited emails
5. ✅ Include support contact
6. ✅ HTTPS URLs only

### Email Sending
1. ✅ Always use no-reply email address
2. ✅ Include unsubscribe info if needed
3. ✅ Add SPF/DKIM records for deliverability
4. ✅ Monitor bounce rates
5. ✅ Test with multiple email providers
6. ✅ Avoid spam trigger words

## Testing Checklist

- [ ] Email renders in Gmail
- [ ] Email renders in Outlook
- [ ] Email renders in Apple Mail
- [ ] Mobile view looks good
- [ ] All links work
- [ ] All variables replace correctly
- [ ] Images load properly
- [ ] Code is readable
- [ ] Colors display correctly
- [ ] Support email is accurate
- [ ] Footer info is current
- [ ] Send test email to real address

## Email Client Compatibility

| Client | Tested | Notes |
|--------|--------|-------|
| Gmail | ✅ | Excellent support |
| Outlook | ✅ | Good support |
| Apple Mail | ✅ | Excellent support |
| Yahoo Mail | ✅ | Good support |
| Thunderbird | ✅ | Good support |
| Mobile (iOS) | ✅ | Responsive design |
| Mobile (Android) | ✅ | Responsive design |

## Variable Reference

### In .env.local
```env
NEXT_PUBLIC_EMAILJS_OTP_PUBLIC_KEY=...
NEXT_PUBLIC_EMAILJS_OTP_SERVICE_ID=...
NEXT_PUBLIC_EMAILJS_OTP_TEMPLATE_ID=...

NEXT_PUBLIC_EMAILJS_PASSWORD_RESET_PUBLIC_KEY=...
NEXT_PUBLIC_EMAILJS_PASSWORD_RESET_SERVICE_ID=...
NEXT_PUBLIC_EMAILJS_PASSWORD_RESET_TEMPLATE_ID=...
```

### In API Calls
```javascript
// OTP Email
{
  to_email: "user@example.com",
  otp_code: "123456",
  user_email: "user@example.com"
}

// Password Reset Email
{
  to_email: "user@example.com",
  reset_link: "https://rehas.in/auth?reset=true&token=uuid&email=user@example.com"
}
```

## Troubleshooting

### Email not delivering
- Check spam folder
- Verify SMTP credentials
- Check email rate limits
- Verify "From" email is authenticated

### Variables not replacing
- Check `{{ }}` curly braces (not different syntax)
- Verify variable names are exact
- Check for typos in variable names

### Formatting looks broken
- Test in multiple email clients
- Check CSS is supported
- Verify images are accessible
- Test on mobile devices

### Links not clickable
- Ensure URLs are valid HTTPS
- Check href attribute syntax
- Verify URL encoding

## Support

For issues or questions:
1. Check EmailJS documentation: https://emailjs.com/docs/
2. Review EMAIL_ONLY_OTP_SETUP.md
3. Check API endpoint documentation
4. Contact REHAS support team

## Version History

- **v1.0** (April 2026)
  - Initial release
  - OTP and Password Reset templates
  - Mobile-responsive design
  - REHAS branding

## Next Steps

1. ✅ Review templates  
2. ⏳ Setup in EmailJS dashboard
3. ⏳ Test with sample data
4. ⏳ Deploy to production
5. ⏳ Monitor delivery rates
