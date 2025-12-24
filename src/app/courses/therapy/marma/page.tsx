import { Metadata } from 'next';
import CourseDetail from '@/components/courseDetail/courseDetail';

export const metadata: Metadata = {
  title: 'Marma Therapy Course | Ancient Healing Science | REHAS',
  description:
    'Learn Marma therapy - the Ayurvedic science of vital points. Comprehensive course in traditional marma point therapy and healing applications.',
  keywords: [
    'Marma Therapy',
    'Marma Points',
    'Ayurvedic Healing',
    'Marma Certification',
    'Vital Points Therapy',
    'Traditional Healing',
  ],
  openGraph: {
    title: 'Marma Therapy Course | REHAS',
    description: 'Master the ancient science of marma points for therapeutic healing.',
    type: 'website',
  },
};

export default function MarmaTherapyCoursePage() {
  return (
    <CourseDetail
      courseName="Marma Therapy Course"
      category="therapy"
      description="Learn the ancient science of marma points for deep therapeutic healing and wellness"
      meaning="Marma therapy is an ancient Ayurvedic healing system that works with 108 vital energy points on the body. These marma points are junctions of consciousness and matter where disease can be prevented and health promoted. Our course teaches the science of marmas, how to locate and stimulate them for deep therapeutic benefits, and how to create effective treatment protocols for various conditions."
      benefit="Understanding of 108 vital marma points; Energy system knowledge; Deep healing capabilities; Treatment for chronic conditions; Prevention and wellness promotion; Integration with modern healthcare"
      use="Therapeutic healing practice; Wellness and preventive care; Integration with massage and bodywork; Ayurvedic healing services; Professional marma therapy practice; Spiritual health optimization"
      price="₹10,000"
      duration="Foundation & Intermediate"
      level="All Levels"
      image="PanToolOutlined"
      sessions={[
        {
          name: 'Marma Therapy Basic & Practice Course',
          duration: 'Foundation & Intermediate Level',
          description: 'Comprehensive marma therapy training from fundamentals to professional practice.',
          price: '₹10,000',
          includes: [
            'Ayurvedic principles and marma philosophy',
            'Anatomy of 108 vital marma points',
            'Assessment and diagnostics',
            'Traditional marma therapy techniques',
            'Hands-on practice and case studies',
            'Professional practice protocols',
            'Certification in Marma Therapy',
          ],
        },
      ]}
      curriculum={[
        {
          title: 'Module 1 - Marma Science Foundations',
          description: 'Learn Ayurvedic philosophy, the concept of marmas, their energetic nature, and significance in healing.',
        },
        {
          title: 'Module 2 - The 108 Marma Points',
          description: 'Master location, characteristics, and functions of all 108 vital points throughout the body.',
        },
        {
          title: 'Module 3 - Stimulation & Treatment',
          description: 'Learn techniques for stimulating marmas, creating protocols, and treating specific health conditions.',
        },
        {
          title: 'Module 4 - Professional Marma Practice',
          description: 'Develop client consultations, assessment methods, treatment planning, and business development.',
        },
      ]}
    />
  );
}
