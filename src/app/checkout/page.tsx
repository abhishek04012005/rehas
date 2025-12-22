'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CheckoutForm from '@/components/checkoutForm/checkoutForm';
import { useCheckout } from '@/context/CheckoutContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { productData } = useCheckout();

  useEffect(() => {
    // If no product data in context, redirect back to products
    if (!productData) {
      router.push('/products/healing');
    }
  }, [productData, router]);

  // Show loading while checking context
  if (!productData) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  return <CheckoutForm productTitle={productData.productTitle} amount={productData.amount} />;
}
