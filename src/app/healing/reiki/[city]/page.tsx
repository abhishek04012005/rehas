import type { Metadata } from 'next';
import HealingService from '@/components/healingService';
import { reikiData } from '@/data/reiki';
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

  const title = `Reiki Healing in ${cityData.name} | REHAS`;
  const description = `Experience professional Reiki healing in ${cityData.name}, ${cityData.state}. Certified practitioners offering chakra balancing, stress relief, and spiritual wellness.`;
  const keywords = [
    `Reiki in ${cityData.name}`,
    `Reiki healing ${cityData.name}`,
    `Energy healing ${cityData.name}`,
    `Chakra balancing ${cityData.name}`,
    `Alternative medicine ${cityData.name}`,
    'Reiki',
    'Energy Healing',
    'Chakra Balancing',
    'Holistic Wellness',
  ];

  const url = `${siteConfig.domain}/healing/reiki/${city}`;

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


interface CityReikiPageProps {
  params: Promise<{ city: string }>;
}

export default async function CityReikiPage({ params }: CityReikiPageProps) {
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

  // Enhance the reiki data with city-specific information
  const cityReikiData = {
    ...reikiData,
    hero: {
      ...reikiData.hero,
      title: `Reiki Healing in ${cityData.name}`,
      subtitle: `Professional Energy Healing Services in ${cityData.name}, ${cityData.state}`,
      description: `Discover deep healing and balance through Reiki in ${cityData.name}. Our certified practitioners bring the ancient Japanese healing practice to your community.`,
    },
  };

  return <HealingService data={cityReikiData} />;
}
