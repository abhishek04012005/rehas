import { Metadata } from 'next';
import CourseDetail from '@/components/courseDetail/courseDetail';

export const metadata: Metadata = {
  title: 'Reiki up to Master Level | Professional Healing Certification | REHAS',
  description:
    'Complete Reiki training from Level 1 to Master certification with full attunements and professional credentials. Comprehensive Reiki mastery program.',
  keywords: [
    'Reiki Master',
    'Reiki Training',
    'Reiki Certification',
    'Master Level Reiki',
    'Professional Reiki',
    'Reiki Attunement',
  ],
  openGraph: {
    title: 'Reiki up to Master Level | REHAS',
    description: 'Complete Reiki training from foundational to Master certification.',
    type: 'website',
  },
};

export default function ReikiMasterLevelPage() {
  return (
    <CourseDetail
      courseName="Reiki up to Master Level"
      category="healing"
      description="Complete Reiki training from Level 1 to Master certification with full attunements and professional credentials."
      meaning="This comprehensive program teaches you the complete Reiki system across all four levels. You'll receive proper attunements, learn sacred symbols, master healing techniques, and develop the ability to teach Reiki to others. By the end, you'll be a certified Reiki Master capable of conducting professional healing sessions and training new practitioners."
      benefit="All four Reiki level certifications; Energy perception and mastery; Ability to heal yourself and others; Distance healing skills; Teaching credentials; Professional healing practice; Spiritual growth and consciousness expansion"
      use="Professional healing practice; Personal transformation; Teaching Reiki to others; Building a healing business; Complementary therapy; Spiritual development"
      price="₹20,000"
      originalPrice="₹30,000"
      duration="3-4 months"
      level="Beginner to Master"
      image="/assets/course/reikiupto.png"
      sessions={[
        {
          name: 'Reiki up to Master Level',
          duration: 'Comprehensive Program',
          description: 'Complete Reiki training from Level 1 to Master with full certifications.',
          price: '₹20,000',
          originalPrice: '₹30,000',
          includes: [
            'All four Reiki levels (1-4)',
            'Complete attunements',
            'Hands-on practice sessions',
            'Master level training',
            'Professional certification',
            'Lifetime access to resources',
            'Ongoing mentorship support',
            'Teaching credential preparation',
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
          title: 'Level 4 - Master (Shihan)',
          description:
            'Become a Reiki Master. Learn business practices, ethics, teaching methods, and how to establish and grow your professional healing practice.',
        },
      ]}
    />
  );
}
