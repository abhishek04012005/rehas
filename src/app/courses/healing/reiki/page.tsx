import { Metadata } from 'next';
import CourseDetail from '@/components/courseDetail/courseDetail';

export const metadata: Metadata = {
  title: 'Reiki & Mind Power Course | Professional Healing Certification | REHAS',
  description:
    'Master Reiki and Mind Power from foundational to Master level certification. Learn from certified experts with hands-on healing training.',
  keywords: [
    'Reiki Training',
    'Reiki & Mind Power',
    'Reiki Certification',
    'Energy Healing',
    'Reiki Master',
    'Professional Reiki Training',
    'Healing Certification',
  ],
  openGraph: {
    title: 'Reiki & Mind Power Course | REHAS',
    description: 'Complete Reiki and Mind Power training from foundational to Master certification.',
    type: 'website',
  },
};

export default function ReikiCoursePage() {
  return (
    <CourseDetail
      courseName="Reiki Healing"
      category="healing"
      description="Master the complete Reiki system from basics to Grand Master level with advanced healing techniques and spiritual development"
      meaning="Reiki is a Japanese technique for stress reduction and healing that uses universal life force energy. Our comprehensive program teaches you to become a certified Reiki practitioner and Grand Master, capable of healing yourself and others. Through hands-on training, attunements, symbols, and advanced techniques, you'll develop the ability to channel powerful healing energy and establish a successful healing practice."
      benefit="Complete Reiki system mastery; All four levels of attunements; Sacred symbols and techniques; Energy channeling ability; Spiritual growth and consciousness expansion; Professional healing credentials; Teaching and business development skills"
      use="Personal wellness and self-healing; Professional healing practice; Building a healing business; Spiritual transformation; Teaching and guiding others; Complementary wellness services"
      price="₹1 - ₹34,999"
      duration="3 days - 90 days (depending on level)"
      level="Beginner to Master"
      image="/assets/course/reikiCourse.png"
      originalPrice="₹34,999"
      curriculum={[
        {
          title: 'Level 1 - Foundation (Shoden)',
          description: 'Learn the history and principles of Reiki. Receive your first attunement to open the channel for universal energy. Develop self-healing abilities and basic healing techniques.',
        },
        {
          title: 'Level 2 - Intermediate (Okuden)',
          description: 'Master the three sacred symbols for enhancing healing energy. Learn distance healing techniques and develop practical skills for client sessions.',
        },
        {
          title: 'Level 3 - Advanced (Shimpiden)',
          description: 'Work with the Master symbol and deepen your spiritual practice. Learn advanced techniques and prepare to guide others in their healing journey.',
        },
        {
          title: 'Master Level - Grand Master',
          description: 'Become a Reiki Grand Master with highest level teachings. Learn business practices, ethical standards, teaching methods, and establish your professional healing practice.',
        },
      ]}
      pricingPlans={[
        {
          name: 'Basic Reiki Healing',
          duration: '3 days',
          price: '₹1',
          originalPrice: '₹999',
          description: 'Perfect for beginners wanting to experience and understand the power of Reiki energy healing and its transformative benefits.',
          includes: [
            'Level 1 attunement',
            'Reiki principles and history',
            'Self-healing techniques',
            'Energy awareness training',
            'Basic practice guidance',
            'Digital course materials',
          ],
        },
        {
          name: 'Reiki up to Master Level',
          duration: '30 days',
          price: '₹20,999',
          originalPrice: '₹29,999',
          description: 'Complete professional Reiki training covering all four levels with attunements, symbols, and credentials to practice professionally.',
          includes: [
            'Levels 1-4 with attunements',
            'All sacred symbols',
            'Advanced healing techniques',
            'Distance healing methods',
            'Professional certification',
            'Lifetime resource access',
            'Email support included',
          ],
        },
        {
          name: 'Karuna Reiki with Grand Master',
          duration: '90 days',
          price: '₹34,999',
          originalPrice: '₹49,999',
          description: 'Master the highest levels of Reiki including Karuna Reiki and Grand Master teachings with advanced spiritual techniques.',
          includes: [
            'Everything in Master Level',
            'Karuna Reiki advanced symbols',
            'Grand Master level training',
            'Advanced manifestation work',
            'Teaching certification',
            'Business building guidance',
            'Lifetime mentorship support',
          ],
        },
      ]}
    />
  );
}
