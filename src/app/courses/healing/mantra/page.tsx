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
          name: 'Bijhure Mantra Manifestation Work',
          duration: 'Foundation Course',
          description: 'Learn the Bijhure mantras for manifestation and achieving your goals through sacred sound vibrations.',
          price: '₹6,000',
          originalPrice: '₹9,000',
          includes: [
            'Bijhure mantra training',
            'Manifestation techniques',
            'Sound vibration mastery',
            'Practical applications',
            'Course materials and certificate',
            'Lifetime audio access',
          ],
        },
        {
          name: 'Practice Star Mantra Sadhna Course',
          duration: 'Intermediate Program',
          description: 'Intensive practice course for developing mantra mastery through daily sadhna and spiritual discipline.',
          price: '₹15,000',
          originalPrice: '₹22,500',
          includes: [
            'Star Mantra Sadhna training',
            'Daily practice protocols',
            'Advanced chanting techniques',
            'Spiritual discipline guidance',
            'Progress tracking and feedback',
            'Professional certification',
            'Ongoing mentorship',
          ],
        },
        {
          name: 'Master GR Mantravartive Sadhan Course',
          duration: 'Advanced Mastery',
          description: 'Advanced mantra mastery course covering GR mantras and tantric mantra applications for profound spiritual awakening.',
          price: '₹25,000',
          originalPrice: '₹37,500',
          includes: [
            'Master-level mantra training',
            'GR mantravartive techniques',
            'Tantric mantra applications',
            'Consciousness expansion work',
            'Advanced spiritual practices',
            'Master certification',
            'Lifetime instructor support',
            'Teaching credential training',
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
