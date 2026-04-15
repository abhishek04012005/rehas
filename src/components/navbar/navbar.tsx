'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './navbar.module.css';
import Image from 'next/image';
import { rehasData } from '@/data/rehasData';
import { navbarData } from '@/data/navbar';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { useCheckout } from '@/context/CheckoutContext';
import {
    WhatsApp,
    ExpandMore,
    Brightness3,
    Nightlight,
    FavoriteBorder,
    RoomService,
    PublicOutlined,
    Description,
    CreditCard,
    PanTool,
    MedicalInformation,
    LocalHospital,
    Grain,
    Notifications,
    Diamond,
    AutoAwesome,
    Terrain,
    AccountBalance,
    SchoolOutlined,
    Numbers,
    MicOutlined,
    MenuBook,
    Star,
    ElectricBolt,
    Healing,
    Hearing,
    Casino,
    BackHand,
    AccountCircle,
    ShoppingCart,
    Storefront
} from '@mui/icons-material';

const iconMap: Record<string, React.ComponentType<any>> = {
    Brightness3,
    Nightlight,
    FavoriteBorder,
    RoomService,
    PublicOutlined,
    Description,
    CreditCard,
    PanTool,
    MedicalInformation,
    LocalHospital,
    Grain,
    Notifications,
    Diamond,
    AutoAwesome,
    Terrain,
    AccountBalance,
    SchoolOutlined,
    Numbers,
    MicOutlined,
    MenuBook,
    Star,
    ElectricBolt,
    Healing,
    Hearing,
    Casino,
    BackHand,
    Storefront
};

const getIconComponent = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return IconComponent ? <IconComponent fontSize="small" /> : null;
};

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);
    const [profileOpen, setProfileOpen] = useState(false);

    const { user, signOut } = useAuth();
    const { cartItems } = useCheckout();
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Track WhatsApp clicks
    const trackWhatsAppClick = async () => {
        try {
            const clickData = {
                user_agent: navigator.userAgent,
                referrer: document.referrer,
                page_url: window.location.href,
                device_type: /Mobile|Android|iP(hone|od|ad)/.test(navigator.userAgent) ? 'mobile' : 'desktop',
                browser_info: JSON.stringify({
                    language: navigator.language,
                    platform: navigator.platform,
                    cookieEnabled: navigator.cookieEnabled,
                    onLine: navigator.onLine,
                }),
            };

            // Send tracking data to Supabase (don't wait for it to avoid blocking the redirect)
            supabase.from('whatsapp_clicks').insert([clickData]).then(({ error }) => {
                if (error) {
                    console.error('Error tracking WhatsApp click:', error);
                }
            });
        } catch (error) {
            console.error('Error tracking WhatsApp click:', error);
        }
    };

    // WhatsApp message
    const whatsappMessage = encodeURIComponent('Hello! I would like to know more about REHAS services.');
    const whatsappUrl = `https://wa.me/${rehasData.social.whatsapp.replace(/\D/g, '')}?text=${whatsappMessage}`;

    const handleLogout = async () => {
        await signOut();
        setProfileOpen(false);
        setIsMenuOpen(false);
    };

    return (
        <>
            <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
                <div className={styles.container}>
                    {/* Logo */}
                    <Link href="/" className={styles.logo} onClick={() => setIsMenuOpen(false)}>
                        <div className={styles.logoBadge}>
                            <Image
                                src={rehasData.profile.logo}
                                alt={rehasData.profile.imageAlt}
                                width={48}
                                height={48}
                            />
                        </div>
                        <span className={styles.logoText}>{rehasData.profile.nameCompany}</span>
                    </Link>

                    {/* Mobile Toggle */}
                    <button
                        className={`${styles.menuToggle} ${isMenuOpen ? styles.active : ''}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    {/* Navigation Menu */}
                    <div className={`${styles.menu} ${isMenuOpen ? styles.open : ''}`}>
                        <ul className={styles.navItems}>
                            {navbarData.links.map((link, idx) => (
                                <li key={idx} className={'submenu' in link ? styles.navGroup : ''}>
                                    {'submenu' in link ? (
                                        <div className={`${styles.dropdownContainer} ${openDropdown === idx ? styles.open : ''}`}>
                                            <button 
                                                className={styles.dropdownTrigger}
                                                onClick={() => setOpenDropdown(openDropdown === idx ? null : idx)}
                                            >
                                                {link.label}
                                                <ExpandMore className={styles.dropdownIcon} />
                                            </button>
                                            <div className={styles.submenu}>
                                                {link.submenu.map((item, subIdx) => (
                                                    <Link 
                                                        key={subIdx}
                                                        href={item.href} 
                                                        onClick={() => {
                                                            setIsMenuOpen(false);
                                                            setOpenDropdown(null);
                                                        }}
                                                    >
                                                        {getIconComponent(item.icon)} {item.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <Link href={link.href} onClick={() => setIsMenuOpen(false)}>
                                            {link.label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.actionsRight}>
                        <Link href="/cart" className={styles.cartButton} onClick={() => setIsMenuOpen(false)}>
                            <ShoppingCart />
                            {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
                        </Link>

                        {user ? (
                            <div className={styles.profileContainer}>
                                <button type="button" className={styles.profileButton} onClick={() => setProfileOpen(!profileOpen)}>
                                    <AccountCircle />
                                    <span>{user.email?.split('@')[0] || user.phone || 'Profile'}</span>
                                </button>
                                {profileOpen && (
                                    <div className={styles.profileMenu}>
                                        <Link href="/account/orders" onClick={() => { setIsMenuOpen(false); setProfileOpen(false); }}>
                                            Order History
                                        </Link>
                                        <Link href="/account/settings" onClick={() => { setIsMenuOpen(false); setProfileOpen(false); }}>
                                            Account Settings
                                        </Link>
                                        <button type="button" className={styles.logoutButton} onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href="/auth" className={styles.profileButton} onClick={() => setIsMenuOpen(false)}>
                                <AccountCircle />
                                <span>Sign In</span>
                            </Link>
                        )}

                        {/* <Link href={navbarData.cta.href} className={styles.bookBtn} onClick={() => setIsMenuOpen(false)}>
                            {navbarData.cta.label}
                        </Link> */}
                    </div>
                </div>
            </nav>

            {/* WhatsApp Fixed Button */}
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappButton}
                aria-label="Chat on WhatsApp"
                title="Chat on WhatsApp"
                onClick={trackWhatsAppClick}
            >
                <WhatsApp className={styles.whatsappIcon} />
            </a>
        </>
    );
}