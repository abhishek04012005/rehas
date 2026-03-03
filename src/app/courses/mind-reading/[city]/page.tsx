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

  const title = `Mind Reading Courses in ${cityData.name} | REHAS`;
  const description = `Learn professional mind-reading and psychic development in ${cityData.name}, ${cityData.state}. Master manifestation, law of attraction, and mid brain activation with certified instructors.`;
  const keywords = [
    `Mind reading courses ${cityData.name}`,
    `Manifestation training ${cityData.name}`,
    `Law of attraction course ${cityData.name}`,
    `Mid brain activation ${cityData.name}`,
    `Psychic development ${cityData.name}`,
    'Mind Reading',
    'Manifestation',
    'Law of Attraction',
    'Mid Brain Activation',
  ];

  const url = `${siteConfig.domain}/courses/mind-reading/${city}`;

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
      name: 'Manifestation Course',
      description: 'Learn the science and practice of manifestation to attract your desires and create the life you want.',
      price: '₹2,099 - ₹10,999',
      href: '/courses/mind-reading/manifestation',
      image: 'AutoAwesome',
      imageUrl: '/assets/course/mind-reading/manifestation.png',
      level: 'Beginner to Advanced',
    },
    {
      name: 'Law of Attraction Course',
      description: 'Master the universal law of attraction and advanced manifestation techniques.',
      price: '₹2,099 - ₹20,999',
      href: '/courses/mind-reading/law-of-attraction',
      image: 'StarOutlined',
      imageUrl: '/assets/course/mind-reading/lawofattraction.png',
      level: 'Beginner to Advanced',
    },
    {
      name: 'Mid Brain Activation Course',
      description: 'Activate and develop your mid brain potential for enhanced intuition, memory, and mental abilities.',
      price: '₹5,099 - ₹20,999',
      href: '/courses/mind-reading/mid-brain-activation',
      image: 'Psychology',
      imageUrl: '/assets/course/mind-reading/midbrainactivation.png',
      level: 'All Ages',
    },
  ];

  return (
    <CourseListing
      title={`Mind Reading Courses in ${cityData.name}`}
      subtitle={`Master Mind Reading & Psychic Skills in ${cityData.state}`}
      description={`Learn professional mind-reading skills in ${cityData.name}. Enhance intuition, manifestation, and psychic ability with certified masters.`}
      courses={courses}
    />
  );
}
