# WhatsApp Analytics - System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          FRONTEND LAYER                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  User Website (navbar.tsx)                  Admin Panel                 │
│  ┌──────────────────────────┐              ┌──────────────────┐        │
│  │ [WhatsApp Button Click]  │              │ Admin Login      │        │
│  │ (Tracks click)           │              │ adminNavbar.tsx  │        │
│  │ Captures:                │              ├──────────────────┤        │
│  │ - Page URL               │              │ Dashboard        │        │
│  │ - Referrer               │              └──────────────────┘        │
│  │ - Device Type (auto)     │                       ▲                   │
│  │ - Browser (auto)         │                       │ auth check       │
│  │ - IP (auto)              │                       ▼                   │
│  └──────────────────────────┘              ┌──────────────────────┐    │
│           │                                │ WhatsApp Analytics   │    │
│           │ POST                           │ (whatsappAnalytics/) │    │
│           └────────────────────────────────│                      │    │
│                                            │ Features:            │    │
│  ┌─────────────────────────┐               │ - Real-time stats   │    │
│  │ Referrer Tracking       │               │ - Filters (time)    │    │
│  │ Browser Detection       │               │ - Device breakdown  │    │
│  │ Device Type Detection   │               │ - Search records    │    │
│  │ IP Address Capture      │               │ - Pagination        │    │
│  └─────────────────────────┘               │ - CSV Export        │    │
│                                            └──────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘
                                    ▲
                                    │
                    ┌───────────────┴───────────────┐
                    │ API LAYER (Next.js Routes)    │
                    └───────────────┬───────────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        │                           │                           │
        ▼                           ▼                           ▼
   ┌─────────────┐            ┌─────────────┐          ┌──────────────┐
   │ /track      │            │ /analytics  │          │ /records     │
   │ (POST)      │            │ (GET)       │          │ (GET)        │
   │             │            │             │          │              │
   │ Receives:   │            │ Params:      │          │ Params:      │
   │ - pageUrl   │            │ - timeRange │          │ - filters    │
   │ - referrer  │            │ - device    │          │ - search     │
   │             │            │             │          │ - pagination │
   │ Auto:       │            │ Returns:    │          │              │
   │ - userAgent │            │ - stats     │          │ Returns:     │
   │ - ip        │            │ - topPages  │          │ - click list │
   │             │            │ - browsers  │          │ - metadata   │
   └─────────────┘            │ - hourly    │          └──────────────┘
        │                      └─────────────┘                  │
        │                            │                          │
        │                            │            ┌─────────────┐
        │                            │            │             │
        ▼                            ▼            ▼             ▼
   ┌──────────────┐            ┌──────────────┐   ┌──────────────┐
   │ /export      │            │ Aggregation  │   │ Database     │
   │ (GET)        │            │ & Filtering  │   │ Queries      │
   │              │            │              │   │              │
   │ Returns:     │            │ - Time Range │   │ RLS Policies │
   │ CSV file     │            │ - Device     │   │ - insert OK  │
   │              │            │ - Search     │   │ - admin only │
   └──────────────┘            └──────────────┘   │ - auth check │
        ▲                                          └──────────────┘
        │ CSV Download                                    │
        │                                                 │
        └─────────────────────────────────────────────────┘
                                │
                    ┌───────────┴───────────┐
                    │  DATABASE LAYER       │
                    │  (Supabase/PostgreSQL)
                    └───────────┬───────────┘
                                │
                    ┌───────────┴───────────┐
                    │  whatsapp_clicks      │
                    │  Table Schema:        │
                    ├───────────────────────┤
                    │ - id (SERIAL PK)      │
                    │ - clicked_at (TS)     │
                    │ - page_url (TEXT)     │
                    │ - device_type (TEXT)  │
                    │ - browser_info (TEXT) │
                    │ - referrer (TEXT)     │
                    │ - ip_address (VARCHAR)
                    │ - user_agent (TEXT)   │
                    │ - created_at (TS)     │
                    │                       │
                    │ Indexes:              │
                    │ - clicked_at DESC     │
                    │ - device_type        │
                    │ - page_url           │
                    │ - ip_address         │
                    │                       │
                    │ RLS Enabled:          │
                    │ - Any can INSERT      │
                    │ - Admin can SELECT    │
                    │ - Admin can DELETE    │
                    └───────────────────────┘
                                │
                    ┌───────────┴───────────┐
                    │  Security Layer       │
                    ├───────────────────────┤
                    │ ✓ Row Level Security  │
                    │ ✓ Admin Auth Check    │
                    │ ✓ Data Privacy        │
                    │ ✓ IP Protection       │
                    └───────────────────────┘
```

## Data Flow Example

### 1. Click Tracking Flow
```
User clicks WhatsApp button
        ↓
navbar.tsx: trackWhatsAppClick()
        ↓
POST /api/whatsapp/track
        ↓
Extract: User Agent, IP, Device Type, Browser
        ↓
Call: supabase.from('whatsapp_clicks').insert({...})
        ↓
Data stored in database with RLS check
        ↓
GET /api/whatsapp/track response: "Click tracked"
```

### 2. Analytics Query Flow
```
Admin opens dashboard
        ↓
Dashboard queries: GET /api/whatsapp/analytics?timeRange=week
        ↓
API applies filters (time, device)
        ↓
SELECT * FROM whatsapp_clicks WHERE clicked_at > startDate
        ↓
