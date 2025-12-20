'use client';

import LineArtBackground from '../lineArtBackground/lineArtBackground';
import { aboutData } from '@/data/content';
import styles from './about.module.css';

export default function About() {
  return (
    <div className={styles.about}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <LineArtBackground variant="minimal" opacity={0.3} />
        <div className={styles.heroContent}>
          <h1>{aboutData.hero.title}</h1>
          <p>{aboutData.hero.subtitle}</p>
        </div>
      </section>

      {/* Main Content */}
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
      </div>

      {/* Founder Section */}

      {/* Team Section */}
      <div className={styles.container}>
        <section className={styles.teamSection}>
          <h2>Our Team</h2>
          <div className={styles.teamGrid}>
            {aboutData.team.map((member, idx) => (
              <div className={styles.teamCard} key={idx}>
                <div className={styles.avatar}>{member.avatar}</div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <h2>{aboutData.cta.title}</h2>
          <p>{aboutData.cta.subtitle}</p>
          <div className={styles.ctaButtons}>
            {aboutData.cta.buttons.map((btn, idx) => (
              <a
                key={idx}
                href={btn.href}
                className={btn.type === 'primary' ? styles.btnPrimary : styles.btnSecondary}
              >
                {btn.label}
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}