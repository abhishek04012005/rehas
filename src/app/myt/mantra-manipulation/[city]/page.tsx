import type { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { mantraManipulationData } from '@/data/mantraManipulation';
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

  const title = `Mantra Manipulation in ${cityData.name} | REHAS`;
  const description = `Master mantra manipulation techniques in ${cityData.name}, ${cityData.state}. Advanced sound energy practices.`;
  const keywords = [
    `Mantra manipulation ${cityData.name}`,
    `Sound energy ${cityData.name}`,
    `Mantra techniques ${cityData.name}`,
    'Mantra Manipulation',
    'Sound Energy',
  ];

  const url = `${siteConfig.domain}/myt/mantra-manipulation/${city}`;

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

export default async function MantraManipulationPage({ params }: Props) {
  const { city } = await params;
  const cityData = getCityBySlug(city);

  if (!cityData) {
    return <div>City not found</div>;
  }

  const enhancedData = {
    ...mantraManipulationData,
    hero: {
      ...mantraManipulationData.hero,
      title: `Mantra Manipulation in ${cityData.name}`,
      subtitle: `Learn advanced mantra manipulation in ${cityData.name}, ${cityData.state}`,
    },
  };

  return <HealingService data={enhancedData} />;
}
