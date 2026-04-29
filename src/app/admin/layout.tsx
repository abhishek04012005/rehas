import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin | REHAS',
  description: 'Secure REHAS admin access for managing dashboard, contacts, and analytics.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
