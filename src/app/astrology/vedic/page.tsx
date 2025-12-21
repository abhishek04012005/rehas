'use client';

import HealingService from '@/components/healingService/healingService';
import { vedicAstroData } from '@/data/vedicAstro';

export default function VedicAstroPage() {
  return <HealingService data={vedicAstroData} />;
}
