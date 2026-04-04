# WhatsApp Analytics API Reference

## Overview
Complete API documentation for the WhatsApp Click Analytics system.

---

## Endpoints

### 1. Track WhatsApp Click
**Endpoint:** `POST /api/whatsapp/track`

**Purpose:** Records a WhatsApp button click

**Request Body:**
```json
{
  "pageUrl": "/courses",
  "referrer": "https://google.com"
}
```

**Response (Success - 200):**
```json
{
  "message": "Click tracked successfully"
}
```

**Response (Error - 500):**
```json
{
  "error": "Failed to track click"
}
```

**Auto-Captured Data:**
- User Agent (browser info)
- IP Address
- Device Type (mobile/desktop)
- Browser Info (Chrome, Safari, Firefox, etc.)
- Timestamp

**Example Usage:**
```javascript
fetch('/api/whatsapp/track', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    pageUrl: window.location.pathname,
    referrer: document.referrer
  })
});
```

---

### 2. Get Analytics Summary
**Endpoint:** `GET /api/whatsapp/analytics`

**Query Parameters:**
- `timeRange` (string, optional): 'today', 'week', 'month', 'all' (default: 'all')
- `deviceType` (string, optional): 'all', 'mobile', 'desktop' (default: 'all')

**Response (200):**
```json
{
  "totalClicks": 150,
  "mobileClicks": 95,
  "desktopClicks": 55,
  "mobilePercentage": 63.33,
  "desktopPercentage": 36.67,
  "topPages": [
    {
      "page": "/courses",
      "count": 45
    },
    {
      "page": "/services",
      "count": 38
    },
    {
      "page": "/astrology",
      "count": 32
    }
  ],
  "topBrowsers": [
    {
      "browser": "Chrome",
      "count": 120
    },
    {
      "browser": "Safari",
      "count": 22
    },
    {
      "browser": "Firefox",
      "count": 8
    }
  ],
  "hourlyDistribution": [
    { "hour": 0, "count": 2 },
    { "hour": 1, "count": 1 },
    { "hour": 2, "count": 0 },
    ...
    { "hour": 23, "count": 3 }
  ]
}
```

**Example Usage:**
```javascript
// Get analytics for last 7 days, all devices
const res = await fetch('/api/whatsapp/analytics?timeRange=week&deviceType=all');
const data = await res.json();

// Get analytics for today, mobile only
const mobileRes = await fetch('/api/whatsapp/analytics?timeRange=today&deviceType=mobile');
```

---

### 3. Get Detailed Click Records
**Endpoint:** `GET /api/whatsapp/records`

**Query Parameters:**
- `timeRange` (string, optional): 'today', 'week', 'month', 'all' (default: 'all')
- `deviceType` (string, optional): 'all', 'mobile', 'desktop' (default: 'all')
- `search` (string, optional): Filter by page URL, browser, or referrer
- `page` (number, optional): Page number (0-indexed, default: 0)
- `limit` (number, optional): Records per page (default: 20)

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "clicked_at": "2024-01-15T10:30:45.123Z",
      "page_url": "/courses",
      "device_type": "mobile",
      "browser_info": "Chrome",
      "referrer": "https://google.com",
      "ip_address": "192.168.1.100",
      "user_agent": "Mozilla/5.0...",
      "created_at": "2024-01-15T10:30:45.123Z"
    },
    {
      "id": 2,
      "clicked_at": "2024-01-15T10:25:30.456Z",
      "page_url": "/services",
      "device_type": "desktop",
      "browser_info": "Safari",
      "referrer": "direct",
      "ip_address": "192.168.1.101",
      "user_agent": "Mozilla/5.0...",
      "created_at": "2024-01-15T10:25:30.456Z"
    }
  ],
  "total": 150,
  "page": 0,
  "limit": 20,
  "totalPages": 8
}
```

**Example Usage:**
```javascript
// Get first page of records
const res = await fetch('/api/whatsapp/records?page=0&limit=20');
const data = await res.json();

// Search for clicks from chrome browser
const searchRes = await fetch('/api/whatsapp/records?search=Chrome&page=0');

// Get mobile clicks from last 7 days
const mobileRes = await fetch('/api/whatsapp/records?timeRange=week&deviceType=mobile&page=0');

// Paginate to page 2
const page2Res = await fetch('/api/whatsapp/records?page=2&limit=20');
```

---

### 4. Export Analytics Data
**Endpoint:** `GET /api/whatsapp/export`

**Query Parameters:**
- `timeRange` (string, optional): 'today', 'week', 'month', 'all' (default: 'all')
- `deviceType` (string, optional): 'all', 'mobile', 'desktop' (default: 'all')

**Response Headers:**
```
Content-Disposition: attachment; filename="whatsapp-analytics-2024-01-15.csv"
Content-Type: text/csv; charset=utf-8
```

**CSV Format:**
```
ID,Date & Time,Page URL,Device Type,Browser,Referrer,IP Address
1,1/15/2024, 10:30:45 AM,/courses,mobile,Chrome,https://google.com,192.168.1.100
2,1/15/2024, 10:25:30 AM,/services,desktop,Safari,direct,192.168.1.101
3,1/15/2024, 10:20:15 AM,/astrology,mobile,Chrome,direct,192.168.1.102
```

**Example Usage:**
```javascript
// Export all data
const res = await fetch('/api/whatsapp/export?timeRange=all');
const blob = await res.blob();
const url = window.URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'whatsapp-analytics.csv';
a.click();

