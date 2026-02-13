'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, Check } from '@mui/icons-material';
import { pageHeader, testimonials, stats, cta } from '@/data/testimonial';
import LineArtBackground from '@/components/lineArtBackground/lineArtBackground';
import TestimonialSlider from '@/components/testimonialSlider';
import styles from './testimonial.module.css';

export default function TestimonialPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className={styles.testimonialPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <LineArtBackground variant="default" opacity={0.15} />
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>{pageHeader.title}</h1>
            <p className={styles.heroSubtitle}>{pageHeader.subtitle}</p>
            <p className={styles.heroDescription}>{pageHeader.description}</p>
          </div>
        </div>
      </section>

      {/* Main Slider Section */}
      <section className={styles.sliderSection}>
        <LineArtBackground variant="minimal" opacity={0.08} />
        <div className={styles.container}>
          <TestimonialSlider />
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <LineArtBackground variant="minimal" opacity={0.1} />
        <div className={styles.container}>
          <h2 className={styles.statsTitle}>Our Impact in Numbers</h2>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>{stats.totalClients}</div>
              <p className={styles.statLabel}>Clients Transformed</p>
              <p className={styles.statDesc}>Lives positively impacted</p>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>{stats.satisfaction}</div>
              <p className={styles.statLabel}>Satisfaction Rate</p>
              <p className={styles.statDesc}>Client satisfaction</p>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>{stats.yearsOfService}</div>
              <p className={styles.statLabel}>Years of Service</p>
              <p className={styles.statDesc}>Consistent excellence</p>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>{stats.transformations}</div>
              <p className={styles.statLabel}>Transformations</p>
              <p className={styles.statDesc}>Documented success</p>
            </div>
          </div>
        </div>
      </section>

      {/* All Testimonials Grid Section */}
      <section className={styles.allTestimonialsSection}>
        <LineArtBackground variant="minimal" opacity={0.12} />
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Browse All Testimonials</h2>
          <p className={styles.sectionSubtitle}>
            Explore the complete stories of transformation
          </p>

          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className={`${styles.testimonialGridCard} ${
                  expandedId === testimonial.id ? styles.expanded : ''
                }`}
              >
                {/* Card Header */}
                <div
                  className={styles.cardHeader}
                  onClick={() => toggleExpand(testimonial.id)}
                >
                  <div className={styles.cardImage}>{testimonial.image}</div>
                  <div className={styles.cardMeta}>
                    <h4 className={styles.cardName}>{testimonial.name}</h4>
                    <p className={styles.cardRole}>{testimonial.role}</p>
                  </div>
                  <div className={styles.expandIcon}>
                    <span className={styles.plus}>{expandedId === testimonial.id ? '−' : '+'}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className={styles.cardRating}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className={styles.cardStar} />
                  ))}
                </div>

                {/* Card Title */}
                <h5 className={styles.cardTitle}>{testimonial.title}</h5>

                {/* Card Content - Collapsible */}
                <div
                  className={`${styles.cardContent} ${
                    expandedId === testimonial.id ? styles.show : ''
                  }`}
                >
                  <p className={styles.cardText}>{testimonial.text}</p>

                  <div className={styles.cardDetails}>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Service</span>
                      <span className={styles.detailValue}>{testimonial.service}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Location</span>
                      <span className={styles.detailValue}>{testimonial.location}</span>
                    </div>
                  </div>

                  {/* Transformation Highlight */}
                  <div className={styles.transformationBox}>
                    <div className={styles.transformIcon}>
                      <Check />
                    </div>
                    <div>
                      <p className={styles.transformTitle}>Key Transformation</p>
                      <p className={styles.transformText}>{testimonial.transformation}</p>
                    </div>
                  </div>

                  {/* Learn More Link */}
                  <button
                    className={styles.learnMore}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(testimonial.id);
                    }}
                  >
                    Show Less
                  </button>
                </div>

                {/* Card Footer - Always Visible */}
                {expandedId !== testimonial.id && (
                  <p className={styles.cardPreview}>
                    {testimonial.text.substring(0, 100)}...
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <LineArtBackground variant="default" opacity={0.2} />
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>{cta.title}</h2>
            <p className={styles.ctaSubtitle}>{cta.subtitle}</p>
            <Link href={cta.buttonLink} className={styles.ctaButton}>
              {cta.buttonText}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
