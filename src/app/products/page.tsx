import { Metadata } from 'next';
import ProductsPage from '@/components/productsPage/productsPage';

export const metadata: Metadata = {
  title: 'Premium Healing Products | Crystals, Oils, Equipment | REHAS',
  description:
    'Discover our curated collection of premium healing products - authentic crystals, essential oils, therapy equipment, and astrology tools for your wellness journey.',
  keywords: [
    'Healing Products',
    'Crystals',
    'Essential Oils',
    'Therapy Equipment',
    'Wellness Products',
    'Tarot Decks',
    'Meditation Tools',
  ],
  openGraph: {
    title: 'Premium Healing Products | REHAS',
    description: 'Authentic healing products for holistic wellness.',
    type: 'website',
  },
};

export default function Products() {
  return <ProductsPage />;
}
