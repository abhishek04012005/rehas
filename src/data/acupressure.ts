import { HealingServiceData } from '@/components/healingService/healingService';

export const acupressureData: HealingServiceData = {
  hero: {
    title: 'Acupressure Therapy',
    subtitle: 'Ancient Chinese Healing Touch',
    description:
      'Discover relief through acupressure therapy. Using finger pressure on specific points, acupressure alleviates pain, improves circulation, and promotes natural healing.',
  },
  overview: {
    title: 'What is Acupressure Therapy?',
    description:
      'Acupressure is a traditional Chinese healing technique based on the same principles as acupuncture, but uses physical pressure instead of needles. By applying targeted pressure to specific points on the body, acupressure restores the flow of vital life force energy (Qi) and promotes healing. This non-invasive therapy is effective for pain management, stress relief, and overall wellness.',
    image: '/assets/service/acupressure1.png',
  },
  benefits: {
    title: 'Benefits of Acupressure Therapy',
    description: 'Experience relief and healing through ancient pressure point therapy',
    items: [
      {
        title: 'Pain Relief',
        description: 'Effective for headaches, back pain, neck tension, and arthritis.',
        icon: 'FavoriteBorder',
      },
      {
        title: 'Improved Circulation',
        description: 'Enhance blood flow and oxygen delivery to tissues.',
        icon: 'Brightness3',
      },
      {
        title: 'Stress Reduction',
        description: 'Release tension and promote deep relaxation.',
        icon: 'SelfImprovement',
      },
      {
        title: 'Digestive Health',
        description: 'Improve digestion and resolve gastrointestinal issues.',
        icon: 'AutoAwesome',
      },
      {
        title: 'Sleep Quality',
        description: 'Overcome insomnia and improve sleep patterns.',
        icon: 'Brightness3',
      },
      {
        title: 'Immune Function',
        description: 'Strengthen immunity and increase overall vitality.',
        icon: 'Lightbulb',
      },
    ],
  },
  process: {
    title: 'Acupressure Session Process',
    steps: [
      {
        number: '01',
        title: 'Assessment',
        description: 'Discuss symptoms and identify pressure points for treatment.',
      },
      {
        number: '02',
        title: 'Preparation',
        description: 'Relax and position yourself comfortably for therapy.',
      },
      {
        number: '03',
        title: 'Pressure Application',
        description: 'Therapist applies sustained pressure to specific acupoints.',
      },
      {
        number: '04',
        title: 'Post-Treatment',
        description: 'Rest and allow benefits to integrate into your body.',
      },
    ],
  },
  practices: {
    title: 'Acupressure Techniques',
    description: 'Different techniques used in acupressure therapy',
    list: [
      {
        name: 'Point Pressure',
        meaning: 'Sustained finger pressure on specific acupoints',
        benefit: 'Releases tension and stimulates healing response',
        use: 'Pain relief and disease prevention',
      },
      {
        name: 'Circular Massage',
        meaning: 'Gentle circular motion on pressure points',
        benefit: 'Improves circulation and relaxation',
        use: 'Stress relief and muscle tension',
      },
      {
        name: 'Meridian Tracing',
        meaning: 'Following energy pathways along the body',
        benefit: 'Balances energy flow throughout body',
        use: 'Overall wellness and prevention',
      },
      {
        name: 'Joint Mobilization',
        meaning: 'Gentle movement combined with pressure',
        benefit: 'Increases flexibility and range of motion',
        use: 'Joint pain and stiffness',
      },
      {
        name: 'Reflexology',
        meaning: 'Pressure on feet and hands corresponding to organs',
        benefit: 'Stimulates healing in corresponding body parts',
        use: 'Organ health and systemic healing',
      },
      {
        name: 'Trigger Point Release',
        meaning: 'Direct pressure on muscle tension points',
        benefit: 'Releases muscle knots and tension',
        use: 'Muscle pain and spasms',
      },
    ],
  },
  sessions: {
    title: 'Acupressure Services',
    types: [
      {
        name: 'Basic Acupressure Therapy',
        duration: '1 days',
        price: '₹1',
        originalPrice: '₹3,000',
        description: 'Foundation course in acupressure techniques and basic point therapy.',
        includes: [
          'Introduction to acupressure principles',
          'Basic pressure point techniques',
          'Meridian system overview',
          'Self-care acupressure methods',
          'Beginner certification',
        ],
      },
      {
        name: 'Acupressure Therapy',
        duration: '7 days',
        price: '₹5,000',
        originalPrice: '₹10,000',
        description: 'Advanced techniques and practical applications for therapeutic practice.',
        includes: [
          'Advanced pressure point techniques',
          'Meridian pathway mastery',
          'Client treatment protocols',
          'Hands-on practice sessions',
          'Professional practice development',
          'Intermediate practitioner certification',
        ],
      },
      {
        name: 'Acupressure Therapy with Kits',
        duration: '30 days',
        price: '₹20,000',
        originalPrice: '₹30,000',
        description: 'Complete mastery of acupressure healing with advanced therapeutic applications.',
        includes: [
          'Complete pressure point mastery (360+ points)',
          'Advanced meridian therapeutics',
          'Specialized treatment protocols',
          'Professional practice establishment',
          'Mentorship and supervision',
          'Master practitioner certification',
        ],
      },
    ],
  },
  faq: {
    title: 'Acupressure Therapy FAQ',
    questions: [
      {
        question: 'Is acupressure painful?',
        answer:
          'Acupressure should not be painful. While pressure points may feel tender, a good therapist applies appropriate pressure that feels relieving rather than painful.',
      },
      {
        question: 'How long does it take to see results?',
        answer:
          'Many people feel relief after one session. Chronic conditions may require 4-6 sessions for noticeable improvement. Consistency is key for lasting results.',
      },
      {
        question: 'Can I do acupressure at home?',
        answer:
          'Yes! We teach self-acupressure techniques you can use at home. Your therapist will show you specific points and techniques for your condition.',
      },
      {
        question: 'Is acupressure safe for everyone?',
        answer:
          'Acupressure is generally safe, but certain conditions require modifications. Inform your therapist of pregnancy, recent injuries, or health conditions.',
      },
      {
        question: 'How does acupressure differ from massage?',
        answer:
          'While massage treats muscles, acupressure targets specific energy points on meridians. Both are beneficial and often complement each other.',
      },
      {
        question: 'What should I do before a session?',
        answer:
          'Avoid heavy meals 1-2 hours before. Wear comfortable clothing and stay hydrated. Come with an open mind and willingness to relax.',
      },
    ],
  },
  cta: {
    title: 'Experience Healing Through Touch',
    subtitle: 'Book your acupressure therapy session and discover natural pain relief.',
    buttons: [
      {
        label: 'Book Session',
        href: '#services',
        type: 'primary',
      },
      {
        label: 'Contact Us',
        href: '/therapy/acupressure',
        type: 'secondary',
      },
    ],
  },
};
