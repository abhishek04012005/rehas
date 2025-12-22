-- Create Orders/Checkout Table with Payment Fields
CREATE TABLE IF NOT EXISTS   (
  id BIGSERIAL PRIMARY KEY,
  product_title VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address_line_1 VARCHAR(500) NOT NULL,
  address_line_2 VARCHAR(500),
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  postal_code VARCHAR(20) NOT NULL,
  country VARCHAR(100) NOT NULL DEFAULT 'India',
  
  -- Payment Fields
  amount DECIMAL(10, 2) NOT NULL DEFAULT 999.00,
  payment_status VARCHAR(50) DEFAULT 'pending',
  payment_method VARCHAR(50),
  transaction_id VARCHAR(255),
  razorpay_order_id VARCHAR(255),
  razorpay_payment_id VARCHAR(255),
  razorpay_signature VARCHAR(255),
  
  -- Order Status
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(email);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
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
