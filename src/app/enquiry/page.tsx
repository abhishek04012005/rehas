import { Metadata } from 'next';
import Enquiry from '@/components/enquiry';
import { createMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = createMetadata(
  'Book Consultation | REHAS Enquiry Form',
  'Send an enquiry to REHAS and connect with our cosmic wellness experts. Discover personalized astrology readings, healing services, and spiritual guidance.',
  [
    'Book Consultation',
    'Enquiry Form',
    'Astrology Reading',
    'Healing Service',
    'Wellness Consultation',
    'Spiritual Guidance',
  ],
  '/enquiry'
);

export default function EnquiryPage() {
  return <Enquiry />;
}
