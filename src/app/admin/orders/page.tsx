import OrdersDashboard from '@/admin/ordersDashboard/ordersDashboard';

export const metadata = {
  title: 'Orders & Bookings | REHAS Admin',
  description: 'Manage and track all customer orders and bookings',
};

export default function OrdersPage() {
  return <OrdersDashboard />;
}
