# Enquiry Dashboard Design Guide

## 📊 Overview

Following the established **Contact Dashboard** pattern, the Enquiry Dashboard provides admins with a complete interface to manage service enquiries collected from both the popup and full-page form.

---

## 🎯 Architecture Overview

### Component Structure
```
EnquiryDashboard (Main Component)
├── Authentication Check (Session validation)
├── Data Fetching (Supabase integration)
├── State Management
│   ├── enquiries: Enquiry[]
│   ├── filteredEnquiries: Enquiry[]
│   ├── loading: boolean
│   ├── searchTerm: string
│   ├── statusFilter: string
│   ├── sourceFilter: string
│   └── selectedEnquiry: Enquiry | null
│
├── Header Section
│   ├── Title: "Enquiry Management"
│   └── Subtitle: "Track and manage service enquiries"
│
├── Stats Grid (5 cards)
│   ├── Total Enquiries
│   ├── New Enquiries
│   ├── Contacted
│   ├── Completed
│   └── Popup vs Page Source Split
│
├── Controls Section
│   ├── Search Input (name, phone, service)
│   ├── Status Filter Dropdown
│   └── Source Filter Dropdown
│
├── Enquiries Table
│   ├── Responsive table layout
│   ├── Columns: Name, Phone, Service, Status, Source, Date, Actions
│   └── Action Buttons: Call, WhatsApp, View
│
└── Detail Modal
    ├── Enquiry information display
    ├── Service type (read-only)
    ├── Submission source badge
    ├── Status change dropdown
    ├── Notes section
    └── Close button
```

---

## 📋 Data Structure

### Enquiry Interface
```typescript
interface Enquiry {
  id: number;
  name: string;
  phone: string;
  service_type: string;
  status: 'new' | 'contacted' | 'completed' | 'spam';
  submitted_from: 'popup' | 'page';
  created_at: string;
  updated_at: string;
}
```

### Stats Structure
```typescript
{
  total: number;
  new: number;
  contacted: number;
  completed: number;
  popup: number;
  page: number;
}
```

---

## 🎨 Design Elements

### 1. Header Section
**Similar to Contact Dashboard but enquiry-specific**

```tsx
<div className={styles.header}>
  <h1>Enquiry Management</h1>
  <p>Track and manage service enquiries from your customers</p>
</div>
```

**Styling:**
- Centered text
- Gradient heading (Primary → Secondary)
- Subtitle with text-light color
- 3rem bottom margin
- SlideInUp animation

### 2. Stats Grid (5 Cards)

