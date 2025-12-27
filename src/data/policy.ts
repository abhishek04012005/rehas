// ============================================
// POLICY PAGE DATA
// ============================================

import { contactData } from './contact';

export const policyData = {
  hero: {
    title: 'Our Policies',
    subtitle: 'Transparency and trust are at the heart of everything we do',
    description: 'Learn about our commitment to your privacy, data security, and fair practices',
  },
  
  sections: [
    {
      id: 'privacy',
      title: 'Privacy Policy',
      icon: 'Lock',
      content: [
        {
          subtitle: 'Introduction',
          text: 'At REHAS, your privacy is our priority. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and utilize our services.',
        },
        {
          subtitle: 'Information We Collect',
          text: 'We collect information you provide directly to us, such as when you fill out forms, make purchases, or contact us. This may include your name, email address, phone number, and service preferences.',
          points: [
            'Personal information provided through contact forms',
            'Payment information processed through secure gateways',
            'Service booking and preference data',
            'Communication history for customer support',
          ],
        },
        {
          subtitle: 'How We Use Your Information',
          text: 'Your information helps us provide, maintain, and improve our services.',
          points: [
            'Process your service bookings and payments',
            'Send you service-related updates and confirmations',
            'Respond to your inquiries and support requests',
            'Improve our website and service offerings',
            'Comply with legal obligations',
          ],
        },
        {
          subtitle: 'Data Protection',
          text: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All sensitive data is encrypted using industry-standard security protocols.',
        },
        {
          subtitle: 'Contact for Privacy Concerns',
          text: `For any privacy-related questions or concerns, please contact us at ${contactData.info.cards[0].value}`,
        },
      ],
    },
    {
      id: 'terms',
      title: 'Terms of Service',
      icon: 'Description',
      content: [
        {
          subtitle: 'Acceptance of Terms',
          text: 'By accessing and using REHAS website and services, you accept and agree to be bound by the terms and provision of this agreement.',
        },
        {
          subtitle: 'Use License',
          text: 'You are granted a limited, non-exclusive, non-transferable license to access and use our website and services for personal, non-commercial purposes only.',
          points: [
            'You must not modify or copy any content without permission',
            'You must not use our services for any unlawful purpose',
            'You must not attempt to gain unauthorized access',
            'You must not transmit any harmful or malicious code',
          ],
        },
        {
          subtitle: 'Service Disclaimer',
          text: 'REHAS provides wellness and spiritual guidance services. These services are not substitutes for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for medical concerns.',
        },
        {
          subtitle: 'Limitation of Liability',
          text: 'In no event shall REHAS be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the website or services.',
        },
        {
          subtitle: 'Modifications to Service',
          text: 'REHAS reserves the right to modify or discontinue services at any time without notice. We are not liable for any modifications or interruptions.',
        },
      ],
    },
    {
      id: 'booking',
      title: 'Booking & Cancellation Policy',
      icon: 'EventNote',
      content: [
        {
          subtitle: 'How to Book',
          text: 'You can book our services through our website by filling out the booking form or contacting us directly.',
          points: [
            'Select your desired service and time slot',
            'Provide necessary personal information',
            'Complete the payment process',
            'Receive confirmation via email or SMS',
          ],
        },
        {
          subtitle: 'Payment Terms',
          text: 'Full payment is required at the time of booking. We accept online payments through secure payment gateways. All prices are in Indian Rupees (₹).',
        },
        {
          subtitle: 'Cancellation Policy',
          text: 'Cancellations must be made at least 48 hours before your scheduled service for a full refund.',
          points: [
            'Cancellations within 48 hours: 50% refund',
            'Cancellations within 24 hours: No refund',
            'No-show appointments: No refund',
            'Refunds processed within 5-7 business days',
          ],
        },
        {
          subtitle: 'Rescheduling',
          text: 'Services can be rescheduled up to 48 hours before the appointment without any penalty. After this time, standard cancellation charges apply.',
        },
        {
          subtitle: 'Service Quality Guarantee',
          text: 'If you are not satisfied with our service, please contact us within 24 hours to discuss alternatives or refund options.',
        },
      ],
    },
    {
      id: 'payment',
      title: 'Payment & Refund Policy',
      icon: 'CreditCard',
      content: [
        {
          subtitle: 'Accepted Payment Methods',
          text: 'We accept various payment methods for your convenience.',
          points: [
            'Credit/Debit Cards (Visa, MasterCard, Rupay)',
            'Digital Wallets (UPI, Google Pay, PhonePe)',
            'Net Banking',
            'Direct Bank Transfer',
          ],
        },
        {
          subtitle: 'Payment Security',
          text: 'All payment transactions are processed through Razorpay, a PCI-DSS compliant payment gateway. Your card information is never stored on our servers.',
        },
        {
          subtitle: 'Refund Process',
          text: 'Refunds are processed back to the original payment method within 5-7 business days from approval.',
        },
        {
          subtitle: 'Failed Transactions',
          text: 'If your payment fails, you will be notified immediately. You can retry payment without any additional charges. Multiple failed attempts may require contacting our support team.',
        },
        {
          subtitle: 'Disputed Charges',
          text: 'If you notice unauthorized charges, contact us immediately with proof of the transaction.',
        },
      ],
    },
    {
      id: 'intellectual',
      title: 'Intellectual Property Rights',
      icon: 'AutoAwesome',
      content: [
        {
          subtitle: 'Content Ownership',
          text: 'All content on the REHAS website, including text, graphics, images, and videos, is the property of REHAS or its content suppliers and is protected by international copyright laws.',
        },
        {
          subtitle: 'Limited Use License',
          text: 'You may view and print pages from our website for your personal use only. You may not reproduce, republish, or distribute content without written permission.',
        },
        {
          subtitle: 'User-Generated Content',
          text: 'If you submit testimonials, reviews, or other content, you grant REHAS the right to use, modify, and display such content on our website and promotional materials.',
        },
        {
          subtitle: 'Trademarks',
          text: 'REHAS, its logo, and all related marks are trademarks of REHAS. Use of these trademarks requires explicit written permission.',
        },
      ],
    },
    {
      id: 'conduct',
      title: 'Code of Conduct',
      icon: 'Gavel',
      content: [
        {
          subtitle: 'Expected Behavior',
          text: 'Users are expected to conduct themselves with respect and professionalism when interacting with REHAS staff and other users.',
          points: [
            'Treat all staff and practitioners with respect',
            'Follow instructions provided during services',
            'Maintain punctuality for scheduled sessions',
            'Provide accurate information in booking forms',
            'Communicate any special needs in advance',
          ],
        },
        {
          subtitle: 'Prohibited Conduct',
          text: 'The following behaviors are strictly prohibited.',
          points: [
            'Harassment, discrimination, or abusive language',
            'Attempts to access unauthorized areas of our systems',
            'Misrepresentation of identity or information',
            'Recording services without explicit permission',
            'Violating intellectual property rights',
          ],
        },
        {
          subtitle: 'Consequences',
          text: 'Violations of this code of conduct may result in termination of service, cancellation of bookings without refund, or legal action.',
        },
      ],
    },
    {
      id: 'liability',
      title: 'Liability Waiver',
      icon: 'WarningAmber',
      content: [
        {
          subtitle: 'Health & Wellness Disclaimer',
          text: 'REHAS services are for wellness, spiritual growth, and self-discovery purposes only. They are not medical treatments and should not replace professional medical care.',
        },
        {
          subtitle: 'No Guarantees',
          text: 'While we provide quality services, we cannot guarantee specific results. Individual outcomes vary based on personal circumstances, openness, and commitment to the practice.',
        },
        {
          subtitle: 'Assumption of Risk',
          text: 'By booking our services, you assume all risks associated with the service. Consult with healthcare professionals before starting any new wellness practice, especially if you have existing health conditions.',
        },
        {
          subtitle: 'Limitation of Damages',
          text: 'REHAS shall not be liable for any indirect, incidental, or consequential damages arising from use of our services or website.',
        },
      ],
    },
  ],

  contact: {
    title: 'Policy Questions?',
    description: 'If you have any questions about our policies, please get in touch with us.',
    cards: contactData.info.cards,
  },

  cta: {
    title: 'Ready to Begin Your Journey?',
    subtitle: 'Book a service today and experience the transformation',
    buttons: [
      { label: 'Book a Service', href: '/enquiry', type: 'primary' },
      { label: 'Contact Us', href: '/contact', type: 'secondary' },
    ],
  },
} as const;
