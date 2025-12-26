import { Metadata } from 'next';
import CourseDetail from '@/components/courseDetail/courseDetail';
import { courseAstrologyData } from '@/data/courseAstrology';

export const metadata: Metadata = {
  title: 'Numerology Certification | Number Science & Life Path | REHAS',
  description:
    'Master numerology with our professional certification program. Learn the science of numbers, their meanings, and their influence on life and destiny.',
  keywords: [
    'Numerology Course',
    'Numerology Certification',
    'Number Science',
    'Life Path Numbers',
    'Numerology Training',
    'Number Meanings',
  ],
  openGraph: {
    title: 'Numerology Certification | REHAS',
    description: 'Professional numerology training and certification.',
    type: 'website',
  },
};

export default function NumerologyCoursePage() {
  return (
    <CourseDetail
      courseName="Numerology Certification"
      category="astrology"
      description="Learn the science of numbers and their profound influence on life, destiny and personality"
      meaning="Numerology is the ancient science of numbers and their vibrations. Every number carries a unique energy and significance that influences our personality, life path, and destiny. Our numerology course teaches you to calculate and interpret life path numbers, personal year numbers, expression numbers, and more. You'll learn how numbers affect personality traits, relationships, career choices, and future events, and how to use this knowledge to guide yourself and others."
      benefit="Number meaning mastery; Life path number interpretation; Personal numerology calculation; Compatibility analysis; Career guidance through numbers; Business naming and timing"
      use="Personal life guidance and self-discovery; Relationship compatibility analysis; Career and business counseling; Naming guidance for businesses and children; Professional numerology consulting"
      price="₹5,099 - ₹20,999"
      duration="5 days - 90 days"
      level="All Levels"
      image="/assets/course/astrology/numerlogy.png"
      sessions={[
        {
          name: 'Basic Numerology with Lo-Shu-Grid',
          duration: '5 days',
          description: 'Introduction to numerology fundamentals and the ancient Lo-Shu-Grid system.',
          price: '₹5,099',
          originalPrice: '₹5,099',
          includes: [
            'Numerology basics',
            'Lo-Shu-Grid mastery',
            'Number meanings study',
            'Basic calculations',
            'Personal number interpretation',
            'Course materials',
          ],
        },
        {
          name: 'Practitioner Numerology Advanced Course',
          duration: '30 days',
          description: 'Comprehensive practitioner-level training with advanced numerology techniques.',
          price: '₹10,999',
          originalPrice: '₹10,999',
          includes: [
            'Complete numerology system',
            'Life path and destiny numbers',
            'Personal year calculations',
            'Compatibility analysis',
            'Business numerology',
            'Client consultation practice',
            'Professional certification',
          ],
        },
        {
          name: 'Bhartiya Ank Sastra',
          duration: '90 days',
          description: 'Master-level training in traditional Indian numerology system.',
          price: '₹20,999',
          originalPrice: '₹20,999',
          includes: [
            'Bhartiya Ank Sastra mastery',
            'Advanced prediction techniques',
            'Vedic numerology principles',
            'Specialized applications',
            'Professional practice development',
            'Marketing and client management',
            'Master certification',
            'Lifetime mentorship support',
          ],
        },
      ]}
      pricingPlans={[
        {
          name: 'Basic Numerology with Lo-Shu-Grid',
          duration: '5 days',
          price: '₹5,099',
          originalPrice: '₹7,099',
          description: 'Perfect for beginners wanting to learn numerology fundamentals and the ancient Lo-Shu-Grid system.',
          includes: [
            'Numerology basics',
            'Lo-Shu-Grid mastery',
            'Number meanings study',
            'Basic calculations',
            'Personal number interpretation',
            'Digital course materials',
          ],
        },
        {
          name: 'Practitioner Numerology Advanced Course',
          duration: '30 days',
          price: '₹10,999',
          originalPrice: '₹14,999',
          description: 'Comprehensive professional training with advanced numerology techniques and applications.',
          includes: [
            'Complete numerology system',
            'Life path and destiny numbers',
            'Personal year calculations',
            'Compatibility analysis',
            'Business numerology',
            'Client consultation practice',
            'Professional certification',
            'Extended support included',
          ],
        },
        {
          name: 'Bhartiya Ank Sastra',
          duration: '90 days',
          price: '₹20,999',
          originalPrice: '₹24,999',
          description: 'Master-level training in traditional Indian numerology with advanced predictions and specializations.',
          includes: [
            'Bhartiya Ank Sastra mastery',
            'Advanced prediction techniques',
            'Vedic numerology principles',
            'Specialized applications',
            'Professional practice development',
            'Marketing and client management',
            'Master certification',
            'Lifetime mentorship support',
          ],
        },
      ]}
      curriculum={[
        {
          title: 'Module 1 - Numerology Basics & Number Meanings',
          description: 'Learn the history of numerology, significance of single digits, and how numbers influence human life.',
        },
        {
          title: 'Module 2 - Personal Number Calculations',
          description: 'Master life path, expression, personality, and destiny numbers. Calculate and interpret personal numerology.',
        },
        {
          title: 'Module 3 - Advanced Numerology Analysis',
          description: 'Learn personal year numbers, compatibility analysis, business numerology, and predictive techniques.',
        },
        {
          title: 'Module 4 - Professional Numerology Practice',
          description: 'Develop client consultations, create personalized numerology reports, and build your numerology practice.',
        },
      ]}
    />
  );
}
