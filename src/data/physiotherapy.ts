import { HealingServiceData } from '@/components/healingService/healingService';

export const physiotherapyData: HealingServiceData = {
  hero: {
    title: 'Physiotherapy',
    subtitle: 'Movement & Exercise for Healing',
    description:
      'Recover and rebuild with professional physiotherapy. Our therapists use specialized exercises and techniques to restore function, reduce pain, and improve mobility.',
  },
  overview: {
    title: 'What is Physiotherapy?',
    description:
      'Physiotherapy, also known as physical therapy, is a healthcare profession focused on movement, rehabilitation, and injury recovery. Using evidence-based exercises, manual therapy, and specialized techniques, physiotherapists help restore function, reduce pain, and improve quality of life. Whether recovering from injury, surgery, or managing chronic conditions, physiotherapy promotes healing and prevents future problems.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&h=400&fit=crop',
  },
  benefits: {
    title: 'Benefits of Physiotherapy',
    description: 'Restore function and reduce pain through expert rehabilitation',
    items: [
      {
        title: 'Injury Recovery',
        description: 'Accelerate healing from sports injuries, accidents, and trauma.',
        icon: 'FavoriteBorder',
      },
      {
        title: 'Post-Surgery Rehabilitation',
        description: 'Restore mobility and strength after surgical procedures.',
        icon: 'Brightness3',
      },
      {
        title: 'Chronic Pain Management',
        description: 'Long-term solutions for ongoing pain conditions.',
        icon: 'AutoAwesome',
      },
      {
        title: 'Mobility Improvement',
        description: 'Increase flexibility, range of motion, and functional ability.',
        icon: 'SelfImprovement',
      },
      {
        title: 'Strength Building',
        description: 'Develop muscle strength and endurance.',
        icon: 'Lightbulb',
      },
      {
        title: 'Prevention',
        description: 'Prevent future injuries through proper movement and exercise.',
        icon: 'Favorite',
      },
    ],
  },
  process: {
    title: 'Physiotherapy Treatment Process',
    steps: [
      {
        number: '01',
        title: 'Assessment',
        description: 'Comprehensive evaluation of movement, strength, and function.',
      },
      {
        number: '02',
        title: 'Treatment Plan',
        description: 'Customized rehabilitation program based on your condition.',
      },
      {
        number: '03',
        title: 'Active Treatment',
        description: 'Perform exercises and therapeutic interventions under supervision.',
      },
      {
        number: '04',
        title: 'Home Program',
        description: 'Continue healing with personalized home exercises.',
      },
    ],
  },
  practices: {
    title: 'Physiotherapy Techniques',
    description: 'Various therapeutic methods used in rehabilitation',
    list: [
      {
        name: 'Manual Therapy',
        meaning: 'Hands-on techniques for mobilization and soft tissue work',
        benefit: 'Improves mobility and reduces muscle tension',
        use: 'Joint stiffness and muscle tightness',
      },
      {
        name: 'Therapeutic Exercise',
        meaning: 'Structured exercises targeting specific muscle groups',
        benefit: 'Builds strength and improves function',
        use: 'All types of rehabilitation',
      },
      {
        name: 'Electrotherapy',
        meaning: 'Electrical stimulation to reduce pain and promote healing',
        benefit: 'Pain relief and tissue healing',
        use: 'Pain management and injury recovery',
      },
      {
        name: 'Ultrasound Therapy',
        meaning: 'Sound waves to stimulate deep tissue healing',
        benefit: 'Reduces inflammation and promotes recovery',
        use: 'Soft tissue injuries and inflammation',
      },
      {
        name: 'Stretching & Flexibility',
        meaning: 'Guided stretching to improve range of motion',
        benefit: 'Increases flexibility and prevents injury',
        use: 'Mobility improvement',
      },
      {
        name: 'Balance & Proprioception',
        meaning: 'Training to improve coordination and stability',
        benefit: 'Prevents falls and improves function',
        use: 'Fall prevention and injury prevention',
      },
    ],
  },
  sessions: {
    title: 'Physiotherapy Sessions',
    types: [
      {
        name: 'Initial Assessment',
        duration: '60 Minutes',
        price: '₹2,000',
        description: 'Comprehensive evaluation and first treatment session.',
        includes: [
          'Detailed assessment',
          'Movement and strength testing',
          'Initial treatment',
          'Treatment plan explanation',
        ],
      },
      {
        name: 'Regular Session',
        duration: '45 Minutes',
        price: '₹1,500',
        description: 'Standard physiotherapy treatment and exercise session.',
        includes: [
          'Therapeutic exercises',
          'Manual therapy as needed',
          'Progress monitoring',
          'Home exercise guidance',
        ],
      },
      {
        name: 'Intensive Program',
        duration: '12 Sessions (45 Min Each)',
        price: '₹15,000',
        description: 'Complete rehabilitation program for comprehensive recovery.',
        includes: [
          'Initial assessment and planning',
          'Progressive rehabilitation',
          'Regular therapist supervision',
          'Home exercise program',
          'Functional goal achievement',
          'Injury prevention strategies',
          'Return to activity planning',
        ],
      },
    ],
  },
  faq: {
    title: 'Physiotherapy FAQ',
    questions: [
      {
        question: 'Do I need a doctor\'s referral for physiotherapy?',
        answer:
          'While not always required, a referral from your doctor is helpful and may be necessary for insurance coverage. You can also self-refer in many cases.',
      },
      {
        question: 'How long does recovery take?',
        answer:
          'Recovery time varies based on injury severity and your commitment. Acute injuries may recover in weeks, while chronic conditions need longer treatment.',
      },
      {
        question: 'Will physiotherapy hurt?',
        answer:
          'Physiotherapy may involve mild discomfort as tissues heal, but should not be painful. Let your therapist know if pain is too intense.',
      },
      {
        question: 'Can physiotherapy help without surgery?',
        answer:
          'Many conditions improve significantly with physiotherapy alone. Your doctor will advise if surgery is necessary, but physical therapy may prevent it.',
      },
      {
        question: 'How often should I do home exercises?',
        answer:
          'Consistency is key. Most programs require daily or near-daily home exercises for 10-30 minutes. Your therapist will prescribe your specific program.',
      },
      {
        question: 'Is physiotherapy suitable for elderly patients?',
        answer:
          'Yes! Physiotherapy is safe and beneficial for all ages. Programs are adapted to individual capabilities and goals.',
      },
    ],
  },
  cta: {
    title: 'Restore Function and Strength',
    subtitle: 'Start your physiotherapy journey and recover with professional guidance.',
    buttons: [
      {
        label: 'Book Session',
        href: '/enquiry',
        type: 'primary',
      },
      {
        label: 'Consult Us',
        href: '/contact',
        type: 'secondary',
      },
    ],
  },
};
