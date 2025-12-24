import { HealingServiceData } from '@/components/healingService/healingService';

export const courseHealingData: HealingServiceData = {
  hero: {
    title: 'Healing Courses',
    subtitle: 'Master Ancient & Modern Healing Practices',
    description:
      'Learn professional healing skills through our comprehensive courses. Transform lives, build a healing practice, and master multiple modalities.',
  },
  overview: {
    title: 'Why Study Healing with REHAS?',
    description:
      'Our healing courses combine ancient wisdom with modern teaching methodology. Learn Reiki, Energy Healing, Chakra Balancing, and more from certified masters with 20+ years of experience. Each course includes hands-on practice, certification, and lifetime support. Whether you\'re beginning your healing journey or advancing your expertise, our courses empower you to heal yourself and others professionally.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop',
  },
  benefits: {
    title: 'What You\'ll Gain',
    description: 'Comprehensive learning and professional development',
    items: [
      {
        title: 'Expert Training',
        description: 'Learn from master healers with decades of experience.',
        icon: 'SchoolOutlined',
      },
      {
        title: 'Certification',
        description: 'Earn recognized certifications in healing modalities.',
        icon: 'EmojiEvents',
      },
      {
        title: 'Practical Skills',
        description: 'Master hands-on healing techniques and applications.',
        icon: 'PanTool',
      },
      {
        title: 'Professional Practice',
        description: 'Build a thriving healing practice and support system.',
        icon: 'Business',
      },
      {
        title: 'Community',
        description: 'Connect with fellow healers and practitioners.',
        icon: 'Groups',
      },
      {
        title: 'Lifetime Support',
        description: 'Ongoing mentorship and professional development.',
        icon: 'Favorite',
      },
    ],
  },
  process: {
    title: 'Course Structure & Learning Path',
    steps: [
      {
        number: '01',
        title: 'Level 1 - Foundation',
        description: 'Learn fundamentals, history, and basic techniques.',
      },
      {
        number: '02',
        title: 'Level 2 - Intermediate',
        description: 'Advanced techniques, case studies, and client protocols.',
      },
      {
        number: '03',
        title: 'Level 3 - Mastery',
        description: 'Advanced applications, specialized techniques, practice building.',
      },
      {
        number: '04',
        title: 'Level 4 - Professional',
        description: 'Business skills, ethics, and becoming a certified instructor.',
      },
    ],
  },
  practices: {
    title: 'Healing Courses Offered',
    description: 'Choose from comprehensive healing modalities',
    list: [
      {
        name: 'Reiki Mastery Program',
        meaning: 'Complete Reiki training from Level 1 to Master',
        benefit: 'Hands-on healing ability and spiritual attunement',
        use: 'Personal healing and professional practice',
      },
      {
        name: 'Energy Healing Certification',
        meaning: 'Learn to work with energy fields and chakras',
        benefit: 'Energy perception and manipulation skills',
        use: 'Holistic healing and wellness work',
      },
      {
        name: 'Chakra Balancing Course',
        meaning: 'Master the 7 chakra system and energy healing',
        benefit: 'Understanding and healing energy centers',
        use: 'Personal transformation and client work',
      },
      {
        name: 'Healing Touch Techniques',
        meaning: 'Hands-on healing methods and applications',
        benefit: 'Hands-on healing proficiency',
        use: 'Direct client healing work',
      },
      {
        name: 'Crystal Healing Certification',
        meaning: 'Learn to work with crystals for healing',
        benefit: 'Crystal knowledge and healing application',
        use: 'Energy work and product recommendations',
      },
      {
        name: 'Sound Healing Mastery',
        meaning: 'Harness sound frequencies for transformation',
        benefit: 'Sound healing technique mastery',
        use: 'Healing through sound vibration',
      },
    ],
  },
  sessions: {
    title: 'Course Formats & Pricing',
    types: [
      {
        name: 'Weekend Intensive',
        duration: '2-3 days',
        description: 'Immersive learning over intensive weekends.',
        price: '₹8,000',
        includes: [
          'Complete course material',
          'Hands-on practice',
          'Certification upon completion',
          'Lifetime course access',
        ],
      },
      {
        name: 'Weekly Classes',
        duration: '8-12 weeks',
        description: 'Gradual learning with practice between classes.',
        price: '₹12,000',
        includes: [
          'Structured curriculum',
          'Weekly live classes',
          'Practice sessions',
          'Ongoing mentorship',
          'Certification',
        ],
      },
      {
        name: 'Online Course',
        duration: 'Self-paced',
        description: 'Learn from home with video modules and assignments.',
        price: '₹5,000',
        includes: [
          'All video modules',
          'Downloadable materials',
          'Lifetime access',
          'Email support',
          'Certification',
        ],
      },
      {
        name: 'Private Training',
        duration: 'Customized',
        description: 'One-on-one mentorship and personalized learning.',
        price: '₹1,500',
        includes: [
          'Personalized curriculum',
          'One-on-one sessions',
          'Flexible scheduling',
          'Direct feedback',
          'Certification',
        ],
      },
    ],
  },
  faq: {
    title: 'Healing Courses FAQ',
    questions: [
      {
        question: 'Do I need prior experience to start?',
        answer:
          'No! Our courses begin with foundations and are designed for complete beginners. Prior experience helps but is not required.',
      },
      {
        question: 'Are certifications recognized nationally?',
        answer:
          'Yes, our certifications are recognized by professional healing associations and can support building a healing practice.',
      },
      {
        question: 'How much can I charge as a certified healer?',
        answer:
          'This varies by location and modality, but certified healers typically charge ₹500-₹2,000+ per session depending on experience.',
      },
      {
        question: 'Can I teach after certification?',
        answer:
          'Yes! Our advanced levels prepare you to teach. After completing requirements, you can become a certified instructor.',
      },
      {
        question: 'Is there ongoing support after the course?',
        answer:
          'Absolutely! We offer lifetime mentorship, supervision, continuing education, and community support for all graduates.',
      },
      {
        question: 'Can I combine modalities?',
        answer:
          'Yes! Many practitioners combine Reiki, Energy Healing, Chakra work, and other modalities. We teach how to integrate them effectively.',
      },
    ],
  },
  cta: {
    title: 'Become a Certified Healing Practitioner',
    subtitle: 'Transform your passion for healing into a thriving practice.',
    buttons: [
      {
        label: 'Enroll Now',
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
