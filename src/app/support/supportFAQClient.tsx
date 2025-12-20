'use client';

import { useState } from 'react';
import { ExpandMore } from '@mui/icons-material';
import styles from './page.module.css';

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

export default function SupportFAQClient() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <div className={styles.faqSection}>
      <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
      <div className={styles.faqList}>
        {faqs.map((faq, idx) => (
          <div key={idx} className={styles.faqItem}>
            <button
              className={styles.faqQuestion}
              onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
              aria-expanded={openFAQ === idx}
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
  );
}
