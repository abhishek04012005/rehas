import { HealingServiceData } from '@/components/healingService/healingService';

export const generalData: HealingServiceData = {
  hero: {
    title: 'General Consultation',
    subtitle: 'Personal Guidance for Life Decisions',
    description:
      'Get expert guidance on life challenges, career decisions, relationships, and personal growth. Our experienced consultants provide personalized advice tailored to your unique situation.',
  },
  overview: {
    title: 'What is General Consultation?',
    description:
      'General consultation is a comprehensive guidance service designed to help you navigate life\'s decisions with clarity and confidence. Whether you\'re facing career crossroads, relationship challenges, or seeking personal growth, our consultants offer practical wisdom and insights to empower your choices. Each session is personalized to address your specific concerns and goals.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop',
  },
  benefits: {
    title: 'Benefits of General Consultation',
    description: 'Discover how our consultation services can transform your life',
    items: [
      {
        title: 'Clarity on Decisions',
        description: 'Gain clear perspective on important life decisions and their potential outcomes.',
        icon: 'Lightbulb',
      },
      {
        title: 'Personalized Guidance',
        description: 'Receive tailored advice based on your unique circumstances and goals.',
        icon: 'SelfImprovement',
      },
      {
        title: 'Confidence Building',
        description: 'Build confidence in your choices and develop a strong sense of direction.',
        icon: 'Favorite',
      },
      {
        title: 'Problem Solving',
        description: 'Learn practical strategies to overcome challenges and obstacles.',
        icon: 'AutoAwesome',
      },
      {
        title: 'Personal Growth',
        description: 'Unlock your potential and accelerate your personal development journey.',
        icon: 'FlashOn',
      },
      {
        title: 'Life Balance',
        description: 'Achieve harmony across all areas of your life - career, relationships, health.',
        icon: 'Brightness3',
      },
    ],
  },
  process: {
    title: 'Our Consultation Process',
    steps: [
      {
        number: '01',
        title: 'Initial Assessment',
        description: 'Share your concerns, goals, and current situation in a confidential environment.',
      },
      {
        number: '02',
        title: 'In-Depth Discussion',
        description: 'Explore your challenges deeply and understand the underlying factors.',
      },
      {
        number: '03',
        title: 'Expert Insights',
        description: 'Receive guidance and practical strategies based on our expertise and experience.',
      },
      {
        number: '04',
        title: 'Action Plan',
        description: 'Develop a clear action plan with specific steps to achieve your goals.',
      },
    ],
  },
  sessions: {
    title: 'Consultation Types & Pricing',
    types: [
      {
        name: 'Quick Consultation',
        duration: '30 Minutes',
        price: '₹1,500',
        description: 'Brief guidance on specific questions or urgent concerns.',
        includes: [
          'Quick assessment of your situation',
          'Focused advice on specific topic',
          'Practical tips and recommendations',
        ],
      },
      {
        name: 'Standard Consultation',
        duration: '1 Hour',
        price: '₹3,000',
        description: 'Comprehensive guidance covering multiple aspects of your concern.',
        includes: [
          'In-depth assessment',
          'Detailed exploration of challenges',
          'Practical strategies and solutions',
          'Follow-up recommendations',
        ],
      },
      {
        name: 'Extended Package',
        duration: '2 Hours',
        price: '₹5,500',
        description: 'Complete guidance with detailed action planning and follow-up support.',
        includes: [
          'Comprehensive life assessment',
          'Deep-dive analysis',
          'Detailed action plan',
          ' 30-day follow-up support',
          'Email guidance',
        ],
      },
    ],
  },
  faq: {
    title: 'Frequently Asked Questions',
    questions: [
      {
        question: 'What topics can we discuss in a consultation?',
        answer:
          'We can discuss any life concern including career decisions, relationships, personal growth, family matters, financial planning, health concerns, and more. Our consultants are trained to help with a wide range of topics.',
      },
      {
        question: 'Are consultations confidential?',
        answer:
          'Yes, all consultations are completely confidential. We maintain strict privacy standards and your information is never shared with third parties.',
      },
      {
        question: 'How long before I see results?',
        answer:
          'Many clients report feeling more clarity and direction immediately after the session. Lasting results typically develop as you implement the recommended strategies over 2-4 weeks.',
      },
      {
        question: 'Can I book multiple sessions?',
        answer:
          'Absolutely! Many clients book multiple sessions for ongoing support and guidance. We offer package discounts for regular consultations.',
      },
      {
        question: 'What if I need urgent consultation?',
        answer:
          'We offer emergency consultation slots for urgent matters. Please contact us directly and we\'ll do our best to accommodate your schedule.',
      },
      {
        question: 'Do you offer online consultations?',
        answer:
          'Yes, we offer both in-person and online consultations. You can choose whichever format works best for you.',
      },
    ],
  },
  cta: {
    title: 'Ready for Positive Change?',
    subtitle: 'Book your consultation session today and start your journey towards clarity and success.',
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
};
