// ============================================
// HERO COMPONENT DATA
// ============================================
export const heroData = {
  title: 'Welcome to REHAS',
  subtitle: 'Let your being harmonize and your path be illuminated',
  buttons: [
    {
      label: 'Start Your Journey',
      href: '/enquiry',
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
    { icon: 'Sparkles', text: 'Birth Chart' },
    { icon: 'Nightlight', text: 'Horoscope' },
    { icon: 'AutoAwesome', text: 'Star Reading' },
    { icon: 'SelfImprovement', text: 'Meditation' },
  ],
} as const;
