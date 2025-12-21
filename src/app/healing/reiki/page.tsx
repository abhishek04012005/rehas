import type { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { reikiData } from '@/data/reiki';

export const metadata: Metadata = {
  title: 'Reiki Healing | REHAS - Universal Life Force Energy',
  description:
    'Experience deep healing through Reiki. Balance your chakras, reduce stress, and transform your health with our certified Reiki practitioners.',
  keywords: [
    'Reiki',
    'Energy Healing',
    'Chakra Balancing',
    'Holistic Wellness',
    'Alternative Medicine',
    'Spiritual Healing',
  ],
};

export default function ReikiPage() {
  return <HealingService data={reikiData} />;
}
