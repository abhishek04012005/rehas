import type { Metadata } from 'next';
import HealingService from '@/components/healingService';
import { acupunctureData } from '@/data/acupuncture';
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

  const title = `Acupuncture Treatment in ${cityData.name} | REHAS`;
  const description = `Professional acupuncture treatment in ${cityData.name}, ${cityData.state}. Traditional Chinese healing with certified acupuncturists.`;
  const keywords = [
    `Acupuncture ${cityData.name}`,
    `Acupuncture treatment ${cityData.name}`,
    `Chinese acupuncture ${cityData.name}`,
    `Traditional acupuncture ${cityData.name}`,
    'Acupuncture',
    'Traditional Medicine',
  ];

  const url = `${siteConfig.domain}/therapy/acupuncture/${city}`;

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

export default async function CityAcupuncturePage({ params }: CityPageProps) {
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
    ...acupunctureData,
    hero: {
      ...acupunctureData.hero,
      title: `Acupuncture Treatment in ${cityData.name}`,
      subtitle: `Traditional Chinese Healing in ${cityData.name}, ${cityData.state}`,
      description: `Experience professional acupuncture treatment in ${cityData.name} with certified practitioners.`,
    },
  };

  return <HealingService data={cityData_therapy} />;
}
