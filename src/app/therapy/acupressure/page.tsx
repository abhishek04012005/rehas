import { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { acupressureData } from '@/data/acupressure';

export const metadata: Metadata = {
  title: 'Acupressure Therapy | REHAS',
  description:
    'Discover relief through traditional Chinese acupressure therapy. Pressure point healing for pain relief, stress reduction, and wellness.',
  keywords: [
    'Acupressure',
    'Acupressure Therapy',
    'Pressure Point',
    'Chinese Healing',
    'Pain Relief',
    'Meridian Therapy',
    'Alternative Medicine',
  ],
  openGraph: {
    title: 'Acupressure Therapy | REHAS',
    description: 'Discover relief through traditional Chinese acupressure therapy.',
    type: 'website',
  },
};

export default function AcupressurePage() {
  return <HealingService data={acupressureData} />;
}
