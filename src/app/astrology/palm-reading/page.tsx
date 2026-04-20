import { Metadata } from 'next';
import HealingService from '@/components/healingService';
import { palmReadingData } from '@/data/palmReading';
import { createMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = createMetadata(
  'Palm Reading | Handline Analysis & Destiny Insights | REHAS',
  'Discover your destiny through ancient palm reading. Expert analysis of hand lines, mounts, and markings for personal insights and guidance.',
  [
    'Palm Reading',
    'Palmistry',
    'Hand Analysis',
    'Destiny Reading',
    'Life Line',
    'Fate Line',
    'Hand Lines',
    'Handline Analysis',
  ],
  '/astrology/palm-reading'
);

export default function PalmReadingPage() {
  return <HealingService data={palmReadingData} />;
}
