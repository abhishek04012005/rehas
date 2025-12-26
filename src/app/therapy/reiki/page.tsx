import { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { reikiTherapyData } from '@/data/reikiTherapy';
import { createMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = createMetadata(
  'Reiki Therapy | Professional Energy Healing | REHAS',
  'Experience Japanese energy healing through professional Reiki therapy. Balance your chakras, reduce stress, and promote natural healing.',
  [
    'Reiki Therapy',
    'Energy Healing',
    'Chakra Balancing',
    'Reiki Treatment',
    'Japanese Healing',
    'Stress Relief',
    'Holistic Health',
    'Therapeutic Services',
  ],
  '/therapy/reiki'
);

export default function ReikiTherapyPage() {
  return <HealingService data={reikiTherapyData} />;
}
