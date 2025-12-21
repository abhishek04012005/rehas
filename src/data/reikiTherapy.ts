import { HealingServiceData } from '@/components/healingService/healingService';

export const reikiTherapyData: HealingServiceData = {
  hero: {
    title: 'Reiki Therapy',
    subtitle: 'Japanese Energy Healing for Wellness',
    description:
      'Experience holistic healing through Reiki therapy. Balance your body\'s natural energy and promote deep healing, relaxation, and well-being.',
  },
  overview: {
    title: 'What is Reiki Therapy?',
    description:
      'Reiki is a Japanese healing technique that channels universal life force energy to promote physical, mental, and emotional healing. Through gentle touch or hands-off technique, Reiki practitioners activate your body\'s natural healing abilities. This non-invasive therapy works with your body\'s energy systems to reduce stress, alleviate pain, and restore balance.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=400&fit=crop',
  },
  benefits: {
    title: 'Reiki Therapy Benefits',
    description: 'Experience profound healing through Reiki energy work',
    items: [
      {
        title: 'Pain Relief',
        description: 'Reduce chronic pain and accelerate healing of injuries.',
        icon: 'FavoriteBorder',
      },
      {
        title: 'Stress Reduction',
        description: 'Release tension and stress from body and mind.',
        icon: 'Brightness3',
      },
      {
        title: 'Immune Boost',
        description: 'Strengthen your immune system and enhance vitality.',
        icon: 'Lightbulb',
      },
      {
        title: 'Emotional Healing',
        description: 'Process emotions and heal emotional trauma.',
        icon: 'Favorite',
      },
      {
        title: 'Better Sleep',
        description: 'Improve sleep quality and overcome insomnia.',
        icon: 'AutoAwesome',
      },
      {
        title: 'Chakra Balance',
        description: 'Restore balance to all seven energy centers.',
        icon: 'SelfImprovement',
      },
    ],
  },
  process: {
    title: 'Reiki Therapy Session Process',
    steps: [
      {
        number: '01',
        title: 'Consultation',
        description: 'Discuss your health concerns and therapy goals.',
      },
      {
        number: '02',
        title: 'Preparation',
        description: 'Relax in a calm, healing environment and lie down comfortably.',
      },
      {
        number: '03',
        title: 'Energy Transfer',
        description: 'Practitioner channels Reiki energy through hands to your body.',
      },
      {
        number: '04',
        title: 'Integration',
        description: 'Rest and allow your body to integrate the healing energy.',
      },
    ],
  },
  chakras: {
    title: 'Seven Chakras Alignment',
    description: 'Reiki balances and aligns all energy centers in your body',
    chakras: [
      {
        name: 'Root Chakra',
        location: 'Base of spine',
        color: 'Red',
        element: 'Earth',
        benefit: 'Grounding and stability',
      },
      {
        name: 'Sacral Chakra',
        location: 'Lower abdomen',
        color: 'Orange',
        element: 'Water',
        benefit: 'Creativity and sexuality',
      },
      {
        name: 'Solar Plexus',
        location: 'Upper abdomen',
        color: 'Yellow',
        element: 'Fire',
        benefit: 'Personal power and confidence',
      },
      {
        name: 'Heart Chakra',
        location: 'Heart center',
        color: 'Green',
        element: 'Air',
        benefit: 'Love and compassion',
      },
      {
        name: 'Throat Chakra',
        location: 'Throat',
        color: 'Blue',
        element: 'Ether',
        benefit: 'Communication and expression',
      },
      {
        name: 'Third Eye',
        location: 'Between eyebrows',
        color: 'Indigo',
        element: 'Light',
        benefit: 'Intuition and insight',
      },
      {
        name: 'Crown Chakra',
        location: 'Top of head',
        color: 'Violet',
        element: 'Thought',
        benefit: 'Spiritual connection and unity',
      },
    ],
  },
  sessions: {
    title: 'Reiki Therapy Sessions',
    types: [
      {
        name: 'Single Session',
        duration: '60 Minutes',
        price: '₹2,500',
        description: 'Complete full-body Reiki healing session.',
        includes: [
          'Full-body energy healing',
          'Chakra assessment and balancing',
          'Relaxation and stress relief',
          'Post-session guidance',
        ],
      },
      {
        name: 'Problem Area Focus',
        duration: '45 Minutes',
        price: '₹2,000',
        description: 'Targeted Reiki for specific pain or health issues.',
        includes: [
          'Focused energy work on problem areas',
          'Pain management',
          'Chakra alignment',
          'Healing recommendations',
        ],
      },
      {
        name: 'Healing Package',
        duration: '4 Sessions (60 Min Each)',
        price: '₹8,500',
        description: 'Complete healing program for deeper transformation.',
        includes: [
          'Full-body sessions',
          'Deep chakra balancing',
          'Progressive healing',
          'Home care guidance',
          'Follow-up support',
        ],
      },
    ],
  },
  faq: {
    title: 'Reiki Therapy FAQ',
    questions: [
      {
        question: 'Is Reiki scientifically proven?',
        answer:
          'While Reiki is complementary medicine, research shows it reduces stress, promotes relaxation, and supports healing. It works alongside conventional medicine, not as a replacement.',
      },
      {
        question: 'What should I wear to a Reiki session?',
        answer:
          'Wear comfortable, loose clothing. You may remain fully clothed during the session. Avoid heavy jewelry that might be uncomfortable while lying down.',
      },
      {
        question: 'How many sessions do I need?',
        answer:
          'Benefits can be felt after one session, but regular sessions (weekly or bi-weekly) produce deeper healing. Most people benefit from 4-6 sessions for significant change.',
      },
      {
        question: 'Are there any side effects?',
        answer:
          'Reiki is safe and non-invasive. Some people may experience detoxification symptoms like mild headaches or fatigue as the body releases toxins.',
      },
      {
        question: 'Can Reiki help with specific medical conditions?',
        answer:
          'Reiki complements medical treatment for pain, anxiety, insomnia, and stress-related conditions. Always continue prescribed medical care.',
      },
      {
        question: 'What if I don\'t believe in energy healing?',
        answer:
          'Reiki works regardless of belief. Many skeptics experience profound benefits. Keep an open mind and focus on relaxation during the session.',
      },
    ],
  },
  cta: {
    title: 'Begin Your Healing Journey',
    subtitle: 'Book your Reiki therapy session and experience transformative energy healing.',
    buttons: [
      {
        label: 'Book Reiki Session',
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
