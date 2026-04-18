-- Migration to add password reset columns to users table
-- Run this in your Supabase SQL editor

-- Add reset token columns if they don't exist
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS reset_token UUID,
ADD COLUMN IF NOT EXISTS reset_token_expires TIMESTAMP WITH TIME ZONE;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_reset_token ON users(reset_token);
CREATE INDEX IF NOT EXISTS idx_users_reset_token_expires ON users(reset_token_expires);

-- Optional: Add a check constraint to ensure token expiry is in the future when set
ALTER TABLE users
ADD CONSTRAINT reset_token_expiry_valid CHECK (
  reset_token IS NULL OR reset_token_expires > NOW()
);

-- Display confirmation
SELECT 'Password reset columns added successfully!' as status;
