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
          'REHAS is a trusted platform dedicated to bridging ancient cosmic wisdom with modern wellness practices. Founded on the belief that everyone deserves access to transformative guidance, we serve thousands of seekers worldwide. Our team of experienced astrologers, wellness coaches, and meditation guides are passionate about helping individuals discover their true potential and live authentically aligned with their cosmic blueprint.',
      },
      {
        title: 'What We Do',
        description:
          'We offer comprehensive astrology readings, personalized wellness coaching, and guided meditation sessions tailored to your unique needs. From Vedic astrology consultations and numerology insights to energy healing and life coaching, our services help you navigate life\'s challenges with clarity and confidence. We combine ancient practices with modern understanding to create transformative experiences that empower you to achieve your goals and embrace your fullest self.',
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
    image: 'Star',
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
      avatar: 'Woman',
      name: 'Sarah Chen',
      role: 'Astrology Expert',
    },
    {
      avatar: 'Man',
      name: 'Dr. Rajesh',
      role: 'Wellness Coach',
    },
    {
      avatar: 'SelfImprovement',
      name: 'Emma Johnson',
      role: 'Meditation Guide',
    },
    {
      avatar: 'LocalDining',
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
