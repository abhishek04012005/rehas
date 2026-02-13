import { Metadata } from 'next';
import ProductShowcase from '@/components/productShowcase';
import { productAstrologyData } from '@/data/productAstrology';

export const metadata: Metadata = {
  title: 'Astrology Products | Tarot, Charts & Resources | REHAS',
  description:
    'Astrology tools and resources. Birth chart guides, tarot decks, oracle cards, numerology charts, and astrology books for learning and practice.',
  keywords: [
    'Astrology Products',
    'Tarot Deck',
    'Astrology Books',
    'Birth Chart Guide',
    'Oracle Cards',
    'Numerology',
    'Astrology Tools',
  ],
  openGraph: {
    title: 'Astrology Products | REHAS',
    description: 'Tools and resources for astrology learning and practice.',
    type: 'website',
  },
};

export default function AstrologyProductsPage() {
  return <ProductShowcase data={productAstrologyData} category="astrology" />;
}
