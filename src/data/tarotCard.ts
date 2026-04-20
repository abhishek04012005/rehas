import { HealingServiceData } from '@/components/healingService/healingService';

export const tarotCard: HealingServiceData = {
  hero: {
    title: 'Tarot Card Reading',
    subtitle: 'Unlock Your Destiny Through Divine Cards',
    description:
      'Discover powerful insights through tarot card readings. Reveal hidden truths, understand life patterns, and receive guidance for your future path.',
  },

  overview: {
    title: 'What is Tarot Card Reading?',
    description:
      'Tarot card reading is a mystical divination practice that uses a deck of symbolic cards to gain insight into your life, emotions, and future possibilities. Each card carries deep spiritual meaning and reflects your subconscious mind, current energies, and life situations. Through intuitive interpretation, tarot helps uncover hidden truths, clarify confusion, and guide you toward the right decisions. It does not predict a fixed future but reveals possibilities and empowers you to shape your own destiny with awareness and wisdom.',
    image: '/assets/service/tarrotreading.png',
  },

  benefits: {
    title: 'Benefits of Tarot Reading',
    description: 'Gain clarity, guidance, and spiritual awareness',
    items: [
      {
        title: 'Life Clarity',
        description: 'Understand your current situation and life direction.',
        icon: 'Visibility',
      },
      {
        title: 'Emotional Insight',
        description: 'Explore your inner feelings and mental state.',
        icon: 'FavoriteBorder',
      },
      {
        title: 'Decision Guidance',
        description: 'Make better decisions with spiritual insights.',
        icon: 'AutoAwesome',
      },
      {
        title: 'Future Possibilities',
        description: 'Discover potential outcomes and opportunities.',
        icon: 'Timeline',
      },
      {
        title: 'Relationship Insight',
        description: 'Understand love, compatibility, and relationship dynamics.',
        icon: 'People',
      },
      {
        title: 'Spiritual Growth',
        description: 'Connect with your higher self and inner wisdom.',
        icon: 'SelfImprovement',
      },
    ],
  },

  process: {
    title: 'Tarot Reading Session Process',
    steps: [
      {
        number: '01',
        title: 'Energy Alignment',
        description: 'Create a calm and focused environment for the reading.',
      },
      {
        number: '02',
        title: 'Question Focus',
        description: 'You set your intention or ask your question.',
      },
      {
        number: '03',
        title: 'Card Shuffling',
        description: 'Cards are shuffled to align with your energy.',
      },
      {
        number: '04',
        title: 'Card Spread',
        description: 'Cards are drawn and placed in a specific spread.',
      },
      {
        number: '05',
        title: 'Interpretation',
        description: 'Reader interprets card meanings and provides guidance.',
      },
    ],
  },

  practices: {
    title: 'Tarot Reading Types',
    description: 'Different tarot spreads and reading styles',
    list: [
      {
        name: 'Single Card Reading',
        meaning: 'Quick insight using one card',
        benefit: 'Immediate clarity',
        use: 'Daily guidance',
      },
      {
        name: 'Three Card Spread',
        meaning: 'Past, Present, Future analysis',
        benefit: 'Simple yet powerful insight',
        use: 'General life questions',
      },
      {
        name: 'Celtic Cross Spread',
        meaning: 'Detailed 10-card spread',
        benefit: 'Deep life analysis',
        use: 'Complex situations',
      },
      {
        name: 'Love Tarot Reading',
        meaning: 'Focused on relationships and emotions',
        benefit: 'Clarity in love life',
        use: 'Romantic concerns',
      },
      {
        name: 'Career Tarot Reading',
        meaning: 'Guidance on career and goals',
        benefit: 'Professional clarity',
        use: 'Job and business decisions',
      },
      {
        name: 'Spiritual Tarot Reading',
        meaning: 'Focus on spiritual path and growth',
        benefit: 'Inner awakening',
        use: 'Self-discovery journey',
      },
    ],
  },

  sessions: {
    title: 'Tarot Reading Sessions',
    types: [
      {
        name: 'Single Question Reading',
        duration: '20 minutes',
        description: 'Get a quick answer to one specific question.',
        price: '₹800',
        originalPrice: '₹1,200',
        includes: [
          'Energy alignment',
          'Card draw',
          'Short interpretation',
          'Quick guidance',
        ],
      },
      {
        name: 'Full Tarot Reading',
        duration: '45 minutes',
        description: 'Detailed reading for life, love, and career.',
        price: '₹2,000',
        originalPrice: '₹3,000',
        includes: [
          'Multiple card spreads',
          'Deep interpretation',
          'Life insights',
          'Guidance and advice',
        ],
      },
      {
        name: 'Love & Relationship Reading',
        duration: '30 minutes',
        description: 'Understand your relationship and emotional connections.',
        price: '₹1,500',
        includes: [
          'Love-focused spread',
          'Partner energy reading',
          'Relationship guidance',
        ],
      },
      {
        name: 'Career & Future Reading',
        duration: '40 minutes',
        description: 'Guidance for career, business, and future goals.',
        price: '₹1,800',
        includes: [
          'Career spread',
          'Opportunity analysis',
          'Future direction',
        ],
      },
    ],
  },

  faq: {
    title: 'Tarot Reading FAQ',
    questions: [
      {
        question: 'Are tarot readings accurate?',
        answer:
          'Tarot readings provide guidance based on current energies and intuition. Accuracy depends on your openness and clarity of intention.',
      },
      {
        question: 'Can tarot predict the future?',
        answer:
          'Tarot shows possibilities and trends, not fixed outcomes. Your choices shape your future.',
      },
      {
        question: 'How should I prepare for a tarot reading?',
        answer:
          'Stay calm, focused, and clear about your question or intention before the session.',
      },
      {
        question: 'Can I ask about someone else?',
        answer:
          'You can ask about relationships, but readings work best when focused on your own energy and situation.',
      },
      {
        question: 'How often should I get a tarot reading?',
        answer:
          'It is recommended to take readings when needed, typically once a month or during major life decisions.',
      },
      {
        question: 'Is tarot reading safe?',
        answer:
          'Yes, tarot is a spiritual guidance tool and completely safe when used positively and responsibly.',
      },
    ],
  },

  cta: {
    title: 'Discover Your Future Through Tarot',
    subtitle: 'Get clarity, guidance, and insight today.',
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