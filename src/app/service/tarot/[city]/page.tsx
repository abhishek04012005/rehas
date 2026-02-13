import type { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { tarotData } from '@/data/tarot';
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

  const title = `Tarot Reading in ${cityData.name} | REHAS`;
  const description = `Professional tarot reading and card divination in ${cityData.name}, ${cityData.state}. Get insights into your life through tarot.`;
  const keywords = [
    `Tarot reading ${cityData.name}`,
    `Tarot cards ${cityData.name}`,
    `Card divination ${cityData.name}`,
    'Tarot Reading',
    'Tarot Cards',
  ];

  const url = `${siteConfig.domain}/service/tarot/${city}`;

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
    ...tarotData,
    hero: {
      ...tarotData.hero,
      title: `Tarot Reading in ${cityData.name}`,
      subtitle: `Expert tarot divination services available in ${cityData.name}, ${cityData.state}`,
    },
  };

  return <HealingService data={enhancedData} />;
}
