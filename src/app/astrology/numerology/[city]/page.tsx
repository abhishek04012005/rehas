import type { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { numerologyData } from '@/data/numerology';
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

  const title = `Numerology in ${cityData.name} | REHAS`;
  const description = `Professional numerology services in ${cityData.name}, ${cityData.state}. Number analysis and life path guidance.`;
  const keywords = [
    `Numerology ${cityData.name}`,
    `Number analysis ${cityData.name}`,
    `Life path numerology ${cityData.name}`,
    'Numerology',
    'Number Analysis',
  ];

  const url = `${siteConfig.domain}/astrology/numerology/${city}`;

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
    ...numerologyData,
    hero: {
      ...numerologyData.hero,
      title: `Numerology in ${cityData.name}`,
      subtitle: `Professional numerology consultation available in ${cityData.name}, ${cityData.state}`,
    },
  };

  return <HealingService data={enhancedData} />;
}
