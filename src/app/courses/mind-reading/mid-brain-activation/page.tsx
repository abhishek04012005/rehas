import { Metadata } from 'next';
import CourseDetail from '@/components/courseDetail/courseDetail';

export const metadata: Metadata = {
  title: 'Mid Brain Activation Courses | Children & Adult Programs | REHAS',
  description:
    'Activate your mid brain potential for enhanced intuition, memory, and cognitive abilities. Programs for children and adults.',
  keywords: [
    'Mid Brain Activation',
    'Brain Development',
    'Intuition Enhancement',
    'Memory Improvement',
    'Cognitive Enhancement',
    'Child Development',
  ],
  openGraph: {
    title: 'Mid Brain Activation Courses | REHAS',
    description: 'Unlock your mid brain potential for extraordinary abilities.',
    type: 'website',
  },
};

export default function MidBrainActivationCourseDetailPage() {
  return (
    <CourseDetail
      courseName="Mid Brain Activation"
      category="mind-reading"
      description="Activate and develop your mid brain potential for enhanced intuition, memory, and mental abilities"
      meaning="The mid brain, or mesencephalon, is the bridge between the left and right brain hemispheres. When properly activated, it enhances intuition, photographic memory, visualization abilities, and higher cognitive functions. Our mid brain activation programs use proven techniques including meditation, special exercises, sound frequencies, and mental training to unlock the dormant potential of the mid brain. Suitable for both children and adults, these programs enhance learning, memory, creativity, and intuitive abilities."
      benefit="Enhanced intuition and sixth sense; Photographic memory development; Improved concentration and focus; Faster learning abilities; Enhanced creativity; Better problem-solving; Emotional balance and stability"
      use="Student academic performance improvement; Professional mental performance enhancement; Creative work and innovation; Enhanced decision-making; Intuitive guidance development; Holistic brain development"
      price="₹5,099 - ₹20,999"
      duration="90 days (All Programs)"
      level="All Ages"
      image="/assets/course/mind-reading/midbrainactivation.png"
      sessions={[
        {
          name: 'Basic Mid Brain Activation for Child',
          duration: '90 days',
          description: 'Mid brain activation program designed specifically for children ages 5-16.',
          price: '₹5,099',
          originalPrice: '₹5,099',
          includes: [
            'Mid brain fundamentals',
            'Child-friendly activation techniques',
            'Memory enhancement exercises',
            'Intuition development training',
            'Creative ability enhancement',
            'Progress tracking and assessment',
            'Parent guidance included',
          ],
        },
        {
          name: 'Mid Brain Activation for Adult',
          duration: '90 days',
          price: '₹10,999',
          originalPrice: '₹10,999',
          description: 'Comprehensive mid brain activation program for adult enhancement and development.',
          includes: [
            'Advanced mid brain science',
            'Adult-focused activation techniques',
            'Professional performance enhancement',
            'Intuitive ability development',
            'Creative and problem-solving enhancement',
            'Career and life advancement tools',
            'Professional certification',
            'Extended mentorship included',
          ],
        },
        {
          name: 'Mid Brain Activation Package',
          duration: '90 days',
          price: '₹20,999',
          originalPrice: '₹20,999',
          description: 'Comprehensive family package covering both children and adults with advanced techniques.',
          includes: [
            'Complete family mid brain program',
            'Individual customized training',
            'Group and one-on-one sessions',
            'Advanced activation techniques',
            'Brain enhancement optimization',
            'Lifestyle integration guidance',
            'Family wellness approach',
            'Master level certification',
            'Lifetime family support',
          ],
        },
      ]}
      pricingPlans={[
        {
          name: 'Basic Mid Brain Activation for Child',
          duration: '90 days',
          price: '₹5,099',
          originalPrice: '₹9,099',
          description: 'Perfect for children ages 5-16 wanting to enhance memory, intuition, and learning abilities.',
          includes: [
            'Mid brain fundamentals',
            'Child-friendly activation techniques',
            'Memory enhancement exercises',
            'Intuition development training',
            'Creative ability enhancement',
            'Progress tracking and assessment',
            'Parent guidance included',
          ],
        },
        {
          name: 'Mid Brain Activation for Adult',
          duration: '90 days',
          price: '₹10,999',
          originalPrice: '₹19,999',
          description: 'Comprehensive program for adults seeking enhanced mental performance and intuitive abilities.',
          includes: [
            'Advanced mid brain science',
            'Adult-focused activation techniques',
            'Professional performance enhancement',
            'Intuitive ability development',
            'Creative and problem-solving enhancement',
            'Career and life advancement tools',
            'Professional certification',
            'Extended mentorship included',
          ],
        },
        {
          name: 'Mid Brain Activation Package',
          duration: '90 days',
          price: '₹20,999',
          originalPrice: '₹29,999',
          description: 'Comprehensive family package for complete family brain development and enhancement.',
          includes: [
            'Complete family mid brain program',
            'Individual customized training',
            'Group and one-on-one sessions',
            'Advanced activation techniques',
            'Brain enhancement optimization',
            'Lifestyle integration guidance',
            'Family wellness approach',
            'Master level certification',
            'Lifetime family support',
          ],
        },
      ]}
      curriculum={[
        {
          title: 'Module 1 - Mid Brain Science & Fundamentals',
          description: 'Learn brain anatomy, mid brain function, and the science behind activation.',
        },
        {
          title: 'Module 2 - Activation Techniques & Exercises',
          description: 'Master proven techniques for mid brain activation, meditation, and mental exercises.',
        },
        {
          title: 'Module 3 - Memory & Intuition Enhancement',
          description: 'Develop photographic memory, intuition, and enhanced cognitive abilities.',
        },
        {
          title: 'Module 4 - Integration & Sustainable Development',
          description: 'Learn lifestyle practices to maintain and continue mid brain development.',
        },
      ]}
    />
  );
}
