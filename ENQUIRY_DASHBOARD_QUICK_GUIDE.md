# Enquiry Dashboard Quick Reference

## 🎯 What's New

**New Route:** `/admin/enquiries`  
**Component:** `EnquiryDashboard`  
**Status:** ✅ Live & Operational  

---

## 🚀 Quick Start

### Access Dashboard
```
1. Login: /admin/login
2. Enter credentials
3. Click "Enquiries" in navbar
4. Or visit: /admin/enquiries directly
```

### What You'll See
- **Stats:** 5 key metrics (Total, New, Contacted, Completed, Source)
- **Search:** Find enquiries by name, phone, or service
- **Table:** All enquiries with actions
- **Filters:** By status and source (popup/page)
- **Modal:** Click eye icon to see full details

---

## 📊 Stats Explained

| Stat | Meaning | Use Case |
|------|---------|----------|
| Total Enquiries | All enquiries count | Know overall volume |
| New | Uncontacted leads | Identify prospects |
| Contacted | Leads you've reached | Track engagement |
| Completed | Closed enquiries | Measure conversions |
| Source Split | Popup vs Page | Optimize form placement |

---

## 🔍 Search & Filter

### Search Box
**Searches across:**
- Enquirer name (e.g., "Priya")
- Phone number (e.g., "9876")
- Service type (e.g., "Yoga")

**Example:** Type "9876" to find all enquiries from that phone number

### Status Filter
- **All** - Show all enquiries
- **New** - Uncontacted enquiries
- **Contacted** - You've reached them
- **Completed** - Enquiry resolved
- **Spam** - Invalid leads

### Source Filter
- **All Sources** - All enquiries
- **Popup Form** - Auto-popup (2-second delay)
- **Full Page** - /enquiry page form

---

## 📋 Table Columns

| Desktop | Tablet | Mobile | Info |
|---------|--------|--------|------|
| Name | Name | Name | Enquirer's name |
| Phone | - | - | Phone + Call/WhatsApp buttons |
| Service | - | - | Service type (badge) |
| Status | Status | Status | new/contacted/completed/spam |
| Source | - | - | popup/page badge |
| Date | Date | Date | Submission date |
| Actions | Actions | Actions | Eye icon to view |

---

## 🔧 Managing Enquiries

### Update Status
1. Click eye icon (View Details)
2. Dropdown for Status
3. Select new status
4. Saved automatically ✅

### Call Customer
- Click phone icon in table, OR
- Click "Call Now" button in modal
- Opens your phone dialer

### Send WhatsApp
- Click WhatsApp icon in table, OR
- Click "Send WhatsApp" in modal
- Opens WhatsApp chat

### View Full Details
- Click eye icon
- See all information in modal
- Can change status here
- Can call or WhatsApp

---

## 📱 Mobile vs Desktop

### Desktop (Wide Screen)
- See all 7 columns
- Hover effects on rows
- Quick action buttons

### Tablet
- Hide phone and service columns
- Still see name, status, date
- Actions available

### Mobile (Narrow)
- Minimal columns
- Search & filters stack vertically
- Full-width modal at bottom
- Large touch targets

---

## 💡 Tips & Tricks

### Finding Specific Enquiries
```
Search for phone number → Find all enquiries from that customer
Search for service → Find all enquiries for that service
Filter by "New" → See uncontacted leads
```

### Tracking Progress
```
Monitor "New" stat → How many leads to contact
Monitor "Contacted" stat → Progress on engagement
Monitor "Completed" stat → Conversion count
```

### Analyzing Performance
```
View "Source Split" stat → Which form works better?
Filter by "Popup Form" → Measure popup form effectiveness
Filter by "Full Page" → Measure dedicated page effectiveness
```

### Bulk Management
```
Use Status Filter → See all enquiries in one status
Change status → Mark contacted/completed in batches
Use Search → Find specific customer quickly
```

---

## 🐛 Troubleshooting

