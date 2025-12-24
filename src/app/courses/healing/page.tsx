import { Metadata } from 'next';
import CourseListing from '@/components/courseListing/courseListing';

export const metadata: Metadata = {
  title: 'Healing Courses | Reiki, Mantra, Tantra | REHAS',
  description:
    'Explore our comprehensive healing courses. Master Reiki, Mantra healing, and Tantra practices from certified experts with hands-on training.',
  keywords: [
    'Healing Courses',
    'Reiki Training',
    'Mantra Healing',
    'Tantra Practice',
    'Energy Healing',
    'Healing Certification',
    'Professional Healing Training',
  ],
  openGraph: {
    title: 'Healing Courses | REHAS',
    description: 'Professional training in Reiki, Mantra, and Tantra healing modalities.',
    type: 'website',
  },
};

export default function HealingCoursesPage() {
  const courses = [
    {
      name: 'Reiki Mastery Program',
      description: 'Master the complete Reiki system including Basic Reiki, up to Master Level, Karuna Reiki, and Word Master courses',
      price: '₹8,000 - ₹35,000',
      href: '/courses/healing/reiki',
      image: 'Favorite',
      imageUrl: 'https://images.unsplash.com/photo-1544367567-0d0fcb009e0e?w=500&h=300&fit=crop',
      level: 'Beginner to Master',
    },
    {
      name: 'Mantra Healing Course',
      description: 'Learn sacred mantras including Bijhure Manifestation, Practice Star Mantra Sadhna, and Master GR Mantravartive Sadhan',
      price: '₹6,000 - ₹25,000',
      href: '/courses/healing/mantra',
      image: 'AudiotrackOutlined',
      imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=500&h=300&fit=crop',
      level: 'All Levels',
    },
    {
      name: 'Tantra Practices',
      description: 'Explore tantric philosophy and techniques for spiritual awakening and personal transformation',
      price: '₹7,000',
      href: '/courses/healing/tantra',
      image: 'ControlPoint',
      imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=300&fit=crop',
      level: 'Intermediate',
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
