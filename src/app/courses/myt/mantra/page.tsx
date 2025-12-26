import { Metadata } from 'next';
import CourseDetail from '@/components/courseDetail/courseDetail';

export const metadata: Metadata = {
  title: 'Mantra Courses | Manifestation & Sadhna Programs | REHAS',
  description:
    'Master sacred mantras for manifestation, healing, and spiritual awakening. Learn mantra sadhna, techniques, and ancient practices.',
  keywords: [
    'Mantra Courses',
    'Mantra Sadhna',
    'Mantra Manifestation',
    'Sacred Mantras',
    'Spiritual Training',
    'Energy Healing',
  ],
  openGraph: {
    title: 'Mantra Courses | REHAS',
    description: 'Master sacred mantras for spiritual transformation and manifestation.',
    type: 'website',
  },
};

export default function MantraCourseDetailPage() {
  return (
    <CourseDetail
      courseName="Mantra Courses"
      category="myt"
      description="Master sacred mantras for manifestation, spiritual awakening, and energy healing through proven sadhna practices"
      meaning="Mantra is the science and practice of sacred sound vibrations that create profound spiritual transformation. Each mantra carries specific energetic frequencies that can manifest desires, heal the body and mind, and accelerate spiritual growth. Our comprehensive mantra courses teach you authentic mantras, proper pronunciation, sadhna techniques, and how to harness their transformative power for personal and spiritual development."
      benefit="Sacred mantra mastery; Proper pronunciation and technique; Manifestation abilities; Spiritual awakening; Energy healing skills; Consciousness expansion; Deep meditation states"
      use="Personal manifestation work; Spiritual sadhna and practice; Energy healing for self and others; Meditation enhancement; Consciousness expansion; Professional mantra coaching"
      price="₹2,099 - ₹10,999"
      duration="7 days - 90 days"
      level="Beginner to Advanced"
      image="/assets/course/reikiCourse.png"
      sessions={[
        {
          name: 'Mantra Manifestation Program',
          duration: '7 days',
          description: 'Introduction to sacred mantras and their power for manifestation.',
          price: '₹2,100',
          originalPrice: '₹2,100',
          includes: [
            'Sacred mantra introduction',
            'Basic mantras for manifestation',
            'Proper pronunciation techniques',
            'Sadhna fundamentals',
            'Daily practice guidelines',
            'Course materials',
          ],
        },
        {
          name: 'Mantra Sadhana with Asan Sidhi and Sharir Bandhan',
          duration: '30 days',
          price: '₹5,100',
          originalPrice: '₹5,100',
          description: 'Advanced mantra sadhna with body postures and energetic locks.',
          includes: [
            'Complete mantra sadhna system',
            'Asan Sidhi (posture mastery)',
            'Sharir Bandhan (body locks)',
            'Advanced mantra techniques',
            'Energy channel activation',
            'Hands-on guidance and practice',
            'Professional level training',
          ],
        },
        {
          name: 'Mantra Healing Course - Basic Concept of Himalayan Tantra',
          duration: '90 days',
          price: '₹11,000',
          originalPrice: '₹11,000',
          description: 'Master-level mantra healing with Himalayan tantric traditions.',
          includes: [
            'Himalayan tantra principles',
            'Mantra healing techniques',
            'Advanced sadhna practices',
            'Chakra and energy system mastery',
            'Client healing protocols',
            'Professional practice development',
            'Master certification',
            'Lifetime mentorship support',
          ],
        },
      ]}
      pricingPlans={[
        {
          name: 'Mantra Manifestation Program',
          duration: '7 days',
          price: '₹2,099',
          originalPrice: '₹5,099',
          description: 'Perfect for beginners wanting to learn sacred mantras and their power for manifestation.',
          includes: [
            'Sacred mantra introduction',
            'Basic mantras for manifestation',
            'Proper pronunciation techniques',
            'Sadhna fundamentals',
            'Daily practice guidelines',
            'Digital course materials',
          ],
        },
        {
          name: 'Mantra Sadhana with Asan Sidhi and Sharir Bandhan',
          duration: '30 days',
          price: '₹5,099',
          originalPrice: '₹7,099',
          description: 'Advanced mantra sadhna with body postures and energetic locks for deeper practice.',
          includes: [
            'Complete mantra sadhna system',
            'Asan Sidhi (posture mastery)',
            'Sharir Bandhan (body locks)',
            'Advanced mantra techniques',
            'Energy channel activation',
            'Hands-on guidance and practice',
            'Professional level training',
            'Extended support included',
          ],
        },
        {
          name: 'Mantra Healing Course - Basic Concept of Himalayan Tantra',
          duration: '90 days',
          price: '₹10,999',
          originalPrice: '₹14,999',
          description: 'Master-level training in mantra healing with authentic Himalayan tantric wisdom.',
          includes: [
            'Himalayan tantra principles',
            'Mantra healing techniques',
            'Advanced sadhna practices',
            'Chakra and energy system mastery',
            'Client healing protocols',
            'Professional practice development',
            'Master certification',
            'Lifetime mentorship support',
          ],
        },
      ]}
      curriculum={[
        {
          title: 'Module 1 - Mantra Fundamentals',
          description: 'Learn the science of mantra, sacred sound vibrations, and their effects on consciousness and reality.',
        },
        {
          title: 'Module 2 - Sacred Mantras & Sadhna Techniques',
          description: 'Master authentic mantras, proper pronunciation, and proven sadhna practices for spiritual growth.',
        },
        {
          title: 'Module 3 - Energy & Manifestation',
          description: 'Learn to harness mantra energy for manifestation, healing, and consciousness expansion.',
        },
        {
          title: 'Module 4 - Advanced Practice & Application',
          description: 'Develop advanced mantra techniques, teaching abilities, and professional coaching skills.',
        },
      ]}
    />
  );
}
