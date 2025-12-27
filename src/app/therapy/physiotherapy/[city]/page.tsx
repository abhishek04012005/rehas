import type { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { physiotherapyData } from '@/data/physiotherapy';
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

  const title = `Physiotherapy in ${cityData.name} | REHAS`;
  const description = `Professional physiotherapy in ${cityData.name}, ${cityData.state}. Physical rehabilitation and wellness services.`;
  const keywords = [
    `Physiotherapy ${cityData.name}`,
    `Physical therapy ${cityData.name}`,
    `Rehabilitation ${cityData.name}`,
    'Physiotherapy',
    'Physical Therapy',
  ];

  const url = `${siteConfig.domain}/therapy/physiotherapy/${city}`;

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

export default async function CityPhysiotherapyPage({ params }: CityPageProps) {
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
    ...physiotherapyData,
    hero: {
      ...physiotherapyData.hero,
      title: `Physiotherapy in ${cityData.name}`,
      subtitle: `Physical Rehabilitation in ${cityData.name}, ${cityData.state}`,
      description: `Professional physiotherapy services in ${cityData.name}. Expert physical rehabilitation and wellness.`,
    },
  };

  return <HealingService data={cityData_therapy} />;
}
