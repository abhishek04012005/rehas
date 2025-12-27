import type { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { acupressureData } from '@/data/acupressure';
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

  const title = `Acupressure Therapy in ${cityData.name} | REHAS`;
  const description = `Professional acupressure therapy in ${cityData.name}, ${cityData.state}. Learn pressure point therapy and healing techniques from certified practitioners.`;
  const keywords = [
    `Acupressure therapy ${cityData.name}`,
    `Pressure point therapy ${cityData.name}`,
    `Acupressure healing ${cityData.name}`,
    `Traditional acupressure ${cityData.name}`,
    'Acupressure',
    'Pressure Point Therapy',
    'Healing',
  ];

  const url = `${siteConfig.domain}/therapy/acupressure/${city}`;

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

interface CityPageProps {
  params: Promise<{ city: string }>;
}

export default async function CityAcupressurePage({ params }: CityPageProps) {
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
    ...acupressureData,
    hero: {
      ...acupressureData.hero,
      title: `Acupressure Therapy in ${cityData.name}`,
      subtitle: `Professional Pressure Point Therapy in ${cityData.name}, ${cityData.state}`,
      description: `Master acupressure therapy in ${cityData.name}. Learn traditional healing techniques from certified practitioners.`,
    },
  };

  return <HealingService data={cityData_therapy} />;
}
