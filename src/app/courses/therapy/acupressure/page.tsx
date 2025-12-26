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
      price="₹8,000"
      duration="8-12 weeks"
      level="Beginner to Advanced"
      image="/assets/course/reikiCourse.png"
      sessions={[
        {
          name: 'Weekend Intensive',
          duration: '3-4 weekends',
          description: 'Intensive acupressure training with hands-on point location and technique practice.',
          price: '₹6,000',
          originalPrice: '₹9,000',
          includes: [
            'Complete acupressure point training',
            'Meridian system study',
            'Hands-on technique practice',
            'Case studies and protocols',
            'Professional certification',
          ],
        },
        {
          name: 'Weekly Classes',
          duration: '8-12 weeks',
          description: 'Structured weekly sessions with theory and practical application.',
          price: '₹10,000',
          originalPrice: '₹15,000',
          includes: [
            'Comprehensive point location training',
            'Weekly practice sessions',
            'Client interaction practice',
            'Anatomy and physiology study',
            'Business development guidance',
            'Professional certification',
          ],
        },
        {
          name: 'Online Course',
          duration: 'Self-paced',
          description: 'Video-based learning with acupressure charts and detailed guides.',
          price: '₹5,000',
          originalPrice: '₹7,500',
          includes: [
            'Complete video modules',
            'Acupressure point charts',
            'Treatment protocols',
            'Lifetime course access',
            'Email support',
            'Digital certificate',
          ],
        },
        {
          name: 'Private Training',
          duration: 'Customized',
          description: 'One-on-one personalized acupressure training.',
          price: '₹1,500',
          originalPrice: '₹2,250',
          includes: [
            'Personal training plan',
            'One-on-one mentorship',
            'Flexible scheduling',
            'Immediate feedback',
            'Direct instructor access',
            'Certification upon completion',
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
