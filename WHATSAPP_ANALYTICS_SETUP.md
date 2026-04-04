# WhatsApp Click Analytics Dashboard - Setup Guide

## Overview
A comprehensive real-time analytics system that tracks and analyzes all WhatsApp button clicks from your REHAS website. This guide walks you through the setup and usage.

## 📋 Components Created

### 1. Database Schema
- **File**: `src/db/whatsapp_clicks_table.sql`
- **Purpose**: Defines the `whatsapp_clicks` table structure
- **Key Fields**:
  - `id`: Unique identifier
  - `clicked_at`: Timestamp of click
  - `page_url`: Page where click occurred
  - `device_type`: mobile/desktop
  - `browser_info`: Browser name
  - `referrer`: Source page or "direct"
  - `ip_address`: Client IP
  - `user_agent`: Full user agent string

### 2. Tracking Utilities
- **File**: `src/lib/whatsappTracking.ts`
- **Functions**:
  - `trackWhatsAppClick()`: Log click to database
  - `detectDeviceType()`: Identify mobile vs desktop
  - `extractBrowserInfo()`: Parse browser from user agent
  - `getClientIP()`: Extract IP from request headers

### 3. API Endpoints

#### Track Endpoint
- **Route**: `POST /api/whatsapp/track`
- **Purpose**: Records a WhatsApp click
- **Payload**:
  ```json
  {
    "pageUrl": "/courses",
    "referrer": "https://google.com"
  }
  ```

#### Analytics Endpoint
- **Route**: `GET /api/whatsapp/analytics`
- **Query Params**: 
  - `timeRange`: today, week, month, all
  - `deviceType`: all, mobile, desktop
- **Returns**: Statistics, top pages, top browsers, hourly distribution

#### Records Endpoint
- **Route**: `GET /api/whatsapp/records`
- **Query Params**:
  - `timeRange`: today, week, month, all
  - `deviceType`: all, mobile, desktop
  - `search`: Filter by page/browser/referrer
  - `page`: Pagination (0-indexed)
  - `limit`: Records per page (default: 20)
- **Returns**: Paginated click records

#### Export Endpoint
- **Route**: `GET /api/whatsapp/export`
- **Query Params**:
  - `timeRange`: today, week, month, all
  - `deviceType`: all, mobile, desktop
- **Returns**: CSV file with all matching records

### 4. Dashboard Component
- **File**: `src/app/admin/whatsappAnalytics/page.tsx`
- **Features**:
  - Real-time statistics cards (Total, Mobile, Desktop)
  - Time period filtering (Today, 7 days, 30 days, All time)
  - Device type filtering
  - Search functionality
  - Top pages chart
  - Top browsers chart
  - Detailed click records table
  - Pagination
  - CSV export

- **File**: `src/app/admin/whatsappAnalytics/analytics.module.css`
- **Provides**: Complete styling for dashboard

### 5. Navbar Integration
- **File**: `src/components/navbar/navbar.tsx`
- **Changes**: 
  - Added `trackWhatsAppClick()` function
  - WhatsApp button now calls tracking API on click
  - Sends page URL and referrer information

## 🚀 Setup Instructions

### Step 1: Create Database Table
Run the SQL schema in your Supabase project:

1. Go to Supabase Dashboard
2. Navigate to SQL Editor
3. Create a new query
4. Copy and run the contents of `src/db/whatsapp_clicks_table.sql`

This creates:
- `whatsapp_clicks` table
- Performance indexes
- Row Level Security policies

### Step 2: Test Tracking
After setup, the tracking will automatically work:
- Visit your website
- Click the WhatsApp button
- Check Supabase: WhatsApp_clicks table should have a new record

