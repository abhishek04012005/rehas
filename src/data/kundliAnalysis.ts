import { HealingServiceData } from '@/components/healingService/healingService';

export const kundliAnalysisData: HealingServiceData = {
  hero: {
    title: 'Kundli Analysis',
    subtitle: 'Decode Your Destiny Through Vedic Astrology',
    description:
      'Unlock the secrets of your life through comprehensive Kundli (birth chart) analysis. Our expert Vedic astrologers provide deep insights into your personality, life events, and spiritual path.',
  },
  overview: {
    title: 'What is Kundli Analysis?',
    description:
      'Kundli, also known as birth chart or horoscope, is the foundation of Vedic astrology. It represents the positions of celestial bodies at your moment of birth. A detailed Kundli analysis reveals your inherent nature, life patterns, challenges, and opportunities. It serves as a cosmic mirror reflecting your destiny and life purpose.',
    image: 'https://images.unsplash.com/photo-1505249585337-5b82c48fa8e6?w=500&h=400&fit=crop',
  },
  benefits: {
    title: 'Transform Your Life With Kundli Analysis',
    description: 'Gain profound understanding through Vedic astrological insights',
    items: [
      {
        title: 'Self-Awareness',
        description: 'Discover your true nature, strengths, and areas for growth.',
        icon: 'Visibility',
      },
      {
        title: 'Marriage Compatibility',
        description: 'Analyze Guna Milan and relationship compatibility for marriage.',
        icon: 'Favorite',
      },
      {
        title: 'Career Path',
        description: 'Identify your most suitable career and professional opportunities.',
        icon: 'AutoAwesome',
      },
      {
        title: 'Health Insights',
        description: 'Understand health tendencies and preventive measures.',
        icon: 'Lightbulb',
      },
      {
        title: 'Financial Guidance',
        description: 'Get insights into wealth patterns and financial opportunities.',
        icon: 'FlashOn',
      },
      {
        title: 'Spiritual Path',
        description: 'Uncover your spiritual destiny and karmic lessons.',
        icon: 'Brightness3',
      },
    ],
  },
  process: {
    title: 'Kundli Analysis Process',
    steps: [
      {
        number: '01',
        title: 'Birth Details Collection',
        description: 'Provide complete birth information - date, time, and location.',
      },
      {
        number: '02',
        title: 'Kundli Chart Creation',
        description: 'Our experts create your detailed Kundli chart using Vedic methods.',
      },
      {
        number: '03',
        title: 'In-Depth Analysis',
        description: 'Comprehensive interpretation of all chart elements and planetary influences.',
      },
      {
        number: '04',
        title: 'Recommendations',
        description: 'Receive specific remedies, timing guidance, and life recommendations.',
      },
    ],
  },
  sessions: {
    title: 'Kundli Analysis Services',
    types: [
      {
        name: 'Basic Kundli Analysis',
        duration: '20 Pages',
        price: '₹2,500',
        description: 'Essential Kundli interpretation covering major life aspects.',
        includes: [
          'Birth chart creation',
          'Planet positions analysis',
          'House interpretation',
          'Basic future outlook',
          'Simple remedies',
        ],
      },
      {
        name: 'Detailed Kundli Analysis',
        duration: '30 Pages',
        price: '₹4,000',
        description: 'Comprehensive Kundli analysis with in-depth interpretations.',
        includes: [
          'Complete Kundli chart analysis',
          'Dashas and planetary periods',
          'Life events prediction',
          'Relationship compatibility',
          'Career and financial insights',
          'Health analysis',
          'Vedic remedies',
        ],
      },
      {
        name: 'Premium Kundli with Consultation',
        duration: '40 Pages + 90 Min Consultation',
        price: '₹6,500',
        description: 'Ultra-detailed analysis with expert consultation and personalized guidance.',
        includes: [
          'Ultra-detailed Kundli analysis',
          'Advanced Vedic techniques',
          'Complete life mapping',
          'Guna Milan for marriage',
          'Professional guidance',
          '90-minute expert consultation',
          'Customized remedies and rituals',
          'Follow-up support',
        ],
      },
    ],
  },
  faq: {
    title: 'Kundli Analysis FAQ',
    questions: [
      {
        question: 'What is the difference between Kundli and astro report?',
        answer:
          'Kundli is based on Vedic astrology and includes deeper analysis using Dashas, Yogas, and advanced techniques. Astro reports use Western astrology methods. Both are valuable but use different frameworks.',
      },
      {
        question: 'Is Kundli matching necessary for marriage?',
        answer:
          'In Indian tradition, Kundli matching (Guna Milan) is considered important for relationship success. It analyzes compatibility across multiple dimensions. We provide detailed matching analysis for prospective couples.',
      },
      {
        question: 'Can Kundli predict exact life events?',
        answer:
          'Kundli reveals probabilities and general timings of life events based on planetary periods. Exact predictions depend on multiple factors and individual karma. It provides guidance, not certainty.',
      },
      {
        question: 'What are Dashas in Kundli?',
        answer:
          'Dashas are planetary periods in Vedic astrology. They show which planets influence your life during specific time periods. Understanding Dashas helps predict favorable and challenging periods.',
      },
      {
        question: 'Are Kundli remedies effective?',
        answer:
          'Vedic remedies (Upaya) work by harmonizing with planetary influences. Their effectiveness depends on sincere practice, faith, and consistency. We recommend remedies best suited to your Kundli.',
      },
      {
        question: 'How is marriage matching done?',
        answer:
          'Marriage matching involves analyzing both Kundlis for Guna (compatibility), Mangal Dosha, Dasha compatibility, and other factors. Higher Guna count indicates better compatibility.',
      },
    ],
  },
  cta: {
    title: 'Unveil Your Destiny With Kundli',
    subtitle: 'Get your detailed Kundli analysis and discover your life path through Vedic wisdom.',
    buttons: [
      {
        label: 'Get Kundli Analysis',
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
