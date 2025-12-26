import { Metadata } from 'next';
import CourseDetail from '@/components/courseDetail/courseDetail';
import { courseAstrologyData } from '@/data/courseAstrology';

export const metadata: Metadata = {
  title: 'Tarot Reading Course | Professional Tarot Training | REHAS',
  description:
    'Master tarot card reading and interpretation. Professional tarot certification program teaching intuitive guidance and card meanings.',
  keywords: [
    'Tarot Course',
    'Tarot Reading Training',
    'Tarot Certification',
    'Tarot Card Meanings',
    'Tarot Interpretation',
    'Professional Tarot Reading',
  ],
  openGraph: {
    title: 'Tarot Reading Course | REHAS',
    description: 'Professional tarot reading training and certification.',
    type: 'website',
  },
};

export default function TarotCoursePage() {
  return (
    <CourseDetail
      courseName="Tarot Reading Course"
      category="astrology"
      description="Master tarot card reading, interpretation, and intuitive guidance for yourself and clients"
      meaning="Tarot is a powerful divination system using 78 cards to access intuitive wisdom and guidance. Each card carries profound symbolism and multiple layers of meaning. Our tarot course teaches you the complete tarot system, card meanings, reading techniques, and how to develop your intuitive abilities. You'll learn to conduct meaningful readings that provide clarity, insight, and guidance for yourself and clients navigating life's challenges and decisions."
      benefit="Complete tarot deck knowledge; Intuition development; Card interpretation mastery; Various spread techniques; Intuitive reading skills; Guidance and counseling abilities"
      use="Personal divination and self-insight; Professional tarot reading service; Spiritual counseling and guidance; Life coaching integration; Healing and clarity work; Building a tarot reading practice"
      price="₹2,099 - ₹10,999"
      duration="7 days - 60 days"
      level="Beginner to Intermediate"
      image="/assets/course/astrology/tarrot.png"
      sessions={[
        {
          name: 'Tarot Basic',
          duration: '7 days',
          description: 'Introduction to tarot basics with card meanings and simple reading techniques.',
          price: '₹2,099',
          originalPrice: '₹2,099',
          includes: [
            'Tarot history and basics',
            'Major and minor arcana introduction',
            'Card meanings study',
            'Simple spread learning',
            'Practice readings',
            'Course materials',
          ],
        },
        {
          name: 'Tarot Practitioner',
          duration: '30 days',
          description: 'Comprehensive practitioner-level training with advanced reading techniques.',
          price: '₹5,099',
          originalPrice: '₹5,099',
          includes: [
            'Complete tarot system mastery',
            'Advanced spread techniques',
            'Intuition development training',
            'Reading practice and feedback',
            'Client reading practice',
            'Professional certification',
            'Extended support included',
          ],
        },
        {
          name: 'Tarot Mastery with Kit',
          duration: '60 days',
          description: 'Master-level training with complete tarot kit and professional practice development.',
          price: '₹10,999',
          originalPrice: '₹10,999',
          includes: [
            'Advanced tarot mastery',
            'Specialized reading techniques',
            'Complete tarot kit included',
            'Professional consultation training',
            'Client management systems',
            'Business development strategies',
            'Master certification',
            'Lifetime mentorship support',
          ],
        },
      ]}
      pricingPlans={[
        {
          name: 'Tarot Basic',
          duration: '7 days',
          price: '₹2,099',
          originalPrice: '₹4,099',
          description: 'Perfect for beginners wanting to learn tarot basics and simple reading techniques.',
          includes: [
            'Tarot history and basics',
            'Major and minor arcana introduction',
            'Card meanings study',
            'Simple spread learning',
            'Practice readings',
            'Digital course materials',
          ],
        },
        {
          name: 'Tarot Practitioner',
          duration: '30 days',
          price: '₹5,099',
          originalPrice: '₹7,099',
          description: 'Comprehensive professional training with advanced tarot reading techniques and client services.',
          includes: [
            'Complete tarot system mastery',
            'Advanced spread techniques',
            'Intuition development training',
            'Reading practice and feedback',
            'Client reading practice',
            'Professional certification',
            'Extended support included',
          ],
        },
        {
          name: 'Tarot Mastery with Kit',
          duration: '60 days',
          price: '₹10,999',
          originalPrice: '₹14,999',
          description: 'Master-level training with complete tarot kit for establishing professional tarot reading practice.',
          includes: [
            'Advanced tarot mastery',
            'Specialized reading techniques',
            'Complete tarot kit included',
            'Professional consultation training',
            'Client management systems',
            'Business development strategies',
            'Master certification',
            'Lifetime mentorship support',
          ],
        },
      ]}
      curriculum={[
        {
          title: 'Module 1 - Tarot Basics & Card Meanings',
          description: 'Learn tarot history, the major and minor arcana, and the deep meanings of all 78 cards.',
        },
        {
          title: 'Module 2 - Reading Techniques & Spreads',
          description: 'Master various tarot spreads from simple to complex, and learn how to conduct meaningful readings.',
        },
        {
          title: 'Module 3 - Intuition Development',
          description: 'Develop your intuitive abilities, connect with card energy, and learn to trust your inner guidance.',
        },
        {
          title: 'Module 4 - Professional Tarot Practice',
          description: 'Learn client consultation, ethical reading practices, and how to build a successful tarot reading practice.',
        },
      ]}
    />
  );
}
