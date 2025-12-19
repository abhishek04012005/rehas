'use client';

import { useState } from 'react';
import {
  Numbers,
  Brightness3,
  PanTool,
  MusicNote,
  FlashOn,
  Opacity,
  ArrowRight,
  CheckCircle,
} from '@mui/icons-material';
import LineArtBackground from '../lineArtBackground/lineArtBackground';
import { servicesData } from '@/data/content';
import styles from './services.module.css';

const iconMap = {
  Numbers,
  Brightness3,
  PanTool,
  MusicNote,
  FlashOn,
  Opacity,
};

export default function Services() {
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  return (
    <div className={styles.services}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <LineArtBackground variant="default" opacity={0.4} />
        </div>
        <div className={styles.heroContent}>
          <h1>{servicesData.hero.title}</h1>
          <p>{servicesData.hero.subtitle}</p>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          {servicesData.services.map((service) => {
            const IconComponent = iconMap[service.muiIcon as keyof typeof iconMap];
            const isHovered = hoveredService === service.id;

            return (
              <div
                key={service.id}
                className={`${styles.serviceItem} ${styles[service.position]}`}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Image Section */}
                <div className={styles.imageSection}>
                  <div className={styles.imageWrapper}>
                    <div 
                      className={styles.iconBox}
                      style={{ borderColor: service.color, backgroundColor: `${service.color}15` }}
                    >
                      <IconComponent 
                        className={styles.serviceIcon}
                        style={{ color: service.color }}
                      />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className={styles.contentSection}>
                  <h2 style={{ color: service.color }}>{service.title}</h2>
                  <p className={styles.description}>{service.description}</p>

                  {/* Features List */}
                  <div className={styles.featuresList}>
                    {service.features.map((feature, idx) => (
                      <div key={idx} className={styles.featureItem}>
                        <CheckCircle 
                          className={styles.featureDot}
                          style={{ color: service.color }}
                        />
                        <span className={styles.featureText}>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <a 
                    href="/consultation" 
                    className={styles.ctaButton}
                    style={{
                      borderColor: service.color,
                      color: isHovered ? '#fff' : service.color,
                      backgroundColor: isHovered ? service.color : 'transparent',
                    }}
                  >
                    <span>Book Consultation</span>
                    <ArrowRight />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBackground}>
          <LineArtBackground variant="minimal" opacity={0.3} />
        </div>
        <div className={styles.ctaContent}>
          <h2>{servicesData.cta.title}</h2>
          <p>{servicesData.cta.subtitle}</p>
          <div className={styles.ctaButtons}>
            {servicesData.cta.buttons.map((button, idx) => (
              <a
                key={idx}
                href={button.href}
                className={`${styles.btn} ${styles[button.type]}`}
              >
                {button.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
