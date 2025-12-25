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
      name: 'Basic Reiki Healing',
      description: 'Introduction to Reiki healing fundamentals and energy basics. Perfect for beginners who want to experience Reiki and discover its transformative power.',
      price: '₹1',
      originalPrice: '₹5,000',
      href: '/courses/healing/reiki',
      image: 'Favorite',
      imageUrl: 'https://images.unsplash.com/photo-1544367567-0d0fcb009e0e?w=500&h=300&fit=crop',
      level: 'Beginner',
    },
    {
      name: 'Reiki up to Master Level',
      description: 'Complete Reiki training from Level 1 to Master certification with full attunements and professional credentials.',
      price: '₹20,000',
      originalPrice: '₹30,000',
      href: '/courses/healing/reiki',
      image: 'Favorite',
      imageUrl: 'https://images.unsplash.com/photo-1544367567-0d0fcb009e0e?w=500&h=300&fit=crop',
      level: 'Beginner to Master',
    },
    {
      name: 'Karuna Reiki',
      description: 'Advanced Karuna Reiki training focusing on compassion and advanced healing techniques for deeper transformation.',
      price: '₹10,000',
      originalPrice: '₹15,000',
      href: '/courses/healing/reiki',
      image: 'Favorite',
      imageUrl: 'https://images.unsplash.com/photo-1544367567-0d0fcb009e0e?w=500&h=300&fit=crop',
      level: 'Advanced',
    },
    {
      name: 'Grand Master',
      description: 'Master the highest levels of Reiki practice and become a Grand Master with advanced techniques and teaching credentials.',
      price: '₹35,000',
      originalPrice: '₹52,500',
      href: '/courses/healing/reiki',
      image: 'Favorite',
      imageUrl: 'https://images.unsplash.com/photo-1544367567-0d0fcb009e0e?w=500&h=300&fit=crop',
      level: 'Master',
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