### No enquiries showing?
- Check if you're logged in (page redirects if not)
- Verify filters are set to "All"
- Check search box is empty
- Try refreshing page (Ctrl+R)

### Can't change status?
- Verify you're in modal (eye icon)
- Select new status from dropdown
- Wait 1 second for save
- If error, try again

### Call/WhatsApp buttons not working?
- Call: Requires phone app (mobile) or setup (desktop)
- WhatsApp: Need WhatsApp account
- Both work better on mobile

### Stats showing zero?
- Wait for page to load (shows compass spinner)
- Refresh if stuck loading
- Verify table below has data

---

## 🎨 Understanding Badges

### Status Badges
- **New** (Blue) - Not yet contacted
- **Contacted** (Purple) - Reach out sent
- **Completed** (Green) - Enquiry resolved
- **Spam** (Red) - Invalid lead

### Source Badges
- **Popup** (Purple) - Auto-trigger form
- **Page** (Blue) - Full-page form (/enquiry)

### Service Badges
- Shows service type (e.g., Yoga, Counseling)
- Click in modal for more details

---

## 📈 Using Data for Decisions

### Measure Form Effectiveness
```
Compare popup vs page source counts
Higher count = More effective channel
Use to decide form placement
```

### Track Response Rate
```
New / Total = % of uncontacted leads
Contacted / Total = % of engaged leads
Completed / Total = % conversion rate
```

### Identify Popular Services
```
Filter by service type
See which services get most enquiries
Focus marketing on popular services
```

### Monitor Workload
```
Watch "New" stat daily
Track "Contacted" progress
Aim to reduce "New" count
```

---

## 🔒 Security Notes

- Dashboard requires admin login
- Session saved in browser (localStorage)
- Logout clears session automatically
- Only admins can view enquiries
- All changes logged with timestamps

---

## 🔗 Related Pages

| Page | URL | Purpose |
|------|-----|---------|
| Enquiry Dashboard | `/admin/enquiries` | Manage enquiries (YOU ARE HERE) |
| Contact Dashboard | `/admin/dashboard` | Manage contact form submissions |
| Admin Login | `/admin/login` | Login to admin system |
| Public Enquiry Form | `/enquiry` | Full-page form customers use |
| Home | `/` | Website homepage |

---

## 📞 Quick Actions

### Create Enquiry (For Testing)
1. Go to `/enquiry`
2. Fill out form (popup or page)
3. Submit
4. Check dashboard (refresh page)

### Change Multiple Status
1. Use Status Filter to show target status
2. Click each eye icon
3. Change status in modal
4. Repeat for all

### Export Data (Future)
- Currently: Manual copy-paste from table
- Planned: Download as CSV button
- Planned: Date range export

---

## 🚀 What's Next?

### Coming Soon
- [ ] Pagination (handle 1000+ enquiries)
- [ ] Email notifications (new enquiry alerts)
- [ ] Bulk status updates (change multiple at once)
- [ ] Export to CSV (download enquiries)
- [ ] Charts & analytics (visual trends)
- [ ] Lead assignment (assign to team members)
- [ ] Reminders (follow-up notifications)

### Feedback Welcome
- Found a bug? Note it down
- Missing feature? Let us know
- Improvement idea? Share it
- Dashboard sluggish? Report it

---

## 💾 Remember

- **Refresh doesn't lose data** - All saved in Supabase
- **Session expires?** - Just login again
- **Closed modal?** - Click eye icon again to reopen
- **Want stats?** - They auto-update when you filter
- **Changed status?** - Takes 1-2 seconds to save

---

## 🎉 You're All Set!

You now have a complete enquiry management system:
- ✅ View all enquiries
- ✅ Search & filter easily
- ✅ Update status efficiently  
- ✅ Call customers directly
- ✅ Send WhatsApp messages
- ✅ Track performance metrics
- ✅ Works on mobile too!

**Happy enquiry managing!** 🚀

---

*Last updated: December 20, 2025*  
*Version: 1.0 - Launch Ready*
