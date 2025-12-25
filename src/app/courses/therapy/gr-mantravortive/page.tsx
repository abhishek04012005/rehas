import { Metadata } from 'next';
import CourseDetail from '@/components/courseDetail/courseDetail';

export const metadata: Metadata = {
  title: 'Masters GR Mantravortive Sadhan Course | Advanced Mantra Mastery | REHAS',
  description:
    'Advanced mantra mastery course covering GR mantras and tantric mantra applications for profound spiritual awakening and transformation.',
  keywords: [
    'Masters GR Mantravortive',
    'Advanced Mantra Mastery',
    'Tantric Mantras',
    'GR Mantras',
    'Spiritual Awakening',
    'Mantra Certification',
  ],
  openGraph: {
    title: 'Masters GR Mantravortive Sadhan Course | REHAS',
    description: 'Advanced mantra mastery covering GR mantras and tantric applications for spiritual awakening.',
    type: 'website',
  },
};

export default function GRMantravortivePage() {
  return (
    <CourseDetail
      courseName="Masters GR Mantravortive Sadhan Course"
      category="therapy"
      description="Advanced mantra mastery course covering GR mantras and tantric mantra applications for profound spiritual awakening and transformation"
      meaning="GR Mantravortive Sadhan represents the highest level of mantra mastery, combining ancient GR mantras with tantric principles. This master-level course teaches you to work with the most powerful sacred sounds and their applications in consciousness expansion, spiritual awakening, and transformation of self and others."
      benefit="Master-level mantra training; GR mantra expertise; Tantric mantra applications; Consciousness expansion work; Advanced spiritual practices; Master certification; Teaching credentials; Lifetime expertise"
      use="Professional master mantra practice; Teaching all mantra levels; Advanced spiritual mentorship; Building comprehensive mantra business; Spiritual authority and leadership"
      price="₹25,000"
      originalPrice="₹37,500"
      duration="12-16 weeks"
      level="Advanced"
      image="/assets/course/reikiCourse.png"
      sessions={[
        {
          name: 'Masters GR Mantravortive Sadhan Course',
          duration: 'Advanced Mastery',
          description: 'Advanced mantra mastery course covering GR mantras and tantric mantra applications for profound spiritual awakening.',
          price: '₹25,000',
          originalPrice: '₹37,500',
          includes: [
            'Master-level mantra training',
            'GR mantravortive techniques',
            'Tantric mantra applications',
            'Consciousness expansion work',
            'Advanced spiritual practices',
            'Master certification',
            'Lifetime instructor support',
            'Teaching credential training',
            'Advanced initiation rituals',
          ],
        },
      ]}
      curriculum={[
        {
          title: 'Module 1 - GR Mantra Philosophy',
          description:
            'Deep understanding of GR mantras, their sacred origins, and their role in spiritual transformation and awakening.',
        },
        {
          title: 'Module 2 - Tantric Mantra Applications',
          description:
            'Learn how to apply tantric principles to mantra practice for accelerated consciousness expansion and transformation.',
        },
        {
          title: 'Module 3 - Master-Level Practice',
          description:
            'Advanced spiritual practices and techniques for achieving mantra mastery and enlightenment.',
        },
        {
          title: 'Module 4 - Teaching and Leadership',
          description:
            'Complete training in teaching all levels of mantra practice, mentoring students, and becoming a recognized master in the field.',
        },
      ]}
    />
  );
}
