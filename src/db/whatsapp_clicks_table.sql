-- Create WhatsApp Clicks Table
CREATE TABLE IF NOT EXISTS whatsapp_clicks (
  id BIGSERIAL PRIMARY KEY,
  user_agent TEXT,
  referrer TEXT,
  ip_address VARCHAR(45),
  clicked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  page_url TEXT,
  device_type VARCHAR(20) DEFAULT 'unknown',
  browser_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_whatsapp_clicks_clicked_at ON whatsapp_clicks(clicked_at DESC);
CREATE INDEX IF NOT EXISTS idx_whatsapp_clicks_device_type ON whatsapp_clicks(device_type);
CREATE INDEX IF NOT EXISTS idx_whatsapp_clicks_page_url ON whatsapp_clicks(page_url);
CREATE INDEX IF NOT EXISTS idx_whatsapp_clicks_ip_address ON whatsapp_clicks(ip_address);

-- Add RLS (Row Level Security) policies
ALTER TABLE whatsapp_clicks ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert clicks (for tracking)
CREATE POLICY "Allow insert for all" ON whatsapp_clicks
  FOR INSERT
  WITH CHECK (true);

-- Allow only authenticated admin users to view clicks
CREATE POLICY "Allow select for authenticated users" ON whatsapp_clicks
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Allow only authenticated admin users to delete clicks
CREATE POLICY "Allow delete for authenticated users" ON whatsapp_clicks
  FOR DELETE
  USING (auth.role() = 'authenticated');
