import { Metadata } from 'next';
import CourseDetail from '@/components/courseDetail/courseDetail';

export const metadata: Metadata = {
  title: 'Lama Fera Course | Healing System & Mantra Training | REHAS',
  description:
    'Master Lama Fera healing system combined with Salvik Mantra and Yogya Maya techniques. Comprehensive spiritual transformation training.',
  keywords: [
    'Lama Fera',
    'Lama Fera Healing',
    'Salvik Mantra',
    'Yogya Maya',
    'Mantra Healing',
    'Spiritual Healing',
    'Healing Certification',
  ],
  openGraph: {
    title: 'Lama Fera Course | REHAS',
    description: 'Professional training in Lama Fera healing system and advanced mantra techniques.',
    type: 'website',
  },
};

export default function LamaferaCoursePage() {
  return (
    <CourseDetail
      courseName="Lama Fera"
      category="healing"
      description="Master the powerful Lama Fera healing system combined with Salvik Mantra and Yogya Maya techniques for complete spiritual transformation"
      meaning="Lama Fera is a comprehensive healing system that combines ancient wisdom traditions with powerful energy work and mantra practices. Our program teaches you the complete Lama Fera system, Salvik Mantra secrets, and Yogya Maya techniques. Through training with certified masters, you'll develop the ability to heal deeply, manifest transformation, and guide others on their spiritual journey through these sacred healing modalities."
      benefit="Complete Lama Fera system mastery; Salvik Mantra power and application; Yogya Maya techniques; Deep healing abilities; Energy transformation skills; Spiritual empowerment; Manifestation capabilities; Professional healing practice"
      use="Personal healing and transformation; Professional healing practice; Mantra-based healing; Energy work and spiritual guidance; Building a healing business; Teaching and mentoring others"
      price="₹5,099 - ₹20,999"
      duration="3 days - 60 days (depending on level)"
      level="Beginner to Advanced"
      image="/assets/course/healing/lamaferra.png"
      originalPrice="₹20,999"
      curriculum={[
        {
          title: 'Module 1 - Lama Fera Basics',
          description: 'Learn the foundations of Lama Fera healing system, its history, principles, and basic healing techniques for self and others.',
        },
        {
          title: 'Module 2 - Salvik Mantra Secrets',
          description: 'Discover the power of Salvik Mantra. Learn the correct pronunciation, meaning, and applications for powerful transformation and healing.',
        },
        {
          title: 'Module 3 - Advanced Lama Fera Techniques',
          description: 'Master advanced healing protocols within the Lama Fera system. Develop deeper energy perception and healing capabilities.',
        },
        {
          title: 'Module 4 - Yogya Maya Mastery',
          description: 'Complete your training with Yogya Maya techniques for the highest level of spiritual transformation and healing authority.',
        },
      ]}
      pricingPlans={[
        {
          name: 'Lama Fera',
          duration: '3 days',
          price: '₹5,099',
          originalPrice: '₹7,499',
          description: 'Perfect for beginners wanting to learn the Lama Fera healing system and discover its transformative power for personal wellness.',
          includes: [
            'Lama Fera system fundamentals',
            'Basic healing techniques',
            'Energy awareness training',
            'Foundational practices',
            'Digital course materials',
            'Practice guidance and support',
          ],
        },
        {
          name: 'Salvik Mantra Rahas',
          duration: '30 days',
          price: '₹10,999',
          originalPrice: '₹15,999',
          description: 'Learn the complete Salvik Mantra system with advanced techniques for powerful healing and spiritual transformation.',
          includes: [
            'Everything from Lama Fera level',
            'Salvik Mantra complete training',
            'Mantra power and applications',
            'Advanced healing protocols',
            'Professional certification',
            'Email support included',
            'Lifetime course access',
          ],
        },
        {
          name: 'Yogya Maya',
          duration: '60 days',
          price: '₹20,999',
          originalPrice: '₹29,999',
          description: 'Master the complete system: Lama Fera, Salvik Mantra, and Yogya Maya for ultimate healing and spiritual authority.',
          includes: [
            'Everything from previous levels',
            'Yogya Maya complete mastery',
            'Advanced manifestation work',
            'Complete system integration',
            'Master-level certification',
            'Business development guidance',
            'Lifetime mentorship support',
          ],
        },
      ]}
    />
  );
}
