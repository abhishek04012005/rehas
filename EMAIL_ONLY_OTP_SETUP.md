# Email-Only Authentication with OTP Flow

## Overview

This implementation provides email-only authentication (no phone) with OTP (One-Time Password) verification for signup. Users no longer need to use phone numbers.

## Architecture

### Email Accounts (2 Separate EmailJS Accounts)

1. **Password Reset Account**
   - Public Key: `MSNKAiJ1mJT-EjQkK`
   - Service ID: `service_7ei0l7j`
   - Template ID: `template_8f7jnfb`
   - Purpose: Password reset links

2. **OTP Account** (for signup)
   - Public Key: `MSNKAiJ1mJT-EjQkK`
   - Service ID: `service_7ei0l7j`
   - Template ID: `template_8f7jnfb`
   - Purpose: 6-digit OTP codes for signup verification

### Database Tables

#### otp_verifications table
```sql
CREATE TABLE otp_verifications (
  id UUID PRIMARY KEY
  email VARCHAR(255) UNIQUE NOT NULL
  otp_code VARCHAR(6) NOT NULL
  created_at TIMESTAMP
  expires_at TIMESTAMP (10 minutes after creation)
  attempts INTEGER (max 3)
  verified BOOLEAN
  verified_at TIMESTAMP
);
```

#### users table (updated)
```sql
-- No phone_number required for email-only auth
-- Keeps reset_token and reset_token_expires for password reset flow
```

## Implementation Files

### Authentication Packages
- `/src/lib/otpService.ts` - OTP generation, verification, and user creation logic

### API Endpoints
- `POST /api/auth/send-otp` - Generate and send OTP to email
- `POST /api/auth/verify-otp` - Verify OTP matches
- `POST /api/auth/signup-otp` - Create account after OTP verification

### Configuration
- `.env.local` - EmailJS credentials for both services

## User Flow

### Signup with OTP

1. **User enters email** → POST `/api/auth/send-otp`
   - Generates 6-digit random OTP
   - Stores in `otp_verifications` table (expires in 10 min)
   - Sends OTP via EmailJS to user's email
   - Response: "Check your email for OTP"

2. **User receives OTP email** → User enters OTP code

3. **User submits OTP** → POST `/api/auth/verify-otp`
   - Checks OTP matches database
   - Verifies not expired
   - Checks attempts < 3
   - Marks OTP as verified
   - Response: "OTP verified"

4. **User fills signup form** (email, password, full name) → POST `/api/auth/signup-otp`
   - Verifies OTP was marked verified
   - Creates user in `users` table
   - Stores user in localStorage
   - Deletes OTP record from database
   - Response: Account created

### Login (Email-only)

1. User enters email and password
2. Query `users` table for matching email + password
3. User authenticated in localStorage
4. (No phone required)

### Password Reset (Unchanged)

1. User requests password reset
2. Generate password reset token
3. Send link via EmailJS (password reset account)
4. User clicks link
5. User creates new password

## API Usage Examples

### Send OTP
```bash
curl -X POST http://localhost:3001/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com"}'

# Response:
# {"success": true, "message": "OTP sent to your email"}
```

### Verify OTP
```bash
curl -X POST http://localhost:3001/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com", "otp":"123456"}'

# Response:
# {"success": true, "message": "OTP verified successfully"}
```

### Signup with Verified OTP
```bash
curl -X POST http://localhost:3001/api/auth/signup-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email":"user@example.com",
    "fullName":"John Doe",
    "password":"secure123"
  }'

# Response:
# {
#   "success": true,
#   "message": "Account created successfully",
#   "user": { /* user data */ }
# }
```

## Error Handling

### OTP Not Found
- User requests OTP → takes action before requesting → tries to verify
- Response: "OTP not found. Please request a new one."

### OTP Expired
- OTP expires after 10 minutes
- Response: "OTP has expired. Please request a new one."

### Invalid OTP
- User enters wrong OTP
- Increments attempts counter
- After 3 failures: "Too many failed attempts. Please request a new OTP."

### Email Already Registered
- User tries to signup with existing email
- Response: "Email already registered"

### OTP Not Verified
- User skips OTP verification and tries to signup
- Response: "Please verify your email with OTP first"

## Security Features

1. **OTP Expiration**: 10 minutes
2. **Attempt Limiting**: Max 3 wrong attempts per OTP
3. **Database Cleanup**: OTP records deleted after successful signup
4. **Separate EmailJS Accounts**: Password reset and OTP use different accounts
5. **Password Requirements**: Minimum 6 characters
6. **No Phone Storage**: Phone field no longer required

## Remaining Tasks

To fully implement the UI:

1. **Update Auth Component** - Remove phone input, add OTP flow
2. **Create OTP Input Component** - 6-digit OTP entry
3. **Update Login Form** - Email-only login (no phone)
4. **Update Signup Form** - Email → OTP → Details → Account
5. **Add Loading States** - Show feedback during OTP send/verify
6. **Add Error Handling** - Display API errors to user

## Database Migration

Run this SQL in Supabase to create the OTP table:

```sql
-- See: src/db/add_otp_verification.sql
```

Execute in Supabase SQL Editor.

## Testing

1. Visit `/auth` page
2. Click "Sign Up"
3. Enter email
4. Click "Send OTP"
5. Check email for OTP code
6. Enter OTP on page
7. Fill signup details
8. Complete signup

## Next Steps

1. ✅ OTP service implemented
2. ✅ API endpoints created
3. ✅ Build verified
4. ⏳ UI implementation in Auth component
5. ⏳ Email-only login component
6. ⏳ OTP input form
7. ⏳ Migrate existing phone auth users (optional)
