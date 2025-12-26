# SEO Testing & Validation Guide for REHAS

## Quick Start - Test Your SEO Changes

### 1. Google Rich Results Test
Test if your schema markup is properly recognized:
- **URL**: https://search.google.com/test/rich-results
- **Process**:
  1. Enter `https://rehas.in/page-path`
  2. Click "Test URL"
  3. Look for "Valid MarkupFound" (green checkmark)
  4. Review any warnings or errors

### 2. Schema.org Validator
Validate JSON-LD structured data:
- **URL**: https://validator.schema.org/
- **Method**: Either paste URL or JSON-LD code
- **Check**: Proper schema types and properties

## Pages to Test First (Critical Pages)

### 1. Home Page
- **URL**: https://rehas.in
- **Expected**: Organization schema, OpenGraph tags
- **Keywords**: astrology, wellness, meditation

### 2. Services Listing
- **URL**: https://rehas.in/services
- **Expected**: Service schema, breadcrumbs
- **Keywords**: healing services, astrology

### 3. Blog Page
- **URL**: https://rehas.in/blog
- **Expected**: Article schema for each post
- **Keywords**: wellness, astrology, healing

### 4. Course Pages
- **URL**: https://rehas.in/courses/astrology
- **Expected**: Course schema, multiple courses
- **Keywords**: astrology course, online training

### 5. Product Page
- **URL**: https://rehas.in/products
- **Expected**: Product schema
- **Keywords**: healing products, crystals

## SEO Metrics to Track

### Core Web Vitals
Use: https://pagespeed.web.dev/

Monitor:
- ✅ Largest Contentful Paint (LCP) < 2.5s
- ✅ First Input Delay (FID) < 100ms
- ✅ Cumulative Layout Shift (CLS) < 0.1

### Google Search Console Setup
1. **Verify Ownership**:
   - Add domain property
   - Choose DNS verification method
   - Add TXT record to your domain

2. **Submit Sitemap**:
   - Go to Sitemaps section
   - Add: `https://rehas.in/sitemap.xml`

3. **Monitor**:
   - Coverage report (index status)
   - Performance (impressions, clicks, CTR)
   - Enhancements (mobile usability, AMP)

4. **Fix Issues**:
   - Address any crawl errors
   - Fix mobile usability issues
   - Resolve security problems

### Google Analytics 4 Setup
1. Enable SEO tracking
2. Monitor:
   - Organic traffic sources
   - Keywords driving traffic
   - Landing page performance
   - User behavior on key pages

## Meta Description Testing

### How to Check Meta Descriptions

Open developer tools (F12) and search for:
```html
<meta name="description" content="Your description">
```

### Good Meta Description Characteristics
- ✅ 150-160 characters
- ✅ Contains primary keyword
- ✅ Action-oriented language
- ✅ Unique for each page
- ✅ Compelling CTR statement

### Example Meta Descriptions

**Good** (✅):
```
"Discover personalized astrology readings from certified experts. Book your consultation with REHAS for birth chart analysis and cosmic guidance."
```

**Poor** (❌):
```
"This page has information about astrology."
```

## OpenGraph Testing

### Test on Multiple Platforms

1. **Facebook**: https://developers.facebook.com/tools/debug/
   - Paste URL
   - Check preview image and text
   - Share preview

2. **LinkedIn**: https://www.linkedin.com/post-inspector/
   - Paste URL
   - Verify preview

3. **Twitter**: https://card-validator.twitter.com/
   - Check Twitter Card validity

### Required OG Tags Checklist

For each page:
- ✅ `og:title` (same as page title)
- ✅ `og:description` (150-160 chars)
- ✅ `og:url` (full canonical URL)
- ✅ `og:image` (1200x630px minimum)
- ✅ `og:image:alt` (image description)
- ✅ `og:type` (website/article/product)
- ✅ `og:site_name` (REHAS)
- ✅ `og:locale` (en_US)

## Keyword Optimization Checklist

### Homepage Keywords
- [ ] Primary: "astrology", "wellness", "meditation"
- [ ] Secondary: "birth chart reading", "spiritual guidance", "healing services"
- [ ] Long-tail: "personalized astrology readings in India", "online meditation guidance"

### Service Pages Keywords
Example: `/service/astro-report`
- [ ] Primary: "Astro Report", "Birth Chart Analysis"
- [ ] Secondary: "Astrological Analysis", "Personality Reading"
- [ ] Long-tail: "detailed birth chart analysis", "cosmic blueprint reading"

### Course Pages Keywords
Example: `/courses/astrology`
- [ ] Primary: "Astrology Course", "Learn Astrology"
- [ ] Secondary: "Astrology Training", "Certification"
- [ ] Long-tail: "online astrology courses", "vedic astrology training"

## Internal Linking Strategy

### Key Link Patterns to Implement

1. **Home → Category Pages**
   ```
   Home → Services → Service Detail
   Home → Courses → Course Category → Course Detail
   Home → Products → Product Category
   ```

2. **Related Content Linking**
   - Link related services on detail pages
   - Link related courses on course pages
   - Link blog posts about topics

3. **Breadcrumb Linking**
   ```
   Home > Courses > Astrology > Vedic Astrology
   ```

## Image Optimization

### Alt Text Standards

**Good Alt Text** (✅):
```html
<img src="reiki.jpg" alt="Professional Reiki energy healing session for chakra balancing and stress relief">
```

**Poor Alt Text** (❌):
```html
<img src="reiki.jpg" alt="image">
<img src="reiki.jpg" alt="reiki healing service photo">
```

### Alt Text for Different Content Types

