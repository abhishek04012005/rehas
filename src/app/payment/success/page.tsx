import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle } from '@mui/icons-material';
import styles from './success.module.css';

export const metadata: Metadata = {
  title: 'Payment Successful | REHAS',
  description: 'Your payment has been processed successfully. Your order is confirmed.',
};

interface PaymentSuccessPageProps {
  searchParams: {
    orderId?: string;
    transactionId?: string;
    amount?: string;
    method?: string;
  };
}

export default function PaymentSuccessPage({
  searchParams,
}: PaymentSuccessPageProps) {
  const { orderId, transactionId, amount, method } = searchParams;

  return (
    <main className={styles.container}>
      <div className={styles.successCard}>
        {/* Success Icon */}
        <div className={styles.iconContainer}>
          <CheckCircle sx={{ fontSize: 80 }} className={styles.successIcon} />
        </div>

        {/* Success Message */}
        <h1 className={styles.title}>Payment Successful!</h1>
        <p className={styles.subtitle}>
          Thank you for your purchase. Your payment has been processed successfully.
        </p>

        {/* Order Details */}
        <div className={styles.detailsBox}>
          <h2>Order Details</h2>
          
          {orderId && (
            <div className={styles.detailRow}>
              <span className={styles.label}>Order Number:</span>
              <span className={styles.value}>#{orderId}</span>
            </div>
          )}
          
          {transactionId && (
            <div className={styles.detailRow}>
              <span className={styles.label}>Transaction ID:</span>
              <span className={styles.value}>{transactionId}</span>
            </div>
          )}
          
          {amount && (
            <div className={styles.detailRow}>
              <span className={styles.label}>Amount Paid:</span>
              <span className={styles.value}>₹{amount}</span>
            </div>
          )}
          
          <div className={styles.detailRow}>
            <span className={styles.label}>Status:</span>
            <span className={`${styles.value} ${styles.statusSuccess}`}>Confirmed</span>
          </div>
        </div>

        {/* Information Box */}
        <div className={styles.infoBox}>
          <h3>What Happens Next?</h3>
          <ul>
            <li>A confirmation email has been sent to your registered email address</li>
            <li>Your order will be processed and shipped soon</li>
            <li>You will receive tracking details via email</li>
            <li>If you have any questions, please contact our support team</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <Link href="/products" className={`${styles.btn} ${styles.primaryBtn}`}>
            Continue Shopping
          </Link>
          <Link href="/" className={`${styles.btn} ${styles.secondaryBtn}`}>
            Back to Home
          </Link>
        </div>

        {/* Support Info */}
        <div className={styles.supportInfo}>
          <p>
            Have questions? <Link href="/contact">Contact our support team</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
