import { Metadata } from 'next';
import About from '@/components/about/about';
import { createMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = createMetadata(
  'About REHAS | Cosmic Wellness & Astrology Services',
  'Discover REHAS mission and vision. Learn how we bridge ancient cosmic wisdom with modern wellness through astrology, healing, and spiritual guidance services in India.',
  [
    'About REHAS',
    'Cosmic Wellness',
    'Astrology Services',
    'Spiritual Healing',
    'Wellness Center',
    'Holistic Health',
    'Ancient Wisdom',
    'Modern Wellness',
  ],
  '/about'
);

export default function AboutPage() {
  return <About />;
}
