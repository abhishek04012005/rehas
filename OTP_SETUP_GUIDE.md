# OTP (One Time Password) Setup and Troubleshooting Guide

## Overview

This guide covers the complete setup of OTP generation for email-based signup on the REHAS website. The system generates 6-digit OTPs, stores them in the database with a 10-minute expiration, and verifies them before account creation.

## Quick Checklist

- [ ] Supabase is configured with correct environment variables
- [ ] `otp_verifications` table exists in the database
- [ ] RLS policies are enabled and permissive
- [ ] Development server can access the database
- [ ] Check server logs for OTP generation details

## Prerequisites

### 1. Supabase Setup

You must have a Supabase project configured. Get your credentials:

1. Go to [https://app.supabase.com/](https://app.supabase.com/)
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **Anon/Public Key** (e.g., `eyJhbG...`)

### 2. Environment Variables

Add these to your `.env.local` file:

```env
# Supabase Configuration (REQUIRED FOR OTP)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=eyJhbG...

# Optional: EmailJS for email OTP delivery (commented out in development)
# NEXT_PUBLIC_EMAILJS_OTP_SERVICE_ID=service_xxx
# NEXT_PUBLIC_EMAILJS_OTP_TEMPLATE_ID=template_xxx
# NEXT_PUBLIC_EMAILJS_OTP_PUBLIC_KEY=pk_xxx
```

## Database Setup

### Creating the OTP Verification Table

Run this SQL in your Supabase SQL Editor:

```sql
-- Create OTP verification table for email-based signup
CREATE TABLE IF NOT EXISTS otp_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  otp_code VARCHAR(6) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP + INTERVAL '10 minutes',
  attempts INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMP
);

-- Create indexes for quick lookups
CREATE INDEX idx_otp_email ON otp_verifications(email);
CREATE INDEX idx_otp_expires ON otp_verifications(expires_at);

-- Enable RLS
ALTER TABLE otp_verifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Allow public access (adjust as needed)
CREATE POLICY "Allow insert OTP" ON otp_verifications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow read OTP" ON otp_verifications
  FOR SELECT USING (true);

CREATE POLICY "Allow update OTP" ON otp_verifications
  FOR UPDATE USING (true);

CREATE POLICY "Allow delete OTP" ON otp_verifications
  FOR DELETE USING (true);
```

### Or use the SQL file:

```bash
# From the project root
psql -h [your-supabase-host] -U [username] -d [database] -f src/db/add_otp_verification.sql
```

## OTP Flow

### 1. Send OTP

**Endpoint:** `POST /api/auth/send-otp`

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "OTP sent to your email",
  "testOtp": "123456"  // Only in development mode
}
```

**What happens:**
1. Validates email format
2. Generates a random 6-digit OTP
3. Deletes any existing OTP for this email (clears previous attempts)
4. Inserts new OTP into database with 10-minute expiration
5. In development: logs OTP to console and server logs
6. In production: sends OTP via EmailJS (if configured)

### 2. Verify OTP

**Endpoint:** `POST /api/auth/verify-otp`

**Request:**
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "OTP verified successfully"
}
```

**What happens:**
1. Validates OTP format (must be 6 digits)
2. Retrieves OTP record from database
3. Checks if OTP has expired
4. Checks if too many failed attempts (max 3)
5. Compares provided OTP with stored OTP
6. If correct, marks OTP as verified in database

### 3. Create Account

**Endpoint:** `POST /api/auth/signup-otp`

**Request:**
```json
{
  "email": "user@example.com",
  "fullName": "John Doe",
  "password": "secure_password"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Account created successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "John Doe"
  }
}
```

**What happens:**
1. Validates that OTP was verified for this email
2. Checks if email is already registered
3. Creates new user account with email, password, and full name
4. Deletes OTP record from database (cleanup)

## Troubleshooting

### Issue: "Failed to generate OTP"

**Causes:**
1. **Supabase not configured** - Environment variables missing
2. **Database connection error** - Cannot reach Supabase
3. **Table doesn't exist** - `otp_verifications` table not created
4. **RLS policies blocking** - Permissions denied

**Solutions:**

1. **Check environment variables:**
   ```bash
   # In your terminal, verify these are set:
   echo $NEXT_PUBLIC_SUPABASE_URL
   echo $NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
   ```
   Both should output non-empty values.

2. **Check server logs:**
   - Run: `npm run dev`
   - Look for messages starting with `⚠️` or `❌` in the terminal
   - They will show exactly what's failing

3. **Verify table exists:**
   - Go to Supabase dashboard
   - Select your project
   - Go to SQL Editor
   - Run: `SELECT * FROM otp_verifications LIMIT 1;`
   - Should show the table structure (not an error)

