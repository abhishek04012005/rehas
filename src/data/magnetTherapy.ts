import { HealingServiceData } from '@/components/healingService/healingService';

export const magnetTherapyData: HealingServiceData = {
  hero: {
    title: 'Magnet Therapy',
    subtitle: 'Healing Power of Magnetic Energy',
    description:
      'Experience natural healing through magnetic therapy. Magnetic fields promote cellular health, reduce inflammation, and support your body\'s natural healing processes.',
  },
  overview: {
    title: 'What is Magnet Therapy?',
    description:
      'Magnet therapy is a natural healing method that uses magnetic fields to promote health and well-being. By applying magnets to specific areas of the body, we enhance circulation, reduce inflammation, and accelerate healing. Based on the principle that biomagnetic balance is essential for health, magnet therapy addresses various conditions without side effects. This safe, non-invasive therapy complements conventional medicine.',
    image: '/assets/service/magnet_therapy.png',
  },
  benefits: {
    title: 'Benefits of Magnet Therapy',
    description: 'Experience natural healing through magnetic field therapy',
    items: [
      {
        title: 'Pain Reduction',
        description: 'Effective for arthritis, muscle pain, and joint discomfort.',
        icon: 'FavoriteBorder',
      },
      {
        title: 'Improved Circulation',
        description: 'Enhance blood flow and oxygen delivery to tissues.',
        icon: 'Brightness3',
      },
      {
        title: 'Inflammation Control',
        description: 'Reduce swelling and inflammation naturally.',
        icon: 'AutoAwesome',
      },
      {
        title: 'Faster Healing',
        description: 'Accelerate recovery from injuries and wounds.',
        icon: 'Lightbulb',
      },
      {
        title: 'Sleep Improvement',
        description: 'Better sleep quality and reduced sleep disturbances.',
        icon: 'Brightness3',
      },
      {
        title: 'Energy Boost',
        description: 'Increase vitality and reduce fatigue naturally.',
        icon: 'SelfImprovement',
      },
    ],
  },
  process: {
    title: 'Magnet Therapy Application Process',
    steps: [
      {
        number: '01',
        title: 'Assessment',
        description: 'Evaluate your condition and determine magnetic strength needed.',
      },
      {
        number: '02',
        title: 'Point Selection',
        description: 'Identify specific areas where magnets will be applied.',
      },
      {
        number: '03',
        title: 'Magnet Application',
        description: 'Place therapeutic magnets on targeted areas with proper positioning.',
      },
      {
        number: '04',
        title: 'Monitoring',
        description: 'Regular follow-ups to track progress and adjust treatment.',
      },
    ],
  },
  practices: {
    title: 'Magnet Therapy Methods',
    description: 'Different magnet therapy approaches and applications',
    list: [
      {
        name: 'Static Magnets',
        meaning: 'Permanent magnets applied directly to the body',
        benefit: 'Continuous healing field for pain relief',
        use: 'Chronic pain and long-term healing',
      },
      {
        name: 'Pulsed Magnetic Fields',
        meaning: 'Alternating magnetic fields applied therapeutically',
        benefit: 'Enhanced cellular activity and healing',
        use: 'Acute injuries and faster recovery',
      },
      {
        name: 'Magnetic Jewellery',
        meaning: 'Wearable magnets in bracelets, necklaces, or rings',
        benefit: 'Continuous therapeutic support',
        use: 'Daily wellness and prevention',
      },
      {
        name: 'Magnetic Beds/Pillows',
        meaning: 'Magnetized sleeping surfaces',
        benefit: 'Nighttime healing and sleep support',
        use: 'Sleep quality and overnight recovery',
      },
      {
        name: 'Magnetic Therapy Wraps',
        meaning: 'Adjustable wraps with embedded magnets',
        benefit: 'Targeted pain relief for joints',
        use: 'Joint pain and local inflammation',
      },
      {
        name: 'Full Body Magnetic Therapy',
        meaning: 'Whole-body magnetic field exposure',
        benefit: 'Complete systemic healing and balance',
        use: 'Overall wellness and prevention',
      },
    ],
  },
  sessions: {
    title: 'Magnet Therapy Programs',
    types: [
      {
        name: 'Single Area Treatment',
        duration: '30 Minutes',
        price: '₹1,000',
        description: 'Targeted magnet therapy for specific pain area.',
        includes: [
          'Problem area assessment',
          'Magnet placement and positioning',
          'Pain relief application',
          'Home care instructions',
        ],
      },
      {
        name: 'Full Body Session',
        duration: '60 Minutes',
        price: '₹2,000',
        description: 'Complete full-body magnetic therapy treatment.',
        includes: [
          'Full-body assessment',
          'Multi-area treatment',
          'Whole-system balancing',
          'Home magnet recommendation',
        ],
      },
      {
        name: 'Healing Package',
        duration: '8 Sessions (45 Min Each)',
        price: '₹12,000',
        description: 'Comprehensive magnet therapy program for chronic conditions.',
        includes: [
          'Personalized assessment',
          'Progressive magnetic treatments',
          'Magnetic jewellery recommendation',
          'Home therapy magnets',
          'Lifestyle guidance',
          '60-day follow-up support',
          'Progress tracking',
        ],
      },
    ],
  },
  faq: {
    title: 'Magnet Therapy FAQ',
    questions: [
      {
        question: 'Is magnet therapy scientifically proven?',
        answer:
          'Research supports magnet therapy for pain relief and healing acceleration. While more studies are ongoing, many patients experience significant benefits.',
      },
      {
        question: 'Are there any side effects?',
        answer:
          'Magnet therapy is safe and non-invasive with minimal side effects. Some people may experience mild tingling as the body adjusts.',
      },
      {
        question: 'Who should avoid magnet therapy?',
        answer:
          'People with pacemakers or other electronic implants should avoid magnet therapy. Pregnant women should consult their doctor. Always inform us of medical devices.',
      },
      {
        question: 'How long does it take to see results?',
        answer:
          'Many people feel relief within hours to days. Chronic conditions may take 2-4 weeks for significant improvement. Consistency is important.',
      },
      {
        question: 'Can I use magnets with other treatments?',
        answer:
          'Yes, magnet therapy complements other treatments well. It works alongside medications and physical therapy. Always inform your doctor.',
      },
      {
        question: 'Can I wear magnets while sleeping?',
        answer:
          'Yes, many people benefit from wearing magnets or sleeping on magnetic mattresses overnight. This provides continuous healing support.',
      },
    ],
  },
  cta: {
    title: 'Harness the Healing Power of Magnets',
    subtitle: 'Start magnet therapy and experience natural pain relief and healing.',
    buttons: [
      {
        label: 'Begin Magnet Therapy',
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
