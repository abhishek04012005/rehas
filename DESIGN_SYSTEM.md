# REHAS Website - Complete Design System Documentation

## 🌟 Project Overview

REHAS is a comprehensive astrology and wellness platform designed with a modern, premium aesthetic. The website integrates ancient wisdom with contemporary wellness practices, featuring a consistent design system across all pages.

## 📁 Project Structure

```
rehas-website/
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout with Navbar & Footer
│   │   ├── globals.css                   # Global design system & utilities
│   │   ├── page.tsx                      # Homepage
│   │   ├── page.module.css               # Homepage styles
│   │   ├── not-found.tsx                 # 404 error page
│   │   ├── not-found.module.css          # 404 page styles
│   │   │
│   │   ├── astrology/                    # Astrology section
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx                  # Astrology main page
│   │   │   ├── astrology.module.css
│   │   │   ├── birth-chart/
│   │   │   │   └── page.tsx              # Birth chart reading page
│   │   │   ├── horoscope/
│   │   │   │   └── page.tsx              # Horoscope page
│   │   │   ├── compatibility/
│   │   │   │   └── page.tsx              # Compatibility page
│   │   │   └── transit/
│   │   │       └── page.tsx              # Transit analysis page
│   │   │
│   │   ├── wellness/                     # Wellness section
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx                  # Wellness main page
│   │   │   ├── wellness.module.css
│   │   │   ├── meditation/
│   │   │   │   └── page.tsx              # Meditation guides
│   │   │   ├── yoga/
│   │   │   │   └── page.tsx              # Yoga practices
│   │   │   ├── nutrition/
│   │   │   │   └── page.tsx              # Nutrition guidance
│   │   │   └── mindfulness/
│   │   │       └── page.tsx              # Mindfulness practices
│   │   │
│   │   ├── about/                        # About section
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx                  # Team & story
│   │   │   └── about.module.css
│   │   │
│   │   ├── blog/                         # Blog section
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx                  # Blog listings
│   │   │   └── blog.module.css
│   │   │
│   │   ├── contact/                      # Contact section
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx                  # Contact form
│   │   │   └── contact.module.css
│   │   │
│   │   └── consultation/                 # Consultation booking
│   │       ├── layout.tsx
│   │       ├── page.tsx                  # Service booking page
│   │       └── consultation.module.css
│   │
│   └── components/
│       ├── navbar/
│       │   ├── navbar.tsx                # Navigation component
│       │   └── navbar.module.css         # Navbar styles
│       │
│       └── footer/
│           ├── footer.tsx                # Footer component
│           └── footer.module.css         # Footer styles
│
├── public/
│   └── logo.svg                          # REHAS logo
│
├── package.json
├── tsconfig.json
├── next.config.ts
└── eslint.config.mjs
```

## 🎨 Design System

### Color Palette
- **Primary**: `#560067` (Deep Purple)
- **Secondary**: `#92487a` (Muted Purple)
- **Accent**: `#d4a5d9` (Light Purple)
- **Background Light**: `#f5f0f7` (Very Light Purple)
- **Foreground**: `#1a1a1a` (Dark Gray)
- **Text Light**: `#666666` (Medium Gray)
- **Border**: `rgba(86, 0, 103, 0.1)` (Subtle Purple)

### Typography
- **H1**: 3rem, Font Weight 800
- **H2**: 2.2rem, Font Weight 700
- **H3**: 1.5rem, Font Weight 700
- **Body**: 1rem, Font Weight 400
- **Small**: 0.9rem, Font Weight 400
- **Font**: Geist family (sans-serif)

### Spacing
- **Container Max Width**: 1400px
- **Default Padding**: 2rem
- **Section Padding**: 5rem (top/bottom), 2rem (sides)
- **Gap**: 2rem (grid), 1rem (flex)

### Breakpoints
- **Desktop**: 1400px+
- **Tablet**: 768px - 1399px
- **Mobile**: 0px - 767px

### Utility Classes
- `.container`: Max-width wrapper
- `.section`: Full-width section with padding
- `.btn-primary`: Primary gradient button
- `.btn-secondary`: Secondary gradient button
- `.grid`: CSS Grid with responsive columns
- `.card`: Card component with hover effects

## 🔧 Component Architecture

