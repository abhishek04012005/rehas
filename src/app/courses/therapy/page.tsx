import { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { courseTherapyData } from '@/data/courseTherapy';

export const metadata: Metadata = {
  title: 'Therapy Courses | Professional Certification | REHAS',
  description:
    'Master healing therapies with our professional courses. Learn Acupressure, Marma Therapy, Auricular Therapy from experienced practitioners.',
  keywords: [
    'Therapy Courses',
    'Acupressure Training',
    'Therapy Certification',
    'Marma Course',
    'Professional Therapy',
    'Healing Diploma',
    'Therapist Training',
  ],
  openGraph: {
    title: 'Therapy Courses | REHAS',
    description: 'Professional training and certification in healing therapies.',
    type: 'website',
  },
};

export default function TherapyCoursesPage() {
  return <HealingService data={courseTherapyData} />;
}
