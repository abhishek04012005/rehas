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
  const coursePrice = courseAstrologyData.sessions.types[0]?.price || '₹8,000-₹12,000';
  return (
    <CourseDetail
      courseName="Numerology Certification"
      category="astrology"
      description="Learn the science of numbers and their profound influence on life, destiny and personality"
      meaning="Numerology is the ancient science of numbers and their vibrations. Every number carries a unique energy and significance that influences our personality, life path, and destiny. Our numerology course teaches you to calculate and interpret life path numbers, personal year numbers, expression numbers, and more. You'll learn how numbers affect personality traits, relationships, career choices, and future events, and how to use this knowledge to guide yourself and others."
      benefit="Number meaning mastery; Life path number interpretation; Personal numerology calculation; Compatibility analysis; Career guidance through numbers; Business naming and timing"
      use="Personal life guidance and self-discovery; Relationship compatibility analysis; Career and business counseling; Naming guidance for businesses and children; Professional numerology consulting"
      price={coursePrice}
      duration="6-10 weeks"
      level="All Levels"
      image="CalculateOutlined"
      sessions={[
        {
          name: 'Weekend Intensive',
          duration: '2-3 weekends',
          description: 'Focused numerology training with number calculations and interpretations.',
          price: '₹6,000',
          includes: [
            'Number meanings study',
            'Life path calculation',
            'Personal number analysis',
            'Interpretation techniques',
            'Professional certification',
          ],
        },
        {
          name: 'Weekly Classes',
          duration: '6-10 weeks',
          description: 'Comprehensive weekly numerology training with practical applications.',
          price: '₹7,000',
          includes: [
            'Complete numerology system',
            'Weekly calculation practice',
            'Number combination analysis',
            'Client consultation practice',
            'Compatibility readings',
            'Professional certification',
          ],
        },
        {
          name: 'Online Course',
          duration: 'Self-paced',
          description: 'Video-based numerology learning with calculation tools.',
          price: '₹3,500',
          includes: [
            'Complete video modules',
            'Calculation spreadsheets',
            'Interpretation guides',
            'Lifetime access',
            'Email support',
            'Digital certificate',
          ],
        },
        {
          name: 'Private Training',
          duration: 'Customized',
          description: 'One-on-one personalized numerology training.',
          price: '₹1,000',
          includes: [
            'Personalized learning path',
            'One-on-one coaching',
            'Number analysis practice',
            'Flexible timing',
            'Direct mentorship',
            'Certification upon completion',
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
