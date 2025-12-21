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
  founder: {
    name: 'Rudra Aabhi Singh',
    title: 'Founder & Visionary',
    bio: 'With 15+ years of experience in astrology and holistic wellness, Rudra founded REHAS to democratize cosmic wisdom and make transformative guidance accessible to everyone. His passion for bridging ancient practices with modern science has helped thousands discover their true path.',
    expertise: [
      'Vedic Astrology',
      'Numerology',
      'Energy Healing',
      'Life Coaching',
      'Meditation',
    ],
    image: '✨',
    social: {
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
    quote:
      '"The stars are not just distant lights; they are mirrors reflecting our infinite potential. At REHAS, we help you read your cosmic blueprint."',
  },
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
