import { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { magnetTherapyData } from '@/data/magnetTherapy';

export const metadata: Metadata = {
  title: 'Magnet Therapy | REHAS',
  description:
    'Natural healing through magnetic therapy. Pain relief, improved circulation, and faster healing using magnetic field therapy.',
  keywords: [
    'Magnet Therapy',
    'Magnetic Healing',
    'Biomagnetism',
    'Pain Relief',
    'Natural Healing',
    'Alternative Medicine',
    'Wellness',
  ],
  openGraph: {
    title: 'Magnet Therapy | REHAS',
    description: 'Natural healing through magnetic therapy and magnetic field treatment.',
    type: 'website',
  },
};

export default function MagnetTherapyPage() {
  return <HealingService data={magnetTherapyData} />;
}
