'use client';

import styles from './about.module.css';

export default function About() {
  return (
    <div className={styles.about}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>About REHAS</h1>
          <p>Bridging ancient cosmic wisdom with modern wellness</p>
        </div>
      </section>

      {/* Story Section */}
      <section className={styles.storySection}>
        <div className={styles.container}>
          <div className={styles.storyGrid}>
            <div>
              <h2>Who We Are</h2>
              <p>
                REHAS is a trusted platform dedicated to helping you discover your cosmic purpose 
                through astrology and holistic wellness. Since our founding, we've served thousands 
                of seekers worldwide.
              </p>
            </div>
            <div>
              <h2>What We Do</h2>
              <p>
                We offer personalized astrology readings, wellness coaching, meditation guidance, 
                and nutritional support. Our mission is to empower you to live authentically 
                aligned with your true self.
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <h3>10K+</h3>
              <p>Happy Clients</p>
            </div>
            <div className={styles.statItem}>
              <h3>25+</h3>
              <p>Countries</p>
            </div>
            <div className={styles.statItem}>
              <h3>4</h3>
              <p>Expert Practitioners</p>
            </div>
            <div className={styles.statItem}>
              <h3>15+</h3>
              <p>Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={styles.teamSection}>
        <div className={styles.container}>
          <h2>Our Team</h2>
          <div className={styles.teamGrid}>
            <div className={styles.teamCard}>
              <div className={styles.avatar}>👩‍⚕️</div>
              <h3>Sarah Chen</h3>
              <p>Astrology Expert</p>
            </div>
            <div className={styles.teamCard}>
              <div className={styles.avatar}>👨‍⚕️</div>
              <h3>Dr. Rajesh Kumar</h3>
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
        <div className={styles.container}>
          <h2>Start Your Journey Today</h2>
          <p>Connect with our experts for personalized guidance</p>
          <div className={styles.ctaButtons}>
            <a href="/consultation" className={styles.btnPrimary}>Book Consultation</a>
            <a href="/contact" className={styles.btnSecondary}>Contact Us</a>
          </div>
        </div>
      </section>
    </div>
  );
}