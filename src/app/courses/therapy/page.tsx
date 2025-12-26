import { Metadata } from 'next';
import CourseListing from '@/components/courseListing/courseListing';

export const metadata: Metadata = {
  title: 'Therapy Courses | Acupressure, Marma, Auricular Therapy | REHAS',
  description:
    'Master professional healing therapies with our expert-led courses. Train in Acupressure, Marma Therapy, and Auricular Therapy with certification.',
  keywords: [
    'Therapy Courses',
    'Acupressure Training',
    'Marma Therapy Course',
    'Auricular Therapy',
    'Professional Therapy Certification',
    'Healing Therapy Training',
    'Therapist Certification',
  ],
  openGraph: {
    title: 'Therapy Courses | REHAS',
    description: 'Professional training and certification in healing therapies.',
    type: 'website',
  },
};

export default function TherapyCoursesPage() {
  const courses = [
    {
      name: 'Acupressure Therapy Course',
      description: '(Bijhures) Mantra Manifestation Work - Learn sacred mantras for manifestation and achieving your goals through sound vibrations',
      price: '₹4,999 - ₹24,999',
      originalPrice: '₹9,999 - ₹37,499',
      href: '/courses/therapy/acupressure',
      image: 'AudiotrackOutlined',
      level: 'Beginner to Advanced',
    },
    {
      name: 'Magnet Therapy Course',
      description: 'Intensive practice course for developing mantra mastery through daily sadhna and spiritual discipline',
      price: '₹4,999 - ₹24,999',
      originalPrice: '₹9,999 - ₹37,499',
      href: '/courses/therapy/magnet',
      image: 'AutoAwesome',
      level: 'All Levels',
    },
    {
      name: 'Marma Therapy Course',
      description: 'Advanced mantra mastery course covering GR mantras and tantric mantra applications for profound spiritual awakening',
      price: '₹4,999 - ₹24,999',
      originalPrice: '₹9,999 - ₹37,499',
      href: '/courses/therapy/marma',
      image: 'EmojiEventsOutlined',
      level: 'Advanced',
    },
  ];

  return (
    <CourseListing
      title="Therapy Courses"
      subtitle="Professional Certification in Healing Therapies"
      description="Master healing therapies through our professional courses. Learn traditional and modern therapeutic techniques with hands-on training from experienced practitioners."
      courses={courses}
    />
  );
}
