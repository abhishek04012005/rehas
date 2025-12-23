# Enhanced Checkout System Documentation

**Date**: December 23, 2025  
**Status**: ✅ **IMPLEMENTED**

---

## Overview

A complete checkout system has been designed and implemented with:
- Enhanced checkout form with personal & shipping address information
- Automatic age calculation from birth date
- Phone number validation (10 digits only)
- Order creation and database storage
- Integration with payment processing

---

## System Architecture

```
Checkout Flow:
┌─────────────────┐
│  Product Page   │
│  (Book Now)     │
└────────┬────────┘
         │
         v
┌─────────────────────────────┐
│  Enhanced Checkout Form     │
│  - Personal Information     │
│  - Birth Date (auto age)    │
│  - Phone (10 digits)        │
│  - Shipping Address         │
│  - Form Validation          │
└────────┬────────────────────┘
         │
         v
┌──────────────────────────┐
│  API: /api/orders/create │
│  - Validate Data         │
│  - Save to Database      │
│  - Return Order ID       │
└────────┬─────────────────┘
         │
         v
┌──────────────────────┐
│  Payment Gateway     │
│  (Razorpay / COD)    │
│  with Order ID       │
└──────────────────────┘
```

---

## Database Schema

### Orders Table

```sql
CREATE TABLE orders (
  -- Primary Key
  id BIGSERIAL PRIMARY KEY

  -- Customer Information
  full_name VARCHAR(255) NOT NULL
  email VARCHAR(255) NOT NULL
  phone_number VARCHAR(10) NOT NULL
  birth_date DATE
  age INT

  -- Product/Service Details
  product_title VARCHAR(255) NOT NULL
  order_type VARCHAR(50) NOT NULL
    ├─ 'service'
    ├─ 'course'
    └─ 'product'
  
  service_id VARCHAR(255)
  service_title VARCHAR(255)
  service_description TEXT

  -- Shipping Address
  address_line_1 VARCHAR(500)
  address_line_2 VARCHAR(500)
  city VARCHAR(100)
  state VARCHAR(100)
  postal_code VARCHAR(20)
  country VARCHAR(100) DEFAULT 'India'

  -- Payment Information
  amount DECIMAL(10, 2) NOT NULL
  currency VARCHAR(3) DEFAULT 'INR'
  amount_in_paise BIGINT

  -- Order Status
  status VARCHAR(50) DEFAULT 'pending'
    ├─ 'pending'
    ├─ 'confirmed'
    ├─ 'processing'
    ├─ 'completed'
    └─ 'cancelled'

  payment_status VARCHAR(50) DEFAULT 'unpaid'
    ├─ 'unpaid'
    ├─ 'pending'
    ├─ 'paid'
    └─ 'failed'

  payment_method VARCHAR(50)
    ├─ 'razorpay'
    ├─ 'cod'
    └─ 'upi'

  -- Razorpay Integration
  razorpay_order_id VARCHAR(255)
  razorpay_payment_id VARCHAR(255)
  razorpay_signature VARCHAR(255)

  -- Metadata
  notes TEXT
  admin_notes TEXT
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)
```

### Database Features

1. **Automatic Triggers**:
   - Auto-update `updated_at` on any modification
   - Auto-calculate `age` from `birth_date`
   - Auto-calculate `amount_in_paise` = `amount * 100`

2. **Indexes** for performance:
   - Email lookup
   - Phone number search
   - Status filtering
   - Date range queries
   - Razorpay order tracking

3. **Row Level Security (RLS)**:
   - Public can insert orders
   - Authenticated users can manage orders
   - Admin dashboard can view/update all

---

## Implementation Details

### 1. Enhanced Checkout Context

**File**: `src/context/CheckoutContext.tsx`

```typescript
interface ProductData {
  productTitle: string;
  amount: number;
  type?: OrderType;        // 'service' | 'course' | 'product'
  serviceId?: string;
  description?: string;
}
```

**Usage**:
```tsx
const { productData, setProductData } = useCheckout();

setProductData({
  productTitle: 'Reiki Healing',
  amount: 6500,
  type: 'service',
  serviceId: 'reiki',
  description: 'Professional Reiki healing session'
});
```

### 2. Enhanced Checkout Form Component

**File**: `src/components/enhancedCheckoutForm/enhancedCheckoutForm.tsx`

**Features**:
- ✅ Personal Information Section
  - Full Name (required)
  - Email (required, validated)
  - Phone Number (required, 10 digits, auto-formatted)
  - Birth Date (required, date picker)
  - Age (auto-calculated, read-only)

- ✅ Shipping Address Section
  - Address Line 1 (required)
  - Address Line 2 (optional)
  - City (required)
  - State (dropdown with 28 Indian states)
  - Postal Code (required)
  - Country (auto-filled as India, read-only)

