import type { Metadata } from 'next';
import CourseListing from '@/components/courseListing';
import { getCityBySlug, getAllCitySlugs } from '../../../../data/cities';
import { siteConfig } from '@/lib/seoConfig';

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const cityData = getCityBySlug(city);

  if (!cityData) {
    return {
      title: 'City Not Found | REHAS',
      description: 'The requested city page could not be found.',
    };
  }

  const title = `MYT Courses in ${cityData.name} | REHAS`;
  const description = `Learn advanced spiritual sciences in ${cityData.name}, ${cityData.state}. Master Mantra vortex, Yantra sacred geometry, and Tantra practices with certified spiritual teachers.`;
  const keywords = [
    `MYT courses ${cityData.name}`,
    `Mantra training ${cityData.name}`,
    `Yantra course ${cityData.name}`,
    `Tantra training ${cityData.name}`,
    `Spiritual science ${cityData.name}`,
    'Mantra',
    'Yantra',
    'Tantra',
    'Spiritual Training',
  ];

  const url = `${siteConfig.domain}/courses/myt/${city}`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteConfig.ogImage],
      creator: siteConfig.twitter,
    },
    alternates: {
      canonical: url,
    },
  };
}


interface CityHealingCoursesPageProps {
  params: Promise<{ city: string }>;
}

export default async function CityHealingCourses({ params }: CityHealingCoursesPageProps) {
  const { city } = await params;
  const cityData = getCityBySlug(city);

  if (!cityData) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>City Not Found</h1>
        <p>The requested city page could not be found. Please check the URL and try again.</p>
      </div>
    );
  }

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
      title={`MYT Courses in ${cityData.name}`}
      subtitle={`Mantra, Yantra & Tantra in ${cityData.state}`}
      description={`Master advanced spiritual practices in ${cityData.name}. Learn Mantra, Yantra, and Tantra from certified spiritual teachers.`}
      courses={courses}
    />
  );
}
