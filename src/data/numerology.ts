import { HealingServiceData } from '@/components/healingService/healingService';

export const numerologyData: HealingServiceData = {
  hero: {
    title: 'Numerology',
    subtitle: 'The Mystical Power of Numbers',
    description:
      'Unlock the hidden meanings in numbers. Numerology reveals your life path, personality, and destiny through the power of numerical vibrations.',
  },
  overview: {
    title: 'The Science of Sacred Numbers',
    description:
      'Numerology is an ancient science that studies the mystical significance of numbers and their influence on human life. Every number carries a unique vibration and energy. From your birth date to your name, numbers shape your personality, relationships, and destiny. Our expert numerologists decode these numbers to provide profound insights into your life purpose and future path.',
    image: 'https://images.unsplash.com/photo-1509994905960-f2e1c42e3ed1?w=500&h=400&fit=crop',
  },
  benefits: {
    title: 'Benefits of Numerology',
    description: 'Discover the numerical patterns guiding your life',
    items: [
      {
        title: 'Life Path Understanding',
        description: 'Discover your soul\'s journey and purpose.',
        icon: 'Flag',
      },
      {
        title: 'Personality Insights',
        description: 'Understand your core traits and tendencies.',
        icon: 'Psychology',
      },
      {
        title: 'Relationship Compatibility',
        description: 'Check compatibility with partners and friends.',
        icon: 'Handshake',
      },
      {
        title: 'Career Guidance',
        description: 'Find your ideal career and professional path.',
        icon: 'WorkOutline',
      },
      {
        title: 'Personal Growth',
        description: 'Identify areas for development and evolution.',
        icon: 'TrendingUp',
      },
      {
        title: 'Decision Making',
        description: 'Make informed choices aligned with your numbers.',
        icon: 'CheckCircle',
      },
    ],
  },
  process: {
    title: 'Numerology Analysis Process',
    steps: [
      {
        number: '01',
        title: 'Data Collection',
        description: 'Provide birth date, full name, and current details.',
      },
      {
        number: '02',
        title: 'Number Calculation',
        description: 'Calculate life path, destiny, and other key numbers.',
      },
      {
        number: '03',
        title: 'Interpretation',
        description: 'Interpret vibrations and meanings of your numbers.',
      },
      {
        number: '04',
        title: 'Actionable Guidance',
        description: 'Receive practical guidance based on numerology insights.',
      },
    ],
  },
  practices: {
    title: 'Key Numerology Practices',
    description: 'Main numerological systems and calculations',
    list: [
      {
        name: 'Life Path Number',
        meaning: 'Your soul\'s core essence and life direction',
        benefit: 'Understand your fundamental purpose and path',
        use: 'Career and life direction planning',
      },
      {
        name: 'Destiny Number',
        meaning: 'Your hidden potential and talents',
        benefit: 'Discover your true abilities and purpose',
        use: 'Identifying potential and opportunities',
      },
      {
        name: 'Expression Number',
        meaning: 'How you naturally express yourself',
        benefit: 'Improve communication and relationships',
        use: 'Personal and professional relationships',
      },
      {
        name: 'Soul Urge Number',
        meaning: 'Your deepest desires and inner motivations',
        benefit: 'Understand what truly drives you',
        use: 'Career choices and life satisfaction',
      },
      {
        name: 'Personality Number',
        meaning: 'How others perceive you',
        benefit: 'Improve social and professional interactions',
        use: 'First impressions and networking',
      },
      {
        name: 'Personal Year Number',
        meaning: 'Themes and energies for the current year',
        benefit: 'Plan and prepare for coming year',
        use: 'Annual forecasting and planning',
      },
    ],
  },
  sessions: {
    title: 'Numerology Services',
    types: [
      {
        name: 'Basic Numerology Reading',
        duration: '45 Minutes',
        price: '₹1,500',
        originalPrice: '₹2,250',
        description: 'Essential numerology interpretation.',
        includes: [
          'Life path number analysis',
          'Destiny number interpretation',
          'Personal year forecast',
          'Key insights and recommendations',
        ],
      },
      {
        name: 'Complete Numerology Analysis',
        duration: '60 Minutes',
        price: '₹2,500',
        originalPrice: '₹3,750',
        description: 'Comprehensive numerology reading with all key numbers.',
        includes: [
          'Life path, destiny, expression numbers',
          'Soul urge and personality analysis',
          'Name vibration analysis',
          'Relationship compatibility numerology',
          'Personal guidance and recommendations',
        ],
      },
      {
        name: 'Advanced Numerology Consultation',
        duration: '90 Minutes + Follow-up',
        price: '₹4,000',
        originalPrice: '₹6,000',
        description: 'In-depth consultation with advanced numerological techniques.',
        includes: [
          'Complete numerology profile',
          'Advanced number combinations',
          'Business name and branding numerology',
          'Optimal dates for important decisions',
          'Annual numerology forecast',
          'Spiritual numerology insights',
          '30-day follow-up guidance',
        ],
      },
    ],
  },
  faq: {
    title: 'Numerology Questions',
    questions: [
      {
        question: 'Is numerology scientifically proven?',
        answer:
          'Numerology is based on mathematical patterns and universal principles. While spiritual in nature, it provides remarkably accurate insights.',
      },
      {
        question: 'What if my name was changed?',
        answer:
          'Your birth name carries your original vibration. Current name also influences you. We analyze both for complete understanding.',
      },
      {
        question: 'Can I change my destiny number?',
        answer:
          'Your destiny number is fixed, but understanding it helps you align with your potential and make better choices.',
      },
      {
        question: 'How does numerology help in relationships?',
        answer:
          'Numerology reveals compatibility through life path and expression numbers, helping understand relationship dynamics and harmony.',
      },
      {
        question: 'What is a personal year number?',
        answer:
          'It represents the energy and themes for a specific year in your life, helping you plan and prepare accordingly.',
      },
      {
        question: 'Can numerology predict future events?',
        answer:
          'Numerology reveals probabilities and energetic patterns. Combined with intuition, it provides guidance for potential futures.',
      },
    ],
  },
  cta: {
    title: 'Discover Your Numerological Destiny',
    subtitle: 'Unlock the hidden messages in your numbers and align with your true path.',
    buttons: [
      {
        label: 'Get Reading',
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
