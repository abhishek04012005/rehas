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
      price="₹2,099 - ₹50,999"
      duration="3 days - 90 days"
      level="Beginner to Advanced"
      image="/assets/course/therapy/marma.png"
      sessions={[
        {
          name: 'Basic Marma Course',
          duration: '3 days',
          description: 'Introduction to marma therapy philosophy and basic point location techniques.',
          price: '₹2,099',
          originalPrice: '₹2,099',
          includes: [
            'Marma therapy fundamentals',
            'Introduction to 108 vital points',
            'Basic stimulation techniques',
            'Ayurvedic principles overview',
            'Self-treatment introduction',
            'Course materials',
          ],
        },
        {
          name: 'Practitioner Marma Course',
          duration: '60 days',
          description: 'Comprehensive practitioner-level training in marma science and advanced therapeutic applications.',
          price: '₹50,999',
          originalPrice: '₹50,999',
          includes: [
            'Deep marma philosophy and science',
            'Mastery of all 108 marma points',
            'Advanced stimulation methods',
            'Treatment protocols for various conditions',
            'Client assessment and diagnostics',
            'Professional practice development',
            'Master certification',
          ],
        },
        {
          name: 'Advanced Marma Course',
          duration: '90 days',
          description: 'Advanced specialized training with integration into professional healing practice.',
          price: '₹10,999',
          originalPrice: '₹10,999',
          includes: [
            'Advanced marma combinations',
            'Specialized therapeutic applications',
            'Energy system integration',
            'Business development strategies',
            'Marketing and client management',
            'Advanced certification',
            'Lifetime mentorship support',
          ],
        },
      ]}
      pricingPlans={[
        {
          name: 'Basic Marma Course',
          duration: '3 days',
          price: '₹2,099',
          originalPrice: '₹3,099',
          description: 'Introduction to marma therapy philosophy and basic point location techniques for personal healing.',
          includes: [
            'Marma therapy fundamentals',
            'Introduction to 108 vital points',
            'Basic stimulation techniques',
            'Ayurvedic principles overview',
            'Self-treatment introduction',
            'Digital course materials',
          ],
        },
        {
          name: 'Practitioner Marma Course',
          duration: '60 days',
          price: '₹5,099',
          originalPrice: '₹10,099',
          description: 'Comprehensive practitioner-level training in marma science with advanced therapeutic applications.',
          includes: [
            'Deep marma philosophy and science',
            'Mastery of all 108 marma points',
            'Advanced stimulation methods',
            'Treatment protocols for various conditions',
            'Client assessment and diagnostics',
            'Professional practice development',
            'Master certification',
            'Extended mentorship support',
          ],
        },
        {
          name: 'Advanced Marma Course',
          duration: '90 days',
          price: '₹10,999',
          originalPrice: '₹19,999',
          description: 'Advanced specialized training with complete integration into professional healing practice.',
          includes: [
            'Advanced marma combinations',
            'Specialized therapeutic applications',
            'Energy system integration',
            'Business development strategies',
            'Marketing and client management',
            'Advanced certification',
            'Lifetime mentorship support',
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
