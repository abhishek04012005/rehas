import { Metadata } from 'next';
import CourseDetail from '@/components/courseDetail/courseDetail';

export const metadata: Metadata = {
    title: 'Tantra Courses | Meditation & Esoteric Wisdom | REHAS',
    description:
        'Master tantric wisdom and meditation-based healing practices. Learn Krishna-Kali sadhna, tantra healing, and esoteric knowledge.',
    keywords: [
        'Tantra Courses',
        'Tantra Sadhna',
        'Meditation Tantra',
        'Esoteric Wisdom',
        'Healing Practices',
        'Consciousness Expansion',
    ],
    openGraph: {
        title: 'Tantra Courses | REHAS',
        description: 'Master tantric practices for spiritual transformation and healing.',
        type: 'website',
    },
};

export default function TantraCourseDetailPage() {
    return (
        <CourseDetail
            courseName="Tantra Courses"
            category="myt"
            description="Explore tantric wisdom and meditation-based healing practices for spiritual transformation and consciousness expansion"
            meaning="Tantra is a comprehensive spiritual path that embraces all aspects of existence for rapid spiritual transformation. Tantric practices work with energy (Shakti), consciousness (Shiva), and divine union to accelerate spiritual growth and healing. Our tantra courses teach authentic tantric wisdom, meditation-based healing techniques, advanced spiritual practices, and how to integrate tantra into daily life for profound spiritual development and enlightenment."
            benefit="Deep tantric wisdom and philosophy; Meditation mastery; Healing and transformation abilities; Energy and chakra activation; Kundalini awakening support; Consciousness expansion; Spiritual power development"
            use="Personal spiritual transformation; Advanced meditation practice; Energy and consciousness work; Healing for self and others; Chakra and kundalini development; Professional tantra coaching; Building a spiritual practice"
            price="₹2,099 - ₹20,999"
            duration="7 days - 180 days"
            level="Beginner to Advanced"
            image="/assets/course/myt/tantra.png"
            pricingPlans={[
                {
                    name: 'Meditation Based Tantra Healing Sadhna',
                    duration: '7 days',
                    price: '₹2,099',
                    originalPrice: '₹5,099',
                    description: 'Perfect for beginners wanting to learn meditation-based tantric healing and foundational practices.',
                    includes: [
                        'Tantra basics and philosophy',
                        'Meditation-based healing introduction',
                        'Energy body awareness',
                        'Basic chakra techniques',
                        'Sadhna fundamentals',
                        'Daily practice guidelines',
                        'Digital course materials',
                    ],
                },
                {
                    name: 'Krishna Kali Sadhna with Vigyan Bhairav Sadhna',
                    duration: '30 days',
                    price: '₹10,999',
                    originalPrice: '₹17,999',
                    description: 'Advanced tantric sadhna combining divine masculine and feminine energies for transformation.',
                    includes: [
                        'Krishna principle and practice',
                        'Kali sadhna techniques',
                        'Vigyan Bhairav principles',
                        'Advanced meditation practices',
                        'Energy and consciousness work',
                        'Chakra activation and balancing',
                        'Professional level training',
                        'Hands-on guidance and practice',
                    ],
                },
                {
                    name: 'Tantra Esoteric Wisdom',
                    duration: '180 days',
                    price: '₹20,999',
                    originalPrice: '₹29,999',
                    description: 'Master-level training in complete tantric philosophy with advanced spiritual practices and wisdom.',
                    includes: [
                        'Complete tantric philosophy',
                        'Esoteric wisdom teachings',
                        'Advanced meditation techniques',
                        'Kundalini awakening guidance',
                        'Chakra mastery and integration',
                        'Healing and transformation methods',
                        'Professional practice development',
                        'Master certification',
                        'Extended mentorship support',
                    ],
                },
            ]}
            curriculum={[
                {
                    title: 'Module 1 - Tantra Philosophy & Foundations',
                    description: 'Learn the principles of tantra, the path of rapid spiritual transformation, and foundational practices.',
                },
                {
                    title: 'Module 2 - Energy, Chakra & Kundalini Mastery',
                    description: 'Master energy body anatomy, chakra systems, kundalini awakening, and energy channel activation.',
                },
                {
                    title: 'Module 3 - Meditation & Healing Practices',
                    description: 'Learn advanced meditation techniques, healing practices, and methods for consciousness expansion.',
                },
                {
                    title: 'Module 4 - Advanced Tantra & Professional Practice',
                    description: 'Develop mastery in advanced tantric teachings, teaching abilities, and professional coaching expertise.',
                },
            ]}
        />
    );
}
