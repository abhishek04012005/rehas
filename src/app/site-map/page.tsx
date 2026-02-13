import { Metadata } from 'next';
import Link from 'next/link';
import LineArtBackground from '@/components/lineArtBackground';
import { ArrowBack, ChevronRight } from '@mui/icons-material';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Sitemap | REHAS Wellness Services',
  description: 'Complete sitemap of REHAS website. Navigate through all astrology services, healing therapies, wellness articles, and support resources.',
  keywords: [
    'Sitemap',
    'Site Map',
    'Website Navigation',
    'Site Structure',
    'All Pages',
    'Service Directory',
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://rehas.in/site-map',
  },
};

export default function Sitemap() {
  const currentYear = new Date().getFullYear();

  const sitemapData = [
    {
      category: 'Main Pages',
      links: [
        { label: 'Home', href: '/' },
        { label: 'About Us', href: '/about' },
        { label: 'Services', href: '/services' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      category: 'Services',
      links: [
        { label: 'Birth Chart Reading', href: '/services' },
        { label: 'Horoscope', href: '/services' },
        { label: 'Compatibility Check', href: '/services' },
        { label: 'Transit Analysis', href: '/services' },
        { label: 'Meditation Guide', href: '/services' },
        { label: 'Yoga Classes', href: '/services' },
      ],
    },
    {
      category: 'Healing & Wellness',
      links: [
        { label: 'Astrology Services', href: '/healing' },
        { label: 'Wellness Coaching', href: '/wellness' },
        { label: 'Reiki Healing', href: '/healing' },
        { label: 'Numerology', href: '/healing' },
        { label: 'Energy Healing', href: '/healing' },
      ],
    },
    {
      category: 'User Features',
      links: [
        { label: 'Book Consultation', href: '/enquiry' },
        { label: 'Testimonials', href: '/testimonials' },
        { label: 'Enquiry Form', href: '/enquiry' },
      ],
    },
    {
      category: 'Legal & Policies',
      links: [
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Terms of Service', href: '/terms-of-service' },
        { label: 'Disclaimer', href: '/disclaimer' },
        { label: 'Sitemap', href: '/sitemap' },
      ],
    },
    {
      category: 'Support',
      links: [
        { label: 'Contact Us', href: '/contact' },
        { label: 'FAQ', href: '/support' },
        { label: 'Get Help', href: '/support' },
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
        <h1>Website Sitemap</h1>
        <p className={styles.subtitle}>
          Navigate through all pages and sections of REHAS
        </p>
      </div>

      {/* Sitemap Content */}
      <div className={styles.content}>
        <div className={styles.sitemapGrid}>
          {sitemapData.map((section, idx) => (
            <div key={idx} className={styles.sitemapSection}>
              <h2 className={styles.sectionTitle}>{section.category}</h2>
              <ul className={styles.linksList}>
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx} className={styles.linkItem}>
                    <Link href={link.href} className={styles.link}>
                      <ChevronRight className={styles.chevronIcon} />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className={styles.additionalInfo}>
          <h2>Site Features</h2>
          <div className={styles.featuresList}>
            <div className={styles.featureItem}>
              <h3>Personalized Services</h3>
              <p>Get customized astrological readings and wellness guidance tailored to your unique cosmic profile.</p>
            </div>
            <div className={styles.featureItem}>
              <h3>Expert Consultations</h3>
              <p>Book sessions with our experienced practitioners who combine ancient wisdom with modern wellness approaches.</p>
            </div>
            <div className={styles.featureItem}>
              <h3>Educational Content</h3>
              <p>Explore our blog and resources to learn about astrology, numerology, meditation, and holistic wellness.</p>
            </div>
            <div className={styles.featureItem}>
              <h3>Community Support</h3>
              <p>Join our community of wellness seekers and get support on your journey to cosmic alignment.</p>
            </div>
          </div>
        </div>
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
