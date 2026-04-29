'use client';

import { Suspense, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { CheckCircle, FileDownload } from '@mui/icons-material';
import { useCheckout } from '@/context/CheckoutContext';
import { supabase } from '@/lib/supabase';
import { rehasData } from '@/data/rehasData';
import { contactData } from '@/data/contact';
import styles from './success.module.css';

function PaymentSuccessContent() {
  const { productData } = useCheckout();
  const [customerInfo, setCustomerInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState<any>(null);

  useEffect(() => {
    // Get payment data from localStorage (check both keys for different entry points)
    const paymentData = localStorage.getItem('paymentSuccessData');
    const receiptData = localStorage.getItem('receiptOrderData');

    const storedData = paymentData || receiptData;
    if (storedData) {
      const data = JSON.parse(storedData);
      setPaymentData(data);
      // Clear both possible data entries
      localStorage.removeItem('paymentSuccessData');
      localStorage.removeItem('receiptOrderData');
    }
  }, []);

  const orderId = paymentData?.orderId;
  const transactionId = paymentData?.transactionId;
  const amount = paymentData?.amount;
  const method = paymentData?.method || 'razorpay';

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

  const billingLocation = contactData.info.cards.find((card) => card.title === 'Location');
  const billingAddressLine1 = billingLocation?.value || '';
  const billingAddressLine2 = billingLocation?.secondaryText || '';

  const handleDownloadPDF = async () => {
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF({ unit: 'pt', format: 'a4' });
      const margin = 40;
      const lineHeight = 18;
      let y = margin;

      const orderDateString = orderDate || new Date().toLocaleDateString('en-IN');
      const orderTimeString = orderTime || new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.text('REHAS Order Receipt', margin, y);
      y += lineHeight * 2;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      const receiptDetails = [
        `Order ID: ${orderId || 'N/A'}`,
        `Order Date: ${orderDateString}`,
        `Order Time: ${orderTimeString}`,
        `Payment Mode: ${method === 'cod' ? 'Cash on Delivery' : 'Online Payment'}`,
        `Payment ID: ${transactionId || 'N/A'}`,
      ];

      receiptDetails.forEach((line) => {
        doc.text(line, margin, y);
        y += lineHeight;
      });

      y += lineHeight;
      doc.setFont('helvetica', 'bold');
      doc.text('Customer Details', margin, y);
      y += lineHeight;
      doc.setFont('helvetica', 'normal');
      const customerLines = [
        customerInfo?.full_name || 'N/A',
        customerInfo?.email || 'N/A',
        customerInfo?.phone_number || 'N/A',
      ];
      customerLines.forEach((line) => {
        doc.text(line, margin, y);
        y += lineHeight;
      });

      if (customerInfo?.order_type === 'product') {
        y += lineHeight;
        doc.setFont('helvetica', 'bold');
        doc.text('Delivery Address', margin, y);
        y += lineHeight;
        doc.setFont('helvetica', 'normal');

        const addressParts = [
          `${customerInfo?.address_line_1 || ''} ${customerInfo?.address_line_2 || ''}`.trim(),
          `${customerInfo?.city || ''}${customerInfo?.state ? ', ' + customerInfo?.state : ''}`.trim(),
          `${customerInfo?.postal_code || customerInfo?.postalCode || ''}`.trim(),
        ].filter(Boolean);

        addressParts.forEach((line) => {
          doc.text(line, margin, y);
          y += lineHeight;
        });
      }

      y += lineHeight;
      doc.setFont('helvetica', 'bold');
      doc.text('Order Summary', margin, y);
      y += lineHeight;
      doc.setFont('helvetica', 'normal');
      doc.text(`Product: ${productData?.productTitle || 'N/A'}`, margin, y);
      y += lineHeight;
      if (productData?.isPoojaSelected && productData?.poojaLabel) {
        doc.text(`Service: ${productData.poojaLabel}`, margin, y);
        y += lineHeight;
      }
      doc.text(`Total Amount: ₹${parseFloat(amount || '0').toFixed(2)}`, margin, y);

      y += lineHeight * 2;
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(10);
      doc.text('Generated by REHAS. Keep this receipt for your records.', margin, y);

      doc.save(`REHAS_Order_Receipt_${orderId || 'N/A'}.pdf`);
    } catch (error) {
      console.error('Error generating receipt PDF:', error);
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

        {/* Download Button */}
        <div className={styles.actionButtons}>
          <button onClick={handleDownloadPDF} className={styles.downloadBtn}>
            <FileDownload sx={{ fontSize: 18 }} />
            Download Receipt
          </button>
        </div>

        {/* Receipt */}
        <div className={styles.receipt} id="receipt">
          {/* Header with Logo and Order Info */}
          <div className={styles.receiptHeader}>
            <div className={styles.headerTop}>
              <div className={styles.headerLeft}>
                {rehasData.profile.logo && (
                  <div className={styles.logoContainer}>
                    <Image
                      src={rehasData.profile.logo}
                      alt="REHAS Logo"
                      width={60}
                      height={30}
                      className={styles.logo}
                    />
                  </div>
                )}
                <h2 className={styles.receiptTitle}>REHAS</h2>
              </div>
              <div className={styles.orderBadge}>
                <span className={styles.orderNumber}>Order #{orderId || 'N/A'}</span>
              </div>
            </div>
            <p className={styles.receiptSubtitle}>Order Confirmation Receipt</p>
          </div>

          {/* Ship From Address */}
          <div className={styles.receiptSection}>
            <h3 className={styles.sectionTitle}>Ship From</h3>
            <div className={styles.addressInfo}>
              <div className={styles.addressText}>REHAS, Chanakya Nagar Road, Agam Kua</div>
              <div className={styles.addressText}>Patna, Bihar, India - 800007</div>
            </div>
          </div>

          {/* Order Status */}
          <div className={styles.statusSection}>
            <div className={styles.statusBadge}>
              <CheckCircle sx={{ fontSize: 20 }} />
              <span>{method === 'cod' ? 'Order Confirmed' : 'Payment Successful'}</span>
            </div>
          </div>

          {/* Order Information */}
          <div className={styles.receiptSection}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Order Number:</span>
              <span className={styles.detailValue}>#{orderId || 'N/A'}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Order Date:</span>
              <span className={styles.detailValue}>{orderDate}</span>
            </div>
          </div>

          {/* Customer & Delivery Information */}
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <h3 className={styles.cardTitle}>Customer Details</h3>
              <div className={styles.customerInfo}>
                <div className={styles.customerName}>{customerInfo?.full_name || 'N/A'}</div>
                <div className={styles.customerContact}>
                  <span>{customerInfo?.email || 'N/A'}</span>
                  <span>{customerInfo?.phone_number || 'N/A'}</span>
                </div>
              </div>
            </div>

            {customerInfo?.order_type === 'product' && (
              <div className={styles.infoCard}>
                <h3 className={styles.cardTitle}>Delivery Address</h3>
                <div className={styles.addressInfo}>
                  <div className={styles.addressText}>
                    {customerInfo?.address_line_1} {customerInfo?.address_line_2}
                  </div>
                  <div className={styles.addressText}>
                    {customerInfo?.city}, {customerInfo?.state} - {customerInfo?.postal_code || customerInfo?.postalCode || 'N/A'}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className={styles.productSection}>
            <h3 className={styles.sectionTitle}>Order Summary</h3>
            <div className={styles.productTable}>
              <div className={styles.productTableHeader}>
                <span>Product</span>
                <span>Qty</span>
                <span>Unit Price</span>
                <span>Amount</span>
              </div>
              <div className={styles.productTableRow}>
                <div className={styles.productInfo}>
                  <div className={styles.productName}>{productData?.productTitle || 'N/A'}</div>
                </div>
                <span>1</span>
                <span>₹{amount || '0.00'}</span>
                <span className={styles.productPrice}>₹{amount || '0.00'}</span>
              </div>
            </div>
          </div>

          {/* Order Total */}
          <div className={styles.totalSection}>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Total Amount</span>
              <span className={styles.totalAmount}>₹{amount || '0.00'}</span>
            </div>
          </div>

          {/* Payment Information */}
          <div className={styles.paymentSection}>
            <h3 className={styles.sectionTitle}>Payment Details</h3>
            <div className={styles.paymentGrid}>
              <div className={styles.paymentItem}>
                <span className={styles.paymentLabel}>Payment Mode</span>
                <span className={styles.paymentValue}>
                  {method === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                </span>
              </div>
              <div className={styles.paymentItem}>
                <span className={styles.paymentLabel}>Payment ID</span>
                <span className={styles.paymentValue}>{transactionId || 'N/A'}</span>
              </div>
              <div className={styles.paymentItem}>
                <span className={styles.paymentLabel}>Payment Status</span>
                <span className={styles.paymentValue}>
                  <span className={`${styles.statusBadge} ${method === 'cod' ? styles.statusPending : styles.statusCompleted}`}>
                    {method === 'cod' ? 'Pending' : 'Completed'}
                  </span>
                </span>
              </div>
            </div>
          </div>



          {/* Thank You Message */}
          <div className={styles.thankYouSection}>
            <div className={styles.thankYouMessage}>
              <h3>Thank you for choosing REHAS!</h3>
              <p>Your order has been {method === 'cod' ? 'confirmed' : 'successfully processed'}.
                {method === 'cod' ? 'Payment will be collected upon delivery.' : 'We hope you enjoy your cosmic wellness journey.'}</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className={styles.contactSection}>
            <div className={styles.contactGrid}>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Need Help?</span>
                <span className={styles.contactValue}>{rehasData.contact.phone}</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Email</span>
                <span className={styles.contactValue}>{rehasData.contact.email}</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Website</span>
                <span className={styles.contactValue}>www.rehas.in</span>
              </div>
            </div>
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
