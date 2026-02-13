import { Metadata } from 'next';
import HealingService from '@/components/healingService';
import { auricularTherapyData } from '@/data/auricularTherapy';

export const metadata: Metadata = {
  title: 'Auricular Therapy | Ear Acupuncture & Healing | REHAS',
  description:
    'Explore auricular therapy, ear-based acupuncture for whole-body healing. Treat pain, addiction, stress, and restore balance through ear points.',
  keywords: [
    'Auricular Therapy',
    'Ear Acupuncture',
    'Otoacupuncture',
    'Ear Points',
    'Acupuncture',
    'Pain Relief',
    'Addiction Treatment',
  ],
  openGraph: {
    title: 'Auricular Therapy | REHAS',
    description: 'Ear-based acupuncture for healing your entire body.',
    type: 'website',
  },
};

export default function AuricularTherapyPage() {
  return <HealingService data={auricularTherapyData} />;
}
