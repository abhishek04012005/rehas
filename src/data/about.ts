// ============================================
// ABOUT COMPONENT DATA
// ============================================
export const aboutData = {
  hero: {
    title: 'About REHAS',
    subtitle: 'Bridging ancient cosmic wisdom with modern wellness',
  },
  story: {
    cards: [
      {
        title: 'Who We Are',
        description:
          'REHAS empowers seekers through astrology and holistic wellness, serving thousands worldwide.',
      },
      {
        title: 'What We Do',
        description:
          'We offer astrology readings, wellness coaching, and meditation guidance to help you live authentically.',
      },
    ],
  },
  stats: [
    { number: '10K+', label: 'Clients' },
    { number: '25+', label: 'Countries' },
    { number: '4', label: 'Experts' },
    { number: '15+', label: 'Years' },
  ],
  team: [
    {
      avatar: '👩‍⚕️',
      name: 'Sarah Chen',
      role: 'Astrology Expert',
    },
    {
      avatar: '👨‍⚕️',
      name: 'Dr. Rajesh',
      role: 'Wellness Coach',
    },
    {
      avatar: '🧘‍♀️',
      name: 'Emma Johnson',
      role: 'Meditation Guide',
    },
    {
      avatar: '🥗',
      name: 'Alex Rodriguez',
      role: 'Nutrition Specialist',
    },
  ],
  cta: {
    title: 'Ready to Transform?',
    subtitle: 'Join thousands discovering their cosmic path',
    buttons: [
      {
        label: 'Book Consultation',
        href: '/consultation',
        type: 'primary',
      },
      {
        label: 'Learn More',
        href: '/contact',
        type: 'secondary',
      },
    ],
  },
} as const;
