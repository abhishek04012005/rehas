import { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { acupressureData } from '@/data/acupressure';
import { createMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = createMetadata(
  'Acupressure Therapy | Traditional Chinese Healing | REHAS',
  'Discover relief through traditional Chinese acupressure therapy. Pressure point healing for pain relief, stress reduction, and wellness.',
  [
    'Acupressure',
    'Acupressure Therapy',
    'Pressure Point',
    'Chinese Healing',
    'Pain Relief',
    'Meridian Therapy',
    'Alternative Medicine',
    'Therapeutic Services',
  ],
  '/therapy/acupressure'
);

export default function AcupressurePage() {
  return <HealingService data={acupressureData} />;
}
