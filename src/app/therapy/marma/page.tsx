import { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { marmaTherapyData } from '@/data/marmaTherapy';

export const metadata: Metadata = {
  title: 'Marma Therapy | Ayurvedic Vital Point Healing | REHAS',
  description:
    'Discover Marma therapy, an ancient Ayurvedic healing technique using 108 vital points. Release blockages, balance energy, and restore harmony.',
  keywords: [
    'Marma Therapy',
    'Marma Points',
    'Ayurvedic Healing',
    'Vital Point Therapy',
    'Energy Release',
    'Chakra Healing',
    'Ayurveda',
  ],
  openGraph: {
    title: 'Marma Therapy | REHAS',
    description: 'Ancient Ayurvedic vital point healing for energy and balance.',
    type: 'website',
  },
};

export default function MarmaTherapyPage() {
  return <HealingService data={marmaTherapyData} />;
}
