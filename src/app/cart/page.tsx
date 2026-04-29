import type { Metadata } from 'next';
import Cart from '@/components/cart/cart';

export const metadata: Metadata = {
  title: 'Cart | REHAS',
  description: 'Review your selected REHAS services and products before checkout.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function CartPage() {
  return <Cart />;
}
