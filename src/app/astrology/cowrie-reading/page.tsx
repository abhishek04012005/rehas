import { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { cowrieReadingData } from '@/data/cowrieReading';

export const metadata: Metadata = {
  title: 'Cowrie Reading | Shell Divination & Spiritual Guidance | REHAS',
  description:
    'Receive spiritual guidance through ancient cowrie shell divination. Uncover hidden truths, reveal blockages, and illuminate your path forward.',
  keywords: [
    'Cowrie Reading',
    'Shell Divination',
    'Spiritual Guidance',
    'Oracle Reading',
    'Ifa Divination',
    'Ancestral Guidance',
    'Spiritual Wisdom',
  ],
  openGraph: {
    title: 'Cowrie Reading | REHAS',
    description: 'Ancient shell divination for spiritual clarity and guidance.',
    type: 'website',
  },
};

export default function CowrieReadingPage() {
  return <HealingService data={cowrieReadingData} />;
}
