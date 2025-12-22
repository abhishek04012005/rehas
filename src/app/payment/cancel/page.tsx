import { Metadata } from 'next';
import Link from 'next/link';
import { Info } from '@mui/icons-material';
import styles from './cancel.module.css';

export const metadata: Metadata = {
  title: 'Payment Cancelled | REHAS',
  description: 'Your payment has been cancelled. You can try again anytime.',
};

interface PaymentCancelledPageProps {
  searchParams: {
    orderId?: string;
  };
}

export default function PaymentCancelledPage({
  searchParams,
}: PaymentCancelledPageProps) {
  const { orderId } = searchParams;

  return (
    <main className={styles.container}>
      <div className={styles.cancelCard}>
        {/* Cancel Icon */}
        <div className={styles.iconContainer}>
          <Info sx={{ fontSize: 80 }} className={styles.cancelIcon} />
        </div>

        {/* Cancel Message */}
        <h1 className={styles.title}>Payment Cancelled</h1>
        <p className={styles.subtitle}>
          Your payment has been cancelled. Your order is still saved and you can complete the payment anytime.
        </p>

        {/* Order Details */}
        <div className={styles.detailsBox}>
          <h2>Order Information</h2>
          
          {orderId && (
            <div className={styles.detailRow}>
              <span className={styles.label}>Order Number:</span>
              <span className={styles.value}>#{orderId}</span>
            </div>
          )}
          
          <div className={styles.detailRow}>
            <span className={styles.label}>Status:</span>
            <span className={`${styles.value} ${styles.statusCancelled}`}>Pending Payment</span>
          </div>
        </div>

        {/* Information Box */}
        <div className={styles.infoBox}>
          <h3>What You Can Do:</h3>
          <ul>
            <li>Your order details have been saved safely</li>
            <li>You can retry the payment anytime</li>
            <li>No charges have been applied to your account</li>
            <li>You can also choose a different payment method</li>
            <li>Contact support if you need help or have questions</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <Link href="/checkout" className={`${styles.btn} ${styles.primaryBtn}`}>
            Complete Payment
          </Link>
          <Link href="/products" className={`${styles.btn} ${styles.secondaryBtn}`}>
            Continue Shopping
          </Link>
          <Link href="/" className={`${styles.btn} ${styles.tertiaryBtn}`}>
            Back to Home
          </Link>
        </div>

        {/* Support Info */}
        <div className={styles.supportInfo}>
          <p>
            Need help? <Link href="/contact">Get in touch with our support team</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
