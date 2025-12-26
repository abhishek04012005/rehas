import { Metadata } from 'next';
import CourseDetail from '@/components/courseDetail/courseDetail';

export const metadata: Metadata = {
  title: 'Angel Blessing Course | Divine Healing Training | REHAS',
  description:
    'Learn Angel Blessing healing from basic to mastery level. Connect with angelic energy, automatic writing, and ascended master techniques.',
  keywords: [
    'Angel Blessing',
    'Angel Healing',
    'Divine Healing',
    'Automatic Writing',
    'Ascended Masters',
    'Angelic Energy',
    'Healing Certification',
  ],
  openGraph: {
    title: 'Angel Blessing Course | REHAS',
    description: 'Professional training in Angel Blessing and divine healing techniques.',
    type: 'website',
  },
};

export default function AngelBlessingCoursePage() {
  return (
    <CourseDetail
      courseName="Angel Blessing"
      category="healing"
      description="Connect with angelic energy and divine healing through comprehensive Angel Blessing training from basics to mastery"
      meaning="Angel Blessing is a divine healing modality that harnesses the power of angelic energy to elevate consciousness and promote spiritual transformation. Our program teaches you to channel angelic blessings, develop automatic writing abilities, and connect with ascended masters. Through guided practices, attunements, and mentorship, you'll learn to bring divine healing into your life and the lives of others, creating profound positive change."
      benefit="Connection with angelic guides; Divine energy channeling; Automatic writing abilities; Ascended master communication; Spiritual guidance; Personal transformation; Healing and blessings for others; Consciousness expansion"
      use="Personal spiritual growth; Professional healing practice; Automatic writing and divination; Connecting with higher realms; Building an angelic healing practice; Guiding others spiritually"
      price="₹5,099 - ₹20,999"
      duration="3 days - 60 days (depending on level)"
      level="Beginner to Advanced"
      image="/assets/course/angelBlessing.png"
      originalPrice="₹20,999"
      curriculum={[
        {
          title: 'Module 1 - Angel Fundamentals',
          description: 'Learn about different angels, their purposes, and how to connect with your guardian angels. Understanding the hierarchy of angelic beings.',
        },
        {
          title: 'Module 2 - Basic Blessing Techniques',
          description: 'Master foundational Angel Blessing practices. Learn how to channel angelic energy and deliver blessings for healing and transformation.',
        },
        {
          title: 'Module 3 - Advanced Channeling',
          description: 'Develop deeper connections with angelic guides. Learn advanced channeling techniques and how to work with multiple angelic realms.',
        },
        {
          title: 'Module 4 - Automatic Writing & Ascended Masters',
          description: 'Master automatic writing to receive divine messages. Connect with ascended masters and advanced spiritual beings for guidance and healing.',
        },
      ]}
      pricingPlans={[
        {
          name: 'Basic Angel Blessing',
          duration: '3 days',
          price: '₹5,099',
          originalPrice: '₹7,499',
          description: 'Perfect for beginners seeking to connect with angelic energy and learn basic blessing techniques for personal and family healing.',
          includes: [
            'Angel Blessing fundamentals',
            'Angelic energy connection methods',
            'Basic blessing and healing techniques',
            'Angel communication basics',
            'Digital course materials',
            'Practice guidance',
          ],
        },
        {
          name: 'Advance Angel Blessing',
          duration: '30 days',
          price: '₹10,999',
          originalPrice: '₹15,999',
          description: 'Develop advanced skills in Angel Blessing with enhanced channeling abilities and professional practice credentials.',
          includes: [
            'Advanced blessing techniques',
            'Deeper angelic channeling',
            'Client session protocols',
            'Spiritual deepening practices',
            'Professional certification',
            'Email support included',
            'Lifetime course access',
          ],
        },
        {
          name: 'Angel Blessing Mastery with Automatic Writing and Ascended Master',
          duration: '60 days',
          price: '₹20,999',
          originalPrice: '₹29,999',
          description: 'Achieve mastery in Angel Blessing combined with automatic writing and ascended master connection for complete spiritual authority.',
          includes: [
            'Everything in Advance level',
            'Automatic writing mastery',
            'Ascended master communication',
            'Advanced channeling methods',
            'Master-level certification',
            'Business building strategies',
            'Lifetime mentorship support',
          ],
        },
      ]}
    />
  );
}
