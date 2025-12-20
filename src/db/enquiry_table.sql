-- Create Enquiries Table
CREATE TABLE IF NOT EXISTS enquiries (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  service_type VARCHAR(100) NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  submitted_from VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_service_type ON enquiries(service_type);

-- Add RLS (Row Level Security) policies
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert enquiries
CREATE POLICY "Allow insert for all" ON enquiries
  FOR INSERT
  WITH CHECK (true);

-- Allow only authenticated admin users to view enquiries
CREATE POLICY "Allow select for authenticated users" ON enquiries
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Allow only authenticated admin users to update enquiries
CREATE POLICY "Allow update for authenticated users" ON enquiries
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Allow only authenticated admin users to delete enquiries
CREATE POLICY "Allow delete for authenticated users" ON enquiries
  FOR DELETE
  USING (auth.role() = 'authenticated');
