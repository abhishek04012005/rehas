import { Metadata } from 'next';
import ProductShowcase from '@/components/productShowcase';
import { merchandiseYantraData } from '@/data/merchandiseYantra';

export const metadata: Metadata = {
  title: 'Sacred Yantras | Geometric Symbols for Manifestation | REHAS',
  description:
    'Powerful yantras engraved on copper, silver, or gold plates for manifestation, protection, and spiritual awakening.',
  keywords: [
    'Sacred Yantras',
    'Sri Yantra',
    'Mahalaxmi Yantra',
    'Geometric Symbols',
    'Spiritual Tools',
    'Manifestation Yantras',
    'Protection Yantras',
  ],
  openGraph: {
    title: 'Sacred Yantras | REHAS',
    description: 'Powerful geometric symbols for spiritual manifestation and protection.',
    type: 'website',
  },
};

export default function YantraPage() {
  return <ProductShowcase data={merchandiseYantraData} category="yantra" />;
}