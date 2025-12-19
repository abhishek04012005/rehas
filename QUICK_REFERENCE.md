# REHAS Website - Quick Reference Guide

## 🚀 Quick Start Commands

```bash
# Installation
npm install

# Development (local server at http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Linting
npm run lint
npm run lint --fix
```

## 📍 Key Routes

### Main Pages
- `/` - Homepage
- `/about` - About us & team
- `/blog` - Blog articles
- `/contact` - Contact form
- `/consultation` - Book consultation

### Astrology Services
- `/astrology` - Main astrology page
- `/astrology/birth-chart` - Birth chart reading
- `/astrology/horoscope` - Daily/weekly/monthly horoscopes
- `/astrology/compatibility` - Compatibility analysis
- `/astrology/transit` - Transit predictions

### Wellness Services
- `/wellness` - Main wellness page
- `/wellness/meditation` - Meditation guides
- `/wellness/yoga` - Yoga practices
- `/wellness/nutrition` - Nutrition guidance
- `/wellness/mindfulness` - Mindfulness practices

### Error
- `/404` or any undefined route - Custom 404 page

## 🎨 Color Palette

```css
Primary Purple:     #560067
Secondary Purple:   #92487a
Accent Purple:      #d4a5d9
Light Background:   #f5f0f7
Dark Text:          #1a1a1a
Light Text:         #666666
Border Color:       rgba(86, 0, 103, 0.1)
```

Use in CSS: `background: var(--primary);`

## 📱 Responsive Breakpoints

```css
Mobile:    < 768px
Tablet:    768px - 1399px
Desktop:   1400px+
```

## 🧩 Common Components

### Button (Primary)
```tsx
<Link href="/page" className={styles.btn}>
  Click Me
</Link>
```

### Grid Layout
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
```

### Hero Section
```tsx
<section className={styles.hero}>
  <div className={styles.container}>
    <h1>Title</h1>
    <p>Subtitle</p>
  </div>
</section>
```

### Card Component
```tsx
<div className={styles.card}>
  <h3>Card Title</h3>
  <p>Card content</p>
</div>
```

## 📁 Important Files

| File | Purpose |
|------|---------|
| `src/app/globals.css` | Design system & utilities |
| `src/app/layout.tsx` | Root layout with Nav/Footer |
| `src/components/navbar/navbar.tsx` | Navigation menu |
| `src/components/footer/footer.tsx` | Footer |

## 🎯 Adding a New Page

1. Create directory: `src/app/new-page/`
2. Create `page.tsx`:
```tsx
export default function NewPage() {
  return (
    <main>
      <h1>New Page</h1>
    </main>
  );
}
```
3. Create `new-page.module.css` (optional)
4. Update navbar links in `src/components/navbar/navbar.tsx`

## 🎨 Common Styling Patterns

### Gradient Background
```css
background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
```

### Hover Animation
```css
transition: all 0.3s ease;
&:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(86, 0, 103, 0.15);
}
```

### Responsive Container
```css
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}
```

### Section Padding
```css
section {
  padding: 5rem 2rem;
}
```

## 🔧 Customization Guide

### Change Primary Color
Edit `src/app/globals.css`:
```css
--primary: #YOUR_COLOR;
```

### Update Navbar Links
Edit `src/components/navbar/navbar.tsx` - modify the `<li>` elements

### Change Font
Edit `src/app/layout.tsx` - modify font imports from `next/font/google`

### Add Footer Link
Edit `src/components/footer/footer.tsx` - add link in appropriate section

## 📊 Page Template Structure

All main pages follow:
```
Hero Section (gradient background)
  ↓
Content Section (grid layout)
  ↓
CTA Section (call-to-action)
```

## 💡 Pro Tips

1. **CSS Variables**: Use `var(--primary)` for consistency
2. **Mobile First**: Design mobile layouts first, then expand
3. **Responsive Images**: Always use Next.js `<Image>` component
4. **Accessibility**: Add `aria-label` to interactive elements
5. **Dark Mode**: Ready in globals.css with `@media (prefers-color-scheme: dark)`

## 🐛 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Port 3000 in use | `npm run dev -- -p 3001` |
| TypeScript errors | Check file paths, imports |
| CSS not loading | Verify CSS Module import |
| Mobile menu stuck | Clear cache: `rm -rf .next` |

## 📚 Documentation Files

- `DESIGN_SYSTEM.md` - Full design system documentation
- `PAGES_SUMMARY.md` - All pages with features listed
- `README_DEPLOYMENT.md` - Deployment & setup guide
- `PROJECT_COMPLETION_REPORT.md` - Completion details

## 🚀 Deployment Checklist

- [ ] Run `npm run build` (no errors)
- [ ] Test all routes in production build
- [ ] Test responsive design on mobile
- [ ] Check all links work
- [ ] Verify images load correctly
- [ ] Test form submissions
- [ ] Check accessibility (WAVE tool)
- [ ] Update metadata in `layout.tsx`
- [ ] Add favicon to `public/`
- [ ] Deploy to Vercel or hosting provider

## 📞 Support Resources

- Next.js Docs: https://nextjs.org/docs
- TypeScript Docs: https://www.typescriptlang.org/docs
- CSS Grid Guide: https://css-tricks.com/snippets/css/complete-guide-grid
- Accessibility: https://www.w3.org/WAI/WCAG21/quickref

## 💬 CSS Classes Reference

```css
.container       /* Max-width wrapper */
.section         /* Full-width section with padding */
.btn-primary     /* Primary gradient button */
.btn-secondary   /* Secondary gradient button */
.grid            /* Responsive CSS grid */
.card            /* Card component base */
.hero            /* Hero section styling */
.submenu         /* Dropdown menu styling */
.mobile-menu     /* Mobile menu styling */
```

## 📱 Mobile Testing Sizes

- iPhone 12 Mini: 375px width
- iPhone 12 Pro: 390px width
- iPhone 12 Pro Max: 428px width
- iPad Mini: 768px width
- iPad Pro: 1024px width

Test at these breakpoints for optimal experience.

---

**Built with 💜 for quick reference and easy maintenance**
