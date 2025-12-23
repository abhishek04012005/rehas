'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './navbar.module.css';
import Image from 'next/image';
import { rehasData } from '@/data/rehasData';
import { navbarData } from '@/data/navbar';
import {
    WhatsApp,
    ExpandMore,
    ContactSupport,
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
};

const getIconComponent = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return IconComponent ? <IconComponent fontSize="small" /> : null;
};

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // WhatsApp message
    const whatsappMessage = encodeURIComponent('Hello! I would like to know more about REHAS services.');
    const whatsappUrl = `https://wa.me/${rehasData.social.phone.replace(/\D/g, '')}?text=${whatsappMessage}`;

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

                    {/* CTA Button - Right Side */}
                    <Link href={navbarData.cta.href} className={styles.bookBtn} onClick={() => setIsMenuOpen(false)}>
                        {navbarData.cta.label}
                    </Link>
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
            >
                <WhatsApp className={styles.whatsappIcon} />
            </a>

            {/* Enquiry Fixed Button */}
            {/* <Link
                href="/enquiry"
                className={styles.enquiryButton}
                aria-label="Submit enquiry"
                title="Submit enquiry"
            >
                <ContactSupport className={styles.enquiryIcon} />
            </Link> */}
        </>
    );
}