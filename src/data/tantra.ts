// ============================================
// TANTRA SERVICE PAGE DATA
// ============================================
export const tantraData = {
  hero: {
    title: 'Tantra Wisdom',
    subtitle: 'Embrace the Path of Energy, Consciousness & Sacred Union',
    description:
      'Explore the profound teachings of Tantra. Transform fear into power, activate your subtle energy channels, and experience the union of masculine and feminine energies within yourself.',
  },
  overview: {
    title: 'What is Tantra?',
    description:
      'Tantra is an ancient esoteric spiritual tradition that celebrates all aspects of existence as sacred. Rather than rejecting the physical world, Tantra teaches that everything—including energy, sensation, and pleasure—can be a path to enlightenment. Tantric practices activate dormant energy (kundalini), align chakras, and harmonize the divine masculine and feminine energies within every individual, leading to profound spiritual awakening and personal transformation.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=400&fit=crop',
  },
  benefits: {
    title: 'Benefits of Tantric Practice',
    description: 'Unlock your highest potential through sacred energy work',
    items: [
      {
        title: 'Energy Activation',
        description: 'Awaken kundalini and activate higher consciousness through guided practices',
        icon: 'FlashOn',
      },
      {
        title: 'Divine Feminine & Masculine',
        description: 'Balance sacred masculine and feminine energies for wholeness',
        icon: 'Favorite',
      },
      {
        title: 'Sexual Transformation',
        description: 'Transform sexual energy into spiritual power and enlightenment',
        icon: 'AutoAwesome',
      },
      {
        title: 'Chakra Alignment',
        description: 'Harmonize all seven chakras for optimal energy flow',
        icon: 'Brightness3',
      },
      {
        title: 'Conscious Living',
        description: 'Experience sacred presence in every moment of daily life',
        icon: 'SelfImprovement',
      },
      {
        title: 'Spiritual Union',
        description: 'Experience union of self with the divine consciousness',
        icon: 'PublicOutlined',
      },
    ],
  },
  process: {
    title: 'Tantric Practice Pathway',
    steps: [
      {
        number: '1',
        title: 'Foundation',
        description: 'Learn foundational principles and prepare your body and mind.',
      },
      {
        number: '2',
        title: 'Energy Activation',
        description: 'Practice techniques to awaken and circulate subtle energies.',
      },
      {
        number: '3',
        title: 'Integration',
        description: 'Integrate tantric wisdom into daily life and relationships.',
      },
      {
        number: '4',
        title: 'Enlightenment',
        description: 'Experience spiritual awakening and transformation.',
      },
    ],
  },
  practices: {
    title: 'Key Tantric Practices',
    description: 'Sacred techniques for spiritual transformation and energy work',
    list: [
      {
        name: 'Chakra Activation',
        meaning: 'Energy Center Opening',
        benefit: 'Energy flow, spiritual awakening, healing',
        use: 'Daily practice, meditation, energy work',
        price: '₹2,500',
      },
      {
        name: 'Kundalini Awakening',
        meaning: 'Serpent Energy Rising',
        benefit: 'Spiritual enlightenment, higher consciousness',
        use: 'Guided practice, meditation, transformation',
        price: '₹3,500',
      },
      {
        name: 'Yab Yum',
        meaning: 'Sacred Union',
        benefit: 'Harmony, consciousness expansion, bliss',
        use: 'Partner practice, intimate connection',
        price: '₹4,500',
      },
      {
        name: 'Breath & Energy',
        meaning: 'Pranayama & Bandha',
        benefit: 'Vitality, consciousness, energy control',
        use: 'Daily practice, meditation, healing',
        price: '₹2,000',
      },
      {
        name: 'Mantra & Mudra',
        meaning: 'Sound & Gesture',
        benefit: 'Consciousness focus, energy direction',
        use: 'Meditation, ritual, energy activation',
        price: '₹2,800',
      },
      {
        name: 'Visualization',
        meaning: 'Inner Imagery',
        benefit: 'Spiritual connection, manifestation, healing',
        use: 'Meditation, intention setting, practice',
        price: '₹2,200',
      },
    ],
  },
  sessions: {
    title: 'Tantric Programs',
    types: [
      {
        name: 'Tantra Introduction',
        duration: '90 minutes',
        price: '$99',
        description:
          'Begin your tantric journey with foundational teachings and safe, guided practices to awaken your subtle energies.',
        includes: [
          'Philosophy and principles',
          'Energy body introduction',
          'Breathing techniques',
          'Chakra awareness',
          'Safe practice guidelines',
        ],
      },
      {
        name: 'Advanced Tantra Course',
        duration: '6 weeks (2 hours/week)',
        price: '$499',
        description:
          'Deep transformation through comprehensive tantric teachings, practices, and personal guidance.',
        includes: [
          'Complete tantric philosophy',
          'Advanced energy practices',
          'Kundalini awakening guidance',
          'Chakra mastery',
          'Personal coaching',
          'Lifetime access to materials',
        ],
      },
      {
        name: 'Couples Tantra Workshop',
        duration: '120 minutes',
        price: '$179',
        description:
          'Deepen intimate connection through sacred tantric practices designed for couples seeking spiritual and sensual harmony.',
        includes: [
          'Sacred partnership principles',
          'Intimacy enhancement practices',
          'Energy exchange techniques',
          'Conscious communication',
          'Meditation for couples',
        ],
      },
    ],
  },
  faq: {
    title: 'Frequently Asked Questions',
    questions: [
      {
        question: 'Is Tantra about sex?',
        answer:
          'Tantra includes sexual practices as one pathway, but it\'s a comprehensive spiritual system about consciousness, energy, and enlightenment. Sexual energy is transformed into spiritual power.',
      },
      {
        question: 'Is Tantra a religion?',
        answer:
          'No. Tantra is a spiritual philosophy and practice system that works alongside any religion or belief system. It focuses on universal energy principles.',
      },
      {
        question: 'Can I practice Tantra alone?',
        answer:
          'Yes. Most tantric practices can be done individually. Some practices (like Yab Yum) are designed for partners, but are optional.',
      },
      {
        question: 'Is Tantra dangerous?',
        answer:
          'Tantra is safe when practiced properly under qualified guidance. Our teachers ensure all practices are appropriate and transformative.',
      },
      {
        question: 'How long before I see results?',
        answer:
          'Many experience subtle shifts immediately. Deeper transformations typically develop over weeks and months of consistent practice.',
      },
      {
        question: 'Do I need experience in meditation?',
        answer:
          'No prior experience is needed. We teach all foundational techniques. Openness and commitment matter most.',
      },
    ],
  },
  cta: {
    title: 'Awaken Your Tantric Potential',
    subtitle: 'Transform consciousness and embrace sacred power',
    buttons: [
      { label: 'Book a Session', href: '/enquiry', type: 'primary' },
      { label: 'Learn More', href: '/about', type: 'secondary' },
    ],
  },
} as const;