4. **Test database connection:**
   - Add this to test: `/api/test-otp`
   - Or check the test-emailjs endpoint

### Issue: "OTP not found"

**Cause:** OTP record doesn't exist or was deleted

**Solution:**
1. Send OTP again
2. Immediately verify (don't wait 10+ minutes)
3. Check server logs to see if OTP was actually stored

### Issue: "OTP has expired"

**Cause:** More than 10 minutes have passed

**Solution:**
1. Request a new OTP
2. Verify within 10 minutes

### Issue: "Too many failed attempts"

**Cause:** Entered wrong OTP 3 times

**Solution:**
1. Request a new OTP
2. This will delete the old one and reset attempts

### Issue: OTP sent but not receiving email (Production)

**Cause:** EmailJS not configured or not enabled

**Solution:**
1. Set up EmailJS credentials in `.env.local`
2. Uncomment the EmailJS code in `src/lib/otpService.ts` (lines ~76-96)
3. Restart development server
4. Test sending an OTP

**For development testing:**
- OTP code will be logged to server console
- Look for: `✅ TEST OTP for user@example.com: 123456`

## Development vs Production

### Development Mode

- OTP codes are printed to server console
- No actual emails sent (unless EmailJS configured)
- `testOtp` returned in API response (for testing)
- Full debug logging enabled

### Production Mode

- OTP codes NOT exposed in console or API
- Emails sent via EmailJS (requires configuration)
- Strict validation
- Limited debug info

## Testing the OTP Flow

### Manual Testing (Command Line)

```bash
# 1. Start dev server
npm run dev

# 2. Send OTP (in another terminal)
curl -X POST http://localhost:3000/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Check server logs for: ✅ TEST OTP for test@example.com: 123456

# 3. Verify OTP
curl -X POST http://localhost:3000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","otp":"123456"}'

# Should return: {"success":true,"message":"OTP verified successfully"}

# 4. Create account
curl -X POST http://localhost:3000/api/auth/signup-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@example.com",
    "fullName":"Test User",
    "password":"secure_password"
  }'

# Should return user object if successful
```

### Browser Testing

1. Open your app and go to auth page
2. Click "Sign Up"
3. Enter email and click "Send OTP"
4. Check browser console (Dev Tools F12) for OTP
5. Also check server terminal for OTP log
6. Enter the OTP code
7. Complete signup

## Database Schema Reference

### otp_verifications Table

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID | Auto-generated primary key |
| `email` | VARCHAR(255) | UNIQUE, indexed |
| `otp_code` | VARCHAR(6) | The 6-digit OTP |
| `created_at` | TIMESTAMP | Auto-generated creation time |
| `expires_at` | TIMESTAMP | Set to 10 minutes from creation |
| `attempts` | INTEGER | Incremented on failed verify (max 3) |
| `verified` | BOOLEAN | Set to true when OTP verified |
| `verified_at` | TIMESTAMP | Set when verified |

### Cleanup

Old OTP records are automatically cleaned up:
1. When user requests new OTP (old one deleted before creating new one)
2. When user creates account (OTP deleted after account created)
3. Manual cleanup: Delete expired OTPs older than 10 minutes

## Common Error Codes

### Database Errors

- **23505** - Unique constraint violation (email already has pending OTP)
  - Solution: Wait 10 minutes or request new OTP (auto-deletes old one)

- **42P01** - Table doesn't exist
  - Solution: Create `otp_verifications` table using SQL script

- **42501** - Permission denied (RLS policy issue)
  - Solution: Check RLS policies are set to allow operations

## Performance Notes

- OTP generation: ~50ms (minimal)
- Database insert: ~100-200ms depending on network
- OTP verification: ~100-200ms
- Total signup time: ~500-1000ms

## Security Considerations

✅ **What's implemented:**
- 6-digit OTP (1 million combinations)
- 10-minute expiration
- 3 attempt limit
- Unique email constraint (prevents duplicate OTPs)
- HTTPS only in production
- No OTP exposure in production logs

⚠️ **What you should add:**
- Rate limiting (prevent brute force OTP requests)
- IP-based rate limiting (same IP requesting multiple OTPs)
- Email verification (confirm it's not spam email)
- CAPTCHA on OTP request (prevent automated requests)
- Log all OTP activities for security audit

## Support

If OTP still doesn't work after following this guide:

1. **Check server logs** - they now have detailed error messages with emojis
2. **Check environment variables** - ensure they're set
3. **Verify database** - check table exists and has correct structure
4. **Test API endpoints directly** - use curl commands above
5. **Look for timezone issues** - database timestamp vs local time mismatch

For debugging, look for messages like:
- `✅` = Success
- `❌` = Error
- `⚠️` = Warning
- `🔄` = In progress
- `📧` = Email related
