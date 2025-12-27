'use client';

import Link from 'next/link';
import LineArtBackground from '@/components/lineArtBackground/lineArtBackground';
import { ArrowBack } from '@mui/icons-material';
import styles from './page.module.css';
import { contactData } from '@/data/contact';


export default function TermsOfService() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: [
        'By accessing and using this website and our services, you accept and agree to be bound by the terms and provision of this agreement.',
        'If you do not agree to abide by the above, please do not use this service.',
      ],
    },
    {
      title: '2. Use License',
      content: [
        'Permission is granted to temporarily download one copy of the materials (information or software) on REHAS website for personal, non-commercial transitory viewing only.',
        'This is the grant of a license, not a transfer of title, and under this license you may not:',
        '• Modify or copy the materials',
        '• Use the materials for any commercial purpose or for any public display',
        '• Attempt to decompile or reverse engineer any software contained on the website',
        '• Remove any copyright or other proprietary notations from the materials',
        '• Transfer the materials to another person or "mirror" the materials on any other server',
      ],
    },
    {
      title: '3. Disclaimer',
      content: [
        'The materials on REHAS website are provided on an "as is" basis without warranties of any kind, either express or implied.',
        'REHAS disclaims all warranties including, but not limited to, warranties of merchantability, fitness for a particular purpose, and non-infringement.',
        'Further, REHAS does not warrant the accuracy, completeness, or usefulness of any information on its website.',
      ],
    },
    {
      title: '4. Limitations of Liability',
      content: [
        'In no event shall REHAS or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the REHAS website.',
        'Even if REHAS or an authorized representative has been notified orally or in writing of the possibility of such damage, the liability shall not exceed the amount paid by you, if any, for the materials.',
      ],
    },
    {
      title: '5. Accuracy of Materials',
      content: [
        'The materials appearing on REHAS website could include technical, typographical, or photographic errors.',
        'REHAS does not warrant that any of the materials on its website are accurate, complete, or current.',
        'REHAS may make changes to the materials contained on its website at any time without notice.',
      ],
    },
    {
      title: '6. Links',
      content: [
        'REHAS has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site.',
        'The inclusion of any link does not imply endorsement by REHAS of the site.',
        'Use of any such linked website is at the user\'s own risk.',
      ],
    },
    {
      title: '7. Modifications',
      content: [
        'REHAS may revise these terms of service for its website at any time without notice.',
        'By using this website, you are agreeing to be bound by the then current version of these terms of service.',
      ],
    },
    {
      title: '8. Governing Law',
      content: [
        'These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which REHAS operates.',
        'You irrevocably submit to the exclusive jurisdiction of the courts in that location.',
      ],
    },
    {
      title: '9. User Responsibilities',
      content: [
        'You are responsible for maintaining the confidentiality of your account information and password.',
        'You agree to accept responsibility for all activities that occur under your account.',
        'You agree not to use the services for any illegal or unauthorized purpose.',
      ],
    },
    {
      title: '10. Contact Information',
      content: [
        'If you have any questions about these terms of service, please contact us at:',
        `Email: ${contactData.info.cards[0].value}`,
        `Phone: ${contactData.info.cards[1].value}`,
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
        <h1>Terms of Service</h1>
        <p className={styles.lastUpdated}>Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      {/* Introduction */}
      <div className={styles.introduction}>
        <p>
          Welcome to REHAS. These terms of service ("Terms") govern your access to and use of our website 
          and services. Please read these Terms carefully before using our website. By accessing and using 
          this website, you agree to be bound by these Terms.
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
          <Link href="/privacy-policy">Privacy Policy</Link>
          <span>•</span>
          <Link href="/disclaimer">Disclaimer</Link>
          <span>•</span>
          <Link href="/contact">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