// Export today's mobile clicks
const res2 = await fetch('/api/whatsapp/export?timeRange=today&deviceType=mobile');
```

---

## Data Models

### WhatsApp Click Record
```typescript
interface WhatsAppClick {
  id: number;                    // Unique identifier
  clicked_at: string;            // ISO timestamp of click
  page_url: string;              // URL where click occurred
  device_type: 'mobile' | 'desktop' | 'unknown';
  browser_info: string;          // Browser name (Chrome, Safari, Firefox, etc.)
  referrer: string;              // Referrer URL or 'direct'
  ip_address: string;            // Client IP address
  user_agent: string;            // Full user agent string
  created_at: string;            // Record creation timestamp (ISO)
}
```

### Analytics Summary
```typescript
interface Analytics {
  totalClicks: number;           // Total count
  mobileClicks: number;          // Mobile count
  desktopClicks: number;         // Desktop count
  mobilePercentage: number;      // Mobile %
  desktopPercentage: number;     // Desktop %
  topPages: Array<{
    page: string;
    count: number;
  }>;
  topBrowsers: Array<{
    browser: string;
    count: number;
  }>;
  hourlyDistribution: Array<{
    hour: number;                // 0-23
    count: number;
  }>;
}
```

### Paginated Records Response
```typescript
interface PaginatedRecords {
  data: WhatsAppClick[];         // Array of click records
  total: number;                 // Total records matching filters
  page: number;                  // Current page (0-indexed)
  limit: number;                 // Records per page
  totalPages: number;            // Total pages available
}
```

---

## Time Range Behavior

### "today"
- Includes clicks from midnight to current time (today)
- Resets at 00:00 UTC

### "week"
- Includes last 7 days from now
- Example: Jan 15 includes Jan 9-15

### "month"
- Includes last 30 days from now
- Example: Jan 15 includes Dec 16 - Jan 15

### "all"
- Includes all clicks ever recorded
- No time restriction

---

## Error Handling

### 400 Bad Request
```json
{
  "error": "Invalid parameters"
}
```

### 500 Internal Server Error
```json
{
  "error": "Failed to fetch analytics"
}
```

---

## Rate Limiting
Currently no rate limiting implemented. For production, consider:
- Limiting `/track` endpoint to 1-2 requests per click
- Implementing CORS for API security
- Using API keys for export endpoint

---

## Security Notes

1. **Authentication**: Export and records endpoints should verify admin user (add authentication layer)
2. **Data Privacy**: IP addresses are stored but can be anonymized in exports
3. **CORS**: Configure CORS headers in production
4. **Input Validation**: All inputs are validated server-side

---

## Performance Optimization

### Query Optimization
- Indexes created on: `clicked_at`, `device_type`, `page_url`
- Analytics response cached (consider adding cache layer)
- Records paginated to 20 per request

### Recommendations
- Add database query caching (30-60 seconds)
- Implement API response caching
- Archive old data (>6 months) separately
- Consider data partitioning for large datasets

---

## Integration Examples

### React Component
```typescript
const [analytics, setAnalytics] = useState(null);
const [timeRange, setTimeRange] = useState('week');

useEffect(() => {
  fetch(`/api/whatsapp/analytics?timeRange=${timeRange}`)
    .then(res => res.json())
    .then(data => setAnalytics(data));
}, [timeRange]);

return <div>Total: {analytics?.totalClicks}</div>;
```

### Next.js Server Component
```typescript
async function AnalyticsPage() {
  const res = await fetch('http://localhost:3000/api/whatsapp/analytics');
  const data = await res.json();
  return <div>Total clicks: {data.totalClicks}</div>;
}
```

### Node.js Script
```javascript
const getData = async () => {
  const res = await fetch('http://localhost:3000/api/whatsapp/analytics?timeRange=week');
  const data = await res.json();
  console.log('Weekly clicks:', data.totalClicks);
};
```

---

## Troubleshooting

### "Failed to fetch analytics"
- Check database connection
- Verify RLS policies allow SELECT
- Check for syntax errors in API route

### No data in response
- Verify clicks exist in database
- Check time range filter
- Use `all` to verify data exists

### Export file is empty
- Verify records exist with current filters
- Check browser allows downloads
- Try different time range

---

## Future Enhancements

Potential features:
- [ ] API authentication (API keys)
- [ ] Webhook callbacks on click
- [ ] Scheduled email reports
- [ ] Data aggregation caching
- [ ] Geographic IP lookup
- [ ] A/B testing features
- [ ] Funnel analysis
- [ ] Predictive analytics
