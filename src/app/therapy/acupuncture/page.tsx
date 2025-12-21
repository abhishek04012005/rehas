import { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { acupunctureData } from '@/data/acupuncture';

export const metadata: Metadata = {
  title: 'Acupuncture Therapy | REHAS',
  description:
    'Experience traditional Chinese acupuncture treatment. Needle therapy for pain relief, stress, fertility, and overall wellness.',
  keywords: [
    'Acupuncture',
    'Acupuncture Therapy',
    'Chinese Medicine',
    'Needle Therapy',
    'Pain Relief',
    'Traditional Healing',
    'Wellness',
  ],
  openGraph: {
    title: 'Acupuncture Therapy | REHAS',
    description: 'Experience traditional Chinese acupuncture treatment for wellness.',
    type: 'website',
  },
};

export default function AcupuncturePage() {
  return <HealingService data={acupunctureData} />;
}
