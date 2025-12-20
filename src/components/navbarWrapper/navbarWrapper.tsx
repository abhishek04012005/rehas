'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/navbar/navbar';
import AdminNavbar from '@/admin/adminNavbar/adminNavbar';

export default function NavbarWrapper() {
  const pathname = usePathname();
  
  // Show AdminNavbar only on /admin/login and /admin/dashboard paths
  const isAdminPath = pathname.startsWith('/admin/');
  
  return isAdminPath ? <AdminNavbar /> : <Navbar />;
}
