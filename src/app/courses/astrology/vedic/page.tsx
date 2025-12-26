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
  return (
    <CourseDetail
      courseName="Vedic Astrology Diploma"
      category="astrology"
      description="Complete Vedic astrology training covering horoscope reading, planetary positions and cosmic timing"
      meaning="Vedic astrology, also known as Jyotish, is an ancient Indian science that uses the positions of celestial bodies to understand human destiny and life patterns. Our comprehensive diploma program teaches you the fundamentals of Vedic astrology, birth chart interpretation, planetary influences, dashas (time periods), and predictive techniques. You'll learn to read horoscopes with precision and provide meaningful guidance to clients."
      benefit="Birth chart analysis mastery; Planetary influence understanding; Predictive astrology techniques; Dasha and transit interpretation; Gemstone and remedy recommendations; Professional astrology consultation skills"
      use="Professional astrology consultation; Birth chart readings; Life guidance and counseling; Predictive analysis; Gemstone recommendations; Business and personal planning"
      price="₹5,099 - ₹34,999"
      duration="30 days - 180 days"
      level="Beginner to Master"
      image="/assets/course/astrology/vedic.png"
      sessions={[
        {
          name: 'Basic Astrology',
          duration: '30 days',
          description: 'Introduction to Vedic astrology fundamentals and birth chart basics.',
          price: '₹5,099',
          originalPrice: '₹5,099',
          includes: [
            'Vedic astrology foundations',
            'Zodiac signs and planetary positions',
            'Birth chart calculation basics',
            'House system introduction',
            'Astrology principles overview',
            'Course materials',
          ],
        },
        {
          name: 'Practitioner Astrology Course',
          duration: '90 days',
          description: 'Comprehensive practitioner-level training with advanced chart reading and prediction techniques.',
          price: '₹20,999',
          originalPrice: '₹20,999',
          includes: [
            'Complete astrology curriculum',
            'Advanced chart interpretation',
            'Dasha and transit mastery',
            'Predictive techniques',
            'Planetary combinations (yogas)',
            'Remedy and gemstone guidance',
            'Professional diploma',
          ],
        },
        {
          name: 'Astro Mastery Course',
          duration: '180 days',
          description: 'Master-level training with specialized techniques and professional practice development.',
          price: '₹34,999',
          originalPrice: '₹34,999',
          includes: [
            'Advanced predictive astrology',
            'Specialized reading techniques',
            'Business and relationship astrology',
            'Client consultation mastery',
            'Professional practice development',
            'Marketing and client management',
            'Master certification',
            'Lifetime mentorship support',
          ],
        },
      ]}
      pricingPlans={[
        {
          name: 'Basic Astrology',
          duration: '30 days',
          price: '₹5,099',
          originalPrice: '₹8,099',
          description: 'Perfect for beginners wanting to learn fundamental Vedic astrology and basic birth chart reading.',
          includes: [
            'Vedic astrology foundations',
            'Zodiac signs and planetary positions',
            'Birth chart calculation basics',
            'House system introduction',
            'Astrology principles overview',
            'Digital course materials',
          ],
        },
        {
          name: 'Practitioner Astrology Course',
          duration: '90 days',
          price: '₹20,999',
          originalPrice: '₹24,999',
          description: 'Comprehensive professional training with advanced chart reading and prediction techniques.',
          includes: [
            'Complete astrology curriculum',
            'Advanced chart interpretation',
            'Dasha and transit mastery',
            'Predictive techniques',
            'Planetary combinations (yogas)',
            'Remedy and gemstone guidance',
            'Professional diploma',
            'Extended support included',
          ],
        },
        {
          name: 'Astro Mastery Course',
          duration: '180 days',
          price: '₹34,999',
          originalPrice: '₹39,999',
          description: 'Master-level training with specialized techniques and comprehensive professional practice development.',
          includes: [
            'Advanced predictive astrology',
            'Specialized reading techniques',
            'Business and relationship astrology',
            'Client consultation mastery',
            'Professional practice development',
            'Marketing and client management',
            'Master certification',
            'Lifetime mentorship support',
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
