import { Metadata } from 'next';
import CourseListing from '@/components/courseListing';
import { createMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = createMetadata(
  'Mind Reading Courses | Manifestation, Law of Attraction, Mid Brain | REHAS',
  'Master mind power and consciousness development. Learn manifestation, law of attraction, and mid brain activation techniques.',
  [
    'Mind Reading Courses',
    'Manifestation Training',
    'Law of Attraction',
    'Mid Brain Activation',
    'Consciousness Development',
    'Mind Power',
    'Personal Development Courses',
  ],
  '/courses/mind-reading'
);

export default function MindReadingCoursesPage() {
  const courses = [
    {
      name: 'Manifestation Courses',
      description: 'Learn the science and practice of manifestation to attract your desires and create the life you want.',
      price: '₹2,099 - ₹10,999',
      href: '/courses/mind-reading/manifestation',
      image: 'AutoAwesome',
      imageUrl: '/assets/course/mind-reading/manifestation.png',
      level: 'Beginner to Advanced',
    },
    {
      name: 'Law of Attraction Courses',
      description: 'Master the universal law of attraction with Ho\'oponopono and advanced law of attraction practices.',
      price: '₹2,099 - ₹20,999',
      href: '/courses/mind-reading/law-of-attraction',
      image: 'StarOutlined',
      imageUrl: '/assets/course/mind-reading/lawofattraction.png',
      level: 'Beginner to Advanced',
    },
    {
      name: 'Mid Brain Activation',
      description: 'Activate and develop your mid brain potential for enhanced intuition, memory, and mental abilities.',
      price: '₹5,099 - ₹20,999',
      href: '/courses/mind-reading/mid-brain-activation',
      image: 'Psychology',
      imageUrl: '/assets/course/mind-reading/midbrainactivation.png',
      level: 'All Ages',
    },
  ];

  return (
    <CourseListing
      title="Mind Reading Courses"
      subtitle="Manifestation, Law of Attraction & Mid Brain Activation"
      description="Master the power of your mind and consciousness. Learn manifestation techniques, law of attraction principles, and mid brain activation for creating extraordinary life outcomes."
      courses={courses}
    />
  );
}
