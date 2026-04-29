'use client';

import styles from './footer.module.css';

export default function ScrollToTopButton() {
  return (
    <button
      className={styles.scrollToTop}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      title="Scroll to top"
      aria-label="Scroll to top"
    >
      <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
        <path d="M12 8l-6 6h12z" fill="currentColor" />
      </svg>
    </button>
  );
}
