import { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { himalayanTantraData } from '@/data/himalayanTantra';

export const metadata: Metadata = {
  title: 'Himalayan Tantra - M.Y.T Wisdom | REHAS',
  description:
    'Learn the ancient practices of Himalayan tantra. Mountain wisdom for rapid spiritual development and enlightenment.',
  keywords: [
    'Himalayan Tantra',
    'Mountain Wisdom',
    'Tantric Practices',
    'Kundalini Awakening',
    'Spiritual Retreat',
    'Enlightenment',
  ],
  openGraph: {
    title: 'Himalayan Tantra - M.Y.T Wisdom | REHAS',
    description: 'Explore the ancient wisdom path of Himalayan tantra.',
    type: 'website',
  },
};

export default function HimalayanTantraPage() {
  return <HealingService data={himalayanTantraData} />;
}
