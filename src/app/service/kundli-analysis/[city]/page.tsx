import type { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
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
  const description = `Professional kundli analysis in ${cityData.name}, ${cityData.state}. Birth chart reading and interpretation.`;
  const keywords = [
    `Kundli analysis ${cityData.name}`,
    `Birth chart ${cityData.name}`,
    `Kundli reading ${cityData.name}`,
    'Kundli Analysis',
    'Birth Chart Analysis',
  ];

  const url = `${siteConfig.domain}/service/kundli-analysis/${city}`;

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
    ...kundliAnalysisData,
    hero: {
      ...kundliAnalysisData.hero,
      title: `Kundli Analysis in ${cityData.name}`,
      subtitle: `Professional kundli reading and analysis in ${cityData.name}, ${cityData.state}`,
    },
  };

  return <HealingService data={enhancedData} />;
}
