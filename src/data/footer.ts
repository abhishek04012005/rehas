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
      title: 'Therapy',
      links: [
        { label: 'Acupressure', href: '/therapy/acupressure' },
        { label: 'Magnet Therapy', href: '/therapy/magnet' },
        { label: 'Marma Therapy', href: '/therapy/marma' },
        { label: 'Auricular Therapy', href: '/therapy/auricular' },
      ],
    },
    {
      title: 'Astrology',
      links: [
        { label: 'Numerology', href: '/astrology/numerology' },
        { label: 'Vedic Astro', href: '/astrology/vedic' },
        { label: 'Tarot Card', href: '/service/tarot' },
        { label: 'Cowrie Reading', href: '/astrology/cowrie-reading' },
        { label: 'Palm Reading', href: '/service/palm-reading' },
        { label: 'Kundli', href: '/service/kundli-analysis' },
      ],
    },
    {
      title: 'M.Y.T Wisdom',
      links: [
        { label: 'Mantra', href: '/myt/mantra' },
        { label: 'Yantra', href: '/myt/yantra' },
        { label: 'Tantra', href: '/myt/tantra' },
        { label: 'Mantra Vortex', href: '/myt/mantra-vortex' },
      ],
    },
    {
      title: 'Courses',
      links: [
        { label: 'Healing', href: '/courses/healing' },
        { label: 'Therapy', href: '/courses/therapy' },
        { label: 'Astrology', href: '/courses/astrology' },
        { label: 'M.Y.T', href: '/courses/myt' },
        { label: 'Mind Reading', href: '/courses/mind-reading' },

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
