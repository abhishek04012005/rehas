import { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { mantraData } from '@/data/mantra';

export const metadata: Metadata = {
  title: 'Mantra Healing | REHAS',
  description:
    'Discover the power of sacred mantras for spiritual transformation. Learn how mantra meditation can enhance your well-being, balance energy, and guide your healing journey.',
  keywords: [
    'Mantra',
    'Mantra Meditation',
    'Sacred Chanting',
    'Spiritual Healing',
    'Chakra Balance',
    'Energy Healing',
    'Sound Healing',
    'Vedic Mantras',
    'Spiritual Growth',
    'Mindfulness',
  ],
  openGraph: {
    title: 'Mantra Healing | REHAS',
    description:
      'Discover the power of sacred mantras for spiritual transformation.',
    type: 'website',
  },
};

export default function MantraPage() {
  return <HealingService data={mantraData} />;
}
