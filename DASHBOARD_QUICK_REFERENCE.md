# Admin Dashboard Quick Reference Guide

## Overview
Two new admin dashboards have been created for order and payment management:
1. **Orders & Bookings Dashboard** - `/admin/orders`
2. **Payment Details Dashboard** - `/admin/payments`

---

## Orders & Bookings Dashboard

### URL
`http://localhost:3000/admin/orders`

### What It Does
Displays all customer orders and bookings with comprehensive management capabilities.

### Key Sections

**Statistics**
- Total Orders
- Pending Orders  
- Confirmed Orders
- Completed Orders
- Total Revenue
- Paid Revenue

**Search & Filters**
- Search: Customer name, phone, email, product
- Status Filter: All, Pending, Confirmed, Completed, Cancelled
- Payment Filter: All, Unpaid, Paid, Failed

**Table Columns**
- Order ID
- Customer Name
- Product/Service
- Amount (₹)
- Order Status (badge)
- Payment Status (badge)
- Date
- View Button

**Order Actions** (in modal)
- Mark as Confirmed
- Mark as Completed & Paid
- Cancel Order

### Color Coding
- **Pending**: Blue
- **Confirmed**: Purple
- **Completed**: Green
- **Cancelled**: Red

---

## Payment Details Dashboard

### URL
`http://localhost:3000/admin/payments`

### What It Does
Tracks all payment transactions with detailed analytics and management.

### Key Sections

**Statistics** (8 cards)
- Total Transactions
- Completed Transactions
- Pending Transactions
- Failed Transactions
- Completed Revenue (₹)
- Success Rate (%)
- Average Amount (₹)
- Total Amount (₹)

**Search & Filters**
- Search: Customer name, email, phone, product
- Payment Status: All, Paid, Unpaid, Failed
- Order Type: All, Service, Course, Product
- Export CSV Button

**Table Columns**
- Transaction ID
- Customer Name
- Email
- Product/Service
- Amount (₹)
- Status (badge)
- Date
- View Button

**Payment Actions** (in modal)
- Mark as Paid
- Mark as Failed
- Mark as Unpaid

### Export Feature
Click **"Export CSV"** to download filtered payment data with columns:
- ID, Customer, Email, Phone, Product, Amount, Status, Date

---

## Navigation

### Desktop Navigation (Top Bar)
```
REHAS Admin | Dashboard | Contacts | Enquiries | Orders | Payments | [Logout]
```

### Mobile Navigation (Hamburger Menu)
```
☰ Dashboard
  Contacts
  Enquiries
  Orders (NEW)
  Payments (NEW)
  Logout
```

---

## Common Tasks

### View All Orders
1. Navigate to `/admin/orders`
2. Data loads automatically

### Filter Orders
1. Use Status Filter (Pending, Confirmed, etc.)
2. Use Payment Filter (Paid, Unpaid, etc.)
3. Type in search box to find specific customer/product

### Update Order Status
1. Click View button on any order
2. Modal opens with options:
   - Mark as Confirmed
   - Mark as Completed & Paid
   - Cancel Order
3. Click button to update (instant)

### Check Payment Metrics
1. Navigate to `/admin/payments`
2. View statistics cards at top
3. Success Rate = Percentage of paid orders
4. Average Amount = Total ÷ Number of transactions

### Export Payment Data
1. Apply filters if needed
2. Click "Export CSV" button
3. File downloads as `payments-YYYY-MM-DD.csv`

### Find Specific Payment
1. Type customer name/email/phone in search
2. Or select payment status from dropdown
3. Table filters in real-time

---

## Data Displayed

### From Orders Table
- Customer Information: Name, Email, Phone
- Order Details: Product, Amount, Order Type
- Status: Order Status, Payment Status
- Timestamps: Created Date, Updated Date
- Business Details: Address (if provided)

### Calculations
- **Total Revenue**: Sum of all order amounts
- **Paid Revenue**: Sum of amounts where payment_status = 'paid'
- **Success Rate**: (Paid Orders / Total Orders) × 100
- **Average Amount**: Total Amount / Number of Orders

---

## Status Meanings

### Order Status
- **Pending**: Order placed, awaiting confirmation
- **Confirmed**: Order confirmed, service scheduled
- **Completed**: Service delivered/completed
- **Cancelled**: Order cancelled by customer or admin

### Payment Status
- **Unpaid**: Payment not yet received
- **Paid**: Payment successfully received
- **Failed**: Payment attempt failed

---

## Requirements

- ✅ Admin authentication (adminSession in localStorage)
- ✅ Supabase connection configured
- ✅ `orders` table exists in database
- ✅ Browser with JavaScript enabled
- ✅ Modern browser (Chrome, Firefox, Safari, Edge)

---

## Responsive Design

### Desktop (1200px+)
- Full multi-column grid for statistics
- Full-width table with all columns visible
- Side-by-side controls

### Tablet (768px - 1199px)
- 2-column statistic grid
- Horizontal scrolling table
- Stacked controls

### Mobile (480px - 767px)
- Single-column statistic cards
- Horizontal scrolling table
- Stacked filter buttons
- Compact modal layout

### Extra Small (<480px)
- Reduced padding and font sizes
- Full-width buttons
- Single column for all elements

---

## Tips & Tricks

1. **Quick Status Changes**: Click View → Select Action → Done (instant update)
2. **Bulk Download**: Use Export CSV after filtering to get subset of data
3. **Search Tips**: Search works on any visible text (name, email, product title)
4. **Mobile Friendly**: All features work on mobile (scroll table horizontally)
5. **Real-time Data**: Close and reopen dashboard to refresh data
6. **Color Indicators**: Status badges use consistent color scheme:
   - Blue = Pending/Unpaid
   - Purple = Confirmed/Processing
   - Green = Completed/Paid
   - Red = Cancelled/Failed

---

## If Something Doesn't Work

1. **Dashboard not loading**: Check if logged in to admin
2. **Data not appearing**: Verify orders table exists in Supabase
3. **Modal won't close**: Click outside modal or press X button
4. **Export not working**: Check browser download settings
5. **Filters not working**: Try refreshing the page

---

**Last Updated**: December 24, 2025  
**Version**: 1.0
