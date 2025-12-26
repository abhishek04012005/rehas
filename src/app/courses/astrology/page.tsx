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
      name: 'Vedic Astrology Diploma',
      description: 'Complete Vedic astrology training covering horoscope reading, planetary positions and cosmic timing',
      price: '₹5,099 - ₹34,999',
      href: '/courses/astrology/vedic',
      image: 'StarOutlined',
      imageUrl: '/assets/course/astrology/vedic.png',
      level: 'Beginner to Master',
    },
    {
      name: 'Numerology Certification',
      description: 'Learn the science of numbers and their profound influence on life, destiny and personality',
      price: '₹5,099 - ₹20,999',
      href: '/courses/astrology/numerology',
      image: 'CalculateOutlined',
      imageUrl: '/assets/course/astrology/numerlogy.png',
      level: 'All Levels',
    },
    {
      name: 'Tarot Reading Course',
      description: 'Master tarot card reading, interpretation, and intuitive guidance for yourself and clients',
      price: '₹2,099 - ₹10,999',
      href: '/courses/astrology/tarot',
      image: 'PokerOutlined',
      imageUrl: '/assets/course/astrology/tarrot.png',
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
