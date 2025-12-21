import { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { mytMantraData } from '@/data/mytMantra';

export const metadata: Metadata = {
  title: 'Mantra - M.Y.T Wisdom | REHAS',
  description:
    'Master the sacred science of mantras. Learn divine sound vibrations for consciousness elevation, chakra activation, and manifestation.',
  keywords: [
    'Mantra',
    'Sacred Mantra',
    'Sound Vibration',
    'Consciousness',
    'Chakra Activation',
    'Manifestation',
    'Spiritual Practice',
  ],
  openGraph: {
    title: 'Mantra - M.Y.T Wisdom | REHAS',
    description: 'Master the sacred science of mantras and unlock your spiritual potential.',
    type: 'website',
  },
};

export default function MYTMantraPage() {
  return <HealingService data={mytMantraData} />;
}
