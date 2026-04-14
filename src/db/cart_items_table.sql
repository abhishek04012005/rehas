-- Create cart items table for user-specific shopping carts
CREATE TABLE IF NOT EXISTS cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,

  -- Product/Service Information
  product_id TEXT NOT NULL,
  product_title TEXT NOT NULL,
  product_type TEXT NOT NULL CHECK (product_type IN ('service', 'course', 'product')),

  -- Pricing and Quantity
  price DECIMAL(10, 2) NOT NULL,
  quantity INT DEFAULT 1 CHECK (quantity > 0),

  -- Additional Details
  product_image TEXT,
  product_description TEXT,
  service_id TEXT,
  is_pooja_selected BOOLEAN DEFAULT false,
  pooja_label TEXT,
  pooja_price TEXT,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_created_at ON cart_items(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cart_items_product_id ON cart_items(product_id);

-- If the table already existed with a UUID or BIGINT user_id, convert it to TEXT
DROP POLICY IF EXISTS "Users can insert to own cart" ON cart_items;
DROP POLICY IF EXISTS "Users can select from own cart" ON cart_items;
DROP POLICY IF EXISTS "Users can read own cart" ON cart_items;
DROP POLICY IF EXISTS "Users can read from own cart" ON cart_items;
DROP POLICY IF EXISTS "Users can update own cart" ON cart_items;
DROP POLICY IF EXISTS "Users can delete from own cart" ON cart_items;
DROP POLICY IF EXISTS "Users can delete own cart" ON cart_items;
DROP POLICY IF EXISTS "Allow insert for authenticated users" ON cart_items;
DROP POLICY IF EXISTS "Allow select for authenticated users" ON cart_items;
DROP POLICY IF EXISTS "Allow update for authenticated users" ON cart_items;
DROP POLICY IF EXISTS "Allow delete for authenticated users" ON cart_items;
ALTER TABLE IF EXISTS cart_items DROP CONSTRAINT IF EXISTS cart_items_user_id_fkey;
ALTER TABLE IF EXISTS cart_items ALTER COLUMN user_id TYPE TEXT USING user_id::TEXT;
ALTER TABLE IF EXISTS cart_items ADD COLUMN IF NOT EXISTS product_image TEXT;
ALTER TABLE IF EXISTS cart_items ADD COLUMN IF NOT EXISTS product_description TEXT;
ALTER TABLE IF EXISTS cart_items ADD COLUMN IF NOT EXISTS service_id TEXT;
ALTER TABLE IF EXISTS cart_items ADD COLUMN IF NOT EXISTS is_pooja_selected BOOLEAN DEFAULT false;
ALTER TABLE IF EXISTS cart_items ADD COLUMN IF NOT EXISTS pooja_label TEXT;
ALTER TABLE IF EXISTS cart_items ADD COLUMN IF NOT EXISTS pooja_price TEXT;
ALTER TABLE IF EXISTS cart_items ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE IF EXISTS cart_items ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Disable Row Level Security for simple table access
ALTER TABLE cart_items DISABLE ROW LEVEL SECURITY;

-- Update timestamp automatically
CREATE OR REPLACE FUNCTION update_cart_items_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_cart_items_updated_at_trigger ON cart_items;
CREATE TRIGGER update_cart_items_updated_at_trigger
  BEFORE UPDATE ON cart_items
  FOR EACH ROW
  EXECUTE FUNCTION update_cart_items_updated_at();