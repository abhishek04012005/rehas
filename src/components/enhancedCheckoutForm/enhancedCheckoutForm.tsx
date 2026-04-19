'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowBack, FavoriteBorder, PhoneInTalk, Mail, CheckCircle, Clear, RadioButtonUnchecked, RadioButtonChecked } from '@mui/icons-material';
import { useCheckout, CartItem } from '@/context/CheckoutContext';
import { useAuth, UserAddress } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import PaymentForm from '../paymentForm/paymentForm';
import styles from './enhancedCheckoutForm.module.css';

interface OrderData {
  id: number;
  productTitle: string;
  amount: number;
  items?: any[];
  orderType?: string;
  description?: string;
  isPoojaSelected?: boolean;
  poojaLabel?: string;
  poojaPrice?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
}

interface EnhancedCheckoutFormProps {
  productTitle: string;
  amount?: number;
  isProduct?: boolean;
  orderData?: OrderData;
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

export default function EnhancedCheckoutForm({ productTitle, amount = 999, isProduct = false, orderData }: EnhancedCheckoutFormProps) {
  const { productData, cartItems, clearCart } = useCheckout();
  const { user, getUserAddresses, addUserAddress } = useAuth();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cod' | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [savedOrderItems, setSavedOrderItems] = useState<CartItem[] | null>(null);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState<UserAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [addressMode, setAddressMode] = useState<'saved' | 'new'>('new');
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [shouldSaveAddress, setShouldSaveAddress] = useState(false);
  const [addressType, setAddressType] = useState<'home' | 'work' | 'other'>('home');
  const [savingAddress, setSavingAddress] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    fullName: orderData?.fullName || '',
    email: orderData?.email || '',
    phoneNumber: orderData?.phoneNumber || '',
    addressLine1: orderData?.addressLine1 || '',
    addressLine2: orderData?.addressLine2 || '',
    city: orderData?.city || '',
    state: orderData?.state || '',
    postalCode: orderData?.postalCode || '',
    country: orderData?.country || 'India',
  });

  useEffect(() => {
    if (orderData) {
      setFormData({
        fullName: orderData.fullName || '',
        email: orderData.email || '',
        phoneNumber: orderData.phoneNumber || '',
        addressLine1: orderData.addressLine1 || '',
        addressLine2: orderData.addressLine2 || '',
        city: orderData.city || '',
        state: orderData.state || '',
        postalCode: orderData.postalCode || '',
        country: orderData.country || 'India',
      });
    }
  }, [orderData]);

  // Load saved addresses when user is available
  useEffect(() => {
    const loadSavedAddresses = async () => {
      if (user) {
        const result = await getUserAddresses();
        const addresses = result.data ?? [];
        if (addresses.length > 0) {
          setSavedAddresses(addresses);
          setAddressMode('saved');
          setShowNewAddressForm(false);
          // Auto-select the default address if available
          const defaultAddress = addresses.find(addr => addr.is_default);
          if (defaultAddress) {
            setSelectedAddressId(defaultAddress.id);
            // Populate form with default address
            setFormData(prev => ({
              ...prev,
              fullName: defaultAddress.full_name,
              phoneNumber: defaultAddress.phone_number || '',
              addressLine1: defaultAddress.address_line_1,
              addressLine2: defaultAddress.address_line_2 || '',
              city: defaultAddress.city,
              state: defaultAddress.state,
              postalCode: defaultAddress.postal_code,
              country: defaultAddress.country,
            }));
          }
        } else {
          setSavedAddresses([]);
          setAddressMode('new');
          setShowNewAddressForm(true);
        }
      }
    };

    loadSavedAddresses();
  }, [user, getUserAddresses])

  const orderItems = orderData?.items && orderData.items.length > 0
    ? orderData.items.map((item) => ({
      id: item.id || `order-${item.productTitle}-${Math.random()}`,
      productTitle: item.productTitle,
      amount: typeof item.amount === 'string' ? parseFloat(String(item.amount).replace(/[₹,]/g, '')) || 0 : item.amount || 0,
      quantity: item.quantity || 1,
      type: item.type || 'product',
      serviceId: item.serviceId,
      description: item.description,
      isPoojaSelected: item.isPoojaSelected,
      poojaLabel: item.poojaLabel,
      poojaPrice: item.poojaPrice,
    }))
    : productData && productData.productTitle
      ? [{
        id: 'buy-now-order',
        productTitle: productData.productTitle,
        amount: productData.amount,
        quantity: 1,
        type: productData.type || 'product',
        serviceId: productData.serviceId,
        description: productData.description,
        isPoojaSelected: productData.isPoojaSelected,
        poojaLabel: productData.poojaLabel,
        poojaPrice: productData.poojaPrice,
      }]
      : cartItems.length > 0
        ? cartItems
        : [{
          id: 'single-order',
          productTitle: productTitle,
          amount: amount,
          quantity: 1,
          type: isProduct ? 'product' : 'service',
          serviceId: undefined,
          description: undefined,
          isPoojaSelected: undefined,
          poojaLabel: undefined,
          poojaPrice: undefined,
        }];

  const activeOrderItems = savedOrderItems ?? orderItems;
  const totalAmount = activeOrderItems.reduce((sum, item) => {
    const itemAmount = Number(item.amount) || 0;
    const quantity = Number(item.quantity) || 1;
    return sum + itemAmount * quantity;
  }, 0);

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

  const handleAddressSelect = (address: UserAddress) => {
    setSelectedAddressId(address.id);
    setFormData({
      fullName: address.full_name,
      email: formData.email, // Keep existing email
      phoneNumber: address.phone_number || '',
      addressLine1: address.address_line_1,
      addressLine2: address.address_line_2 || '',
      city: address.city,
      state: address.state,
      postalCode: address.postal_code,
      country: address.country,
    });
    setAddressMode('saved');
    setShowNewAddressForm(false);
  };

  const handleAddressModeChange = (mode: 'saved' | 'new') => {
    setAddressMode(mode);
    if (mode === 'new') {
      setSelectedAddressId(null);
      setShowNewAddressForm(true);
      setFormData(prev => ({
        ...prev,
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'India',
      }));
    } else {
      setShowNewAddressForm(false);
    }
  };

  const saveAddressToProfile = async (): Promise<boolean> => {
    if (!user || !shouldSaveAddress) return true;
    
    try {
      setSavingAddress(true);
      const { error } = await addUserAddress({
        address_type: addressType,
        full_name: formData.fullName,
        phone_number: formData.phoneNumber,
        address_line_1: formData.addressLine1,
        address_line_2: formData.addressLine2,
        city: formData.city,
        state: formData.state,
        postal_code: formData.postalCode,
        country: formData.country,
        is_default: savedAddresses.length === 0, // Set as default if first address
        is_active: true,
      });
      
      if (error) {
        console.error('Error saving address:', error);
        setErrors(prev => ({ ...prev, submit: `Failed to save address: ${error}` }));
        return false;
      }
      
      // Reload saved addresses
      const result = await getUserAddresses();
      if (result.data) {
        setSavedAddresses(result.data);
      }
      
      return true;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to save address';
      console.error('Error saving address:', errorMsg);
      return false;
    } finally {
      setSavingAddress(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (formData.phoneNumber.length !== 10) {
      newErrors.phoneNumber = 'Phone number must be exactly 10 digits';
    } else if (!/^[6-9]/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must start with 6, 7, 8, or 9';
    }

    // if (!formData.birthDate) {
    //   newErrors.birthDate = 'Birth date is required';
    // } else {
    //   const birthDate = new Date(formData.birthDate);
    //   const today = new Date();
    //   if (birthDate > today) {
    //     newErrors.birthDate = 'Birth date cannot be in the future';
    //   }
    // }

    // Address validation - always required
    if (addressMode === 'new') {
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
    } else if (addressMode === 'saved') {
      if (!selectedAddressId) {
        newErrors.addressSelection = 'Please select a saved address';
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
      let createdId: number | null = null;

      if (orderData?.id) {
        const { error } = await supabase
          .from('orders')
          .update({
            full_name: formData.fullName,
            email: formData.email,
            phone_number: formData.phoneNumber,
            address_line_1: formData.addressLine1,
            address_line_2: formData.addressLine2,
            city: formData.city,
            state: formData.state,
            postal_code: formData.postalCode,
            country: formData.country,
            amount: totalAmount,
            order_type: orderItems[0]?.type || 'service',
            service_id: orderItems[0]?.serviceId,
            product_title: orderItems.map((item) => `${item.productTitle}${item.quantity > 1 ? ` x${item.quantity}` : ''}`).join(' | '),
            service_title: orderItems[0]?.productTitle || productTitle,
            service_description: orderItems.map((item) => {
              const pooja = item.isPoojaSelected ? ` (${item.poojaLabel || 'Pooja'})` : '';
              return `${item.productTitle}${pooja} · Qty ${item.quantity}`;
            }).join(' | '),
            items: orderItems,
            order_total: totalAmount,
            updated_at: new Date().toISOString(),
          })
          .eq('id', orderData.id);

        if (error) {
          throw error;
        }

        createdId = orderData.id;
      } else {
        const response = await fetch('/api/orders/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            addressLine1: formData.addressLine1,
            addressLine2: formData.addressLine2,
            city: formData.city,
            state: formData.state,
            postalCode: formData.postalCode,
            country: formData.country,
            amount: totalAmount,
            orderType: orderItems[0]?.type || 'service',
            serviceId: orderItems[0]?.serviceId,
            productTitle: orderItems.map((item) => `${item.productTitle}${item.quantity > 1 ? ` x${item.quantity}` : ''}`).join(' | '),
            serviceTitle: orderItems[0]?.productTitle || productTitle,
            serviceDescription: orderItems.map((item) => {
              const pooja = item.isPoojaSelected ? ` (${item.poojaLabel || 'Pooja'})` : '';
              return `${item.productTitle}${pooja} · Qty ${item.quantity}`;
            }).join(' | '),
            items: orderItems,
            orderTotal: totalAmount,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          const errorMsg = errorData.error || 'Failed to create order';

          if (response.status === 503 || errorMsg.includes('Database not initialized')) {
            throw new Error(
              'Database not initialized. Contact admin to execute database migration. See DATABASE_SETUP_INSTRUCTIONS.md'
            );
          }

          throw new Error(errorMsg);
        }

        const data = await response.json();
        createdId = data.orderId;
      }

      setCreatedOrderId(createdId);
      setSubmitted(true);
      setSuccessMessage(`Order ${orderData?.id ? 'updated' : 'created'} successfully! Order ID: ${createdId}`);
      setSavedOrderItems(orderItems);

      // Save address to profile if requested
      if (user && shouldSaveAddress && addressMode === 'new') {
        const addressSaved = await saveAddressToProfile();
        if (!addressSaved) {
          setLoading(false);
          return;
        }
      }

      setTimeout(() => {
        setShowPayment(true);
      }, 3000);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to save order';
      setErrors({ submit: errorMsg });
      setLoading(false);
    }
  };

  if (submitted && createdOrderId && !showPayment) {
    return (
      <div className={styles.formContainer}>
        <div className={styles.orderConfirmationContainer}>
          <div className={styles.confirmationHeader}>
            <CheckCircle sx={{ fontSize: 60 }} className={styles.successIcon} />
            <h2>Order Created Successfully!</h2>
            <p>Your order has been created and is ready for payment</p>
          </div>

          <div className={styles.orderDetailsBox}>
            <div className={styles.orderNumberSection}>
              <span className={styles.orderNumberLabel}>ORDER ID</span>
              <span className={styles.orderNumber}>#{createdOrderId}</span>
            </div>

            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Customer Name</span>
                <span className={styles.detailValue}>{formData.fullName}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Email</span>
                <span className={styles.detailValue}>{formData.email}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Phone</span>
                <span className={styles.detailValue}>+91 {formData.phoneNumber}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Product/Service</span>
                <span className={styles.detailValue}>{activeOrderItems.length > 1 ? 'Multiple items in cart' : activeOrderItems[0]?.productTitle || productTitle}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Amount</span>
                <span className={styles.amountValue}>₹{isNaN(totalAmount) ? '0.00' : totalAmount.toFixed(2)}</span>
              </div>
            </div>

            {activeOrderItems.length > 1 && (
              <div className={styles.orderItemsSummary}>
                <span className={styles.detailLabel}>Order Items</span>
                <span className={styles.detailValue}>{activeOrderItems.map((item) => `${item.productTitle}${item.quantity > 1 ? ` x${item.quantity}` : ''}`).join(' | ')}</span>
              </div>
            )}

            {isProduct && formData.addressLine1 && (
              <div className={styles.addressSection}>
                <h3 className={styles.addressTitle}>Delivery Address</h3>
                <div className={styles.addressBox}>
                  <p className={styles.addressLine}>
                    {formData.addressLine1}
                    {formData.addressLine2 && <>, {formData.addressLine2}</>}
                  </p>
                  <p className={styles.addressLine}>
                    {formData.city}, {formData.state} - {formData.postalCode}
                  </p>
                  <p className={styles.addressLine}>
                    {formData.country}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className={styles.proceedingMessage}>
            <p>Redirecting to payment in a moment...</p>
          </div>
        </div>
      </div>
    );
  }

  if (showPayment && createdOrderId) {
    const handlePaymentSuccess = async (method: 'razorpay' | 'cod') => {
      console.log('Payment successful with method:', method);
      await clearCart();
      setSavedOrderItems(null);
    };

    return (
      <PaymentForm
        orderId={createdOrderId}
        productTitle={activeOrderItems.length > 1 ? 'Cart Items' : activeOrderItems[0]?.productTitle || productTitle}
        amount={totalAmount}
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
            <span className={styles.value}>{orderItems.length > 1 ? 'Multiple items in cart' : orderItems[0]?.productTitle}</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.label}>Amount:</span>
            <span className={styles.value}>₹{isNaN(totalAmount) ? '0.00' : totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {!productData && cartItems.length > 0 && (
        <div className={styles.cartReview}>
          <h3>Cart items</h3>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.productTitle}{item.quantity > 1 ? ` × ${item.quantity}` : ''} - ₹{(item.amount * item.quantity).toFixed(2)}
                {item.isPoojaSelected && item.poojaLabel ? ` (${item.poojaLabel})` : ''}
              </li>
            ))}
          </ul>
        </div>
      )}

      {successMessage && (
        <div className={styles.successAlert}>
          <CheckCircle sx={{ fontSize: 20, marginRight: '8px', verticalAlign: 'middle' }} />
          {successMessage}
        </div>
      )}

      {errors.submit && (
        <div className={styles.errorAlert}>
          <Clear sx={{ fontSize: 20, marginRight: '8px', verticalAlign: 'middle' }} />
          {errors.submit}
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Show Personal Info section only when NOT using saved address mode */}

        {savedAddresses.length > 0 && (
          <h4 className={styles.selectAddressHeading}>Choose how to provide shipping details</h4>
        )}
        {savedAddresses.length > 0 && (
          <div className={styles.addressModeToggle}>
            <button
              type="button"
              className={`${styles.modeButton} ${addressMode === 'saved' ? styles.activeModeButton : ''}`}
              onClick={() => handleAddressModeChange('saved')}
            >
              Select saved address
            </button>
            <button
              type="button"
              className={`${styles.modeButton} ${addressMode === 'new' ? styles.activeModeButton : ''}`}
              onClick={() => handleAddressModeChange('new')}
            >
              Fill all details
            </button>
          </div>
        )}
        {!(isProduct && savedAddresses.length > 0 && addressMode === 'saved') && (
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
                <label htmlFor="email">Email Address</label>
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

          </div>
        )}

        {/* Shipping Address Section - Always show */}
        <div className={styles.formSection}>
          <h3>Shipping Address</h3>

          {savedAddresses.length > 0 && (
            <div className={styles.addressSelection}>


              {addressMode === 'saved' && (
                <div className={styles.addressList}>
                  {savedAddresses.map((address) => (
                    <div
                      key={address.id}
                      className={`${styles.addressOption} ${selectedAddressId === address.id ? styles.selected : ''}`}
                      onClick={() => handleAddressSelect(address)}
                    >
                      <div className={styles.addressRadio}>
                        {selectedAddressId === address.id ? (
                          <RadioButtonChecked sx={{ fontSize: 20, color: 'var(--primary)' }} />
                        ) : (
                          <RadioButtonUnchecked sx={{ fontSize: 20, color: '#ccc' }} />
                        )}
                      </div>
                      <div className={styles.addressDetails}>
                        <div className={styles.addressHeader}>
                          <span className={styles.addressType}>{address.address_type}</span>
                          {address.is_default && <span className={styles.defaultBadge}>Default</span>}
                        </div>
                        <div className={styles.addressContent}>
                          <p className={styles.addressName}>{address.full_name}</p>
                          {address.phone_number && <p className={styles.addressPhone}>{address.phone_number}</p>}
                          <p className={styles.addressLine}>{address.address_line_1}</p>
                          {address.address_line_2 && <p className={styles.addressLine}>{address.address_line_2}</p>}
                          <p className={styles.addressCity}>
                            {address.city}, {address.state} {address.postal_code}
                          </p>
                          <p className={styles.addressCountry}>{address.country}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {addressMode === 'saved' && errors.addressSelection && (
                <span className={styles.errorText}>{errors.addressSelection}</span>
              )}
            </div>
          )}

          {/* Address Form - Show when in 'new' mode OR when no saved addresses exist */}
          {(addressMode === 'new' || savedAddresses.length === 0) && (
            <div className={styles.newAddressForm}>
              <div className={styles.formGroup}>
                <label htmlFor="addressType">Address Type *</label>
                <select
                  id="addressType"
                  value={addressType}
                  onChange={(e) => setAddressType(e.target.value as 'home' | 'work' | 'other')}
                >
                  <option value="home">Home</option>
                  <option value="work">Work</option>
                  <option value="other">Other</option>
                </select>
              </div>

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
        </div>

        {/* Save Address Option - Show when user is logged in and entering a new address */}
        {user && (addressMode === 'new' || savedAddresses.length === 0) && (
          <div className={styles.saveAddressSection}>
            <label className={styles.saveAddressLabel}>
              <input
                type="checkbox"
                checked={shouldSaveAddress}
                onChange={(e) => setShouldSaveAddress(e.target.checked)}
                className={styles.saveAddressCheckbox}
              />
              <span className={styles.saveAddressText}>
                Save this address for future purchases
              </span>
            </label>
          </div>
        )}

        {/* Terms and Conditions */}
        <div className={styles.termsSection}>
          <label className={styles.termsLabel}>
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className={styles.termsCheckbox}
              required
            />
            <span className={styles.termsText}>
              I agree to the <Link href="/terms-of-service" target="_blank" className={styles.termsLink}>Terms of Service</Link> and
              acknowledge that this purchase is non-refundable after completion.
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={styles.submitBtn}
          disabled={loading || submitted || !acceptTerms || savingAddress}
        >
          {loading || savingAddress ? 'Processing...' : submitted ? 'Order Created!' : 'Continue to Payment'}
          {!loading && !submitted && !savingAddress && <ChevronRight fontSize="small" />}
        </button>
      </form>
    </div>
  );
}
