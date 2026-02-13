import type { Metadata } from 'next';
import HealingService from '@/components/healingService';
import { astroReportData } from '@/data/astroReport';
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

  const title = `Astro Report in ${cityData.name} | REHAS`;
  const description = `Professional astro reports in ${cityData.name}, ${cityData.state}. Detailed astrological analysis and predictions.`;
  const keywords = [
    `Astro report ${cityData.name}`,
    `Astrological report ${cityData.name}`,
    `Birth chart analysis ${cityData.name}`,
    'Astro Report',
    'Astrological Analysis',
  ];

  const url = `${siteConfig.domain}/service/astro-report/${city}`;

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
    ...astroReportData,
    hero: {
      ...astroReportData.hero,
      title: `Astro Report in ${cityData.name}`,
      subtitle: `Professional astrological consultation services in ${cityData.name}, ${cityData.state}`,
    },
  };

  return <HealingService data={enhancedData} />;
}
