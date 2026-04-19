-- Drop existing table if it exists (to reset constraints)
DROP TABLE IF EXISTS product_reviews CASCADE;

-- Create Reviews Table for Product Reviews (Flipkart-style)
-- This table stores all customer reviews for products

CREATE TABLE IF NOT EXISTS product_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id VARCHAR(255) NOT NULL,
  product_name VARCHAR(500) NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_title VARCHAR(100) NOT NULL,
  review_content TEXT NOT NULL,
  is_verified_purchase BOOLEAN DEFAULT TRUE,
  helpful_count INTEGER DEFAULT 0,
  unhelpful_count INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT review_content_length CHECK (LENGTH(review_content) <= 500),
  CONSTRAINT review_title_length CHECK (LENGTH(review_title) <= 100)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_product_reviews_product_id ON product_reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_user_id ON product_reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_rating ON product_reviews(rating);
CREATE INDEX IF NOT EXISTS idx_product_reviews_created_at ON product_reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_product_reviews_status ON product_reviews(status);

-- Create a view for average ratings by product
CREATE OR REPLACE VIEW product_ratings_summary AS
SELECT 
  product_id,
  product_name,
  COUNT(*) as total_reviews,
  AVG(rating)::NUMERIC(3,2) as average_rating,
  COUNT(CASE WHEN rating = 5 THEN 1 END) as five_star_count,
  COUNT(CASE WHEN rating = 4 THEN 1 END) as four_star_count,
  COUNT(CASE WHEN rating = 3 THEN 1 END) as three_star_count,
  COUNT(CASE WHEN rating = 2 THEN 1 END) as two_star_count,
  COUNT(CASE WHEN rating = 1 THEN 1 END) as one_star_count,
  MAX(created_at) as latest_review_date
FROM product_reviews
WHERE status = 'approved'
GROUP BY product_id, product_name;

-- Enable Row Level Security (RLS)
ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can read approved reviews" ON product_reviews;
DROP POLICY IF EXISTS "Users can insert their own reviews" ON product_reviews;
DROP POLICY IF EXISTS "Users can update their own reviews" ON product_reviews;
DROP POLICY IF EXISTS "Users can delete their own reviews" ON product_reviews;
DROP POLICY IF EXISTS "Admins can manage all reviews" ON product_reviews;

-- Policy: Users can read all approved reviews
CREATE POLICY "Anyone can read approved reviews" ON product_reviews
  FOR SELECT USING (status = 'approved');

-- Policy: Users can insert their own reviews
CREATE POLICY "Users can insert their own reviews" ON product_reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own reviews
CREATE POLICY "Users can update their own reviews" ON product_reviews
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own reviews
CREATE POLICY "Users can delete their own reviews" ON product_reviews
  FOR DELETE USING (auth.uid() = user_id);

-- Policy: Admins can manage all reviews (requires is_admin role)
CREATE POLICY "Admins can manage all reviews" ON product_reviews
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.raw_user_meta_data->>'is_admin' = 'true'
    )
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_product_reviews_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS product_reviews_timestamp_trigger ON product_reviews;
CREATE TRIGGER product_reviews_timestamp_trigger
  BEFORE UPDATE ON product_reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_product_reviews_timestamp();

-- Create function to check if user has purchased product (requires orders table)
CREATE OR REPLACE FUNCTION has_user_purchased_product(user_id UUID, product_id VARCHAR)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM orders
    WHERE orders.user_id = has_user_purchased_product.user_id
    AND orders.status IN ('completed', 'delivered')
    AND orders.items::TEXT LIKE '%' || product_id || '%'
  );
END;
$$ LANGUAGE plpgsql;

