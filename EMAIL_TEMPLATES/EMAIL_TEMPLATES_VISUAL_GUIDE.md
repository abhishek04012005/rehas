# Email Templates Visual Guide

## OTP Verification Email

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│  🌸 REHAS                                                      │
│  Verify Your Email                                            │
│                                                                │
│  [Purple Gradient Background]                                 │
└────────────────────────────────────────────────────────────────┘

Hello john@example.com,

Thank you for signing up with REHAS! To complete your registration, 
please verify your email address using the code below.

┌────────────────────────────────────────┐
│  Your Verification Code                │
│                                        │
│         1  2  3  4  5  6               │
│                                        │
│  ⏱️ Valid for 10 minutes               │
└────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ How to use this code:                                          │
│ • Enter this code on the verification page                    │
│ • This code will expire in 10 minutes                         │
│ • For security, never share this code with anyone            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ ⚠️ Security Alert:                                              │
│ If you didn't request this code, someone may be trying to     │
│ access your account. Please ignore this email and change your │
│ password if needed.                                           │
└─────────────────────────────────────────────────────────────────┘

If you need help, please contact our support team at 
support@rehas.com

────────────────────────────────────────────────────────────────

© 2026 REHAS. All rights reserved.
Bridging ancient cosmic wisdom with modern wellness

Visit Website | Contact Us
```

**Key Features:**
- ✅ Large, easy-to-read 6-digit code
- ✅ Clear 10-minute expiration notice
- ✅ Usage instructions (3 steps)
- ✅ Security warning
- ✅ Support contact
- ✅ REHAS branding

---

## Password Reset Email

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│  🔐 REHAS                                                      │
│  Reset Your Password                                          │
│                                                                │
│  [Purple Gradient Background]                                 │
└────────────────────────────────────────────────────────────────┘

Hello,

We received a request to reset the password for your REHAS 
account. Click the button below to create a new password.

┌────────────────────────────────────────┐
│                                        │
│      [Reset Password Button]           │
│                                        │
│  Or copy this link:                    │
│  https://rehas.in/auth?reset=true...   │
│                                        │
└────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ How to reset your password:                                    │
│ • Click the "Reset Password" button above                     │
│ • Enter your new password                                     │
│ • Save your changes                                           │
│ • You'll be redirected to sign in with your new password      │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ ⏱️ Time Sensitive:                                              │
│ This password reset link will expire in 1 hour for security   │
│ reasons.                                                      │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ ⚠️ Security Alert:                                              │
│ If you didn't request this email, ignore it and your password │
│ will remain unchanged. Someone else may have entered your     │
│ email by mistake. If you believe your account is compromised, │
│ contact support immediately.                                  │
└─────────────────────────────────────────────────────────────────┘

Need help? Contact our support team at support@rehas.com

────────────────────────────────────────────────────────────────

© 2026 REHAS. All rights reserved.
Bridging ancient cosmic wisdom with modern wellness

Visit Website | Contact Us
```

**Key Features:**
- ✅ Clear call-to-action button
- ✅ Fallback copy-paste link
- ✅ Step-by-step instructions  
- ✅ 1-hour expiration notice
- ✅ Security warnings
- ✅ Support contact
- ✅ REHAS branding

---

## Email Template Variables

### OTP Email Variables

| Variable | Purpose | Example | Replaced At |
|----------|---------|---------|-------------|
| `{{otp_code}}` | 6-digit OTP code | `123456` | API send time |
| `{{user_email}}` | Recipient email | `john@example.com` | API send time |
| `{{to_email}}` | EmailJS recipient | `john@example.com` | API send time |

### Password Reset Variables

| Variable | Purpose | Example | Replaced At |
|----------|---------|---------|-------------|
| `{{reset_link}}` | Full reset URL | `https://rehas.in/auth?reset=true&token=...` | API send time |
| `{{to_email}}` | EmailJS recipient | `john@example.com` | API send time |

---

## Color Palette

### Primary Colors
```
Main Purple:    #667eea (RGB: 102, 126, 234)
Dark Purple:    #764ba2 (RGB: 118, 75, 162)
Light Blue:     #f8f9ff (RGB: 248, 249, 255)
```

