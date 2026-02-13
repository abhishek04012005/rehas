import type { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { reikiTherapyData } from '@/data/reikiTherapy';
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

  const title = `Reiki Therapy in ${cityData.name} | REHAS`;
  const description = `Professional Reiki therapy in ${cityData.name}, ${cityData.state}. Energy healing and chakra balancing services.`;
  const keywords = [
    `Reiki therapy ${cityData.name}`,
    `Reiki healing ${cityData.name}`,
    `Energy therapy ${cityData.name}`,
    'Reiki Therapy',
    'Energy Healing',
  ];

  const url = `${siteConfig.domain}/therapy/reiki/${city}`;

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

export default async function CityReikiTherapyPage({ params }: CityPageProps) {
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
    ...reikiTherapyData,
    hero: {
      ...reikiTherapyData.hero,
      title: `Reiki Therapy in ${cityData.name}`,
      subtitle: `Energy Healing & Chakra Balancing in ${cityData.name}, ${cityData.state}`,
      description: `Experience professional Reiki therapy in ${cityData.name}. Energy healing for health and wellness.`,
    },
  };

  return <HealingService data={cityData_therapy} />;
}