Aggregate data:
  - Count totals
  - Group by device_type
  - Group by page_url (top 10)
  - Group by browser_info (top 5)
  - Group by hour
        ↓
Return JSON with statistics
        ↓
Dashboard renders charts and cards
```

### 3. Export Flow
```
Admin clicks "Export CSV"
        ↓
GET /api/whatsapp/export?timeRange=week
        ↓
Apply filters (time, device)
        ↓
SELECT * FROM whatsapp_clicks...
        ↓
Format as CSV:
  Headers: ID, Date, Page, Device, Browser, Referrer, IP
  Rows: [record1], [record2], ...
        ↓
Return Response with:
  - Content-Type: text/csv
  - Content-Disposition: attachment
        ↓
Browser downloads file
```

## Component Hierarchy

```
Admin Panel
├── adminNavbar
│   ├── Dashboard Link
│   ├── Orders Link
│   ├── Payments Link
│   ├── WhatsApp Analytics Link ← NEW
│   └── Settings Link
│
└── whatsappAnalytics/
    └── page.tsx (Analytics Dashboard)
        ├── Header
        │   ├── Title
        │   └── Export Button
        ├── Filters
        │   ├── Time Range Select
        │   ├── Device Type Select
        │   └── Search Input
        ├── Statistics
        │   ├── Total Clicks Card
        │   ├── Mobile Clicks Card
        │   └── Desktop Clicks Card
        ├── Charts
        │   ├── Top Pages Chart
        │   └── Top Browsers Chart
        └── Records Table
            ├── Table Header
            ├── Table Rows (paginated)
            └── Pagination Controls
```

## Database Schema Relationships

```
┌──────────────────────┐
│ whatsapp_clicks      │
├──────────────────────┤
│ PK: id               │ ←──── Primary Key
│ ForeignKey: (none)   │       (No foreign keys for simplicity)
├──────────────────────┤
│ Metadata:            │
│ - clicked_at         │ ←──── Timeline tracking
│ - created_at         │       (for auditing)
├──────────────────────┤
│ User/Session Info:   │
│ - ip_address         │ ←──── Client identification
│ - user_agent         │       (full browser string)
│ - device_type        │ ←──── Device classification
│ - browser_info       │ ←──── Browser parsing
├──────────────────────┤
│ Page Tracking:       │
│ - page_url           │ ←──── Which page was clicked from
│ - referrer           │ ←──── Traffic source tracking
└──────────────────────┘
        │
        ├─ Indexed for fast queries ✓
        │  (clicked_at, device_type, page_url, ip_address)
        │
        ├─ RLS Enabled ✓
        │  (Anonymous can write, Admins can read)
        │
        └─ Data Privacy ✓
           (No PII, only session tracking)
```

## API Request/Response Cycle

```
Browser Request
    ↓
┌─── Next.js Server ───┐
│  1. Parse request    │
│  2. Validate params  │
│  3. Apply filters    │
│  4. Query database   │
│  5. Process response │
│  6. Format JSON/CSV  │
│  7. Send response    │
└──────────────────────┘
    ↓
Browser Response
    ↓
Update UI / Trigger Download
```

## Security Architecture

```
┌─────────────────────────────────────┐
│      Supabase RLS (Row Security)    │
├─────────────────────────────────────┤
│                                     │
│  Authentication Layer               │
│  ├─ Any: Can INSERT clicks         │
│  │  (For public tracking)           │
│  │                                  │
│  └─ Authenticated: Can SELECT/DEL  │
│     (Admin only via login)          │
│                                     │
│  Policy Enforcement                 │
│  ├─ Database level (not app level) │
│  ├─ Automatic on every query       │
│  └─ Can't be bypassed              │
│                                     │
└─────────────────────────────────────┘
```

## Performance Optimization

```
┌──────────────────────┐
│  Frontend            │
├──────────────────────┤
│ Pagination (20/page) │ ← Reduce data transfer
│ Client-side filtering│ ← Quick UI updates
│ Lazy loading charts  │ ← Faster page load
└──────────────────────┘
        │
        ▼
┌──────────────────────┐
│  API Layer           │
├──────────────────────┤
│ Time-based filtering │ ← Reduce rows processed
│ Device filtering     │ ← Use indexes
│ Aggregation queries  │ ← GROUP BY instead of loop
│ Future: caching      │ ← Redis layer
└──────────────────────┘
        │
        ▼
┌──────────────────────┐
│  Database            │
├──────────────────────┤
│ Multiple indexes     │ ← Fast lookups
│ RLS at DB level      │ ← Security
│ Connection pooling   │ ← Efficient connections
│ Future: archiving    │ ← Partition old data
└──────────────────────┘
```

## Deployment Architecture

```
Production Environment
├─ Next.js App (your code)
│  ├─ Frontend (navbar tracking)
│  ├─ API Routes (tracking + analytics)
│  └─ Static Files (CSS, etc)
│
├─ Supabase (Database)
│  ├─ PostgreSQL Database
│  ├─ Authentication
│  └─ Row Level Security
│
└─ CDN (Optional)
   └─ Static asset caching
```

---

This architecture ensures:
- ✅ **Scalability**: Database queries optimized with indexes
- ✅ **Security**: RLS prevents unauthorized access
- ✅ **Performance**: Pagination and filtering for efficiency
- ✅ **Reliability**: Data persisted in PostgreSQL
- ✅ **Flexibility**: Easy to extend with new metrics
