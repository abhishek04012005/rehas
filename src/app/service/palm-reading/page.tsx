import { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { palmReadingData } from '@/data/palmReading';
import { createMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = createMetadata(
  'Palm Reading | Discover Your Destiny | REHAS',
  'Unlock the secrets of your life through ancient palm reading. Get insights into your relationships, career, health, and future destiny through palmistry.',
  [
    'Palm Reading',
    'Palmistry',
    'Hand Reading',
    'Destiny',
    'Life Path',
    'Future Prediction',
    'Chiromancy',
    'Hand Analysis',
  ],
  '/service/palm-reading'
);

export default function PalmReadingPage() {
  return <HealingService data={palmReadingData} />;
}
