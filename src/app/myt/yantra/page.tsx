import { Metadata } from 'next';
import HealingService from '@/components/healingService';
import { yanthaData } from '@/data/yantra';

export const metadata: Metadata = {
  title: 'Yantra - M.Y.T Wisdom | REHAS',
  description:
    'Explore sacred geometry and visual mantras. Yantra meditation for energy activation, abundance, and cosmic connection.',
  keywords: [
    'Yantra',
    'Sacred Geometry',
    'Visual Mantra',
    'Energy Activation',
    'Meditation',
    'Cosmic Alignment',
    'Abundance',
  ],
  openGraph: {
    title: 'Yantra - M.Y.T Wisdom | REHAS',
    description: 'Master sacred geometry through powerful yantra meditation.',
    type: 'website',
  },
};

export default function YantraPage() {
  return <HealingService data={yanthaData} />;
}
