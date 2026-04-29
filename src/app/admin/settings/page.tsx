import type { Metadata } from 'next';
import SettingsDashboard from '@/admin/settingsDashboard/settingsDashboard';

export const metadata: Metadata = {
  title: 'Admin Settings | REHAS',
  description: 'Manage REHAS admin application settings and account preferences securely.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function SettingsPage() {
  return <SettingsDashboard />;
}