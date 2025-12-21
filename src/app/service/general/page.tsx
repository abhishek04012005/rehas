import { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { generalData } from '@/data/general';

export const metadata: Metadata = {
  title: 'General Consultation | REHAS',
  description:
    'Get expert guidance on life decisions, career, relationships, and personal growth. Professional consultants provide personalized advice for your unique situation.',
  keywords: [
    'Consultation',
    'Life Guidance',
    'Career Advice',
    'Personal Coaching',
    'Life Coaching',
    'Decision Making',
    'Expert Guidance',
    'Personal Development',
  ],
  openGraph: {
    title: 'General Consultation | REHAS',
    description: 'Get expert guidance on life decisions, career, and personal growth.',
    type: 'website',
  },
};

export default function GeneralPage() {
  return <HealingService data={generalData} />;
}
