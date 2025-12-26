import { Metadata } from 'next';
import ProductsPage from '@/components/productsPage/productsPage';
import { createMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = createMetadata(
  'Premium Healing Products | Crystals, Oils, Equipment | REHAS',
  'Discover our curated collection of premium healing products - authentic crystals, essential oils, therapy equipment, and astrology tools for your wellness journey.',
  [
    'Healing Products',
    'Crystals',
    'Essential Oils',
    'Therapy Equipment',
    'Wellness Products',
    'Tarot Decks',
    'Meditation Tools',
    'Healing Tools',
    'Spiritual Products',
  ],
  '/products'
);

export default function Products() {
  return <ProductsPage />;
}
