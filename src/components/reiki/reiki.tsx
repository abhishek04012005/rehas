'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
} from '@mui/icons-material';
import LineArtBackground from '../lineArtBackground/lineArtBackground';
import { reikiData } from '@/data/reiki';
import { useCheckout } from '@/context/CheckoutContext';
import styles from './reiki.module.css';

const iconMap = {
  SelfImprovement,
  Spa,
  LocalHospital,
  Favorite,
  Brightness3,
  FavoriteBorder,
};

export default function Reiki() {
  const router = useRouter();
  const { setProductData } = useCheckout();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleBookSession = (sessionName: string, price: string) => {
    // Extract numeric amount from price string
    const amount = parseFloat(price.replace(/[₹,]/g, '')) || 999;
    
    setProductData({ 
      productTitle: sessionName, 
      amount,
      type: 'service'
    });
    router.push('/checkout');
  };

  return (
    <div className={styles.reiki}>
      <LineArtBackground variant="default" opacity={0.05} />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>{reikiData.hero.title}</h1>
          <p className={styles.subtitle}>{reikiData.hero.subtitle}</p>
          <p className={styles.description}>{reikiData.hero.description}</p>
          <button 
            onClick={() => handleBookSession(reikiData.hero.title, '₹999')}
            className={styles.ctaBtn}
          >
            Book Your Session <ChevronRight />
          </button>
        </div>
      </section>

      {/* Overview Section */}
      <section className={styles.overview}>
        <div className={styles.container}>
          <div className={styles.overviewGrid}>
            <div className={styles.overviewContent}>
              <h2>{reikiData.overview.title}</h2>
              <p>{reikiData.overview.description}</p>
            </div>
            <div className={styles.overviewImage}>
              <Image
                src={reikiData.overview.image}
                alt="Reiki Healing"
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
          <h2>{reikiData.benefits.title}</h2>
          <p className={styles.sectionSubtitle}>{reikiData.benefits.description}</p>
          <div className={styles.benefitsGrid}>
            {reikiData.benefits.items.map((benefit, idx) => {
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
          <h2>{reikiData.process.title}</h2>
          <div className={styles.stepsGrid}>
            {reikiData.process.steps.map((step, idx) => (
              <div key={idx} className={styles.stepCard}>
                <div className={styles.stepNumber}>{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                {idx < reikiData.process.steps.length - 1 && (
                  <ArrowRight className={styles.arrow} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chakras Section */}
      <section className={styles.chakras}>
        <div className={styles.container}>
          <h2>{reikiData.chakras.title}</h2>
          <p className={styles.sectionSubtitle}>{reikiData.chakras.description}</p>
          <div className={styles.chakrasGrid}>
            {reikiData.chakras.chakras.map((chakra, idx) => (
              <div key={idx} className={styles.chakraCard}>
                <h3>{chakra.name}</h3>
                <div className={styles.chakraInfo}>
                  <p>
                    <strong>Location:</strong> {chakra.location}
                  </p>
                  <p>
                    <strong>Color:</strong> {chakra.color}
                  </p>
                  <p>
                    <strong>Element:</strong> {chakra.element}
                  </p>
                  <p>
                    <strong>Benefit:</strong> {chakra.benefit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sessions Section */}
      <section className={styles.sessions}>
        <div className={styles.container}>
          <h2>{reikiData.sessions.title}</h2>
          <div className={styles.sessionsGrid}>
            {reikiData.sessions.types.map((session, idx) => (
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
                <button 
                  onClick={() => handleBookSession(session.name, session.price)}
                  className={styles.bookBtn}
                >
                  Book Now <ChevronRight />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faq}>
        <div className={styles.container}>
          <h2>{reikiData.faq.title}</h2>
          <div className={styles.faqGrid}>
            {reikiData.faq.questions.map((item, idx) => (
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
          <h2>{reikiData.cta.title}</h2>
          <p>{reikiData.cta.subtitle}</p>
          <div className={styles.ctaButtons}>
            {reikiData.cta.buttons.map((btn, idx) => (
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
