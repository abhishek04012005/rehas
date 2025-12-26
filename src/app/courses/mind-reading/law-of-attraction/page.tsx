import { Metadata } from 'next';
import CourseDetail from '@/components/courseDetail/courseDetail';

export const metadata: Metadata = {
    title: 'Law of Attraction Courses | Ho\'oponopono & Advanced Techniques | REHAS',
    description:
        'Master the law of attraction with Ho\'oponopono and advanced techniques. Learn to attract abundance, success, and fulfillment.',
    keywords: [
        'Law of Attraction',
        'Ho\'oponopono',
        'Law of Attraction Training',
        'Abundance Attraction',
        'Success Mindset',
    ],
    openGraph: {
        title: 'Law of Attraction Courses | REHAS',
        description: 'Master the law of attraction for unlimited abundance and success.',
        type: 'website',
    },
};

export default function LawOfAttractionCourseDetailPage() {
    return (
        <CourseDetail
            courseName="Law of Attraction Courses"
            category="mind-reading"
            description="Master the universal law of attraction with Ho'oponopono and advanced law of attraction practices"
            meaning="The Law of Attraction is a universal principle stating that you attract what you focus on, think about, and believe. It operates through vibration and consciousness. Ho'oponopono is an ancient Hawaiian practice of forgiveness and healing that amplifies the law of attraction. Our comprehensive courses teach the law of attraction principles, Ho'oponopono techniques, and advanced practices to attract abundance, health, relationships, and success into your life."
            benefit="Law of attraction mastery; Vibration elevation; Ho'oponopono healing abilities; Limiting belief removal; Abundance consciousness; Manifestation acceleration; Professional coaching expertise"
            use="Personal abundance and success attraction; Healing relationships and situations; Financial wealth creation; Career advancement; Health and wellness optimization; Professional law of attraction coaching"
            price="₹2,099 - ₹20,999"
            duration="30 days - 90 days"
            level="Beginner to Advanced"
            image="/assets/course/mind-reading/lawofattraction.png"
            sessions={[
                {
                    name: 'Ho\'oponopono',
                    duration: '30 days',
                    description: 'Learn the powerful Hawaiian practice of Ho\'oponopono for healing and attraction.',
                    price: '₹2,099',
                    originalPrice: '₹5,099',
                    includes: [
                        'Ho\'oponopono principles and history',
                        'Forgiveness and healing techniques',
                        'Self-cleaning practices',
                        'Relationship healing methods',
                        'Daily practice routines',
                        'Course materials',
                    ],
                },
                {
                    name: 'Law of Attraction Practitioner',
                    duration: '60 days',
                    price: '₹10,999',
                    originalPrice: '₹10,999',
                    description: 'Comprehensive law of attraction training with practical techniques and applications.',
                    includes: [
                        'Complete law of attraction system',
                        'Ho\'oponopono advanced techniques',
                        'Vibration alignment methods',
                        'Manifestation acceleration tools',
                        'Abundance consciousness building',
                        'Client coaching practice',
                        'Professional certification',
                        'Extended support included',
                    ],
                },
                {
                    name: 'Law of Attraction Advanced',
                    duration: '90 days',
                    price: '₹20,999',
                    originalPrice: '₹20,999',
                    description: 'Master-level training in advanced law of attraction and professional coaching.',
                    includes: [
                        'Advanced law of attraction mastery',
                        'Quantum attraction principles',
                        'Ho\'oponopono mastery',
                        'Reality shifting techniques',
                        'Synchronicity and flow activation',
                        'Professional practice development',
                        'Client transformation methods',
                        'Master certification',
                        'Lifetime mentorship support',
                    ],
                },
            ]}
            pricingPlans={[
                {
                    name: 'Ho\'oponopono',
                    duration: '30 days',
                    price: '₹2,099',
                    originalPrice: '₹5,099',
                    description: 'Perfect for beginners wanting to learn the powerful Hawaiian practice of Ho\'oponopono.',
                    includes: [
                        'Ho\'oponopono principles and history',
                        'Forgiveness and healing techniques',
                        'Self-cleaning practices',
                        'Relationship healing methods',
                        'Daily practice routines',
                        'Digital course materials',
                    ],
                },
                {
                    name: 'Law of Attraction Practitioner',
                    duration: '60 days',
                    price: '₹10,999',
                    originalPrice: '₹19,999',
                    description: 'Comprehensive law of attraction training with proven techniques and practical applications.',
                    includes: [
                        'Complete law of attraction system',
                        'Ho\'oponopono advanced techniques',
                        'Vibration alignment methods',
                        'Manifestation acceleration tools',
                        'Abundance consciousness building',
                        'Client coaching practice',
                        'Professional certification',
                        'Extended support included',
                    ],
                },
                {
                    name: 'Law of Attraction Advanced',
                    duration: '90 days',
                    price: '₹20,999',
                    originalPrice: '₹29,999',
                    description: 'Master-level law of attraction training with quantum principles and professional coaching abilities.',
                    includes: [
                        'Advanced law of attraction mastery',
                        'Quantum attraction principles',
                        'Ho\'oponopono mastery',
                        'Reality shifting techniques',
                        'Synchronicity and flow activation',
                        'Professional practice development',
                        'Client transformation methods',
                        'Master certification',
                        'Lifetime mentorship support',
                    ],
                },
            ]}
            curriculum={[
                {
                    title: 'Module 1 - Law of Attraction Principles',
                    description: 'Learn the universal law of attraction, vibration, resonance, and consciousness principles.',
                },
                {
                    title: 'Module 2 - Ho\'oponopono Healing',
                    description: 'Master Ho\'oponopono practices for forgiveness, healing, and emotional clearing.',
                },
                {
                    title: 'Module 3 - Advanced Attraction Techniques',
                    description: 'Learn advanced manifestation tools, vision boarding, scripting, and vibration alignment.',
                },
                {
                    title: 'Module 4 - Professional Coaching & Mastery',
                    description: 'Develop coaching skills to help others attract abundance and transform their lives.',
                },
            ]}
        />
    );
}
