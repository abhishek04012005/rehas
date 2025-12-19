// ============================================
// HERO COMPONENT DATA
// ============================================
export const heroData = {
  title: 'Welcome to REHAS',
  subtitle: 'Discover Your Cosmic Path Through Astrology & Wellness',
  buttons: [
    {
      label: 'Start Your Journey',
      href: '/consultation',
      type: 'primary',
    },
    {
      label: 'Learn More',
      href: '/about',
      type: 'secondary',
    },
  ],
  stats: [
    { number: '10K+', label: 'Happy Clients' },
    { number: '5000+', label: 'Readings' },
    { number: '15+', label: 'Years Experience' },
  ],
  floatingCards: [
    { icon: '✨', text: 'Birth Chart' },
    { icon: '🌙', text: 'Horoscope' },
    { icon: '💫', text: 'Star Reading' },
    { icon: '🧘', text: 'Meditation' },
  ],
} as const;
