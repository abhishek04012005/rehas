import { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { mantraVortexData } from '@/data/mantraVortex';

export const metadata: Metadata = {
  title: 'Mantra Vortex | Sacred Sound Spirals of Transformation | REHAS',
  description:
    'Discover Mantra Vortex, sacred spiral sound techniques for consciousness acceleration, quantum healing, and reality manifestation through amplified mantra power.',
  keywords: [
    'Mantra Vortex',
    'Sacred Mantras',
    'Sound Healing',
    'Consciousness Expansion',
    'Spiritual Transformation',
    'Quantum Healing',
    'Manifestation',
  ],
  openGraph: {
    title: 'Mantra Vortex | REHAS',
    description: 'Sacred sound spirals for accelerated spiritual transformation.',
    type: 'website',
  },
};

export default function MantraVortexPage() {
  return <HealingService data={mantraVortexData} />;
}
