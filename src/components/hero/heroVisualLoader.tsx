'use client';

import dynamic from 'next/dynamic';
import styles from './hero.module.css';

const HeroVisual = dynamic(() => import('./heroVisual'), {
  ssr: false,
  loading: () => <div className={styles.visualPlaceholder} />,
});

export default function HeroVisualLoader() {
  return <HeroVisual />;
}
