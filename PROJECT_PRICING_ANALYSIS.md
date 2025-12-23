# REHAS Project - Pricing & Amount Standardization Analysis

## Executive Summary
The project currently has **INCONSISTENT PRICING** across different data files and components. Prices are stored in multiple locations with mixed currencies ($, ₹) and formats. This analysis identifies all inconsistencies and provides a standardization plan.

---

## Current Issues

### 1. **Mixed Currency Formats**
- Some files use **US Dollars ($)**: reiki.ts, mantra.ts, tantra.ts (partial)
- Some files use **Indian Rupees (₹)**: healing.ts, therapy.ts, general.ts, and most service files
- **Problem**: Inconsistent user experience and confusion about pricing

### 2. **Prices Defined in Multiple Locations**

#### Example 1: Reiki Service
**Location 1**: `/src/data/healing.ts` (Homepage section)
```typescript
{
  id: 'reiki',
  title: 'Reiki',
  price: '₹2,500'  // ← In rupees
}
```

**Location 2**: `/src/data/reiki.ts` (Dedicated service page)
```typescript
{
  name: 'In-Person Reiki',
  price: '$89'  // ← In dollars (INCONSISTENT!)
}
```

#### Example 2: Mantra Service
**Location 1**: `/src/data/healing.ts`
```typescript
{
  id: 'mantra',
  title: 'Mantra',
  price: '₹3,500'  // ← In rupees
}
```

**Location 2**: `/src/data/mantra.ts`
```typescript
{
  name: 'Mantra Chanting',
  price: '$79'  // ← In dollars (INCONSISTENT!)
}
```

### 3. **Multiple Price Entries Per Service**

Many services have **nested pricing arrays** with multiple session types:
```typescript
sessions: {
  types: [
    { name: '...', price: '$99' },   // Price A
    { name: '...', price: '$199' },  // Price B
    { name: '...', price: '$299' }   // Price C
  ]
}
```

### 4. **No Central Price Management**
- Prices are hardcoded throughout the codebase
- No single source of truth for pricing
- Making changes requires updating multiple files

---

## Affected Files Summary

### Files with **$ (USD) Prices** ❌
1. `src/data/reiki.ts` - 3 session prices ($89, $129, $69)
2. `src/data/mantra.ts` - 3 session prices ($79, $149, $59)
3. `src/data/tantra.ts` - 6 session prices (₹ + $ mixed)

### Files with **₹ (INR) Prices** ✅ (Correct)
1. `src/data/healing.ts` - Main section (₹2,500-₹4,500)
2. `src/data/therapy.ts` - Main section (₹1,500-₹2,500)
3. `src/data/general.ts` - Sessions (₹1,500-₹5,500)
4. `src/data/healingService.ts` - Sessions (₹2,500-₹3,500)
5. `src/data/astroReport.ts` - 3 sessions (₹2,000-₹5,500)
6. `src/data/kundliAnalysis.ts` - 3 sessions (₹2,500-₹6,500)
7. `src/data/tarot.ts` - 3 sessions (₹1,200-₹4,500)
8. `src/data/reikiTherapy.ts` - 3 sessions (₹2,000-₹8,500)
9. `src/data/acupressure.ts` - 3 sessions (₹1,500-₹10,000)
10. `src/data/acupuncture.ts` - 3 sessions (₹2,000-₹14,000)
... and **30+ more files** with INR prices

### Product/Course Files (Mixed Prices)
- `src/data/courseHealing.ts` - ₹ with ranges (₹8,000-₹15,000)
- `src/data/courseTherapy.ts` - ₹ with ranges (₹25,000-₹100,000)
- `src/data/courseAstrology.ts` - ₹ with ranges (₹8,000-₹85,000)
- `src/data/productHealing.ts` - ₹ prices (₹1-₹8,000)
- `src/data/productTherapy.ts` - ₹ prices (₹1,500-₹12,000)

---

## Price Structure Issues

### Issue A: Duplicate Pricing
Same service defined with different prices in different locations:
```
Reiki:
  - healing.ts: ₹2,500
  - reiki.ts: $89 (separate sessions)
  
Mantra:
  - healing.ts: ₹3,500
  - mantra.ts: $79 (separate sessions)
```

### Issue B: Mixed Session Structures
Some files have nested `sessions.types[]` array:
```typescript
sessions: {
  types: [
    { name: '...', price: '$99' },
    { name: '...', price: '$499' },
    { name: '...', price: '$179' }
  ]
}
```