### Step 3: Access Dashboard
1. Navigate to: `https://yourdomain.com/admin/whatsappAnalytics`
2. (Ensure you're logged in with admin credentials)
3. Dashboard will load with real-time analytics

## 📊 Dashboard Features

### Filters
- **Time Period**: Select data from different time ranges
- **Device Type**: View mobile, desktop, or all devices
- **Search**: Filter records by page URL, browser, or referrer

### Statistics Cards
- **Total Clicks**: Cumulative count of all interactions
- **Mobile Clicks**: Count and percentage of mobile clicks
- **Desktop Clicks**: Count and percentage of desktop clicks

### Charts
- **Top Pages**: Shows which pages drive most WhatsApp engagement
- **Top Browsers**: Identifies browsers with highest click rates

### Detailed Records
- **Chronological Table**: Every click with full details
- **Pagination**: Navigate through records (20 per page)
- **Sorting**: Newest clicks first

### Export Feature
- **CSV Download**: Export filtered data for analysis
- **File Format**: Includes all relevant metadata
- **Name Format**: `whatsapp-analytics-YYYY-MM-DD.csv`

## 🔒 Security Features

### Row Level Security (RLS)
- Anonymous users can insert clicks (for tracking)
- Only authenticated admins can read/delete data
- Policies enforced at database level

### Data Protection
- IP addresses obfuscated in queries
- User agents stored but not personally identifiable
- No sensitive user information collected

## 📈 Use Cases

### 1. Identify Top Engagement Pages
See which product/service pages drive the most WhatsApp inquiries

### 2. Device Analysis
Track mobile vs desktop engagement to optimize mobile UX

### 3. Browser Insights
Understand which browsers need better support

### 4. Peak Time Analysis
See when users are most likely to click WhatsApp

### 5. Traffic Source Tracking
Understand which referrers lead to WhatsApp clicks

### 6. ROI Analysis
Calculate WhatsApp engagement metrics

## 🎨 Styling

### Color Scheme
- Primary: `#c9a961` (Gold)
- Secondary: `#8b6f47` (Brown)
- Background: `#f5f1e8` (Cream)
- Text: `#333` (Dark)

### Responsive Design
- Mobile-first approach
- Desktop optimized views
- Tablet-friendly layout

## 🔧 Customization

### Change Export Format
Edit `src/app/api/whatsapp/export/route.ts`:
- Modify `convertToCSV()` function
- Change headers or data format

### Adjust Default Time Range
Edit `src/app/admin/whatsappAnalytics/page.tsx`:
- Change `useState('week')` to preferred default

### Modify Statistics Cards
Edit dashboard component to show different metrics

### Add Custom Charts
Use the `hourlyDistribution` data in analytics response to add time-series charts

## 📝 API Response Examples

### Analytics Response
```json
{
  "totalClicks": 150,
  "mobileClicks": 95,
  "desktopClicks": 55,
  "mobilePercentage": 63.33,
  "desktopPercentage": 36.67,
  "topPages": [
    { "page": "/courses", "count": 45 },
    { "page": "/services", "count": 38 }
  ],
  "topBrowsers": [
    { "browser": "Chrome", "count": 100 },
    { "browser": "Safari", "count": 30 }
  ],
  "hourlyDistribution": [
    { "hour": 0, "count": 2 },
    { "hour": 1, "count": 1 },
    ...
  ]
}
```

### Records Response
```json
{
  "data": [
    {
      "id": 1,
      "clicked_at": "2024-01-15T10:30:45Z",
      "page_url": "/courses",
      "device_type": "mobile",
      "browser_info": "Chrome",
      "referrer": "direct",
      "ip_address": "192.168.1.1"
    }
  ],
  "total": 150,
  "page": 0,
  "limit": 20,
  "totalPages": 8
}
```

## 🐛 Troubleshooting

### No Data Appearing
1. Verify WhatsApp button was clicked
2. Check browser console for errors
3. Verify `/api/whatsapp/track` is callable
4. Check Supabase table exists

### Export Not Working
1. Verify user is authenticated
2. Check CSV endpoint permissions
3. Verify download isn't blocked

### Dashboard Blank
1. Clear browser cache
2. Check console for API errors
3. Verify admin authentication

## 📡 Monitoring

### Track API Health
- Monitor successful tracking rate
- Check for failed POST requests
- Set up alerts for tracking errors

### Analytics Performance
- Track dashboard load times
- Monitor database query performance
- Optimize indexes if needed

## 🔄 Maintenance

### Regular Cleanup
Consider archiving old data (>6 months):
```sql
DELETE FROM whatsapp_clicks 
WHERE clicked_at < NOW() - INTERVAL '6 months'
```

### Backup Strategy
- Export analytics monthly
- Archive CSV files
- Set up Supabase backups

### Performance Tuning
- Review indexes periodically
- Analyze query performance
- Consider partitioning if data grows large

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review API response formats
3. Verify database schema matches exactly
4. Check RLS policies are enabled

## 🎓 Learning Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [CSV Export Best Practices](https://tools.ietf.org/html/rfc4180)
