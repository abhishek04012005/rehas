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
        value: 'contact@rehas.in',
        link: 'mailto:contact@rehas.in',
        secondaryText: 'We\'ll respond within 24 hours',
      },
      {
        icon: 'Phone',
        title: 'Phone',
        value: '+91 9517973153',
        link: 'tel:9517973153',
        secondaryText: 'Mon-Fri, 9AM-6PM UTC',
      },
      {
        icon: 'LocationOn',
        title: 'Location',
        value: 'REHAS, Chanakya Nagar Road, Agam Kua',
        link: null,
        secondaryText: 'Patna, Bihar, India - 800007',
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
        placeholder: '+91 9517973153',
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
