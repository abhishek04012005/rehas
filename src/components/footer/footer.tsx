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

  return (
    <footer className={styles.footer}>
      {/* Main Footer */}
      <section className={styles.mainFooter}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            {/* Brand Column */}
            <div className={styles.footerColumn}>
              <div className={styles.footerLogo}>
                <span className={styles.logoIcon}>✨</span>
                <h2>REHAS</h2>
              </div>
              <p className={styles.tagline}>
                Bridging ancient cosmic wisdom with modern wellness for a better tomorrow.
              </p>
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialIcon} title="Facebook">
                  <Facebook fontSize="small" />
                </a>
                <a href="#" className={styles.socialIcon} title="Twitter">
                  <Twitter fontSize="small" />
                </a>
                <a href="#" className={styles.socialIcon} title="Instagram">
                  <Instagram fontSize="small" />
                </a>
                <a href="#" className={styles.socialIcon} title="LinkedIn">
                  <LinkedIn fontSize="small" />
                </a>
              </div>
            </div>

            {/* Services Column */}
            <div className={styles.footerColumn}>
              <h4>Services</h4>
              <ul>
                <li><Link href="/astrology/birth-chart">Birth Chart Reading</Link></li>
                <li><Link href="/astrology/horoscope">Daily Horoscope</Link></li>
                <li><Link href="/wellness/meditation">Meditation Guide</Link></li>
                <li><Link href="/wellness/yoga">Yoga Classes</Link></li>
                <li><Link href="/consultation">Book Consultation</Link></li>
              </ul>
            </div>

            {/* Company Column */}
            <div className={styles.footerColumn}>
              <h4>Company</h4>
              <ul>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
                <li><Link href="/careers">Careers</Link></li>
              </ul>
            </div>

            {/* Resources Column */}
            <div className={styles.footerColumn}>
              <h4>Resources</h4>
              <ul>
                <li><Link href="#privacy">Privacy Policy</Link></li>
                <li><Link href="#terms">Terms of Service</Link></li>
                <li><Link href="#disclaimer">Disclaimer</Link></li>
                <li><Link href="#sitemap">Sitemap</Link></li>
                <li><Link href="#support">Support</Link></li>
              </ul>
            </div>

            {/* Contact Column */}
            <div className={styles.footerColumn}>
              <h4>Contact</h4>
              <ul className={styles.contactList}>
                <li>
                  <Email className={styles.contactIcon} />
                  <a href="mailto:info@rehas.com">info@rehas.com</a>
                </li>
                <li>
                  <Phone className={styles.contactIcon} />
                  <a href="tel:+1234567890">+1 (234) 567-890</a>
                </li>
                <li>
                  <LocationOn className={styles.contactIcon} />
                  <span>123 Cosmic St, Universe City, UC 12345</span>
                </li>
                <li>
                  <AccessTime className={styles.contactIcon} />
                  <span>Mon-Fri: 9AM - 6PM UTC</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Divider */}
          <div className={styles.divider}></div>

          {/* Bottom Footer */}
          <div className={styles.footerBottom}>
            <p>&copy; 2024 REHAS. All rights reserved.</p>
            <div className={styles.footerLinks}>
              <a href="#privacy">Privacy</a>
              <span>•</span>
              <a href="#terms">Terms</a>
              <span>•</span>
              <a href="#cookies">Cookies</a>
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