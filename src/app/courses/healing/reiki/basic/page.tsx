import { Metadata } from 'next';
import CourseDetail from '@/components/courseDetail/courseDetail';

export const metadata: Metadata = {
  title: 'Basic Reiki Healing | Professional Healing Certification | REHAS',
  description:
    'Introduction to Reiki healing fundamentals and energy basics. Perfect for beginners who want to experience Reiki and discover its transformative power.',
  keywords: [
    'Basic Reiki',
    'Reiki Healing',
    'Energy Healing',
    'Beginner Reiki',
    'Reiki Introduction',
    'Healing Certification',
  ],
  openGraph: {
    title: 'Basic Reiki Healing | REHAS',
    description: 'Introduction to Reiki healing fundamentals and energy basics.',
    type: 'website',
  },
};

export default function BasicReikiPage() {
  return (
    <CourseDetail
      courseName="Basic Reiki Healing"
      category="healing"
      description="Introduction to Reiki healing fundamentals and energy basics. Perfect for beginners exploring this transformative practice."
      meaning="Reiki is a Japanese technique for stress reduction and healing that uses universal life force energy. This foundational course introduces you to the basic principles of Reiki, helping you understand how energy healing works and preparing you for deeper practice."
      benefit="Understanding Reiki fundamentals; Basic energy awareness; Introduction to healing practices; Stress reduction techniques; Foundational knowledge for advanced training"
      use="Personal wellness; Stress relief; Introduction to energy healing; Foundation for further training; Self-care practice"
      price="₹1"
      originalPrice="₹5,000"
      duration="1-2 weeks"
      level="Beginner"
      image="/assets/course/reikiCourse.png"
      sessions={[
        {
          name: 'Basic Reiki Healing',
          duration: 'Introductory',
          description: 'Introduction to Reiki healing fundamentals and energy basics.',
          price: '₹1',
          originalPrice: '₹5,000',
          includes: [
            'Basic Reiki introduction',
            'Energy awareness training',
            'Foundational techniques',
            'Practice guidance',
            'No commitment required',
            'Entry-level certification',
          ],
        },
      ]}
      curriculum={[
        {
          title: 'Module 1 - Introduction to Reiki',
          description:
            'Understand the history of Reiki, its origins, and basic principles. Learn how universal life force energy works.',
        },
        {
          title: 'Module 2 - Energy Body Basics',
          description:
            'Introduction to the human energy system, chakras, and how Reiki energy flows through the body.',
        },
        {
          title: 'Module 3 - Foundational Techniques',
          description:
            'Learn basic hand positions and fundamental techniques for self-healing and preparing for deeper practice.',
        },
        {
          title: 'Module 4 - Your Reiki Journey',
          description:
            'Guidance on continuing your Reiki practice and exploring advanced levels if you choose.',
        },
      ]}
    />
  );
}
