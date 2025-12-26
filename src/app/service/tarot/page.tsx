import { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { tarotData } from '@/data/tarot';
import { createMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = createMetadata(
  'Tarot Reading | Professional Divination & Guidance | REHAS',
  'Gain clarity and guidance through professional tarot readings. Expert tarot readers provide insights into relationships, career, and life decisions.',
  [
    'Tarot',
    'Tarot Reading',
    'Divination',
    'Tarot Cards',
    'Life Guidance',
    'Clarity',
    'Fortune Telling',
    'Spiritual Guidance',
    'Tarot Consultation',
  ],
  '/service/tarot'
);

export default function TarotPage() {
  return <HealingService data={tarotData} />;
}
