import { Metadata } from 'next';
import Policy from '@/components/policy';
import { createMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = createMetadata(
  'Our Policies | Privacy, Terms & Cancellation | REHAS',
  'Explore REHAS policies including privacy policy, terms of service, booking & cancellation, payment & refund policies, and code of conduct.',
  [
    'Privacy Policy',
    'Terms of Service',
    'Booking Policy',
    'Cancellation Policy',
    'Refund Policy',
    'Payment Policy',
    'Intellectual Property',
    'Code of Conduct',
    'Terms and Conditions',
    'Policy Information',
  ],
  '/policies'
);

export default function PoliciesPage() {
  return <Policy />;
}
