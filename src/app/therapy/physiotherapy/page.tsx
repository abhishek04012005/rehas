import { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { physiotherapyData } from '@/data/physiotherapy';

export const metadata: Metadata = {
  title: 'Physiotherapy | REHAS',
  description:
    'Professional physiotherapy for injury recovery, rehabilitation, and mobility improvement. Evidence-based treatment for all conditions.',
  keywords: [
    'Physiotherapy',
    'Physical Therapy',
    'Rehabilitation',
    'Movement Therapy',
    'Injury Recovery',
    'Post-Surgery Recovery',
    'Wellness',
  ],
  openGraph: {
    title: 'Physiotherapy | REHAS',
    description: 'Professional physiotherapy for injury recovery and rehabilitation.',
    type: 'website',
  },
};

export default function PhysiotherapyPage() {
  return <HealingService data={physiotherapyData} />;
}
