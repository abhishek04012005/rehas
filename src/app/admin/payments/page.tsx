import PaymentsDashboard from '@/admin/paymentsDashboard/paymentsDashboard';

export const metadata = {
  title: 'Payment Details | REHAS Admin',
  description: 'Track all payment transactions and revenue',
};

export default function PaymentsPage() {
  return <PaymentsDashboard />;
}
