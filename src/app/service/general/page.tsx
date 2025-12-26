import { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { generalData } from '@/data/general';
import { createMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = createMetadata(
  'General Consultation | Expert Guidance | REHAS',
  'Get expert guidance on life decisions, career, relationships, and personal growth. Professional consultants provide personalized advice for your unique situation.',
  [
    'Consultation',
    'Life Guidance',
    'Career Advice',
    'Personal Coaching',
    'Life Coaching',
    'Decision Making',
    'Expert Guidance',
    'Personal Development',
    'Wellness Consultation',
  ],
  '/service/general'
);

export default function GeneralPage() {
  return <HealingService data={generalData} />;
}
