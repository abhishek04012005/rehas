import type { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { tantraData } from '@/data/tantra';
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

  const title = `Tantra Healing in ${cityData.name} | REHAS`;
  const description = `Experience ancient Tantra wisdom and spiritual awakening in ${cityData.name}, ${cityData.state}. Transform your consciousness and energy with tantric healing practices.`;
  const keywords = [
    `Tantra healing ${cityData.name}`,
    `Tantric practices ${cityData.name}`,
    `Energy work ${cityData.name}`,
    `Kundalini awakening ${cityData.name}`,
    `Spiritual practices ${cityData.name}`,
    'Tantra',
    'Tantric Healing',
    'Energy Work',
    'Spiritual Practices',
    'Consciousness',
  ];

  const url = `${siteConfig.domain}/healing/tantra/${city}`;

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

export async function generateStaticParams() {
  return getAllCitySlugs().map((slug) => ({
    city: slug,
  }));
}

interface CityTantraPageProps {
  params: Promise<{ city: string }>;
}

export default async function CityTantraPage({ params }: CityTantraPageProps) {
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

  // Enhance the tantra data with city-specific information
  const cityTantraData = {
    ...tantraData,
    hero: {
      ...tantraData.hero,
      title: `Tantra Healing in ${cityData.name}`,
      subtitle: `Ancient Wisdom & Spiritual Awakening in ${cityData.name}, ${cityData.state}`,
      description: `Explore the profound teachings of Tantra in ${cityData.name}. Our expert practitioners offer transformative sessions for energy healing and consciousness expansion.`,
    },
  };

  return <HealingService data={cityTantraData} />;
}
