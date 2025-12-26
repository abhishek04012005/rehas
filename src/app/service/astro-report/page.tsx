import { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { astroReportData } from '@/data/astroReport';
import { createMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = createMetadata(
  'Astro Report | Detailed Birth Chart Analysis | REHAS',
  'Understand your cosmic blueprint with detailed astrological analysis. Get insights into personality, destiny, career, and relationships based on your birth chart.',
  [
    'Astrology',
    'Astro Report',
    'Birth Chart',
    'Astrological Analysis',
    'Zodiac',
    'Cosmic Insights',
    'Personality Analysis',
    'Career Guidance',
    'Astrology Reading',
  ],
  '/service/astro-report'
);

export default function AstroReportPage() {
  return <HealingService data={astroReportData} />;
}
