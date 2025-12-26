import { Metadata } from 'next';
import CourseDetail from '@/components/courseDetail/courseDetail';

export const metadata: Metadata = {
  title: 'Manifestation Courses | Law of Attraction & Creation | REHAS',
  description:
    'Master the science and practice of manifestation. Learn to attract your desires and create the life you want through proven techniques.',
  keywords: [
    'Manifestation Course',
    'Law of Attraction',
    'Manifestation Techniques',
    'Desire Fulfillment',
    'Reality Creation',
  ],
  openGraph: {
    title: 'Manifestation Courses | REHAS',
    description: 'Master manifestation techniques to attract and create your desires.',
    type: 'website',
  },
};

export default function ManifestationCourseDetailPage() {
  return (
    <CourseDetail
      courseName="Manifestation Courses"
      category="mind-reading"
      description="Learn the science and practice of manifestation to attract your desires and create the life you want"
      meaning="Manifestation is the art and science of consciously creating your reality by aligning your thoughts, emotions, and beliefs with your desires. Through understanding the principles of consciousness, vibration, and intention, you can manifest abundance, success, love, and fulfillment. Our comprehensive manifestation courses teach proven techniques, mental discipline, belief system transformation, and practical methods to attract what you truly desire."
      benefit="Clear manifestation techniques; Limiting belief removal; Vibration alignment; Conscious creation skills; Abundance attraction; Goal achievement acceleration; Life transformation abilities"
      use="Personal goal and dream manifestation; Career and financial abundance creation; Relationship and love attraction; Health and wellness manifestation; Spiritual growth and enlightenment; Professional life coaching"
      price="₹2,099 - ₹10,999"
      duration="21 days - 90 days"
      level="Beginner to Advanced"
      image="/assets/course/mind-reading/manifestation.png"
      sessions={[
        {
          name: 'Basic Manifestation Course',
          duration: '21 days',
          description: 'Introduction to manifestation principles and foundational techniques.',
          price: '₹2,099',
          originalPrice: '₹2,099',
          includes: [
            'Manifestation fundamentals',
            'Law of vibration and attraction',
            'Belief system basics',
            'Visualization techniques',
            'Daily manifestation practices',
            'Course materials',
          ],
        },
        {
          name: 'Manifestation Course',
          duration: '60 days',
          price: '₹5,099',
          originalPrice: '₹5,099',
          description: 'Comprehensive manifestation training with advanced techniques and applications.',
          includes: [
            'Complete manifestation system',
            'Advanced visualization and scripting',
            'Emotion and belief alignment',
            'Action-based manifestation',
            'Specific goal manifestation',
            'Professional coaching skills',
            'Extended support included',
          ],
        },
        {
          name: 'Advanced Manifestation Course',
          duration: '90 days',
          price: '₹10,999',
          originalPrice: '₹10,999',
          description: 'Master-level manifestation with rapid creation and professional application.',
          includes: [
            'Advanced manifestation mastery',
            'Quantum manifestation techniques',
            'Abundance consciousness development',
            'Multiple simultaneous manifestations',
            'Professional practice development',
            'Client transformation coaching',
            'Master certification',
            'Lifetime mentorship support',
          ],
        },
      ]}
      pricingPlans={[
        {
          name: 'Basic Manifestation Course',
          duration: '21 days',
          price: '₹2,099',
          originalPrice: '5,099',
          description: 'Perfect for beginners wanting to learn manifestation principles and foundational techniques.',
          includes: [
            'Manifestation fundamentals',
            'Law of vibration and attraction',
            'Belief system basics',
            'Visualization techniques',
            'Daily manifestation practices',
            'Digital course materials',
          ],
        },
        {
          name: 'Manifestation Course',
          duration: '60 days',
          price: '₹5,099',
          originalPrice: '₹9,099',
          description: 'Comprehensive manifestation training with advanced techniques for life transformation.',
          includes: [
            'Complete manifestation system',
            'Advanced visualization and scripting',
            'Emotion and belief alignment',
            'Action-based manifestation',
            'Specific goal manifestation',
            'Professional coaching skills',
            'Extended support included',
          ],
        },
        {
          name: 'Advanced Manifestation Course',
          duration: '90 days',
          price: '₹10,999',
          originalPrice: '₹19,999',
          description: 'Master-level manifestation training for rapid creation and professional coaching abilities.',
          includes: [
            'Advanced manifestation mastery',
            'Quantum manifestation techniques',
            'Abundance consciousness development',
            'Multiple simultaneous manifestations',
            'Professional practice development',
            'Client transformation coaching',
            'Master certification',
            'Lifetime mentorship support',
          ],
        },
      ]}
      curriculum={[
        {
          title: 'Module 1 - Manifestation Fundamentals',
          description: 'Learn the science of manifestation, law of attraction, vibration, and consciousness principles.',
        },
        {
          title: 'Module 2 - Belief & Emotion Mastery',
          description: 'Master belief transformation, emotional alignment, and vibrational frequency raising.',
        },
        {
          title: 'Module 3 - Advanced Manifestation Techniques',
          description: 'Learn visualization, scripting, journaling, and action-based manifestation methods.',
        },
        {
          title: 'Module 4 - Professional Manifestation Coaching',
          description: 'Develop coaching skills and help others manifest their goals and dreams.',
        },
      ]}
    />
  );
}
