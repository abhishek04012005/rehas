-- Create Orders/Checkout Table with Complete Customer & Service Details
CREATE TABLE IF NOT EXISTS orders (
  id BIGSERIAL PRIMARY KEY,
  
  -- Customer Information
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone_number VARCHAR(10) NOT NULL,
  birth_date DATE,
  age INT,
  
  -- Product/Service Information
  product_title VARCHAR(255) NOT NULL,
  order_type VARCHAR(50) NOT NULL CHECK (order_type IN ('service', 'course', 'product')),
  service_id VARCHAR(255),
  service_title VARCHAR(255),
  service_description TEXT,
  
  -- Address Information
  address_line_1 VARCHAR(500),
  address_line_2 VARCHAR(500),
  city VARCHAR(100),
  state VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100) DEFAULT 'India',
  
  -- Payment Information
  amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
  currency VARCHAR(3) DEFAULT 'INR',
  amount_in_paise BIGINT,
  
  -- Payment Fields
  payment_status VARCHAR(50) DEFAULT 'pending' CHECK (payment_status IN ('unpaid', 'pending', 'paid', 'failed')),
  payment_method VARCHAR(50) CHECK (payment_method IN ('razorpay', 'cod', 'upi')),
  transaction_id VARCHAR(255),
  razorpay_order_id VARCHAR(255),
  razorpay_payment_id VARCHAR(255),
  razorpay_signature VARCHAR(255),
  
  -- Order Status
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'completed', 'cancelled')),
  notes TEXT,
  admin_notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(email);
CREATE INDEX IF NOT EXISTS idx_orders_phone ON orders(phone_number);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_order_type ON orders(order_type);
CREATE INDEX IF NOT EXISTS idx_orders_service_id ON orders(service_id);
CREATE INDEX IF NOT EXISTS idx_orders_transaction_id ON orders(transaction_id);
CREATE INDEX IF NOT EXISTS idx_orders_razorpay_order_id ON orders(razorpay_order_id);

-- Add RLS (Row Level Security) policies
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow anyone (public) to insert orders
CREATE POLICY "Allow public insert" ON orders
  FOR INSERT
  WITH CHECK (true);

-- Allow public to view their own orders
CREATE POLICY "Allow public select" ON orders
  FOR SELECT
  USING (true);

-- Create a trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_orders_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_orders_updated_at_trigger ON orders;
CREATE TRIGGER update_orders_updated_at_trigger BEFORE UPDATE
  ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_orders_updated_at();

-- Create a trigger to auto-calculate age from birth_date
CREATE OR REPLACE FUNCTION calculate_age_from_birthdate()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.birth_date IS NOT NULL THEN
    NEW.age = EXTRACT(YEAR FROM AGE(NEW.birth_date))::INT;
  END IF;
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS calculate_order_age_trigger ON orders;
CREATE TRIGGER calculate_order_age_trigger BEFORE INSERT OR UPDATE
  ON orders
  FOR EACH ROW
  EXECUTE FUNCTION calculate_age_from_birthdate();

-- Allow only authenticated admin users to update orders
CREATE POLICY "Allow update for authenticated users" ON orders
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Allow only authenticated admin users to delete orders
CREATE POLICY "Allow delete for authenticated users" ON orders
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Allow only authenticated admin users to update orders
CREATE POLICY "Allow update for authenticated users" ON orders
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Allow only authenticated admin users to delete orders
CREATE POLICY "Allow delete for authenticated users" ON orders
  FOR DELETE
  USING (auth.role() = 'authenticated');