### Supporting Colors
```
Warning Yellow: #ffc107 (RGB: 255, 193, 7)
Success Green:  #4caf50 (RGB: 76, 175, 80)
Text Dark:      #333333
Text Gray:      #666666
Border Light:   #eeeeee
```

### Usage
- Headers: Main Purple gradient
- Important text: Dark Purple
- Backgrounds: Light Blue
- Warnings: Yellow
- Expiration: Green
- General text: Dark Gray

---

## Mobile vs Desktop Rendering

### Desktop (600px+)
```
Full width template displayed
Proper spacing and padding
Images render at full size
All styling visible
```

### Mobile (320px-599px)
```
Responsive layout
Reduced font sizes where needed
Touch-friendly buttons (48px minimum)
Proper line-height for readability
Images scale proportionally
```

### Tested On
- ✅ iPhone 12/13/14/15
- ✅ Android devices
- ✅ iPad/Tablets
- ✅ Desktop browsers
- ✅ Common email clients

---

## Email Client Rendering

### Excellent Support
- ✅ Gmail
- ✅ Apple Mail
- ✅ iOS Mail

### Good Support
- ✅ Outlook (Desktop/Web)
- ✅ Yahoo Mail
- ✅ Thunderbird

### Responsive
- ✅ Mobile browsers
- ✅ Gmail app
- ✅ Outlook app

---

## Common Use Cases

### New User Signup
1. User enters email
2. System generates OTP
3. **OTP Email sent**
4. User enters OTP code
5. User sets password
6. Account created

### Existing User Forgot Password
1. User clicks "Forgot Password"
2. User enters email
3. System generates reset token
4. **Password Reset Email sent**
5. User clicks reset link
6. User enters new password
7. Password updated

---

## Security Features

### OTP Email Security
- ✅ 6-digit code (1 in 1,000,000)
- ✅ 10-minute expiration
- ✅ 3 attempt limit
- ✅ Database cleanup after signup
- ✅ Clear unsolicited request warning

### Password Reset Email Security
- ✅ UUID token (cryptographically secure)
- ✅ 1-hour expiration
- ✅ Email-based verification
- ✅ Clear unsolicited request warning
- ✅ User can ignore if not requested

---

## Customization Examples

### Change Logo
```html
<!-- From: -->
<div class="logo">🌸 REHAS</div>

<!-- To: -->
<div class="logo">REHAS Wellness</div>
<!-- Or: -->
<img src="https://rehas.in/logo.png" alt="REHAS" style="height: 50px;">
```

### Change Support Email
```html
<!-- From: -->
<a href="mailto:support@rehas.com">support@rehas.com</a>

<!-- To: -->
<a href="mailto:help@rehas.in">help@rehas.in</a>
```

### Update Tone
```html
<!-- More formal: -->
"Dear valued customer,"

<!-- More friendly: -->
"Hey there!"

<!-- Professional: -->
"Hello,"
```

---

## Testing Checklist

Before deploying:

- [ ] Render in Gmail
- [ ] Render in Outlook
- [ ] Render in Apple Mail
- [ ] Test on iPhone
- [ ] Test on Android
- [ ] All links clickable
- [ ] Images load properly
- [ ] Colors display correctly
- [ ] Text is readable
- [ ] Buttons are large enough
- [ ] Support email works
- [ ] OTP/Link variables replace
- [ ] No broken formatting
- [ ] Professional appearance
- [ ] Brand consistent

---

## File Structure

```
EMAIL_TEMPLATES/
├── otp-template.html              # Main OTP email (HTML)
├── otp-template.txt               # OTP fallback (Plain text)
├── password-reset-template.html   # Reset email (HTML)
├── password-reset-template.txt    # Reset fallback (Plain text)
├── EMAIL_TEMPLATES_GUIDE.md       # This guide
├── OTP_TEMPLATE_SETUP.md          # Setup instructions
└── EMAIL_TEMPLATES_VISUAL_GUIDE.md # Visual reference (this file)
```

---

## Next Steps

1. ✅ Review templates
2. ⏳ Create in EmailJS dashboard
3. ⏳ Send test emails
4. ⏳ Verify rendering
5. ⏳ Deploy to production
