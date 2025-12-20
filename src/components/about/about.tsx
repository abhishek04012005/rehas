'use client';

import LineArtBackground from '../lineArtBackground/lineArtBackground';
import { aboutData } from '@/data/content';
import { rehasData } from '@/data/rehasData';
import styles from './about.module.css';
import { GpsFixed, Lightbulb } from '@mui/icons-material';

export default function About() {
  return (
    <div className={styles.about}>
        <LineArtBackground variant="minimal" opacity={0.05} />
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>{aboutData.hero.title}</h1>
          <p>{aboutData.hero.subtitle}</p>
        </div>
      </section>

      {/* Main Content with Full LineArt Background */}
      <div className={styles.contentSection}>
        
        <div className={styles.container}>
          {/* Story Cards */}
          <section className={styles.storySection}>
            <div className={styles.storyGrid}>
              {aboutData.story.cards.map((card, idx) => (
                <div className={styles.storyCard} key={idx}>
                  <h2>{card.title}</h2>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Stats Section */}
          <section className={styles.statsSection}>
            <h2>Our Impact</h2>
            <div className={styles.statsGrid}>
              {aboutData.stats.map((stat, idx) => (
                <div className={styles.statItem} key={idx}>
                  <span className={styles.number}>{stat.number}</span>
                  <span className={styles.label}>{stat.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Mission & Vision Section */}
          <section className={styles.missionVisionSection}>
            <div className={styles.missionVisionContent}>
              <div className={styles.missionVisionCard}>
                <div className={styles.missionVisionIcon}>
                  <GpsFixed className={styles.missionVisionIconMUI} />
                </div>
                <h2>Our Mission</h2>
                <p>{rehasData.about.missionStatement}</p>
              </div>
              <div className={styles.missionVisionCard}>
                <div className={styles.missionVisionIcon}>
                  <Lightbulb className={styles.missionVisionIconMUI} />
                </div>
                <h2>Our Vision</h2>
                <p>{rehasData.about.visionStatement}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}