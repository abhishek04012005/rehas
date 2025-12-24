import { Metadata } from 'next';
import OverviewDashboard from '@/admin/overviewDashboard/overviewDashboard';

export const metadata: Metadata = {
  title: 'Admin Overview Dashboard - REHAS',
  description: 'Quick summary of all dashboard metrics and statistics',
  robots: 'noindex, nofollow',
};

export default function DashboardPage() {
  return <OverviewDashboard />;
}
