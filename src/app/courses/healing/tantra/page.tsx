import { Metadata } from 'next';
import CourseDetail from '@/components/courseDetail/courseDetail';

export const metadata: Metadata = {
  title: 'Tantra Practices Course | Spiritual Awakening | REHAS',
  description:
    'Explore tantric philosophy and techniques for spiritual awakening, energy work, and personal transformation. Comprehensive tantra certification program.',
  keywords: [
    'Tantra Practice',
    'Tantric Philosophy',
    'Spiritual Awakening',
    'Energy Work',
    'Tantra Training',
    'Tantric Meditation',
    'Kundalini Awakening',
  ],
  openGraph: {
    title: 'Tantra Practices Course | REHAS',
    description: 'Learn tantric philosophy and techniques for spiritual transformation.',
    type: 'website',
  },
};

export default function TantraCoursePage() {
  return (
    <CourseDetail
      courseName="Tantra Practices"
      category="healing"
      description="Explore tantric philosophy and techniques for spiritual awakening and personal transformation"
      meaning="Tantra is an ancient spiritual science that integrates philosophy, meditation, and energy work to awaken consciousness and transform life. Our comprehensive tantra course teaches the authentic principles of tantric philosophy, chakra activation, kundalini awakening, and advanced spiritual practices. You'll learn to work with subtle energy, understand the nature of consciousness, and develop a profound spiritual practice."
      benefit="Deep understanding of tantric philosophy; Kundalini awakening and energy management; Advanced chakra work and energy healing; Spiritual meditation techniques; Enhanced consciousness and awareness; Transformation of daily life through spiritual practice"
      use="Personal spiritual transformation; Advanced meditation practice; Professional tantra coaching; Energy healing work; Teaching tantric philosophy; Building a comprehensive spiritual practice"
      price="₹7,000-₹14,000"
      duration="10-14 weeks"
      level="Intermediate"
      image="ControlPoint"
      sessions={[
        {
          name: 'Weekend Intensive',
          duration: '3-4 days',
          description: 'Deep immersion into tantric philosophy and practices over extended weekends.',
          price: '₹9,000-₹14,000',
          includes: [
            'Tantric philosophy teachings',
            'Advanced meditation practices',
            'Chakra and energy work',
            'Course materials and manual',
            'Lifetime access to resources',
          ],
        },
        {
          name: 'Weekly Classes',
          duration: '10-14 weeks',
          description: 'Comprehensive weekly sessions with integrated theory and practice.',
          price: '₹10,000-₹16,000',
          includes: [
            'Weekly tantric philosophy classes',
            'Guided meditation practice',
            'Energy work sessions',
            'Personal guidance and support',
            'Professional certification',
          ],
        },
        {
          name: 'Online Course',
          duration: 'Self-paced',
          description: 'Video teachings and guided practices with lifetime access.',
          price: '₹5,000-₹10,000',
          includes: [
            'Complete video modules',
            'Guided meditation recordings',
            'Philosophy study materials',
            'Lifetime course access',
            'Digital certificate',
          ],
        },
        {
          name: 'Private Training',
          duration: 'Customized',
          description: 'One-on-one personalized tantric training and spiritual guidance.',
          price: '₹1,500-₹2,500/hour',
          includes: [
            'Personal spiritual guidance',
            'Customized practice path',
            'Chakra assessment and work',
            'Direct mentorship',
            'Certification upon completion',
          ],
        },
      ]}
      curriculum={[
        {
          title: 'Module 1 - Tantric Philosophy Foundations',
          description:
            'Understand the principles of tantra, its history, and how it differs from other spiritual traditions. Learn about the nature of consciousness and energy.',
        },
        {
          title: 'Module 2 - Chakra and Energy Systems',
          description:
            'Deep study of the 7 main chakras, subtle energy channels (nadis), and energy body anatomy. Learn practical chakra activation and balancing.',
        },
        {
          title: 'Module 3 - Kundalini Awakening and Management',
          description:
            'Understand kundalini energy, safe awakening practices, and how to manage kundalini experiences. Advanced energy cultivation techniques.',
        },
        {
          title: 'Module 4 - Advanced Tantric Practices',
          description:
            'Learn meditation, breathwork, and spiritual practices that accelerate consciousness expansion. Integration into daily life and spiritual service.',
        },
      ]}
    />
  );
}
