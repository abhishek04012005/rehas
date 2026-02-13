import { Metadata } from 'next';
import HealingService from '@/components/healingService';
import { mantraManipulationData } from '@/data/mantraManipulation';

export const metadata: Metadata = {
  title: 'Mantra Manipulation - M.Y.T Wisdom | REHAS',
  description:
    'Master advanced mantra techniques for rapid manifestation. Learn manipulation of sacred sound energy for powerful results.',
  keywords: [
    'Mantra Manipulation',
    'Advanced Mantras',
    'Rapid Manifestation',
    'Sound Energy',
    'Chakra Work',
    'Spiritual Mastery',
  ],
  openGraph: {
    title: 'Mantra Manipulation - M.Y.T Wisdom | REHAS',
    description: 'Master advanced mantra manipulation for exponential results.',
    type: 'website',
  },
};

export default function MantraManipulationPage() {
  return <HealingService data={mantraManipulationData} />;
}
