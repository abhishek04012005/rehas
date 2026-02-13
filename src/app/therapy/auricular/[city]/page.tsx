import type { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { auricularTherapyData } from '@/data/auricularTherapy';
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

  const title = `Auricular Therapy in ${cityData.name} | REHAS`;
  const description = `Professional auricular therapy in ${cityData.name}, ${cityData.state}. Ear acupuncture and acupressure healing services.`;
  const keywords = [
    `Auricular therapy ${cityData.name}`,
    `Ear acupuncture ${cityData.name}`,
    `Auricular acupuncture ${cityData.name}`,
    'Auricular Therapy',
    'Ear Acupuncture',
  ];

  const url = `${siteConfig.domain}/therapy/auricular/${city}`;

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

export default async function CityAuricularPage({ params }: CityPageProps) {
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
    ...auricularTherapyData,
    hero: {
      ...auricularTherapyData.hero,
      title: `Auricular Therapy in ${cityData.name}`,
      subtitle: `Ear Acupuncture Healing in ${cityData.name}, ${cityData.state}`,
      description: `Discover auricular therapy in ${cityData.name}. Healing through ear acupuncture and acupressure techniques.`,
    },
  };

  return <HealingService data={cityData_therapy} />;
}
