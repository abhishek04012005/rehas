import { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { reikiTherapyData } from '@/data/reikiTherapy';

export const metadata: Metadata = {
  title: 'Reiki Therapy | REHAS',
  description:
    'Experience Japanese energy healing through professional Reiki therapy. Balance your chakras, reduce stress, and promote natural healing.',
  keywords: [
    'Reiki Therapy',
    'Energy Healing',
    'Chakra Balancing',
    'Reiki Treatment',
    'Japanese Healing',
    'Stress Relief',
    'Holistic Health',
  ],
  openGraph: {
    title: 'Reiki Therapy | REHAS',
    description: 'Experience Japanese energy healing through professional Reiki therapy.',
    type: 'website',
  },
};

export default function ReikiTherapyPage() {
  return <HealingService data={reikiTherapyData} />;
}
