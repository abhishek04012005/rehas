'use client';

import { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { numerologyData } from '@/data/numerology';

export const metadata: Metadata = {
  title: 'Numerology Services | REHAS - Life Path & Destiny Numbers',
  description: 'Unlock the power of numbers. Get personalized numerology readings to understand your life path, destiny, and unlock your true potential.',
  keywords: [
    'Numerology',
    'Life Path Number',
    'Destiny Number',
    'Numerology Reading',
    'Number Vibration',
    'Numerology Consultation',
    'Spiritual Numbers',
  ],
  alternates: {
    canonical: 'https://rehas.in/astrology/numerology',
  },
};

export default function NumerologyPage() {
  return <HealingService data={numerologyData} />;
}
