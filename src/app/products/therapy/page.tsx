import { Metadata } from 'next';
import ProductShowcase from '@/components/productShowcase';
import { productTherapyData } from '@/data/productTherapy';

export const metadata: Metadata = {
  title: 'Therapy Products | Equipment & Tools for Healing | REHAS',
  description:
    'Professional-grade therapy equipment and tools. Acupressure mats, massage devices, marma tools, and therapy supplies for practitioners and home use.',
  keywords: [
    'Therapy Products',
    'Therapy Equipment',
    'Massage Tools',
    'Acupressure Mat',
    'Professional Equipment',
    'Healing Tools',
    'Therapy Supplies',
  ],
  openGraph: {
    title: 'Therapy Products | REHAS',
    description: 'Professional therapy equipment and tools.',
    type: 'website',
  },
};

export default function TherapyProductsPage() {
  return <ProductShowcase data={productTherapyData} category="therapy" />;
}
