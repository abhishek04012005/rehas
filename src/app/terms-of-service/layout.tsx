import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | REHAS Wellness',
  description: 'Read REHAS terms of service. Learn about our service agreement, user responsibilities, and legal terms for using our cosmic wellness platform.',
  keywords: [
    'Terms of Service',
    'Legal Agreement',
    'User Agreement',
    'Terms and Conditions',
    'Service Terms',
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://rehas.in/terms-of-service',
  },
};

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
