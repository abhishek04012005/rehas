import { Metadata } from 'next';
import Login from '@/admin/login/login';

export const metadata: Metadata = {
  title: 'Admin Login - REHAS',
  description: 'Admin login page for managing REHAS contact submissions',
  robots: 'noindex, nofollow',
};

export default function LoginPage() {
  return <Login />;
}
