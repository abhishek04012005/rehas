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
    // Dynamically import html2pdf to avoid SSR issues
    const html2pdf = (await import('html2pdf.js')).default;
    // Create a temporary HTML element with the receipt content
    const receiptElement = document.createElement('div');
    receiptElement.innerHTML = `
      <div style="
        font-family: Arial, sans-serif;
        padding: 20px;
        background: white;
        max-width: 210mm;
        margin: 0 auto;
        line-height: 1.4;
        color: #333;
      ">
        <div style="
          border: 2px solid #560067;
          padding: 30px;
          background: white;
          border-radius: 8px;
          position: relative;
          overflow: hidden;
        ">
          <div style="
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #560067, #7b1fa2);
          "></div>

          <div style="
            text-align: center;
            border-bottom: 1px solid #e0e0e0;
            padding-bottom: 20px;
            margin-bottom: 20px;
            position: relative;
          ">
            <div style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 12px;
            ">
              <div style="
                display: flex;
                align-items: center;
                gap: 12px;
              ">
                <img src="/logohalf.svg" alt="REHAS Logo" style="
                  width: 60px;
                  height: 30px;
                  object-fit: contain;
                ">
                <div style="
                  color: #560067;
                  font-size: 18px;
                  font-weight: 700;
                ">REHAS</div>
              </div>
              <div style="text-align: right; font-size: 12px; color: #666;">
                <div style="font-weight: 700; color: #560067; font-size: 14px; margin-bottom: 2px;">Order #${orderId || 'N/A'}</div>
                <div>${orderDate}</div>
              </div>
            </div>
            <div style="
              text-align: center;
              margin-bottom: 8px;
            ">
              <p style="
                color: #000;
                margin: 0;
                font-size: 25px;
                font-weight: 700;
              ">Order Confirmation Receipt</p>
            </div>
          </div>

          <div style="
            background: #f9f9f9;
            border-radius: 6px;
            padding: 12px;
            margin-bottom: 20px;
            border: 1px solid #e0e0e0;
          ">
            <div style="
              color: #560067;
              font-size: 12px;
              font-weight: 700;
              margin: 0 0 8px 0;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            ">Ship From</div>
            <div style="
              font-size: 12px;
              color: #666;
              line-height: 1.4;
            ">
              <div>REHAS, Chanakya Nagar Road, Agam Kua</div>
              <div>Patna, Bihar, India - 800007</div>
            </div>
          </div>

          <div style="
            margin-bottom: 20px;
            text-align: center;
          ">
            <div style="
              display: inline-flex;
              align-items: center;
              gap: 6px;
              background: rgba(34, 197, 94, 0.1);
              color: #16a34a;
              padding: 6px 12px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: 600;
            ">
              <span>✓</span>
              <span>${method === 'cod' ? 'Order Confirmed' : 'Payment Successful'}</span>
            </div>
          </div>

          <div style="
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 20px;
          ">
            <div style="
              background: #f9f9f9;
              border-radius: 6px;
              padding: 12px;
              border: 1px solid #e0e0e0;
            ">
              <div style="
                color: #560067;
                font-size: 12px;
                font-weight: 700;
                margin: 0 0 8px 0;
                text-transform: uppercase;
                letter-spacing: 0.5px;
              ">Customer Details</div>
              <div style="
                font-weight: 600;
                color: #333;
                font-size: 14px;
                margin-bottom: 6px;
              ">${customerInfo?.full_name || 'N/A'}</div>
              <div style="
                font-size: 12px;
                color: #666;
                line-height: 1.4;
              ">
                <div>${customerInfo?.email || 'N/A'}</div>
                <div>${customerInfo?.phone_number || 'N/A'}</div>
              </div>
            </div>
            ${customerInfo?.order_type === 'product' ? `
            <div style="
              background: #f9f9f9;
              border-radius: 6px;
              padding: 12px;
              border: 1px solid #e0e0e0;
            ">
              <div style="
                color: #560067;
                font-size: 12px;
                font-weight: 700;
                margin: 0 0 8px 0;
                text-transform: uppercase;
                letter-spacing: 0.5px;
              ">Delivery Address</div>
              <div style="
                font-size: 12px;
                color: #666;
                line-height: 1.4;
              ">
                <div>${customerInfo?.address_line_1} ${customerInfo?.address_line_2}</div>
                <div>${customerInfo?.city}, ${customerInfo?.state} - ${customerInfo?.postal_code || customerInfo?.postalCode || 'N/A'}</div>
              </div>
            </div>
            ` : ''}
          </div>

          <div style="margin-bottom: 20px;">
            <div style="
              color: #560067;
              font-size: 13px;
              font-weight: 700;
              letter-spacing: 0.5px;
              border-bottom: 1px solid #e0e0e0;
              padding-bottom: 6px;
              margin: 0 0 10px 0;
              text-transform: uppercase;
            ">Order Summary</div>
            <div style="
              border: 1px solid #e0e0e0;
              border-radius: 6px;
              overflow: hidden;
            ">
              <div style="
                display: grid;
                grid-template-columns: minmax(120px, 1fr) 60px 80px 80px;
                gap: 12px;
                align-items: center;
                padding: 12px 16px;
                background: #f9f9f9;
                color: #560067;
                font-weight: 700;
                font-size: 11px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
              ">
                <span>Product</span>
                <span>Qty</span>
                <span>Unit Price</span>
                <span>Amount</span>
              </div>
              <div style="
                display: grid;
                grid-template-columns: minmax(120px, 1fr) 60px 80px 80px;
                gap: 12px;
                align-items: center;
                padding: 12px 16px;
                background: white;
                border-top: 1px solid #e0e0e0;
              ">
                <div style="flex: 1;">
                  <div style="
                    font-weight: 600;
                    color: #333;
                    font-size: 12px;
                  ">${productData?.productTitle || 'N/A'}</div>
                </div>
                <span style="font-size: 12px; color: #666;">1</span>
                <span style="font-size: 12px; color: #666;">₹${amount || '0.00'}</span>
                <span style="
                  font-weight: 700;
                  color: #560067;
                  font-size: 13px;
                ">₹${amount || '0.00'}</span>
              </div>
            </div>
            ${productData?.isPoojaSelected && productData?.poojaLabel ? `
            <div style="
              border: 1px solid #e0e0e0;
              border-radius: 6px;
              overflow: hidden;
              margin-top: 8px;
            ">
              <div style="
                display: grid;
                grid-template-columns: minmax(120px, 1fr) 60px 80px 80px;
                gap: 12px;
                align-items: center;
                padding: 12px 16px;
                background: white;
                border-top: 1px solid #e0e0e0;
              ">
                <div style="flex: 1;">
                  <div style="
                    font-weight: 600;
                    color: #333;
                    font-size: 12px;
                  ">${productData.poojaLabel}</div>
                </div>
                <span style="font-size: 12px; color: #666;">1</span>
                <span style="font-size: 12px; color: #666;">${productData.poojaPrice}</span>
                <span style="
                  font-weight: 700;
                  color: #560067;
                  font-size: 13px;
                ">${productData.poojaPrice}</span>
              </div>
            </div>
            ` : ''}
          </div>

           <div style="margin-bottom: 20px;">
            <div style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 16px;
              background: linear-gradient(135deg, #560067, #7b1fa2);
              color: white;
              border-radius: 6px;
              font-size: 16px;
              font-weight: 700;
            ">
              <span>Total Amount</span>
              <span>₹${parseFloat(amount || '0').toFixed(2)}</span>
            </div>
          </div>

          <div style="margin-bottom: 20px;">
            <div style="
              color: #560067;
              font-size: 13px;
              font-weight: 700;
              letter-spacing: 0.5px;
              border-bottom: 1px solid #e0e0e0;
              padding-bottom: 6px;
              margin: 0 0 10px 0;
              text-transform: uppercase;
            ">Payment Details</div>
            <div style="
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
              gap: 12px;
            ">
              <div style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 8px 12px;
                background: #f9f9f9;
                border-radius: 4px;
                border: 1px solid #e0e0e0;
              ">
                <span style="font-size: 11px; color: #666; font-weight: 500;">Payment Mode</span>
                <span style="font-size: 11px; color: #333; font-weight: 600;">${method === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</span>
              </div>
              <div style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 8px 12px;
                background: #f9f9f9;
                border-radius: 4px;
                border: 1px solid #e0e0e0;
              ">
                <span style="font-size: 11px; color: #666; font-weight: 500;">Payment ID</span>
                <span style="font-size: 11px; color: #333; font-weight: 600;">${transactionId || 'N/A'}</span>
              </div>
              <div style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 8px 12px;
                background: #f9f9f9;
                border-radius: 4px;
                border: 1px solid #e0e0e0;
              ">
                <span style="font-size: 11px; color: #666; font-weight: 500;">Payment Status</span>
                <span style="
                  padding: 3px 6px;
                  border-radius: 10px;
                  font-size: 10px;
                  font-weight: 600;
                  text-transform: uppercase;
                  ${method === 'cod' ? 'background: rgba(251, 191, 36, 0.1); color: #d97706;' : 'background: rgba(34, 197, 94, 0.1); color: #16a34a;'}
                ">${method === 'cod' ? 'Pending' : 'Completed'}</span>
              </div>
            </div>
          </div>

         

          <div style="
            text-align: center;
            margin-bottom: 20px;
            padding: 15px;
            background: rgba(86, 0, 103, 0.05);
            border-radius: 6px;
            border: 1px solid rgba(86, 0, 103, 0.1);
          ">
            <h3 style="
              color: #560067;
              font-size: 16px;
              margin: 0 0 6px 0;
              font-weight: 700;
            ">Thank you for choosing REHAS!</h3>
            <p style="
              color: #666;
              font-size: 12px;
              margin: 0;
              line-height: 1.4;
            ">Your order has been ${method === 'cod' ? 'confirmed' : 'successfully processed'}.
            ${method === 'cod' ? 'Payment will be collected upon delivery.' : 'We hope you enjoy your cosmic wellness journey.'}</p>
          </div>

          <div style="
            border-top: 1px solid #e0e0e0;
            padding-top: 15px;
            text-align: center;
          ">
            <div style="
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 12px;
              margin-bottom: 12px;
            ">
              <div style="display: flex; flex-direction: column; gap: 2px;">
                <span style="font-size: 10px; color: #666; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Need Help?</span>
                <span style="font-size: 12px; color: #333; font-weight: 600;">${rehasData.contact.phone}</span>
              </div>
              <div style="display: flex; flex-direction: column; gap: 2px;">
                <span style="font-size: 10px; color: #666; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Email</span>
                <span style="font-size: 12px; color: #333; font-weight: 600;">${rehasData.contact.email}</span>
              </div>
              <div style="display: flex; flex-direction: column; gap: 2px;">
                <span style="font-size: 10px; color: #666; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Website</span>
                <span style="font-size: 12px; color: #333; font-weight: 600;">www.rehas.in</span>
              </div>
            </div>
            <p style="
              font-size: 9px;
              color: #999;
              margin: 0;
              font-style: italic;
            ">This is an electronically generated receipt. No signature required.</p>
          </div>
        </div>
      </div>
    `;

    // Configure PDF options
    const options = {
      margin: 0.5,
      filename: `REHAS_Order_Receipt_${orderId || 'N/A'}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' as const }
    };

    // Generate and download PDF
    html2pdf().set(options).from(receiptElement).save();
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
