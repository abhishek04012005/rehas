import { Metadata } from 'next';
import HealingService from '@/components/healingService';
import { tarotCard } from '@/data/tarotCard';
import { createMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = createMetadata(
  'Tarot Card Reading | Divination & Spiritual Guidance | REHAS',
  'Receive spiritual guidance through ancient tarot card divination. Uncover hidden truths, reveal blockages, and illuminate your path forward.',
  [
    'Tarot Card Reading',
    'Divination',
    'Spiritual Guidance',
    'Oracle Reading',
    'Ifa Divination',
    'Ancestral Guidance',
    'Spiritual Wisdom',
    'Divination Reading',
  ],
  '/astrology/tarot'
);

export default function TarotCardPage() {
  return <HealingService data={tarotCard} />;
}
