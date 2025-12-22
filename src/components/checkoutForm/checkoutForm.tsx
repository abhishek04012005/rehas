'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ShoppingCart, Check, ArrowBack } from '@mui/icons-material';
import { supabase } from '@/lib/supabase';
import PaymentForm from '../paymentForm/paymentForm';
import styles from './checkoutForm.module.css';

interface CheckoutFormProps {
  productTitle: string;
  amount?: number;
}

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];

export default function CheckoutForm({ productTitle, amount = 999 }: CheckoutFormProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cod' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let { name, value } = e.target;
    
    // Phone validation: only digits, max 10
    if (name === 'phone') {
      value = value.replace(/\D/g, '').slice(0, 10);
    }
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validatePhone = (phone: string) => {
    if (!phone) return 'Phone number is required';
    if (phone.length !== 10) return 'Phone number must be exactly 10 digits';
    if (!/^[6-9]/.test(phone)) return 'Phone number must start with 6, 7, 8, or 9';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate phone number
    const phoneError = validatePhone(formData.phone);
    if (phoneError) {
      setError(phoneError);
      setLoading(false);
      return;
    }

    try {
      console.log('Submitting checkout form with data:', formData);
      
      // Insert order into Supabase
      const { data, error: insertError } = await supabase
        .from('orders')
        .insert([
          {
            product_title: productTitle,
            amount: amount,
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            address_line_1: formData.addressLine1,
            address_line_2: formData.addressLine2,
            city: formData.city,
            state: formData.state,
            postal_code: formData.postalCode,
            country: formData.country,
            status: 'pending',
          },
        ])
        .select();

      console.log('Supabase insert response:', { data, insertError });

      if (insertError) {
        throw insertError;
      }

      // Get the created order ID
      if (data && data.length > 0) {
        console.log('Order created successfully:', data[0]);
        setCreatedOrderId(data[0].id);
        setShowPayment(true);
        setSubmitted(true);
      } else {
        throw new Error('No data returned from insert');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving your order. Please try again.');
      console.error('Checkout error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = (method: 'razorpay' | 'cod') => {
    setPaymentMethod(method);
    setShowPayment(false);
  };

  if (submitted && !showPayment) {
    const isCOD = paymentMethod === 'cod';
    return (
      <div className={styles.successContainer}>
        <div className={styles.successContent}>
          <div className={styles.successIcon}>
            <Check sx={{ fontSize: 60 }} />
          </div>
          {isCOD ? (
            <>
              <h2>Order Confirmed!</h2>
              <p>Your order has been placed successfully. When the item reaches you, please pay the amount to the delivery person.</p>
              <div className={styles.codMessage}>
                <strong>Order Number:</strong> #{createdOrderId}
                <br />
                <strong>Payment Amount:</strong> ₹{amount.toFixed(2)}
                <br />
                <strong>Payment Method:</strong> Cash on Delivery
              </div>
            </>
          ) : (
            <>
              <h2>Payment Successful!</h2>
              <p>Thank you for your order. Your payment has been processed successfully.</p>
              <div className={styles.orderNumberBox}>
                <strong>Order Number:</strong> #{createdOrderId}
              </div>
            </>
          )}
          <div className={styles.orderDetails}>
            <p>
              <strong>Product:</strong> {productTitle}
            </p>
            <p>
              <strong>Name:</strong> {formData.fullName}
            </p>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <p>
              <strong>Order Status:</strong> {isCOD ? 'Awaiting Delivery' : 'Confirmed'}
            </p>
          </div>
          <div className={styles.successActions}>
            <Link href="/products" className={styles.continueBtn}>
              Continue Shopping
            </Link>
            <Link href="/" className={styles.homeBtn}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (submitted && showPayment && createdOrderId) {
    return (
      <div className={styles.paymentWrapper}>
        <PaymentForm
          orderId={createdOrderId}
          amount={amount}
          customerEmail={formData.email}
          customerPhone={formData.phone}
          customerName={formData.fullName}
          productTitle={productTitle}
          onPaymentSuccess={(method) => handlePaymentSuccess(method)}
        />
      </div>
    );
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <Link href="/" className={styles.backLink}>
          <ArrowBack sx={{ fontSize: 20 }} />
          Back
        </Link>
        <h2>Shipping Address Details</h2>
        <p className={styles.productInfo}>Product: {productTitle}</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <div className={styles.errorMessage}>{error}</div>}

        <div className={styles.formSection}>
          <h3>Personal Information</h3>

          <div className={styles.formGroup}>
            <label htmlFor="fullName">Full Name *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit number (6-9 start)"
                maxLength={10}
                required
              />
              <small className={styles.fieldHint}>Must be 10 digits starting with 6, 7, 8, or 9</small>
            </div>
          </div>
        </div>

        <div className={styles.formSection}>
          <h3>Shipping Address</h3>

          <div className={styles.formGroup}>
            <label htmlFor="addressLine1">Address Line 1 *</label>
            <input
              type="text"
              id="addressLine1"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
              placeholder="Street address, PO box, company name, etc."
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="addressLine2">Address Line 2</label>
            <input
              type="text"
              id="addressLine2"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
              placeholder="Apartment, suite, unit, building, floor, etc."
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="city">City *</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="state">State *</label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              >
                <option value="">Select your state</option>
                {INDIAN_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="postalCode">Postal Code *</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="ZIP or postal code"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="country">Country *</label>
              <input
                type="text"
                id="country"
                name="country"
                value="India"
                disabled
                className={styles.disabledInput}
              />
            </div>
          </div>
        </div>

        <div className={styles.formActions}>
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? (
              <>
                <ShoppingCart sx={{ fontSize: 18 }} />
                Processing...
              </>
            ) : (
              <>
                <ShoppingCart sx={{ fontSize: 18 }} />
                Complete Order
              </>
            )}
          </button>

          <Link href="/products" className={styles.cancelBtn}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