Others have price in main item:
```typescript
{
  id: 'reiki',
  price: '₹2,500',
  details: {
    price: '₹2,500'  // Duplicated
  }
}
```

### Issue C: Components Rendering Inconsistently

**healing.tsx** renders:
- Main item price from `details.price`
- Session prices from nested structure

**Components don't normalize currency** - they just display raw strings

---

## Current Component Usage

### 1. Healing Component
```tsx
// Displays from healing.ts main section
{item.details?.price && (
  <p className={styles.practicePrice}>
    <strong>Price:</strong> {item.details.price}
  </p>
)}
```

### 2. Reiki Component  
```tsx
// Displays from reiki.ts sessions
{session.price}  // Shows raw value ($89, $129, etc.)
```

### 3. HealingService Component
```tsx
// Displays from healingService.ts
<span className={styles.price}>{item.price}</span>
```

---

## API Integration Issue

**File**: `/src/app/api/razorpay/create-order/route.ts`
```typescript
const { amount, orderId, customerEmail... } = body;

// Amount is expected in PAISE (₹ × 100)
const razorpayOrder = await razorpay.orders.create({
  amount: amount,  // Should be in paise
  currency: 'INR'
});
```

**Problem**: Prices are stored as strings with currency symbols (₹2,500), but API expects numeric amounts in paise

---

## Standardization Requirements

### ✅ What Should Be Done

1. **Use Only Indian Rupees (₹)** - Convert all $ prices to ₹
   - $89 → ₹6,500 (approximately)
   - $129 → ₹9,500
   - $69 → ₹5,000
   
2. **Create Single Source of Truth** - Central pricing structure

3. **Standardize Format**:
   - Use numeric values + currency symbol: `{ amount: 2500, currency: '₹' }`
   - Not string format: `'₹2,500'`

4. **Remove Duplicates** - One price per service tier

5. **Normalize Session Pricing** - Consistent structure across all files

6. **Update Components** - Use normalized prices from JSON

---

## File Structure Overview

```
src/
├── data/
│   ├── healing.ts ✅ (INR prices)
│   ├── therapy.ts ✅ (INR prices)
│   ├── reiki.ts ❌ (USD prices)
│   ├── mantra.ts ❌ (USD prices)
│   ├── tantra.ts ⚠️ (Mixed)
│   ├── general.ts ✅ (INR prices)
│   ├── healingService.ts ✅ (INR prices)
│   ├── astroReport.ts ✅ (INR prices)
│   ... (40+ more service files)
│   └── productHealing.ts ✅ (INR prices)
├── components/
│   ├── healing/healing.tsx
│   ├── reiki/reiki.tsx
│   ├── healingService/healingService.tsx
│   ... (other components)
│   └── PaymentModal.tsx
└── app/
    └── api/razorpay/create-order/route.ts
```

---

## Statistics

- **Total Data Files**: 40+
- **Files with USD Prices**: 3 (reiki.ts, mantra.ts, tantra.ts)
- **Files with INR Prices**: 37+
- **Services with Duplicate Pricing**: 3-4
- **Components Using Price Data**: 10+

---

## Recommended Solution

### Phase 1: Convert Currency
1. Convert all USD prices to INR
2. Update reiki.ts, mantra.ts, tantra.ts

### Phase 2: Standardize Price Format
1. Create standard price object:
   ```typescript
   price: {
     amount: 2500,
     currency: 'INR',
     display: '₹2,500'
   }
   ```

### Phase 3: Consolidate Data
1. Remove redundant price definitions
2. Use single source for each service
3. Keep sessions nested but reference main price

### Phase 4: Update Components
1. Update all components to use normalized price format
2. Format display strings in components, not in data
3. Ensure API receives numeric paise values

### Phase 5: API Integration
1. Update checkout flow to extract numeric amount
2. Convert ₹ to paise before API call
3. Validate price consistency

---

## Action Items

- [ ] Convert $89, $129, $69 (Reiki) to INR
- [ ] Convert $79, $149, $59 (Mantra) to INR
- [ ] Fix tantra.ts mixed currency
- [ ] Standardize all price formats to `{ amount, currency, display }`
- [ ] Remove duplicate price definitions
- [ ] Update all components to use new format
- [ ] Update API to handle numeric prices
- [ ] Test payment flow end-to-end
- [ ] Build and verify all pages compile
