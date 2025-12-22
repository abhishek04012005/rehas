import { HealingServiceData } from '@/components/healingService/healingService';

export const productTherapyData: HealingServiceData = {
  hero: {
    title: 'Therapy Products',
    subtitle: 'Professional Tools & Equipment for Healing',
    description:
      'Professional-grade therapy products and tools. Acupressure mats, massage devices, marma tools, and equipment for your practice.',
  },
  overview: {
    title: 'Premium Therapy Equipment & Tools',
    description:
      'Our therapy products are designed for both practitioners and personal use. From acupressure mats to marma therapy tools, massage equipment to ear seeds, all products meet professional standards. Perfect for therapists, wellness practitioners, and individuals seeking quality healing tools for home use.',
    image: 'https://images.unsplash.com/photo-1576091160640-112267f84e2d?w=500&h=400&fit=crop',
  },
  benefits: {
    title: 'Benefits of Our Therapy Products',
    description: 'Professional equipment for effective healing',
    items: [
      {
        title: 'Professional Grade',
        description: 'Equipment trusted by certified therapists.',
        icon: 'Verified',
      },
      {
        title: 'Durable Design',
        description: 'Built to last for years of daily use.',
        icon: 'Favorite',
      },
      {
        title: 'Effective Results',
        description: 'Products designed for maximum therapeutic benefit.',
        icon: 'ThumbUp',
      },
      {
        title: 'Affordable Price',
        description: 'Professional quality at accessible prices.',
        icon: 'AttachMoney',
      },
      {
        title: 'User Friendly',
        description: 'Easy to use for professionals and beginners.',
        icon: 'ThumbsUpDown',
      },
      {
        title: 'Technical Support',
        description: 'Expert guidance on product selection and use.',
        icon: 'HeadsetMic',
      },
    ],
  },
  process: {
    title: 'Choosing Therapy Products',
    steps: [
      {
        number: '01',
        title: 'Assess Your Need',
        description: 'Determine what therapy tool you need.',
      },
      {
        number: '02',
        title: 'Compare Options',
        description: 'Review features and specifications.',
      },
      {
        number: '03',
        title: 'Read Reviews',
        description: 'See what therapists and users say.',
      },
      {
        number: '04',
        title: 'Order Securely',
        description: 'Easy online ordering with secure payment.',
      },
      {
        number: '05',
        title: 'Receive & Learn',
        description: 'Get product with usage guide and support.',
      },
    ],
  },
  practices: {
    title: 'Therapy Product Categories',
    description: 'Equipment for various healing therapies',
    list: [
      {
        name: 'Acupressure Mats',
        meaning: 'Pressure point mats for home therapy',
        benefit: 'Daily self-care and pain relief',
        use: 'Home wellness routine',
      },
      {
        name: 'Massage Equipment',
        meaning: 'Electric and manual massage devices',
        benefit: 'Professional massage capability',
        use: 'Client treatment and home care',
      },
      {
        name: 'Marma Tools',
        meaning: 'Specialized tools for marma point therapy',
        benefit: 'Precise point therapy delivery',
        use: 'Professional marma practice',
      },
      {
        name: 'Ear Seeds & Pellets',
        meaning: 'Supplies for auricular therapy',
        benefit: 'Sustained home treatment',
        use: 'Auricular therapy application',
      },
      {
        name: 'Therapy Oils',
        meaning: 'Premium oils for massage and therapy',
        benefit: 'Enhanced therapeutic results',
        use: 'Professional therapy practice',
      },
      {
        name: 'Treatment Tables',
        meaning: 'Professional massage and therapy tables',
        benefit: 'Ergonomic client care',
        use: 'Professional therapy setup',
      },
    ],
  },
  sessions: {
    title: 'Product Collections',
    types: [
      {
        name: 'Acupressure Starter Kit',
        duration: 'Complete set',
        description: 'Mat, tools, and guide for home therapy.',
        price: '₹2,500',
        includes: [
          'Acupressure mat',
          'Therapy tools (3)',
          'User guide',
          'Care instructions',
        ],
      },
      {
        name: 'Professional Therapy Oils',
        duration: '5 bottles',
        description: 'Premium oils for professional therapy.',
        price: '₹3,000',
        includes: [
          '5 therapeutic oils',
          'Oil descriptions',
          'Blending guide',
          'Safety information',
        ],
      },
      {
        name: 'Marma Tool Set',
        duration: '5 tools',
        description: 'Professional marma therapy tools.',
        price: '₹4,500',
        includes: [
          '5 professional tools',
          'Tool guide',
          'Technique instructions',
          'Cleaning kit',
        ],
      },
      {
        name: 'Professional Starter Pack',
        duration: 'Complete equipment',
        description: 'Everything for starting a therapy practice.',
        price: '₹12,000',
        includes: [
          'Therapy table',
          'Tool set (complete)',
          'Oil collection',
          'Client guide materials',
          'Business support',
        ],
      },
    ],
  },
  faq: {
    title: 'Therapy Products FAQ',
    questions: [
      {
        question: 'Can I use therapy products at home?',
        answer:
          'Absolutely! Many of our products are designed for home use. Start with self-care products and work your way to professional equipment.',
      },
      {
        question: 'Are products suitable for beginners?',
        answer:
          'Yes! We offer beginner-friendly products with detailed instructions. Start simple and upgrade as your expertise grows.',
      },
      {
        question: 'Do professionals use these products?',
        answer:
          'Yes, our products are used by certified therapists and practitioners. Professional-grade quality for serious practitioners.',
      },
      {
        question: 'What warranty do products have?',
        answer:
          'Most products have 1-2 year warranties. Some items have extended warranty options. Check individual product details.',
      },
      {
        question: 'Is training included with equipment?',
        answer:
          'Each product includes usage instructions. For comprehensive training, see our therapy courses. We also offer video tutorials.',
      },
      {
        question: 'Can I bulk order for my clinic?',
        answer:
          'Yes! We offer wholesale and bulk discounts for clinics and practitioners. Contact our team for pricing and details.',
      },
    ],
  },
  cta: {
    title: 'Build Your Professional Therapy Practice',
    subtitle: 'Professional-grade equipment for therapists and practitioners.',
    buttons: [
      {
        label: 'View Products',
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
