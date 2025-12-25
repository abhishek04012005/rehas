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
  const coursePrice = courseAstrologyData.sessions.types[0]?.price || '₹8,000-₹12,000';
  return (
    <CourseDetail
      courseName="Tarot Reading Course"
      category="astrology"
      description="Master tarot card reading, interpretation, and intuitive guidance for yourself and clients"
      meaning="Tarot is a powerful divination system using 78 cards to access intuitive wisdom and guidance. Each card carries profound symbolism and multiple layers of meaning. Our tarot course teaches you the complete tarot system, card meanings, reading techniques, and how to develop your intuitive abilities. You'll learn to conduct meaningful readings that provide clarity, insight, and guidance for yourself and clients navigating life's challenges and decisions."
      benefit="Complete tarot deck knowledge; Intuition development; Card interpretation mastery; Various spread techniques; Intuitive reading skills; Guidance and counseling abilities"
      use="Personal divination and self-insight; Professional tarot reading service; Spiritual counseling and guidance; Life coaching integration; Healing and clarity work; Building a tarot reading practice"
      price={coursePrice}
      duration="6-10 weeks"
      level="Beginner to Intermediate"
      image="PokerOutlined"
      sessions={[
        {
          name: 'Weekend Intensive',
          duration: '2-3 weekends',
          description: 'Intensive tarot training with deck familiarization and reading practice.',
          price: '₹5,000',
          originalPrice: '₹7,500',
          includes: [
            'Major and minor arcana study',
            'Card meaning memorization',
            'Basic spread learning',
            'Practice readings',
            'Professional certification',
          ],
        },
        {
          name: 'Weekly Classes',
          duration: '6-10 weeks',
          description: 'Comprehensive weekly tarot training with reading practice and feedback.',
          price: '₹6,500',
          originalPrice: '₹9,750',
          includes: [
            'Complete tarot system',
            'Weekly reading practice',
            'Advanced spread techniques',
            'Intuition development',
            'Client reading practice',
            'Professional certification',
          ],
        },
        {
          name: 'Online Course',
          duration: 'Self-paced',
          description: 'Video-based tarot learning with card guides and reading examples.',
          price: '₹3,000',
          originalPrice: '₹4,500',
          includes: [
            'Complete video modules',
            'Tarot card guide',
            'Spread templates',
            'Lifetime access',
            'Email support',
            'Digital certificate',
          ],
        },
        {
          name: 'Private Training',
          duration: 'Customized',
          description: 'One-on-one personalized tarot training.',
          price: '₹900',
          includes: [
            'Personal tarot guidance',
            'One-on-one mentoring',
            'Reading practice feedback',
            'Flexible scheduling',
            'Intuition coaching',
            'Certification upon completion',
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
