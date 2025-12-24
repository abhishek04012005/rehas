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

export default function HealingCoursesPage() {
  return (
    <CourseDetail
      courseName="Reiki Mastery Program"
      category="healing"
      description="Master the complete Reiki system from fundamentals to advanced practices"
      meaning="Reiki is a Japanese technique for stress reduction and healing that uses universal life force energy. Our comprehensive program teaches you to become a certified Reiki practitioner and master, capable of healing yourself and others. Through hands-on training, attunements, and practical applications, you'll develop the ability to channel healing energy effectively."
      benefit="Hands-on healing ability; Energy perception and channeling; Spiritual growth and awareness; Stress reduction techniques; Personal transformation; Ability to help others heal"
      use="Personal wellness and healing; Professional healing practice; Complementary therapy; Spiritual development; Building a healing business; Family and friend healing"
      price="₹8,000-₹15,000"
      duration="2-3 months (varies by format)"
      level="Beginner to Master"
      image="✨"
      sessions={[
        {
          name: 'Weekend Intensive',
          duration: '2-3 days',
          description: 'Immersive weekend workshops covering one level at a time with hands-on attunements.',
          price: '₹8,000-₹12,000',
          includes: [
            'Complete level attunement',
            'Hands-on practice sessions',
            'Course materials and certificate',
            'Lifetime access to resources',
            'Post-course email support',
          ],
        },
        {
          name: 'Weekly Classes',
          duration: '8-12 weeks',
          description: 'Structured weekly sessions allowing time to integrate learning between classes.',
          price: '₹12,000-₹18,000',
          includes: [
            'Weekly live training sessions',
            'Individual attunements',
            'Practice opportunities',
            'One-on-one guidance',
            'Ongoing mentorship',
            'Professional certification',
          ],
        },
        {
          name: 'Online Course',
          duration: 'Self-paced',
          description: 'Video-based learning with flexible scheduling and lifetime access.',
          price: '₹5,000-₹10,000',
          includes: [
            'Complete video modules',
            'Downloadable materials',
            'Lifetime course access',
            'Email support',
            'Digital certificate',
            'Bonus guidance resources',
          ],
        },
        {
          name: 'Private Training',
          duration: 'Customized',
          description: 'One-on-one personalized training tailored to your pace and needs.',
          price: '₹1,500-₹2,500/hour',
          includes: [
            'Personal curriculum design',
            'One-on-one mentorship',
            'Flexible scheduling',
            'Immediate feedback',
            'Direct access to instructor',
            'Certification upon completion',
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
