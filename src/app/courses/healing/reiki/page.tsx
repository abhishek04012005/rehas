import { Metadata } from 'next';
import CourseDetail from '@/components/courseDetail/courseDetail';

export const metadata: Metadata = {
  title: 'Reiki Mastery Program | Professional Healing Certification | REHAS',
  description:
    'Master Reiki from Level 1 to Master certification with our comprehensive program. Learn from certified experts with hands-on healing training.',
  keywords: [
    'Reiki Training',
    'Reiki Mastery',
    'Reiki Certification',
    'Energy Healing',
    'Reiki Master',
    'Professional Reiki Training',
    'Healing Certification',
  ],
  openGraph: {
    title: 'Reiki Mastery Program | REHAS',
    description: 'Complete Reiki training from Level 1 to Master certification.',
    type: 'website',
  },
};

export default function ReikiCoursePage() {
  return (
    <CourseDetail
      courseName="Reiki Mastery Program"
      category="healing"
      description="Master the complete Reiki system from fundamentals to advanced practices"
      meaning="Reiki is a Japanese technique for stress reduction and healing that uses universal life force energy. Our comprehensive program teaches you to become a certified Reiki practitioner and master, capable of healing yourself and others. Through hands-on training, attunements, and practical applications, you'll develop the ability to channel healing energy effectively."
      benefit="Hands-on healing ability; Energy perception and channeling; Spiritual growth and awareness; Stress reduction techniques; Personal transformation; Ability to help others heal"
      use="Personal wellness and healing; Professional healing practice; Complementary therapy; Spiritual development; Building a healing business; Family and friend healing"
      price="₹8,000"
      duration="2-3 months (varies by format)"
      level="Beginner to Master"
      image="Favorite"
      sessions={[
        {
          name: 'Basic Reiki Healing',
          duration: 'Introductory',
          description: 'Introduction to Reiki healing fundamentals and energy basics.',
          price: '₹1',
          originalPrice: '₹10,000',
          includes: [
            'Basic Reiki introduction',
            'Energy awareness training',
            'Foundational techniques',
            'Practice guidance',
          ],
        },
        {
          name: 'Reiki up to Master Level',
          duration: 'Comprehensive Program',
          description: 'Complete Reiki training from Level 1 to Master with full certifications.',
          price: '₹20,000',
          originalPrice: '₹30,000',
          includes: [
            'All four Reiki levels',
            'Complete attunements',
            'Hands-on practice sessions',
            'Master level training',
            'Professional certification',
            'Lifetime access to resources',
            'Ongoing mentorship support',
          ],
        },
        {
          name: 'Karuna Reiki',
          duration: 'Advanced Specialization',
          description: 'Advanced Karuna Reiki training focusing on compassion and advanced healing techniques.',
          price: '₹10,000',
          originalPrice: '₹15,000',
          includes: [
            'Karuna Reiki symbols',
            'Advanced healing techniques',
            'Compassion-focused practice',
            'Distance healing methods',
            'Professional certification',
            'Practical applications',
          ],
        },
        {
          name: 'Word Master',
          duration: 'Intensive Specialization',
          description: 'Master the power of sacred words and manifestation through Reiki principles.',
          price: '₹35,000',
          originalPrice: '₹52,500',
          includes: [
            'Sacred word mastery',
            'Manifestation techniques',
            'Consciousness expansion',
            'Advanced energy work',
            'Professional certification',
            'Complete training materials',
            'Lifetime instructor support',
          ],
        },
      ]}
      curriculum={[
        {
          title: 'Level 1 - Foundation (Shoden)',
          description:
            'Learn the history, principles, and basics of Reiki. Receive your first attunement and develop the ability to channel healing energy for yourself and others.',
        },
        {
          title: 'Level 2 - Intermediate (Okuden)',
          description:
            'Master the three sacred symbols and learn distance healing techniques. Develop practical skills for client sessions and deeper healing work.',
        },
        {
          title: 'Level 3 - Advanced (Shimpiden)',
          description:
            'Work with the Master symbol and deepen your spiritual practice. Learn advanced techniques and prepare to guide others in their Reiki journey.',
        },
        {
          title: 'Master Level - Professional Practice',
          description:
            'Become a Reiki Master and instructor. Learn business practices, ethics, teaching methods, and how to establish and grow your healing practice professionally.',
        },
      ]}
    />
  );
}
