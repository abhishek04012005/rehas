'use client';

import { useParams, useRouter } from 'next/navigation';
import {
  Numbers,
  Brightness3,
  PanTool,
  MusicNote,
  FlashOn,
  Opacity,
  ArrowBack,
  CheckCircle,
  Schedule,
  Tag,
} from '@mui/icons-material';
import LineArtBackground from '../lineArtBackground/lineArtBackground';
import { servicesData } from '@/data/content';
import styles from './serviceDetail.module.css';

const iconMap = {
  Numbers,
  Brightness3,
  PanTool,
  MusicNote,
  FlashOn,
  Opacity,
};

export default function ServiceDetail() {
  const router = useRouter();
  const params = useParams();
  const serviceId = params.id as string;

  const service = servicesData.services.find((s) => s.id === serviceId);

  if (!service) {
    return (
      <div className={styles.notFound}>
        <div className={styles.notFoundContent}>
          <h1>Service Not Found</h1>
          <p>The service you're looking for doesn't exist.</p>
          <button onClick={() => router.push('/services')} className={styles.backBtn}>
            <ArrowBack /> Back to Services
          </button>
        </div>
      </div>
    );
  }

  const IconComponent = iconMap[service.muiIcon as keyof typeof iconMap];

  return (
    <div className={styles.serviceDetail}>
      {/* Back Button */}
      <div className={styles.backButtonContainer}>
        <button onClick={() => router.push('/services')} className={styles.backBtn}>
          <ArrowBack /> Back to Services
        </button>
      </div>

      {/* Hero Section */}
      <section className={styles.hero}>
        <LineArtBackground variant="minimal" opacity={0.4} />
        <div className={styles.heroContent}>
          <div 
            className={styles.iconBox}
            style={{ borderColor: service.color, backgroundColor: `${service.color}15` }}
          >
            <IconComponent 
              className={styles.heroIcon}
              style={{ color: service.color }}
            />
          </div>
          <h1 style={{ color: service.color }}>{service.title}</h1>
          <p>{service.description}</p>
        </div>
      </section>

      {/* Main Content */}
      <div className={styles.container}>
        {/* Overview Section */}
        <section className={styles.overviewSection}>
          <h2 style={{ color: service.color }}>About {service.title}</h2>
          <p className={styles.longDescription}>{service.details.longDescription}</p>
        </section>

        {/* Benefits Section */}
        <section className={styles.benefitsSection}>
          <h2 style={{ color: service.color }}>Benefits</h2>
          <div className={styles.benefitsList}>
            {service.details.benefits.map((benefit, idx) => (
              <div key={idx} className={styles.benefitItem}>
                <CheckCircle 
                  className={styles.benefitIcon}
                  style={{ color: service.color }}
                />
                <p>{benefit}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Details Grid */}
        <section className={styles.detailsGrid}>
          {/* What's Included */}
          <div className={styles.detailCard}>
            <h3 style={{ color: service.color }}>What's Included</h3>
            <ul className={styles.includedList}>
              {service.details.includes.map((item, idx) => (
                <li key={idx}>
                  <span className={styles.dot} style={{ backgroundColor: service.color }}></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Session Info */}
          <div className={styles.detailCard}>
            <h3 style={{ color: service.color }}>Session Information</h3>
            <div className={styles.infoItem}>
              <Schedule style={{ color: service.color }} />
              <div>
                <p className={styles.infoLabel}>Duration</p>
                <p className={styles.infoValue}>{service.details.duration}</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <Tag style={{ color: service.color }} />
              <div>
                <p className={styles.infoLabel}>Price</p>
                <p className={styles.infoValue}>{service.details.price}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.featuresSection}>
          <h2 style={{ color: service.color }}>Key Features</h2>
          <div className={styles.featuresList}>
            {service.features.map((feature, idx) => (
              <div key={idx} className={styles.featureBox}>
                <CheckCircle style={{ color: service.color }} />
                <p>{feature}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection} style={{ backgroundColor: `${service.color}15`, borderColor: service.color }}>
          <div className={styles.ctaContent}>
            <h2 style={{ color: service.color }}>Ready to Experience {service.title}?</h2>
            <p>Book your session today and start your transformation journey</p>
            <div className={styles.ctaButtons}>
              <a 
                href="/consultation" 
                className={styles.primaryBtn}
                style={{ backgroundColor: service.color, borderColor: service.color }}
              >
                Explore now
              </a>
              <a 
                href="/contact" 
                className={styles.secondaryBtn}
                style={{ borderColor: service.color, color: service.color }}
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
