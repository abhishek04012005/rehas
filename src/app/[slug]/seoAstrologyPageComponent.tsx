'use client';

import { useState } from 'react';
import EnquiryModal from '@/components/enquiryModal/enquiryModal';
import LineArtBackground from '@/components/lineArtBackground/lineArtBackground';
import styles from './seoAstrologyPage.module.css';

export interface SeoAstrologyCategory {
  title: string;
  description: string;
  keywords: string[];
}

interface SeoAstrologyPageProps {
  data: SeoAstrologyCategory;
}

export default function SeoAstrologyPage({ data }: SeoAstrologyPageProps) {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  return (
    <div className={styles.container}>
      <LineArtBackground />

      {/* Simple SEO Page */}
      <section className={styles.simplePage}>
        <div className={styles.simpleContent}>
          <h1 className={styles.pageTitle}>{data.title}</h1>
          
          <p className={styles.pageDescription}>{data.description}</p>

          {/* Keywords Section */}
          <div className={styles.keywordsSection}>
            <h2 className={styles.keywordsTitle}>Related Topics</h2>
            <div className={styles.keywordsList}>
              {data.keywords.map((keyword, index) => (
                <span key={index} className={styles.keyword}>
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Enquiry Button */}
          <button
            className={styles.enquiryButton}
            onClick={() => setIsEnquiryOpen(true)}
          >
            Enquiry Now
          </button>
        </div>
      </section>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />
    </div>
  );
}
