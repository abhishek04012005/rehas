import { HealingServiceData } from '@/components/healingService/healingService';

export const astrologyReadingData: HealingServiceData = {
  hero: {
    title: 'Astrology Reading',
    subtitle: 'Personalized Celestial Insights',
    description:
      'Discover what the stars reveal about your past, present, and future. Get personalized astrology readings that illuminate your path and empower your decisions.',
  },
  overview: {
    title: 'Personal Astrology Readings',
    description:
      'Our professional astrology readings provide deep insights into your life based on the positions of celestial bodies at your birth. Through detailed chart analysis, transit readings, and predictive techniques, we reveal hidden patterns, upcoming opportunities, and potential challenges. Whether you seek clarity on relationships, career, health, or spiritual matters, our readings provide actionable guidance grounded in astrological wisdom.',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=500&h=400&fit=crop',
  },
  benefits: {
    title: 'Benefits of Astrology Reading',
    description: 'Gain clarity and direction through celestial guidance',
    items: [
      {
        title: 'Personal Clarity',
        description: 'Understand your true nature and potential.',
        icon: 'ClarityOutlined',
      },
      {
        title: 'Life Events Timing',
        description: 'Know when important events may occur.',
        icon: 'Schedule',
      },
      {
        title: 'Opportunity Recognition',
        description: 'Identify and seize favorable opportunities.',
        icon: 'Lightbulb',
      },
      {
        title: 'Challenge Awareness',
        description: 'Prepare for and navigate upcoming challenges.',
        icon: 'SecurityOutlined',
      },
      {
        title: 'Better Decisions',
        description: 'Make informed choices aligned with cosmic timing.',
        icon: 'CheckCircle',
      },
      {
        title: 'Peace of Mind',
        description: 'Find reassurance and inner peace through guidance.',
        icon: 'SelfImprovement',
      },
    ],
  },
  process: {
    title: 'Astrology Reading Process',
    steps: [
      {
        number: '01',
        title: 'Chart Preparation',
        description: 'Create your precise astrological chart.',
      },
      {
        number: '02',
        title: 'Comprehensive Analysis',
        description: 'Analyze all aspects of your chart in depth.',
      },
      {
        number: '03',
        title: 'Insight Gathering',
        description: 'Compile meaningful insights and patterns.',
      },
      {
        number: '04',
        title: 'Reading Delivery',
        description: 'Share personalized reading with guidance.',
      },
    ],
  },
  practices: {
    title: 'Reading Types Available',
    description: 'Various astrological reading formats and approaches',
    list: [
      {
        name: 'Birth Chart Reading',
        meaning: 'Complete interpretation of your natal chart',
        benefit: 'Understand your core personality and potential',
        use: 'Life path and purpose identification',
      },
      {
        name: 'Transit Reading',
        meaning: 'How current planetary movements affect you',
        benefit: 'Understand current life circumstances and timing',
        use: 'Monthly and annual forecasting',
      },
      {
        name: 'Relationship Reading',
        meaning: 'Synastry and composite chart analysis',
        benefit: 'Deep understanding of relationship dynamics',
        use: 'Love, marriage, and partnership insight',
      },
      {
        name: 'Career Reading',
        meaning: 'Astrological analysis for professional path',
        benefit: 'Identify ideal careers and timing',
        use: 'Career planning and advancement',
      },
      {
        name: 'Health Reading',
        meaning: 'Astrological perspective on health patterns',
        benefit: 'Understand health vulnerabilities and strengths',
        use: 'Wellness planning and disease prevention',
      },
      {
        name: 'Annual Forecast',
        meaning: 'Year-ahead astrological predictions',
        benefit: 'Plan for coming year with cosmic awareness',
        use: 'Annual planning and goal setting',
      },
    ],
  },
  sessions: {
    title: 'Reading Services',
    types: [
      {
        name: 'Quick Reading',
        duration: '30 Minutes',
        price: '₹1,000',
        description: 'Brief astrological insights on a specific question.',
        includes: [
          'Focused chart analysis',
          'Quick insights on your question',
          'Brief guidance',
          'Recommendations',
        ],
      },
      {
        name: 'Standard Reading',
        duration: '60 Minutes',
        price: '₹2,500',
        description: 'Comprehensive personal astrology reading.',
        includes: [
          'Complete birth chart analysis',
          'Current planetary influences',
          'Life patterns and themes',
          'Six-month forecast',
          'Detailed guidance and insights',
        ],
      },
      {
        name: 'Premium Life Reading',
        duration: '90 Minutes + Recording',
        price: '₹4,500',
        description: 'In-depth reading with recording and follow-up.',
        includes: [
          'Complete natal chart analysis',
          'Transit and timing analysis',
          'Life patterns and lessons',
          'One-year detailed forecast',
          'Relationship insights',
          'Career guidance',
          'Audio recording of session',
          '15-day follow-up support',
        ],
      },
    ],
  },
  faq: {
    title: 'Astrology Reading FAQ',
    questions: [
      {
        question: 'What information do you need for a reading?',
        answer:
          'We need your birth date, exact time, and birth location. If you don\'t know your exact time, we can estimate it from life events.',
      },
      {
        question: 'How long are readings accurate for?',
        answer:
          'Birth chart insights are lifelong. Transits and forecasts are accurate for the period analyzed (usually 6-12 months).',
      },
      {
        question: 'Can you predict my future?',
        answer:
          'Astrology shows probable outcomes and timing based on your chart and current transits. Your choices influence the outcome.',
      },
      {
        question: 'How long does a reading take?',
        answer:
          'Sessions range from 30 minutes for quick readings to 90 minutes for comprehensive analyses. Choose based on your needs.',
      },
      {
        question: 'Should I bring any questions?',
        answer:
          'It helps to have specific areas in mind (relationships, career, health), but our astrologer will also provide general insights.',
      },
      {
        question: 'What if I\'m skeptical about astrology?',
        answer:
          'Many skeptics find astrology readings surprisingly accurate. We invite you to experience it for yourself with an open mind.',
      },
    ],
  },
  cta: {
    title: 'Discover Your Astrological Insights',
    subtitle: 'Book a personalized reading and uncover what the stars reveal about your journey.',
    buttons: [
      {
        label: 'Book Reading',
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
