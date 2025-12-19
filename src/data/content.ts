/**
 * Centralized Content Data
 * All static content for the website is managed here
 * Components import this data instead of hardcoding content
 */

// ============================================
// HERO COMPONENT DATA
// ============================================
export const heroData = {
  title: 'Welcome to REHAS',
  subtitle: 'Discover Your Cosmic Path Through Astrology & Wellness',
  buttons: [
    {
      label: 'Start Your Journey',
      href: '/consultation',
      type: 'primary',
    },
    {
      label: 'Learn More',
      href: '/about',
      type: 'secondary',
    },
  ],
  stats: [
    { number: '10K+', label: 'Happy Clients' },
    { number: '5000+', label: 'Readings' },
    { number: '15+', label: 'Years Experience' },
  ],
  floatingCards: [
    { icon: '✨', text: 'Birth Chart' },
    { icon: '🌙', text: 'Horoscope' },
    { icon: '💫', text: 'Star Reading' },
    { icon: '🧘', text: 'Meditation' },
  ],
} as const;

// ============================================
// ABOUT COMPONENT DATA
// ============================================
export const aboutData = {
  hero: {
    title: 'About REHAS',
    subtitle: 'Bridging ancient cosmic wisdom with modern wellness',
  },
  story: {
    cards: [
      {
        title: 'Who We Are',
        description:
          'REHAS empowers seekers through astrology and holistic wellness, serving thousands worldwide.',
      },
      {
        title: 'What We Do',
        description:
          'We offer astrology readings, wellness coaching, and meditation guidance to help you live authentically.',
      },
    ],
  },
  stats: [
    { number: '10K+', label: 'Clients' },
    { number: '25+', label: 'Countries' },
    { number: '4', label: 'Experts' },
    { number: '15+', label: 'Years' },
  ],
  team: [
    {
      avatar: '👩‍⚕️',
      name: 'Sarah Chen',
      role: 'Astrology Expert',
    },
    {
      avatar: '👨‍⚕️',
      name: 'Dr. Rajesh',
      role: 'Wellness Coach',
    },
    {
      avatar: '🧘‍♀️',
      name: 'Emma Johnson',
      role: 'Meditation Guide',
    },
    {
      avatar: '🥗',
      name: 'Alex Rodriguez',
      role: 'Nutrition Specialist',
    },
  ],
  cta: {
    title: 'Ready to Transform?',
    subtitle: 'Join thousands discovering their cosmic path',
    buttons: [
      {
        label: 'Book Consultation',
        href: '/consultation',
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

// ============================================
// CONTACT COMPONENT DATA
// ============================================
export const contactData = {
  hero: {
    title: 'Get in Touch',
    subtitle: 'We\'d love to hear from you. Reach out to us anytime.',
  },
  info: {
    title: 'Contact Information',
    description:
      'Have questions? We\'re here to help and answer any question you might have.',
    cards: [
      {
        icon: 'Email',
        title: 'Email',
        value: 'info@rehas.com',
        link: 'mailto:info@rehas.com',
        secondaryText: 'We\'ll respond within 24 hours',
      },
      {
        icon: 'Phone',
        title: 'Phone',
        value: '+1 (234) 567-890',
        link: 'tel:+1234567890',
        secondaryText: 'Mon-Fri, 9AM-6PM UTC',
      },
      {
        icon: 'LocationOn',
        title: 'Location',
        value: '123 Cosmic Street',
        link: null,
        secondaryText: 'Universe City, UC 12345',
      },
    ],
  },
  form: {
    title: 'Send us a Message',
    description:
      'Fill out the form below and we\'ll get back to you as soon as possible.',
    fields: [
      {
        name: 'name',
        label: 'Full Name *',
        type: 'text',
        placeholder: 'Your name',
        required: true,
      },
      {
        name: 'phone',
        label: 'Phone Number',
        type: 'tel',
        placeholder: '+1 (234) 567-890',
        required: false,
      },
      {
        name: 'message',
        label: 'Message *',
        type: 'textarea',
        placeholder: 'Tell us more about your inquiry...',
        required: true,
        rows: 6,
      },
    ],
    submitButton: 'Send Message',
    successMessage: 'Thank you! Your message has been sent successfully.',
  },
} as const;

// ============================================
// FOOTER COMPONENT DATA
// ============================================
export const footerData = {
  brand: {
    icon: '✨',
    name: 'REHAS',
    tagline:
      'Bridging ancient cosmic wisdom with modern wellness for a better tomorrow.',
    social: [
      { icon: 'Facebook', href: '#', title: 'Facebook' },
      { icon: 'Twitter', href: '#', title: 'Twitter' },
      { icon: 'Instagram', href: '#', title: 'Instagram' },
      { icon: 'LinkedIn', href: '#', title: 'LinkedIn' },
    ],
  },
  sections: [
    {
      title: 'Services',
      links: [
        { label: 'Birth Chart Reading', href: '/astrology/birth-chart' },
        { label: 'Daily Horoscope', href: '/astrology/horoscope' },
        { label: 'Meditation Guide', href: '/wellness/meditation' },
        { label: 'Yoga Classes', href: '/wellness/yoga' },
        { label: 'Book Consultation', href: '/consultation' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contact', href: '/contact' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Careers', href: '/careers' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Privacy Policy', href: '#privacy' },
        { label: 'Terms of Service', href: '#terms' },
        { label: 'Disclaimer', href: '#disclaimer' },
        { label: 'Sitemap', href: '#sitemap' },
        { label: 'Support', href: '#support' },
      ],
    },
    {
      title: 'Contact',
      links: [
        { label: 'Email: info@rehas.com', href: 'mailto:info@rehas.com' },
        { label: 'Phone: +1 (234) 567-890', href: 'tel:+1234567890' },
        { label: 'Address: 123 Cosmic Street', href: '#' },
        { label: 'Hours: Mon-Fri, 9AM-6PM', href: '#' },
      ],
    },
  ],
  newsletter: {
    title: 'Subscribe to Our Newsletter',
    placeholder: 'Enter your email',
    button: 'Subscribe',
  },
  copyright: {
    year: 2024,
    company: 'REHAS',
    text: 'All rights reserved.',
  },
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Disclaimer', href: '#' },
  ],
} as const;

// ============================================
// NAVBAR DATA
// ============================================
export const navbarData = {
  logo: {
    text: 'REHAS',
    badge: '✨',
  },
  links: [
    { label: 'Home', href: '/' },
    {
      label: 'Astrology',
      href: '/astrology',
      submenu: [
        { label: 'Birth Chart', href: '/astrology/birth-chart', icon: '📊' },
        { label: 'Horoscope', href: '/astrology/horoscope', icon: '🌙' },
        { label: 'Compatibility', href: '/astrology/compatibility', icon: '💞' },
        { label: 'Transit', href: '/astrology/transit', icon: '🚀' },
      ],
    },
    {
      label: 'Wellness',
      href: '/wellness',
      submenu: [
        { label: 'Meditation', href: '/wellness/meditation', icon: '🧘' },
        { label: 'Yoga', href: '/wellness/yoga', icon: '🏃' },
        { label: 'Nutrition', href: '/wellness/nutrition', icon: '🥗' },
        { label: 'Mindfulness', href: '/wellness/mindfulness', icon: '🧠' },
      ],
    },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  cta: {
    label: 'Book Consultation',
    href: '/consultation',
  },
} as const;

// ============================================
// HOMEPAGE DATA
// ============================================
export const homepageData = {
  features: [
    {
      icon: '🌟',
      title: 'Birth Chart Analysis',
      description: 'Deep insights into your cosmic blueprint',
    },
    {
      icon: '🔮',
      title: 'Daily Horoscope',
      description: 'Personalized guidance for each day',
    },
    {
      icon: '💑',
      title: 'Compatibility Check',
      description: 'Understand relationship dynamics',
    },
    {
      icon: '🧘',
      title: 'Meditation Guides',
      description: 'Inner peace through guided practice',
    },
    {
      icon: '🥗',
      title: 'Nutrition Plans',
      description: 'Wellness aligned with your nature',
    },
    {
      icon: '🏃',
      title: 'Yoga Sessions',
      description: 'Balance body, mind, and spirit',
    },
  ],
  whyChooseUs: {
    title: 'Why Choose REHAS?',
    stats: [
      { number: '10K+', label: 'Satisfied Clients' },
      { number: '25+', label: 'Countries Served' },
      { number: '15+', label: 'Years of Expertise' },
      { number: '98%', label: 'Customer Satisfaction' },
    ],
  },
  cta: {
    title: 'Begin Your Wellness Journey',
    description: 'Join thousands discovering their path through astrology and holistic wellness.',
    buttons: [
      { label: 'Book Now', href: '/consultation', type: 'primary' },
      { label: 'Learn More', href: '/about', type: 'secondary' },
    ],
  },
} as const;

// ============================================
// 404 PAGE DATA
// ============================================
export const notFoundData = {
  errorCode: '404',
  title: 'Page Not Found',
  description:
    'The page you\'re looking for seems to have drifted away like a lost star. Don\'t worry, we\'ll guide you back on track.',
  suggestions: {
    title: 'Here are some helpful links:',
    links: [
      { label: '🏠 Return Home', href: '/' },
      { label: '✨ Explore Astrology', href: '/astrology' },
      { label: '🧘 Discover Wellness', href: '/wellness' },
      { label: '📝 Read Our Blog', href: '/blog' },
      { label: '💬 Contact Us', href: '/contact' },
    ],
  },
} as const;
