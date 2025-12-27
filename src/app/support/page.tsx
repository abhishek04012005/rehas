import { Metadata } from 'next';
import Link from 'next/link';
import LineArtBackground from '@/components/lineArtBackground/lineArtBackground';
import { ArrowBack, MailOutline, Phone, ChatBubbleOutline, Description } from '@mui/icons-material';
import styles from './page.module.css';
import SupportFAQClient from './supportFAQClient';
import { contactData } from '@/data/content';

export const metadata: Metadata = {
  title: 'Support & FAQ | REHAS Help Center',
  description: 'Get support with REHAS wellness services. Access comprehensive FAQs, contact options including email, phone, and live chat support for your queries.',
  keywords: [
    'Support',
    'FAQ',
    'Help Center',
    'Customer Support',
    'Contact Support',
    'Frequently Asked Questions',
    'Help',
    'Assistance',
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://rehas.in/support',
  },
};

export default function Support() {
  const currentYear = new Date().getFullYear();

  const supportChannels = [
    {
      title: 'Email Support',
      description: 'Send us an email and we\'ll respond within 24 hours.',
      contact: `${contactData.info.cards[0].value}`,
      icon: <MailOutline className={styles.channelIconMUI} />,
    },
    {
      title: 'Phone Support',
      description: 'Call our support team during business hours (Mon-Fri, 9AM-6PM).',
      contact: `${contactData.info.cards[1].value}`,
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

      {/* FAQ Section - Client Component */}
      <SupportFAQClient />

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
