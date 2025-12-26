'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  SchoolOutlined,
  EmojiEventsOutlined,
  CheckCircle,
  ChevronRight,
  AutoStories,
  AccessTime,
  Group,
  EmojiEvents,
  School,
  EmojiEventsRounded,
  PeopleAlt,
  Repeat,
  FolderOpen,
  Rocket
} from '@mui/icons-material';
import * as MuiIcons from '@mui/icons-material';
import { useCheckout } from '@/context/CheckoutContext';
import LineArtBackground from '../lineArtBackground/lineArtBackground';
import styles from './courseDetail.module.css';
import Image from 'next/image';

interface CourseSession {
  name: string;
  duration: string;
  description: string;
  price: string;
  originalPrice?: string;
  includes: string[];
}

interface CourseCurriculum {
  title: string;
  description: string;
}

interface CourseDetailProps {
  courseName: string;
  category: string;
  description: string;
  meaning: string;
  benefit: string;
  use: string;
  price: string;
  duration?: string;
  sessions?: CourseSession[];
  curriculum?: CourseCurriculum[];
  level?: string;
  image?: string;
  originalPrice?: string;
}

export default function CourseDetail({
  courseName,
  category,
  description,
  meaning,
  benefit,
  use,
  price,
  duration = '8-12 weeks',
  sessions = [],
  curriculum = [],
  level = 'Beginner to Advanced',
  image = 'AutoStoriesOutlined',
  originalPrice
}: CourseDetailProps) {
  const router = useRouter();
  const { setProductData } = useCheckout();
  const categoryPath = `/courses/${category}`;
  const categoryDisplay = category.charAt(0).toUpperCase() + category.slice(1);

  // Get the MUI icon component by name
  const IconComponent = (MuiIcons as any)[image] || MuiIcons.AutoStoriesOutlined;

  // Extract numeric amount from price string (e.g., "₹8,000" -> 8000)
  const amount = parseFloat(price.replace(/[₹,]/g, '')) || 999;

  const handleEnrollNow = (sessionName?: string, sessionPrice?: string) => {
    // Store course data in context with type 'course'
    const enrollPrice = sessionPrice ? parseFloat(sessionPrice.replace(/[₹,]/g, '')) : amount;
    const enrollTitle = sessionName ? `${courseName} - ${sessionName}` : courseName;

    setProductData({
      productTitle: enrollTitle,
      amount: enrollPrice,
      type: 'course',
      serviceId: courseName.toLowerCase().replace(/\s+/g, '-'),
      description: meaning,

    });
    // Navigate to checkout
    router.push('/checkout');
  };

  return (
    <main className={styles.container}>
      {/* Header */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.breadcrumb}>
            <span>Courses</span>
            <span>/</span>
            <span>{categoryDisplay}</span>
            <span>/</span>
            <span>{courseName}</span>
          </div>
          <div className={styles.heroMain}>
            <h1>{courseName}</h1>
            <p>{description}</p>
          </div>
        </div>
      </section>

      {/* Course Details Section */}
      <section className={styles.detailsSection}>
        <div className={styles.container}>
          {/* Left Column */}
          <div className={styles.leftColumn}>
            {/* About Section */}
            <div className={styles.section}>
              <h2>About This Course</h2>
              <p>{meaning}</p>
            </div>

            {/* What You'll Learn */}
            <div className={styles.section}>
              <h2>What You'll Learn</h2>
              <ul className={styles.simpleList}>
                {benefit.split(';').slice(0, 6).map((item, index) => (
                  <li key={index}>{item.trim()}</li>
                ))}
              </ul>
            </div>

            {/* Best For */}
            <div className={styles.section}>
              <h2>Best For</h2>
              <ul className={styles.simpleList}>
                {use.split(';').slice(0, 6).map((item, index) => (
                  <li key={index}>{item.trim()}</li>
                ))}
              </ul>
            </div>

            <div className={styles.section}>
              <h2>Includes</h2>
              <ul className={styles.simpleList}>
                {sessions.length > 0 && sessions[0].includes.map((item, idx) => (
                  <li key={idx}>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right Column */}
          <aside className={styles.rightColumn}>
            {/* Course Image */}
            <div className={styles.imageBox}>
              {image  ? (
                <Image
                  src={image}
                  alt={courseName}
                  width={300}
                  height={300}
                  className={styles.courseImage}
                />
              ) : (
                <div className={styles.iconBox}>
                  <IconComponent sx={{ fontSize: 60 }} />
                </div>
              )}
            </div>

            {/* Quick Info */}
            <div className={styles.infoBox}>
              <div className={styles.infoRow}>
                <span className={styles.label}>Duration</span>
                <span className={styles.value}>{duration}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Level</span>
                <span className={styles.value}>{level}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Certificate</span>
                <span className={styles.value}>Included</span>
              </div>
            </div>

            {/* Price Section */}
            <div className={styles.priceBox}>
              <div className={styles.priceDisplay}>
                {originalPrice && (
                  <span className={styles.originalPriceText}>{originalPrice}</span>
                )}
                <span className={styles.priceText}>{price}</span>
              </div>
              <button
                onClick={() => handleEnrollNow()}
                className={styles.enrollButton}
              >
                Enroll Now
              </button>
              <Link href={categoryPath} className={styles.backLink}>
                Back to {categoryDisplay}
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Curriculum Section */}
      {curriculum && curriculum.length > 0 && (
        <section className={styles.curriculumSection}>
          <div className={styles.curriculumContainer}>
            <h2>Course Curriculum</h2>
            <div className={styles.curriculumList}>
              {curriculum.map((module, index) => (
                <div key={index} className={styles.curriculumItem}>
                  <div className={styles.moduleNumber}>{index + 1}</div>
                  <div className={styles.moduleContent}>
                    <h3>{module.title}</h3>
                    <p>{module.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing Plans Section */}
      <section className={styles.pricingSection}>
        <div className={styles.pricingContainer}>
          <h2>Choose Your Plan</h2>
          <div className={styles.pricingGrid}>
            {/* Basic Plan */}
            <div className={styles.pricingCard}>
              <div className={styles.planBadge}>Basic</div>
              <h3>Self-Paced Learning</h3>
              <div className={styles.planPrice}>
                <span className={styles.currency}>₹</span>
                <span className={styles.amount}>2,999</span>
              </div>
              <ul className={styles.planFeatures}>
                <li>
                  <CheckCircle sx={{ fontSize: 18 }} />
                  Course access for 3 months
                </li>
                <li>
                  <CheckCircle sx={{ fontSize: 18 }} />
                  Video lessons and materials
                </li>
                <li>
                  <CheckCircle sx={{ fontSize: 18 }} />
                  Email support
                </li>
              </ul>
              <button
                onClick={() => handleEnrollNow('Basic Plan', '₹2,999')}
                className={styles.planButton}
              >
                Get Started
              </button>
            </div>

            {/* Standard Plan */}
            <div className={`${styles.pricingCard} ${styles.featured}`}>
              <div className={styles.planBadge}>Popular</div>
              <h3>Comprehensive Program</h3>
              <div className={styles.planPrice}>
                <span className={styles.currency}>₹</span>
                <span className={styles.amount}>5,999</span>
              </div>
              <ul className={styles.planFeatures}>
                <li>
                  <CheckCircle sx={{ fontSize: 18 }} />
                  Lifetime course access
                </li>
                <li>
                  <CheckCircle sx={{ fontSize: 18 }} />
                  Live sessions & recordings
                </li>
                <li>
                  <CheckCircle sx={{ fontSize: 18 }} />
                  Certification included
                </li>
                <li>
                  <CheckCircle sx={{ fontSize: 18 }} />
                  Priority support
                </li>
              </ul>
              <button
                onClick={() => handleEnrollNow('Comprehensive Program', '₹5,999')}
                className={`${styles.planButton} ${styles.primaryButton}`}
              >
                Enroll Now
              </button>
            </div>

            {/* Premium Plan */}
            <div className={styles.pricingCard}>
              <div className={styles.planBadge}>Premium</div>
              <h3>1-on-1 Mentorship</h3>
              <div className={styles.planPrice}>
                <span className={styles.currency}>₹</span>
                <span className={styles.amount}>9,999</span>
              </div>
              <ul className={styles.planFeatures}>
                <li>
                  <CheckCircle sx={{ fontSize: 18 }} />
                  Everything in Standard
                </li>
                <li>
                  <CheckCircle sx={{ fontSize: 18 }} />
                  Personal mentorship sessions
                </li>
                <li>
                  <CheckCircle sx={{ fontSize: 18 }} />
                  Customized learning path
                </li>
                <li>
                  <CheckCircle sx={{ fontSize: 18 }} />
                  Career guidance
                </li>
              </ul>
              <button
                onClick={() => handleEnrollNow('1-on-1 Mentorship', '₹9,999')}
                className={styles.planButton}
              >
                Choose Premium
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className={styles.highlightsSection}>
        <div className={styles.highlightsContainer}>
          <h2>Why Choose This Course?</h2>
          <div className={styles.highlightGrid}>
            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon}>
                <School sx={{ fontSize: 32 }} />
              </div>
              <h3>Expert Instructors</h3>
              <p>Learn from certified masters with 20+ years of experience</p>
            </div>
            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon}>
                <EmojiEventsRounded sx={{ fontSize: 32 }} />
              </div>
              <h3>Recognized Certification</h3>
              <p>Industry-recognized certifications upon completion</p>
            </div>
            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon}>
                <PeopleAlt sx={{ fontSize: 32 }} />
              </div>
              <h3>Supportive Community</h3>
              <p>Connect with fellow practitioners and ongoing mentorship</p>
            </div>
            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon}>
                <Repeat sx={{ fontSize: 32 }} />
              </div>
              <h3>Lifetime Access</h3>
              <p>Access course materials and updates forever</p>
            </div>
            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon}>
                <FolderOpen sx={{ fontSize: 32 }} />
              </div>
              <h3>Comprehensive Materials</h3>
              <p>Detailed course materials, videos, and resources included</p>
            </div>
            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon}>
                <Rocket sx={{ fontSize: 32 }} />
              </div>
              <h3>Practice Building Support</h3>
              <p>Guidance on building and growing your healing practice</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2>Ready to Transform Your Skills?</h2>
          <p>Enroll in this course today and start your journey to becoming a certified practitioner</p>
          <button
            onClick={() => handleEnrollNow()}
            className={styles.ctaButton}
          >
            <AutoStories sx={{ fontSize: 20 }} />
            Enroll Now
          </button>
          <p className={styles.ctaNote}>
            ✓ Flexible payment options • ✓ Money-back guarantee • ✓ Lifetime support
          </p>
        </div>
      </section>
    </main>
  );
}
