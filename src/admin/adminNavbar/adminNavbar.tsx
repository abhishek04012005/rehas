'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Logout, Menu, Close } from '@mui/icons-material';
import Image from 'next/image';
import { rehasData } from '@/data/rehasData';
import styles from './adminNavbar.module.css';

export default function AdminNavbar() {
    const router = useRouter();
    const [adminUsername, setAdminUsername] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeRoute, setActiveRoute] = useState('');

    useEffect(() => {
        const username = localStorage.getItem('adminUsername');
        setAdminUsername(username || '');
        // Get current route from pathname
        setActiveRoute(window.location.pathname);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('adminSession');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminId');
        router.push('/admin/login');
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                {/* Logo/Brand */}
                <div className={styles.brand}>
                    <div className={styles.logoBadge}>
                        <Image
                            src={rehasData.profile.logo}
                            alt={rehasData.profile.imageAlt}
                            width={40}
                            height={40}
                        />
                    </div>
                    <h2>
                        <span className={styles.gradientText}>REHAS</span> Admin
                    </h2>
                </div>

                {/* Navigation Links */}
                <div className={styles.navLinks}>
                    <a href="/admin/dashboard" className={`${styles.navLink} ${activeRoute === '/admin/dashboard' ? styles.active : ''}`}>
                        Overview
                    </a>
                    <a href="/admin/orders" className={`${styles.navLink} ${activeRoute === '/admin/orders' ? styles.active : ''}`}>
                        Orders
                    </a>
                    <a href="/admin/payments" className={`${styles.navLink} ${activeRoute === '/admin/payments' ? styles.active : ''}`}>
                        Payments
                    </a>
                    <a href="/admin/contacts" className={`${styles.navLink} ${activeRoute === '/admin/contacts' ? styles.active : ''}`}>
                        Contacts
                    </a>
                    <a href="/admin/enquiries" className={`${styles.navLink} ${activeRoute === '/admin/enquiries' ? styles.active : ''}`}>
                        Enquiries
                    </a>
                </div>

                {/* Admin Info & Logout */}
                <div className={styles.adminSection}>
                    <div className={styles.adminInfo}>
                        <span className={styles.label}>Logged as:</span>
                        <span className={styles.username}>{adminUsername}</span>
                    </div>
                    <button className={styles.logoutBtn} onClick={handleLogout} title="Logout">
                        <Logout />
                        <span>Logout</span>
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className={styles.mobileMenuBtn}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <Close /> : <Menu />}
                </button>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className={styles.mobileMenu}>
                        <a href="/admin/dashboard" className={`${styles.mobileLink} ${activeRoute === '/admin/dashboard' ? styles.active : ''}`}>
                            Overview
                        </a>
                        <a href="/admin/orders" className={`${styles.mobileLink} ${activeRoute === '/admin/orders' ? styles.active : ''}`}>
                            Orders
                        </a>
                        <a href="/admin/payments" className={`${styles.mobileLink} ${activeRoute === '/admin/payments' ? styles.active : ''}`}>
                            Payments
                        </a>
                        <a href="/admin/contacts" className={`${styles.mobileLink} ${activeRoute === '/admin/contacts' ? styles.active : ''}`}>
                            Contacts
                        </a>
                        <a href="/admin/enquiries" className={`${styles.mobileLink} ${activeRoute === '/admin/enquiries' ? styles.active : ''}`}>
                            Enquiries
                        </a>
                        <button className={styles.mobileLogoutBtn} onClick={handleLogout}>
                            <Logout />
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}
