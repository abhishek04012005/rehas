import Therapy from '@/components/therapy/therapy';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Therapy Services | REHAS - Acupressure, Magnet, Marma & Auricular',
  description: 'Discover our therapeutic healing services including Acupressure, Magnet Therapy, Marma Therapy, and Auricular Therapy. Holistic healing through traditional practices.',
  keywords: 'therapy, acupressure, magnet therapy, marma therapy, auricular therapy, traditional healing',
};

export default function TherapyPage() {
  return <Therapy />;
}
