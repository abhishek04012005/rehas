'use client';

import { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { astrologyReadingData } from '@/data/astrologyReading';

// Server-side metadata for this page
export const metadata: Metadata = {
  title: 'Astrology Readings | REHAS - Birth Chart & Cosmic Guidance',
  description: 'Get personalized astrology readings from certified astrologers. Discover your birth chart, planetary insights, and cosmic guidance for your life path.',
  keywords: [
    'Astrology Readings',
    'Birth Chart Reading',
    'Cosmic Guidance',
    'Astrology Consultation',
    'Planetary Insights',
    'Vedic Astrology',
    'Horoscope Reading',
  ],
  alternates: {
    canonical: 'https://rehas.in/astrology/reading',
  },
};

export default function AstrologyReadingPage() {
  return <HealingService data={astrologyReadingData} />;
}
