'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  SelfImprovement,
  Spa,
  LocalHospital,
  Favorite,
  Brightness3,
  FavoriteBorder,
  ChevronRight,
  ExpandMore,
  ArrowRight,
  Lightbulb,
  Visibility,
  AutoAwesome,
  FlashOn,
  PublicOutlined,
} from '@mui/icons-material';
import LineArtBackground from '../lineArtBackground/lineArtBackground';
import styles from './healingService.module.css';

const iconMap = {
  SelfImprovement,
  Spa,
  LocalHospital,
  Favorite,
  Brightness3,
  FavoriteBorder,
  Lightbulb,
  Visibility,
  AutoAwesome,
  FlashOn,
  PublicOutlined,
};

export interface HealingServiceData {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  overview: {
    title: string;
    description: string;
    image: string;
  };
  benefits: {
    title: string;
    description: string;
    items: readonly {
      title: string;
      description: string;
      icon: string;
    }[];
  };
  process: {
    title: string;
    steps: readonly {
      number: string;
      title: string;
      description: string;
    }[];
  };
  mantras?: {
    title: string;
    description: string;
    list: readonly {
      name: string;
      meaning: string;
      benefit: string;
      use: string;
    }[];
  };
  chakras?: {
    title: string;
    description: string;
    chakras: readonly {
      name: string;
      location: string;
      color: string;
      element: string;
      benefit: string;
    }[];
  };
  practices?: {
    title: string;
    description: string;
    list: readonly {
      name: string;
      meaning: string;
      benefit: string;
      use: string;
    }[];
  };
  sessions: {
    title: string;
    types: readonly {
      name: string;
      duration: string;
      price: string;
      description: string;
      includes: readonly string[];
    }[];
  };
  faq: {
    title: string;
    questions: readonly {
      question: string;
      answer: string;
    }[];
  };
  cta: {
    title: string;
    subtitle: string;
    buttons: readonly {
      label: string;
      href: string;
      type: 'primary' | 'secondary';
    }[];
  };
}

interface HealingServiceProps {
  data: HealingServiceData;
}

