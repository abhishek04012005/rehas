'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import EnhancedCheckoutForm from '@/components/enhancedCheckoutForm/enhancedCheckoutForm';
import { useCheckout } from '@/context/CheckoutContext';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

interface OrderCheckoutData {
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
  paymentStatus?: string;
  paymentMethod?: string;
  transactionId?: string;
}

export default function CheckoutPageClient() {
  const { productData, cartItems, loading: cartLoading } = useCheckout();
  const { user, loading: authLoading } = useAuth();
  const [orderIdParam, setOrderIdParam] = useState<string | null>(null);

  const [existingOrder, setExistingOrder] = useState<OrderCheckoutData | null>(null);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const query = new URLSearchParams(window.location.search);
      setOrderIdParam(query.get('orderId'));
    }
  }, []);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderIdParam) {
        setExistingOrder(null);
        setOrderError('');
        return;
      }

      setOrderLoading(true);
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderIdParam)
          .single();

        if (error) {
          console.error('Failed to load order for checkout:', error);
          setOrderError(error.message);
          setExistingOrder(null);
        } else if (data) {
          setExistingOrder({
            id: data.id,
            productTitle: data.product_title,
            amount: parseFloat(String(data.amount).replace(/[₹,]/g, '')) || 0,
            items: data.items,
            orderType: data.order_type || data.orderType,
            description: data.service_description || data.product_title,
            isPoojaSelected: data.is_pooja_selected,
            poojaLabel: data.pooja_label,
            poojaPrice: data.pooja_price,
            addressLine1: data.address_line_1,
            addressLine2: data.address_line_2,
            city: data.city,
            state: data.state,
            postalCode: data.postal_code,
            country: data.country,
            paymentStatus: data.payment_status,
            paymentMethod: data.payment_method,
            transactionId: data.razorpay_payment_id || data.transaction_id,
          });
        }
      } catch (error) {
        console.error('Error fetching existing order:', error);
        setOrderError('Unable to load order details.');
      } finally {
        setOrderLoading(false);
      }
    };

    fetchOrder();
  }, [orderIdParam]);

  // Calculate cart total using current cart state
  const cartTotal = cartItems.reduce((sum, item) => {
    const itemAmount = Number(item.amount) || 0;
    const quantity = Number(item.quantity) || 1;
    return sum + itemAmount * quantity;
  }, 0);

  // Check localStorage for cart if cart items have not been loaded yet
  let localCartTotal = 0;
  if (typeof window !== 'undefined' && cartItems.length === 0) {
    try {
      const savedCart = localStorage.getItem('localCartItems');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        localCartTotal = parsedCart.reduce((sum: number, item: any) => {
          const itemAmount = Number(item.amount) || 0;
          const quantity = Number(item.quantity) || 1;
          return sum + itemAmount * quantity;
        }, 0);
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
  }

  const totalAmount = cartItems.length > 0 ? cartTotal : localCartTotal;
  const hasCart = cartItems.length > 0 || localCartTotal > 0;
  const hasProductData = productData && productData.productTitle;
  const productTitle = existingOrder ? existingOrder.productTitle : hasProductData ? productData.productTitle : hasCart ? 'Cart Items' : 'Service/Product';
  const amount = existingOrder ? existingOrder.amount : hasProductData ? (productData.amount || 0) : hasCart ? totalAmount : 999;
  const isProduct = existingOrder ? existingOrder.orderType === 'product' : hasProductData ? (productData.type === 'product') : hasCart ? true : false;

  if (authLoading || orderLoading || cartLoading) {
    return <div style={{ padding: '60px 24px' }}>Checking your session and order details...</div>;
  }

  if (orderError) {
    return (
      <div style={{ padding: '60px 24px', textAlign: 'center' }}>
        <h1 style={{ color: 'var(--primary)', marginBottom: '16px' }}>Unable to load order</h1>
        <p style={{ color: 'var(--text-light)', marginBottom: '24px' }}>{orderError}</p>
        <Link href="/account/orders" style={{
          display: 'inline-block',
          padding: '14px 24px',
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
          color: 'white',
          borderRadius: '12px',
          fontWeight: 700,
          textDecoration: 'none',
        }}>
          Back to Orders
        </Link>
      </div>
    );
  }

  if (existingOrder && existingOrder.paymentStatus?.toLowerCase() === 'paid') {
    return (
      <div style={{ padding: '60px 24px', textAlign: 'center' }}>
        <h1 style={{ color: 'var(--primary)', marginBottom: '16px' }}>This order is already paid</h1>
        <p style={{ color: 'var(--text-light)', marginBottom: '24px' }}>
          You can download the receipt from your orders page.
        </p>
        <Link href={`/payment/success?orderId=${existingOrder.id}&transactionId=${encodeURIComponent(existingOrder.transactionId || '')}&amount=${encodeURIComponent(existingOrder.amount)}&method=${encodeURIComponent(existingOrder.paymentMethod || 'razorpay')}`} style={{
          display: 'inline-block',
          padding: '14px 24px',
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
          color: 'white',
          borderRadius: '12px',
          fontWeight: 700,
          textDecoration: 'none',
        }}>
          View Receipt
        </Link>
      </div>
    );
  }

  return (
    <EnhancedCheckoutForm 
      productTitle={productTitle} 
      amount={amount}
      isProduct={isProduct}
      orderData={existingOrder ?? undefined}
    />
  );
}
