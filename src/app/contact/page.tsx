import { Metadata } from 'next';
import Contact from '@/components/contact';
import { createMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = createMetadata(
  'Contact REHAS | Get in Touch for Wellness Services',
  'Contact REHAS for cosmic wellness guidance, astrology readings, reiki healing, and spiritual counselling. Schedule your consultation with our experts today.',
  [
    'Contact REHAS',
    'Consultation Booking',
    'Astrology Services',
    'Wellness Inquiry',
    'Schedule Appointment',
    'Spiritual Guidance',
    'Healing Services',
  ],
  '/contact'
);

export default function ContactPage() {
  return <Contact />;
}
