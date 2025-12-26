import { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { kundliAnalysisData } from '@/data/kundliAnalysis';
import { createMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = createMetadata(
  'Kundali Analysis | Vedic Astrology & Destiny | REHAS',
  'Decode your destiny through Vedic astrology. Get comprehensive Kundli analysis for marriage compatibility, career, health, and life guidance.',
  [
    'Kundli',
    'Kundali',
    'Birth Chart',
    'Vedic Astrology',
    'Marriage Matching',
    'Horoscope',
    'Guna Milan',
    'Destiny Analysis',
    'Kundli Matching',
  ],
  '/service/kundli-analysis'
);

export default function KundliAnalysisPage() {
  return <HealingService data={kundliAnalysisData} />;
}
