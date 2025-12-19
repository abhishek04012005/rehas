'use client';

import LineArtBackground from '../lineArtBackground/lineArtBackground';
import { aboutData } from '@/data/content';
import styles from './about.module.css';

export default function About() {
  return (
    <div className={styles.about}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <LineArtBackground variant="default" opacity={0.4} />
        </div>
        <div className={styles.heroContent}>
          <h1>{aboutData.hero.title}</h1>
          <p>{aboutData.hero.subtitle}</p>
        </div>
      </section>

      {/* Story Section */}
      <section className={styles.storySection}>
        <div className={styles.storyBackground}>
          <LineArtBackground variant="minimal" opacity={0.3} />
        </div>
        <div className={styles.container}>
          <div className={styles.storyGrid}>
            {aboutData.story.cards.map((card, idx) => (
              <div className={styles.storyCard} key={idx}>
                <h2>{card.title}</h2>
                <p>{card.description}</p>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className={styles.statsGrid}>
            {aboutData.stats.map((stat, idx) => (
              <div className={styles.statItem} key={idx}>
                <span className={styles.number}>{stat.number}</span>
                <span className={styles.label}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={styles.teamSection}>
        <div className={styles.teamBackground}>
          <LineArtBackground variant="default" opacity={0.35} />
        </div>
        <div className={styles.container}>
          <h2>Meet Our Team</h2>
          <div className={styles.teamGrid}>
            {aboutData.team.map((member, idx) => (
              <div className={styles.teamCard} key={idx}>
                <div className={styles.avatar}>{member.avatar}</div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBackground}>
          <LineArtBackground variant="minimal" opacity={0.25} />
        </div>
        <div className={styles.container}>
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
        </div>
      </section>
    </div>
  );
}