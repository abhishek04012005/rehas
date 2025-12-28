import type { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { esotericWisdomData } from '@/data/esotericWisdom';
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

  const title = `Esoteric Wisdom in ${cityData.name} | REHAS`;
  const description = `Explore esoteric wisdom and hidden knowledge in ${cityData.name}, ${cityData.state}. Ancient spiritual teachings.`;
  const keywords = [
    `Esoteric wisdom ${cityData.name}`,
    `Hidden knowledge ${cityData.name}`,
    `Spiritual teachings ${cityData.name}`,
    'Esoteric Wisdom',
    'Spiritual Knowledge',
  ];

  const url = `${siteConfig.domain}/myt/esoteric/${city}`;

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

export default async function EsotericPage({ params }: Props) {
  const { city } = await params;
  const cityData = getCityBySlug(city);

  if (!cityData) {
    return <div>City not found</div>;
  }

  const enhancedData = {
    ...esotericWisdomData,
    hero: {
      ...esotericWisdomData.hero,
      title: `Esoteric Wisdom in ${cityData.name}`,
      subtitle: `Discover hidden spiritual knowledge in ${cityData.name}, ${cityData.state}`,
    },
  };

  return <HealingService data={enhancedData} />;
}
