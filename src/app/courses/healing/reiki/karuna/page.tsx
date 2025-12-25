import { Metadata } from 'next';
import CourseDetail from '@/components/courseDetail/courseDetail';

export const metadata: Metadata = {
  title: 'Karuna Reiki | Advanced Healing Certification | REHAS',
  description:
    'Advanced Karuna Reiki training focusing on compassion and advanced healing techniques. Specialized Reiki certification program for experienced practitioners.',
  keywords: [
    'Karuna Reiki',
    'Advanced Reiki',
    'Reiki Specialization',
    'Compassion Healing',
    'Advanced Energy Healing',
    'Reiki Certification',
  ],
  openGraph: {
    title: 'Karuna Reiki | REHAS',
    description: 'Advanced Karuna Reiki training for deeper healing and transformation.',
    type: 'website',
  },
};

export default function KarunaReikiPage() {
  return (
    <CourseDetail
      courseName="Karuna Reiki"
      category="healing"
      description="Advanced Karuna Reiki training focusing on compassion and advanced healing techniques for deeper transformation."
      meaning="Karuna Reiki, meaning 'compassion' in Sanskrit, is an advanced form of Reiki that builds upon the foundation of traditional Reiki. This specialized training introduces you to powerful advanced symbols and techniques designed for deeper emotional healing, karmic clearing, and consciousness expansion. Karuna Reiki combines the universal life force energy of Reiki with compassion-focused practices for profound transformation."
      benefit="Advanced healing symbols and techniques; Deeper emotional and karmic healing; Distance healing mastery; Professional specialization; Teaching Karuna Reiki to others; Compassion-centered practice; Enhanced consciousness expansion"
      use="Advanced professional healing; Specialized healing services; Teaching advanced Reiki; Deeper personal transformation; Specialized client sessions"
      price="₹10,000"
      originalPrice="₹15,000"
      duration="2-3 months"
      level="Advanced"
      image="/assets/course/karungaReiki.png"
      sessions={[
        {
          name: 'Karuna Reiki',
          duration: 'Advanced Specialization',
          description: 'Advanced Karuna Reiki training focusing on compassion and advanced healing techniques.',
          price: '₹10,000',
          originalPrice: '₹15,000',
          includes: [
            'Karuna Reiki symbols',
            'Advanced healing techniques',
            'Compassion-focused practice',
            'Distance healing methods',
            'Professional certification',
            'Practical applications',
            'Follow-up support',
            'Teaching credential preparation',
          ],
        },
      ]}
      curriculum={[
        {
          title: 'Module 1 - Karuna Philosophy',
          description:
            'Understanding compassion-centered healing and the deeper aspects of Reiki energy work through Karuna principles.',
        },
        {
          title: 'Module 2 - Karuna Symbols and Attunements',
          description:
            'Master the powerful Karuna Reiki symbols and receive your advanced attunements for working with these energies.',
        },
        {
          title: 'Module 3 - Advanced Healing Techniques',
          description:
            'Learn specialized techniques for emotional release, karmic clearing, and profound healing transformations.',
        },
        {
          title: 'Module 4 - Professional Practice',
          description:
            'Guidance on offering Karuna Reiki services professionally and teaching this advanced modality to others.',
        },
      ]}
    />
  );
}
