import { Metadata } from 'next';
import CourseDetail from '@/components/courseDetail/courseDetail';

export const metadata: Metadata = {
  title: 'Magnet Therapy Course | Magnetic Healing Training | REHAS',
  description:
    'Master magnet therapy - the healing science of magnetic energy. Learn applications of magnetic therapy from basic to advanced levels with professional certification.',
  keywords: [
    'Magnet Therapy',
    'Magnetic Healing',
    'Magnet Therapy Training',
    'Magnetic Energy Healing',
    'Wellness Therapy',
    'Alternative Healing',
  ],
  openGraph: {
    title: 'Magnet Therapy Course | REHAS',
    description: 'Professional training in magnet therapy and magnetic healing techniques.',
    type: 'website',
  },
};

export default function MagnetTherapyCoursePage() {
  return (
    <CourseDetail
      courseName="Magnet Therapy Course"
      category="therapy"
      description="Learn the science and application of magnetic therapy for wellness and healing"
      meaning="Magnet therapy harnesses the natural power of magnetic fields to promote healing and wellness. This ancient healing modality uses magnetic energy to balance the body's natural electromagnetic field, improve circulation, reduce pain, and support the body's natural healing processes. Our comprehensive program teaches the principles of magnetic therapy, proper magnet application, treatment protocols, and how to establish a successful magnetic healing practice."
      benefit="Understanding of magnetic energy and bio-magnetism; Proper magnet placement techniques; Pain management and healing acceleration; Improved circulation and wellness; Treatment protocols for various conditions; Professional practice credentials"
      use="Personal wellness and pain relief; Professional magnet therapy practice; Wellness center services; Sports injury recovery; Chronic pain management; Complementary healing services"
      price="₹2,099 - ₹24,999"
      duration="3 days - 45 days"
      level="Beginner to Advanced"
      image="/assets/course/reikiCourse.png"
      sessions={[
        {
          name: 'Basic Magnet Course',
          duration: '3 days',
          description: 'Introduction to magnet therapy principles and basic application techniques.',
          price: '₹2,099',
          originalPrice: '₹2,099',
          includes: [
            'Magnet therapy fundamentals',
            'Magnetic energy principles',
            'Basic magnet placement techniques',
            'Safety guidelines and precautions',
            'Common conditions and applications',
            'Course materials and resources',
          ],
        },
        {
          name: 'Practitioner Magnet Course',
          duration: '21 days',
          description: 'Comprehensive practitioner-level training in magnet therapy techniques and protocols.',
          price: '₹10,999',
          originalPrice: '₹10,999',
          includes: [
            'Advanced magnetic principles',
            'Magnetic field applications',
            'Treatment protocols for conditions',
            'Client assessment and consultation',
            'Anatomy and magnet therapy integration',
            'Professional practice standards',
            'Hands-on practice sessions',
            'Professional certification',
          ],
        },
        {
          name: 'Advanced Magnet Course with Kit',
          duration: '45 days',
          description: 'Advanced training with complete magnet therapy kit and professional practice development.',
          price: '₹24,999',
          originalPrice: '₹24,999',
          includes: [
            'Advanced therapy techniques',
            'Specialized applications and protocols',
            'Complete magnet therapy kit included',
            'Professional practice development',
            'Business and marketing strategies',
            'Client management systems',
            'Master-level certification',
            'Lifetime mentorship and support',
          ],
        },
      ]}
      pricingPlans={[
        {
          name: 'Basic Magnet Course',
          duration: '3 days',
          price: '₹2,099',
          originalPrice: '₹3,099',
          description: 'Introduction to magnet therapy fundamentals and basic application techniques for personal wellness.',
          includes: [
            'Magnet therapy fundamentals',
            'Magnetic energy principles',
            'Basic magnet placement techniques',
            'Safety guidelines and precautions',
            'Common conditions and applications',
            'Course materials and resources',
          ],
        },
        {
          name: 'Practitioner Magnet Course',
          duration: '21 days',
          price: '₹10,999',
          originalPrice: '₹14,999',
          description: 'Comprehensive practitioner-level training with professional treatment protocols and client services.',
          includes: [
            'Advanced magnetic principles',
            'Magnetic field applications',
            'Treatment protocols for conditions',
            'Client assessment and consultation',
            'Anatomy and magnet therapy integration',
            'Professional practice standards',
            'Hands-on practice sessions',
            'Professional certification',
          ],
        },
        {
          name: 'Advanced Magnet Course with Kit',
          duration: '45 days',
          price: '₹24,999',
          originalPrice: '₹29,999',
          description: 'Master-level training with complete magnet therapy kit for establishing professional healing practice.',
          includes: [
            'Advanced therapy techniques',
            'Specialized applications and protocols',
            'Complete magnet therapy kit included',
            'Professional practice development',
            'Business and marketing strategies',
            'Client management systems',
            'Master-level certification',
            'Lifetime mentorship and support',
          ],
        },
      ]}
      curriculum={[
        {
          title: 'Module 1 - Magnetic Energy Fundamentals',
          description: 'Learn the science of magnetism, bio-magnetism, and how magnetic fields affect the human body.',
        },
        {
          title: 'Module 2 - Magnet Application Techniques',
          description: 'Master magnet placement, polarity understanding, and proper application methods for various conditions.',
        },
        {
          title: 'Module 3 - Treatment Protocols & Conditions',
          description: 'Develop effective treatment protocols for pain management, healing acceleration, and wellness optimization.',
        },
        {
          title: 'Module 4 - Professional Practice Development',
          description: 'Build your magnet therapy practice with business strategies, client management, and ethical standards.',
        },
      ]}
    />
  );
}
