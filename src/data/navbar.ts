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
      label: 'Healing',
      href: '/healing',
      submenu: [
        { label: 'Reiki', href: '/healing/reiki', icon: '📊' },
        { label: 'Mantra', href: '/healing/mantra', icon: '🌙' },
        { label: 'Tantra', href: '/healing/tantra', icon: '💞' },
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
    href: '/enquiry',
  },
} as const;
