'use client';

import LineArtBackground from '../lineArtBackground/lineArtBackground';
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
          <h1>About REHAS</h1>
          <p>Bridging ancient cosmic wisdom with modern wellness</p>
        </div>
      </section>

      {/* Story Section */}
      <section className={styles.storySection}>
        <div className={styles.storyBackground}>
          <LineArtBackground variant="minimal" opacity={0.3} />
        </div>
        <div className={styles.container}>
          <div className={styles.storyGrid}>
            <div className={styles.storyCard}>
              <h2>Who We Are</h2>
              <p>
                REHAS empowers seekers through astrology and holistic wellness, serving thousands worldwide.
              </p>
            </div>
            <div className={styles.storyCard}>
              <h2>What We Do</h2>
              <p>
                We offer astrology readings, wellness coaching, and meditation guidance to help you live authentically.
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.number}>10K+</span>
              <span className={styles.label}>Clients</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.number}>25+</span>
              <span className={styles.label}>Countries</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.number}>4</span>
              <span className={styles.label}>Experts</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.number}>15+</span>
              <span className={styles.label}>Years</span>
            </div>
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
            <div className={styles.teamCard}>
              <div className={styles.avatar}>👩‍⚕️</div>
              <h3>Sarah Chen</h3>
              <p>Astrology Expert</p>
            </div>
            <div className={styles.teamCard}>
              <div className={styles.avatar}>👨‍⚕️</div>
              <h3>Dr. Rajesh</h3>
              <p>Wellness Coach</p>
            </div>
            <div className={styles.teamCard}>
              <div className={styles.avatar}>🧘‍♀️</div>
              <h3>Emma Johnson</h3>
              <p>Meditation Guide</p>
            </div>
            <div className={styles.teamCard}>
              <div className={styles.avatar}>🥗</div>
              <h3>Alex Rodriguez</h3>
              <p>Nutrition Specialist</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBackground}>
          <LineArtBackground variant="minimal" opacity={0.25} />
        </div>
        <div className={styles.container}>
          <h2>Ready to Transform?</h2>
          <p>Join thousands discovering their cosmic path</p>
          <div className={styles.ctaButtons}>
            <a href="/consultation" className={styles.btnPrimary}>Book Consultation</a>
            <a href="/contact" className={styles.btnSecondary}>Learn More</a>
          </div>
        </div>
      </section>
    </div>
  );
}