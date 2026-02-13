import { Metadata } from 'next';
import HealingService from '@/components/healingService';
import { mytTantraData } from '@/data/mytTantra';

export const metadata: Metadata = {
  title: 'Tantra - M.Y.T Wisdom | REHAS',
  description:
    'Explore the path of tantra for transformation. Advanced practices for kundalini awakening, consciousness expansion, and enlightenment.',
  keywords: [
    'Tantra',
    'Tantric Practice',
    'Kundalini',
    'Consciousness Expansion',
    'Spiritual Transformation',
    'Enlightenment',
    'Energy Work',
  ],
  openGraph: {
    title: 'Tantra - M.Y.T Wisdom | REHAS',
    description: 'Master tantric practices for spiritual transformation and enlightenment.',
    type: 'website',
  },
};

export default function MYTTantraPage() {
  return <HealingService data={mytTantraData} />;
}
