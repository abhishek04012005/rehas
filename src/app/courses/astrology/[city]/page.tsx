import type { Metadata } from 'next';
import CourseListing from '@/components/courseListing/courseListing';
import { courseAstrologyData } from '@/data/courseAstrology';
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

  const title = `Astrology Courses in ${cityData.name} | REHAS`;
  const description = `Master Vedic Astrology with certified instructors in ${cityData.name}, ${cityData.state}. Learn birth chart analysis, numerology, and tarot reading with professional certification.`;
  const keywords = [
    `Astrology courses ${cityData.name}`,
    `Vedic astrology training ${cityData.name}`,
    `Numerology course ${cityData.name}`,
    `Tarot reading course ${cityData.name}`,
    `Astrology certification ${cityData.name}`,
    'Astrology Courses',
    'Vedic Astrology Training',
    'Numerology Course',
    'Tarot Reading',
  ];

  const url = `${siteConfig.domain}/courses/astrology/${city}`;

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


interface CityAstrologyCoursesPageProps {
  params: Promise<{ city: string }>;
}

export default async function CityAstrologyCourses({ params }: CityAstrologyCoursesPageProps) {
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
      name: 'Vedic Astrology Diploma',
      description: `Complete Vedic astrology training in ${cityData.name}. Learn horoscope reading, planetary positions and cosmic timing.`,
      price: '₹5,099 - ₹34,999',
      href: '/courses/astrology/vedic',
      image: 'StarOutlined',
      imageUrl: '/assets/course/astrology/vedic.png',
      level: 'Beginner to Master',
    },
    {
      name: 'Numerology Certification',
      description: `Master numerology in ${cityData.name}. Learn the science of numbers and their influence on life and destiny.`,
      price: '₹5,099 - ₹20,999',
      href: '/courses/astrology/numerology',
      image: 'CalculateOutlined',
      imageUrl: '/assets/course/astrology/numerlogy.png',
      level: 'All Levels',
    },
    {
      name: 'Tarot Reading Course',
      description: `Advanced tarot training in ${cityData.name}. Master card reading, interpretation, and intuitive guidance.`,
      price: '₹2,099 - ₹10,999',
      href: '/courses/astrology/tarot',
      image: 'PokerOutlined',
      imageUrl: '/assets/course/astrology/tarrot.png',
      level: 'Beginner to Intermediate',
    },
  ];

  return (
    <CourseListing
      title={`Astrology Courses in ${cityData.name}`}
      subtitle={`Master Vedic Astrology, Numerology & Divination in ${cityData.state}`}
      description={`Discover the ancient wisdom of the cosmos with our astrology courses in ${cityData.name}. Learn to read the stars, understand destiny, and provide divine guidance.`}
      courses={courses}
    />
  );
}
