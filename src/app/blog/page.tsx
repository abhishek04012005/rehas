import { Metadata } from 'next';
import Blog from '@/components/blog';
import { createMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = createMetadata(
  'Blog & Insights | REHAS Cosmic Wellness',
  'Read expert articles on astrology, numerology, reiki, energy healing, tantric wisdom, and wellness. Discover cosmic insights for spiritual growth and holistic health.',
  [
    'Astrology Blog',
    'Wellness Articles',
    'Numerology Insights',
    'Reiki Healing',
    'Energy Healing',
    'Spiritual Wisdom',
    'Cosmic Guidance',
    'Wellness Tips',
    'Healing Articles',
  ],
  '/blog'
);

export default function BlogPage() {
  return <Blog />;
}
