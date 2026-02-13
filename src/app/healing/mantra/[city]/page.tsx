import type { Metadata } from 'next';
import HealingService from '@/components/healingService';
import { mantraData } from '@/data/mantra';
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

  const title = `Mantra Healing in ${cityData.name} | REHAS`;
  const description = `Experience sacred mantra healing and meditation in ${cityData.name}, ${cityData.state}. Learn the power of sacred chanting for spiritual transformation and wellness.`;
  const keywords = [
    `Mantra healing ${cityData.name}`,
    `Sacred chanting ${cityData.name}`,
    `Mantra meditation ${cityData.name}`,
    `Sound healing ${cityData.name}`,
    `Vedic mantras ${cityData.name}`,
    'Mantra',
    'Mantra Meditation',
    'Sacred Chanting',
    'Spiritual Healing',
  ];

  const url = `${siteConfig.domain}/healing/mantra/${city}`;

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
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteConfig.ogImage],
      creator: siteConfig.twitter,
    },
    alternates: {
      canonical: url,
    },
  };
}


interface CityMantraPageProps {
  params: Promise<{ city: string }>;
}

export default async function CityMantraPage({ params }: CityMantraPageProps) {
  const { city } = await params;
  const cityData = getCityBySlug(city);

  if (!cityData) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>City Not Found</h1>
        <p>The requested city page could not be found. Please check the URL and try again.</p>
      </div>
    );
  }

  // Enhance the mantra data with city-specific information
  const cityMantraData = {
    ...mantraData,
    hero: {
      ...mantraData.hero,
      title: `Mantra Healing in ${cityData.name}`,
      subtitle: `Sacred Chanting & Spiritual Wellness in ${cityData.name}, ${cityData.state}`,
      description: `Discover the transformative power of sacred mantras in ${cityData.name}. Our experienced practitioners guide you through mantra meditation for healing and spiritual growth.`,
    },
  };

  return <HealingService data={cityMantraData} />;
}
