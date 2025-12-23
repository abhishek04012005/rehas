'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type OrderType = 'service' | 'course' | 'product';

export interface ProductData {
  productTitle: string;
  amount: number;
  type?: OrderType;
  serviceId?: string;
  description?: string;
}

interface CheckoutContextType {
  productData: ProductData | null;
  setProductData: (data: ProductData | null) => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Load from localStorage on mount (client-side only)
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('checkoutProductData');
      if (savedData) {
        setProductData(JSON.parse(savedData));
      }
    } catch (error) {
      console.error('Failed to load checkout data from localStorage:', error);
    }
    setIsMounted(true);
  }, []);

  // Save to localStorage whenever productData changes
  const handleSetProductData = (data: ProductData | null) => {
    setProductData(data);
    if (data && typeof window !== 'undefined') {
      try {
        localStorage.setItem('checkoutProductData', JSON.stringify(data));
      } catch (error) {
        console.error('Failed to save checkout data to localStorage:', error);
      }
    } else if (!data && typeof window !== 'undefined') {
      try {
        localStorage.removeItem('checkoutProductData');
      } catch (error) {
        console.error('Failed to remove checkout data from localStorage:', error);
      }
    }
  };

  return (
    <CheckoutContext.Provider value={{ productData, setProductData: handleSetProductData }}>
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

