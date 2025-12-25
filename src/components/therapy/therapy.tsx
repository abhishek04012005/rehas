'use client';

import { useState } from 'react';
import {
  PanTool,
  Brightness3,
  FavoriteBorder,
  VolumeUp,
  ArrowRight,
  CheckCircle,
} from '@mui/icons-material';
import LineArtBackground from '../lineArtBackground/lineArtBackground';
import { therapyData } from '@/data/content';
import styles from './therapy.module.css';
import Image from 'next/image';

const iconMap = {
  PanTool,
  Brightness3,
  FavoriteBorder,
  VolumeUp,
};

export default function Therapy() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className={styles.therapy}>
      <LineArtBackground variant="default" opacity={0.05} />
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}></div>
        <div className={styles.heroContent}>
          <h1>{therapyData.hero.title}</h1>
          <p>{therapyData.hero.subtitle}</p>
        </div>
      </section>

      {/* Therapy Services Section */}
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          {therapyData.items.map((item) => {
            // const IconComponent = iconMap[item.muiIcon as keyof typeof iconMap];
            const isHovered = hoveredItem === item.id;

            return (
              <div
                key={item.id}
                className={`${styles.serviceItem} ${styles[item.position]}`}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Image Section */}
                <div className={styles.imageSection}>
                  <div className={styles.imageWrapper}>
                    <div 
                      className={styles.iconBox}
                      style={{ borderColor: item.color, backgroundColor: `${item.color}15` }}
                    >
                      {/* <IconComponent 
                        className={styles.serviceIcon}
                        style={{ color: item.color }}
                      /> */}
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={400}
                        height={400}
                        className={styles.serviceImage}
                      />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className={styles.contentSection}>
                  <h2 style={{ color: item.color }}>{item.title}</h2>
                  <p className={styles.description}>{item.description}</p>

                  {/* Features List */}
                  <div className={styles.featuresList}>
                    {item.features.map((feature, idx) => (
                      <div key={idx} className={styles.featureItem}>
                        <CheckCircle 
                          className={styles.featureDot}
                          style={{ color: item.color }}
                        />
                        <span className={styles.featureText}>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <a 
                    href={`/therapy/${item.id}`}
                    className={styles.ctaButton}
                    style={{
                      borderColor: item.color,
                      color: isHovered ? '#fff' : item.color,
                      backgroundColor: isHovered ? item.color : 'transparent',
                    }}
                  >
                    <span>Explore now</span>
                    <ArrowRight />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
