import { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { esotericWisdomData } from '@/data/esotericWisdom';

export const metadata: Metadata = {
  title: 'Tantric & Esoteric Wisdom - M.Y.T | REHAS',
  description:
    'Access hidden esoteric teachings and advanced tantric practices. Secret wisdom of enlightened masters for ultimate spiritual mastery.',
  keywords: [
    'Esoteric Wisdom',
    'Tantric Teachings',
    'Secret Knowledge',
    'Enlightenment',
    'Spiritual Mastery',
    'Hidden Teachings',
  ],
  openGraph: {
    title: 'Tantric & Esoteric Wisdom - M.Y.T | REHAS',
    description: 'Access secret esoteric teachings for ultimate spiritual mastery.',
    type: 'website',
  },
};

export default function EsotericWisdomPage() {
  return <HealingService data={esotericWisdomData} />;
}
