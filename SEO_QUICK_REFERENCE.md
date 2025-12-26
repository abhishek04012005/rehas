# SEO Quick Reference Guide - REHAS

## 🚀 Quick Start

### 1. For New Pages
Use this template:

```typescript
import { Metadata } from 'next';
import { createMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = createMetadata(
  'Page Title | REHAS',
  'Page description (150-160 characters, compelling, with keywords)',
  [
    'primary-keyword',
    'secondary-keyword',
    'related-term',
    'long-tail-phrase'
  ],
  '/page-path'
);

export default function PageName() {
  return <PageComponent />;
}
```

### 2. For Adding Schema Markup
```typescript
import SchemaComponent from '@/components/schemaComponent/schemaComponent';
import { generateServiceSchema } from '@/lib/seoMetadata';

export default function ServicePage() {
  const schema = generateServiceSchema({
    name: 'Service Name',
    description: 'Service description',
    price: '₹999',
    image: '/image.jpg'
  });

  return (
    <>
      <SchemaComponent schema={schema} />
      {/* Page content */}
    </>
  );
}
```

## 📊 Page Types & Best Practices

| Page Type | Title Format | Description | Keywords | Schema |
|-----------|-------------|-------------|----------|--------|
| Service | Service Name \| REHAS | 150-160 chars | 8-10 | Service |
| Product | Product Name \| REHAS | 150-160 chars | 6-8 | Product |
| Course | Course Name \| REHAS | 150-160 chars | 8-10 | Course |
| Blog | Post Title \| Blog \| REHAS | 150-160 chars | 6-8 | Article |
| Category | Category Name \| REHAS | 150-160 chars | 8-10 | - |

## ✅ Checklist for Each Page

- [ ] Title (with brand)
- [ ] Meta description (150-160 chars)
- [ ] Keywords array (6-10 items)
- [ ] One H1 tag
- [ ] H2 subheadings
- [ ] Image alt text
- [ ] Internal links (3-5)
- [ ] Canonical URL
- [ ] OpenGraph tags
- [ ] Schema markup

## 🔗 Important URLs

| Resource | Link |
|----------|------|
| GSC | https://search.google.com/search-console |
| Rich Results Test | https://search.google.com/test/rich-results |
| Schema Validator | https://validator.schema.org |
| Page Speed | https://pagespeed.web.dev |
| Mobile Test | https://search.google.com/test/mobile-friendly |

## 📝 Metadata Examples

### Service Page Example
```
Title: Reiki Healing | Energy Therapy | REHAS
Description: Experience Japanese energy healing through certified Reiki therapy. Balance chakras, reduce stress, promote natural healing from REHAS.
Keywords: Reiki, Energy Healing, Chakra Balancing, Japanese Healing, Stress Relief, Holistic Health, Wellness
```

### Course Page Example
```
Title: Astrology Courses | Learn from Experts | REHAS
Description: Master astrology with comprehensive online courses. Learn Vedic Astrology, Numerology, Tarot from certified instructors at REHAS.
Keywords: Astrology Course, Learn Astrology, Online Training, Vedic Astrology, Certification, Professional Training
```

### Product Page Example
```
Title: Premium Healing Crystals | Shop | REHAS
Description: Authentic healing crystals and spiritual products for wellness. Shop ethically sourced stones, oils, and meditation tools at REHAS.
Keywords: Healing Crystals, Spiritual Products, Wellness Shop, Natural Stones, Meditation Tools, Holistic Health
```

## 🎯 Keyword Research Framework

For each page, identify:
1. **Primary Keyword** (40% of focus)
   - Main topic of page
   - Usually 2-3 words
   - Example: "Reiki Healing"

2. **Secondary Keywords** (40% of focus)
   - Related variations
   - 2-3 keywords
   - Example: "Energy Healing", "Chakra Balancing"

3. **Long-tail Keywords** (20% of focus)
   - Specific phrases
   - 2-3 keywords
   - Example: "Japanese energy healing for stress relief"

## 🏗️ Site Structure for SEO

```
Home (/)
├── Services (/services)
│   ├── Astrology (/service/astro-report)
│   ├── Healing (/service/healing)
│   ├── Therapy (/service/kundli-analysis)
│   └── [Others] (/service/*)
├── Courses (/courses)
│   ├── Astrology (/courses/astrology)
│   ├── Healing (/courses/healing)
│   ├── Therapy (/courses/therapy)
│   ├── M.Y.T (/courses/myt)
│   └── Mind-Reading (/courses/mind-reading)
├── Products (/products)
├── Blog (/blog)
│   └── [Article] (/blog/[id])
└── [Other Pages]
```