#### Card 1: Total Enquiries
- Icon: `InboxOutlined` (blue)
- Stat: Total count
- Color: Blue (#3b82f6)

#### Card 2: New Enquiries
- Icon: `NewReleases` (purple)
- Stat: Count of new
- Color: Purple (Primary)

#### Card 3: Contacted
- Icon: `PhoneInTalk` (cyan)
- Stat: Count of contacted
- Color: Cyan (#06b6d4)

#### Card 4: Completed
- Icon: `CheckCircleOutline` (green)
- Stat: Count of completed
- Color: Green (#10b981)

#### Card 5: Source Breakdown
- Icon: `SplitscreenOutlined` (orange)
- Stat: "Popup: X | Page: Y"
- Color: Orange (#f59e0b)

**Styling Pattern:**
```css
.statCard {
  display: flex;
  gap: 1.5rem;
  padding: 2rem;
  background: var(--light-bg);
  border: 1px solid var(--border);
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.statCard:hover {
  border-color: var(--primary);
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(86, 0, 103, 0.15);
}

.statIcon {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(86, 0, 103, 0.1);
  border-radius: 12px;
  flex-shrink: 0;
}

.statNumber {
  font-size: 2rem;
  font-weight: 800;
  color: var(--primary);
}
```

### 3. Controls Section

**Layout:** Flex row, responsive wrap

```tsx
<div className={styles.controls}>
  <input 
    type="text" 
    placeholder="Search by name, phone, or service..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  
  <select 
    value={statusFilter} 
    onChange={(e) => setStatusFilter(e.target.value)}
  >
    <option value="all">All Status</option>
    <option value="new">New</option>
    <option value="contacted">Contacted</option>
    <option value="completed">Completed</option>
    <option value="spam">Spam</option>
  </select>
  
  <select 
    value={sourceFilter} 
    onChange={(e) => setSourceFilter(e.target.value)}
  >
    <option value="all">All Sources</option>
    <option value="popup">Popup Form</option>
    <option value="page">Full Page</option>
  </select>
</div>
```

**Styling:**
- Gap: 1rem
- Flex-wrap on tablet
- Input width: flexible
- Select width: 180px
- Responsive: Stack on mobile

### 4. Enquiries Table

**Columns (Responsive):**
| Column | Desktop | Tablet | Mobile | Sortable |
|--------|---------|--------|--------|----------|
| Name | ✓ | ✓ | ✓ | No |
| Phone | ✓ | ✓ | ✗ | No |
| Service Type | ✓ | ✗ | ✗ | No |
| Status | ✓ | ✓ | ✓ | No |
| Source | ✓ | ✗ | ✗ | No |
| Date | ✓ | ✓ | ✓ | No |
| Actions | ✓ | ✓ | ✓ | No |

**Styling Pattern:**
```css
.table {
  width: 100%;
  border-collapse: collapse;
  background: var(--light-bg);
  border-radius: 12px;
  overflow: hidden;
}

.tableHeader {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.tableRow {
  border-bottom: 1px solid var(--border);
  transition: background 0.3s ease;
}

.tableRow:hover {
  background: rgba(86, 0, 103, 0.05);
}

.tableCell {
  padding: 1rem;
  text-align: left;
}

.statusBadge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.statusNew { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
.statusContacted { background: rgba(34, 197, 94, 0.1); color: #22c55e; }
.statusCompleted { background: rgba(34, 197, 94, 0.1); color: #10b981; }
.statusSpam { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

.sourcePopup { background: rgba(168, 85, 247, 0.1); color: #a855f7; }
.sourcePage { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
```

**Action Buttons:**
```tsx
<div className={styles.actions}>
  <button 
    onClick={() => window.open(`tel:${enquiry.phone}`)}
    title="Call"
    className={styles.callBtn}
  >
    <Phone />
  </button>
  <button 
    onClick={() => window.open(`https://wa.me/${enquiry.phone.replace(/\D/g, '')}`)}
    title="WhatsApp"
    className={styles.whatsappBtn}
  >
    <WhatsApp />
  </button>
  <button 
    onClick={() => { setSelectedEnquiry(enquiry); setShowModal(true); }}
    title="View Details"
    className={styles.viewBtn}
  >
    <Visibility />
  </button>
</div>
```

### 5. Detail Modal

**Content:**
```tsx
{selectedEnquiry && (
  <div className={styles.modalBackdrop}>
    <div className={styles.modal}>
      <div className={styles.modalHeader}>
        <h2>Enquiry Details</h2>
        <button onClick={() => setShowModal(false)}>&times;</button>
      </div>
      
      <div className={styles.modalBody}>
        <div className={styles.infoGroup}>
          <label>Name:</label>
          <p>{selectedEnquiry.name}</p>
        </div>
        
        <div className={styles.infoGroup}>
          <label>Phone:</label>
          <p>{selectedEnquiry.phone}</p>
        </div>
        
        <div className={styles.infoGroup}>
          <label>Service Type:</label>
          <p className={styles.serviceBadge}>{selectedEnquiry.service_type}</p>
        </div>
        
        <div className={styles.infoGroup}>
          <label>Submission Source:</label>
          <p className={getSourceBadgeClass(selectedEnquiry.submitted_from)}>
            {selectedEnquiry.submitted_from === 'popup' ? 'Auto-Popup' : 'Full Page'}
          </p>
        </div>
        
        <div className={styles.infoGroup}>
          <label>Status:</label>
          <select 
            value={selectedEnquiry.status}
            onChange={(e) => handleStatusChange(selectedEnquiry.id, e.target.value)}
          >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="completed">Completed</option>
            <option value="spam">Spam</option>
          </select>
        </div>
        
        <div className={styles.infoGroup}>
          <label>Submitted On:</label>
          <p>{new Date(selectedEnquiry.created_at).toLocaleString()}</p>
        </div>
      </div>
    </div>
  </div>
)}
```

**Modal Styling:**
```css
.modalBackdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.modal {
  background: var(--light-bg);
  border-radius: 16px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideUp 0.3s ease;
  box-shadow: 0 20px 64px rgba(0, 0, 0, 0.2);
}

.modalHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  border-bottom: 1px solid var(--border);
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
}

.modalBody {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.infoGroup {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.infoGroup label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-light);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.infoGroup p {
  font-size: 1rem;
  color: var(--foreground);
  margin: 0;
  padding: 0.75rem;
  background: var(--background);
  border-radius: 8px;
  border: 1px solid var(--border);
}

.serviceBadge {
  display: inline-block;
  background: rgba(86, 0, 103, 0.1) !important;
  color: var(--primary) !important;
  border: 1px solid var(--primary) !important;
  padding: 0.75rem 1rem !important;
  border-radius: 20px !important;
  font-weight: 600;
  width: fit-content;
}
```

---

## 🔄 Functional Requirements

### Data Fetching
```typescript
const fetchEnquiries = async () => {
  try {
    setLoading(true);
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    const enquiriesList = data || [];
    setEnquiries(enquiriesList);
    setFilteredEnquiries(enquiriesList);
    
    // Calculate stats
    setStats({
      total: enquiriesList.length,
      new: enquiriesList.filter((e) => e.status === 'new').length,
      contacted: enquiriesList.filter((e) => e.status === 'contacted').length,
      completed: enquiriesList.filter((e) => e.status === 'completed').length,
      popup: enquiriesList.filter((e) => e.submitted_from === 'popup').length,
      page: enquiriesList.filter((e) => e.submitted_from === 'page').length,
    });
  } catch (error) {
    console.error('Error fetching enquiries:', error);
  } finally {
    setLoading(false);
  }
};
```

### Search & Filter Logic
```typescript
useEffect(() => {
  let filtered = enquiries;
  
  // Search across multiple fields
  if (searchTerm) {
    filtered = filtered.filter(
      (e) =>
        e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.phone.includes(searchTerm) ||
        e.service_type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  // Status filter
  if (statusFilter !== 'all') {
    filtered = filtered.filter((e) => e.status === statusFilter);
  }
  
  // Source filter
  if (sourceFilter !== 'all') {
    filtered = filtered.filter((e) => e.submitted_from === sourceFilter);
  }
  
  setFilteredEnquiries(filtered);
}, [searchTerm, statusFilter, sourceFilter, enquiries]);
```

### Status Update
```typescript
const handleStatusChange = async (
  enquiryId: number,
  newStatus: string
) => {
  try {
    const { error } = await supabase
      .from('enquiries')
      .update({ status: newStatus })
      .eq('id', enquiryId);
    
    if (error) throw error;
    
    // Update local state
    setEnquiries(
      enquiries.map((e) =>
        e.id === enquiryId ? { ...e, status: newStatus } : e
      )
    );
    
    if (selectedEnquiry?.id === enquiryId) {
      setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
    }
  } catch (error) {
    console.error('Error updating status:', error);
  }
};
```

### Status Badge Color Mapping
```typescript
const getStatusColor = (status: string) => {
  switch (status) {
    case 'new':
      return styles.statusNew;
    case 'contacted':
      return styles.statusContacted;
    case 'completed':
      return styles.statusCompleted;
    case 'spam':
      return styles.statusSpam;
    default:
      return '';
  }
};

const getSourceColor = (source: string) => {
  return source === 'popup' ? styles.sourcePopup : styles.sourcePage;
};
```

---

## 📱 Responsive Design

### Desktop (1200px+)
- Full table with all columns visible
- Hover effects on rows
- Inline action buttons
- Modal centered in viewport
- 3rem padding on container

### Tablet (768px - 1024px)
- Hide "Service Type" column
- Hide "Source" column
- Keep Name, Phone, Status, Date, Actions
- Stack controls vertically
- Adjusted spacing: 2rem
- Modal width: 90%

### Mobile (480px - 768px)
- Hide "Phone" column (show in modal only)
- Single column layout for controls
- Table with scroll if needed
- Full-width modal
- 1.5rem padding

### Small Mobile (<480px)
- Minimal padding (1rem)
- Stacked controls
- Horizontal scroll on table
- Bottom-sheet style modal
- Larger touch targets (44px+)

---

## 🎬 Animations

### Page Load
```css
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.header {
  animation: slideInUp 0.6s ease-out;
}

.statCard {
  animation: slideInUp 0.6s ease-out;
}
```

### Transitions
```css
.statCard {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.tableRow {
  transition: background 0.3s ease;
}

.modalBackdrop {
  animation: fadeIn 0.3s ease;
}

.modal {
  animation: slideUp 0.3s ease;
}
```

---

## 🔐 Security & Validation

### Session Check
```typescript
useEffect(() => {
  const adminSession = localStorage.getItem('adminSession');
  if (!adminSession) {
    router.push('/admin/login');
    return;
  }
  fetchEnquiries();
}, [router]);
```

### Input Validation
- Search term: alphanumeric + spaces
- Filters: enum-constrained values
- Phone numbers: display as-is (validation in form)

### Database Constraints
- Status: `CHECK (status IN ('new', 'contacted', 'completed', 'spam'))`
- Source: `CHECK (submitted_from IN ('popup', 'page'))`
- Required fields enforced at DB level

---

## 📂 File Structure

```
src/admin/enquiryDashboard/
├── enquiryDashboard.tsx           (300-400 lines)
│   ├── Imports
│   ├── Interface definitions
│   ├── Component logic
│   ├── Event handlers
│   └── JSX structure
└── enquiryDashboard.module.css    (700-850 lines)
    ├── Dashboard container
    ├── Header styles
    ├── Stats grid & cards
    ├── Controls styling
    ├── Table styles
    ├── Modal styles
    ├── Badge styles
    ├── Animations
    └── Responsive breakpoints
```

---

## 🧪 Testing Checklist

- [ ] Dashboard loads after login
- [ ] Enquiries fetch from Supabase
- [ ] Stats calculate correctly
- [ ] Search works across all fields
- [ ] Status filter narrows results
- [ ] Source filter narrows results
- [ ] Status update persists to DB
- [ ] Modal opens/closes correctly
- [ ] Modal displays correct data
- [ ] Call button opens dialer
- [ ] WhatsApp button opens chat
- [ ] Responsive at 480px, 768px, 1024px, 1200px
- [ ] Mobile touch targets are 44px+
- [ ] No console errors
- [ ] Session check redirects if not logged in
- [ ] Empty state shows when no enquiries

---

## 🔗 Integration Points

### AdminNavbar Updates
Add link to enquiries dashboard:
```tsx
<Link href="/admin/enquiries">Enquiries</Link>
```

### Route Creation
Create: `src/app/admin/enquiries/page.tsx`
```tsx
import EnquiryDashboard from '@/admin/enquiryDashboard/enquiryDashboard';

export const metadata = {
  title: 'Enquiry Dashboard | REHAS Admin',
  description: 'Manage and track service enquiries',
};

export default function EnquiriesPage() {
  return <EnquiryDashboard />;
}
```

### Admin Layout
Reuses existing `/src/app/admin/layout.tsx` (no navbar/footer)

---

## 📊 Analytics & Metrics

### Key Metrics to Track
1. **Total Enquiries:** Overall lead count
2. **New Enquiries:** Uncontacted leads
3. **Conversion Rate:** new → contacted → completed
4. **Source Effectiveness:** Popup vs Page conversion
5. **Service Popularity:** Top services by enquiry count
6. **Response Time:** Avg time from new to contacted
7. **Completion Rate:** Completed vs Total

### Future Enhancements
- Date range filtering
- Export to CSV/Excel
- Bulk status updates
- Email notifications on new enquiry
- Lead assignment to specific admins
- Follow-up reminders
- Analytics dashboard with charts

---

## 💾 Database Queries Reference

### Fetch all enquiries
```sql
SELECT * FROM enquiries ORDER BY created_at DESC;
```

### Fetch by status
```sql
SELECT * FROM enquiries WHERE status = 'new' ORDER BY created_at DESC;
```

### Fetch by source
```sql
SELECT * FROM enquiries WHERE submitted_from = 'popup' ORDER BY created_at DESC;
```

### Count by service
```sql
SELECT service_type, COUNT(*) 
FROM enquiries 
GROUP BY service_type 
ORDER BY COUNT(*) DESC;
```

### Conversion funnel
```sql
SELECT 
  status,
  COUNT(*) as count,
  ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER (), 2) as percentage
FROM enquiries
GROUP BY status;
```

---

## ✅ Implementation Ready

This design document provides a complete blueprint for creating the Enquiry Dashboard following the established Contact Dashboard pattern while being optimized for enquiry-specific data and workflows.

