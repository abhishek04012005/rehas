// ============================================
// REIKI SERVICE PAGE DATA
// ============================================
export const reikiData = {
  hero: {
    title: 'Reiki Healing',
    subtitle: 'Experience the Power of Universal Life Force Energy',
    description:
      'Discover deep healing and balance through the ancient Japanese practice of Reiki. Allow universal energy to restore harmony to your body, mind, and spirit.',
  },
  overview: {
    title: 'What is Reiki?',
    description:
      'Reiki is a Japanese healing technique that channels universal life force energy (Ki) through a practitioner to promote physical, emotional, and spiritual healing. The word "Reiki" comes from two Japanese words: "Rei" (universal spirit) and "Ki" (life force energy).',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=400&fit=crop',
  },
  benefits: {
    title: 'Benefits of Reiki',
    description: 'Transform your health and wellbeing with these powerful benefits',
    items: [
      {
        title: 'Deep Relaxation',
        description: 'Experience profound peace and mental clarity through energy balancing',
        icon: 'SelfImprovement',
      },
      {
        title: 'Stress Relief',
        description: 'Release accumulated tension and emotional blocks from your body',
        icon: 'Spa',
      },
      {
        title: 'Pain Management',
        description: 'Reduce chronic pain and accelerate natural healing processes',
        icon: 'LocalHospital',
      },
      {
        title: 'Emotional Healing',
        description: 'Clear emotional wounds and find inner peace and acceptance',
        icon: 'Favorite',
      },
      {
        title: 'Improved Sleep',
        description: 'Restore healthy sleep patterns and wake feeling refreshed',
        icon: 'Brightness3',
      },
      {
        title: 'Enhanced Immunity',
        description: 'Strengthen your immune system and boost overall vitality',
        icon: 'FavoriteBorder',
      },
    ],
  },
  process: {
    title: 'How Reiki Works',
    steps: [
      {
        number: '1',
        title: 'Consultation',
        description: 'We begin with a detailed consultation to understand your health goals and concerns.',
      },
      {
        number: '2',
        title: 'Energy Assessment',
        description: 'Our practitioner assesses your energetic state and identifies blockages.',
      },
      {
        number: '3',
        title: 'Treatment',
        description: 'You lie comfortably while universal energy flows through our hands to heal you.',
      },
      {
        number: '4',
        title: 'Integration',
        description: 'We guide you through grounding exercises and provide post-treatment advice.',
      },
    ],
  },
  chakras: {
    title: 'Chakra Alignment Through Reiki',
    description: 'Reiki works harmoniously with your chakra system to restore balance',
    chakras: [
      {
        name: 'Root Chakra',
        location: 'Base of spine',
        color: 'Red',
        element: 'Earth',
        benefit: 'Grounding, stability, security',
      },
      {
        name: 'Sacral Chakra',
        location: 'Lower abdomen',
        color: 'Orange',
        element: 'Water',
        benefit: 'Creativity, flow, pleasure',
      },
      {
        name: 'Solar Plexus Chakra',
        location: 'Upper abdomen',
        color: 'Yellow',
        element: 'Fire',
        benefit: 'Personal power, confidence, will',
      },
      {
        name: 'Heart Chakra',
        location: 'Heart center',
        color: 'Green',
        element: 'Air',
        benefit: 'Love, compassion, forgiveness',
      },
      {
        name: 'Throat Chakra',
        location: 'Throat',
        color: 'Blue',
        element: 'Sound',
        benefit: 'Communication, expression, truth',
      },
      {
        name: 'Third Eye Chakra',
        location: 'Between eyebrows',
        color: 'Indigo',
        element: 'Light',
        benefit: 'Intuition, insight, vision',
      },
      {
        name: 'Crown Chakra',
        location: 'Top of head',
        color: 'Violet',
        element: 'Thought',
        benefit: 'Spiritual connection, enlightenment',
      },
    ],
  },
  sessions: {
    title: 'Our Reiki Sessions',
    types: [
      {
        name: 'In-Person Reiki',
        duration: '60 minutes',
        price: '$89',
        description:
          'Experience hands-on Reiki treatment in our peaceful healing sanctuary. Full body healing with personalized chakra balancing.',
        includes: [
          'Detailed health consultation',
          'Full body Reiki treatment',
          'Chakra assessment and balancing',
          'Grounding techniques',
          'Herbal tea and relaxation space',
        ],
      },
      {
        name: 'Extended Reiki',
        duration: '90 minutes',
        price: '$129',
        description:
          'Deeper healing experience with extended energy work and meditation guidance for maximum transformation.',
        includes: [
          'Comprehensive health consultation',
          'Extended full body treatment',
          'Deep chakra work and healing',
          'Meditation and breathwork',
          'Crystal healing support',
          'Post-session guidance',
        ],
      },
      {
        name: 'Distance Reiki',
        duration: '60 minutes',
        price: '$69',
        description:
          'Receive Reiki healing energy from anywhere in the world. Energy transcends physical distance and works equally effectively.',
        includes: [
          'Remote energy transmission',
          'Chakra balancing',
          'Real-time intuitive guidance',
          'Personalized recommendations',
          'Follow-up consultation',
        ],
      },
    ],
  },
  faq: {
    title: 'Frequently Asked Questions',
    questions: [
      {
        question: 'Is Reiki a religion?',
        answer:
          'No, Reiki is a spiritual healing practice that works with any religion or belief system. It focuses on universal life force energy rather than religious doctrine.',
      },
      {
        question: 'Can Reiki replace medical treatment?',
        answer:
          'Reiki complements conventional medicine but should not replace medical care. Always consult your healthcare provider for medical conditions.',
      },
      {
        question: 'What should I wear to a session?',
        answer:
          'Wear comfortable, loose-fitting clothing. You remain fully clothed during the session. Remove shoes and jewelry to enhance comfort.',
      },
      {
        question: 'How many sessions do I need?',
        answer:
          'Benefits can be felt after one session, but a series of 4-6 sessions is recommended for deeper healing and lasting results.',
      },
      {
        question: 'What does Reiki feel like?',
        answer:
          'Experiences vary. Many feel warmth, tingling, or deep relaxation. Some experience emotional release or visions. All experiences are valid.',
      },
      {
        question: 'Is distance Reiki as effective as in-person?',
        answer:
          'Yes. Reiki energy transcends physical distance. Many practitioners and clients report equally powerful effects from distance sessions.',
      },
    ],
  },
  cta: {
    title: 'Begin Your Healing Journey',
    subtitle: 'Experience the transformative power of Reiki',
    buttons: [
      { label: 'Book a Session', href: '/enquiry', type: 'primary' },
      { label: 'Learn More', href: '/about', type: 'secondary' },
    ],
  },
} as const;
