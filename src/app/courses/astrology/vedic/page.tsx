import { Metadata } from 'next';
import CourseDetail from '@/components/courseDetail/courseDetail';
import { courseAstrologyData } from '@/data/courseAstrology';

export const metadata: Metadata = {
  title: 'Vedic Astrology Diploma | Complete Astrology Training | REHAS',
  description:
    'Master Vedic astrology with our comprehensive diploma program. Learn horoscope reading, birth chart analysis, and planetary predictions from certified experts.',
  keywords: [
    'Vedic Astrology',
    'Astrology Diploma',
    'Birth Chart Reading',
    'Horoscope Analysis',
    'Planetary Positions',
    'Astrology Certification',
  ],
  openGraph: {
    title: 'Vedic Astrology Diploma | REHAS',
    description: 'Complete Vedic astrology training and certification program.',
    type: 'website',
  },
};

export default function VedicAstrologyCoursePage() {
  const coursePrice = courseAstrologyData.sessions.types[1]?.price || '₹35,000-₹55,000';
  return (
    <CourseDetail
      courseName="Vedic Astrology Diploma"
      category="astrology"
      description="Complete Vedic astrology training covering horoscope reading, planetary positions and cosmic timing"
      meaning="Vedic astrology, also known as Jyotish, is an ancient Indian science that uses the positions of celestial bodies to understand human destiny and life patterns. Our comprehensive diploma program teaches you the fundamentals of Vedic astrology, birth chart interpretation, planetary influences, dashas (time periods), and predictive techniques. You'll learn to read horoscopes with precision and provide meaningful guidance to clients."
      benefit="Birth chart analysis mastery; Planetary influence understanding; Predictive astrology techniques; Dasha and transit interpretation; Gemstone and remedy recommendations; Professional astrology consultation skills"
      use="Professional astrology consultation; Birth chart readings; Life guidance and counseling; Predictive analysis; Gemstone recommendations; Business and personal planning"
      price={coursePrice}
      duration="12-16 weeks"
      level="Beginner to Master"
      image="StarOutlined"
      sessions={[
        {
          name: 'Weekend Intensive',
          duration: '4-5 weekends',
          description: 'Intensive Vedic astrology training with chart reading practice.',
          price: '₹12,000-₹18,000',
          includes: [
            'Vedic astrology foundations',
            'Birth chart calculation',
            'Chart interpretation techniques',
            'Planetary system study',
            'Professional diploma',
          ],
        },
        {
          name: 'Weekly Classes',
          duration: '12-16 weeks',
          description: 'Comprehensive weekly astrology training with practical application.',
          price: '₹14,000-₹19,000',
          includes: [
            'Complete astrology curriculum',
            'Weekly chart reading practice',
            'Dasha and transit study',
            'Predictive techniques',
            'Client consultation practice',
            'Professional diploma',
          ],
        },
        {
          name: 'Online Course',
          duration: 'Self-paced',
          description: 'Video-based Vedic astrology learning with chart software.',
          price: '₹7,000-₹12,000',
          includes: [
            'Complete video modules',
            'Chart software training',
            'Study materials',
            'Lifetime access',
            'Email mentoring',
            'Digital diploma',
          ],
        },
        {
          name: 'Private Training',
          duration: 'Customized',
          description: 'One-on-one personalized Vedic astrology training.',
          price: '₹2,000-₹3,500/hour',
          includes: [
            'Personalized curriculum',
            'One-on-one mentorship',
            'Chart analysis guidance',
            'Flexible scheduling',
            'Direct feedback',
            'Diploma upon completion',
          ],
        },
      ]}
      curriculum={[
        {
          title: 'Level 1 - Foundations of Vedic Astrology',
          description: 'Learn the basics, zodiac signs, planetary positions, houses, and how to interpret birth charts.',
        },
        {
          title: 'Level 2 - Chart Reading Mastery',
          description: 'Master birth chart interpretation, aspects, yogas (planetary combinations), and karmic analysis.',
        },
        {
          title: 'Level 3 - Advanced Predictive Techniques',
          description: 'Learn dashas (time periods), transits, progressions, and advanced prediction methods.',
        },
        {
          title: 'Level 4 - Professional Astrology Practice',
          description: 'Develop client consultation skills, remedies, gemstone recommendations, and build your astrology practice.',
        },
      ]}
    />
  );
}
