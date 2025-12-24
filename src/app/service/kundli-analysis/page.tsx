import { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { kundliAnalysisData } from '@/data/kundliAnalysis';

export const metadata: Metadata = {
  title: 'Kundali | REHAS',
  description:
    'Decode your destiny through Vedic astrology. Get comprehensive Kundli analysis for marriage compatibility, career, health, and life guidance.',
  keywords: [
    'Kundli',
    'Kundali',
    'Birth Chart',
    'Vedic Astrology',
    'Marriage Matching',
    'Horoscope',
    'Guna Milan',
    'Destiny Analysis',
  ],
  openGraph: {
    title: 'Kundali | REHAS',
    description: 'Decode your destiny through comprehensive Vedic astrological analysis.',
    type: 'website',
  },
};

export default function KundliAnalysisPage() {
  return <HealingService data={kundliAnalysisData} />;
}
