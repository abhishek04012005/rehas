'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

const Navbar = dynamic(() => import('@/components/navbar'), {
  ssr: false,
  loading: () => null,
});

const AdminNavbar = dynamic(() => import('@/admin/adminNavbar/adminNavbar'), {
  ssr: false,
  loading: () => null,
});

export default function NavbarWrapper() {
  const pathname = usePathname();
  
  // Show AdminNavbar only on /admin/* paths except /admin/login
  const isAdminPath = pathname.startsWith('/admin/') && pathname !== '/admin/login';
  
  return isAdminPath ? <AdminNavbar /> : <Navbar />;
}