### Navbar (`/components/navbar/navbar.tsx`)
- **Features**:
  - Logo with gradient badge
  - Dropdown menus for Astrology & Wellness
  - Mobile hamburger menu with smooth animations
  - Scroll detection for dynamic styling
  - HTML5 `<details>/<summary>` for accessibility
  - Emoji icons in dropdown items
  - "Book Consultation" CTA button

- **Navigation Structure**:
  - Home
  - Astrology (with 4 subservices)
  - Wellness (with 4 subservices)
  - About
  - Blog
  - Contact
  - Book Consultation (CTA)

### Footer (`/components/footer/footer.tsx`)
- **Sections**:
  - Brand section with description & social links
  - Services section with quick links
  - Company information
  - Resources
  - Copyright & additional links
- **Social Media Links**: Facebook, Instagram, Twitter, LinkedIn
- **Mobile Responsive**: 2-column grid on mobile

## 📄 Page Templates

### Homepage (`/page.tsx`)
- **Sections**:
  1. Hero with gradient background & CTA buttons
  2. Features grid (6 service cards with emojis)
  3. Why Choose Us section with statistics
  4. Call-to-action section with gradient

### Astrology Pages
- **Main Page** (`/astrology/page.tsx`):
  - Hero section
  - Service card grid (Birth Chart, Horoscope, Compatibility, Transit)
  - CTA section

- **Sub-Pages** (all follow same template):
  - `/astrology/birth-chart`: 6 analysis items with icons
  - `/astrology/horoscope`: 4 horoscope types
  - `/astrology/compatibility`: 4 compatibility analysis types
  - `/astrology/transit`: 4 transit analysis types

### Wellness Pages
- **Main Page** (`/wellness/page.tsx`):
  - Hero section
  - Service card grid (Meditation, Yoga, Nutrition, Mindfulness)
  - CTA section

- **Sub-Pages** (all follow same template):
  - `/wellness/meditation`: 4 meditation styles
  - `/wellness/yoga`: 4 yoga practices
  - `/wellness/nutrition`: 4 nutrition topics
  - `/wellness/mindfulness`: 4 mindfulness techniques

### About Page (`/about/page.tsx`)
- **Sections**:
  - Hero section
  - Company story
  - Values (3 cards with icons)
  - Team members (3 profiles with avatars)
  - CTA section

### Blog Page (`/blog/page.tsx`)
- **Features**:
  - Article card grid (6 sample articles)
  - Each card shows: emoji, category, title, excerpt, date, read more link
  - Newsletter subscription form
  - Responsive grid layout

### Contact Page (`/contact/page.tsx`)
- **Content**:
  - Contact form (name, email, subject, message)
  - Contact information (address, phone, email, hours)
  - Social media links
  - Side-by-side layout on desktop, stacked on mobile

### Consultation Page (`/consultation/page.tsx`)
- **Features**:
  - 6 service packages with pricing
  - Each package shows: price, duration, features, booking button
  - Date/time slot selector
  - Session notes textarea
  - FAQ section (4 items)

### 404 Page (`/not-found.tsx`)
- **Design**:
  - Large 404 error code with low opacity
  - Friendly message
  - 6 quick navigation links
  - Animated floating stars
  - Gradient background matching brand colors

## 🎯 Key Features

### Design Consistency
- ✅ All pages use CSS variables from `globals.css`
- ✅ Consistent gradient backgrounds (primary → secondary)
- ✅ Unified card component styling with hover effects
- ✅ Same typography hierarchy across all pages
- ✅ Matching color scheme throughout

### Accessibility
- ✅ Semantic HTML structure
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Focus states on buttons and links
- ✅ Screen reader friendly

### Responsiveness
- ✅ Mobile-first approach
- ✅ Breakpoints at 768px and 480px
- ✅ Flexible grid layouts
- ✅ Touch-friendly interactive elements
- ✅ Optimized images and performance

### User Experience
- ✅ Smooth animations and transitions
- ✅ Hover effects on interactive elements
- ✅ Loading states and visual feedback
- ✅ Clear visual hierarchy
- ✅ Intuitive navigation structure

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Production
```bash
npm start
```

## 📱 Browser Support
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎬 Next Steps
- Implement database for blog articles and consultations
- Add payment integration for consultation bookings
- Create admin dashboard for content management
- Implement user authentication and profiles
- Add dynamic horoscope generation
- Integrate astrological calculation APIs

---

**Designed with 💜 for cosmic transformation and holistic wellness**
