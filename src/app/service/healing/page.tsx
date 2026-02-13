import { Metadata } from 'next';
import HealingService from '@/components/healingService';
import { healingServiceData } from '@/data/healingService';
import { createMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = createMetadata(
  'Healing Services | Reiki, Mantra & Tantra | REHAS',
  'Explore holistic healing services including Reiki, Mantra, and Tantra. Balance energy, promote wellness, and guide your spiritual transformation.',
  [
    'Healing Services',
    'Energy Healing',
    'Holistic Wellness',
    'Spiritual Healing',
    'Reiki',
    'Mantra',
    'Tantra',
    'Wellness Services',
    'Alternative Medicine',
  ],
  '/service/healing'
);

export default function HealingPage() {
  return <HealingService data={healingServiceData} />;
}
