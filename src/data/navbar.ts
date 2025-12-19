// ============================================
// NAVBAR DATA
// ============================================
export const navbarData = {
  logo: {
    text: 'REHAS',
    badge: '✨',
  },
  links: [
    { label: 'Home', href: '/' },
    {
      label: 'Astrology',
      href: '/astrology',
      submenu: [
        { label: 'Birth Chart', href: '/astrology/birth-chart', icon: '📊' },
        { label: 'Horoscope', href: '/astrology/horoscope', icon: '🌙' },
        { label: 'Compatibility', href: '/astrology/compatibility', icon: '💞' },
        { label: 'Transit', href: '/astrology/transit', icon: '🚀' },
      ],
    },
    {
      label: 'Wellness',
      href: '/wellness',
      submenu: [
        { label: 'Meditation', href: '/wellness/meditation', icon: '🧘' },
        { label: 'Yoga', href: '/wellness/yoga', icon: '🏃' },
        { label: 'Nutrition', href: '/wellness/nutrition', icon: '🥗' },
        { label: 'Mindfulness', href: '/wellness/mindfulness', icon: '🧠' },
      ],
    },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  cta: {
    label: 'Book Consultation',
    href: '/consultation',
  },
} as const;
