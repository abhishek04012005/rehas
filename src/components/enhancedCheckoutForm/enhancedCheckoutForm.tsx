'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowBack, FavoriteBorder, PhoneInTalk, Mail } from '@mui/icons-material';
import { useCheckout } from '@/context/CheckoutContext';
import PaymentForm from '../paymentForm/paymentForm';
import styles from './enhancedCheckoutForm.module.css';

interface EnhancedCheckoutFormProps {
  productTitle: string;
  amount?: number;
  isProduct?: boolean;
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

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  age: number | null;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function EnhancedCheckoutForm({ productTitle, amount = 999, isProduct = false }: EnhancedCheckoutFormProps) {
  const { productData } = useCheckout();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cod' | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    birthDate: '',
    age: null,
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
  });

  // Calculate age when birth date changes
  useEffect(() => {
    if (formData.birthDate) {
      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      setFormData((prev) => ({
        ...prev,
        age: age >= 0 ? age : null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        age: null,
      }));
    }
  }, [formData.birthDate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let { name, value } = e.target;

    // Phone validation: only digits, max 10
    if (name === 'phoneNumber') {
      value = value.replace(/\D/g, '').slice(0, 10);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (formData.phoneNumber.length !== 10) {
      newErrors.phoneNumber = 'Phone number must be exactly 10 digits';
    } else if (!/^[6-9]/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must start with 6, 7, 8, or 9';
    }

    if (!formData.birthDate) {
      newErrors.birthDate = 'Birth date is required';
    } else {
      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      if (birthDate > today) {
        newErrors.birthDate = 'Birth date cannot be in the future';
      }
    }

    // Address validation only if it's a product
    if (isProduct) {
      if (!formData.addressLine1.trim()) {
        newErrors.addressLine1 = 'Address line 1 is required';
      }

      if (!formData.city.trim()) {
        newErrors.city = 'City is required';
      }

      if (!formData.state) {
        newErrors.state = 'State is required';
      }

      if (!formData.postalCode.trim()) {
        newErrors.postalCode = 'Postal code is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Save order to database
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          birthDate: formData.birthDate,
          age: formData.age,
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
          productTitle: productData?.productTitle || productTitle,
          amount: productData?.amount || amount,
          orderType: productData?.type || 'service',
          serviceId: productData?.serviceId,
          serviceTitle: productData?.productTitle || productTitle,
          serviceDescription: productData?.description,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMsg = errorData.error || 'Failed to create order';
        
        // Check if it's a database setup error
        if (response.status === 503 || errorMsg.includes('Database not initialized')) {
          throw new Error(
            'Database not initialized. Contact admin to execute database migration. See DATABASE_SETUP_INSTRUCTIONS.md'
          );
        }
        
        throw new Error(errorMsg);
      }

      const data = await response.json();
      setCreatedOrderId(data.orderId);
      setSubmitted(true);
      setSuccessMessage('Order created successfully! Proceeding to payment...');

      // Proceed to payment selection
      setTimeout(() => {
        setShowPayment(true);
      }, 1500);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to create order';
      setErrors({ submit: errorMsg });
      setLoading(false);
    }
  };

  if (showPayment && createdOrderId) {
    const handlePaymentSuccess = (method: 'razorpay' | 'cod') => {
      console.log('Payment successful with method:', method);
      // Payment success handling is done in PaymentForm
    };

    return (
      <PaymentForm
        orderId={createdOrderId}
        productTitle={productData?.productTitle || productTitle}
        amount={productData?.amount || amount}
        customerEmail={formData.email}
        customerName={formData.fullName}
        customerPhone={formData.phoneNumber}
        onPaymentSuccess={handlePaymentSuccess}
      />
    );
  }

  return (
    <div className={styles.formContainer}>
      <Link href="/" className={styles.backLink}>
        <ArrowBack fontSize="small" />
        Back to Home
      </Link>

      <div className={styles.formHeader}>
        <h2>Checkout</h2>
        <div className={styles.orderSummary}>
          <div className={styles.summaryItem}>
            <span className={styles.label}>Service/Product:</span>
            <span className={styles.value}>{productData?.productTitle || productTitle}</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.label}>Amount:</span>
            <span className={styles.value}>₹{amount}</span>
          </div>
        </div>
      </div>

      {successMessage && (
        <div className={styles.successAlert}>
          ✓ {successMessage}
        </div>
      )}

      {errors.submit && (
        <div className={styles.errorAlert}>
          ✕ {errors.submit}
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Personal Information Section */}
        <div className={styles.formSection}>
          <h3>
            <FavoriteBorder fontSize="small" />
            Personal Information
          </h3>

          <div className={styles.formGroup}>
            <label htmlFor="fullName">Full Name *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={errors.fullName ? styles.inputError : ''}
            />
            {errors.fullName && <span className={styles.errorText}>{errors.fullName}</span>}
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup} style={{ flex: 1 }}>
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className={errors.email ? styles.inputError : ''}
              />
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>

            <div className={styles.formGroup} style={{ flex: 1 }}>
              <label htmlFor="phoneNumber">Phone Number *</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="10-digit number"
                maxLength={10}
                className={errors.phoneNumber ? styles.inputError : ''}
              />
              {errors.phoneNumber && <span className={styles.errorText}>{errors.phoneNumber}</span>}
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup} style={{ flex: 1 }}>
              <label htmlFor="birthDate">
                Date of Birth *
              </label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className={errors.birthDate ? styles.inputError : ''}
              />
              {errors.birthDate && <span className={styles.errorText}>{errors.birthDate}</span>}
            </div>

            <div className={styles.formGroup} style={{ flex: 1 }}>
              <label htmlFor="age">Age</label>
              <input
                type="text"
                id="age"
                name="age"
                value={formData.age !== null ? `${formData.age} years` : ''}
                readOnly
                placeholder="Auto-calculated"
                className={styles.inputReadonly}
              />
            </div>
          </div>
        </div>

        {/* Shipping Address Section - Only for products */}
        {isProduct && (
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
              placeholder="House number, street address"
              className={errors.addressLine1 ? styles.inputError : ''}
            />
            {errors.addressLine1 && <span className={styles.errorText}>{errors.addressLine1}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="addressLine2">Address Line 2</label>
            <input
              type="text"
              id="addressLine2"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
              placeholder="Apartment, floor, building name (optional)"
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup} style={{ flex: 1 }}>
              <label htmlFor="city">City *</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className={errors.city ? styles.inputError : ''}
              />
              {errors.city && <span className={styles.errorText}>{errors.city}</span>}
            </div>

            <div className={styles.formGroup} style={{ flex: 1 }}>
              <label htmlFor="state">State *</label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={errors.state ? styles.inputError : ''}
              >
                <option value="">Select State</option>
                {INDIAN_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.state && <span className={styles.errorText}>{errors.state}</span>}
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup} style={{ flex: 1 }}>
              <label htmlFor="postalCode">Postal Code *</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="6-digit postal code"
                className={errors.postalCode ? styles.inputError : ''}
              />
              {errors.postalCode && <span className={styles.errorText}>{errors.postalCode}</span>}
            </div>

            <div className={styles.formGroup} style={{ flex: 1 }}>
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                readOnly
                className={styles.inputReadonly}
              />
            </div>
          </div>
        </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className={styles.submitBtn}
          disabled={loading || submitted}
        >
          {loading ? 'Processing...' : submitted ? 'Order Created!' : 'Continue to Payment'}
          {!loading && !submitted && <ChevronRight fontSize="small" />}
        </button>
      </form>
    </div>
  );
}
