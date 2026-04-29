import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Orders | REHAS Account',
  description: 'View your REHAS order history, tracking details, and purchase status in your account dashboard.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
