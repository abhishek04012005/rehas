import type { Metadata } from 'next';
import HealingService from '@/components/healingService';
import { healingServiceData } from '@/data/healingService';
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

  const title = `Healing Services in ${cityData.name} | REHAS`;
  const description = `Professional healing services in ${cityData.name}, ${cityData.state}. Energy healing and wellness practices.`;
  const keywords = [
    `Healing services ${cityData.name}`,
    `Energy healing ${cityData.name}`,
    `Wellness healing ${cityData.name}`,
    'Healing Services',
    'Energy Healing',
  ];

  const url = `${siteConfig.domain}/service/healing/${city}`;

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
    ...healingServiceData,
    hero: {
      ...healingServiceData.hero,
      title: `Healing Services in ${cityData.name}`,
      subtitle: `Authentic healing practices available in ${cityData.name}, ${cityData.state}`,
    },
  };

  return <HealingService data={enhancedData} />;
}
