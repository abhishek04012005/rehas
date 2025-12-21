import { HealingServiceData } from '@/components/healingService/healingService';

export const astrologyCounsellingData: HealingServiceData = {
  hero: {
    title: 'Astrology Counselling',
    subtitle: 'Professional Guidance Through the Stars',
    description:
      'Expert astrological guidance for life\'s critical decisions. Navigate challenges and seize opportunities with personalized counselling from experienced astrologers.',
  },
  overview: {
    title: 'Professional Astrological Counselling',
    description:
      'Our astrology counselling service provides personalized guidance for life decisions, challenges, and opportunities. Our experienced counsellors combine astrological insights with life coaching to help you navigate relationships, career, health, and spiritual growth. Whether facing a major decision or seeking clarity on life direction, we provide compassionate, professional guidance grounded in astrological wisdom.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&h=400&fit=crop',
  },
  benefits: {
    title: 'Benefits of Astrology Counselling',
    description: 'Professional guidance aligned with your astrological patterns',
    items: [
      {
        title: 'Life Direction Clarity',
        description: 'Get clear direction for your life path.',
        icon: 'Navigation',
      },
      {
        title: 'Relationship Guidance',
        description: 'Improve relationships through astrological understanding.',
        icon: 'PeopleAlt',
      },
      {
        title: 'Career Counselling',
        description: 'Align career choices with your astrological strengths.',
        icon: 'BusinessCenter',
      },
      {
        title: 'Decision Support',
        description: 'Make informed decisions with astrological timing.',
        icon: 'Balance',
      },
      {
        title: 'Stress & Anxiety Relief',
        description: 'Find peace through understanding cosmic patterns.',
        icon: 'SelfImprovement',
      },
      {
        title: 'Personal Empowerment',
        description: 'Take control of your life with cosmic awareness.',
        icon: 'EmojiPeople',
      },
    ],
  },
  process: {
    title: 'Counselling Process',
    steps: [
      {
        number: '01',
        title: 'Initial Consultation',
        description: 'Discuss your situation, concerns, and goals.',
      },
      {
        number: '02',
        title: 'Astrological Assessment',
        description: 'Analyze your chart and current astrological influences.',
      },
      {
        number: '03',
        title: 'Personalized Guidance',
        description: 'Provide tailored counselling and recommendations.',
      },
      {
        number: '04',
        title: 'Action Planning',
        description: 'Create actionable steps for life improvement.',
      },
    ],
  },
  practices: {
    title: 'Counselling Specializations',
    description: 'Areas of expertise in astrological counselling',
    list: [
      {
        name: 'Relationship Counselling',
        meaning: 'Guidance for love, marriage, and partnerships',
        benefit: 'Improve compatibility and relationship harmony',
        use: 'Resolving conflicts and building strong relationships',
      },
      {
        name: 'Career Counselling',
        meaning: 'Support for career decisions and advancement',
        benefit: 'Align work with your astrological strengths',
        use: 'Career transitions and professional growth',
      },
      {
        name: 'Health & Wellness',
        meaning: 'Guidance for physical and mental health',
        benefit: 'Understand health patterns and prevention',
        use: 'Holistic wellness and disease prevention',
      },
      {
        name: 'Spiritual Counselling',
        meaning: 'Support for spiritual path and awakening',
        benefit: 'Connect with your higher purpose',
        use: 'Spiritual growth and evolution',
      },
      {
        name: 'Crisis Management',
        meaning: 'Support during difficult life transitions',
        benefit: 'Navigate challenges with cosmic wisdom',
        use: 'Managing loss, change, and difficult periods',
      },
      {
        name: 'Goal Achievement',
        meaning: 'Astrological planning for success',
        benefit: 'Align goals with favorable astrological timing',
        use: 'Business, education, and personal goals',
      },
    ],
  },
  sessions: {
    title: 'Counselling Sessions',
    types: [
      {
        name: 'Single Counselling Session',
        duration: '45 Minutes',
        price: '₹2,000',
        description: 'One-time professional counselling guidance.',
        includes: [
          'Astrological consultation',
          'Issue exploration',
          'Initial guidance',
          'Resource suggestions',
        ],
      },
      {
        name: 'Extended Counselling Session',
        duration: '60 Minutes',
        price: '₹3,000',
        description: 'In-depth counselling with detailed analysis.',
        includes: [
          'Complete chart assessment',
          'Detailed issue discussion',
          'Astrological insights',
          'Practical recommendations',
          'Action planning',
        ],
      },
      {
        name: 'Ongoing Counselling Program',
        duration: 'Monthly Sessions + Support',
        price: '₹8,000/Month',
        description: 'Comprehensive support with ongoing guidance.',
        includes: [
          ' 4 monthly counselling sessions',
          'Chart analysis and updates',
          'Email support between sessions',
          'Personalized action plans',
          'Progress tracking and adjustments',
          'Crisis support access',
          'Monthly follow-up reports',
        ],
      },
    ],
  },
  faq: {
    title: 'Counselling FAQ',
    questions: [
      {
        question: 'How is this different from regular therapy?',
        answer:
          'We combine professional counselling with astrological insights, providing guidance grounded in both psychology and cosmic wisdom.',
      },
      {
        question: 'Do I need a birth chart?',
        answer:
          'Yes, we need your birth date, time, and location to provide astrological counselling. This helps us understand your unique patterns.',
      },
      {
        question: 'How long does counselling take?',
        answer:
          'This depends on your issues and goals. Some benefit from single sessions, others from ongoing support. We\'ll recommend what\'s best.',
      },
      {
        question: 'Is counselling confidential?',
        answer:
          'Absolutely. All counselling sessions are completely confidential and professional.',
      },
      {
        question: 'Can counselling solve all my problems?',
        answer:
          'Counselling provides insights and guidance. Combined with your effort and actions, it leads to significant life improvements.',
      },
      {
        question: 'What if I don\'t believe in astrology?',
        answer:
          'We respect all beliefs. Our counselling integrates practical life coaching with astrological perspective, benefiting everyone.',
      },
    ],
  },
  cta: {
    title: 'Begin Your Counselling Journey',
    subtitle: 'Get expert guidance aligned with your astrological patterns and life path.',
    buttons: [
      {
        label: 'Book Session',
        href: '/enquiry',
        type: 'primary',
      },
      {
        label: 'Contact Us',
        href: '/contact',
        type: 'secondary',
      },
    ],
  },
};
