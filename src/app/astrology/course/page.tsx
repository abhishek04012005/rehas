import { Metadata } from 'next';
import HealingService from '@/components/healingService';
import { astrologyCoursesData } from '@/data/astrologyCourse';

export const metadata: Metadata = {
  title: 'Astrology Courses | REHAS - Learn from Expert Astrologers',
  description: 'Master astrology with our comprehensive courses. Learn birth chart reading, horoscope prediction, and cosmic wisdom from certified instructors.',
  keywords: [
    'Astrology Courses',
    'Learn Astrology',
    'Online Astrology Training',
    'Birth Chart Course',
    'Horoscope Course',
    'Astrology Certification',
    'Expert Training',
  ],
  alternates: {
    canonical: 'https://rehas.in/astrology/course',
  },
};

export default function AstrologyCoursePage() {
  return <HealingService data={astrologyCoursesData} />;
}
