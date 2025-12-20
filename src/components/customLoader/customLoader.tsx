'use client';

import styles from './customLoader.module.css';

interface CustomLoaderProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  healingType?: 'astrology' | 'numerology' | 'reiki' | 'sound' | 'chakra' | 'aura';
}

const healingIcons = {
  astrology: '✨',
  numerology: '🔢',
  reiki: '🙌',
  sound: '🔊',
  chakra: '⚡',
  aura: '🌈',
};

const healingLabels = {
  astrology: 'Astrology',
  numerology: 'Numerology',
  reiki: 'Reiki',
  sound: 'Sound Therapy',
  chakra: 'Chakra Cleaning',
  aura: 'Aura Cleaning',
};

const healingTypes = ['astrology', 'numerology', 'reiki', 'sound', 'chakra', 'aura'] as const;

export default function CustomLoader({
  size = 'medium',
  text = 'Loading...',
  healingType,
}: CustomLoaderProps) {
  // Rotate through healing types
  const types = healingType ? [healingType] : healingTypes;
  const currentType = types[0];

  return (
    <div className={`${styles.loaderContainer} ${styles[size]}`}>
      <div className={styles.orbitContainer}>
        {/* Rotating orbs around center */}
        <div className={styles.orbit}>
          <div className={styles.orb}></div>
        </div>
        <div className={styles.orbit} style={{ animationDelay: '-1.5s' }}>
          <div className={styles.orb}></div>
        </div>
        <div className={styles.orbit} style={{ animationDelay: '-3s' }}>
          <div className={styles.orb}></div>
        </div>

        {/* Center icon */}
        <div className={styles.centerIcon}>
          {healingIcons[currentType]}
        </div>
      </div>

      {/* Healing label and text */}
      <div className={styles.textContainer}>
        <p className={styles.healingLabel}>
          {healingLabels[currentType]}
        </p>
        {text && <p className={styles.loadingText}>{text}</p>}
      </div>
    </div>
  );
}
