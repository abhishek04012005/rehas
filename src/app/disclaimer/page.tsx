import Link from 'next/link';
import LineArtBackground from '@/components/lineArtBackground/lineArtBackground';
import { ArrowBack, WarningAmber } from '@mui/icons-material';
import styles from './page.module.css';

export const metadata = {
  title: 'Disclaimer | REHAS - Medical & Service Disclaimer',
  description: 'Important disclaimer about REHAS services. Our guidance is not a substitute for professional medical advice. Understand our limitations and responsibilities.',
  keywords: 'disclaimer, medical disclaimer, service terms, wellness disclaimer, liability',
  robots: {
    index: true,
    follow: true,
  },
};

export default function Disclaimer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: 'Medical Disclaimer',
      content: [
        'The services, products, and information provided by REHAS are for educational and wellness purposes only.',
        'Astrology, numerology, meditation, and holistic wellness services are NOT medical treatments or substitutes for professional medical advice.',
        'If you are experiencing any medical conditions or health concerns, please consult with a qualified healthcare professional or physician.',
        'REHAS does not diagnose, treat, cure, or prevent any disease or medical condition.',
      ],
    },
    {
      title: 'No Liability for Results',
      content: [
        'While we strive to provide accurate and helpful guidance, results may vary based on individual circumstances and personal commitment.',
        'REHAS is not responsible for any negative outcomes, changes in life circumstances, or decisions made based on our services.',
        'Use of our services is at your own risk and discretion.',
      ],
    },
    {
      title: 'Personal Responsibility',
      content: [
        'You acknowledge that you are using our services of your own free will and at your own risk.',
        'You are personally responsible for all decisions made based on information or guidance received from REHAS.',
        'We strongly recommend consulting with qualified professionals before making major life decisions.',
      ],
    },
    {
      title: 'Third-Party Content',
      content: [
        'REHAS is not responsible for any external links, third-party websites, or their content.',
        'We do not endorse or guarantee the accuracy of information provided by external sources.',
        'Users access third-party content at their own risk and should verify information independently.',
      ],
    },
    {
      title: 'Limitation of Services',
      content: [
        'REHAS services are based on traditional practices and beliefs and have not been evaluated or approved by regulatory authorities.',
        'Results are not guaranteed and individual experiences may vary significantly.',
        'Our services are intended for personal growth and wellness support, not as a substitute for professional services.',
      ],
    },
    {
      title: 'Refund Policy',
      content: [
        'Refunds are provided according to our stated refund policy.',
        'Since our services are experiential and intangible, refunds depend on the specific circumstances and service type.',
        'Please review our complete refund policy before booking any services.',
      ],
    },
    {
      title: 'Data and Privacy Disclaimer',
      content: [
        'For astrological readings and personalized guidance, we collect personal information including birth details.',
        'This information is used solely for providing our services and is handled according to our Privacy Policy.',
        'By using our services, you consent to the collection and use of your personal information as described.',
      ],
    },
    {
      title: 'Intellectual Property',
      content: [
        'All content on the REHAS website, including text, images, graphics, and logos, is the property of REHAS or its content suppliers.',
        'Reproduction or distribution of this content without permission is prohibited.',
        'You may use the content for personal, non-commercial purposes only.',
      ],
    },
    {
      title: 'Changes and Updates',
      content: [
        'REHAS reserves the right to modify, update, or discontinue services without notice.',
        'We are not responsible for any disruption or loss of service.',
        'This disclaimer may be updated at any time without prior notice.',
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
        <div className={styles.headerContent}>
          <WarningAmber className={styles.warningIcon} />
          <h1>Disclaimer</h1>
        </div>
        <p className={styles.lastUpdated}>Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      {/* Important Notice */}
      <div className={styles.importantNotice}>
        <p>
          <strong>Important:</strong> Please read this disclaimer carefully before using our services. 
          Our wellness and spiritual services are not medical treatments and should not replace professional 
          medical advice, diagnosis, or treatment.
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
          <Link href="/terms-of-service">Terms of Service</Link>
          <span>•</span>
          <Link href="/contact">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
