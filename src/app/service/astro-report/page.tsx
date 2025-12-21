import { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { astroReportData } from '@/data/astroReport';

export const metadata: Metadata = {
  title: 'Astro Report | REHAS',
  description:
    'Understand your cosmic blueprint with detailed astrological analysis. Get insights into personality, destiny, career, and relationships based on your birth chart.',
  keywords: [
    'Astrology',
    'Astro Report',
    'Birth Chart',
    'Astrological Analysis',
    'Zodiac',
    'Cosmic Insights',
    'Personality Analysis',
    'Career Guidance',
  ],
  openGraph: {
    title: 'Astro Report | REHAS',
    description: 'Understand your cosmic blueprint with detailed astrological analysis.',
    type: 'website',
  },
};

export default function AstroReportPage() {
  return <HealingService data={astroReportData} />;
}
