'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Check, Lock } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import styles from './paymentForm.module.css';

interface PaymentFormProps {
  orderId: number;
  amount: number;
  customerEmail: string;
  customerPhone: string;
  customerName: string;
  productTitle: string;
  onPaymentSuccess: (method: 'razorpay') => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PaymentForm({
  orderId,
  amount,
  customerEmail,
  customerPhone,
  customerName,
  productTitle,
  onPaymentSuccess,
}: PaymentFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    script.onerror = () => setError('Failed to load payment gateway');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      // Create Razorpay order
      const response = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Convert to paise
          orderId,
          customerEmail,
          customerPhone,
          customerName,
          productTitle,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        const errorMsg = responseData.error || 'Failed to create payment order';
        console.error('Create order error response:', responseData);
        throw new Error(errorMsg);
      }

      const { razorpayOrderId, key } = responseData;

      // Open Razorpay checkout
      const options = {
        key, // Razorpay Key ID from environment
        amount: Math.round(amount * 100), // Amount in paise
        currency: 'INR',
        name: 'REHAS',
        description: `Payment for ${productTitle}`,
        order_id: razorpayOrderId,
        customer_notification: 1,
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone,
        },
        theme: {
          color: '#560067', // Primary color
        },
        handler: async (response: any) => {
          try {
            // Verify payment on backend
            const verifyResponse = await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                orderId,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (!verifyResponse.ok) {
              throw new Error(verifyData.error || 'Payment verification failed');
            }

            // Payment successful - redirect to success page
            onPaymentSuccess('razorpay');
            router.push(
              `/payment/success?orderId=${orderId}&transactionId=${response.razorpay_payment_id}&amount=${amount.toFixed(2)}`
            );
          } catch (err: any) {
            const errorMsg = err.message || 'Payment verification failed';
            console.error('Payment verification error:', err);
            // Redirect to failed page
            router.push(
              `/payment/failed?orderId=${orderId}&reason=${encodeURIComponent(errorMsg)}&errorCode=VERIFICATION_FAILED`
            );
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            // User cancelled the payment
            router.push(`/payment/cancel?orderId=${orderId}`);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err: any) {
      setError(err.message || 'An error occurred while processing payment');
      console.error('Payment error:', err);
      setLoading(false);
    }
  };

  return (
    <div className={styles.paymentContainer}>
      <div className={styles.paymentHeader}>
        <div className={styles.lockIcon}>
          <Lock sx={{ fontSize: 40 }} />
        </div>
        <h2>Secure Payment</h2>
        <p>Select your preferred payment method</p>
      </div>

      <div className={styles.paymentDetails}>
        <div className={styles.detailRow}>
          <span className={styles.label}>Product</span>
          <span className={styles.value}>{productTitle}</span>
        </div>

        <div className={styles.detailRow}>
          <span className={styles.label}>Customer Name</span>
          <span className={styles.value}>{customerName}</span>
        </div>

        <div className={styles.detailRow}>
          <span className={styles.label}>Email</span>
          <span className={styles.value}>{customerEmail}</span>
        </div>

        <div className={styles.detailRow}>
          <span className={styles.label}>Phone</span>
          <span className={styles.value}>{customerPhone}</span>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.amountRow}>
          <span className={styles.amountLabel}>Total Amount</span>
          <span className={styles.amountValue}>₹{amount.toFixed(2)}</span>
        </div>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <div className={styles.paymentActions}>
        <button
          onClick={handlePayment}
          disabled={loading || !scriptLoaded}
          className={styles.payButton}
        >
          {loading ? (
            <>
              <CircularProgress size={18} sx={{ color: 'white' }} />
              Processing...
            </>
          ) : (
            <>
              <ShoppingCart sx={{ fontSize: 18 }} />
              Pay Now - ₹{amount.toFixed(2)}
            </>
          )}
        </button>
      </div>

      <div className={styles.securityInfo}>
        <Check sx={{ fontSize: 32, color: 'var(--primary)' }} />
        <div className={styles.securityText}>
          <p>Your payment information is secure and encrypted</p>
          <small>Powered by Razorpay - India's most trusted payment gateway</small>
        </div>
      </div>

      <div className={styles.infoBox}>
        <h4>Payment Information</h4>
        <ul>
          <li>Secure SSL encrypted transaction</li>
          <li>Multiple payment methods available</li>
          <li>Instant order confirmation</li>
          <li>Order confirmation email will be sent</li>
        </ul>
      </div>
    </div>
  );
}
