import { Metadata } from 'next';
import CourseListing from '@/components/courseListing/courseListing';
import { courseAstrologyData } from '@/data/courseAstrology';

export const metadata: Metadata = {
  title: 'Astrology Courses | Vedic Astrology, Numerology, Tarot | REHAS',
  description:
    'Master astrology from certified experts. Learn Vedic Astrology, Numerology, and Tarot reading with our comprehensive professional courses.',
  keywords: [
    'Astrology Courses',
    'Vedic Astrology Training',
    'Numerology Course',
    'Tarot Reading Course',
    'Astrology Certification',
    'Birth Chart Analysis',
    'Astrology School',
  ],
  openGraph: {
    title: 'Astrology Courses | REHAS',
    description: 'Master the ancient science of the stars and cosmic guidance.',
    type: 'website',
  },
};

export default function AstrologyCoursesPage() {
  const courses = [
    {
      name: courseAstrologyData.practices?.list?.[0]?.name || 'Vedic Astrology Diploma',
      description: courseAstrologyData.practices?.list?.[0]?.meaning || 'Complete Vedic astrology training covering horoscope reading, planetary positions and cosmic timing',
      price: courseAstrologyData.sessions?.types?.[1]?.price || '₹35,000-₹55,000',
      href: '/courses/astrology/vedic',
      image: 'StarOutlined',
      level: 'Beginner to Master',
    },
    {
      name: courseAstrologyData.practices?.list?.[1]?.name || 'Numerology Certification',
      description: courseAstrologyData.practices?.list?.[1]?.meaning || 'Learn the science of numbers and their profound influence on life, destiny and personality',
      price: courseAstrologyData.sessions?.types?.[0]?.price || '₹8,000-₹12,000',
      href: '/courses/astrology/numerology',
      image: 'CalculateOutlined',
      level: 'All Levels',
    },
    {
      name: courseAstrologyData.practices?.list?.[2]?.name || 'Tarot Reading Course',
      description: courseAstrologyData.practices?.list?.[2]?.meaning || 'Master tarot card reading, interpretation, and intuitive guidance for yourself and clients',
      price: courseAstrologyData.sessions?.types?.[0]?.price || '₹8,000-₹12,000',
      href: '/courses/astrology/tarot',
      image: 'PokerOutlined',
      level: 'Beginner to Intermediate',
    },
  ];

  return (
    <CourseListing
      title="Astrology Courses"
      subtitle="Master Vedic Astrology, Numerology & Divination"
      description="Discover the ancient wisdom of the cosmos. Our comprehensive astrology courses teach you to read the stars, understand destiny, and provide divine guidance."
      courses={courses}
    />
  );
}
