import { Metadata } from 'next';
import CourseDetail from '@/components/courseDetail/courseDetail';

export const metadata: Metadata = {
  title: 'Mantra Healing Course | (Bijhures) Mantra Manifestation Work | REHAS',
  description:
    'Learn (Bijhures) Mantra Manifestation Work - sacred mantras for manifestation and achieving your goals through sound vibrations.',
  keywords: [
    'Mantra Healing',
    'Bijhures Mantra',
    'Manifestation Work',
    'Sacred Mantras',
    'Sound Healing',
    'Mantra Certification',
  ],
  openGraph: {
    title: 'Mantra Healing Course | REHAS',
    description: 'Learn sacred mantras for manifestation and achieving your goals.',
    type: 'website',
  },
};

export default function MantraHealingPage() {
  return (
    <CourseDetail
      courseName="Mantra Healing Course"
      category="therapy"
      description="(Bijhures) Mantra Manifestation Work - Learn sacred mantras for manifestation and achieving your goals through sound vibrations"
      meaning="Bijhures mantras are powerful sacred sounds designed for manifestation and goal achievement. This course teaches you the ancient art of using specific mantras to align your consciousness with your intentions and manifest them into reality through the power of sound vibration."
      benefit="Understanding manifestation mantras; Sound vibration mastery; Goal achievement techniques; Consciousness alignment; Personal empowerment; Practical manifestation skills"
      use="Personal goal manifestation; Building a manifestation practice; Teaching manifestation techniques; Personal development; Achieving life goals"
      price="₹6,000"
      originalPrice="₹10,000"
      duration="4-6 weeks"
      level="Beginner to Advanced"
      image="/assets/course/reikiCourse.png"
      sessions={[
        {
          name: 'Mantra Healing Course',
          duration: 'Foundation',
          description: '(Bijhures) Mantra Manifestation Work - Learn sacred mantras for manifestation.',
          price: '₹6,000',
          originalPrice: '₹10,000',
          includes: [
            'Bijhures mantra training',
            'Manifestation techniques',
            'Sound vibration mastery',
            'Goal-setting with mantras',
            'Practical applications',
            'Course materials and certificate',
            'Lifetime audio access',
          ],
        },
      ]}
      curriculum={[
        {
          title: 'Module 1 - Bijhures Foundation',
          description:
            'Understanding the philosophy of Bijhures mantras and how they work for manifestation through sound vibration.',
        },
        {
          title: 'Module 2 - Manifestation Techniques',
          description:
            'Learn specific techniques for using mantras to align your consciousness with your goals and intentions.',
        },
        {
          title: 'Module 3 - Sound Vibration Mastery',
          description:
            'Master the proper pronunciation and resonance of Bijhures mantras for maximum effectiveness.',
        },
        {
          title: 'Module 4 - Practical Application',
          description:
            'Apply manifestation mantras to achieve your personal and professional goals with confidence.',
        },
      ]}
    />
  );
}
