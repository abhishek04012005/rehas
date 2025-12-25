import { Metadata } from 'next';
import CourseDetail from '@/components/courseDetail/courseDetail';

export const metadata: Metadata = {
  title: 'Grand Master Reiki | Ultimate Healing Mastery | REHAS',
  description:
    'Master the highest levels of Reiki practice and become a Grand Master with advanced techniques and teaching credentials. Ultimate Reiki certification program.',
  keywords: [
    'Grand Master Reiki',
    'Reiki Master',
    'Ultimate Reiki',
    'Reiki Mastery',
    'Advanced Energy Healing',
    'Teaching Reiki',
  ],
  openGraph: {
    title: 'Grand Master Reiki | REHAS',
    description: 'Master the highest levels of Reiki practice and become a Grand Master.',
    type: 'website',
  },
};

export default function GrandMasterPage() {
  return (
    <CourseDetail
      courseName="Grand Master"
      category="healing"
      description="Master the highest levels of Reiki practice and become a Grand Master with advanced techniques and teaching credentials."
      meaning="The Grand Master level represents the pinnacle of Reiki training and personal transformation. This intensive program builds upon all previous Reiki knowledge, introducing you to the deepest sacred practices, consciousness expansion techniques, and the art of teaching Reiki at the highest levels. Grand Masters are equipped to conduct advanced healing sessions, teach multiple Reiki levels, and guide others in their spiritual journey with profound mastery and integrity."
      benefit="Highest level of Reiki mastery; Grand Master certification and credentials; Advanced consciousness expansion; Teaching all Reiki levels; Spiritual enlightenment pathway; Professional expertise; Lifetime mastery and support"
      use="Professional Reiki Master practice; Teaching Reiki at all levels; Conducting advanced healing sessions; Building a comprehensive healing business; Spiritual mentorship; Professional healing authority"
      price="₹35,000"
      originalPrice="₹52,500"
      duration="5-6 months"
      level="Master"
      image="/assets/course/grandmasterreiki.png"
      sessions={[
        {
          name: 'Grand Master',
          duration: 'Intensive Specialization',
          description: 'Master the highest levels of Reiki practice and become a Grand Master with advanced techniques and teaching credentials.',
          price: '₹35,000',
          originalPrice: '₹52,500',
          includes: [
            'Grand Master level training',
            'Advanced spiritual practices',
            'Professional certification',
            'Complete training materials',
            'Lifetime instructor support',
            'Teaching credential training',
            'Advanced initiation rituals',
            'Personal mentorship and guidance',
          ],
        },
      ]}
      curriculum={[
        {
          title: 'Module 1 - Advanced Reiki Mastery',
          description:
            'Comprehensive review and deepening of all Reiki levels, exploring the profound depths of energy work and consciousness.',
        },
        {
          title: 'Module 2 - Grand Master Initiation',
          description:
            'Advanced initiations and attunements that activate your ability to teach and transmit Reiki at the highest levels.',
        },
        {
          title: 'Module 3 - Spiritual Mastery',
          description:
            'Deep spiritual practices, consciousness expansion, and mastery of mind, energy, and spirit integration.',
        },
        {
          title: 'Module 4 - Teaching and Leadership',
          description:
            'Complete training in teaching Reiki, establishing professional practice, mentoring students, and becoming a recognized authority in the field.',
        },
      ]}
    />
  );
}
