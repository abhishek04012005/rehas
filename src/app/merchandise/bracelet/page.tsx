import { Metadata } from 'next';
import ProductShowcase from '@/components/productShowcase';
import { merchandiseBraceletData } from '@/data/merchandiseBracelet';

export const metadata: Metadata = {
  title: 'Healing Bracelets | Crystal & Rudraksha Jewelry | REHAS',
  description:
    'Authentic healing bracelets made with genuine crystals, rudraksha, and sacred beads for protection, healing, and spiritual enhancement.',
  keywords: [
    'Healing Bracelets',
    'Crystal Bracelets',
    'Rudraksha Bracelets',
    'Spiritual Jewelry',
    'Protection Bracelets',
    'Chakra Bracelets',
    'Sacred Beads',
  ],
  openGraph: {
    title: 'Healing Bracelets | REHAS',
    description: 'Sacred crystal and rudraksha bracelets for spiritual protection.',
    type: 'website',
  },
};

export default function BraceletPage() {
  return <ProductShowcase data={merchandiseBraceletData} category="bracelet" />;
}