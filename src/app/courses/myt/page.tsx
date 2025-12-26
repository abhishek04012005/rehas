import { Metadata } from 'next';
import CourseListing from '@/components/courseListing/courseListing';
import { createMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = createMetadata(
  'MYT Courses | Mantra, Yantra, Tantra | REHAS',
  'Master advanced spiritual sciences. Learn Mantra, Yantra, and Tantra practices with our comprehensive courses from certified spiritual teachers.',
  [
    'Mantra Courses',
    'Yantra Courses',
    'Tantra Courses',
    'Spiritual Training',
    'Mantra Sadhna',
    'Tantra Sadhna',
    'Esoteric Wisdom',
    'MYT Training',
  ],
  '/courses/myt'
);

export default function MYTCoursesPage() {
    const courses = [
        {
            name: 'Mantra Courses',
            description: 'Master sacred mantras for manifestation, spiritual awakening, and energy healing through proven sadhna practices.',
            price: '₹2,099 - ₹10,999',
            href: '/courses/myt/mantra',
            image: 'AudiotrackOutlined',
            imageUrl: '/assets/course/myt/mantra.png',
            level: 'Beginner to Advanced',
        },
        {
            name: 'Yantra Courses',
            description: 'Learn the ancient science of yantras for spiritual power and divine energy activation through sacred geometry.',
            price: '₹5,099 - ₹20,999',
            href: '/courses/myt/yantra',
            image: 'AutoAwesome',
            imageUrl: '/assets/course/myt/yantra.png',
            level: 'Beginner to Advanced',
        },
        {
            name: 'Tantra Courses',
            description: 'Explore tantric wisdom and meditation-based healing practices for spiritual transformation and consciousness expansion.',
            price: '₹2,099 - ₹20,999',
            href: '/courses/myt/tantra',
            image: 'EmojiEventsOutlined',
            imageUrl: '/assets/course/myt/tantra.png',
            level: 'Beginner to Advanced',
        },
    ];

    return (
        <CourseListing
            title="MYT Courses"
            subtitle="Mantra, Yantra & Tantra - Ancient Spiritual Sciences"
            description="Master the sacred sciences of Mantra, Yantra, and Tantra. Learn ancient spiritual practices, meditation techniques, and esoteric wisdom from experienced spiritual teachers."
            courses={courses}
        />
    );
}
