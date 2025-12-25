// ============================================
// HEALING SECTION DATA
// ============================================
export const healingData = {
  hero: {
    title: 'Healing Services',
    subtitle: 'Transform Your Life Through Holistic Healing Practices',
  },
  items: [
    {
      id: 'reiki',
      title: 'Reiki',
      description:
        'Experience the healing power of universal life force energy. Our certified Reiki practitioners channel positive energy to balance your chakras, release blockages, and promote deep physical, emotional, and spiritual healing.',
      image: '/assets/service/reiki1.png',
      features: [
        'Full Body Healing',
        'Chakra Balance',
        'Distance Healing',
        'Energy Cleanse',
      ],
      color: 'var(--primary)',
      position: 'left',
      details: {
        longDescription: 'Reiki is a Japanese healing technique that channels universal life force energy (Ki) through a practitioner to the recipient. This gentle yet powerful practice promotes relaxation, reduces stress, accelerates healing, and facilitates personal transformation on all levels.',
        benefits: [
          'Deep relaxation and stress relief',
          'Enhanced emotional healing and balance',
          'Accelerated physical healing',
          'Improved sleep quality',
          'Greater sense of peace and well-being',
          'Chakra balancing and alignment',
        ],
        duration: '60-75 minutes',
        price: '₹2,500',
        includes: [
          'Complete chakra assessment',
          'Full body energy healing',
          'Chakra balancing treatment',
          'Relaxation and integration guidance',
          'Post-session recommendations',
        ],
      },
    },
    {
      id: 'mantra',
      title: 'Mantra',
      description:
        'Unlock the transformative power of sacred sound vibrations. Our mantra practitioners guide you through personalized mantras designed to align your consciousness, elevate your vibration, and manifest your deepest intentions.',
      image: '/assets/service/mantra1.png',
      features: [
        'Personalized Mantra',
        'Sound Vibration',
        'Spiritual Alignment',
        'Consciousness Elevation',
      ],
      color: 'var(--secondary)',
      position: 'right',
      details: {
        longDescription: 'Mantra is an ancient spiritual practice using sacred sounds and syllables to focus the mind and elevate consciousness. Each mantra carries specific vibrational frequencies that resonate with different aspects of your being, promoting healing, transformation, and spiritual awakening.',
        benefits: [
          'Enhanced mental clarity and focus',
          'Spiritual growth and awakening',
          'Manifestation of intentions',
          'Elevated consciousness and awareness',
          'Emotional balance and inner peace',
          'Connection to universal energy',
        ],
        duration: '75-90 minutes',
        price: '₹3,000',
        includes: [
          'Personalized mantra selection',
          'Guided chanting and meditation',
          'Mantra practice instruction',
          'Vibrational frequency alignment',
          'Take-home mantra practice guide',
        ],
      },
    },
    {
      id: 'tantra',
      title: 'Tantra',
      description:
        'Embrace the ancient path of energy mastery and spiritual integration. Tantra combines breathwork, visualization, and sacred practices to unite body, mind, and spirit, awakening dormant energy and facilitating profound transformation.',
      image: '/assets/service/tantra.png',
      features: [
        'Energy Activation',
        'Spiritual Integration',
        'Consciousness Expansion',
        'Kundalini Awakening',
      ],
      color: 'var(--primary)',
      position: 'left',
      details: {
        longDescription: 'Tantra is a sophisticated spiritual science that works with subtle energy (Kundalini) through breathwork, visualization, mudras, and sacred rituals. It aims to achieve spiritual liberation by integrating all aspects of existence and awakening the divine energy within.',
        benefits: [
          'Kundalini energy activation',
          'Spiritual liberation and freedom',
          'Enhanced intuition and psychic abilities',
          'Sacred sexuality and intimacy',
          'Transcendent states of consciousness',
          'Total transformation of being',
        ],
        duration: '90-120 minutes',
        price: '₹4,000',
        includes: [
          'Sacred space preparation',
          'Breathwork and pranayama guidance',
          'Visualization and mudra practice',
          'Energy activation and circulation',
          'Integration and grounding techniques',
          'Personalized practice recommendations',
        ],
      },
    },
  ],
  cta: {
    title: 'Ready to Heal and Transform?',
    subtitle: 'Begin your healing journey with our expert practitioners',
    buttons: [
      {
        label: 'Book Now',
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
} as const;
