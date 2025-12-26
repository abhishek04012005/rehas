import { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { magnetTherapyData } from '@/data/magnetTherapy';
import { createMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = createMetadata(
  'Magnet Therapy | Natural Healing & Pain Relief | REHAS',
  'Natural healing through magnetic therapy. Pain relief, improved circulation, and faster healing using magnetic field therapy.',
  [
    'Magnet Therapy',
    'Magnetic Healing',
    'Biomagnetism',
    'Pain Relief',
    'Natural Healing',
    'Alternative Medicine',
    'Wellness',
    'Therapeutic Services',
  ],
  '/therapy/magnet'
);

export default function MagnetTherapyPage() {
  return <HealingService data={magnetTherapyData} />;
}
