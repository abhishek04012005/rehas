'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './navbar.module.css';
import Image from 'next/image';
import logoImage from '../../../public/logo.svg'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                {/* Logo */}
                <Link href="/" className={styles.logo} onClick={() => setIsMenuOpen(false)}>
                    <div className={styles.logoBadge}>
                        <Image
                            src={logoImage}
                            alt="REHAS Logo"
                            width={48}
                            height={48}
                        />
                    </div>
                    <span className={styles.logoText}>REHAS</span>
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
                        <li><Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
                        
                        <li className={styles.navGroup}>
                            <details>
                                <summary>
                                    Astrology
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                </summary>
                                <div className={styles.submenu}>
                                    <Link href="/astrology/birth-chart" onClick={() => setIsMenuOpen(false)}>
                                        📊 Birth Chart Reading
                                    </Link>
                                    <Link href="/astrology/horoscope" onClick={() => setIsMenuOpen(false)}>
                                        🌙 Daily Horoscope
                                    </Link>
                                    <Link href="/astrology/compatibility" onClick={() => setIsMenuOpen(false)}>
                                        💫 Compatibility
                                    </Link>
                                    <Link href="/astrology/transit" onClick={() => setIsMenuOpen(false)}>
                                        ✨ Transit Analysis
                                    </Link>
                                </div>
                            </details>
                        </li>

                        <li className={styles.navGroup}>
                            <details>
                                <summary>
                                    Wellness
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                </summary>
                                <div className={styles.submenu}>
                                    <Link href="/wellness/meditation" onClick={() => setIsMenuOpen(false)}>
                                        🧘 Meditation Guides
                                    </Link>
                                    <Link href="/wellness/yoga" onClick={() => setIsMenuOpen(false)}>
                                        🤸 Yoga & Poses
                                    </Link>
                                    <Link href="/wellness/nutrition" onClick={() => setIsMenuOpen(false)}>
                                        🥗 Nutrition
                                    </Link>
                                    <Link href="/wellness/mindfulness" onClick={() => setIsMenuOpen(false)}>
                                        🌿 Mindfulness
                                    </Link>
                                </div>
                            </details>
                        </li>

                        <li><Link href="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
                        <li><Link href="/blog" onClick={() => setIsMenuOpen(false)}>Blog</Link></li>
                        <li><Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
                    </ul>

                    <Link href="/consultation" className={styles.bookBtn} onClick={() => setIsMenuOpen(false)}>
                        Book Consultation
                    </Link>
                </div>
            </div>
        </nav>
    );
}