- ✅ Form Validation
  - All required fields
  - Email format validation
  - Phone number validation (10 digits, starts with 6-9)
  - Birth date validation (not in future)
  - Real-time error display

- ✅ Order Summary Display
  - Product/Service name
  - Amount in ₹

- ✅ Styling
  - Matches website theme colors (#560067 primary, #92487a secondary)
  - Responsive design (mobile-first)
  - Smooth animations and transitions

### 3. Form Validation Rules

| Field | Rules | Error Message |
|-------|-------|---------------|
| Full Name | Non-empty | "Full name is required" |
| Email | Valid email format | "Invalid email address" |
| Phone Number | 10 digits, starts 6-9 | "Phone number must start with 6, 7, 8, or 9" |
| Birth Date | Not in future | "Birth date cannot be in the future" |
| Address Line 1 | Non-empty | "Address line 1 is required" |
| City | Non-empty | "City is required" |
| State | Selected from dropdown | "State is required" |
| Postal Code | Non-empty | "Postal code is required" |

### 4. Age Calculation

```typescript
// Auto-triggered when birth date changes
useEffect(() => {
  if (formData.birthDate) {
    const birthDate = new Date(formData.birthDate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    setFormData(prev => ({ ...prev, age }));
  }
}, [formData.birthDate]);
```

### 5. Phone Number Auto-Formatting

```typescript
if (name === 'phoneNumber') {
  value = value.replace(/\D/g, '')      // Remove all non-digits
                .slice(0, 10);            // Max 10 digits
}
```

---

## API Endpoints

### Create Order

**Endpoint**: `POST /api/orders/create`

**Request Body**:
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phoneNumber": "9876543210",
  "birthDate": "1990-05-15",
  "age": 34,
  "addressLine1": "123 Main Street",
  "addressLine2": "Apartment 4B",
  "city": "Mumbai",
  "state": "Maharashtra",
  "postalCode": "400001",
  "country": "India",
  "productTitle": "Reiki Healing Session",
  "amount": 6500,
  "orderType": "service",
  "serviceId": "reiki",
  "serviceTitle": "Reiki Healing",
  "serviceDescription": "Professional 60-minute Reiki session"
}
```

**Response (Success)**:
```json
{
  "success": true,
  "orderId": 12345,
  "message": "Order created successfully"
}
```

**Response (Error)**:
```json
{
  "error": "Invalid phone number"
}
```

**Status Codes**:
- `201`: Order created successfully
- `400`: Validation error
- `500`: Server error

---

## Form Flow

### Step 1: User Clicks "Book Now"
```tsx
const handleBookNow = (product) => {
  setProductData({
    productTitle: product.title,
    amount: product.price,
    type: 'service',
    serviceId: product.id,
    description: product.description
  });
  router.push('/checkout');
};
```

### Step 2: Checkout Form Displays
- Shows order summary (product name, amount)
- Displays form sections
- Validates input in real-time

### Step 3: User Submits Form
- All validations run
- If valid: API call to `/api/orders/create`
- Order saved to database
- Redirects to payment gateway

### Step 4: Payment Processing
- Razorpay or COD payment
- Order ID linked with payment
- Payment confirmation updates order status

---

## Styling & Design

### Color Scheme
- Primary: `#560067` (Deep Purple)
- Secondary: `#92487a` (Mauve)
- Success: `#d4edda`
- Error: `#f8d7da`

### Typography
- Headers: 800-900 font weight, uppercase
- Labels: 700 font weight, uppercase, 13px
- Input: 14px regular, 400 weight

### Responsive Breakpoints
- Desktop: 1000px+ (2-column layout)
- Tablet: 768px (2-column, narrower)
- Mobile: < 768px (1-column layout)
- Small Mobile: < 480px (single column, smaller padding)

### Animations
- Form section transitions (300ms)
- Error message slide-in (200ms)
- Button hover effects (transform, shadow)
- Success alert animation (slide-down)

---

## Database Migration Steps

### Run in Supabase SQL Editor:

```sql
-- Execute the orders_table.sql file content
-- This will:
-- 1. Create the orders table
-- 2. Create indexes
-- 3. Set up RLS policies
-- 4. Create triggers for auto-update and age calculation
```

### Verify Tables:
```sql
-- Check if table exists
SELECT table_name FROM information_schema.tables 
WHERE table_name = 'orders';

-- Check columns
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'orders';

-- Check indexes
SELECT indexname FROM pg_indexes 
WHERE tablename = 'orders';
```

---

## File Structure

```
src/
├── context/
│   └── CheckoutContext.tsx (Enhanced with type & service info)
├── components/
│   ├── enhancedCheckoutForm/
│   │   ├── enhancedCheckoutForm.tsx (NEW)
│   │   └── enhancedCheckoutForm.module.css (NEW)
│   └── checkoutForm/
│       └── checkoutForm.tsx (Original - kept for reference)
├── app/
│   ├── checkout/
│   │   └── page.tsx (Updated to use enhanced form)
│   └── api/
│       └── orders/
│           └── create/
│               └── route.ts (NEW)
└── db/
    └── orders_table.sql (Updated with complete schema)
```

