import { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { acupunctureData } from '@/data/acupuncture';
import { createMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = createMetadata(
  'Acupuncture Therapy | Traditional Chinese Healing | REHAS',
  'Experience traditional Chinese acupuncture treatment. Needle therapy for pain relief, stress, fertility, and overall wellness.',
  [
    'Acupuncture',
    'Acupuncture Therapy',
    'Chinese Medicine',
    'Needle Therapy',
    'Pain Relief',
    'Traditional Healing',
    'Wellness',
    'Therapeutic Services',
  ],
  '/therapy/acupuncture'
);

export default function AcupuncturePage() {
  return <HealingService data={acupunctureData} />;
}
