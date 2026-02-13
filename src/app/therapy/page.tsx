import Therapy from '@/components/therapy';
import { Metadata } from 'next';
import { createMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = createMetadata(
  'Therapy Services | REHAS - Acupressure, Magnet, Marma & Auricular',
  'Discover our therapeutic healing services including Acupressure, Magnet Therapy, Marma Therapy, and Auricular Therapy. Holistic healing through traditional practices.',
  [
    'Therapy',
    'Acupressure',
    'Magnet Therapy',
    'Marma Therapy',
    'Auricular Therapy',
    'Traditional Healing',
    'Therapeutic Services',
    'Alternative Medicine',
    'Holistic Health',
  ],
  '/therapy'
);

export default function TherapyPage() {
  return <Therapy />;
}
