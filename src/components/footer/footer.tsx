import type { ReactNode } from 'react';
import Link from 'next/link';
import { footerData } from '@/data/content';
import { rehasData } from '@/data/rehasData';
import styles from './footer.module.css';
import Image from 'next/image';
import ScrollToTopButton from './scrollToTopButton';

const iconMap: Record<string, ReactNode> = {
  Facebook: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.86 8 9.8v-6.93H7.9v-2.87H10V9.8c0-2.08 1.24-3.24 3.14-3.24.9 0 1.84.16 1.84.16v2.02h-1.03c-1.02 0-1.34.63-1.34 1.27v1.53h2.28l-.36 2.87h-1.92V21.8c4.56-.94 8-4.96 8-9.8z" fill="currentColor" />
    </svg>
  ),
  Twitter: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path d="M22.46 6c-.77.34-1.6.57-2.47.68a4.3 4.3 0 0 0 1.88-2.38 8.56 8.56 0 0 1-2.72 1.04 4.28 4.28 0 0 0-7.3 3.9A12.13 12.13 0 0 1 3.11 4.6a4.27 4.27 0 0 0 1.33 5.72 4.25 4.25 0 0 1-1.94-.54v.05a4.28 4.28 0 0 0 3.43 4.2 4.27 4.27 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.97 8.58 8.58 0 0 1-5.3 1.83A8.78 8.78 0 0 1 2 18.4a12.09 12.09 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.39-.01-.58A8.7 8.7 0 0 0 22.46 6z" fill="currentColor" />
    </svg>
  ),
  Instagram: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm0 2h10c1.65 0 3 1.35 3 3v10c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3zm8 2a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0V7a1 1 0 0 0-1-1zm-4 1.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 2a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z" fill="currentColor" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path d="M4.98 3.5a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5zM3 8.93h3.96V21H3V8.93zm7.22 0h3.79v1.65h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.09V21h-3.96v-5.7c0-1.36-.02-3.11-1.9-3.11-1.9 0-2.19 1.48-2.19 3.02V21h-3.97V8.93z" fill="currentColor" />
    </svg>
  ),
};

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <section className={styles.mainFooter}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            <div className={styles.footerColumn}>
              <div className={styles.footerLogo}>
                <Image
                  src={rehasData.profile.logo}
                  alt={rehasData.profile.imageAlt}
                  width={48}
                  height={48}
                />
                <h2>{rehasData.profile.nameCompany}</h2>
              </div>
              <p className={styles.tagline}>{footerData.brand.tagline}</p>
              <div className={styles.socialLinks}>
                {footerData.brand.social.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    className={styles.socialIcon}
                    title={social.title}
                  >
                    {iconMap[social.icon] ?? null}
                  </a>
                ))}
              </div>
            </div>

            {footerData.sections.map((section, sectionIdx) => (
              <div className={styles.footerColumn} key={sectionIdx}>
                <p className={styles.footerSectionTitle}>{section.title}</p>
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

          <div className={styles.divider}></div>

          <div className={styles.footerBottom}>
            <p>
              &copy; {currentYear} {footerData.copyright.company}. {footerData.copyright.text}
            </p>
            <div className={styles.poweredBy}>
              <p>
                {footerData.poweredBy.text}{' '}
                <a href={footerData.poweredBy.url} target="_blank" rel="noopener noreferrer">
                  {footerData.poweredBy.company}
                </a>
              </p>
            </div>
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

      <ScrollToTopButton />
    </footer>
  );
}
