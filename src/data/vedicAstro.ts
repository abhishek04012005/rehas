import { HealingServiceData } from '@/components/healingService/healingService';

export const vedicAstroData: HealingServiceData = {
  hero: {
    title: 'Vedic Astrology',
    subtitle: 'Ancient Hindu System of Cosmic Wisdom',
    description:
      'Explore the depths of Vedic astrology. The most accurate and time-tested astrological system for life guidance and spiritual evolution.',
  },
  overview: {
    title: 'The Science of Vedic Astrology',
    description:
      'Vedic astrology, also known as Jyotisha, is the ancient Indian system of astrology with roots in the Vedas. More precise than Western astrology, it uses the sidereal zodiac and advanced mathematical calculations. Vedic astrology provides detailed insights into past karma, current circumstances, and future possibilities. It guides life decisions, relationships, careers, and spiritual growth.',
    image: '/assets/service/vedic_astrology.png',
  },
  benefits: {
    title: 'Benefits of Vedic Astrology',
    description: 'Gain profound wisdom from the ancient Vedic tradition',
    items: [
      {
        title: 'Accurate Predictions',
        description: 'Get highly precise predictions using proven Vedic methods.',
        icon: 'Visibility',
      },
      {
        title: 'Karma Understanding',
        description: 'Understand your karma and life lessons from past lives.',
        icon: 'Lightbulb',
      },
      {
        title: 'Life Timing',
        description: 'Know auspicious and inauspicious periods for decisions.',
        icon: 'AutoAwesome',
      },
      {
        title: 'Relationship Guidance',
        description: 'Detailed compatibility analysis for marriage and partnerships.',
        icon: 'Favorite',
      },
      {
        title: 'Career Planning',
        description: 'Identify optimal career path and professional opportunities.',
        icon: 'SelfImprovement',
      },
      {
        title: 'Spiritual Growth',
        description: 'Understand your spiritual purpose and destiny.',
        icon: 'FlashOn',
      },
    ],
  },
  process: {
    title: 'Vedic Astrology Analysis Process',
    steps: [
      {
        number: '01',
        title: 'Birth Details',
        description: 'Collect exact birth date, time, and location.',
      },
      {
        number: '02',
        title: 'Chart Calculation',
        description: 'Calculate natal chart using Vedic mathematical methods.',
      },
      {
        number: '03',
        title: 'Deep Analysis',
        description: 'Analyze all chart elements using Vedic principles.',
      },
      {
        number: '04',
        title: 'Remedies & Guidance',
        description: 'Provide remedies and guidance for optimal life path.',
      },
    ],
  },
  practices: {
    title: 'Vedic Astrology Methods',
    description: 'Advanced techniques used in Vedic astrological analysis',
    list: [
      {
        name: 'Dasha System',
        meaning: 'Planetary periods determining life timing and events',
        benefit: 'Predict specific events and their exact timing',
        use: 'Life event forecasting',
      },
      {
        name: 'Yoga Analysis',
        meaning: 'Combinations of planets creating specific patterns',
        benefit: 'Understand complex life circumstances and patterns',
        use: 'Character and destiny analysis',
      },
      {
        name: 'Transit Astrology',
        meaning: 'Movement of planets affecting your current chart',
        benefit: 'Understand current influences and opportunities',
        use: 'Annual forecasts and planning',
      },
      {
        name: 'Guna Milan',
        meaning: 'Compatibility matching for marriage',
        benefit: 'Ensure relationship success and harmony',
        use: 'Marriage compatibility analysis',
      },
      {
        name: 'Remedial Measures',
        meaning: 'Vedic remedies to mitigate negative influences',
        benefit: 'Reduce challenges and enhance positive effects',
        use: 'Problem solving and life improvement',
      },
      {
        name: 'Spiritual Astrology',
        meaning: 'Understanding karmic patterns and soul purpose',
        benefit: 'Connect with spiritual path and destiny',
        use: 'Spiritual guidance and evolution',
      },
    ],
  },
  sessions: {
    title: 'Vedic Astrology Services',
    types: [
      {
        name: 'Birth Chart Reading',
        duration: '60 Minutes',
        price: '₹2,500',
        originalPrice: '₹3,750',
        description: 'Complete Vedic natal chart interpretation.',
        includes: [
          'Detailed chart analysis',
          'Personality assessment',
          'Life patterns identification',
          'Guidance for decisions',
        ],
      },
      {
        name: 'Comprehensive Analysis',
        duration: '90 Minutes',
        price: '₹4,000',
        originalPrice: '₹6,000',
        description: 'In-depth Vedic analysis with all major techniques.',
        includes: [
          'Complete natal chart analysis',
          'Dasha periods and predictions',
          'Yoga analysis',
          'Relationship and career insights',
          'Remedies and recommendations',
        ],
      },
      {
        name: 'Complete Life Consultation',
        duration: '2 Hours + Follow-up',
        price: '₹6,500',
        originalPrice: '₹9,750',
        description: 'Comprehensive life guidance with detailed analysis.',
        includes: [
          'Ultra-detailed chart analysis',
          'All Vedic techniques applied',
          'Life mapping for next 10 years',
          'Relationship compatibility analysis',
          'Career and financial guidance',
          'Spiritual path identification',
          '30-day follow-up support',
        ],
      },
    ],
  },
  faq: {
    title: 'Vedic Astrology FAQ',
    questions: [
      {
        question: 'How is Vedic astrology different from Western?',
        answer:
          'Vedic astrology uses the sidereal zodiac and is more mathematically precise. It includes advanced techniques like Dashas for event timing.',
      },
      {
        question: 'How accurate is Vedic astrology?',
        answer:
          'When done by qualified practitioners with accurate birth data, Vedic astrology is highly accurate in predicting events and timing.',
      },
      {
        question: 'What if I don\'t have exact birth time?',
        answer:
          'While exact time is ideal, we can estimate it from life events. Vedic analysis still provides valuable insights.',
      },
      {
        question: 'Can Vedic astrology change my destiny?',
        answer:
          'Vedic astrology shows probabilities and karmic patterns. While destiny exists, your choices influence outcomes. Remedies help optimize results.',
      },
      {
        question: 'What are Vedic remedies?',
        answer:
          'Remedies include wearing gemstones, performing rituals, chanting mantras, and specific actions to mitigate negative influences.',
      },
      {
        question: 'Is Vedic astrology spiritual or scientific?',
        answer:
          'Vedic astrology combines science, mathematics, and spirituality. It\'s based on observable celestial mechanics and spiritual principles.',
      },
    ],
  },
  cta: {
    title: 'Explore Your Vedic Chart',
    subtitle: 'Get a detailed Vedic astrology analysis and unlock your life purpose.',
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
