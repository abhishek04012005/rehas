import type { Metadata } from 'next';
import HealingService from '@/components/healingService';
import { kundliAnalysisData } from '@/data/kundliAnalysis';
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

  const title = `Kundli Analysis in ${cityData.name} | REHAS`;
  const description = `Traditional Kundli analysis in ${cityData.name}, ${cityData.state}. Ancient divination practice for insights.`;
  const keywords = [
    `Kundli analysis ${cityData.name}`,
    `Kundli chart ${cityData.name}`,
    `Kundli guidance ${cityData.name}`,
    'Kundli Analysis',
    'Kundli Chart',
  ];

  const url = `${siteConfig.domain}/astrology/kundli-analysis/${city}`;

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
    ...kundliAnalysisData,
    hero: {
      ...kundliAnalysisData.hero,
      title: `Kundli Analysis in ${cityData.name}`,
      subtitle: `Get insights through Kundli analysis in ${cityData.name}, ${cityData.state}`,
    },
  };

  return <HealingService data={enhancedData} />;
}
