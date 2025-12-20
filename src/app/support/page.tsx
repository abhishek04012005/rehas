'use client';

import Link from 'next/link';
import { useState } from 'react';
import LineArtBackground from '@/components/lineArtBackground/lineArtBackground';
import { ArrowBack, ExpandMore, MailOutline, Phone, ChatBubbleOutline, Description } from '@mui/icons-material';
import styles from './page.module.css';

export default function Support() {
  const currentYear = new Date().getFullYear();
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How do I book a consultation?',
      answer: 'You can book a consultation through our website by clicking the "Book Consultation" button or visiting our Enquiry page. Fill out the form with your details and preferred service, and we\'ll contact you to confirm your booking.',
    },
    {
      question: 'What information do I need for a birth chart reading?',
      answer: 'For an accurate birth chart reading, we need your complete birth details: date, exact time of birth, and location. The more precise the information, the more accurate your reading will be.',
    },
    {
      question: 'How long does a typical consultation last?',
      answer: 'Most consultations last between 45 minutes to 1 hour, depending on the type of service. Detailed readings and custom packages may take longer. You\'ll be informed of the duration when booking.',
    },
    {
      question: 'What is your refund policy?',
      answer: 'We offer refunds within 7 days of booking if you haven\'t attended your session. Since our services are experiential, no refunds are provided after the consultation has been delivered.',
    },
    {
      question: 'Can I reschedule my appointment?',
      answer: 'Yes, you can reschedule your appointment up to 48 hours before the scheduled time. Please contact us through the website or email to arrange a new date.',
    },
    {
      question: 'Is this a substitute for medical treatment?',
      answer: 'No. Our services are for wellness and spiritual guidance only and should not be considered a substitute for professional medical advice. Always consult a healthcare professional for medical concerns.',
    },
    {
      question: 'How do I contact customer support?',
      answer: 'You can reach our support team through: Email: support@rehas.com, Phone: +1 (234) 567-890, or by filling out our contact form on the Contact Us page.',
    },
    {
      question: 'Do you offer group sessions or workshops?',
      answer: 'Yes, we offer group meditation sessions, yoga classes, and wellness workshops. Contact us for information about upcoming group events and special packages.',
    },
  ];

  const supportChannels = [
    {
      title: 'Email Support',
      description: 'Send us an email and we\'ll respond within 24 hours.',
      contact: 'support@rehas.com',
      icon: <MailOutline className={styles.channelIconMUI} />,
    },
    {
      title: 'Phone Support',
      description: 'Call our support team during business hours (Mon-Fri, 9AM-6PM).',
      contact: '+1 (234) 567-890',
      icon: <Phone className={styles.channelIconMUI} />,
    },
    {
      title: 'Live Chat',
      description: 'Chat with our support team in real-time through the website.',
      contact: 'Available on website',
      icon: <ChatBubbleOutline className={styles.channelIconMUI} />,
    },
    {
      title: 'Contact Form',
      description: 'Fill out our contact form and we\'ll get back to you promptly.',
      contact: 'Visit Contact Page',
      icon: <Description className={styles.channelIconMUI} />,
    },
  ];

  return (
    <div className={styles.container}>
      <LineArtBackground variant="minimal" opacity={0.08} />
      
      {/* Back Button */}
      <div className={styles.backButton}>
        <Link href="/">
          <ArrowBack className={styles.backIcon} />
          Back to Home
        </Link>
      </div>

      {/* Header */}
      <div className={styles.header}>
        <h1>Customer Support & FAQ</h1>
        <p className={styles.subtitle}>
          We're here to help you on your cosmic wellness journey
        </p>
      </div>

      {/* Support Channels */}
      <div className={styles.supportSection}>
        <h2 className={styles.sectionTitle}>Get In Touch</h2>
        <div className={styles.channelsGrid}>
          {supportChannels.map((channel, idx) => (
            <div key={idx} className={styles.channelCard}>
              <div className={styles.channelIconWrapper}>{channel.icon}</div>
              <h3>{channel.title}</h3>
              <p>{channel.description}</p>
              <p className={styles.contact}>{channel.contact}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className={styles.faqSection}>
        <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
        <div className={styles.faqList}>
          {faqs.map((faq, idx) => (
            <div key={idx} className={styles.faqItem}>
              <button
                className={styles.faqQuestion}
                onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
              >
                <span>{faq.question}</span>
                <ExpandMore 
                  className={`${styles.faqIcon} ${openFAQ === idx ? styles.open : ''}`}
                />
              </button>
              {openFAQ === idx && (
                <div className={styles.faqAnswer}>
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Additional Help */}
      <div className={styles.additionalHelp}>
        <h2>Still need help?</h2>
        <p>
          If you couldn't find the answer you're looking for, please don't hesitate to contact us. 
          Our support team is dedicated to helping you and will respond to your inquiry as soon as possible.
        </p>
        <Link href="/contact" className={styles.contactButton}>
          Contact Us Now
        </Link>
      </div>

      {/* Footer Info */}
      <div className={styles.footer}>
        <p>&copy; {currentYear} REHAS. All rights reserved.</p>
        <div className={styles.footerLinks}>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <span>•</span>
          <Link href="/terms-of-service">Terms of Service</Link>
          <span>•</span>
          <Link href="/sitemap">Sitemap</Link>
        </div>
      </div>
    </div>
  );
}
