import { Metadata } from 'next';
import HealingService from '@/components/healingService/healingService';
import { astrologyCounsellingData } from '@/data/astrologyCounselling';

export const metadata: Metadata = {
  title: 'Astrology Counselling | REHAS - Spiritual & Career Guidance',
  description: 'Get professional astrology counselling for life decisions, career guidance, and spiritual growth. Expert astrologers provide personalized cosmic insights.',
  keywords: [
    'Astrology Counselling',
    'Career Guidance',
    'Life Guidance',
    'Spiritual Counselling',
    'Cosmic Guidance',
    'Astrology Consultation',
    'Professional Counselling',
  ],
  alternates: {
    canonical: 'https://rehas.in/astrology/counselling',
  },
};

export default function AstrologyCouncsellingPage() {
  return <HealingService data={astrologyCounsellingData} />;
}
