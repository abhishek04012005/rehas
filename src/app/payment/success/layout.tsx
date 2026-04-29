import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payment Success | REHAS',
  description: 'Your payment has been processed successfully. View your order details and download your receipt.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function PaymentSuccessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
