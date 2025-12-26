import { Metadata } from 'next';
import CourseDetail from '@/components/courseDetail/courseDetail';

export const metadata: Metadata = {
  title: 'Yantra Courses | Sacred Geometry & Yantra Sadhna | REHAS',
  description:
    'Master the ancient science of yantras for spiritual power and divine energy activation. Learn yantra making and sadhna practices.',
  keywords: [
    'Yantra Courses',
    'Yantra Sadhna',
    'Sacred Geometry',
    'Yantra Making',
    'Spiritual Power',
    'Energy Activation',
  ],
  openGraph: {
    title: 'Yantra Courses | REHAS',
    description: 'Master the ancient science of yantras for spiritual transformation.',
    type: 'website',
  },
};

export default function YantraCourseDetailPage() {
  return (
    <CourseDetail
      courseName="Yantra Courses"
      category="myt"
      description="Learn the ancient science of yantras for spiritual power and divine energy activation through sacred geometry"
      meaning="Yantra is the visual equivalent of mantra - sacred geometric patterns that represent divine principles and cosmic forces. Each yantra is a powerful tool for spiritual practice, energy activation, and manifestation. Our comprehensive yantra courses teach you the science of sacred geometry, how to create authentic yantras, yantra sadhna practices, and how to use yantras for spiritual transformation, protection, and divine blessings."
      benefit="Sacred geometry mastery; Yantra creation skills; Spiritual power activation; Divine energy alignment; Protection and blessing; Chakra and energy system activation; Advanced meditation support"
      use="Personal yantra practice and sadhna; Creating yantras for specific intentions; Energy and spiritual activation; Professional yantra coaching; Sacred space activation; Building a yantra practice business"
      price="₹5,100 - ₹21,000"
      duration="7 days - 90 days"
      level="Beginner to Advanced"
      image="/assets/course/reikiCourse.png"
      sessions={[
        {
          name: 'Basic Yantra Course (Nav Grah Yantra Making)',
          duration: '7 days',
          description: 'Introduction to yantra science and creation of nine planetary yantras.',
          price: '₹5,100',
          originalPrice: '₹5,100',
          includes: [
            'Yantra fundamentals and science',
            'Sacred geometry principles',
            'Nav Grah (nine planets) yantra making',
            'Proper drawing and preparation',
            'Yantra activation basics',
            'Course materials and templates',
          ],
        },
        {
          name: 'Yoni Yantra - Kaam-kala-roop-trikon (Yantra Sadhna)',
          duration: '30 days',
          price: '₹11,000',
          originalPrice: '₹11,000',
          description: 'Advanced yantra sadhna focusing on yoni yantra and tantric geometry.',
          includes: [
            'Advanced yantra science',
            'Yoni yantra mastery',
            'Kaam-kala (love energy) techniques',
            'Trikon (triangle) geometry principles',
            'Yantra sadhna practice',
            'Energy activation and channeling',
            'Professional level training',
            'Hands-on guidance included',
          ],
        },
        {
          name: 'Panch Dashi Mahakalp Yantra Sadhna Course',
          duration: '90 days',
          price: '₹21,000',
          originalPrice: '₹21,000',
          description: 'Master-level training in the most powerful yantra practices.',
          includes: [
            'Panch Dashi (fifteen powers) mastery',
            'Mahakalp yantra principles',
            'Advanced sadhna protocols',
            'Highest spiritual activations',
            'Divine power integration',
            'Professional practice development',
            'Master certification',
            'Lifetime mentorship support',
          ],
        },
      ]}
      pricingPlans={[
        {
          name: 'Basic Yantra Course (Nav Grah Yantra Making)',
          duration: '7 days',
          price: '₹5,099',
          originalPrice: '₹7,099',
          description: 'Perfect for beginners wanting to learn yantra science and create nine planetary yantras.',
          includes: [
            'Yantra fundamentals and science',
            'Sacred geometry principles',
            'Nav Grah (nine planets) yantra making',
            'Proper drawing and preparation',
            'Yantra activation basics',
            'Digital course materials and templates',
          ],
        },
        {
          name: 'Yoni Yantra - Kaam-kala-roop-trikon (Yantra Sadhna)',
          duration: '30 days',
          price: '₹10,999',
          originalPrice: '₹17,999',
          description: 'Advanced yantra sadhna with focus on yoni yantra and tantric sacred geometry.',
          includes: [
            'Advanced yantra science',
            'Yoni yantra mastery',
            'Kaam-kala (love energy) techniques',
            'Trikon (triangle) geometry principles',
            'Yantra sadhna practice',
            'Energy activation and channeling',
            'Professional level training',
            'Hands-on guidance included',
          ],
        },
        {
          name: 'Panch Dashi Mahakalp Yantra Sadhna Course',
          duration: '90 days',
          price: '₹20,999',
          originalPrice: '₹29,999',
          description: 'Master-level training in the most powerful and transformative yantra practices.',
          includes: [
            'Panch Dashi (fifteen powers) mastery',
            'Mahakalp yantra principles',
            'Advanced sadhna protocols',
            'Highest spiritual activations',
            'Divine power integration',
            'Professional practice development',
            'Master certification',
            'Lifetime mentorship support',
          ],
        },
      ]}
      curriculum={[
        {
          title: 'Module 1 - Yantra Science & Sacred Geometry',
          description: 'Learn the principles of yantra, sacred geometry, and how yantras represent divine cosmic forces.',
        },
        {
          title: 'Module 2 - Yantra Creation & Activation',
          description: 'Master the creation of authentic yantras, proper preparation, and energetic activation methods.',
        },
        {
          title: 'Module 3 - Yantra Sadhna Practices',
          description: 'Learn specific yantra sadhna techniques for spiritual power, energy activation, and consciousness expansion.',
        },
        {
          title: 'Module 4 - Advanced Applications & Professional Practice',
          description: 'Develop advanced yantra applications, teaching abilities, and professional coaching expertise.',
        },
      ]}
    />
  );
}
