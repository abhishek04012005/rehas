import { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { vedicAstroData } from '@/data/vedicAstro';

export const metadata: Metadata = {
  title: 'Vedic Astrology Services | REHAS - Birth Chart & Horoscope',
  description: 'Discover your cosmic blueprint with Vedic astrology. Get accurate birth chart analysis, horoscope readings, and planetary guidance from expert astrologers.',
  keywords: [
    'Vedic Astrology',
    'Birth Chart Analysis',
    'Horoscope Reading',
    'Planetary Positions',
    'Cosmic Guidance',
    'Astrology Services',
    'Vedic Horoscope',
  ],
  alternates: {
    canonical: 'https://rehas.in/astrology/vedic',
  },
};

export default function VedicAstroPage() {
  return <HealingService data={vedicAstroData} />;
}
