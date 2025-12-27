import { Metadata } from 'next';
import CheckoutPageClient from '@/app/checkout/CheckoutPageClient';
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
  return <CheckoutPageClient />;
}
