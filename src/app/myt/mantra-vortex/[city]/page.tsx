import type { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { mantraVortexData } from '@/data/mantraVortex';
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

  const title = `Mantra Vortex in ${cityData.name} | REHAS`;
  const description = `Experience mantra vortex energy healing in ${cityData.name}, ${cityData.state}. Powerful spiral energy techniques.`;
  const keywords = [
    `Mantra vortex ${cityData.name}`,
    `Vortex energy ${cityData.name}`,
    `Spiral healing ${cityData.name}`,
    'Mantra Vortex',
    'Vortex Energy',
  ];

  const url = `${siteConfig.domain}/myt/mantra-vortex/${city}`;

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

export default async function MantraVortexPage({ params }: Props) {
  const { city } = await params;
  const cityData = getCityBySlug(city);

  if (!cityData) {
    return <div>City not found</div>;
  }

  const enhancedData = {
    ...mantraVortexData,
    hero: {
      ...mantraVortexData.hero,
      title: `Mantra Vortex in ${cityData.name}`,
      subtitle: `Experience mantra vortex healing in ${cityData.name}, ${cityData.state}`,
    },
  };

  return <HealingService data={enhancedData} />;
}
