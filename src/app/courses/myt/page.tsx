import { Metadata } from 'next';
import CourseListing from '@/components/courseListing/courseListing';

export const metadata: Metadata = {
  title: 'MYT Courses | Mantra, Yantra, Tantra | REHAS',
  description:
    'Master advanced spiritual sciences. Learn Mantra, Yantra, and Tantra practices with our comprehensive courses from certified spiritual teachers.',
  keywords: [
    'Mantra Courses',
    'Yantra Courses',
    'Tantra Courses',
    'Spiritual Training',
    'Mantra Sadhna',
    'Tantra Sadhna',
    'Esoteric Wisdom',
  ],
  openGraph: {
    title: 'MYT Courses | REHAS',
    description: 'Master the ancient sciences of Mantra, Yantra, and Tantra.',
    type: 'website',
  },
};

export default function MYTCoursesPage() {
  const courses = [
    {
      name: 'Mantra Courses',
      description: 'Master sacred mantras for manifestation, spiritual awakening, and energy healing through proven sadhna practices.',
      price: '₹2,100 - ₹11,000',
      href: '/courses/myt/mantra',
      image: 'AudiotrackOutlined',
      level: 'Beginner to Advanced',
    },
    {
      name: 'Yantra Courses',
      description: 'Learn the ancient science of yantras for spiritual power and divine energy activation through sacred geometry.',
      price: '₹5,100 - ₹21,000',
      href: '/courses/myt/yantra',
      image: 'AutoAwesome',
      level: 'Beginner to Advanced',
    },
    {
      name: 'Tantra Courses',
      description: 'Explore tantric wisdom and meditation-based healing practices for spiritual transformation and consciousness expansion.',
      price: '₹2,100 - ₹21,000',
      href: '/courses/myt/tantra',
      image: 'EmojiEventsOutlined',
      level: 'Beginner to Advanced',
    },
  ];

  return (
    <CourseListing
      title="MYT Courses"
      subtitle="Mantra, Yantra & Tantra - Ancient Spiritual Sciences"
      description="Master the sacred sciences of Mantra, Yantra, and Tantra. Learn ancient spiritual practices, meditation techniques, and esoteric wisdom from experienced spiritual teachers."
      courses={courses}
    />
  );
}
