import { Metadata } from 'next';
import Services from '@/components/services/services';
import { createMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = createMetadata(
  'Services | REHAS Astrology & Wellness Platform',
  'Explore REHAS comprehensive services: astrology readings, reiki healing, numerology, tarot, therapy sessions, and m.y.t wisdom. Book your consultation today.',
  [
    'Services',
    'Astrology Services',
    'Reiki Healing',
    'Numerology Reading',
    'Wellness Services',
    'Spiritual Guidance',
    'Therapy Sessions',
    'Consultation',
  ],
  '/services'
);

export default function ServicesPage() {
  return <Services />;
}
