import type { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { palmReadingData } from '@/data/palmReading';
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

  const title = `Palm Reading in ${cityData.name} | REHAS`;
  const description = `Expert palm reading and palmistry services in ${cityData.name}, ${cityData.state}. Discover your future through palmistry.`;
  const keywords = [
    `Palm reading ${cityData.name}`,
    `Palmistry ${cityData.name}`,
    `Hand reading ${cityData.name}`,
    'Palm Reading',
    'Palmistry',
  ];

  const url = `${siteConfig.domain}/service/palm-reading/${city}`;

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


export default async function ServicePage({ params }: Props) {
  const { city } = await params;
  const cityData = getCityBySlug(city);

  if (!cityData) {
    return <div>City not found</div>;
  }

  const enhancedData = {
    ...palmReadingData,
    hero: {
      ...palmReadingData.hero,
      title: `Palm Reading in ${cityData.name}`,
      subtitle: `Authentic palmistry services available in ${cityData.name}, ${cityData.state}`,
    },
  };

  return <HealingService data={enhancedData} />;
}
