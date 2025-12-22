import { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { courseAstrologyData } from '@/data/courseAstrology';

export const metadata: Metadata = {
  title: 'Astrology Courses | Vedic Astrology & Numerology Training | REHAS',
  description:
    'Learn astrology from certified experts. Our comprehensive courses teach Vedic Astrology, Numerology, Tarot reading and divine guidance systems.',
  keywords: [
    'Astrology Courses',
    'Vedic Astrology Training',
    'Numerology Course',
    'Tarot Training',
    'Astrology Certification',
    'Birth Chart Course',
    'Astrology School',
  ],
  openGraph: {
    title: 'Astrology Courses | REHAS',
    description: 'Master the ancient science of the stars.',
    type: 'website',
  },
};

export default function AstrologyCoursesPage() {
  return <HealingService data={courseAstrologyData} />;
}
