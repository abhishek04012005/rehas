import { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { courseHealingData } from '@/data/courseHealing';

export const metadata: Metadata = {
  title: 'Healing Courses | Professional Certification | REHAS',
  description:
    'Learn professional healing skills with our comprehensive courses. Master Reiki, Energy Healing, Chakra Balancing from certified experts.',
  keywords: [
    'Healing Courses',
    'Reiki Training',
    'Energy Healing Course',
    'Healing Certification',
    'Professional Training',
    'Chakra Course',
    'Healing School',
  ],
  openGraph: {
    title: 'Healing Courses | REHAS',
    description: 'Professional training in healing modalities and techniques.',
    type: 'website',
  },
};

export default function HealingCoursesPage() {
  return <HealingService data={courseHealingData} />;
}
