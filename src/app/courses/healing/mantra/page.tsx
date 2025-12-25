import { Metadata } from 'next';
import CourseDetail from '@/components/courseDetail/courseDetail';

export const metadata: Metadata = {
  title: 'Mantra Healing Course | Sacred Sound Therapy | REHAS',
  description:
    'Learn sacred mantras and their transformative power for healing, meditation, and spiritual growth. Professional mantra healing certification program.',
  keywords: [
    'Mantra Healing',
    'Sacred Mantras',
    'Sound Healing',
    'Mantra Therapy',
    'Spiritual Mantras',
    'Mantra Certification',
    'Sound Therapy Course',
  ],
  openGraph: {
    title: 'Mantra Healing Course | REHAS',
    description: 'Learn sacred mantras and their healing power for spiritual transformation.',
    type: 'website',
  },
};

export default function MantraCoursePage() {
  return (
    <CourseDetail
      courseName="Mantra Healing Course"
      category="healing"
      description="Learn sacred mantras and their transformative power for healing and spiritual growth"
      meaning="Mantras are powerful sacred sounds and words that have been used for thousands of years to heal, transform consciousness, and connect with divine energy. Our comprehensive mantra healing course teaches you the philosophy, pronunciation, and practical application of sacred mantras. You'll learn to use these vibrations for personal healing, meditation, and to help others transform their lives through the power of sound."
      benefit="Understanding sacred sound vibrations; Proper mantra pronunciation and chanting; Energy healing through sound; Deep meditation practices; Chakra activation through mantras; Spiritual awakening and consciousness expansion"
      use="Personal spiritual practice; Meditation and mindfulness; Healing emotional and physical ailments; Building a mantra healing practice; Teaching others mantra therapy; Enhancing yoga and wellness sessions"
      price="₹6,000"
      duration="6-10 weeks"
      level="All Levels"
      image="AudiotrackOutlined"
      sessions={[
        {
          name: 'Basic Healing',
          duration: 'Introductory',
          description: 'Introduction to mantra healing fundamentals and sacred sound energy.',
          price: '₹1',
          originalPrice: '₹5,000',
          includes: [
            'Basic mantra introduction',
            'Sacred sound awareness',
            'Foundational mantra techniques',
            'Energy activation basics',
            'Initial guidance',
          ],
        },
        {
          name: 'Rehas All in One Healing',
          duration: '60 days',
          description: 'Comprehensive 60-day healing program combining all mantra healing techniques for complete physical, emotional, and spiritual transformation.',
          price: '₹21,000',
          originalPrice: '₹30,000',
          includes: [
            'Complete mantra healing system',
            'Daily healing sessions',
            'All chakra healing',
            'Energy balancing work',
            'Relationship harmony support',
            'Physical wellness focus',
            'Spiritual awakening guidance',
            'Daily mentor support',
          ],
        },
        {
          name: 'Chakra Healing',
          duration: 'Specialized Focus',
          description: 'Targeted chakra healing using sacred mantras to balance and align all seven energy centers for optimal wellness.',
          price: '₹2,100',
          originalPrice: '₹3,500',
          includes: [
            'Seven chakra healing mantras',
            'Chakra alignment techniques',
            'Energy center activation',
            'Meditation practices',
            'Daily guidance',
            'Chakra balancing exercises',
          ],
        },
        {
          name: 'Relationship Healing',
          duration: 'Specialized Focus',
          description: 'Specialized mantra healing program designed to heal relationship issues, restore harmony, and strengthen emotional bonds.',
          price: '₹11,000',
          originalPrice: '₹15,000',
          includes: [
            'Relationship healing mantras',
            'Emotional healing practices',
            'Partner harmony techniques',
            'Communication enhancement',
            'Chakra alignment for relationships',
            'Daily healing sessions',
            'Guidance and support',
          ],
        },
      ]}
      curriculum={[
        {
          title: 'Module 1 - Foundations of Sacred Sound',
          description:
            'Learn the philosophy of mantras, the science of sound vibrations, and how they affect consciousness and healing.',
        },
        {
          title: 'Module 2 - Essential Mantras',
          description:
            'Master the most powerful healing mantras including Om, Gayatri, Maha Mrityunjaya, and others with proper pronunciation.',
        },
        {
          title: 'Module 3 - Chakra Mantras',
          description:
            'Learn mantras for each of the 7 chakras and how to use sound to balance and activate energy centers.',
        },
        {
          title: 'Module 4 - Mantra Healing Practices',
          description:
            'Practical applications of mantras for healing, meditation, and building a professional mantra healing practice.',
        },
      ]}
    />
  );
}
