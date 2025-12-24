import { HealingServiceData } from '@/components/healingService/healingService';

export const marmaTherapyData: HealingServiceData = {
  hero: {
    title: 'Marma Therapy',
    subtitle: 'Ancient Ayurvedic Vital Point Healing',
    description:
      'Unlock the healing power of Marma points. Marma therapy balances your vital energy, releases blockages, and restores harmony to your physical and emotional body.',
  },
  overview: {
    title: 'What is Marma Therapy?',
    description:
      'Marma therapy is an ancient Ayurvedic healing technique that works with 108 vital points (marmas) located throughout the body. These points are where the five elements (earth, water, fire, air, space) intersect and where vital life force (prana) concentrates. By applying specific techniques to these points, marma therapy releases physical and emotional blockages, restores energy flow, and promotes deep healing. This powerful therapy addresses the root causes of disease by balancing doshas (body constitutions) and restoring the mind-body connection.',
    image: 'https://images.unsplash.com/photo-1549465820-7c41f1c20407?w=500&h=400&fit=crop',
  },
  benefits: {
    title: 'Benefits of Marma Therapy',
    description: 'Heal through the ancient wisdom of vital point therapy',
    items: [
      {
        title: 'Energy Release',
        description: 'Free trapped energy and restore vital prana flow.',
        icon: 'FavoriteBorder',
      },
      {
        title: 'Deep Relaxation',
        description: 'Achieve profound states of peace and rejuvenation.',
        icon: 'Brightness3',
      },
      {
        title: 'Emotional Healing',
        description: 'Release stored emotions and trauma patterns.',
        icon: 'AutoAwesome',
      },
      {
        title: 'Pain Management',
        description: 'Alleviate chronic and acute pain naturally.',
        icon: 'Lightbulb',
      },
      {
        title: 'Immune Support',
        description: 'Strengthen immunity and prevent disease.',
        icon: 'Shield',
      },
      {
        title: 'Dosha Balance',
        description: 'Restore your unique constitutional balance.',
        icon: 'SelfImprovement',
      },
    ],
  },
  process: {
    title: 'Marma Therapy Session Process',
    steps: [
      {
        number: '01',
        title: 'Consultation',
        description: 'We assess your constitution (dosha), health concerns, and goals.',
      },
      {
        number: '02',
        title: 'Assessment',
        description: 'Identify blocked marma points and energy imbalances.',
      },
      {
        number: '03',
        title: 'Treatment',
        description: 'Apply therapeutic techniques to activate healing marma points.',
      },
      {
        number: '04',
        title: 'Integration',
        description: 'Rest and allow the healing energy to integrate into your system.',
      },
      {
        number: '05',
        title: 'Guidance',
        description: 'Receive personalized recommendations for sustained wellness.',
      },
    ],
  },
  practices: {
    title: 'Marma Therapy Techniques',
    description: 'Time-tested Ayurvedic methods for profound healing',
    list: [
      {
        name: 'Abhyanga Marma',
        meaning: 'Oil massage combined with marma point activation',
        benefit: 'Deep relaxation and energy restoration',
        use: 'General wellness and chronic pain relief',
      },
      {
        name: 'Shirodhara Marma',
        meaning: 'Herbal oil drip with marma balancing for mind clarity',
        benefit: 'Mental clarity and emotional balance',
        use: 'Stress relief and mental health',
      },
      {
        name: 'Marma Chikitsa',
        meaning: 'Direct vital point therapy using hands and specialized tools',
        benefit: 'Targeted healing of specific areas',
        use: 'Acute and chronic conditions',
      },
      {
        name: 'Pinda Sweda Marma',
        meaning: 'Herbal bolus therapy applied to marma points',
        benefit: 'Localized heat therapy and pain relief',
        use: 'Joint pain and muscle tension',
      },
      {
        name: 'Marma Nasya',
        meaning: 'Herbal oil application through nasal passages for head marmas',
        benefit: 'Head and sinus healing',
        use: 'Sinusitis and headache relief',
      },
      {
        name: 'Chakra Marma',
        meaning: 'Work with chakra centers and their corresponding marma points',
        benefit: 'Energy alignment and spiritual healing',
        use: 'Holistic wellness and transformation',
      },
    ],
  },
  sessions: {
    title: 'Marma Therapy Training & Certification',
    types: [
      {
        name: 'Marma Therapy Basic & Practice Course',
        duration: 'Foundation & Intermediate Level',
        price: '₹10,000',
        originalPrice: '₹15,000',
        description: 'Comprehensive marma therapy training from fundamentals to professional practice.',
        includes: [
          'Ayurvedic principles and marma philosophy',
          'Anatomy of 108 vital marma points',
          'Assessment and diagnostics',
          'Traditional marma therapy techniques',
          'Hands-on practice and case studies',
          'Professional practice protocols',
          'Certification in Marma Therapy',
        ],
      },
    ],
  },
  faq: {
    title: 'Marma Therapy FAQ',
    questions: [
      {
        question: 'What does marma mean?',
        answer:
          'Marma means "vital point" or "weak point" in Sanskrit. These 108 points are where vital energy (prana) concentrates and where disease can enter the body.',
      },
      {
        question: 'Is marma therapy painful?',
        answer:
          'Marma therapy should not be painful, though some points may be sensitive initially. Your therapist will work within your comfort level to release blockages gently.',
      },
      {
        question: 'How long does marma healing take?',
        answer:
          'While many feel relief in one session, sustained benefits typically develop over 3-6 sessions. Chronic conditions may benefit from ongoing treatment.',
      },
      {
        question: 'Can marma therapy help emotional issues?',
        answer:
          'Yes! Marmas hold physical, emotional, and spiritual energy. Marma therapy is excellent for releasing trapped emotions and trauma patterns.',
      },
      {
        question: 'Who should avoid marma therapy?',
        answer:
          'Marma therapy is generally safe, but inform your therapist of pregnancy, recent surgery, or serious medical conditions requiring modifications.',
      },
      {
        question: 'How often should I receive marma therapy?',
        answer:
          'This depends on your condition and goals. Acute issues may benefit from weekly sessions, while maintenance wellness typically requires monthly treatments.',
      },
    ],
  },
  cta: {
    title: 'Transform Your Life with Marma Therapy',
    subtitle: 'Unlock your vital energy and achieve deep healing today.',
    buttons: [
      {
        label: 'Book Marma Therapy',
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
