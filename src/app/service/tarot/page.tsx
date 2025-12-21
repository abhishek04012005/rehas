import { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { tarotData } from '@/data/tarot';

export const metadata: Metadata = {
  title: 'Tarot Reading | REHAS',
  description:
    'Gain clarity and guidance through professional tarot readings. Expert tarot readers provide insights into relationships, career, and life decisions.',
  keywords: [
    'Tarot',
    'Tarot Reading',
    'Divination',
    'Tarot Cards',
    'Life Guidance',
    'Clarity',
    'Fortune Telling',
    'Spiritual Guidance',
  ],
  openGraph: {
    title: 'Tarot Reading | REHAS',
    description: 'Gain clarity and guidance through professional tarot readings.',
    type: 'website',
  },
};

export default function TarotPage() {
  return <HealingService data={tarotData} />;
}
