import type { Metadata } from 'next';
import CourseListing from '@/components/courseListing/courseListing';
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

  const title = `Therapy Courses in ${cityData.name} | REHAS`;
  const description = `Professional therapy training in ${cityData.name}, ${cityData.state}. Master Acupressure, Marma Therapy, and Auricular Therapy with certified instructors. Get your therapist certification.`;
  const keywords = [
    `Therapy courses ${cityData.name}`,
    `Acupressure training ${cityData.name}`,
    `Marma therapy course ${cityData.name}`,
    `Auricular therapy ${cityData.name}`,
    `Therapist certification ${cityData.name}`,
    'Therapy Courses',
    'Acupressure Training',
    'Marma Therapy',
    'Auricular Therapy',
  ];

  const url = `${siteConfig.domain}/courses/therapy/${city}`;

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

export async function generateStaticParams() {
  return getAllCitySlugs().map((slug) => ({
    city: slug,
  }));
}

interface CityTherapyCoursesPageProps {
  params: Promise<{ city: string }>;
}

export default async function CityTherapyCourses({ params }: CityTherapyCoursesPageProps) {
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
      name: 'Acupressure Therapy Course',
      description: `Learn traditional acupressure in ${cityData.name}. Master pressure point therapy from basic to advanced levels.`,
      price: '₹2,099 - ₹24,999',
      originalPrice: '₹2,099 - ₹24,999',
      href: '/courses/therapy/acupressure',
      image: '/assets/course/therapy/acupressure.png',
      imageUrl: '/assets/course/therapy/acupressure.png',
      level: 'Beginner to Advanced',
    },
    {
      name: 'Magnet Therapy Course',
      description: `Discover healing power of magnetic therapy in ${cityData.name}. Learn magnetic healing applications.`,
      price: '₹2,099 - ₹24,999',
      originalPrice: '₹2,099 - ₹24,999',
      href: '/courses/therapy/magnet',
      image: '/assets/course/therapy/magnet.png',
      imageUrl: '/assets/course/therapy/magnet.png',
      level: 'Beginner to Advanced',
    },
    {
      name: 'Marma Therapy Course',
      description: `Master Marma point therapy in ${cityData.name}. Learn ancient vital point stimulation techniques.`,
      price: '₹2,099 - ₹50,999',
      originalPrice: '₹2,099 - ₹50,999',  
      href: '/courses/therapy/marma',
      image: '/assets/course/therapy/marma.png',
      imageUrl: '/assets/course/therapy/marma.png',
      level: 'Beginner to Advanced',
    },
  ];

  return (
    <CourseListing
      title={`Therapy Courses in ${cityData.name}`}
      subtitle={`Professional Certification in Healing Therapies in ${cityData.state}`}
      description={`Master healing therapies in ${cityData.name}. Learn traditional and modern therapeutic techniques with hands-on training.`}
      courses={courses}
    />
  );
}
