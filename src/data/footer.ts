// ============================================
// FOOTER COMPONENT DATA
// ============================================
export const footerData = {
  brand: {
    icon: 'Star',
    name: 'REHAS',
    tagline:
      'Bridging ancient cosmic wisdom with modern wellness for a better tomorrow.',
    social: [
      { icon: 'Facebook', href: '#', title: 'Facebook' },
      { icon: 'Twitter', href: '#', title: 'Twitter' },
      { icon: 'Instagram', href: '#', title: 'Instagram' },
      { icon: 'LinkedIn', href: '#', title: 'LinkedIn' },
    ],
  },
  sections: [
    {
      title: 'Healing',
      links: [
        { label: 'Reiki', href: '/healing/reiki' },
        { label: 'Mantra', href: '/healing/mantra' },
        { label: 'Tantra', href: '/healing/tantra' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'General Service', href: '/service/general' },
        { label: 'Healing Service', href: '/service/healing' },
        { label: 'Astro Report', href: '/service/astro-report' },
        { label: 'Kundali', href: '/service/kundli-analysis' },
        { label: 'Tarot', href: '/service/tarot' },
      ],
    },
    {
      title: 'Therapy',
      links: [
        { label: 'Reiki Therapy', href: '/therapy/reiki' },
        { label: 'Acupressure', href: '/therapy/acupressure' },
        { label: 'Acupuncture', href: '/therapy/acupuncture' },
        { label: 'Physiotherapy', href: '/therapy/physiotherapy' },
        { label: 'Magnet Therapy', href: '/therapy/magnet' },
      ],
    },
    {
      title: 'Wisdom',
      links: [
        { label: 'Mantra', href: '/myt/mantra' },
        { label: 'Yantra', href: '/myt/yantra' },
        { label: 'Tantra', href: '/myt/tantra' },
        { label: 'Mantra Manipulation', href: '/myt/mantra-manipulation' },
        { label: 'Himalayan Tantra', href: '/myt/himalayan-tantra' },
      ],
    },
    {
      title: 'Astrology',
      links: [
        { label: 'Course', href: '/astrology/course' },
        { label: 'Vedic Astro', href: '/astrology/vedic' },
        { label: 'Numerology', href: '/astrology/numerology' },
        { label: 'Counselling', href: '/astrology/counselling' },
        { label: 'Reading', href: '/astrology/reading' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contact', href: '/contact' },
        { label: 'Support', href: '/support' },
        { label: 'Sitemap', href: '/sitemap' },
      ],
    },
    
  ],
  newsletter: {
    title: 'Subscribe to Our Newsletter',
    placeholder: 'Enter your email',
    button: 'Subscribe',
  },
  copyright: {
    year: 2024,
    company: 'REHAS',
    text: 'All rights reserved.',
  },
  poweredBy: {
    text: 'Powered by',
    company: 'Ditvi Technologies',
    url: 'https://technologies.ditvi.org',
  },
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-of-service' },
    { label: 'Disclaimer', href: '/disclaimer' },
    { label: 'Admin', href: '/admin/login' },
  ],
} as const;