export default function HealingService({ data }: HealingServiceProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className={styles.healingService}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <LineArtBackground variant="default" opacity={0.1} />
        <div className={styles.heroContent}>
          <h1>{data.hero.title}</h1>
          <p className={styles.subtitle}>{data.hero.subtitle}</p>
          <p className={styles.description}>{data.hero.description}</p>
          <a href="/enquiry" className={styles.ctaBtn}>
            Book Your Session <ChevronRight />
          </a>
        </div>
      </section>

      {/* Overview Section */}
      <section className={styles.overview}>
        <div className={styles.container}>
          <div className={styles.overviewGrid}>
            <div className={styles.overviewContent}>
              <h2>{data.overview.title}</h2>
              <p>{data.overview.description}</p>
            </div>
            <div className={styles.overviewImage}>
              <Image
                src={data.overview.image}
                alt={data.overview.title}
                width={500}
                height={400}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={styles.benefits}>
        <div className={styles.container}>
          <h2>{data.benefits.title}</h2>
          <p className={styles.sectionSubtitle}>{data.benefits.description}</p>
          <div className={styles.benefitsGrid}>
            {data.benefits.items.map((benefit, idx) => {
              const IconComponent = iconMap[benefit.icon as keyof typeof iconMap];
              return (
                <div key={idx} className={styles.benefitCard}>
                  <div className={styles.benefitIcon}>
                    {IconComponent && <IconComponent />}
                  </div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className={styles.process}>
        <div className={styles.container}>
          <h2>{data.process.title}</h2>
          <div className={styles.stepsGrid}>
            {data.process.steps.map((step, idx) => (
              <div key={idx} className={styles.stepCard}>
                <div className={styles.stepNumber}>{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                {idx < data.process.steps.length - 1 && (
                  <ArrowRight className={styles.arrow} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chakras/Mantras/Practices Section */}
      {data.chakras && (
        <section className={styles.details}>
          <div className={styles.container}>
            <h2>{data.chakras.title}</h2>
            <p className={styles.sectionSubtitle}>{data.chakras.description}</p>
            <div className={styles.detailsGrid}>
              {data.chakras.chakras.map((item, idx) => (
                <div key={idx} className={styles.detailCard}>
                  <h3>{item.name}</h3>
                  <div className={styles.detailInfo}>
                    <p>
                      <strong>Location:</strong> {item.location}
                    </p>
                    <p>
                      <strong>Color:</strong> {item.color}
                    </p>
                    <p>
                      <strong>Element:</strong> {item.element}
                    </p>
                    <p>
                      <strong>Benefit:</strong> {item.benefit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {data.mantras && (
        <section className={styles.details}>
          <div className={styles.container}>
            <h2>{data.mantras.title}</h2>
            <p className={styles.sectionSubtitle}>{data.mantras.description}</p>
            <div className={styles.detailsGrid}>
              {data.mantras.list.map((item, idx) => (
                <div key={idx} className={styles.detailCard}>
                  <h3>{item.name}</h3>
                  <div className={styles.detailInfo}>
                    <p>
                      <strong>Meaning:</strong> {item.meaning}
                    </p>
                    <p>
                      <strong>Benefit:</strong> {item.benefit}
                    </p>
                    <p>
                      <strong>Use:</strong> {item.use}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {data.practices && (
        <section className={styles.details}>
          <div className={styles.container}>
            <h2>{data.practices.title}</h2>
            <p className={styles.sectionSubtitle}>{data.practices.description}</p>
            <div className={styles.detailsGrid}>
              {data.practices.list.map((item, idx) => (
                <div key={idx} className={styles.detailCard}>
                  <h3>{item.name}</h3>
                  <div className={styles.detailInfo}>
                    <p>
                      <strong>Meaning:</strong> {item.meaning}
                    </p>
                    <p>
                      <strong>Benefit:</strong> {item.benefit}
                    </p>
                    <p>
                      <strong>Use:</strong> {item.use}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sessions Section */}
      <section className={styles.sessions}>
        <div className={styles.container}>
          <h2>{data.sessions.title}</h2>
          <div className={styles.sessionsGrid}>
            {data.sessions.types.map((session, idx) => (
              <div key={idx} className={styles.sessionCard}>
                <h3>{session.name}</h3>
                <div className={styles.sessionMeta}>
                  <span className={styles.duration}>{session.duration}</span>
                  <span className={styles.price}>{session.price}</span>
                </div>
                <p className={styles.sessionDescription}>{session.description}</p>
                <div className={styles.includes}>
                  <h4>Includes:</h4>
                  <ul>
                    {session.includes.map((item, itemIdx) => (
                      <li key={itemIdx}>{item}</li>
                    ))}
                  </ul>
                </div>
                <a href="/enquiry" className={styles.bookBtn}>
                  Book Now <ChevronRight />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faq}>
        <div className={styles.container}>
          <h2>{data.faq.title}</h2>
          <div className={styles.faqGrid}>
            {data.faq.questions.map((item, idx) => (
              <div
                key={idx}
                className={`${styles.faqItem} ${expandedFaq === idx ? styles.expanded : ''}`}
              >
                <button
                  className={styles.faqQuestion}
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                >
                  <span>{item.question}</span>
                  <ExpandMore className={styles.expandIcon} />
                </button>
                {expandedFaq === idx && (
                  <div className={styles.faqAnswer}>
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2>{data.cta.title}</h2>
          <p>{data.cta.subtitle}</p>
          <div className={styles.ctaButtons}>
            {data.cta.buttons.map((btn, idx) => (
              <a
                key={idx}
                href={btn.href}
                className={`${styles.ctaLink} ${styles[btn.type]}`}
              >
                {btn.label} <ChevronRight />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
