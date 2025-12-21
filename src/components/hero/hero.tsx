'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { heroData } from '@/data/content';
import styles from './hero.module.css';
import { ArrowForward, Info, Star, DarkMode, AutoAwesome, SelfImprovement, KeyboardDoubleArrowRight } from '@mui/icons-material';

// Map icon names to MUI components
const iconMap: Record<string, React.ComponentType<any>> = {
  Sparkles: Star,
  Nightlight: DarkMode,
  AutoAwesome,
  SelfImprovement,
};

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

  // Generate consistent star positions using seeded random with fixed precision
  const generateStars = () => {
    return [...Array(20)].map((_, i) => ({
      left: parseFloat((seededRandom(i * 12.9898) * 100).toFixed(2)),
      top: parseFloat((seededRandom(i * 78.233) * 100).toFixed(2)),
      delay: parseFloat((seededRandom(i * 43.614) * 3).toFixed(2)),
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
            <span className={styles.badgeIcon}><KeyboardDoubleArrowRight /></span>
            <span className={styles.badgeText}> Dicover Your Cosmic Path  </span>
          </div>

          {/* Heading */}
          <h1 className={styles.heading}>
            <span className={styles.gradientText}>
              {heroData.title}
            </span>
            <br />
            <span className={styles.secondaryText}>
              {heroData.subtitle}
            </span>
          </h1>

          {/* Description */}
          <p className={styles.description}>
            Explore the universe within you through ancient wisdom
            and modern wellness practices. Transform your life with personalized
            cosmic guidance and holistic healing.
          </p>

          {/* CTA Buttons */}
          <div className={styles.ctaGroup}>
            {heroData.buttons.map((btn, idx) => (
              <Link
                key={idx}
                href={btn.href}
                className={btn.type === 'primary' ? styles.primaryBtn : styles.secondaryBtn}
              >
                <span>{btn.label}</span>
                {btn.type === 'primary' ? (
                  <ArrowForward className={styles.buttonIcon} />
                ) : (
                  <Info className={styles.buttonIcon} />
                )}
              </Link>
            ))}
          </div>

          {/* Stats */}
          <div className={styles.stats}>
            {heroData.stats.map((stat, idx) => (
              <div className={styles.stat} key={idx}>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
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
          {heroData.floatingCards.map((card, idx) => {
            const positions = [
              { top: '10%', right: '5%' },
              { bottom: '20%', right: '10%' },
              { top: '50%', left: '-5%' },
            ];
            const position = positions[idx] || positions[0];
            const IconComponent = iconMap[card.icon as keyof typeof iconMap];
            return (
              <div
                key={idx}
                className={styles.floatingCard}
                style={position}
              >
                <div className={styles.cardIcon}>
                  {IconComponent && <IconComponent className={styles.cardIconMUI} />}
                </div>
                <div className={styles.cardText}>{card.text}</div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}