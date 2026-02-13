import type { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { vedicAstroData } from '@/data/vedicAstro';
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

  const title = `Vedic Astrology in ${cityData.name} | REHAS`;
  const description = `Professional vedic astrology services in ${cityData.name}, ${cityData.state}. Traditional Hindu astrological guidance.`;
  const keywords = [
    `Vedic astrology ${cityData.name}`,
    `Hindu astrology ${cityData.name}`,
    `Vedic horoscope ${cityData.name}`,
    'Vedic Astrology',
    'Hindu Astrology',
  ];

  const url = `${siteConfig.domain}/astrology/vedic/${city}`;

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
    ...vedicAstroData,
    hero: {
      ...vedicAstroData.hero,
      title: `Vedic Astrology in ${cityData.name}`,
      subtitle: `Traditional vedic astrology services available in ${cityData.name}, ${cityData.state}`,
    },
  };

  return <HealingService data={enhancedData} />;
}
