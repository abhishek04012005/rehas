import type { Metadata } from 'next';
import HealingService from '@/components/healingService';
import { reikiData } from '@/data/reiki';
import { createMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = createMetadata(
  'Reiki Healing | Universal Life Force Energy | REHAS',
  'Experience deep healing through Reiki. Balance your chakras, reduce stress, and transform your health with our certified Reiki practitioners.',
  [
    'Reiki',
    'Energy Healing',
    'Chakra Balancing',
    'Holistic Wellness',
    'Alternative Medicine',
    'Spiritual Healing',
    'Reiki Therapy',
    'Wellness',
  ],
  '/healing/reiki'
);

export default function ReikiPage() {
  return <HealingService data={reikiData} />;
}
