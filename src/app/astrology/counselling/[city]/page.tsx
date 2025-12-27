import type { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { astrologyCounsellingData } from '@/data/astrologyCounselling';
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

  const title = `Astrology Counselling in ${cityData.name} | REHAS`;
  const description = `Professional astrology counselling in ${cityData.name}, ${cityData.state}. Expert guidance based on your birth chart.`;
  const keywords = [
    `Astrology counselling ${cityData.name}`,
    `Astrological guidance ${cityData.name}`,
    `Astrology consultation ${cityData.name}`,
    'Astrology Counselling',
    'Astrological Guidance',
  ];

  const url = `${siteConfig.domain}/astrology/counselling/${city}`;

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

export default async function AstrologyPage({ params }: Props) {
  const { city } = await params;
  const cityData = getCityBySlug(city);

  if (!cityData) {
    return <div>City not found</div>;
  }

  const enhancedData = {
    ...astrologyCounsellingData,
    hero: {
      ...astrologyCounsellingData.hero,
      title: `Astrology Counselling in ${cityData.name}`,
      subtitle: `Professional astrological counselling services available in ${cityData.name}, ${cityData.state}`,
    },
  };

  return <HealingService data={enhancedData} />;
}
