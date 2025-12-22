import { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { palmReadingData } from '@/data/palmReading';

export const metadata: Metadata = {
  title: 'Palm Reading | Discover Your Destiny | REHAS',
  description:
    'Unlock the secrets of your life through ancient palm reading. Get insights into your relationships, career, health, and future destiny through palmistry.',
  keywords: [
    'Palm Reading',
    'Palmistry',
    'Hand Reading',
    'Destiny',
    'Life Path',
    'Future Prediction',
    'Chiromancy',
  ],
  openGraph: {
    title: 'Palm Reading | REHAS',
    description: 'Discover your destiny written in your hands through ancient palmistry.',
    type: 'website',
  },
};

export default function PalmReadingPage() {
  return <HealingService data={palmReadingData} />;
}
