'use client';

import { useState } from 'react';
import Link from 'next/link';
import LineArtBackground from '@/components/lineArtBackground/lineArtBackground';
import { ArrowBack } from '@mui/icons-material';
import styles from './page.module.css';
import { contactData } from '@/data/contact';


export default function PrivacyPolicy() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: '1. Information We Collect',
      content: [
        'We collect information you provide directly to us, such as when you create an account, make a consultation booking, or contact us through our website.',
        'Types of information collected include: name, email address, phone number, birth details (for astrological readings), and any other information you voluntarily provide.',
        'We automatically collect certain information about your device and how you interact with our website using technologies like cookies and analytics.',
      ],
    },
    {
      title: '2. How We Use Your Information',
      content: [
        'To provide, maintain, and improve our services and respond to your inquiries.',
        'To send you promotional communications about new services, features, or offers (you can opt out anytime).',
        'To conduct analytics and understand how our website is being used.',
        'To comply with legal obligations and protect against fraud and abuse.',
      ],
    },
    {
      title: '3. Data Security',
      content: [
        'We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.',
        'Your data is encrypted during transmission and stored securely on our servers.',
        'However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.',
      ],
    },
    {
      title: '4. Third-Party Services',
      content: [
        'We use third-party services for payment processing, analytics, and hosting. These services have their own privacy policies.',
        'We do not share your personal information with third parties except as necessary to provide our services or as required by law.',
        'Your information is not sold, traded, or rented to third parties.',
      ],
    },
    {
      title: '5. Cookies and Tracking',
      content: [
        'We use cookies to enhance your browsing experience and understand your preferences.',
        'You can control cookie settings in your browser. Disabling cookies may affect some functionality of our website.',
        'We use analytics tools to track website usage and improve our services.',
      ],
    },
    {
      title: '6. Your Rights',
      content: [
        'You have the right to access, update, or delete your personal information at any time.',
        'You can opt out of promotional communications by clicking the unsubscribe link in our emails.',
        'To exercise these rights, please contact us at privacy@rehas.com.',
      ],
    },
    {
      title: '7. Children\'s Privacy',
      content: [
        'Our services are not directed to individuals under 18 years of age.',
        'We do not knowingly collect personal information from children under 18.',
        'If we become aware that a child has provided us with personal information, we will delete such information immediately.',
      ],
    },
    {
      title: '8. Changes to This Policy',
      content: [
        'We may update this privacy policy from time to time to reflect changes in our practices or legal requirements.',
        'We will notify you of any material changes by posting the updated policy on our website.',
        'Your continued use of our services constitutes your acceptance of the updated privacy policy.',
      ],
    },
    {
      title: '9. Contact Us',
      content: [
        'If you have any questions about this privacy policy or our privacy practices, please contact us at:',
        `Email: ${contactData.info.cards[0].value}`,
        `Phone: ${contactData.info.cards[1].value}`,
        `Address: ${contactData.info.cards[2].value} ${contactData.info.cards[2].secondaryText}`,
      ],
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
        <h1>Privacy Policy</h1>
        <p className={styles.lastUpdated}>Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      {/* Introduction */}
      <div className={styles.introduction}>
        <p>
          At REHAS, we respect your privacy and are committed to protecting your personal information. 
          This Privacy Policy explains how we collect, use, disclose, and safeguard your information when 
          you visit our website and use our services.
        </p>
      </div>

      {/* Content Sections */}
      <div className={styles.content}>
        {sections.map((section, idx) => (
          <section key={idx} className={styles.section}>
            <h2>{section.title}</h2>
            {section.content.map((paragraph, pIdx) => (
              <p key={pIdx}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>

      {/* Footer Info */}
      <div className={styles.footer}>
        <p>&copy; {currentYear} REHAS. All rights reserved.</p>
        <div className={styles.footerLinks}>
          <Link href="/terms-of-service">Terms of Service</Link>
          <span>•</span>
          <Link href="/disclaimer">Disclaimer</Link>
          <span>•</span>
          <Link href="/contact">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
