import { Metadata } from 'next';
import CourseListing from '@/components/courseListing/courseListing';
import { createMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = createMetadata(
  'Healing Courses | Reiki, Mantra, Tantra | REHAS',
  'Explore our comprehensive healing courses. Master Reiki, Mantra healing, and Tantra practices from certified experts with hands-on training.',
  [
    'Healing Courses',
    'Reiki Training',
    'Mantra Healing',
    'Tantra Practice',
    'Energy Healing',
    'Healing Certification',
    'Professional Healing Training',
    'Wellness Courses',
  ],
  '/courses/healing'
);

export default function HealingCoursesPage() {
  const courses = [
    {
      name: 'Reiki Healing',
      description: 'Master Reiki from basics to Grand Master level. Learn energy healing with attunements, symbols, and advanced techniques for personal and professional practice.',
      price: '₹1 - ₹34,999',
      originalPrice: '₹34,999',
      href: '/courses/healing/reiki',
      image: 'Favorite',
      imageUrl: '/assets/course/reikiCourse.png',
      level: 'Beginner to Master',
    },
    {
      name: 'Angel Blessing',
      description: 'Connect with angelic energy and learn divine healing. From basic blessing to advanced mastery with automatic writing and ascended master techniques.',
      price: '₹5,099 - ₹20,999',
      href: '/courses/healing/angel-blessing',
      image: 'AutoAwesome',
      imageUrl: '/assets/course/healing/angelblessing.png',
      level: 'Beginner to Advanced',
    },
    {
      name: 'Lama Fera',
      description: 'Learn the powerful Lama Fera healing system combined with Salvik Mantra and Yogya Maya techniques for complete spiritual transformation.',
      price: '₹5,099 - ₹20,999',
      href: '/courses/healing/lamafera',
      image: 'Spa',
      imageUrl: '/assets/course/healing/lamaferra.png',
      level: 'Beginner to Advanced',
    },
  ];

  return (
    <CourseListing
      title="Healing Courses"
      subtitle="Master Ancient & Modern Healing Practices"
      description="Learn professional healing skills through our comprehensive courses. Transform lives, build a healing practice, and master multiple modalities with certified masters."
      courses={courses}
    />
  );
}
