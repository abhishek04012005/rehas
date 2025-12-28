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

  const title = `Healing Courses in ${cityData.name} | REHAS`;
  const description = `Learn professional healing practices in ${cityData.name}, ${cityData.state}. Master Reiki, Mantra Healing, and Tantra with certified instructors. Get certified healing practitioner training.`;
  const keywords = [
    `Healing courses ${cityData.name}`,
    `Reiki training ${cityData.name}`,
    `Mantra healing course ${cityData.name}`,
    `Tantra practice ${cityData.name}`,
    `Energy healing certification ${cityData.name}`,
    'Healing Courses',
    'Reiki Training',
    'Mantra Healing',
    'Tantra Practice',
  ];

  const url = `${siteConfig.domain}/courses/healing/${city}`;

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
  return getAllCitySlugs().map((slug: any) => ({
    city: slug,
  }));
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
      name: 'Reiki Healing',
      description: `Master Reiki in ${cityData.name}. Learn energy healing from basics to Grand Master level with attunements and advanced techniques.`,
      price: '₹1 - ₹34,999',
      originalPrice: '₹34,999',
      href: '/courses/healing/reiki',
      image: 'Favorite',
      imageUrl: '/assets/course/reikiCourse.png',
      level: 'Beginner to Master',
    },
    {
      name: 'Angel Blessing',
      description: `Connect with angelic energy in ${cityData.name}. Learn divine healing and ascended master techniques for transformation.`,
      price: '₹5,099 - ₹20,999',
      href: '/courses/healing/angel-blessing',
      image: 'AutoAwesome',
      imageUrl: '/assets/course/healing/angelblessing.png',
      level: 'Beginner to Advanced',
    },
    {
      name: 'Lama Fera',
      description: `Master Lama Fera healing in ${cityData.name}. Learn powerful healing systems for spiritual transformation.`,
      price: '₹5,099 - ₹20,999',
      href: '/courses/healing/lamafera',
      image: 'Spa',
      imageUrl: '/assets/course/healing/lamaferra.png',
      level: 'Beginner to Advanced',
    },
  ];

  return (
    <CourseListing
      title={`Healing Courses in ${cityData.name}`}
      subtitle={`Master Ancient & Modern Healing Practices in ${cityData.state}`}
      description={`Learn professional healing skills in ${cityData.name}. Transform lives and master multiple healing modalities with certified masters.`}
      courses={courses}
    />
  );
}
