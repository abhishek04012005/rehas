'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './hero.module.css';

// Seeded random number generator for consistent values
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Generate consistent star positions using seeded random
  const generateStars = () => {
    return [...Array(20)].map((_, i) => ({
      left: seededRandom(i * 12.9898) * 100,
      top: seededRandom(i * 78.233) * 100,
      delay: seededRandom(i * 43.614) * 3,
    }));
  };

  const stars = generateStars();

  return (
    <section className={styles.hero}>
      {/* Animated Background */}
      <div className={styles.background}>
        <div 
          className={styles.gradientOrb}
          style={{
            transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)`
          }}
        />
        <div 
          className={styles.gradientOrbSecondary}
          style={{
            transform: `translate(${-mousePosition.x * 0.02}px, ${-mousePosition.y * 0.02}px)`
          }}
        />
        <div className={styles.starField}>
          {stars.map((star, i) => (
            <div 
              key={i} 
              className={styles.star}
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                animationDelay: `${star.delay}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Badge */}
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>✨</span>
            <span>Welcome to Cosmic Wellness</span>
          </div>

          {/* Heading */}
          <h1 className={styles.heading}>
            <span className={styles.gradientText}>
              Discover Your Cosmic Path
            </span>
            <br />
            <span className={styles.secondaryText}>
              to Health & Harmony
            </span>
          </h1>

          {/* Description */}
          <p className={styles.description}>
            Explore the universe within you through ancient astrology wisdom 
            and modern wellness practices. Transform your life with personalized 
            cosmic guidance and holistic healing.
          </p>

          {/* CTA Buttons */}
          <div className={styles.ctaGroup}>
            <Link href="/consultation" className={styles.primaryBtn}>
              <span>Start Your Journey</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/about" className={styles.secondaryBtn}>
              <span>Learn More</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
            </Link>
          </div>

          {/* Stats */}
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>10K+</div>
              <div className={styles.statLabel}>Happy Clients</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>5000+</div>
              <div className={styles.statLabel}>Readings</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>15+</div>
              <div className={styles.statLabel}>Years Experience</div>
            </div>
          </div>
        </div>

        {/* Right Side - Cosmic Illustration */}
        <div className={styles.illustration}>
          <div className={styles.cosmicCircle}>
            <div className={styles.innerCircle}>
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="50" cy="50" r="40" opacity="0.3" />
                <circle cx="50" cy="50" r="30" opacity="0.2" />
                <path d="M50 10 L70 50 L50 90 L30 50 Z" opacity="0.4" />
                <circle cx="50" cy="50" r="8" fill="currentColor" />
              </svg>
            </div>
            <div className={styles.orbitPath}>
              <div className={styles.planet} style={{ '--delay': '0s' } as any} />
              <div className={styles.planet} style={{ '--delay': '6s' } as any} />
              <div className={styles.planet} style={{ '--delay': '12s' } as any} />
            </div>
          </div>

          {/* Floating Cards */}
          <div className={styles.floatingCard} style={{ top: '10%', right: '5%' }}>
            <div className={styles.cardIcon}>🌙</div>
            <div className={styles.cardText}>Moon Phase</div>
          </div>
          <div className={styles.floatingCard} style={{ bottom: '20%', right: '10%' }}>
            <div className={styles.cardIcon}>⭐</div>
            <div className={styles.cardText}>Star Reading</div>
          </div>
          <div className={styles.floatingCard} style={{ top: '50%', left: '-5%' }}>
            <div className={styles.cardIcon}>🧘</div>
            <div className={styles.cardText}>Meditation</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollDot} />
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}