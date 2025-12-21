import { HealingServiceData } from '@/components/healingService/healingService';

export const acupunctureData: HealingServiceData = {
  hero: {
    title: 'Acupuncture Therapy',
    subtitle: 'Traditional Chinese Healing with Needles',
    description:
      'Experience the proven benefits of acupuncture. Fine needles stimulate healing, reduce pain, and restore balance to your body\'s energy systems.',
  },
  overview: {
    title: 'What is Acupuncture Therapy?',
    description:
      'Acupuncture is a traditional Chinese medicine practice that uses thin, sterile needles to stimulate specific points on the body. These points are located along meridians through which vital life force energy (Qi) flows. By unblocking energy flow and restoring balance, acupuncture promotes healing, alleviates pain, and improves overall health. This evidence-based therapy has been used for thousands of years and is now recognized worldwide.',
    image: 'https://images.unsplash.com/photo-1544367567-0d75bcad3476?w=500&h=400&fit=crop',
  },
  benefits: {
    title: 'Acupuncture Therapy Benefits',
    description: 'Proven benefits of traditional needle therapy',
    items: [
      {
        title: 'Chronic Pain Relief',
        description: 'Effective for back pain, arthritis, migraines, and neuropathy.',
        icon: 'FavoriteBorder',
      },
      {
        title: 'Stress & Anxiety',
        description: 'Reduces stress, anxiety, and promotes emotional balance.',
        icon: 'Brightness3',
      },
      {
        title: 'Fertility Support',
        description: 'Improves reproductive health and supports fertility.',
        icon: 'Favorite',
      },
      {
        title: 'Sleep Improvement',
        description: 'Treats insomnia and promotes restorative sleep.',
        icon: 'AutoAwesome',
      },
      {
        title: 'Digestive Health',
        description: 'Improves digestion and resolves GI disorders.',
        icon: 'Lightbulb',
      },
      {
        title: 'Immune Enhancement',
        description: 'Boosts immune function and prevents illness.',
        icon: 'SelfImprovement',
      },
    ],
  },
  process: {
    title: 'Acupuncture Treatment Process',
    steps: [
      {
        number: '01',
        title: 'Consultation',
        description: 'Detailed assessment of symptoms and health history.',
      },
      {
        number: '02',
        title: 'Point Selection',
        description: 'Acupuncturist identifies specific points for treatment.',
      },
      {
        number: '03',
        title: 'Needle Insertion',
        description: 'Fine sterile needles are gently placed at acupoints.',
      },
      {
        number: '04',
        title: 'Rest & Recovery',
        description: 'Relax with needles in place as healing energy flows.',
      },
    ],
  },
  practices: {
    title: 'Acupuncture Techniques',
    description: 'Various acupuncture methods and specialized techniques',
    list: [
      {
        name: 'Traditional Acupuncture',
        meaning: 'Classical needle insertion and stimulation techniques',
        benefit: 'Balances Qi and promotes healing',
        use: 'General wellness and disease prevention',
      },
      {
        name: 'Electroacupuncture',
        meaning: 'Gentle electrical stimulation applied to needles',
        benefit: 'Enhanced pain relief and faster healing',
        use: 'Chronic pain and muscle conditions',
      },
      {
        name: 'Cupping Therapy',
        meaning: 'Suction cups applied after or with acupuncture',
        benefit: 'Releases tension and improves circulation',
        use: 'Muscle pain and respiratory issues',
      },
      {
        name: 'Moxibustion',
        meaning: 'Warming herb applied to acupoints or needles',
        benefit: 'Enhances warming and stimulation',
        use: 'Cold conditions and pain relief',
      },
      {
        name: 'Tui Na Massage',
        meaning: 'Therapeutic massage combined with acupuncture',
        benefit: 'Enhanced circulation and relaxation',
        use: 'Muscle tension and blocked energy',
      },
      {
        name: 'Gua Sha',
        meaning: 'Scraping technique to release tension',
        benefit: 'Improves circulation and releases toxins',
        use: 'Pain, stiffness, and recovery',
      },
    ],
  },
  sessions: {
    title: 'Acupuncture Treatment Sessions',
    types: [
      {
        name: 'Initial Consultation',
        duration: '90 Minutes',
        price: '₹2,500',
        description: 'Complete assessment and first treatment session.',
        includes: [
          'Full health assessment',
          'Tongue and pulse diagnosis',
          'Acupuncture treatment',
          'Treatment plan discussion',
        ],
      },
      {
        name: 'Regular Session',
        duration: '60 Minutes',
        price: '₹2,000',
        description: 'Standard acupuncture treatment session.',
        includes: [
          'Acupuncture treatment',
          'Needle retention (20-30 min)',
          'Lifestyle guidance',
          'Follow-up adjustments',
        ],
      },
      {
        name: 'Comprehensive Program',
        duration: '8 Sessions (60 Min Each)',
        price: '₹14,000',
        description: 'Complete healing program for chronic conditions.',
        includes: [
          'Initial detailed assessment',
          'Progressive treatments',
          'Specialized techniques as needed',
          'Dietary and lifestyle recommendations',
          'Home care guidance',
          '60-day comprehensive support',
        ],
      },
    ],
  },
  faq: {
    title: 'Acupuncture Therapy FAQ',
    questions: [
      {
        question: 'Does acupuncture hurt?',
        answer:
          'Acupuncture needles are very thin. Most people feel minimal pain during insertion. Once needles are placed, sensations vary from no feeling to mild warmth or tingling.',
      },
      {
        question: 'Are the needles sterile and safe?',
        answer:
          'Yes, we use only FDA-approved, sterile, single-use needles. Safety protocols are strictly followed to prevent infection.',
      },
      {
        question: 'How many treatments do I need?',
        answer:
          'Acute conditions may improve in 4-6 sessions. Chronic conditions typically require 8-12 sessions. Your practitioner will develop a customized plan.',
      },
      {
        question: 'What conditions can acupuncture treat?',
        answer:
          'Acupuncture treats pain, stress, digestive issues, sleep problems, fertility issues, hormonal imbalances, and many other conditions. Consult us about your specific condition.',
      },
      {
        question: 'Can I take medications with acupuncture?',
        answer:
          'Acupuncture works well alongside medications. Always inform your acupuncturist about all medications and supplements you\'re taking.',
      },
      {
        question: 'Is acupuncture covered by insurance?',
        answer:
          'Many insurance plans cover acupuncture. Check with your provider. We can provide documentation for insurance claims.',
      },
    ],
  },
  cta: {
    title: 'Restore Your Health with Acupuncture',
    subtitle: 'Book your acupuncture treatment and experience the healing power of traditional Chinese medicine.',
    buttons: [
      {
        label: 'Schedule Treatment',
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
