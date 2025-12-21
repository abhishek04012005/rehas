'use client';

import HealingService from '@/components/healingService/healingService';
import { astrologyCoursesData } from '@/data/astrologyCourse';

export default function AstrologyCoursePage() {
  return <HealingService data={astrologyCoursesData} />;
}
