import { HealingServiceData } from '@/components/healingService/healingService';

export const astroReportData: HealingServiceData = {
  hero: {
    title: 'Astro Report',
    subtitle: 'Understand Your Cosmic Blueprint',
    description:
      'Discover the influence of celestial bodies on your life through detailed astrological analysis. Our comprehensive astro reports provide insights into your personality, destiny, and future possibilities.',
  },
  overview: {
    title: 'What is an Astro Report?',
    description:
      'An Astro Report is a detailed astrological analysis based on your birth data. It reveals the positions of celestial bodies at your birth and their influence on your personality, relationships, career, and life path. Our expert astrologers create personalized reports that offer profound insights and guidance for your future.',
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=500&h=400&fit=crop',
  },
  benefits: {
    title: 'Benefits of Your Astro Report',
    description: 'Gain cosmic insights to navigate life with greater awareness',
    items: [
      {
        title: 'Self-Understanding',
        description: 'Understand your inherent personality traits and natural talents.',
        icon: 'Visibility',
      },
      {
        title: 'Future Predictions',
        description: 'Get insights into upcoming opportunities and challenges.',
        icon: 'Lightbulb',
      },
      {
        title: 'Relationship Compatibility',
        description: 'Understand relationship dynamics and compatibility with partners.',
        icon: 'Favorite',
      },
      {
        title: 'Career Guidance',
        description: 'Discover your ideal career path and professional opportunities.',
        icon: 'AutoAwesome',
      },
      {
        title: 'Life Purpose',
        description: 'Uncover your life purpose and spiritual destiny.',
        icon: 'FlashOn',
      },
      {
        title: 'Timing Guidance',
        description: 'Learn auspicious timings for important life decisions.',
        icon: 'Brightness3',
      },
    ],
  },
  process: {
    title: 'Astro Report Process',
    steps: [
      {
        number: '01',
        title: 'Birth Information Collection',
        description: 'Provide your exact birth date, time, and location.',
      },
      {
        number: '02',
        title: 'Chart Calculation',
        description: 'Our astrologers calculate your unique natal chart using astronomical data.',
      },
      {
        number: '03',
        title: 'In-Depth Analysis',
        description: 'Detailed interpretation of your chart, planets, houses, and aspects.',
      },
      {
        number: '04',
        title: 'Personalized Report',
        description: 'Receive a comprehensive written report with insights and recommendations.',
      },
    ],
  },
  sessions: {
    title: 'Astro Report Services',
    types: [
      {
        name: 'Basic Astro Report',
        duration: '15 Pages',
        price: '₹2,000',
        description: 'Essential astrological insights covering your sun, moon, and rising signs.',
        includes: [
          'Natal chart interpretation',
          'Sun, moon, and rising sign analysis',
          'Planet positions and meanings',
          'Basic future predictions',
        ],
      },
      {
        name: 'Comprehensive Astro Report',
        duration: '25 Pages',
        price: '₹3,500',
        description: 'Detailed analysis including houses, aspects, and life areas.',
        includes: [
          'Complete natal chart analysis',
          'House-wise interpretations',
          'Planetary aspects analysis',
          'Career and relationship insights',
          '1-year predictions',
        ],
      },
      {
        name: 'Premium Astro Report with Consultation',
        duration: '35 Pages + 1 Hour Consultation',
        price: '₹5,500',
        description: 'Complete analysis with detailed consultation and personalized guidance.',
        includes: [
          'Ultra-detailed natal chart analysis',
          'All planetary combinations',
          'Advanced techniques applied',
          '2-year detailed predictions',
          '1-hour expert consultation',
          'Remedies and guidance',
        ],
      },
    ],
  },
  faq: {
    title: 'Astro Report FAQ',
    questions: [
      {
        question: 'Why is exact birth time important?',
        answer:
          'Exact birth time is crucial for calculating your rising sign and house positions accurately. Even small differences in time can significantly change your chart interpretation.',
      },
      {
        question: 'Can astrology predict my future accurately?',
        answer:
          'Astrology provides probabilities and tendencies based on cosmic influences. While it offers valuable insights, your free will and choices also shape your destiny.',
      },
      {
        question: 'How long is the report?',
        answer:
          'Report length varies by type: Basic (15 pages), Comprehensive (25 pages), Premium (35+ pages). Longer reports provide more detailed insights.',
      },
      {
        question: 'Can I use my astro report for relationship matching?',
        answer:
          'Yes! Our astro reports include relationship compatibility insights. We can also provide specialized synastry analysis for comparing charts between two people.',
      },
      {
        question: 'What if my birth time is unknown?',
        answer:
          'While an exact time is ideal, we can provide valuable insights with just your birth date and location. We can also estimate your birth time if you provide certain life events.',
      },
      {
        question: 'How often should I get an astro report?',
        answer:
          'Your natal chart remains constant throughout life. However, annual reports tracking transits and progressions can offer yearly insights and guidance.',
      },
    ],
  },
  cta: {
    title: 'Discover Your Cosmic Blueprint',
    subtitle: 'Get your personalized astro report and unlock cosmic insights about your life.',
    buttons: [
      {
        label: 'Order Astro Report',
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
