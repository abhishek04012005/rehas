import type { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { yanthaData } from '@/data/yantra';
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

  const title = `Yantra in ${cityData.name} | REHAS`;
  const description = `Explore sacred yantra practices in ${cityData.name}, ${cityData.state}. Geometric energy patterns for spiritual transformation.`;
  const keywords = [
    `Yantra ${cityData.name}`,
    `Sacred geometry ${cityData.name}`,
    `Yantra meditation ${cityData.name}`,
    'Yantra',
    'Sacred Geometry',
  ];

  const url = `${siteConfig.domain}/myt/yantra/${city}`;

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

export default async function YantraPage({ params }: Props) {
  const { city } = await params;
  const cityData = getCityBySlug(city);

  if (!cityData) {
    return <div>City not found</div>;
  }

  const enhancedData = {
    ...yanthaData,
    hero: {
      ...yanthaData.hero,
      title: `Yantra in ${cityData.name}`,
      subtitle: `Master sacred yantra practices in ${cityData.name}, ${cityData.state}`,
    },
  };

  return <HealingService data={enhancedData} />;
}
