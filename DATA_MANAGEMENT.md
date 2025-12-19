
# Data Management Documentation

## Overview

All static content for the REHAS website is now centralized in a single TypeScript file (`src/data/content.ts`). This approach provides:

- **Single Source of Truth**: All content is defined in one place
- **Easy Maintenance**: Update content once, it updates everywhere
- **Type Safety**: Full TypeScript support with IntelliSense
- **Scalability**: Easy to add new content or components
- **Consistency**: Ensures uniform data structure across the app

## File Structure

```
src/
├── data/
│   └── content.ts          # All website content (JSON-like structure)
├── components/
│   ├── hero/
│   │   ├── hero.tsx        # Uses heroData
│   │   └── hero.module.css
│   ├── about/
│   │   ├── about.tsx       # Uses aboutData
│   │   └── about.module.css
│   ├── contact/
│   │   ├── contact.tsx     # Uses contactData
│   │   └── contact.module.css
│   ├── footer/
│   │   ├── footer.tsx      # Uses footerData
│   │   └── footer.module.css
│   └── lineArtBackground/
│       ├── lineArtBackground.tsx
│       └── lineArtBackground.module.css
└── app/
    ├── page.tsx            # Homepage
    └── globals.css         # Design system
```

## Data Structure

### 1. Hero Component Data (`heroData`)

```typescript
{
  title: string;              // Main heading
  subtitle: string;           // Subtitle
  buttons: Array<{
    label: string;           // Button text
    href: string;            // Navigation link
    type: 'primary' | 'secondary';
  }>;
  stats: Array<{
    number: string;          // Stat number (e.g., "10K+")
    label: string;           // Stat label (e.g., "Clients")
  }>;
  floatingCards: Array<{
    icon: string;            // Emoji or icon text
    text: string;            // Card label
  }>;
}
```

**Usage in Component:**
```typescript
import { heroData } from '@/data/content';

// Access data
heroData.title
heroData.stats.map((stat) => stat.number)
```

### 2. About Component Data (`aboutData`)

```typescript
{
  hero: {
    title: string;
    subtitle: string;
  };
  story: {
    cards: Array<{
      title: string;
      description: string;
    }>;
  };
  stats: Array<{
    number: string;
    label: string;
  }>;
  team: Array<{
    avatar: string;          // Emoji
    name: string;
    role: string;
  }>;
  cta: {
    title: string;
    subtitle: string;
    buttons: Array<{
      label: string;
      href: string;
      type: 'primary' | 'secondary';
    }>;
  };
}
```

### 3. Contact Component Data (`contactData`)

```typescript
{
  hero: {
    title: string;
    subtitle: string;
  };
  info: {
    title: string;
    description: string;
    cards: Array<{
      icon: string;          // MUI icon name (e.g., 'Email')
      title: string;
      value: string;         // Email/phone/address
      link: string | null;   // mailto: or tel: links
      secondaryText: string;
    }>;
  };
  form: {
    title: string;
    description: string;
    fields: Array<{
      name: string;          // Form field name
      label: string;
      type: string;          // 'text', 'email', 'tel', 'textarea'
      placeholder: string;
      required: boolean;
      rows?: number;         // For textarea
    }>;
    submitButton: string;
    successMessage: string;
  };
}
```

### 4. Footer Component Data (`footerData`)

```typescript
{
  brand: {
    icon: string;            // Logo emoji
    name: string;
    tagline: string;
    social: Array<{
      icon: string;          // MUI icon name
      href: string;
      title: string;
    }>;
  };
  sections: Array<{
    title: string;           // Section heading
    links: Array<{
      label: string;
      href: string;
    }>;
  }>;
  newsletter: {
    title: string;
    placeholder: string;
    button: string;
  };
  copyright: {
    year: number;
    company: string;
    text: string;
  };
  legal: Array<{
    label: string;
    href: string;
  }>;
}
```

### 5. Navbar Data (`navbarData`)

```typescript
{
  logo: {
    text: string;
    badge: string;           // Emoji
  };
  links: Array<{
    label: string;
    href: string;
    submenu?: Array<{
      label: string;
      href: string;
      icon: string;          // Emoji
    }>;
  }>;
  cta: {
    label: string;
    href: string;
  };
}
```

### 6. Homepage Data (`homepageData`)

```typescript
{
  features: Array<{
    icon: string;            // Emoji
    title: string;
    description: string;
  }>;
  whyChooseUs: {
    title: string;
    stats: Array<{
      number: string;
      label: string;
    }>;
  };
  cta: {
    title: string;
    description: string;
    buttons: Array<{
      label: string;
      href: string;
      type: 'primary' | 'secondary';
    }>;
  };
}
```

### 7. 404 Page Data (`notFoundData`)

```typescript
{
  errorCode: string;
  title: string;
  description: string;
  suggestions: {
    title: string;
    links: Array<{
      label: string;
      href: string;
    }>;
  };
}
```

## How Components Use Data

