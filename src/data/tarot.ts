import { HealingServiceData } from '@/components/healingService/healingService';

export const tarotData: HealingServiceData = {
  hero: {
    title: 'Tarot Reading',
    subtitle: 'Gain Clarity Through Ancient Divination',
    description:
      'Discover insights and guidance through professional tarot readings. Our experienced tarot readers use intuition and ancient wisdom to provide clarity on life\'s questions and challenges.',
  },
  overview: {
    title: 'What is Tarot Reading?',
    description:
      'Tarot is a powerful divination tool that uses a deck of 78 symbolic cards to gain insight into past, present, and future situations. Each card carries profound meaning and can be interpreted in various ways depending on context. A professional tarot reading provides clarity, guidance, and perspective on life challenges and decisions.',
    image: '/assets/service/tarrotreading.png',
  },
  benefits: {
    title: 'Benefits of Tarot Reading',
    description: 'Gain clarity and guidance through intuitive divination',
    items: [
      {
        title: 'Clarity & Perspective',
        description: 'Get a fresh perspective on confusing situations and challenges.',
        icon: 'Visibility',
      },
      {
        title: 'Decision Making',
        description: 'Receive guidance to make informed decisions with confidence.',
        icon: 'Lightbulb',
      },
      {
        title: 'Relationship Insights',
        description: 'Understand relationship dynamics and emotional connections.',
        icon: 'Favorite',
      },
      {
        title: 'Future Possibilities',
        description: 'Explore potential outcomes and future possibilities.',
        icon: 'AutoAwesome',
      },
      {
        title: 'Personal Growth',
        description: 'Gain self-awareness and identify areas for personal development.',
        icon: 'FlashOn',
      },
      {
        title: 'Spiritual Guidance',
        description: 'Connect with deeper wisdom and spiritual guidance.',
        icon: 'Brightness3',
      },
    ],
  },
  process: {
    title: 'Tarot Reading Process',
    steps: [
      {
        number: '01',
        title: 'Intention Setting',
        description: 'Share your question or area of concern with the reader.',
      },
      {
        number: '02',
        title: 'Card Spread',
        description: 'Cards are drawn using a specific spread relevant to your question.',
      },
      {
        number: '03',
        title: 'Interpretation',
        description: 'Each card is interpreted in the context of your situation.',
      },
      {
        number: '04',
        title: 'Guidance',
        description: 'Receive actionable insights and guidance based on the reading.',
      },
    ],
  },
  sessions: {
    title: 'Tarot Reading Sessions',
    types: [
      {
        name: 'Quick Reading',
        duration: '15 Minutes',
        price: '₹1,200',
        originalPrice: '₹1,800',
        description: 'Quick tarot reading for a specific question or concern.',
        includes: [
          'Simple 3-card spread',
          'Card interpretation',
          'Quick guidance',
          'Immediate clarity',
        ],
      },
      {
        name: 'Standard Reading',
        duration: '45 Minutes',
        price: '₹2,500',
        originalPrice: '₹3,750',
        description: 'In-depth tarot reading exploring multiple aspects of your situation.',
        includes: [
          'Comprehensive card spread',
          'Detailed interpretation',
          'Deep insights',
          'Guidance and recommendations',
          'Follow-up suggestions',
        ],
      },
      {
        name: 'Extended Reading with Guidance',
        duration: '90 Minutes',
        price: '₹4,500',
        originalPrice: '₹6,750',
        description: 'Complete tarot session with multiple spreads and detailed guidance.',
        includes: [
          'Multiple card spreads',
          'Complete situation analysis',
          'Future outcome reading',
          'Detailed personal guidance',
          '30-day follow-up support',
          'Written summary provided',
        ],
      },
    ],
  },
  faq: {
    title: 'Tarot Reading FAQ',
    questions: [
      {
        question: 'Is tarot reading accurate?',
        answer:
          'Tarot provides insights and guidance based on intuitive interpretation. Accuracy depends on the reader\'s skill, your openness, and how you apply the guidance. It\'s a tool for clarity, not definitive prediction.',
      },
      {
        question: 'What should I ask in a tarot reading?',
        answer:
          'You can ask about relationships, career, finances, personal growth, life decisions, or any area you seek clarity on. Frame questions clearly and be open to unexpected insights.',
      },
      {
        question: 'Can tarot predict the future?',
        answer:
          'Tarot shows potential outcomes based on current energies and patterns. The future is not fixed - your choices and actions influence what unfolds. Tarot guides you towards positive outcomes.',
      },
      {
        question: 'How often should I get tarot readings?',
        answer:
          'There\'s no fixed frequency. Some people prefer monthly readings, others quarterly or annually. We recommend avoiding excessive readings on the same question - allow time between readings for situations to develop.',
      },
      {
        question: 'What is card reversals mean?',
        answer:
          'Reversed cards often indicate blocked energy, delays, or the need to look within. Not all reversals are negative - context matters. Your reader will explain the significance.',
      },
      {
        question: 'Can tarot answer yes/no questions?',
        answer:
          'While possible, tarot works better with open-ended questions. Yes/no readings can feel limiting. We encourage questions that invite deeper insight and guidance.',
      },
    ],
  },
  cta: {
    title: 'Seek Clarity and Guidance',
    subtitle: 'Book a tarot reading today and gain valuable insights for your life journey.',
    buttons: [
      {
        label: 'Book Tarot Reading',
        href: '/enquiry',
        type: 'primary',
      },
      {
        label: 'Learn More',
        href: '/contact',
        type: 'secondary',
      },
    ],
  },
};
