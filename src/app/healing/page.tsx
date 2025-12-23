import Healing from '@/components/healing/healing';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Healing Services | REHAS - Reiki, Mantra & Tantra',
  description: 'Explore our holistic healing services including Reiki, Mantra, and Tantra practices. Transform your life through ancient wisdom and modern wellness.',
  keywords: 'healing, reiki, mantra, tantra, energy healing, spiritual practice, wellness',
};

export default function HealingPage() {
  return <Healing />;
}
