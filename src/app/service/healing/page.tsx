import { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { healingServiceData } from '@/data/healingService';

export const metadata: Metadata = {
  title: 'Healing Services | REHAS',
  description:
    'Explore holistic healing services including Reiki, Mantra, and Tantra. Balance energy, promote wellness, and guide your spiritual transformation.',
  keywords: [
    'Healing Services',
    'Energy Healing',
    'Holistic Wellness',
    'Spiritual Healing',
    'Reiki',
    'Mantra',
    'Tantra',
    'Wellness',
  ],
  openGraph: {
    title: 'Healing Services | REHAS',
    description: 'Explore holistic healing services for wellness and spiritual growth.',
    type: 'website',
  },
};

export default function HealingPage() {
  return <HealingService data={healingServiceData} />;
}
