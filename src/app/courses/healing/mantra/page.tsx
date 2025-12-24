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
          name: 'Weekend Intensive',
          duration: '2-3 days',
          description: 'Intensive mantra learning with proper chanting techniques and applications.',
          price: '₹6,000',
          includes: [
            'Sacred mantra training',
            'Proper pronunciation practice',
            'Chanting techniques',
            'Course materials and certificate',
            'Lifetime access to audio files',
          ],
        },
        {
          name: 'Weekly Classes',
          duration: '8-10 weeks',
          description: 'Structured weekly sessions with time for practice and integration.',
          price: '₹8,000',
          includes: [
            'Weekly mantra classes',
            'Practice assignments',
            'Personalized mantra selection',
            'Ongoing feedback',
            'Professional certification',
          ],
        },
        {
          name: 'Online Course',
          duration: 'Self-paced',
          description: 'Video-based mantra learning with audio guides and downloadable materials.',
          price: '₹4,000',
          includes: [
            'Complete video modules',
            'Audio mantra files',
            'Downloadable materials',
            'Email support',
            'Digital certificate',
          ],
        },
        {
          name: 'Private Training',
          duration: 'Customized',
          description: 'One-on-one personalized mantra training and guidance.',
          price: '₹1,200',
          includes: [
            'Personal mantra selection',
            'One-on-one coaching',
            'Customized practice plan',
            'Direct feedback',
            'Certification upon completion',
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
