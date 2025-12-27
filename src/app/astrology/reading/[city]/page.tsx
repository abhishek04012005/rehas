import type { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { astrologyReadingData } from '@/data/astrologyReading';
import { getCityBySlug, getAllCitySlugs } from '@/data/cities';
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

  const title = `Astrology Reading in ${cityData.name} | REHAS`;
  const description = `Expert astrology reading in ${cityData.name}, ${cityData.state}. Detailed astrological insights and predictions.`;
  const keywords = [
    `Astrology reading ${cityData.name}`,
    `Astrological reading ${cityData.name}`,
    `Birth chart reading ${cityData.name}`,
    'Astrology Reading',
    'Astrological Insights',
  ];

  const url = `${siteConfig.domain}/astrology/reading/${city}`;

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
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteConfig.ogImage],
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

export default async function AstrologyPage({ params }: Props) {
  const { city } = await params;
  const cityData = getCityBySlug(city);

  if (!cityData) {
    return <div>City not found</div>;
  }

  const enhancedData = {
    ...astrologyReadingData,
    hero: {
      ...astrologyReadingData.hero,
      title: `Astrology Reading in ${cityData.name}`,
      subtitle: `Expert astrology reading and guidance available in ${cityData.name}, ${cityData.state}`,
    },
  };

  return <HealingService data={enhancedData} />;
}
