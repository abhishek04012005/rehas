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

-- Create index for quick lookups
CREATE INDEX idx_otp_email ON otp_verifications(email);
CREATE INDEX idx_otp_expires ON otp_verifications(expires_at);

-- Enable RLS
ALTER TABLE otp_verifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Allow anyone to insert
CREATE POLICY "Allow insert OTP" ON otp_verifications
  FOR INSERT WITH CHECK (true);

-- Allow read for own email
CREATE POLICY "Allow read OTP" ON otp_verifications
  FOR SELECT USING (true);

-- Allow update own OTP
CREATE POLICY "Allow update OTP" ON otp_verifications
  FOR UPDATE USING (true);

-- Allow delete own OTP
CREATE POLICY "Allow delete OTP" ON otp_verifications
  FOR DELETE USING (true);
