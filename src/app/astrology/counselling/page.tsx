'use client';

import HealingService from '@/components/healingService/healingService';
import { astrologyCounsellingData } from '@/data/astrologyCounselling';

export default function AstrologyCouncsellingPage() {
  return <HealingService data={astrologyCounsellingData} />;
}
