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
      name: 'Acupressure Certification',
      description: 'Master the art of pressure point therapy and traditional acupressure healing techniques',
      price: '₹8,000',
      href: '/courses/therapy/acupressure',
      image: 'TouchAppOutlined',
      level: 'Beginner to Advanced',
    },
    {
      name: 'Marma Therapy Course',
      description: 'Learn the ancient science of marma points for deep therapeutic healing and wellness',
      price: '₹7,000',
      href: '/courses/therapy/marma',
      image: 'PanToolOutlined',
      level: 'All Levels',
    },
    {
      name: 'Auricular Therapy Program',
      description: 'Discover ear acupuncture and auricular therapy for treating various health conditions',
      price: '₹6,000',
      href: '/courses/therapy/auricular',
      image: 'HearingOutlined',
      level: 'Intermediate',
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
