'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Lock,
  Description,
  EventNote,
  CreditCard,
  AutoAwesome,
  Gavel,
  WarningAmber,
  Email,
  Phone,
  LocationOn,
  ExpandMore,
  ChevronRight,
  DoneAll,
} from '@mui/icons-material';
import LineArtBackground from '../lineArtBackground/lineArtBackground';
import { policyData } from '@/data/policy';
import styles from './policy.module.css';

const iconMap = {
  Lock,
  Description,
  EventNote,
  CreditCard,
  AutoAwesome,
  Gavel,
  WarningAmber,
  Email,
  Phone,
  LocationOn,
};

export default function Policy() {
  const [expandedSection, setExpandedSection] = useState<string | null>('privacy');

  return (
    <div className={styles.policy}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <LineArtBackground variant="default" opacity={0.1} />
        <div className={styles.heroContent}>
          <h1>{policyData.hero.title}</h1>
          <p className={styles.subtitle}>{policyData.hero.subtitle}</p>
          <p className={styles.description}>{policyData.hero.description}</p>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className={styles.navigation}>
        <div className={styles.container}>
          <nav className={styles.navTabs}>
            {policyData.sections.map((section) => {
              const IconComponent = iconMap[section.icon as keyof typeof iconMap];
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    setExpandedSection(section.id);
                    document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`${styles.navTab} ${expandedSection === section.id ? styles.active : ''}`}
                >
                  {IconComponent && <IconComponent className={styles.navIcon} />}
                  <span>{section.title}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </section>

      {/* Policy Sections */}
      <section className={styles.policyContent}>
        <div className={styles.container}>
          {policyData.sections.map((section) => {
            const IconComponent = iconMap[section.icon as keyof typeof iconMap];
            const isExpanded = expandedSection === section.id;

            return (
              <div
                key={section.id}
                id={section.id}
                className={`${styles.policySection} ${isExpanded ? styles.expanded : ''}`}
              >
                {/* Section Header */}
                <button
                  onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                  className={styles.sectionHeader}
                >
                  <div className={styles.headerLeft}>
                    {IconComponent && <IconComponent className={styles.sectionIcon} />}
                    <h2>{section.title}</h2>
                  </div>
                  <ExpandMore
                    className={`${styles.chevron} ${isExpanded ? styles.rotated : ''}`}
                  />
                </button>

                {/* Section Content */}
                {isExpanded && (
                  <div className={styles.sectionBody}>
                    {section.content.map((subsection: any, idx: number) => (
                      <div key={idx} className={styles.subsection}>
                        <h3>{subsection.subtitle}</h3>
                        <p className={styles.text}>{subsection.text}</p>
                        {subsection.points && (
                          <ul className={styles.pointsList}>
                            {subsection.points.map((point: string, pointIdx: number) => (
                              <li key={pointIdx}>
                                <DoneAll className={styles.checkIcon} />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Section */}
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <h2>{policyData.contact.title}</h2>
          <p>{policyData.contact.description}</p>

          <div className={styles.contactGrid}>
            {policyData.contact.cards.map((card, idx) => {
              const IconComponent = iconMap[card.icon as keyof typeof iconMap];
              return (
                <div key={idx} className={styles.contactCard}>
                  {IconComponent && <IconComponent className={styles.contactIcon} />}
                  <h3>{card.title}</h3>
                  {card.link ? (
                    <a href={card.link} className={styles.contactLink}>
                      {card.value}
                    </a>
                  ) : (
                    <p className={styles.contactValue}>{card.value}</p>
                  )}
                  <p className={styles.contactSecondary}>{card.secondaryText}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2>{policyData.cta.title}</h2>
          <p>{policyData.cta.subtitle}</p>
          <div className={styles.ctaButtons}>
            {policyData.cta.buttons.map((btn, idx) => (
              <Link
                key={idx}
                href={btn.href}
                className={`${styles.ctaButton} ${styles[btn.type]}`}
              >
                {btn.label} <ChevronRight />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Last Updated */}
      <section className={styles.footer}>
        <div className={styles.container}>
          <p>Last updated: December 2025</p>
          <p>
            For the most current policy information, please visit this page regularly. We reserve
            the right to update these policies at any time without prior notice.
          </p>
        </div>
      </section>
    </div>
  );
}
