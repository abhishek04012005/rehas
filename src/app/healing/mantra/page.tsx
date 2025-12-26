import { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { mantraData } from '@/data/mantra';
import { createMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = createMetadata(
  'Mantra Healing | Sacred Chanting & Spiritual Wellness | REHAS',
  'Discover the power of sacred mantras for spiritual transformation. Learn how mantra meditation can enhance your well-being, balance energy, and guide your healing journey.',
  [
    'Mantra',
    'Mantra Meditation',
    'Sacred Chanting',
    'Spiritual Healing',
    'Chakra Balance',
    'Energy Healing',
    'Sound Healing',
    'Vedic Mantras',
    'Spiritual Growth',
  ],
  '/healing/mantra'
);

export default function MantraPage() {
  return <HealingService data={mantraData} />;
}
