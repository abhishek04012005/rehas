'use client';

import EnhancedCheckoutForm from '@/components/enhancedCheckoutForm/enhancedCheckoutForm';
import { useCheckout } from '@/context/CheckoutContext';

export default function CheckoutPageClient() {
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