## 🖼️ Image Optimization

### Alt Text Formula
```
[Product/Service Name] - [What's visible in image] - [Benefit/Use]
```

### Examples
```
✅ "Reiki energy healing session showing chakra activation and stress relief treatment"
✅ "Astrology birth chart analysis with planetary positions and cosmic guidance"
✅ "Healing crystals and natural stones for wellness and spiritual practice"
❌ "image.jpg"
❌ "healing"
```

## 🔄 Content Hierarchy

```
H1: Page Main Topic (1 per page)
├── H2: Section 1
│   ├── H3: Subsection
│   └── H3: Subsection
├── H2: Section 2
│   ├── H3: Subsection
│   └── H3: Subsection
└── H2: Conclusion
```

## 🔗 Internal Linking Strategy

### Link 3-5 Related Pages Per Page

Example Service Page Links:
```
Page: /service/reiki-healing
Links to:
- /healing/reiki (related service)
- /courses/healing/reiki (related course)
- /therapy/reiki (related therapy)
- /blog/reiki-benefits (blog post)
```

## 📱 Meta Tags Reference

### Essential Tags
```html
<meta name="description" content="...">
<meta name="keywords" content="...">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://rehas.in/...">
```

### OpenGraph Tags
```html
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="https://rehas.in/og-image.png">
<meta property="og:url" content="https://rehas.in/...">
<meta property="og:site_name" content="REHAS">
```

### Twitter Card Tags
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="https://rehas.in/og-image.png">
```

## ❌ Common SEO Mistakes to Avoid

| Mistake | Impact | Solution |
|---------|--------|----------|
| Multiple H1 tags | High | Use only 1 H1 per page |
| Duplicate meta descriptions | High | Make each unique |
| Missing alt text | Medium | Add descriptive alt text |
| Short meta desc (< 120) | Medium | Aim for 150-160 chars |
| Keyword stuffing | High | Use naturally (1-2%) |
| Broken internal links | Medium | Verify all links work |
| No schema markup | Low | Add where applicable |
| Slow page speed | High | Optimize images/code |

## 🎓 Learning Resources

- Google SEO Guide: https://developers.google.com/search/docs
- Moz SEO: https://moz.com/beginners-guide-to-seo
- HubSpot SEO: https://www.hubspot.com/resources
- Neil Patel SEO: https://neilpatel.com/blog

## 📈 Monthly Monitoring Checklist

- [ ] Check Google Search Console
- [ ] Review organic traffic trends
- [ ] Check keyword rankings
- [ ] Verify page indexation
- [ ] Fix any crawl errors
- [ ] Monitor Core Web Vitals
- [ ] Update outdated content
- [ ] Add new internal links

## 🚨 SEO Emergency Hotline

| Issue | Quick Fix |
|-------|-----------|
| Page not indexed | Check robots.txt, submit sitemap |
| Low CTR | Improve meta description |
| Page drop in rankings | Check for duplication, quality issues |
| OG image not showing | Verify image URL and size (1200x630) |
| Schema errors | Use https://validator.schema.org |

## 💡 Pro Tips

1. **Keep titles consistent**: Always include brand name
2. **Write for humans first**: Keywords should read naturally
3. **Link strategically**: Link related content for context
4. **Update regularly**: Fresh content signals keep site active
5. **Monitor performance**: Track what works, optimize weak areas
6. **Test everything**: Use Google's tools before publishing
7. **Be patient**: SEO takes 2-3 months to see real results

## 🎯 Success Metrics

Track these monthly:
- Organic traffic
- Keyword rankings
- Click-through rate (CTR)
- Pages indexed
- Crawl errors
- Mobile usability issues

## 📞 Support

For questions on:
- **Metadata**: Check `SEO_IMPLEMENTATION_SUMMARY.md`
- **Testing**: Check `SEO_TESTING_GUIDE.md`
- **Progress**: Check `SEO_OPTIMIZATION_PROGRESS.md`
- **Code**: Check `src/lib/seoMetadata.ts`

---

**Last Updated**: December 26, 2025  
**Status**: Ready for implementation  
**Next Review**: January 26, 2026
