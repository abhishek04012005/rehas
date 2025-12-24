'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SchoolOutlined, EmojiEventsOutlined, CheckCircle, ChevronRight, AutoStories, AccessTime, Group, EmojiEvents } from '@mui/icons-material';
import { useCheckout } from '@/context/CheckoutContext';
import LineArtBackground from '../lineArtBackground/lineArtBackground';
import styles from './courseDetail.module.css';

interface CourseSession {
  name: string;
  duration: string;
  description: string;
  price: string;
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
  image = '📚',
}: CourseDetailProps) {
  const router = useRouter();
  const { setProductData } = useCheckout();
  const categoryPath = `/courses/${category}`;
  const categoryDisplay = category.charAt(0).toUpperCase() + category.slice(1);

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
        <LineArtBackground />
        <div className={styles.heroContent}>
          <div className={styles.breadcrumb}>
            <span>Courses</span>
            <ChevronRight sx={{ fontSize: 20 }} />
            <span>{categoryDisplay}</span>
            <ChevronRight sx={{ fontSize: 20 }} />
            <span>{courseName}</span>
          </div>
          <h1 className={styles.courseTitle}>{courseName}</h1>
          <p className={styles.courseSubtitle}>{description}</p>
          <div className={styles.heroMeta}>
            <div className={styles.metaItem}>
              <AccessTime sx={{ fontSize: 20 }} />
              <span>{duration}</span>
            </div>
            <div className={styles.metaItem}>
              <EmojiEvents sx={{ fontSize: 20 }} />
              <span>{level}</span>
            </div>
            <div className={styles.metaItem}>
              <AutoStories sx={{ fontSize: 20 }} />
              <span>Certification Included</span>
            </div>
          </div>
        </div>
      </section>

      {/* Course Details Section */}
      <section className={styles.detailsSection}>
        <div className={styles.detailsContainer}>
          {/* Course Image Section */}
          <div className={styles.imageSection}>
            <div className={styles.courseImageWrapper}>
              <div className={styles.courseImagePlaceholder}>
                <div className={styles.courseIcon}>{image}</div>
              </div>
              <div className={styles.priceBox}>
                <span className={styles.priceLabel}>Starting From</span>
                <span className={styles.price}>{price}</span>
                <button
                  onClick={() => handleEnrollNow()}
                  className={styles.enrollBtnSmall}
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </div>

          {/* Course Information Section */}
          <div className={styles.infoSection}>
            {/* Overview */}
            <div className={styles.infoBox}>
              <h2 className={styles.boxTitle}>Course Overview</h2>
              <p className={styles.boxContent}>{meaning}</p>
            </div>

            {/* Benefits Grid */}
            <div className={styles.benefitsGrid}>
              <div className={styles.benefitBox}>
                <h3 className={styles.boxTitle}>
                  <EmojiEventsOutlined sx={{ fontSize: 20 }} />
                  What You'll Learn
                </h3>
                <ul className={styles.benefitList}>
                  {benefit.split(';').map((item, index) => (
                    <li key={index}>
                      <CheckCircle sx={{ fontSize: 16 }} />
                      <span>{item.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.useBox}>
                <h3 className={styles.boxTitle}>
                  <SchoolOutlined sx={{ fontSize: 20 }} />
                  Best For
                </h3>
                <ul className={styles.benefitList}>
                  {use.split(';').map((item, index) => (
                    <li key={index}>
                      <CheckCircle sx={{ fontSize: 16 }} />
                      <span>{item.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.actionButtons}>
              <button
                onClick={() => handleEnrollNow()}
                className={styles.enrollBtn}
              >
                <AutoStories sx={{ fontSize: 18 }} />
                Enroll Now
              </button>
              <Link href={categoryPath} className={styles.continueBtn}>
                Back to {categoryDisplay} Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Course Formats Section */}
      {sessions && sessions.length > 0 && (
        <section className={styles.formatsSection}>
          <div className={styles.formatsContainer}>
            <h2>Choose Your Learning Format</h2>
            <p className={styles.formatsSubtitle}>
              Select the format that best suits your schedule and learning style
            </p>
            <div className={styles.sessionGrid}>
              {sessions.map((session, index) => (
                <div key={index} className={styles.sessionCard}>
                  <div className={styles.sessionHeader}>
                    <h3>{session.name}</h3>
                    <span className={styles.duration}>{session.duration}</span>
                  </div>
                  <p className={styles.sessionDescription}>{session.description}</p>

                  <div className={styles.priceSection}>
                    <span className={styles.sessionPrice}>{session.price}</span>
                  </div>

                  <div className={styles.includesList}>
                    <h4>Includes:</h4>
                    <ul>
                      {session.includes.map((item, idx) => (
                        <li key={idx}>
                          <CheckCircle sx={{ fontSize: 14 }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => handleEnrollNow(session.name, session.price)}
                    className={styles.sessionEnrollBtn}
                  >
                    Enroll in {session.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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

      {/* Highlights Section */}
      <section className={styles.highlightsSection}>
        <div className={styles.highlightsContainer}>
          <h2>Why Choose This Course?</h2>
          <div className={styles.highlightGrid}>
            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon}>🎓</div>
              <h3>Expert Instructors</h3>
              <p>Learn from certified masters with 20+ years of experience</p>
            </div>
            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon}>🏆</div>
              <h3>Recognized Certification</h3>
              <p>Industry-recognized certifications upon completion</p>
            </div>
            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon}>👥</div>
              <h3>Supportive Community</h3>
              <p>Connect with fellow practitioners and ongoing mentorship</p>
            </div>
            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon}>♾️</div>
              <h3>Lifetime Access</h3>
              <p>Access course materials and updates forever</p>
            </div>
            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon}>📚</div>
              <h3>Comprehensive Materials</h3>
              <p>Detailed course materials, videos, and resources included</p>
            </div>
            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon}>🚀</div>
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
