import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Address Book | REHAS Account',
  description: 'Manage your saved shipping addresses for REHAS orders securely from your account.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AddressesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
