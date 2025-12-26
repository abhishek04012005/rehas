import { Metadata } from 'next';
import CourseDetail from '@/components/courseDetail/courseDetail';

export const metadata: Metadata = {
  title: 'Acupressure Certification | Professional Therapy Training | REHAS',
  description:
    'Master acupressure therapy with our comprehensive certification program. Learn pressure point techniques and healing applications from certified experts.',
  keywords: [
    'Acupressure Training',
    'Acupressure Certification',
    'Pressure Point Therapy',
    'Acupressure Techniques',
    'Professional Therapy',
    'Healing Therapy',
  ],
  openGraph: {
    title: 'Acupressure Certification | REHAS',
    description: 'Professional training in acupressure therapy techniques.',
    type: 'website',
  },
};

export default function AcupressureCoursePage() {
  return (
    <CourseDetail
      courseName="Acupressure Therapy Course"
      category="therapy"
      description="Master the art of pressure point therapy and traditional acupressure healing techniques"
      meaning="Acupressure is an ancient healing technique that uses finger and hand pressure on specific body points to relieve pain and promote wellness. Our comprehensive program teaches you the anatomical points, meridian pathways, and practical techniques to treat various health conditions. Through hands-on practice and mentorship, you'll develop the skills to establish a successful acupressure healing practice."
      benefit="Knowledge of 360+ acupressure points; Meridian system understanding; Pain relief techniques; Treatment protocols for common ailments; Professional practice development; Client relationship management"
      use="Therapeutic pain management; Professional acupressure practice; Wellness center services; Sports injury treatment; Stress and tension relief; Integration with other healing modalities"
      price="₹2,099 - ₹24,999"
      duration="3 days - 45 days"
      level="Beginner to Advanced"
      image="/assets/course/reikiCourse.png"
      sessions={[
        {
          name: 'Basic Acupressure Course',
          duration: '3 days',
          description: 'Introduction to acupressure fundamentals and basic pressure point techniques.',
          price: '₹2,099',
          originalPrice: '₹2,099',
          includes: [
            'Acupressure fundamentals',
            'Basic point locations and functions',
            'Hand and finger techniques',
            'Introduction to meridians',
            'Self-treatment methods',
            'Course materials',
          ],
        },
        {
          name: 'Practitioner Acupressure Course',
          duration: '21 days',
          description: 'Comprehensive practitioner-level training in acupressure techniques and protocols.',
          price: '₹10,999',
          originalPrice: '₹19,999',
          includes: [
            'Complete acupressure point training',
            'Meridian system mastery',
            'Advanced technique practice',
            'Treatment protocols for common conditions',
            'Client consultation skills',
            'Professional certification',
            'Hands-on practice sessions',
          ],
        },
        {
          name: 'Advanced Acupressure Course',
          duration: '45 days',
          description: 'Advanced training with specialized techniques and professional practice development.',
          price: '₹24,999',
          originalPrice: '₹27,999',
          includes: [
            'Advanced point combinations',
            'Specialized treatment approaches',
            'Business and practice development',
            'Marketing and client management',
            'Integration with other therapies',
            'Master-level certification',
            'Lifetime mentorship support',
          ],
        },
      ]}
      pricingPlans={[
        {
          name: 'Basic Acupressure Course',
          duration: '3 days',
          price: '₹2,099',
          originalPrice: '₹5,099',
          description: 'Perfect for beginners wanting to learn fundamental acupressure techniques and basic pressure point therapy.',
          includes: [
            'Acupressure fundamentals',
            'Basic point locations and functions',
            'Hand and finger techniques',
            'Introduction to meridians',
            'Self-treatment methods',
            'Digital course materials',
          ],
        },
        {
          name: 'Practitioner Acupressure Course',
          duration: '21 days',
          price: '₹10,999',
          originalPrice: '₹19,999',
          description: 'Comprehensive practitioner-level training covering advanced techniques and professional treatment protocols.',
          includes: [
            'Complete acupressure point training',
            'Meridian system mastery',
            'Advanced technique practice',
            'Treatment protocols for common conditions',
            'Client consultation skills',
            'Professional certification',
            'Hands-on practice sessions',
          ],
        },
        {
          name: 'Advanced Acupressure Course',
          duration: '45 days',
          price: '₹24,999',
          originalPrice: '₹29,999',
          description: 'Master-level training with specialized techniques and comprehensive professional practice development.',
          includes: [
            'Advanced point combinations',
            'Specialized treatment approaches',
            'Business and practice development',
            'Marketing and client management',
            'Integration with other therapies',
            'Master-level certification',
            'Lifetime mentorship support',
          ],
        },
      ]}
      curriculum={[
        {
          title: 'Module 1 - Fundamentals & Anatomy',
          description: 'Learn the history of acupressure, human anatomy, and how the technique affects body systems.',
        },
        {
          title: 'Module 2 - Meridian System & Points',
          description: 'Master the 12 meridians and 360+ major acupressure points with accurate location techniques.',
        },
        {
          title: 'Module 3 - Treatment Techniques',
          description: 'Learn specific techniques for different conditions including pain relief, relaxation, and wellness.',
        },
        {
          title: 'Module 4 - Professional Practice',
          description: 'Develop client protocols, build your practice, manage ethical standards, and provide professional services.',
        },
      ]}
    />
  );
}
