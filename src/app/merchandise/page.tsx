import { Metadata } from 'next';
import MerchandisePage from '@/components/merchandisePage';
import { createMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = createMetadata(
  'Sacred Merchandise | Healing Bracelets & Yantras | REHAS',
  'Discover our collection of authentic sacred merchandise - healing bracelets made with genuine crystals and powerful yantras for spiritual enhancement.',
  [
    'Sacred Merchandise',
    'Healing Bracelets',
    'Crystal Bracelets',
    'Yantras',
    'Sacred Geometry',
    'Spiritual Jewelry',
    'Rudraksha Bracelets',
    'Copper Yantras',
  ],
  '/merchandise'
);

export default function Merchandise() {
  return <MerchandisePage />;
}