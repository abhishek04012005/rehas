'use client';

import HealingService from '@/components/healingService/healingService';
import { numerologyData } from '@/data/numerology';

export default function NumerologyPage() {
  return <HealingService data={numerologyData} />;
}
