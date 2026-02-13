import { Metadata } from 'next';
import HealingService from '@/components/healingService';
import { cowrieReadingData } from '@/data/cowrieReading';
import { createMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = createMetadata(
  'Cowrie Reading | Shell Divination & Spiritual Guidance | REHAS',
  'Receive spiritual guidance through ancient cowrie shell divination. Uncover hidden truths, reveal blockages, and illuminate your path forward.',
  [
    'Cowrie Reading',
    'Shell Divination',
    'Spiritual Guidance',
    'Oracle Reading',
    'Ifa Divination',
    'Ancestral Guidance',
    'Spiritual Wisdom',
    'Divination Reading',
  ],
  '/astrology/cowrie-reading'
);

export default function CowrieReadingPage() {
  return <HealingService data={cowrieReadingData} />;
}
