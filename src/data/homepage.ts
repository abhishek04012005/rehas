// ============================================
// HOMEPAGE DATA
// ============================================
export const homepageData = {
  features: [
    {
      icon: '🌟',
      title: 'Birth Chart Analysis',
      description: 'Deep insights into your cosmic blueprint',
    },
    {
      icon: '🔮',
      title: 'Daily Horoscope',
      description: 'Personalized guidance for each day',
    },
    {
      icon: '💑',
      title: 'Compatibility Check',
      description: 'Understand relationship dynamics',
    },
    {
      icon: '🧘',
      title: 'Meditation Guides',
      description: 'Inner peace through guided practice',
    },
    {
      icon: '🥗',
      title: 'Nutrition Plans',
      description: 'Wellness aligned with your nature',
    },
    {
      icon: '🏃',
      title: 'Yoga Sessions',
      description: 'Balance body, mind, and spirit',
    },
  ],
  whyChooseUs: {
    title: 'Why Choose REHAS?',
    stats: [
      { number: '10K+', label: 'Satisfied Clients' },
      { number: '25+', label: 'Countries Served' },
      { number: '15+', label: 'Years of Expertise' },
      { number: '98%', label: 'Customer Satisfaction' },
    ],
  },
  cta: {
    title: 'Begin Your Wellness Journey',
    description: 'Join thousands discovering their path through astrology and holistic wellness.',
    buttons: [
      { label: 'Book Now', href: '/consultation', type: 'primary' },
      { label: 'Learn More', href: '/about', type: 'secondary' },
    ],
  },
} as const;
