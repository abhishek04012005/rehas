// Enquiry Form Data
export const enquiryData = {
  modal: {
    title: 'Quick Enquiry',
    subtitle: 'Get in touch with us',
  },
  page: {
    title: 'Send Us an Enquiry',
    subtitle: 'Get in touch with our team and discover the perfect service for you',
  },
  fields: {
    name: {
      label: 'Full Name',
      placeholder: 'Enter your full name',
      required: true,
    },
    number: {
      label: 'Phone Number',
      placeholder: 'Enter your phone number',
      required: true,
      validation: 'Minimum 10 digits',
    },
    serviceType: {
      label: 'Service Type',
      placeholder: 'Choose a service',
      required: true,
    },
  },
  messages: {
    success: 'Thank you! We have received your enquiry and will contact you soon.',
    error: 'An error occurred. Please try again.',
    validation: 'Please fill in all fields correctly.',
  },
};
