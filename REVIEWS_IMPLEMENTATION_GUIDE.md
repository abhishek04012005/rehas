# Product Reviews Implementation Guide

## Overview
A complete Flipkart-style review system for product pages with:
- User reviews with ratings (1-5 stars)
- Show 3 latest reviews by default
- "Show All Reviews" button to expand
- Add/Edit/Delete reviews for verified purchasers
- Dummy reviews loaded from JSON file
- localStorage storage (ready for Supabase integration)

## Files Created/Modified

### 1. **dummyReviews.json** (NEW)
Location: `src/data/dummyReviews.json`
- Contains 8 sample reviews for Rose Quartz Bracelet
- Format: Product ID, user details, ratings, titles, and content
- Auto-loaded on first page visit if no reviews exist
- Easy to add more reviews by following the JSON structure

### 2. **reviewsSection.tsx** (UPDATED)
Location: `src/components/productDetail/reviewsSection.tsx`

**Key Features:**
- Import dummy reviews from JSON: `import dummyReviewsData from '@/data/dummyReviews.json'`
- Auto-load dummy reviews on first visit
- Show only 3 latest reviews by default
- Toggle "Show All Reviews" / "Show Less" button
- Reviews sorted by latest first
- Preserve user reviews even after adding dummy reviews

**State Management:**
- `showAllReviews`: Toggle between 3 latest vs all reviews
- All other review functionality remains unchanged

### 3. **productDetail.module.css** (UPDATED)
Location: `src/components/productDetail/productDetail.module.css`

**New Styles:**
- `.showAllReviewsBtn`: Primary button with gradient border
- `.showLessReviewsBtn`: Collapse button
- Both have hover effects with gradient background
- Responsive on mobile devices

## How It Works

### Initial Load
1. Component checks localStorage for existing reviews
2. If empty, loads dummy reviews from JSON
3. Saves dummy reviews to localStorage for future visits
4. Sorts reviews by latest first

### Display Logic
```
If reviews.length <= 3:
  Show all reviews

If reviews.length > 3:
  Default: Show latest 3 reviews
  Click "Show All": Show all reviews
  Click "Show Less": Back to 3 reviews
```

### Review Structure
```json
{
  "id": "review_001",
  "productId": "rose-quartz-bracelet",
  "productName": "Rose Quartz Healing Bracelet",
  "userName": "Priya Sharma",
  "userEmail": "priya@example.com",
  "rating": 5,
  "title": "Truly Life-Changing!",
  "content": "Product description...",
  "createdAt": "2024-03-15T10:30:00Z",
  "isPurchased": true
}
```

## Adding More Dummy Reviews

1. Open `src/data/dummyReviews.json`
2. Add a new review object to the `reviews` array
3. Required fields:
   - `id`: Unique identifier (review_###)
   - `productId`: Matches product slug
   - `rating`: 1-5
   - `title`: Max 100 characters
   - `content`: Max 500 characters
   - `createdAt`: ISO timestamp
   - `isPurchased`: true/false

Example:
```json
{
  "id": "review_009",
  "productId": "rose-quartz-bracelet",
  "productName": "Rose Quartz Healing Bracelet",
  "userName": "New User",
  "userEmail": "user@example.com",
  "rating": 5,
  "title": "Amazing Product!",
  "content": "This is a great product...",
  "createdAt": "2024-03-20T12:00:00Z",
  "isPurchased": true
}
```

## Current Data Storage

### Development (Current)
- `localStorage`: Reviews stored in browser
- `dummyReviews.json`: Seeding data

### Production (Next Phase)
Replace localStorage calls with Supabase API:
1. Create `product_reviews` table (see REVIEWS_TABLE_SETUP.sql)
2. Update API calls in `reviewsSection.tsx`
3. Implement RLS policies for security
4. Add review moderation flow

## Integration with Supabase

When ready to move to production, update these functions in `reviewsSection.tsx`:

1. **Fetch Reviews:**
```typescript
// Instead of:
const storedReviews = localStorage.getItem(storageKey);

// Use:
const { data, error } = await supabase
  .from('product_reviews')
  .select('*')
  .eq('product_id', productId)
  .eq('status', 'approved')
  .order('created_at', { ascending: false });
```

2. **Submit Review:**
```typescript
// Instead of:
localStorage.setItem(storageKey, JSON.stringify(updatedReviews));

// Use:
const { data, error } = await supabase
  .from('product_reviews')
  .insert([newReview]);
```

3. **Delete Review:**
```typescript
// Instead of:
const updatedReviews = reviews.filter((r) => r.id !== reviewId);

// Use:
const { error } = await supabase
  .from('product_reviews')
  .delete()
  .eq('id', reviewId);
```

## Features Summary

✅ Load dummy reviews from JSON
✅ Auto-populate on first visit
✅ Show 3 latest reviews by default
✅ "Show All Reviews" button
✅ "Show Less" button
✅ User can add review (if purchased)
✅ User can edit own review
✅ User can delete own review
✅ Verified purchase badge
✅ Star ratings display
✅ Responsive design
✅ localStorage persistence
✅ Ready for Supabase migration

## Testing

1. **Add dummy reviews**: Reviews auto-load on product page
2. **Test toggle**: Click "Show All Reviews" to expand
3. **Add review**: Login with purchased product, fill form
4. **Edit review**: Click "Edit Your Review" to modify
5. **Delete review**: Click delete button to remove
6. **Refresh page**: Reviews persist in localStorage

## Future Enhancements

- Admin review moderation
- Review sorting (helpful, recent, highest/lowest rated)
- Review filtering by rating
- Helpful/unhelpful counts
- Review images/video support
- Email notifications for responses
- Review analytics dashboard
