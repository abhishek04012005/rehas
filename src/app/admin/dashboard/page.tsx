import { Metadata } from 'next';
import ContactDashboard from '@/admin/contactDashboard/contactDashboard';

export const metadata: Metadata = {
  title: 'Contact Dashboard - REHAS Admin',
  description: 'Manage contact form submissions and track communication',
  robots: 'noindex, nofollow',
};

export default function DashboardPage() {
  return <ContactDashboard />;
}
