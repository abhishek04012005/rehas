'use client';

import { useState } from 'react';
import { Instagram, LinkedIn, Twitter, Star } from '@mui/icons-material';
import { rehasData, profile, about, quote, expertise, social } from '@/data/rehasData';
import LineArtBackground from '@/components/lineArtBackground/lineArtBackground';
import styles from './founder.module.css';
import Image from 'next/image';

export default function Founder() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section className={styles.founderSection}>
        <LineArtBackground variant="minimal" opacity={0.05} />

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerBadge}>
            <Star className={styles.badgeIcon} />
            <span>{profile.badge}</span>
          </div>
          <h2>
            Meet <span className={styles.gradientText}>{profile.name}</span>
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className={styles.founderContent}>
          {/* Left Side - Founder Image */}
          <div className={styles.imageSection}>
            <div className={styles.imageContainer}>
              {/* Cosmic Ring Animation */}
              <div className={styles.cosmicRing}></div>

              {/* Image Background Gradient Orbs */}
              <div className={styles.imageBgOrb1}></div>
              <div className={styles.imageBgOrb2}></div>

              {/* Founder Image */}
              <div className={styles.founderImage}>
                <Image
                  alt={profile.imageAlt}
                  width={400}
                  src={profile.image}
                  className={styles.image}
                />

                </div>

              {/* Decorative Elements */}
              <div className={styles.glow}></div>
              <div className={styles.imageFrame}></div>
            </div>

            {/* Social Links */}
            <div className={styles.socialLinks}>
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                title="Instagram"
              >
                <Instagram />
              </a>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                title="LinkedIn"
              >
                <LinkedIn />
              </a>
              <a
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                title="Twitter"
              >
                <Twitter />
              </a>
            </div>
          </div>

          {/* Right Side - About Content */}
          <div className={styles.bioSection}>
            {/* Name and Title */}
            <div className={styles.nameCard}>
              <h3 className={styles.founderName}>{profile.name}</h3>
              <p className={styles.founderTitle}>{profile.title}</p>
              <div className={styles.titleUnderline}></div>
            </div>

            {/* Quote */}
            <blockquote className={styles.quote}>{quote.text}</blockquote>

            {/* Bio */}
            <p className={styles.bio}>{about.longBio}</p>

            {/* Expertise Grid */}
            <div className={styles.expertiseSection}>
              <h4 className={styles.expertiseTitle}>Areas of Expertise</h4>
              <div className={styles.expertiseGrid}>
                {expertise.primary.map((item) => (
                  <div
                    key={item.name}
                    className={styles.skillTag}
                    onMouseEnter={() => setHoveredSkill(item.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    style={{
                      borderColor:
                        hoveredSkill === item.name
                          ? 'var(--primary)'
                          : 'rgba(86, 0, 103, 0.2)',
                      background:
                        hoveredSkill === item.name
                          ? 'rgba(86, 0, 103, 0.08)'
                          : 'transparent',
                    }}
                  >
                    <span className={styles.skillDot}></span>
                    {item.name}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <a href="/contact" className={styles.ctaBtn}>
              Connect with Founder
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
