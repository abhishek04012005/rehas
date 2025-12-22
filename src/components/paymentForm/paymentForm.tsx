'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Check, Lock, LocalShipping } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import styles from './paymentForm.module.css';

interface PaymentFormProps {
  orderId: number;
  amount: number;
  customerEmail: string;
  customerPhone: string;
  customerName: string;
  productTitle: string;
  onPaymentSuccess: () => void;
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cod' | null>(null);

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
    if (!paymentMethod) {
      setError('Please select a payment method');
      return;
    }

    setLoading(true);
    setError(null);

    // Handle Cash on Delivery
    if (paymentMethod === 'cod') {
      try {
        const response = await fetch('/api/razorpay/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderId,
            paymentMethod: 'cod',
            isCOD: true,
          }),
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.error || 'Failed to process COD order');
        }

        onPaymentSuccess();
      } catch (err: any) {
        setError(err.message || 'Failed to process COD order');
        console.error('COD error:', err);
        setLoading(false);
      }
      return;
    }

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

      if (!response.ok) {
        throw new Error('Failed to create payment order');
      }

      const { razorpayOrderId, key } = await response.json();

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
                razorpayOrderId: response.order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            if (!verifyResponse.ok) {
              throw new Error('Payment verification failed');
            }

            // Payment successful
            onPaymentSuccess();
          } catch (err: any) {
            setError('Payment verification failed. Please contact support.');
            console.error('Payment verification error:', err);
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
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

      <div className={styles.paymentMethodSection}>
        <h3>Choose Payment Method</h3>
        
        <div className={styles.paymentMethodsGrid}>
          <div
            className={`${styles.paymentMethodCard} ${paymentMethod === 'razorpay' ? styles.selected : ''}`}
            onClick={() => setPaymentMethod('razorpay')}
          >
            <div className={styles.methodIcon}>
              <ShoppingCart sx={{ fontSize: 32 }} />
            </div>
            <h4>Online Payment</h4>
            <p>Pay securely with Razorpay</p>
            <small>Credit Card, Debit Card, Net Banking, UPI</small>
          </div>

          <div
            className={`${styles.paymentMethodCard} ${paymentMethod === 'cod' ? styles.selected : ''}`}
            onClick={() => setPaymentMethod('cod')}
          >
            <div className={styles.methodIcon}>
              <LocalShipping sx={{ fontSize: 32 }} />
            </div>
            <h4>Cash on Delivery</h4>
            <p>Pay when you receive</p>
            <small>Available for select locations</small>
          </div>
        </div>
      </div>

      <div className={styles.paymentActions}>
        <button
          onClick={handlePayment}
          disabled={loading || (!scriptLoaded && paymentMethod === 'razorpay') || !paymentMethod}
          className={styles.payButton}
        >
          {loading ? (
            <>
              <CircularProgress size={18} sx={{ color: 'white' }} />
              Processing...
            </>
          ) : paymentMethod === 'cod' ? (
            <>
              <LocalShipping sx={{ fontSize: 18 }} />
              Confirm Cash on Delivery
            </>
          ) : (
            <>
              <ShoppingCart sx={{ fontSize: 18 }} />
              Pay ₹{amount.toFixed(2)} with Razorpay
            </>
          )}
        </button>
      </div>

      <div className={styles.securityInfo}>
        <div className={styles.securityIcon}>✓</div>
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
