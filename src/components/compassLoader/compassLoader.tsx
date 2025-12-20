'use client';

import styles from './compassLoader.module.css';

interface CompassLoaderProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  showBackground?: boolean;
}

export default function CompassLoader({
  size = 'medium',
  text = 'Loading',
  showBackground = false,
}: CompassLoaderProps) {
  return (
    <div
      className={`${styles.compassLoaderContainer} ${styles[size]} ${
        showBackground ? styles.withBackground : ''
      }`}
    >
      {/* Background overlay for page loading */}
      {showBackground && <div className={styles.overlay} />}

      <div className={styles.compassWrapper}>
        {/* Outer Rotating Ring */}
        <div className={styles.outerRing} />

        {/* Middle Ring */}
        <div className={styles.middleRing} />

        {/* Inner Circle with Compass */}
        <div className={styles.innerCompass}>
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
            {/* Cardinal directions */}
            <text x="50" y="15" textAnchor="middle" className={styles.cardinalText}>
              N
            </text>
            <text x="85" y="55" textAnchor="middle" className={styles.cardinalText}>
              E
            </text>
            <text x="50" y="95" textAnchor="middle" className={styles.cardinalText}>
              S
            </text>
            <text x="15" y="55" textAnchor="middle" className={styles.cardinalText}>
              W
            </text>

            {/* Compass circles */}
            <circle cx="50" cy="50" r="40" opacity="0.3" />
            <circle cx="50" cy="50" r="30" opacity="0.2" />

            {/* Compass rose/needle */}
            <path
              d="M50 10 L70 50 L50 90 L30 50 Z"
              opacity="0.6"
              className={styles.needle}
            />

            {/* Center dot */}
            <circle cx="50" cy="50" r="8" fill="currentColor" />
          </svg>
        </div>

        {/* Pulsing Orbs */}
        <div className={styles.orbitalSystem}>
          <div className={styles.orbit}>
            <div className={styles.orb} />
          </div>
          <div className={styles.orbit} style={{ animationDelay: '-2s' }}>
            <div className={styles.orb} />
          </div>
          <div className={styles.orbit} style={{ animationDelay: '-4s' }}>
            <div className={styles.orb} />
          </div>
        </div>
      </div>

      {/* Loading Text */}
      {text && (
        <div className={styles.textContainer}>
          <p className={styles.loadingText}>{text}</p>
          <div className={styles.dots}>
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        </div>
      )}
    </div>
  );
}
