import Link from 'next/link';
import { heroData } from '@/data/content';
import styles from './hero.module.css';
import { JSX } from 'react';
import HeroVisualLoader from './heroVisualLoader';

const ArrowForwardIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 4l1.41 1.41L8.83 10H20v2H8.83l4.58 4.59L12 18l-8-8 8-8z" fill="currentColor" />
  </svg>
);

const InfoIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M11 17h2v-6h-2v6zm0-8h2V7h-2v2zm1-7C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="currentColor" />
  </svg>
);

const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="currentColor" />
  </svg>
);

const AutoAwesomeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 2l1.41 4.26L18 7.27l-3.26 2.56L15.18 14 12 11.73 8.82 14l.44-4.17L6 7.27l4.59-.99L12 2z" fill="currentColor" />
  </svg>
);

const SelfImprovementIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor" />
  </svg>
);

const KeyboardDoubleArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41zM4 16.59L8.59 12 4 7.41 5.41 6l6 6-6 6L4 16.59z" fill="currentColor" />
  </svg>
);

const PublicIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-1.5 0-2.88-.44-4.06-1.2.03-.48.06-.96.06-1.45 0-1.68-.28-3.31-.8-4.83C7.85 12.04 9.84 13 12 13s4.15-.96 5.8-2.48c-.52 1.52-.8 3.15-.8 4.83 0 .49.02.97.06 1.45C14.88 19.56 13.5 20 12 20z" fill="currentColor" />
  </svg>
);

const iconMap: Record<string, (props: { className?: string }) => JSX.Element | null> = {
  Sparkles: StarIcon,
  Nightlight: PublicIcon,
  AutoAwesome: AutoAwesomeIcon,
  SelfImprovement: SelfImprovementIcon,
};

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>
              <KeyboardDoubleArrowRightIcon /> Discover Your Cosmic Path
            </span>
          </div>

          <h1 className={styles.heading}>
            <span className={styles.gradientText}>{heroData.title}</span>
            <br />
            <span className={styles.secondaryText}>{heroData.subtitle}</span>
          </h1>

          <p className={styles.description}>
            Explore the universe within you through ancient wisdom and modern wellness practices.
            Transform your life with personalized cosmic guidance and holistic healing.
          </p>

          <div className={styles.ctaGroup}>
            {heroData.buttons.map((btn, idx) => (
              <Link
                key={idx}
                href={btn.href}
                className={btn.type === 'primary' ? styles.primaryBtn : styles.secondaryBtn}
              >
                <span>{btn.label}</span>
                {btn.type === 'primary' ? (
                  <ArrowForwardIcon className={styles.buttonIcon} />
                ) : (
                  <InfoIcon className={styles.buttonIcon} />
                )}
              </Link>
            ))}
          </div>

          <div className={styles.stats}>
            {heroData.stats.map((stat, idx) => (
              <div className={styles.stat} key={idx}>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.visualWrapper}>
          <HeroVisualLoader />
        </div>
      </div>
    </section>
  );
}
