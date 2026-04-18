# EmailJS Password Reset Setup Guide

This guide explains how to set up EmailJS for the password reset functionality in the REHAS website.

## Overview

The password reset feature allows users to:
1. Request a password reset link via email
2. Receive a unique reset link in their Gmail inbox
3. Click the link to open the reset password page
4. Set a new password using the secure token

## Step 1: Create EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/) website
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Get Your Public Key

1. After login, go to the **Dashboard** or **Settings**
2. Look for **Account** or **API Keys** section
3. Copy your **Public Key** (looks like: `pk_live_xxxxxxxxxxx`)

## Step 3: Set Up Email Service

### Option A: Using Gmail (Recommended)

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Select **Gmail**
4. Choose **OAuth 2.0 authentication** option
5. Click **Connect with Gmail**
6. Select your Gmail account and allow EmailJS to send emails
7. Note the **Service ID** (e.g., `service_xxxxxxxxx`)

### Option B: Using Other Email Providers

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Select your email provider (Outlook, SendGrid, Custom SMTP, etc.)
4. Fill in the required credentials
5. Test the connection
6. Note the **Service ID**

## Step 4: Create Email Template

1. Go to **Email Templates** in EmailJS dashboard
2. Click **Create New Template**
3. Template Name: `password_reset` (or any name you prefer)
4. Fill in the template with HTML content:

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 8px;
        }
        .header {
            background-color: #8B4789;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            background-color: white;
            padding: 20px;
            border-radius: 0 0 8px 8px;
        }
        .reset-button {
            display: inline-block;
            background-color: #8B4789;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
            margin-bottom: 20px;
        }
        .reset-button:hover {
            background-color: #6B3569;
        }
        .footer {
            background-color: #f0f0f0;
            padding: 15px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-radius: 0 0 8px 8px;
            margin-top: 10px;
        }
        .warning {
            background-color: #fff3cd;
            border: 1px solid #ffc107;
            color: #856404;
            padding: 12px;
            border-radius: 5px;
            margin-top: 15px;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>REHAS - Password Reset</h1>
        </div>
        
        <div class="content">
            <p>Hello {{user_email}},</p>
            
            <p>We received a request to reset your password. Click the button below to set a new password:</p>
            
            <a href="{{reset_link}}" class="reset-button">Reset Password</a>
            
            <p>Or copy and paste this link in your browser:</p>
            <p style="word-break: break-all; background-color: #f5f5f5; padding: 10px; border-radius: 5px;">
                {{reset_link}}
            </p>
            
            <div class="warning">
                <strong>⚠️ Security Notice:</strong>
                <ul style="margin: 5px 0; padding-left: 20px;">
                    <li>This link will expire in 1 hour</li>
                    <li>If you didn't request this, please ignore this email</li>
                    <li>Never share this link with anyone</li>
                    <li>Your account will NOT be affected if you don't reset the password</li>
                </ul>
            </div>
            
            <p>Thank you,<br>REHAS Team</p>
        </div>
        
        <div class="footer">
            <p>&copy; 2024 REHAS. All rights reserved.</p>
            <p>Contact us: {{support_email}}</p>
        </div>
    </div>
</body>
</html>
```

5. In the template settings:
   - **To Email**: `{{to_email}}`
   - **Subject**: `Password Reset Request - REHAS`
6. Save the template and note the **Template ID** (e.g., `template_xxxxxxxxx`)

## Step 5: Update .env.local File

Add the following environment variables to your `.env.local` file:

```env
# EmailJS Configuration for Password Reset
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
```

Replace with your actual values from EmailJS.

## Step 6: Testing the Password Reset Flow

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Go to `/auth` and click "Forgot Password"

3. Enter an email address and submit

4. Check your email inbox (or spam folder) for the reset link

5. Click the reset link to open the reset password page

6. Enter a new password and confirm

7. You should see a success message

## Troubleshooting

### Email not received
- Check spam/junk folder
- Verify email address is correct
- Check browser console for error messages
- Ensure EmailJS service is properly configured in dashboard

### "Email service not configured" error
- Make sure all three environment variables are set in `.env.local`
- Restart the dev server after updating `.env.local`
- Verify values are correct (no extra spaces or quotes)

### Reset link not working
- Link may have expired (valid for 1 hour only)
- Request a new password reset
- Check that the reset link is properly formed in browser URL

### "Invalid or expired reset token" error
- The 1-hour window has passed
- Request a new password reset
- Check server logs for token validation details

## Security Notes

1. **Token Expiration**: Reset tokens are valid for 1 hour only
2. **One-Time Use**: Each token can only be used once
3. **Email Security**: Never send passwords in plain text
4. **HTTPS Only**: Ensure reset links are sent over HTTPS
5. **Rate Limiting**: Consider adding rate limiting to prevent abuse (future enhancement)

## Database Schema

The password reset feature uses these columns in the `users` table:
- `reset_token`: UUID token for password reset
- `reset_token_expires`: Timestamp when token expires
- `password`: Hashed password (ensure proper encryption in production)

## Environment Variables Summary

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS public API key | `pk_live_xxx...` |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service ID | `service_xxx...` |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template ID for password reset | `template_xxx...` |

## Production Checklist

- [ ] Replace placeholder values in .env.local with real EmailJS credentials
- [ ] Test password reset flow in staging environment
- [ ] Configure proper email domain for sending (if using custom SMTP)
- [ ] Set up email templates with company branding
- [ ] Test reset link expiration (1 hour)
- [ ] Verify emails are not going to spam folder
- [ ] Set up monitoring for failed email sends
- [ ] Document password reset process for users
- [ ] Consider adding rate limiting to prevent abuse
- [ ] Test on various email clients (Gmail, Outlook, etc.)

## Next Steps

After EmailJS is set up:
1. Users can visit `/auth` and click "Forgot Password"
2. Enter email and receive reset link
3. Click link to open reset password page
4. Set new password with validation
5. Redirect to login after successful reset

## Support

For EmailJS support, visit: https://www.emailjs.com/docs/

For REHAS support, contact: support@rehas.com
