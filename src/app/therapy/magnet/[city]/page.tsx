import type { Metadata } from 'next';
import HealingService from '@/components/healingService';
import { magnetTherapyData } from '@/data/magnetTherapy';
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

  const title = `Magnet Therapy in ${cityData.name} | REHAS`;
  const description = `Professional magnet therapy in ${cityData.name}, ${cityData.state}. Magnetic healing for pain relief and wellness.`;
  const keywords = [
    `Magnet therapy ${cityData.name}`,
    `Magnetic healing ${cityData.name}`,
    `Magnet therapy treatment ${cityData.name}`,
    'Magnet Therapy',
    'Magnetic Healing',
  ];

  const url = `${siteConfig.domain}/therapy/magnet/${city}`;

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


interface CityPageProps {
  params: Promise<{ city: string }>;
}

export default async function CityMagnetPage({ params }: CityPageProps) {
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

  const cityData_therapy = {
    ...magnetTherapyData,
    hero: {
      ...magnetTherapyData.hero,
      title: `Magnet Therapy in ${cityData.name}`,
      subtitle: `Magnetic Healing for Wellness in ${cityData.name}, ${cityData.state}`,
      description: `Experience magnet therapy in ${cityData.name}. Harness the power of magnetic healing for pain relief and wellness.`,
    },
  };

  return <HealingService data={cityData_therapy} />;
}
