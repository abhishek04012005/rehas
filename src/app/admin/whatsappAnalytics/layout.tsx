import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WhatsApp Analytics | REHAS Admin',
  description: 'Track and analyze WhatsApp click performance for your REHAS website and campaign traffic.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function WhatsAppAnalyticsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
