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
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import NightlightIcon from '@mui/icons-material/Nightlight';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import DescriptionIcon from '@mui/icons-material/Description';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PanToolIcon from '@mui/icons-material/PanTool';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DiamondIcon from '@mui/icons-material/Diamond';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TerrainIcon from '@mui/icons-material/Terrain';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import NumbersIcon from '@mui/icons-material/Numbers';
import MicOutlinedIcon from '@mui/icons-material/MicOutlined';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import StarIcon from '@mui/icons-material/Star';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import HealingIcon from '@mui/icons-material/Healing';
import HearingIcon from '@mui/icons-material/Hearing';
import CasinoIcon from '@mui/icons-material/Casino';
import BackHandIcon from '@mui/icons-material/BackHand';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';

const iconMap: Record<string, React.ComponentType<any>> = {
    Brightness3: Brightness3Icon,
    Nightlight: NightlightIcon,
    FavoriteBorder: FavoriteBorderIcon,
    RoomService: RoomServiceIcon,
    PublicOutlined: PublicOutlinedIcon,
    Description: DescriptionIcon,
    CreditCard: CreditCardIcon,
    PanTool: PanToolIcon,
    Notifications: NotificationsIcon,
    Diamond: DiamondIcon,
    AutoAwesome: AutoAwesomeIcon,
    Terrain: TerrainIcon,
    SchoolOutlined: SchoolOutlinedIcon,
    Numbers: NumbersIcon,
    MicOutlined: MicOutlinedIcon,
    MenuBook: MenuBookIcon,
    Star: StarIcon,
    ElectricBolt: ElectricBoltIcon,
    Healing: HealingIcon,
    Hearing: HearingIcon,
    Casino: CasinoIcon,
    BackHand: BackHandIcon,
    Storefront: StorefrontIcon,
};

const getIconComponent = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return IconComponent ? <IconComponent fontSize="small" /> : null;
};

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);
    const [profileOpen, setProfileOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    const { user, signOut } = useAuth();
    const { cartItems } = useCheckout();
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    // Ensure component is mounted before rendering dynamic content
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        const handleMediaChange = (event: MediaQueryListEvent | MediaQueryList) => {
            setIsMobile(event.matches);
        };

        handleMediaChange(mediaQuery);
        mediaQuery.addEventListener('change', handleMediaChange);

        return () => mediaQuery.removeEventListener('change', handleMediaChange);
    }, []);

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
                        aria-expanded={isMenuOpen}
                        aria-controls="navbar-menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    {/* Navigation Menu */}
                    <div
                        id="navbar-menu"
                        className={`${styles.menu} ${isMenuOpen ? styles.open : ''}`}
                        aria-hidden={isMobile && !isMenuOpen}
                    >
                        <ul className={styles.navItems}>
                            {navbarData.links.map((link, idx) => (
                                <li key={idx} className={'submenu' in link ? styles.navGroup : ''}>
                                    {'submenu' in link ? (
                                        <div className={`${styles.dropdownContainer} ${openDropdown === idx ? styles.open : ''}`}>
                                            <button 
                                                className={styles.dropdownTrigger}
                                                onClick={() => setOpenDropdown(openDropdown === idx ? null : idx)}
                                                aria-haspopup="menu"
                                                aria-expanded={openDropdown === idx}
                                                aria-controls={`submenu-${idx}`}
                                            >
                                                {link.label}
                                                <ExpandMoreIcon className={styles.dropdownIcon} />
                                            </button>
                                            <div id={`submenu-${idx}`} className={styles.submenu} role="menu">
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
                        <Link
                            href="/cart"
                            className={styles.cartButton}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <ShoppingCartIcon aria-hidden="true" />
                            <span className={styles.srOnly}>View cart</span>
                            {!mounted && <span className={styles.cartCountSkeleton}></span>}
                            {mounted && cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
                        </Link>

                        {user && mounted ? (
                            <div className={styles.profileContainer}>
                                <button
                                    type="button"
                                    className={styles.profileButton}
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    aria-haspopup="menu"
                                    aria-expanded={profileOpen}
                                >
                                    <AccountCircleIcon />
                                    <span>{user.email?.split('@')[0] || user.phone || 'Profile'}</span>
                                </button>
                                {profileOpen && (
                                    <div className={styles.profileMenu}>
                                        <Link href="/account/orders" onClick={() => { setIsMenuOpen(false); setProfileOpen(false); }}>
                                            Order History
                                        </Link>
                                        <Link href="/account/addresses" onClick={() => { setIsMenuOpen(false); setProfileOpen(false); }}>
                                            Address Book
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
                                <AccountCircleIcon />
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
                <WhatsAppIcon className={styles.whatsappIcon} />
            </a>
        </>
    );
}