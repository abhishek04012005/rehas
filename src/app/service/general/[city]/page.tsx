import type { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { generalData } from '@/data/general';
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

  const title = `General Services in ${cityData.name} | REHAS`;
  const description = `General wellness services in ${cityData.name}, ${cityData.state}. Holistic healing and wellness consultation.`;
  const keywords = [
    `General services ${cityData.name}`,
    `Wellness services ${cityData.name}`,
    `Holistic healing ${cityData.name}`,
    'General Services',
    'Wellness Consultation',
  ];

  const url = `${siteConfig.domain}/service/general/${city}`;

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

export default async function ServicePage({ params }: Props) {
  const { city } = await params;
  const cityData = getCityBySlug(city);

  if (!cityData) {
    return <div>City not found</div>;
  }

  const enhancedData = {
    ...generalData,
    hero: {
      ...generalData.hero,
      title: `General Services in ${cityData.name}`,
      subtitle: `Comprehensive wellness services available in ${cityData.name}, ${cityData.state}`,
    },
  };

  return <HealingService data={enhancedData} />;
}
