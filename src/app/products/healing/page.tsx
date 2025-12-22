import { Metadata } from 'next';
import ProductShowcase from '@/components/productShowcase/productShowcase';
import { productHealingData } from '@/data/productHealing';

export const metadata: Metadata = {
  title: 'Healing Products | Crystals, Oils & Wellness Tools | REHAS',
  description:
    'Authentic healing products including crystals, essential oils, meditation tools, and wellness remedies for your personal healing journey.',
  keywords: [
    'Healing Products',
    'Crystals',
    'Essential Oils',
    'Healing Tools',
    'Wellness Products',
    'Meditation',
    'Natural Remedies',
  ],
  openGraph: {
    title: 'Healing Products | REHAS',
    description: 'Premium healing products for personal wellness.',
    type: 'website',
  },
};

export default function HealingProductsPage() {
  return <ProductShowcase data={productHealingData} />;
}
