import type { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { mytMantraData } from '@/data/mytMantra';
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

  const title = `M.Y.T Mantra in ${cityData.name} | REHAS`;
  const description = `Master the sacred science of mantras in ${cityData.name}, ${cityData.state}. Divine sound vibrations for consciousness elevation.`;
  const keywords = [
    `MYT mantra ${cityData.name}`,
    `Sacred mantra ${cityData.name}`,
    `Sound vibration ${cityData.name}`,
    'MYT Mantra',
    'Sacred Sound',
  ];

  const url = `${siteConfig.domain}/myt/mantra/${city}`;

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


export default async function MYTMantraPage({ params }: Props) {
  const { city } = await params;
  const cityData = getCityBySlug(city);

  if (!cityData) {
    return <div>City not found</div>;
  }

  const enhancedData = {
    ...mytMantraData,
    hero: {
      ...mytMantraData.hero,
      title: `M.Y.T Mantra in ${cityData.name}`,
      subtitle: `Master sacred mantras and consciousness elevation in ${cityData.name}, ${cityData.state}`,
    },
  };

  return <HealingService data={enhancedData} />;
}
