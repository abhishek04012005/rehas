import { HealingServiceData } from '@/components/healingService/healingService';

export const palmReadingData: HealingServiceData = {
  hero: {
    title: 'Palm Reading',
    subtitle: 'Discover Your Destiny Written in Your Hands',
    description:
      'Unlock the secrets of your past, present, and future through ancient palm reading wisdom. Your hands hold the map of your life journey, revealing personality, relationships, health, and destiny.',
  },
  overview: {
    title: 'What is Palm Reading?',
    description:
      'Palm reading, also known as palmistry or chiromancy, is an ancient divination art that interprets the lines, mounts, and marks on your hands to reveal your life story. Each line, curve, and mark represents different aspects of your life—career, relationships, health, spirituality, and destiny. The art combines ancient wisdom from Indian, Chinese, and Western traditions to provide comprehensive life insights. A skilled palm reader can perceive past patterns, current situations, and future possibilities with remarkable accuracy.',
    image: '/assets/service/palm_reading1.png',
  },
  benefits: {
    title: 'Benefits of Palm Reading',
    description: 'Understand your life path and future possibilities',
    items: [
      {
        title: 'Life Direction',
        description: 'Gain clarity on your life purpose and direction.',
        icon: 'Terrain',
      },
      {
        title: 'Relationship Insights',
        description: 'Understand love, marriage, and relationship patterns.',
        icon: 'FavoriteBorder',
      },
      {
        title: 'Career Guidance',
        description: 'Discover your ideal career path and success timing.',
        icon: 'PublicOutlined',
      },
      {
        title: 'Health Awareness',
        description: 'Learn about health patterns and wellness needs.',
        icon: 'MedicalInformation',
      },
      {
        title: 'Past Understanding',
        description: 'Understand patterns that shaped your current life.',
        icon: 'AccountBalance',
      },
      {
        title: 'Future Possibilities',
        description: 'See potential futures and make empowered choices.',
        icon: 'AutoAwesome',
      },
    ],
  },
  process: {
    title: 'Palm Reading Session Process',
    steps: [
      {
        number: '01',
        title: 'Hand Analysis',
        description: 'Examine both hands to understand your complete picture.',
      },
      {
        number: '02',
        title: 'Line Interpretation',
        description: 'Read and interpret the lines of destiny, heart, and head.',
      },
      {
        number: '03',
        title: 'Mount Assessment',
        description: 'Analyze the mounts under each finger for qualities.',
      },
      {
        number: '04',
        title: 'Mark Analysis',
        description: 'Interpret symbols, crosses, stars, and marks on palms.',
      },
      {
        number: '05',
        title: 'Guidance Delivery',
        description: 'Receive comprehensive insights and future guidance.',
      },
    ],
  },
  practices: {
    title: 'Palm Reading Systems',
    description: 'Different traditions and interpretive approaches',
    list: [
      {
        name: 'Life Line Reading',
        meaning: 'Interpretation of the arc from thumb to wrist',
        benefit: 'Understanding longevity, vitality, and major life events',
        use: 'Health assessment and life timeline mapping',
      },
      {
        name: 'Heart Line Reading',
        meaning: 'Analysis of emotional and romantic patterns',
        benefit: 'Relationship insights and emotional patterns',
        use: 'Love and marriage guidance',
      },
      {
        name: 'Head Line Reading',
        meaning: 'Interpretation of intellectual and thinking patterns',
        benefit: 'Understanding intelligence, decision-making style',
        use: 'Career and mental health guidance',
      },
      {
        name: 'Fate Line Reading',
        meaning: 'Analysis of destiny and career path',
        benefit: 'Career clarity and destiny understanding',
        use: 'Professional direction and success timing',
      },
      {
        name: 'Mount Analysis',
        meaning: 'Examination of elevated areas under each finger',
        benefit: 'Personality trait and strength identification',
        use: 'Complete character understanding',
      },
      {
        name: 'Hand Shape Interpretation',
        meaning: 'Classification and analysis of hand type',
        benefit: 'Natural talents and life purpose revelation',
        use: 'Overall life direction and potential',
      },
    ],
  },
  sessions: {
    title: 'Palm Reading Sessions',
    types: [
      {
        name: 'Basic Hand Reading',
        duration: '30 minutes',
        description: 'Quick overview of your life lines and destiny.',
        price: '₹1,200',
        originalPrice: '₹1,800',
        includes: [
          'Hand analysis',
          'Main lines interpretation',
          'Basic insights',
          'Written summary',
        ],
      },
      {
        name: 'Comprehensive Reading',
        duration: '60 minutes',
        description: 'Deep analysis of all lines, mounts, and patterns.',
        price: '₹2,500',
        originalPrice: '₹3,750',
        includes: [
          'Complete hand assessment',
          'All line interpretations',
          'Mount analysis',
          'Symbol and mark reading',
          'Detailed report',
        ],
      },
      {
        name: 'Life Path Guidance',
        duration: '90 minutes',
        description: 'Extended reading with specific life area focus.',
        price: '₹4,000',
        includes: [
          'Full palm reading',
          'Specific life area deep dive',
          'Timeline insights',
          'Guidance and recommendations',
          'Follow-up support',
        ],
      },
      {
        name: 'Twin Hand Comparison',
        duration: '60 minutes',
        description: 'Compare both hands for complete picture.',
        price: '₹2,800',
        includes: [
          'Both hand analysis',
          'Dominance and personality aspects',
          'Conscious vs subconscious patterns',
          'Complete life overview',
        ],
      },
    ],
  },
  faq: {
    title: 'Palm Reading FAQ',
    questions: [
      {
        question: 'How accurate is palm reading?',
        answer:
          'With a skilled reader, palm reading is remarkably accurate. Studies show 70-85% accuracy when the reader interprets multiple elements together.',
      },
      {
        question: 'Can palm reading predict the exact future?',
        answer:
          'Palm reading shows tendencies and possibilities rather than fixed futures. Your choices shape outcomes, but your hands reveal the underlying patterns.',
      },
      {
        question: 'Which hand should be read?',
        answer:
          'Generally, the dominant hand shows current and future, while the non-dominant hand shows innate qualities. Both provide complete understanding.',
      },
      {
        question: 'Can lines change over time?',
        answer:
          'Yes! Lines can become deeper, fade, or shift based on life changes and conscious choices. This reflects your evolving destiny.',
      },
      {
        question: 'Is palm reading related to astrology?',
        answer:
          'They are complementary systems. Astrology looks at cosmic patterns, while palmistry reads personal life patterns written in your hands.',
      },
      {
        question: 'What if my lines are not clear?',
        answer:
          'Every hand tells a story. Faint lines have meaning, and skilled readers can interpret all hand characteristics accurately.',
      },
    ],
  },
  cta: {
    title: 'Unlock Your Destiny Through Your Hands',
    subtitle: 'Discover what your palms reveal about your life.',
    buttons: [
      {
        label: 'Book Palm Reading',
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
