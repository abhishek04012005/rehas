// ============================================
// FOOTER COMPONENT DATA
// ============================================
export const footerData = {
  brand: {
    icon: '✨',
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
      title: 'Services',
      links: [
        { label: 'Birth Chart Reading', href: '/astrology/birth-chart' },
        { label: 'Daily Horoscope', href: '/astrology/horoscope' },
        { label: 'Meditation Guide', href: '/wellness/meditation' },
        { label: 'Yoga Classes', href: '/wellness/yoga' },
        { label: 'Book Consultation', href: '/consultation' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contact', href: '/contact' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Careers', href: '/careers' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Terms of Service', href: '/terms-of-service' },
        { label: 'Disclaimer', href: '/disclaimer' },
        { label: 'Sitemap', href: '/sitemap' },
        { label: 'Support', href: '/support' },
      ],
    },
    {
      title: 'Contact',
      links: [
        { label: 'Email: info@rehas.com', href: 'mailto:info@rehas.com' },
        { label: 'Phone: +1 (234) 567-890', href: 'tel:+1234567890' },
        { label: 'Address: 123 Cosmic Street', href: '#' },
        { label: 'Hours: Mon-Fri, 9AM-6PM', href: '#' },
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
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-of-service' },
    { label: 'Disclaimer', href: '/disclaimer' },
    { label: 'Admin', href: '/admin/login' },
  ],
} as const;
