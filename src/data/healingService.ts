import { HealingServiceData } from '@/components/healingService/healingService';

export const healingServiceData: HealingServiceData = {
  hero: {
    title: 'Healing Services',
    subtitle: 'Holistic Wellness Through Ancient Wisdom',
    description:
      'Explore our comprehensive range of healing services including Reiki, Mantra, and Tantra practices. Each service is designed to balance your energy, promote wellness, and guide you towards spiritual transformation.',
  },
  overview: {
    title: 'Discover Your Path to Healing',
    description:
      'Our healing services combine ancient wisdom with modern holistic approaches. Whether you seek energy balance, spiritual growth, or emotional healing, we offer personalized healing sessions tailored to your unique needs. Each practice is grounded in tradition and delivered by certified practitioners.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=400&fit=crop',
  },
  benefits: {
    title: 'Transform Your Life Through Healing',
    description: 'Experience the profound benefits of holistic healing practices',
    items: [
      {
        title: 'Energy Balance',
        description: 'Restore harmony and balance to your physical, mental, and spiritual energy.',
        icon: 'Brightness3',
      },
      {
        title: 'Stress Relief',
        description: 'Release tension and stress, promoting deep relaxation and peace.',
        icon: 'SelfImprovement',
      },
      {
        title: 'Emotional Healing',
        description: 'Process emotions and heal from past trauma with compassionate guidance.',
        icon: 'Favorite',
      },
      {
        title: 'Spiritual Growth',
        description: 'Deepen your spiritual connection and awaken your inner consciousness.',
        icon: 'AutoAwesome',
      },
      {
        title: 'Enhanced Wellness',
        description: 'Improve overall health and well-being on all levels.',
        icon: 'Lightbulb',
      },
      {
        title: 'Inner Peace',
        description: 'Cultivate lasting peace, clarity, and inner tranquility.',
        icon: 'FavoriteBorder',
      },
    ],
  },
  process: {
    title: 'Your Healing Journey',
    steps: [
      {
        number: '01',
        title: 'Assessment',
        description: 'We understand your healing needs and goals through a detailed initial consultation.',
      },
      {
        number: '02',
        title: 'Customization',
        description: 'Select the healing modality that resonates with you - Reiki, Mantra, or Tantra.',
      },
      {
        number: '03',
        title: 'Treatment',
        description: 'Receive your personalized healing session in a peaceful, supportive environment.',
      },
      {
        number: '04',
        title: 'Integration',
        description: 'Learn practices to maintain your healing and continue your wellness journey.',
      },
    ],
  },
  sessions: {
    title: 'Healing Service Options',
    types: [
      {
        name: 'Reiki Healing',
        duration: '60 Minutes',
        price: '₹2,500',
        description: 'Japanese energy healing to balance chakras and promote wellness.',
        includes: [
          'Chakra assessment',
          'Full body energy healing',
          'Chakra balancing',
          'Relaxation guidance',
        ],
      },
      {
        name: 'Mantra Practice',
        duration: '75 Minutes',
        price: '₹3,000',
        description: 'Sacred chanting and mantra meditation for spiritual transformation.',
        includes: [
          'Personalized mantra selection',
          'Guided chanting session',
          'Meditation practice',
          'Home practice guidance',
        ],
      },
      {
        name: 'Tantra Session',
        duration: '90 Minutes',
        price: '₹3,500',
        description: 'Ancient tantric practices for consciousness expansion and energy work.',
        includes: [
          'Tantric assessment',
          'Energy activation practices',
          'Guided visualization',
          'Personal practice plan',
        ],
      },
    ],
  },
  faq: {
    title: 'Healing Services FAQ',
    questions: [
      {
        question: 'Which healing modality is right for me?',
        answer:
          'The best choice depends on your goals and what resonates with you. Reiki is excellent for stress relief and energy balance, Mantra is ideal for spiritual growth, and Tantra works well for deep transformation. We can help you choose during a consultation.',
      },
      {
        question: 'Do I need to prepare for a healing session?',
        answer:
          'Simply come with an open mind and heart. Wear comfortable clothing, avoid heavy meals beforehand, and arrive 10 minutes early to settle in.',
      },
      {
        question: 'How many sessions do I need?',
        answer:
          'The number varies based on your goals. Some people feel benefits immediately, while others benefit from regular sessions over 4-8 weeks for deeper transformation.',
      },
      {
        question: 'Are healing services safe?',
        answer:
          'Yes, all our healing services are completely safe, non-invasive, and complementary to conventional healthcare. They work with your body\'s natural healing abilities.',
      },
      {
        question: 'Can I combine different healing modalities?',
        answer:
          'Absolutely! Many clients benefit from combining different practices. We can create a customized healing plan that integrates multiple modalities.',
      },
      {
        question: 'What should I expect after a session?',
        answer:
          'Most people feel deeply relaxed and peaceful. Some may experience emotional release or enhanced awareness. We provide guidance on integration and self-care after your session.',
      },
    ],
  },
  cta: {
    title: 'Begin Your Healing Journey',
    subtitle: 'Experience the transformative power of holistic healing. Book your session today.',
    buttons: [
      {
        label: 'Book Healing Session',
        href: '/enquiry',
        type: 'primary',
      },
      {
        label: 'Explore More',
        href: '/healing/reiki',
        type: 'secondary',
      },
    ],
  },
};
