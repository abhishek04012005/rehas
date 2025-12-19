'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Email,
  Phone,
  LocationOn,
  AccessTime,
  KeyboardArrowUp,
} from '@mui/icons-material';
import { footerData } from '@/data/content';
import styles from './footer.module.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      Facebook: <Facebook fontSize="small" />,
      Twitter: <Twitter fontSize="small" />,
      Instagram: <Instagram fontSize="small" />,
      LinkedIn: <LinkedIn fontSize="small" />,
    };
    return icons[iconName] || null;
  };

  return (
    <footer className={styles.footer}>
      {/* Main Footer */}
      <section className={styles.mainFooter}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            {/* Brand Column */}
            <div className={styles.footerColumn}>
              <div className={styles.footerLogo}>
                <span className={styles.logoIcon}>{footerData.brand.icon}</span>
                <h2>{footerData.brand.name}</h2>
              </div>
              <p className={styles.tagline}>
                {footerData.brand.tagline}
              </p>
              <div className={styles.socialLinks}>
                {footerData.brand.social.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    className={styles.socialIcon}
                    title={social.title}
                  >
                    {getIconComponent(social.icon)}
                  </a>
                ))}
              </div>
            </div>

            {/* Dynamic Sections */}
            {footerData.sections.map((section, sectionIdx) => (
              <div className={styles.footerColumn} key={sectionIdx}>
                <h4>{section.title}</h4>
                <ul>
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer Divider */}
          <div className={styles.divider}></div>

          {/* Bottom Footer */}
          <div className={styles.footerBottom}>
            <p>&copy; {footerData.copyright.year} {footerData.copyright.company}. {footerData.copyright.text}</p>
            <div className={styles.footerLinks}>
              {footerData.legal.map((legal, idx) => (
                <span key={idx}>
                  <a href={legal.href}>{legal.label}</a>
                  {idx < footerData.legal.length - 1 && <span>•</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <button 
        className={styles.scrollToTop}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        title="Scroll to top"
      >
        <KeyboardArrowUp />
      </button>
    </footer>
  );
}