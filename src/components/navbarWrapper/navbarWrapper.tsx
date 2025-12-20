'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/navbar/navbar';
import AdminNavbar from '@/admin/adminNavbar/adminNavbar';

export default function NavbarWrapper() {
  const pathname = usePathname();
  
  // Show AdminNavbar only on /admin/* paths except /admin/login
  const isAdminPath = pathname.startsWith('/admin/') && pathname !== '/admin/login';
  
  return isAdminPath ? <AdminNavbar /> : <Navbar />;
}
