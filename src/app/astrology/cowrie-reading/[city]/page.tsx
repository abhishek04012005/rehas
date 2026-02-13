import type { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { cowrieReadingData } from '@/data/cowrieReading';
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

  const title = `Cowrie Reading in ${cityData.name} | REHAS`;
  const description = `Traditional cowrie shell reading in ${cityData.name}, ${cityData.state}. Ancient divination practice for insights.`;
  const keywords = [
    `Cowrie reading ${cityData.name}`,
    `Shell divination ${cityData.name}`,
    `Cowrie shells ${cityData.name}`,
    'Cowrie Reading',
    'Shell Divination',
  ];

  const url = `${siteConfig.domain}/astrology/cowrie-reading/${city}`;

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


export default async function AstrologyPage({ params }: Props) {
  const { city } = await params;
  const cityData = getCityBySlug(city);

  if (!cityData) {
    return <div>City not found</div>;
  }

  const enhancedData = {
    ...cowrieReadingData,
    hero: {
      ...cowrieReadingData.hero,
      title: `Cowrie Reading in ${cityData.name}`,
      subtitle: `Traditional cowrie shell divination available in ${cityData.name}, ${cityData.state}`,
    },
  };

  return <HealingService data={enhancedData} />;
}
