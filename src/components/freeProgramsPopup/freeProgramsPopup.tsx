'use client';

import { useState } from 'react';
import EnquiryModal from '@/components/enquiryModal';
import styles from './freeProgramsPopup.module.css';
import { Close, FitnessCenter, Favorite, Psychology, AccessTime, CalendarMonth, ArrowForward } from '@mui/icons-material';

interface Program {
  id: string;
  title: string;
  schedule: string;
  time: string;
  description: string;
}

interface FreeProgramsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  programs?: Program[];
}

const DEFAULT_PROGRAMS: Program[] = [
  {
    id: 'yoga',
    title: 'YOGA Practice Session',
    schedule: 'Monday to Friday',
    time: '5:00 AM - 6:00 AM',
    description: 'Start your day with energizing yoga practice. Perfect for beginners and experienced practitioners.',
  },
  {
    id: 'healing',
    title: 'SELF HEALING Practice & Webinar',
    schedule: 'Every Saturday',
    time: 'Interactive Session',
    description: 'Learn powerful self-healing techniques and join our expert-led webinars to transform your wellness.',
  },
  {
    id: 'stress',
    title: 'Stress & Anxiety Management & Meditation',
    schedule: 'Every Sunday',
    time: 'Meditation & Coaching',
    description: 'Master stress relief and anxiety management through guided meditation and expert coaching.',
  },
];

const PROGRAM_ICONS: Record<string, React.ReactNode> = {
  yoga: <FitnessCenter />,
  healing: <Favorite />,
  stress: <Psychology />,
};

export default function FreeProgramsPopup({
  isOpen,
  onClose,
  title = 'FREE Programs',
  subtitle = 'Limited Time Offers - Join Now!',
  ctaText = 'Ready to start your wellness journey?',
  programs = DEFAULT_PROGRAMS,
}: FreeProgramsPopupProps) {
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  if (!isOpen) return null;

  // Use programs passed as prop, or fallback to DEFAULT_PROGRAMS
  const displayPrograms = programs && programs.length > 0 ? programs : DEFAULT_PROGRAMS;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          <Close />
        </button>

        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h2>{title}</h2>
            <p className={styles.subtitle}>{subtitle}</p>
          </div>
        </div>

        <div className={styles.cta}>
          <p className={styles.ctaText}>{ctaText}</p>
          <button
            className={styles.enquiryBtn}
            onClick={() => setShowEnquiryModal(true)}
          >
            <span>Enquiry Now</span>
            <ArrowForward className={styles.btnIcon} />
          </button>
        </div>

        <div className={styles.programsContainer}>
          {displayPrograms.map((program) => (
            <div
              key={program.id}
              className={styles.programCard}
              onMouseEnter={() => setHoveredCard(program.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`${styles.programIcon} ${hoveredCard === program.id ? styles.iconActive : ''}`}>
                {PROGRAM_ICONS[program.id] || PROGRAM_ICONS.yoga}
              </div>

              <div className={styles.programContent}>
                <h3>{program.title}</h3>

                <div className={styles.scheduleRow}>
                  <div className={styles.scheduleItem}>
                    <CalendarMonth className={styles.inlineIcon} />
                    <span>{program.schedule}</span>
                  </div>
                  <div className={styles.scheduleItem}>
                    <AccessTime className={styles.inlineIcon} />
                    <span>{program.time}</span>
                  </div>
                </div>

                <p className={styles.description}>{program.description}</p>

                <div className={styles.badge}>FREE</div>
              </div>

              <div className={`${styles.cardArrow} ${hoveredCard === program.id ? styles.arrowActive : ''}`}>
                <ArrowForward />
              </div>
            </div>
          ))}
        </div>
      </div>

      {showEnquiryModal && (
        <EnquiryModal
          isOpen={showEnquiryModal}
          onClose={() => setShowEnquiryModal(false)}
        />
      )}
    </>
  );
}