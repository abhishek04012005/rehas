'use client';

import { useEffect, useRef, useState } from 'react';
import EnquiryModal from '@/components/enquiryModal';
import styles from './freeProgramsPopup.module.css';
import { Close, Favorite, ArrowForward, LocalFireDepartment, Star } from '@mui/icons-material';

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
    id: 'reiki',
    title: 'Reiki Level - 1',
    schedule: 'Ancient Healing Practice',
    time: 'REHAS COSMIC',
    description: 'Transform your life with our certified Reiki Level 1 program. Learn energy healing techniques and unlock your spiritual potential.',
  },
];

export default function FreeProgramsPopup({
  isOpen,
  onClose,
  title = 'FREE Programs',
  subtitle = 'Limited Time Offers - Join Now!',
  ctaText = 'Ready to start your wellness journey?',
  programs = DEFAULT_PROGRAMS,
}: FreeProgramsPopupProps) {
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen || showEnquiryModal) return;
    popupRef.current?.focus();
  }, [isOpen, showEnquiryModal]);

  useEffect(() => {
    if (!isOpen && !showEnquiryModal) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handlePopupClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, showEnquiryModal]);

  const handlePopupClose = () => {
    onClose();
  };

  const handleEnquiryModalClose = () => {
    setShowEnquiryModal(false);
  };

  if (!isOpen && !showEnquiryModal) return null;

  const displayPrograms = DEFAULT_PROGRAMS;

  return (
    <>
      {!showEnquiryModal && (
        <>
          <div className={styles.overlay} onClick={handlePopupClose} />
          <div
            className={styles.modal}
            ref={popupRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="free-programs-title"
            tabIndex={-1}
          >
            {/* Close Button */}
            <button
              type="button"
              className={styles.closeBtn}
              onClick={handlePopupClose}
              aria-label="Close free programs popup"
              title="Close free programs popup"
            >
              <Close />
            </button>

            {/* CTA Section - Top */}
            <div className={styles.topCTA}>
              <h2 id="free-programs-title">Join Our Free Program</h2>
              <button
                className={styles.enquiryBtn}
                onClick={() => setShowEnquiryModal(true)}
              >
                Enquiry Now
                <ArrowForward className={styles.btnIcon} />
              </button>
            </div>

            {/* Program Card - Simplified */}
            <div className={styles.programsGrid}>
              {displayPrograms.map((program) => (
                <div key={program.id} className={styles.programCard}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>{program.title}</h3>
                    <div className={styles.freeBadge}>
                      <LocalFireDepartment className={styles.fireIcon} />
                      FREE
                    </div>
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.infoRow}>
                      <span className={styles.label}>{program.schedule}</span>
                      <span className={styles.dot}>•</span>
                      <span className={styles.label}>{program.time}</span>
                    </div>
                    <p className={styles.description}>{program.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Features */}
            <div className={styles.quickFeatures}>
              <div className={styles.featureItem}>
                <Favorite className={styles.featureIcon} />
                <span>Expert Training</span>
              </div>
              <div className={styles.featureItem}>
                <Star className={styles.featureIcon} />
                <span>Certified Program</span>
              </div>
            </div>
          </div>
        </>
      )}

      {showEnquiryModal && (
        <EnquiryModal
          isOpen={showEnquiryModal}
          onClose={() => {
            setShowEnquiryModal(false);
            onClose();
          }}
        />
      )}
    </>
  );
}