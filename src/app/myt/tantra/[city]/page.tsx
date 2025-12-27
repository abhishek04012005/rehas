import type { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { mytTantraData } from '@/data/mytTantra';
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

  const title = `M.Y.T Tantra in ${cityData.name} | REHAS`;
  const description = `Master the ancient science of tantra in ${cityData.name}, ${cityData.state}. Spiritual practices for energy transformation.`;
  const keywords = [
    `MYT tantra ${cityData.name}`,
    `Tantra practices ${cityData.name}`,
    `Energy transformation ${cityData.name}`,
    'MYT Tantra',
    'Tantric Practices',
  ];

  const url = `${siteConfig.domain}/myt/tantra/${city}`;

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

export default async function MYTTantraPage({ params }: Props) {
  const { city } = await params;
  const cityData = getCityBySlug(city);

  if (!cityData) {
    return <div>City not found</div>;
  }

  const enhancedData = {
    ...mytTantraData,
    hero: {
      ...mytTantraData.hero,
      title: `M.Y.T Tantra in ${cityData.name}`,
      subtitle: `Master ancient tantric practices in ${cityData.name}, ${cityData.state}`,
    },
  };

  return <HealingService data={enhancedData} />;
}
