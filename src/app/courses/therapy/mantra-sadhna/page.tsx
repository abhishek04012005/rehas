import { Metadata } from 'next';
import CourseDetail from '@/components/courseDetail/courseDetail';

export const metadata: Metadata = {
  title: 'Practice Star Mantra Sadhna Course | Advanced Mantra Training | REHAS',
  description:
    'Intensive practice course for developing mantra mastery through daily sadhna and spiritual discipline with Star Mantra techniques.',
  keywords: [
    'Mantra Sadhna',
    'Star Mantra',
    'Advanced Mantra Training',
    'Spiritual Practice',
    'Mantra Discipline',
    'Mantra Certification',
  ],
  openGraph: {
    title: 'Practice Star Mantra Sadhna Course | REHAS',
    description: 'Intensive mantra practice for mastery through daily sadhna and spiritual discipline.',
    type: 'website',
  },
};

export default function MantaSadhnaPage() {
  return (
    <CourseDetail
      courseName="Practice Star Mantra Sadhna Course"
      category="therapy"
      description="Intensive practice course for developing mantra mastery through daily sadhna and spiritual discipline with advanced Star Mantra techniques"
      meaning="Sadhna refers to spiritual practice and discipline. This advanced course combines daily mantra practice with Star Mantra techniques to develop deep mastery of sacred sound and vibration. Through consistent practice and spiritual discipline, you'll unlock the transformative power of mantras for consciousness expansion and spiritual growth."
      benefit="Advanced mantra mastery; Daily practice protocols; Spiritual discipline development; Star Mantra techniques; Professional certification; Advanced chanting skills; Deepened consciousness"
      use="Professional mantra teaching; Advanced personal practice; Spiritual transformation; Building a mantra practice business; Teaching others"
      price="₹15,000"
      originalPrice="₹22,500"
      duration="8-10 weeks"
      level="All Levels"
      image="AutoAwesome"
      sessions={[
        {
          name: 'Practice Star Mantra Sadhna Course',
          duration: 'Intermediate Program',
          description: 'Intensive practice course for developing mantra mastery through daily sadhna and spiritual discipline.',
          price: '₹15,000',
          originalPrice: '₹22,500',
          includes: [
            'Star Mantra Sadhna training',
            'Daily practice protocols',
            'Advanced chanting techniques',
            'Spiritual discipline guidance',
            'Progress tracking and feedback',
            'Professional certification',
            'Ongoing mentorship',
            'Practice tracking tools',
          ],
        },
      ]}
      curriculum={[
        {
          title: 'Module 1 - Sadhna Foundation',
          description:
            'Understanding spiritual discipline and the importance of daily practice for mantra mastery.',
        },
        {
          title: 'Module 2 - Star Mantra Techniques',
          description:
            'Learn specialized Star Mantra techniques and how to incorporate them into your daily sadhna practice.',
        },
        {
          title: 'Module 3 - Advanced Practice',
          description:
            'Develop advanced chanting techniques and deepen your spiritual practice with guided protocols.',
        },
        {
          title: 'Module 4 - Mastery and Teaching',
          description:
            'Achieve mantra mastery and learn how to guide others in their mantra sadhna practice professionally.',
        },
      ]}
    />
  );
}
