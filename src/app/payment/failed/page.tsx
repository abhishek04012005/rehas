import { Metadata } from 'next';
import Link from 'next/link';
import { Cancel } from '@mui/icons-material';
import styles from './failed.module.css';

export const metadata: Metadata = {
  title: 'Payment Failed | REHAS',
  description: 'Your payment could not be processed. Please try again or use a different payment method.',
  robots: {
    index: false,
    follow: false,
  },
};

interface PaymentFailedPageProps {
  searchParams: {
    orderId?: string;
    reason?: string;
    errorCode?: string;
  };
}

export default function PaymentFailedPage({
  searchParams,
}: PaymentFailedPageProps) {
  const { orderId, reason, errorCode } = searchParams;

  return (
    <main className={styles.container}>
      <div className={styles.failedCard}>
        {/* Failed Icon */}
        <div className={styles.iconContainer}>
          <Cancel sx={{ fontSize: 80 }} className={styles.failedIcon} />
        </div>

        {/* Error Message */}
        <h1 className={styles.title}>Payment Failed</h1>
        <p className={styles.subtitle}>
          We were unable to process your payment. Please try again or use a different payment method.
        </p>

        {/* Error Details */}
        <div className={styles.detailsBox}>
          <h2>Error Details</h2>
          
          {orderId && (
            <div className={styles.detailRow}>
              <span className={styles.label}>Order Number:</span>
              <span className={styles.value}>#{orderId}</span>
            </div>
          )}
          
          {errorCode && (
            <div className={styles.detailRow}>
              <span className={styles.label}>Error Code:</span>
              <span className={styles.value}>{errorCode}</span>
            </div>
          )}
          
          {reason && (
            <div className={styles.detailRow}>
              <span className={styles.label}>Reason:</span>
              <span className={styles.value}>{reason}</span>
            </div>
          )}
          
          <div className={styles.detailRow}>
            <span className={styles.label}>Status:</span>
            <span className={`${styles.value} ${styles.statusFailed}`}>Failed</span>
          </div>
        </div>

        {/* Common Reasons */}
        <div className={styles.infoBox}>
          <h3>Common Reasons for Payment Failure:</h3>
          <ul>
            <li>Insufficient funds in your account</li>
            <li>Incorrect card/UPI details</li>
            <li>Payment gateway timeout</li>
            <li>Daily transaction limit exceeded</li>
            <li>Card blocked by your bank for security</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <Link href="/checkout" className={`${styles.btn} ${styles.primaryBtn}`}>
            Try Again
          </Link>
          <Link href="/" className={`${styles.btn} ${styles.secondaryBtn}`}>
            Back to Home
          </Link>
        </div>

        {/* Support Info */}
        <div className={styles.supportInfo}>
          <p>
            Still facing issues? <Link href="/contact">Contact our support team</Link> for assistance.
          </p>
        </div>
      </div>
    </main>
  );
}
