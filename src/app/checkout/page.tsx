'use client';

import { Metadata } from 'next';
import EnhancedCheckoutForm from '@/components/enhancedCheckoutForm/enhancedCheckoutForm';
import { useCheckout } from '@/context/CheckoutContext';
import { createMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = createMetadata(
  'Secure Checkout | REHAS Services & Products',
  'Proceed with secure payment for REHAS astrology services, healing products, courses, and spiritual guidance offerings.',
  [
    'Checkout',
    'Payment',
    'Secure Payment',
    'REHAS Services',
    'Healing Products',
    'Courses',
    'Spiritual Services',
  ],
  '/checkout'
);

export default function CheckoutPage() {
  const { productData } = useCheckout();

  // Use product data if available, otherwise use defaults
  const productTitle = productData?.productTitle || 'Service/Product';
  const amount = productData?.amount || 999;
  const isProduct = productData?.type === 'product';

  return (
    <EnhancedCheckoutForm 
      productTitle={productTitle} 
      amount={amount}
      isProduct={isProduct}
    />
  );
}
