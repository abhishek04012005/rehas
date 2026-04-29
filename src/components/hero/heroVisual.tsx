"use client";
import { heroData } from '@/data/content';
import styles from './heroVisual.module.css';
import { JSX } from 'react';

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

const cardPositions = [
  { top: '12%', right: '6%' },
  { bottom: '18%', right: '8%' },
  { top: '48%', left: '0%' },
];

export default function HeroVisual() {
  return (
    <div className={styles.visual}>
      <div className={styles.gradientOrb} />

      <div className={styles.cosmicCircle}>
        <div className={styles.innerCircle}>
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="50" cy="50" r="40" opacity="0.3" />
            <circle cx="50" cy="50" r="30" opacity="0.2" />
            <path d="M50 10 L70 50 L50 90 L30 50 Z" opacity="0.4" />
            <circle cx="50" cy="50" r="8" fill="currentColor" />
          </svg>
        </div>
      </div>

      {heroData.floatingCards.map((card, idx) => {
        const IconComponent = iconMap[card.icon] ?? StarIcon;
        const position = cardPositions[idx % cardPositions.length];

        return (
          <div key={idx} className={styles.floatingCard} style={position}>
            <div className={styles.cardIcon}>
              <IconComponent className={styles.cardIconSvg} />
            </div>
            <div className={styles.cardText}>{card.text}</div>
          </div>
        );
      })}
    </div>
  );
}
