'use client';

import EnhancedCheckoutForm from '@/components/enhancedCheckoutForm/enhancedCheckoutForm';
import { useCheckout } from '@/context/CheckoutContext';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function CheckoutPageClient() {
  const { productData, cartItems } = useCheckout();
  const { user, loading } = useAuth();

  // Calculate cart total
  const cartTotal = cartItems.reduce((sum, item) => sum + item.amount * item.quantity, 0);
  
  // Check localStorage for cart if not loaded yet
  let localCartTotal = 0;
  if (typeof window !== 'undefined' && cartTotal === 0) {
    try {
      const savedCart = localStorage.getItem('localCartItems');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        localCartTotal = parsedCart.reduce((sum: number, item: any) => sum + item.amount * item.quantity, 0);
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
  }

  const totalAmount = cartTotal || localCartTotal;
  
  // Use cart total if available, otherwise use product data
  const productTitle = totalAmount > 0 ? 'Cart Items' : (productData?.productTitle || 'Service/Product');
  const amount = totalAmount > 0 ? totalAmount : (productData?.amount || 999);
  const isProduct = totalAmount > 0 ? true : (productData?.type === 'product');

  if (loading) {
    return <div style={{ padding: '60px 24px' }}>Checking your session...</div>;
  }

  if (!user) {
    return (
      <div style={{ padding: '60px 24px', textAlign: 'center' }}>
        <h1 style={{ color: 'var(--primary)', marginBottom: '16px' }}>Login required for checkout</h1>
        <p style={{ color: 'var(--text-light)', marginBottom: '24px' }}>
          Please sign in with Gmail or phone before proceeding to checkout.
        </p>
        <Link href="/auth?redirect=/checkout" style={{
          display: 'inline-block',
          padding: '14px 24px',
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
          color: 'white',
          borderRadius: '12px',
          fontWeight: 700,
          textDecoration: 'none',
        }}>
          Login / Sign Up
        </Link>
      </div>
    );
  }

  return (
    <EnhancedCheckoutForm 
      productTitle={productTitle} 
      amount={amount}
      isProduct={isProduct}
    />
  );
}
