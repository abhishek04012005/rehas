import Healing from '@/components/healing';
import { Metadata } from 'next';
import { createMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = createMetadata(
  'Healing Services | REHAS - Reiki, Mantra & Tantra',
  'Explore our holistic healing services including Reiki, Mantra, and Tantra practices. Transform your life through ancient wisdom and modern wellness.',
  [
    'Healing',
    'Reiki',
    'Mantra',
    'Tantra',
    'Energy Healing',
    'Spiritual Practice',
    'Wellness',
    'Holistic Healing',
    'Alternative Medicine',
  ],
  '/healing'
);

export default function HealingPage() {
  return <Healing />;
}