---

## Usage Examples

### Example 1: Product Page with "Book Now"

```tsx
import { useCheckout } from '@/context/CheckoutContext';
import { useRouter } from 'next/navigation';

export default function ProductDetail({ product }) {
  const { setProductData } = useCheckout();
  const router = useRouter();

  const handleBookNow = () => {
    setProductData({
      productTitle: product.title,
      amount: product.price,
      type: 'service',
      serviceId: product.id,
      description: product.description
    });
    router.push('/checkout');
  };

  return (
    <button onClick={handleBookNow} className="bookNowBtn">
      Book Now
    </button>
  );
}
```

### Example 2: Course Purchase

```tsx
const handleBuyCourse = () => {
  setProductData({
    productTitle: 'Advanced Reiki Course',
    amount: 35000,
    type: 'course',
    serviceId: 'course-reiki-advanced',
    description: '12-week comprehensive Reiki training'
  });
  router.push('/checkout');
};
```

### Example 3: Product Purchase

```tsx
const handleBuyProduct = () => {
  setProductData({
    productTitle: 'Healing Crystal Set',
    amount: 3500,
    type: 'product',
    serviceId: 'product-crystal-set',
    description: 'Premium healing crystal collection'
  });
  router.push('/checkout');
};
```

---

## Features Summary

| Feature | Status | Details |
|---------|--------|---------|
| Personal Information Form | ✅ | Name, Email, Phone, Birth Date |
| Auto Age Calculation | ✅ | From birth date, read-only field |
| Phone Validation | ✅ | 10 digits only, starts 6-9 |
| Shipping Address Form | ✅ | Full address with 28 Indian states |
| Form Validation | ✅ | Real-time, comprehensive error display |
| Order Type (Service/Course/Product) | ✅ | Auto-populated from context |
| Order Details Storage | ✅ | Service title, description saved |
| Database Integration | ✅ | Complete orders table with indexes |
| Auto-Triggers | ✅ | Age calculation, timestamp update |
| RLS Security | ✅ | Row-level security policies |
| API Endpoint | ✅ | POST /api/orders/create |
| Error Handling | ✅ | Comprehensive validation & errors |
| Responsive Design | ✅ | Mobile-first, all breakpoints |
| Theme Integration | ✅ | Matches website colors & typography |
| Payment Integration Ready | ✅ | Order ID passed to payment gateway |

---

## Testing Checklist

- [ ] Form loads without errors
- [ ] Phone number only accepts digits, max 10
- [ ] Age auto-calculates from birth date
- [ ] Email validation works
- [ ] All required fields show error messages
- [ ] Submit button disabled during loading
- [ ] Order saves to database successfully
- [ ] Order ID returned to frontend
- [ ] Payment gateway receives order details
- [ ] Mobile responsive design works
- [ ] All form sections validate
- [ ] Success/error alerts display properly
- [ ] Data persistence in Supabase

---

## Security Considerations

1. **Input Validation**
   - All fields validated on client
   - Server-side validation in API
   - Email format verification
   - Phone number verification

2. **Database Security**
   - RLS policies enabled
   - Public can only insert
   - Authenticated users can view/update own data
   - Admin can manage all orders

3. **Data Encryption**
   - HTTPS for all API calls
   - Supabase handles encryption at rest
   - No sensitive data in logs

4. **Rate Limiting**
   - Consider implementing rate limiting on order creation
   - Prevent duplicate submissions (idempotency)

---

## Future Enhancements

1. **Order Management Dashboard**
   - View order history
   - Track order status
   - Download invoices

2. **Email Notifications**
   - Order confirmation email
   - Payment receipt
   - Shipping updates

3. **Advanced Validation**
   - Check postal code format by state
   - Verify address with maps API
   - Phone verification via OTP

4. **Analytics**
   - Track conversion rates
   - Analyze checkout abandonment
   - Order value trends

5. **Discounts & Coupons**
   - Coupon code application
   - Automatic discount calculation
   - Loyalty program integration

---

## Build Status

✅ **All 87 pages compiled successfully**

```
✓ Compiled successfully in 5.0s
✓ Generating static pages (87/87) in 659.6ms
```

---

## Support & Troubleshooting

### Issue: Form not submitting
**Solution**: Check browser console for validation errors, ensure all required fields are filled

### Issue: Age not calculating
**Solution**: Ensure birth date is in correct format (YYYY-MM-DD)

### Issue: Order not saving
**Solution**: Check Supabase connection, verify RLS policies are correct

### Issue: Phone validation failing
**Solution**: Only numeric input, must be 10 digits, starting with 6-9

---

**Document Status**: ✅ Complete  
**Last Updated**: December 23, 2025