-- Create function to get product reviews with pagination
CREATE OR REPLACE FUNCTION get_product_reviews(
  p_product_id VARCHAR,
  p_limit INT DEFAULT 10,
  p_offset INT DEFAULT 0,
  p_sort_by VARCHAR DEFAULT 'latest'
)
RETURNS TABLE (
  id UUID,
  product_id VARCHAR,
  user_name VARCHAR,
  rating INTEGER,
  review_title VARCHAR,
  review_content TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  helpful_count INTEGER,
  unhelpful_count INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pr.id,
    pr.product_id,
    pr.user_name,
    pr.rating,
    pr.review_title,
    pr.review_content,
    pr.created_at,
    pr.helpful_count,
    pr.unhelpful_count
  FROM product_reviews pr
  WHERE pr.product_id = p_product_id
  AND pr.status = 'approved'
  ORDER BY 
    CASE WHEN p_sort_by = 'latest' THEN pr.created_at END DESC,
    CASE WHEN p_sort_by = 'highest_rated' THEN pr.rating END DESC,
    CASE WHEN p_sort_by = 'lowest_rated' THEN pr.rating END ASC,
    CASE WHEN p_sort_by = 'most_helpful' THEN pr.helpful_count END DESC
  LIMIT p_limit OFFSET p_offset;
END;
$$ LANGUAGE plpgsql;

-- Sample queries for testing and reference

-- 1. Get all reviews for a product (approved only)
-- SELECT * FROM product_reviews 
-- WHERE product_id = 'rose-quartz-bracelet' 
-- AND status = 'approved'
-- ORDER BY created_at DESC;

-- 2. Get average rating for a product
-- SELECT * FROM product_ratings_summary 
-- WHERE product_id = 'rose-quartz-bracelet';

-- 3. Get reviews using pagination function
-- SELECT * FROM get_product_reviews('rose-quartz-bracelet', 10, 0, 'latest');

-- 4. Get reviews sorted by highest rated
-- SELECT * FROM get_product_reviews('rose-quartz-bracelet', 10, 0, 'highest_rated');

-- 5. Get user's own review for a product
-- SELECT * FROM product_reviews 
-- WHERE product_id = 'rose-quartz-bracelet' 
-- AND user_id = 'your-user-id';

-- 6. Update review status (admin only)
-- UPDATE product_reviews 
-- SET status = 'approved' 
-- WHERE id = 'review-id';

-- 7. Get all pending reviews (for admin moderation)
-- SELECT * FROM product_reviews 
-- WHERE status = 'pending' 
-- ORDER BY created_at ASC;

-- 8. Mark review as helpful
-- UPDATE product_reviews 
-- SET helpful_count = helpful_count + 1 
-- WHERE id = 'review-id';

-- 9. Get top rated products
-- SELECT * FROM product_ratings_summary 
-- ORDER BY average_rating DESC, total_reviews DESC 
-- LIMIT 10;

-- 10. Get products with no reviews
-- SELECT DISTINCT product_id, product_name FROM product_reviews 
-- WHERE product_id NOT IN (
--   SELECT DISTINCT product_id FROM product_reviews WHERE status = 'approved'
-- );

-- ===========================
-- DUMMY REVIEWS DATA (SEEDING)
-- ===========================

-- Insert dummy reviews for Rose Quartz Bracelet
INSERT INTO product_reviews (product_id, product_name, user_id, user_name, user_email, rating, review_title, review_content, is_verified_purchase, status)
VALUES 
  (
    'rose-quartz-bracelet',
    'Rose Quartz Healing Bracelet',
    NULL,
    'Priya Sharma',
    'priya@gmail.com',
    5,
    'Truly Life-Changing!',
    'I purchased this bracelet with the energy activation ritual and felt an immediate shift in my energy. The quality is exceptional and the craftsmanship is evident. Highly recommended! The rose quartz energy is so soothing and calming.',
    TRUE,
    'approved'
  ),
  (
    'rose-quartz-bracelet',
    'Rose Quartz Healing Bracelet',
    NULL,
    'Arjun Patel',
    'arjun@gmail.com',
    5,
    'Premium Quality & Fast Delivery',
    'Received my order within 2 days. The bracelet looks exactly like the pictures and feels premium. The energy work added was worth every penny. Feeling the benefits already! The packaging was also very professional.',
    TRUE,
    'approved'
  ),
  (
    'rose-quartz-bracelet',
    'Rose Quartz Healing Bracelet',
    NULL,
    'Meera Gupta',
    'meera@gmail.com',
    4,
    'Beautiful & Effective',
    'Love the design and it feels great wearing it. The spiritual significance is explained beautifully. Would recommend to anyone looking for authentic healing crystals. The size was perfect.',
    TRUE,
    'approved'
  ),
  (
    'rose-quartz-bracelet',
    'Rose Quartz Healing Bracelet',
    NULL,
    'Rajesh Kumar',
    'rajesh@gmail.com',
    5,
    'Excellent Customer Service',
    'Great product and even better service. The team answered all my questions about the energy activation process. Very professional and knowledgeable! I will definitely buy more products.',
    TRUE,
    'approved'
  ),
  (
    'rose-quartz-bracelet',
    'Rose Quartz Healing Bracelet',
    NULL,
    'Anjali Singh',
    'anjali@gmail.com',
    5,
    'Worth Every Penny',
    'This is my second purchase from REHAS. The quality never disappoints. The rose quartz bracelet is absolutely stunning and the positive energy is undeniable. Highly satisfied!',
    TRUE,
    'approved'
  ),
  (
    'rose-quartz-bracelet',
    'Rose Quartz Healing Bracelet',
    NULL,
    'Vikram Malhotra',
    'vikram@gmail.com',
    4,
    'Great Addition to My Collection',
    'Already had one rose quartz bracelet and loved it, so I bought another. The consistency in quality is amazing. Perfect gift for loved ones interested in healing crystals.',
    TRUE,
    'approved'
  ),
  (
    'rose-quartz-bracelet',
    'Rose Quartz Healing Bracelet',
    NULL,
    'Sneha Verma',
    'sneha@gmail.com',
    5,
    'Life Changing Experience',
    'Wearing this for a month now and I can feel the difference. My anxiety has reduced significantly and I feel more at peace. The energy work performed was incredible. Highly recommend the ritual option!',
    TRUE,
    'approved'
  ),
  (
    'rose-quartz-bracelet',
    'Rose Quartz Healing Bracelet',
    NULL,
    'Rohan Desai',
    'rohan@gmail.com',
    4,
    'Authentic and Effective',
    'Purchased without the ritual first, but now planning to buy another with the energy activation. The bracelet itself is authentic and feels premium. The support team is very helpful.',
    TRUE,
    'approved'
  )
ON CONFLICT DO NOTHING;

-- Note: If conflicts occur, it means reviews with these UUIDs already exist
-- To reset and reload dummy data, run:
-- DELETE FROM product_reviews WHERE product_id = 'rose-quartz-bracelet';
-- Then re-run the INSERT statements above
