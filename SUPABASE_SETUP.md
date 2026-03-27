# Supabase Database Setup for REHAS Website

This document contains the SQL commands to set up the database tables for the REHAS website.

## Tables to Create

### 1. Settings Table
Run the following SQL in your Supabase SQL Editor:

```sql
-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id SERIAL PRIMARY KEY,
  popup_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings if not exists
INSERT INTO settings (popup_enabled)
SELECT true
WHERE NOT EXISTS (SELECT 1 FROM settings);

-- Create trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_settings_updated_at
    BEFORE UPDATE ON settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

### 2. Other Tables
Make sure you have already created the other required tables:
- `orders`
- `contact_submissions`
- `enquiries`
- `admin_users`

Refer to the SQL files in the `src/db/` folder for the complete table definitions.

## Admin User Setup

If you haven't set up admin users yet, run:

```sql
-- Create admin_users table if it doesn't exist
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin user (password: admin123)
-- Note: Change this password in production!
INSERT INTO admin_users (username, password_hash)
VALUES ('admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi')
ON CONFLICT (username) DO NOTHING;
```

## Row Level Security (RLS)

Enable RLS on the settings table:

```sql
-- Enable RLS
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users (adjust as needed)
CREATE POLICY "Allow authenticated users to read settings" ON settings
FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to update settings" ON settings
FOR UPDATE TO authenticated USING (true);
```

## Testing

After running the SQL commands:
1. Go to your admin dashboard
2. Navigate to Settings
3. You should see the popup toggle
4. Test enabling/disabling the popup