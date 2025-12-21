import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | REHAS Cosmic Wellness',
  description: 'Read REHAS privacy policy to understand how we collect, use, and protect your personal information when using our astrology and wellness services.',
  keywords: [
    'Privacy Policy',
    'Data Protection',
    'Personal Information',
    'Privacy Rights',
    'Data Security',
    'GDPR Compliance',
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://rehas.in/privacy-policy',
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
