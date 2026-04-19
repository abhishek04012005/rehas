# EmailJS OTP Template Setup Guide

## Template Variable Reference

These variables will be automatically replaced when the OTP email is sent:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{otp_code}}` | 6-digit OTP verification code | `123456` |
| `{{user_email}}` | Customer's email address | `john@example.com` |
| `{{to_email}}` | Recipient email | `john@example.com` |

## How to Setup in EmailJS

### 1. Go to EmailJS Dashboard
- Visit: https://dashboard.emailjs.com
- Login with your account

### 2. Go to Email Templates
- Click **Email Services** → Your service
- Click **Create Template**

### 3. Create OTP Template

**Basic Settings:**
- **Template Name**: OTP Verification
- **Template ID**: `template_8f7jnfb` (your current ID)

**HTML Content:**
Copy the contents from `EMAIL_TEMPLATES/otp-template.html`

### 4. Template Variables to Define

In your EmailJS template editor, set these fields:

```
To Email: {{to_email}}
From Email: noreply@rehas.com
Subject: Your REHAS Verification Code - {{otp_code}}
```

### 5. HTML Body

Paste the OTP HTML template, making sure to include all template variables:
- `{{otp_code}}` - The OTP code
- `{{user_email}}` - The user's email
- `{{to_email}}` - Recipient (may be same as user_email)

### 6. Test the Template

**Send Test Email:**
- Click **Test Template**
- Provide sample values:
  - `to_email`: your-test-email@example.com
  - `otp_code`: 123456
  - `user_email`: user@example.com
- Click **Send** and check your inbox

## Template Files

Located in `/EMAIL_TEMPLATES/`:

### otp-template.html
- Professional HTML design
- Responsive on mobile/desktop
- REHAS branding
- Includes security warnings
- Styled OTP display box

### otp-template.txt
- Plain text fallback
- Used if HTML not supported
- Same information structure
- No styling

## Customization

### Colors
Current design uses REHAS brand colors:
- **Primary**: `#667eea` (Purple)
- **Secondary**: `#764ba2` (Dark Purple)
- **Background**: `#f8f9ff` (Light Blue)

To change, edit in `otp-template.html`:
```html
<style>
    .header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
</style>
```

### Logo/Header
Change the logo emoji or text:
```html
<div class="logo">🌸 REHAS</div>
```

### Company Details
Update footer with your info:
- Email: `support@rehas.com`
- Website: `https://rehas.in`
- Phone: Add if needed

### Expiration Time
Currently set to 10 minutes. To change:
```html
<div class="otp-timer">⏱️ Valid for 10 minutes</div>
```

## API Parameters Being Sent

When your app calls the OTP API, it sends:

```javascript
{
  to_email: "user@example.com",
  otp_code: "123456",
  user_email: "user@example.com"
}
```

These map to the template variables you defined above.

## Testing Checklist

- [ ] Template created in EmailJS
- [ ] Test email received
- [ ] OTP code displays correctly
- [ ] Links work properly
- [ ] Mobile rendering looks good
- [ ] Plain text version works on fallback
- [ ] Security warning is clear
- [ ] Contact information is accurate

## Troubleshooting

### Template Not Sending
- Verify service ID matches `.env.local`
- Check if SMTP credentials are correct
- Test with EmailJS Test Template button

### Variables Not Replacing
- Ensure variable names match exactly: `{{variable_name}}`
- Check capitalization (case-sensitive)
- Verify they're enclosed in `{{ }}`

### Email Goes to Spam
- EmailJS has good deliverability
- Add proper warm-up period
- Ensure "From" email is authenticated
- Include unsubscribe link if needed

### Formatting Broken on Mobile
- Check CSS is inline (not in `<style>` tags)
- Test with mobile preview in EmailJS
- Verify responsive breakpoints

## Best Practices

1. **Security**: Never log OTP codes in production
2. **Expiration**: Keep at 10 minutes for security
3. **Attempts**: Limit to 3 wrong attempts
4. **Rate Limiting**: Limit OTP requests per email/IP
5. **HTTPS**: Ensure reset links use HTTPS
6. **Testing**: Always test with real emails first

## Support

For issues with:
- **EmailJS**: https://emailjs.com/docs/
- **REHAS Setup**: Check EMAIL_ONLY_OTP_SETUP.md
- **API Endpoints**: See REHAS documentation

## Next Steps

1. ✅ Review HTML template
2. ⏳ Create template in EmailJS dashboard
3. ⏳ Test with sample OTP
4. ⏳ Verify email arrives properly
5. ⏳ Deploy to production
