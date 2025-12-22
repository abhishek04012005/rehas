import { HealingServiceData } from '@/components/healingService/healingService';

export const productHealingData: HealingServiceData = {
  hero: {
    title: 'Healing Products',
    subtitle: 'Tools & Remedies for Personal Wellness',
    description:
      'Discover our premium healing products. Crystals, oils, tools, and remedies to support your personal healing journey and daily wellness.',
  },
  overview: {
    title: 'Healing Products for Your Wellness Journey',
    description:
      'Our carefully curated healing products are selected for quality, authenticity, and effectiveness. From healing crystals and essential oils to meditation tools and natural remedies, each product supports your wellness goals. All products are sourced ethically, tested for purity, and backed by our commitment to your healing.',
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd12e11?w=500&h=400&fit=crop',
  },
  benefits: {
    title: 'Why Choose Our Healing Products',
    description: 'Quality products for your healing support',
    items: [
      {
        title: 'Authentic Quality',
        description: 'Premium, authentic healing products from trusted sources.',
        icon: 'VerifiedUser',
      },
      {
        title: 'Ethically Sourced',
        description: 'All products sourced with respect for nature and communities.',
        icon: 'EcoOutlined',
      },
      {
        title: 'Tested & Verified',
        description: 'Each product tested for purity and effectiveness.',
        icon: 'CheckCircle',
      },
      {
        title: 'Expert Guidance',
        description: 'Detailed information on how to use each product.',
        icon: 'MenuBook',
      },
      {
        title: 'Home Delivery',
        description: 'Convenient shipping to your doorstep.',
        icon: 'LocalShipping',
      },
      {
        title: 'Support Included',
        description: 'Guidance from our experts on product use.',
        icon: 'HeadsetMic',
      },
    ],
  },
  process: {
    title: 'How to Choose Your Products',
    steps: [
      {
        number: '01',
        title: 'Identify Your Need',
        description: 'Determine what area of healing you want to support.',
      },
      {
        number: '02',
        title: 'Explore Options',
        description: 'Browse products in your category.',
      },
      {
        number: '03',
        title: 'Read Descriptions',
        description: 'Understand each product\'s properties and uses.',
      },
      {
        number: '04',
        title: 'Order & Receive',
        description: 'Simple ordering and home delivery.',
      },
      {
        number: '05',
        title: 'Get Support',
        description: 'Receive guidance on using your products.',
      },
    ],
  },
  practices: {
    title: 'Product Categories',
    description: 'Healing products for all needs',
    list: [
      {
        name: 'Healing Crystals',
        meaning: 'Natural crystals for energy and chakra healing',
        benefit: 'Energy alignment and vibration healing',
        use: 'Personal healing and space clearing',
      },
      {
        name: 'Essential Oils',
        meaning: 'Pure essential oils for aromatherapy and wellness',
        benefit: 'Aromatic and energetic healing',
        use: 'Daily wellness and emotional support',
      },
      {
        name: 'Herbal Remedies',
        meaning: 'Natural herbal supplements and remedies',
        benefit: 'Plant-based healing support',
        use: 'Health maintenance and healing',
      },
      {
        name: 'Meditation Tools',
        meaning: 'Mala beads, meditation cushions, singing bowls',
        benefit: 'Meditation depth and focus',
        use: 'Spiritual practice support',
      },
      {
        name: 'Healing Jewels',
        meaning: 'Gemstone jewelry for daily healing support',
        benefit: 'Continuous energy healing',
        use: 'Wearable wellness and beauty',
      },
      {
        name: 'Ayurvedic Products',
        meaning: 'Natural Ayurvedic oils and preparations',
        benefit: 'Traditional healing formulations',
        use: 'Constitutional balance and wellness',
      },
    ],
  },
  sessions: {
    title: 'Product Collections',
    types: [
      {
        name: 'Crystal Starter Set',
        duration: 'Includes 5 crystals',
        description: 'Essential healing crystals for beginners.',
        price: '₹1,500',
        includes: [
          '5 genuine healing crystals',
          'Crystal guide booklet',
          'Care instructions',
          'Cleansing methods',
        ],
      },
      {
        name: 'Essential Oils Kit',
        duration: '7 bottles',
        description: 'Premium essential oils for healing and wellness.',
        price: '₹3,500',
        includes: [
          '7 therapeutic grade oils',
          'Usage guide',
          'Blending recipes',
          'Safety information',
        ],
      },
      {
        name: 'Meditation Combo',
        duration: 'Complete set',
        description: 'Mala beads, cushion, and guidebook.',
        price: '₹2,500',
        includes: [
          'Mala beads',
          'Meditation cushion',
          'Instruction guide',
          'Practice tips',
        ],
      },
      {
        name: 'Premium Crystal Collection',
        duration: '12 pieces',
        description: 'Complete chakra and healing crystal set.',
        price: '₹8,000',
        includes: [
          '12 premium crystals',
          'Chakra guide',
          'Individual crystal cards',
          'Display organizer',
        ],
      },
    ],
  },
  faq: {
    title: 'Healing Products FAQ',
    questions: [
      {
        question: 'Are your crystals authentic?',
        answer:
          'Yes! All crystals are genuine, tested, and sourced from ethical suppliers. Each comes with an authenticity certificate.',
      },
      {
        question: 'How do I use healing crystals?',
        answer:
          'Carry them, wear them, meditate with them, or place them in your space. Each product comes with detailed usage instructions.',
      },
      {
        question: 'Are essential oils pure?',
        answer:
          'Absolutely! All our essential oils are 100% pure, therapeutic grade, and tested for quality and purity.',
      },
      {
        question: 'Can I return products?',
        answer:
          'Yes! We offer 30-day returns for all products in original condition. Your satisfaction is our priority.',
      },
      {
        question: 'Do you ship internationally?',
        answer:
          'Currently we ship within India. International shipping options coming soon. Contact us for details.',
      },
      {
        question: 'How are products packaged?',
        answer:
          'All products are carefully packaged to ensure they arrive in perfect condition. Packaging is eco-friendly whenever possible.',
      },
    ],
  },
  cta: {
    title: 'Enhance Your Healing Journey with Premium Products',
    subtitle: 'Authentic crystals, oils, and tools for daily wellness.',
    buttons: [
      {
        label: 'Shop Now',
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
