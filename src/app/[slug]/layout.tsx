import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Astrology Guidance & Predictions | REHAS',
  description: 'Discover accurate astrological guidance, birth chart analysis, and Vedic remedies for life clarity and personal growth.',
};

export default function SeoAstrologyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
