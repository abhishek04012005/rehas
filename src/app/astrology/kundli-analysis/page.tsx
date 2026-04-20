import { Metadata } from 'next';
import HealingService from '@/components/healingService';
import { kundliAnalysisData } from '@/data/kundliAnalysis';
import { createMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = createMetadata(
  'Kundli Analysis | Vedic Astrology & Birth Chart Insights | REHAS',
  'Get detailed kundli analysis and vedic astrology insights. Understand your birth chart and its implications for your life path.',
  [
    'Kundli Analysis',
    'Vedic Astrology',
    'Birth Chart',
    'Destiny Reading',
    'Life Line',
    'Fate Line',
    'Hand Lines',
    'Handline Analysis',
  ],
  '/astrology/kundli-analysis'
);

export default function KundliAnalysisPage() {
  return <HealingService data={kundliAnalysisData} />;
}
