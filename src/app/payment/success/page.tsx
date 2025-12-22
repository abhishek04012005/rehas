'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, FileDownload, Print } from '@mui/icons-material';
import { useCheckout } from '@/context/CheckoutContext';
import { supabase } from '@/lib/supabase';
import { rehasData } from '@/data/rehasData';
import styles from './success.module.css';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const { productData } = useCheckout();
  const [customerInfo, setCustomerInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const orderId = searchParams.get('orderId');
  const transactionId = searchParams.get('transactionId');
  const amount = searchParams.get('amount');
  const method = searchParams.get('method') || 'razorpay';

  useEffect(() => {
    const fetchCustomerInfo = async () => {
      if (!orderId) return;
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .single();

        if (data) {
          setCustomerInfo(data);
        }
      } catch (err) {
        console.error('Error fetching customer info:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerInfo();
  }, [orderId]);

  // Get current date and time
  const now = new Date();
  const orderDate = now.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const orderTime = now.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // Create a new window for printing
    const printWindow = window.open('', '', 'height=800,width=800');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>REHAS - Order Receipt #${orderId}</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                padding: 40px;
                background: white;
                max-width: 210mm;
                height: 297mm;
                margin: 0 auto;
              }
              .receipt-container {
                border: 2px solid #560067;
                padding: 30px;
                background: white;
              }
              .header {
                text-align: center;
                border-bottom: 2px solid #560067;
                padding-bottom: 20px;
                margin-bottom: 20px;
              }
              .header h1 {
                color: #560067;
                margin: 0;
                font-size: 24px;
              }
              .header p {
                color: #666;
                margin: 5px 0;
              }
              .section {
                margin-bottom: 20px;
              }
              .section-title {
                color: #560067;
                font-weight: bold;
                font-size: 14px;
                border-bottom: 1px solid #ddd;
                padding-bottom: 8px;
                margin-bottom: 10px;
              }
              .detail-row {
                display: flex;
                justify-content: space-between;
                padding: 8px 0;
                font-size: 13px;
              }
              .detail-label {
                font-weight: bold;
                color: #333;
              }
              .detail-value {
                color: #666;
                text-align: right;
              }
              .amount-row {
                display: flex;
                justify-content: space-between;
                padding: 12px 0;
                border-top: 2px solid #560067;
                border-bottom: 2px solid #560067;
                font-size: 16px;
                font-weight: bold;
                color: #560067;
              }
              .footer {
                text-align: center;
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid #ddd;
                font-size: 12px;
                color: #999;
              }
              .contact-info {
                text-align: center;
                margin-top: 20px;
                padding: 15px;
                background: #f9f9f9;
                border-radius: 5px;
                font-size: 12px;
              }
              .contact-info p {
                margin: 5px 0;
              }
            </style>
          </head>
          <body>
            <div class="receipt-container">
              <div class="header">
                <h1>REHAS</h1>
                <p>Order Receipt</p>
              </div>

              <div class="section">
                <div class="section-title">ORDER INFORMATION</div>
                <div class="detail-row">
                  <span class="detail-label">Order Number:</span>
                  <span class="detail-value">#${orderId || 'N/A'}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Order Date:</span>
                  <span class="detail-value">${orderDate}</span>
                </div>
              </div>

              <div class="section">
                <div class="section-title">CUSTOMER INFORMATION</div>
                <div class="detail-row">
                  <span class="detail-label">Name:</span>
                  <span class="detail-value">${customerInfo?.full_name || 'N/A'}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Email:</span>
                  <span class="detail-value">${customerInfo?.email || 'N/A'}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Phone:</span>
                  <span class="detail-value">${customerInfo?.phone || 'N/A'}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Address:</span>
                  <span class="detail-value">${customerInfo?.address_line_1 || ''} ${customerInfo?.address_line_2 || ''}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">City:</span>
                  <span class="detail-value">${customerInfo?.city || 'N/A'}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">State:</span>
                  <span class="detail-value">${customerInfo?.state || 'N/A'}</span>
                </div>
              </div>

              <div class="section">
                <div class="section-title">PRODUCT DETAILS</div>
                <div class="detail-row">
                  <span class="detail-label">Product Name:</span>
                  <span class="detail-value">${productData?.productTitle || 'N/A'}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Amount:</span>
                  <span class="detail-value">₹${amount || '0.00'}</span>
                </div>
              </div>

              <div class="section">
                <div class="section-title">PAYMENT INFORMATION</div>
                <div class="detail-row">
                  <span class="detail-label">Payment Method:</span>
                  <span class="detail-value">${method === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Payment ID:</span>
                  <span class="detail-value">${transactionId || 'N/A'}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Payment Status:</span>
                  <span class="detail-value">${method === 'cod' ? 'Pending' : 'Completed'}</span>
                </div>
              </div>

              <div class="amount-row">
                <span>TOTAL AMOUNT:</span>
                <span>₹${amount || '0.00'}</span>
              </div>

              <div class="contact-info">
                <p><strong>REHAS - Cosmic Wellness</strong></p>
                <p>Email: ${rehasData.contact.email}</p>
                <p>Phone: ${rehasData.contact.phone}</p>
                <p>Website: https://rehas.in</p>
                <p style="margin-top: 10px; font-size: 11px;">This is an electronically generated receipt. No signature required.</p>
              </div>
            </div>
          </body>
        </html>
      `);

      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.successCard}>
        {/* Success Icon */}
        <div className={styles.iconContainer}>
          <CheckCircle sx={{ fontSize: 80 }} className={styles.successIcon} />
        </div>

        {/* Success Message */}
        <h1 className={styles.title}>
          {method === 'cod' ? 'Order Confirmed!' : 'Payment Successful!'}
        </h1>
        <p className={styles.subtitle}>
          {method === 'cod'
            ? 'Your order has been placed successfully. Payment will be collected on delivery.'
            : 'Thank you for your purchase. Your payment has been processed successfully.'}
        </p>

        {/* Print & Download Buttons */}
        <div className={styles.actionButtons}>
          <button onClick={handlePrint} className={styles.printBtn}>
            <Print sx={{ fontSize: 18 }} />
            Print Receipt
          </button>
          <button onClick={handleDownloadPDF} className={styles.downloadBtn}>
            <FileDownload sx={{ fontSize: 18 }} />
            Download Receipt
          </button>
        </div>

        {/* Receipt */}
        <div className={styles.receipt} id="receipt">
          {/* Header with Logo */}
          <div className={styles.receiptHeader}>
            {rehasData.profile.logo && (
              <div className={styles.logoContainer}>
                <Image
                  src={rehasData.profile.logo}
                  alt="REHAS Logo"
                  width={150}
                  height={60}
                  className={styles.logo}
                />
              </div>
            )}
            <h2 className={styles.receiptTitle}>REHAS</h2>
            <p className={styles.receiptSubtitle}>Order Receipt</p>
          </div>

          {/* Order Information */}
          <div className={styles.receiptSection}>
            <h3 className={styles.sectionTitle}>ORDER INFORMATION</h3>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Order Number:</span>
              <span className={styles.detailValue}>#{orderId || 'N/A'}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Order Date:</span>
              <span className={styles.detailValue}>{orderDate}</span>
            </div>
          </div>

          {/* Customer Information */}
          {customerInfo && (
            <div className={styles.receiptSection}>
              <h3 className={styles.sectionTitle}>CUSTOMER INFORMATION</h3>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Name:</span>
                <span className={styles.detailValue}>{customerInfo.full_name || 'N/A'}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Email:</span>
                <span className={styles.detailValue}>{customerInfo.email || 'N/A'}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Phone:</span>
                <span className={styles.detailValue}>{customerInfo.phone || 'N/A'}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Address:</span>
                <span className={styles.detailValue}>
                  {customerInfo.address_line_1} {customerInfo.address_line_2}
                </span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>City:</span>
                <span className={styles.detailValue}>{customerInfo.city || 'N/A'}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>State:</span>
                <span className={styles.detailValue}>{customerInfo.state || 'N/A'}</span>
              </div>
            </div>
          )}

          {/* Product Details */}
          <div className={styles.receiptSection}>
            <h3 className={styles.sectionTitle}>PRODUCT DETAILS</h3>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Product Name:</span>
              <span className={styles.detailValue}>{productData?.productTitle || 'N/A'}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Amount:</span>
              <span className={styles.detailValue}>₹{amount || '0.00'}</span>
            </div>
          </div>

          {/* Payment Information */}
          <div className={styles.receiptSection}>
            <h3 className={styles.sectionTitle}>PAYMENT INFORMATION</h3>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Payment Method:</span>
              <span className={styles.detailValue}>
                {method === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Payment ID:</span>
              <span className={styles.detailValue}>{transactionId || 'N/A'}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Payment Status:</span>
              <span className={styles.detailValue}>
                {method === 'cod' ? 'Pending' : 'Completed'}
              </span>
            </div>
          </div>

          {/* Total Amount */}
          <div className={styles.amountBox}>
            <div className={styles.amountRow}>
              <span>TOTAL AMOUNT:</span>
              <span>₹{amount || '0.00'}</span>
            </div>
          </div>

          {/* Contact Information Footer */}
          <div className={styles.contactFooter}>
            <h4 className={styles.contactTitle}>REHAS - Cosmic Wellness</h4>
            <p>Email: {rehasData.contact.email}</p>
            <p>Phone: {rehasData.contact.phone}</p>
            <p>Website: https://rehas.in</p>
            <p className={styles.disclaimerText}>This is an electronically generated receipt. No signature required.</p>
          </div>
        </div>

        {/* Information Box */}
        <div className={styles.infoBox}>
          <h3>What Happens Next?</h3>
          <ul>
            <li>A confirmation email has been sent to your registered email address</li>
            {method !== 'cod' && <li>Your order will be processed and shipped soon</li>}
            {method === 'cod' && (
              <li>Our team will contact you to confirm delivery schedule</li>
            )}
            <li>You will receive tracking details via email</li>
            <li>If you have any questions, please contact our support team</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <Link href="/products/healing" className={`${styles.btn} ${styles.primaryBtn}`}>
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

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
