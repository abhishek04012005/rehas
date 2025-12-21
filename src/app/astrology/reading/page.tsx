'use client';

import HealingService from '@/components/healingService/healingService';
import { astrologyReadingData } from '@/data/astrologyReading';

export default function AstrologyReadingPage() {
  return <HealingService data={astrologyReadingData} />;
}
