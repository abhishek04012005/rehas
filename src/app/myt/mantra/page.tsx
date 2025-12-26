import { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { mytMantraData } from '@/data/mytMantra';
import { createMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = createMetadata(
  'Mantra - M.Y.T Wisdom | Sacred Sound & Consciousness | REHAS',
  'Master the sacred science of mantras. Learn divine sound vibrations for consciousness elevation, chakra activation, and manifestation.',
  [
    'Mantra',
    'Sacred Mantra',
    'Sound Vibration',
    'Consciousness',
    'Chakra Activation',
    'Manifestation',
    'Spiritual Practice',
    'MYT Wisdom',
  ],
  '/myt/mantra'
);

export default function MYTMantraPage() {
  return <HealingService data={mytMantraData} />;
}
