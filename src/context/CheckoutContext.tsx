'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ProductData {
  productTitle: string;
  amount: number;
}

interface CheckoutContextType {
  productData: ProductData | null;
  setProductData: (data: ProductData | null) => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [productData, setProductData] = useState<ProductData | null>(null);

  return (
    <CheckoutContext.Provider value={{ productData, setProductData }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within CheckoutProvider');
  }
  return context;
}
