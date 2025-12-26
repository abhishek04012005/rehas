import { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { tantraData } from '@/data/tantra';
import { createMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = createMetadata(
  'Tantra Healing | Ancient Wisdom & Spiritual Awakening | REHAS',
  'Explore the ancient wisdom of Tantra for holistic healing and spiritual awakening. Balance energy, enhance consciousness, and transform your life with tantric practices.',
  [
    'Tantra',
    'Tantric Healing',
    'Energy Work',
    'Spiritual Practices',
    'Consciousness',
    'Kundalini',
    'Sacred Rituals',
    'Healing Practices',
    'Spiritual Growth',
  ],
  '/healing/tantra'
);

export default function TantraPage() {
  return <HealingService data={tantraData} />;
}
