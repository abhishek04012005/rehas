import type { Metadata } from 'next';
import { Suspense } from 'react';
import AuthPageClient from './AuthPageClient';

export const metadata: Metadata = {
  title: 'Login / Signup | REHAS',
  description: 'Sign in or register to manage your REHAS bookings and wellness services securely.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AuthPage() {
  return (
    <Suspense fallback={<div>Loading authentication...</div>}>
      <AuthPageClient />
    </Suspense>
  );
}