### Example 1: About Component

```typescript
import { aboutData } from '@/data/content';

export default function About() {
  return (
    <div>
      <h1>{aboutData.hero.title}</h1>
      <p>{aboutData.hero.subtitle}</p>
      
      {/* Map over team members */}
      {aboutData.team.map((member) => (
        <div key={member.name}>
          <span>{member.avatar}</span>
          <h3>{member.name}</h3>
          <p>{member.role}</p>
        </div>
      ))}
    </div>
  );
}
```

### Example 2: Contact Component

```typescript
import { contactData } from '@/data/content';

export default function Contact() {
  return (
    <form>
      {/* Map form fields from data */}
      {contactData.form.fields.map((field) => (
        <div key={field.name}>
          <label>{field.label}</label>
          <input 
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            required={field.required}
          />
        </div>
      ))}
    </form>
  );
}
```

### Example 3: Footer Component

```typescript
import { footerData } from '@/data/content';

export default function Footer() {
  return (
    <footer>
      {/* Brand section */}
      <div>
        <span>{footerData.brand.icon}</span>
        <h2>{footerData.brand.name}</h2>
      </div>
      
      {/* Dynamic footer sections */}
      {footerData.sections.map((section) => (
        <div key={section.title}>
          <h4>{section.title}</h4>
          <ul>
            {section.links.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </footer>
  );
}
```

## Adding New Content

### Step 1: Add to `content.ts`

```typescript
// src/data/content.ts
export const newComponentData = {
  title: 'New Component',
  items: [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
  ],
} as const;
```

### Step 2: Import in Component

```typescript
import { newComponentData } from '@/data/content';

export default function NewComponent() {
  return (
    <div>
      <h1>{newComponentData.title}</h1>
      {newComponentData.items.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

### Step 3: Update Everywhere

Changes to `content.ts` automatically update all components using that data.

## Best Practices

1. **Use `as const` assertion**: Ensures TypeScript infers exact types
```typescript
export const myData = {
  status: 'active' as const,  // Type: 'active', not string
} as const;
```

2. **Group related data**: Keep similar items together
```typescript
{
  hero: { /* hero content */ },
  stats: [ /* statistics */ ],
  cta: { /* call-to-action */ },
}
```

3. **Use descriptive names**: Make data self-documenting
```typescript
// Good
{ label: 'Book Consultation', href: '/consultation' }

// Avoid
{ text: 'Click me', url: '/page' }
```

4. **Maintain consistent structure**: Use the same shape for similar items
```typescript
// All buttons have same structure
buttons: [
  { label: 'Button 1', href: '/path1', type: 'primary' },
  { label: 'Button 2', href: '/path2', type: 'secondary' },
]
```

5. **Use emojis for icons**: When MUI icons aren't used
```typescript
{ icon: '✨', text: 'Feature' }
{ icon: '🌙', text: 'Moon' }
```

6. **Add comments**: For clarity on complex sections
```typescript
// Contact information cards with dynamic icon mapping
info: {
  cards: [
    {
      icon: 'Email',  // Maps to <Email /> MUI component
      title: 'Email',
      // ...
    }
  ]
}
```

## Type Safety

All data is fully typed, providing:

- **AutoComplete**: IDEs show available properties
- **Error Detection**: Typos caught at compile time
- **Documentation**: Types serve as inline documentation

```typescript
// TypeScript catches errors
heroData.invalidProperty  // Error: Property doesn't exist
heroData.title            // OK: Property exists
```

## Scalability

To add data for 100+ pages:

1. Keep adding entries to `content.ts`
2. Components automatically use `.map()` over data
3. No component code changes needed
4. Single file for all content updates

## Example: Adding a New Page

```typescript
// 1. Add data to content.ts
export const servicesPageData = {
  hero: { title: 'Our Services', subtitle: '...' },
  services: [
    { icon: '🌟', title: 'Service 1', description: '...' },
    { icon: '🔮', title: 'Service 2', description: '...' },
  ],
  cta: { /* ... */ },
} as const;

// 2. Create component
// src/app/services/page.tsx
import { servicesPageData } from '@/data/content';

export default function ServicesPage() {
  return (
    <main>
      <h1>{servicesPageData.hero.title}</h1>
      <section>
        {servicesPageData.services.map((service) => (
          <div key={service.title}>
            <span>{service.icon}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
```

## Migration Benefits

### Before (Hardcoded)
- Contact info scattered across footer, header, contact page
- Changing a phone number requires editing 3+ files
- No centralized control
- Easy to have inconsistencies

### After (Centralized Data)
- Single `contactData` object in `content.ts`
- Change once, updates everywhere
- Clear what data is used where
- Type-safe and consistent

## Conclusion

This data-driven approach makes the REHAS website:
- **Maintainable**: Update content in one place
- **Scalable**: Add new content without touching components
- **Type-Safe**: Full TypeScript support
- **Consistent**: Unified data structure
- **Professional**: Clean, organized codebase
