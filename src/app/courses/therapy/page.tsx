import { Metadata } from 'next';
import CourseListing from '@/components/courseListing/courseListing';
import { createMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = createMetadata(
  'Therapy Courses | Acupressure, Marma, Auricular Therapy | REHAS',
  'Master professional healing therapies with our expert-led courses. Train in Acupressure, Marma Therapy, and Auricular Therapy with certification.',
  [
    'Therapy Courses',
    'Acupressure Training',
    'Marma Therapy Course',
    'Auricular Therapy',
    'Professional Therapy Certification',
    'Healing Therapy Training',
    'Therapist Certification',
    'Online Therapy Course',
  ],
  '/courses/therapy'
);

export default function TherapyCoursesPage() {
  const courses = [
    {
      name: 'Acupressure Therapy Course',
      description: 'Learn traditional acupressure techniques for healing. Master pressure point therapy from basic to advanced levels with professional certification.',
      price: '₹2,099 - ₹24,999',
      originalPrice: '₹2,099 - ₹24,999',
      href: '/courses/therapy/acupressure',
      image: '/assets/course/therapy/acupressure.png',
      imageUrl: '/assets/course/therapy/acupressure.png',
      level: 'Beginner to Advanced',
    },
    {
      name: 'Magnet Therapy Course',
      description: 'Discover the healing power of magnetic therapy. Learn to use magnets for wellness and therapeutic applications across three progressive levels.',
      price: '₹2,099 - ₹24,999',
      originalPrice: '₹2,099 - ₹24,999',
      href: '/courses/therapy/magnet',
      image: '/assets/course/therapy/magnet.png',
      imageUrl: '/assets/course/therapy/magnet.png',
      level: 'Beginner to Advanced',
    },
    {
      name: 'Marma Therapy Course',
      description: 'Master the ancient art of Marma point therapy for deep healing through vital point stimulation and energy activation.',
      price: '₹2,099 - ₹50,999',
      originalPrice: '₹2,099 - ₹50,999',  
      href: '/courses/therapy/marma',
      image: '/assets/course/therapy/marma.png',
      imageUrl: '/assets/course/therapy/marma.png',
      level: 'Beginner to Advanced',
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