#### Service/Healing Images
```
"[Specific therapy name] treatment for [condition/benefit], showing [what's visible in image]"
```

#### Course Images
```
"[Course name] training class with [equipment/setting], teaching [skill/technique]"
```

#### Product Images
```
"[Product name] - [brief description of appearance and use]"
```

#### Testimonial Images
```
"[Person name], [testimonial title/role]"
```

## Heading Hierarchy Check

### Proper H1-H3 Structure

**Good Structure** (✅):
```
H1: Main Page Topic
  H2: Section 1
    H3: Subsection 1.1
    H3: Subsection 1.2
  H2: Section 2
    H3: Subsection 2.1
```

**Poor Structure** (❌):
```
H1: Page Title
  H1: Another H1 (WRONG - only one H1 per page)
  H3: Missing H2 (WRONG - skipped hierarchy)
```

### Pages to Check
- [ ] Home page
- [ ] Service pages
- [ ] Course pages
- [ ] Blog posts
- [ ] Product pages

## URL Structure Validation

### Current URL Patterns
All URLs should be:
- ✅ Lowercase: `/courses/astrology` (not `/Courses/Astrology`)
- ✅ Hyphenated: `/palm-reading` (not `/palmreading`)
- ✅ Descriptive: `/service/kundli-analysis` (descriptive)
- ✅ Canonical: Single canonical URL per page
- ✅ HTTPS: All URLs use https://rehas.in

### Check Current URLs
```bash
# Find any URLs with issues
grep -r "UPPERCASE\|underscore\|non-descriptive" src/app
```

## Performance SEO

### Critical Pages to Optimize
1. Home page (entry point)
2. Services page (high traffic expected)
3. Products page (conversion page)
4. Course pages (conversion pages)
5. Blog pages (organic traffic)

### Performance Checklist
- [ ] Images optimized (WebP format)
- [ ] Lazy loading enabled
- [ ] CSS/JS minified
- [ ] Caching headers set
- [ ] CDN configured
- [ ] Database queries optimized
- [ ] Server response time < 200ms

## Content Optimization Framework

### For Each Page, Implement:

1. **Keyword Research**
   - Primary keyword (main topic)
   - Secondary keywords (related topics)
   - Long-tail variations

2. **Content Structure**
   - H1 with primary keyword
   - H2 sections with secondary keywords
   - Intro paragraph with focus keyword
   - Conclusion with call-to-action

3. **Meta Data**
   - Title with primary keyword
   - Description with secondary keyword
   - Keywords array
   - OpenGraph tags

4. **Internal Links**
   - 3-5 relevant internal links per page
   - Anchor text with keywords
   - Link to related pages

## Monitoring & Maintenance

### Weekly Tasks
- [ ] Check Google Search Console for errors
- [ ] Monitor Core Web Vitals
- [ ] Review search queries
- [ ] Check indexation status

### Monthly Tasks
- [ ] Review organic traffic trends
- [ ] Check keyword rankings
- [ ] Analyze competitor strategies
- [ ] Update meta descriptions if needed

### Quarterly Tasks
- [ ] Comprehensive SEO audit
- [ ] Update outdated content
- [ ] Add new schema markup
- [ ] Review internal linking strategy

## Common SEO Issues to Avoid

### Critical Issues (Fix Immediately)
- ❌ Multiple H1 tags on one page
- ❌ Missing meta descriptions
- ❌ Duplicate content
- ❌ Broken internal links
- ❌ Images with no alt text
- ❌ Missing canonical tags

### Important Issues (Fix Soon)
- ⚠️ Short meta descriptions (< 120 chars)
- ⚠️ Long meta descriptions (> 170 chars)
- ⚠️ Keyword stuffing
- ⚠️ Poor mobile experience
- ⚠️ Slow page speed

### Nice-to-Have Improvements
- ✏️ Rich snippets/schema
- ✏️ Breadcrumb navigation
- ✏️ FAQ schema
- ✏️ Video content
- ✏️ Featured snippets optimization

## Testing URLs

### Test These URLs First

```
https://rehas.in/
https://rehas.in/services
https://rehas.in/courses/astrology
https://rehas.in/products
https://rehas.in/blog
https://rehas.in/about
https://rehas.in/contact
```

### Tools to Use

1. **Crawling**: Screaming Frog Free (desktop)
2. **SEO Analysis**: SEMrush (freemium)
3. **Speed**: PageSpeed Insights
4. **Schema**: Schema.org Validator
5. **Social**: OG Debugger tools

## Success Metrics

### Target KPIs

- Organic traffic: 30% increase in 3 months
- Keyword rankings: Top 10 for 50+ keywords in 6 months
- CTR improvement: 15% from improved meta descriptions
- Indexation rate: 95%+ of pages indexed
- Core Web Vitals: All green scores

## Resources

### Free SEO Tools
- Google Search Console: https://search.google.com/search-console
- Google Analytics: https://analytics.google.com
- PageSpeed Insights: https://pagespeed.web.dev
- Mobile Friendly Test: https://search.google.com/test/mobile-friendly
- Rich Results Test: https://search.google.com/test/rich-results
- Schema.org: https://schema.org

### Learning Resources
- Google SEO Starter Guide: https://developers.google.com/search/docs
- Moz SEO Guide: https://moz.com/beginners-guide-to-seo
- SEMrush Blog: https://www.semrush.com/blog/

## Next Actions

1. **Immediate**: Test 5 main pages with Rich Results Tool
2. **This Week**: Submit sitemap to Google Search Console
3. **This Week**: Set up Google Analytics 4
4. **Next Week**: Optimize image alt text
5. **Next Week**: Fix any crawl errors from GSC
