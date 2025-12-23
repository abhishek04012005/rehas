'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ShoppingCart, ArrowRight } from '@mui/icons-material';
import LineArtBackground from '../lineArtBackground/lineArtBackground';
import styles from './productsPage.module.css';

interface ProductCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  icon: string;
  color: string;
  items: number;
  price: string;
  image: string;
}

const products: ProductCard[] = [
  {
    id: 'healing',
    title: 'Healing Products',
    subtitle: 'Crystals & Wellness',
    description:
      'Authentic healing crystals, essential oils, meditation tools, and Ayurvedic wellness products for daily healing and transformation.',
    href: '/products/healing',
    icon: '💎',
    color: 'rgb(147, 112, 219)',
    items: 6,
    price: '₹1,500 - ₹8,000',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=400&fit=crop',
  },
  {
    id: 'therapy',
    title: 'Therapy Equipment',
    subtitle: 'Professional Tools',
    description:
      'Professional-grade therapy tools, acupressure mats, massage equipment, and marma therapy instruments for practitioners.',
    href: '/products/therapy',
    icon: '🛠️',
    color: 'rgb(244, 67, 54)',
    items: 6,
    price: '₹2,500 - ₹12,000',
    image: 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=500&h=400&fit=crop',
  },
  {
    id: 'astrology',
    title: 'Astrology Resources',
    subtitle: 'Books & Software',
    description:
      'Tarot decks, astrology software, interpretation guides, numerology charts, and celestial resources for cosmic knowledge.',
    href: '/products/astrology',
    icon: '🌙',
    color: 'rgb(33, 150, 243)',
    items: 6,
    price: '₹2,500 - ₹12,000',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=400&fit=crop',
  },
];

export default function ProductsPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <main className={styles.container}>
      <LineArtBackground />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.breadcrumb}>
            <span>Products</span>
            <ChevronRight sx={{ fontSize: 20 }} />
            <span>Healing Resources</span>
          </div>
          <h1 className={styles.title}>Authentic Healing Products</h1>
          <p className={styles.subtitle}>
            Discover our curated collection of premium healing tools, crystals, equipment, and resources
          </p>
          <p className={styles.description}>
            Each product in our collection is carefully selected for quality, authenticity, and healing potential. 
            From rare crystals to professional therapy equipment, find everything you need for your wellness journey.
          </p>
        </div>
      </section>

      {/* Featured Stats */}
      <section className={styles.stats}>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>18+</div>
          <div className={styles.statLabel}>Premium Products</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>3</div>
          <div className={styles.statLabel}>Categories</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>100%</div>
          <div className={styles.statLabel}>Authentic</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>5000+</div>
          <div className={styles.statLabel}>Happy Customers</div>
        </div>
      </section>

      {/* Products Grid */}
      <section className={styles.productsGrid}>
        <div className={styles.gridHeader}>
          <h2>Browse Our Collections</h2>
          <p>Choose from three unique product categories tailored to your needs</p>
        </div>

        <div className={styles.cardsContainer}>
          {products.map((product) => (
            <div
              key={product.id}
              className={styles.productCard}
              style={{
                borderTopColor: product.color,
              }}
              onMouseEnter={() => setHoveredCard(product.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Background Image */}
              <div className={styles.cardImage}>
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className={styles.image}
                  style={{
                    opacity: hoveredCard === product.id ? 0.2 : 0.1,
                  }}
                />
              </div>

              {/* Card Content */}
              <div className={styles.cardContent}>
                <div className={styles.iconBadge} style={{ backgroundColor: product.color }}>
                  <span>{product.icon}</span>
                </div>

                <h3 className={styles.cardTitle}>{product.title}</h3>
                <p className={styles.cardSubtitle}>{product.subtitle}</p>

                <p className={styles.cardDescription}>{product.description}</p>

                {/* Stats */}
                <div className={styles.cardStats}>
                  <div className={styles.statItem}>
                    <span className={styles.label}>Products</span>
                    <span className={styles.value}>{product.items}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.label}>Price Range</span>
                    <span className={styles.value}>{product.price}</span>
                  </div>
                </div>

                {/* CTA */}
                <Link href={product.href} className={styles.ctaButton}>
                  <span>Browse Collection</span>
                  <ArrowRight sx={{ fontSize: 18 }} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={styles.whyUs}>
        <div className={styles.whyUsContent}>
          <h2>Why Choose Our Products?</h2>
          <div className={styles.reasonsGrid}>
            <div className={styles.reason}>
              <div className={styles.reasonIcon}>✓</div>
              <h4>100% Authentic</h4>
              <p>All products are genuine, tested, and sourced from verified suppliers</p>
            </div>
            <div className={styles.reason}>
              <div className={styles.reasonIcon}>✓</div>
              <h4>Quality Assured</h4>
              <p>Every item undergoes rigorous quality checks before reaching you</p>
            </div>
            <div className={styles.reason}>
              <div className={styles.reasonIcon}>✓</div>
              <h4>Expert Selection</h4>
              <p>Curated by experienced practitioners and healers</p>
            </div>
            <div className={styles.reason}>
              <div className={styles.reasonIcon}>✓</div>
              <h4>Fast Delivery</h4>
              <p>Quick and secure home delivery across India</p>
            </div>
            <div className={styles.reason}>
              <div className={styles.reasonIcon}>✓</div>
              <h4>30-Day Returns</h4>
              <p>Satisfaction guaranteed with easy returns policy</p>
            </div>
            <div className={styles.reason}>
              <div className={styles.reasonIcon}>✓</div>
              <h4>Expert Support</h4>
              <p>Dedicated support for product selection and usage guidance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Details */}
      <section className={styles.categoriesInfo}>
        <h2>Our Product Categories</h2>
        <div className={styles.categoriesGrid}>
          <div className={styles.categoryInfo}>
            <h3>💎 Healing Products</h3>
            <ul>
              <li>Authentic healing crystals</li>
              <li>Pure essential oils</li>
              <li>Meditation tools</li>
              <li>Ayurvedic supplements</li>
              <li>Healing jewels</li>
            </ul>
            <Link href="/products/healing" className={styles.categoryLink}>
              View All →
            </Link>
          </div>
          <div className={styles.categoryInfo}>
            <h3>🛠️ Therapy Equipment</h3>
            <ul>
              <li>Acupressure mats</li>
              <li>Massage equipment</li>
              <li>Marma tools</li>
              <li>Therapy oils</li>
              <li>Professional tables</li>
            </ul>
            <Link href="/products/therapy" className={styles.categoryLink}>
              View All →
            </Link>
          </div>
          <div className={styles.categoryInfo}>
            <h3>🌙 Astrology Resources</h3>
            <ul>
              <li>Tarot card decks</li>
              <li>Astrology software</li>
              <li>Reference guides</li>
              <li>Numerology charts</li>
              <li>Oracle cards</li>
            </ul>
            <Link href="/products/astrology" className={styles.categoryLink}>
              View All →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2>Ready to Start Your Healing Journey?</h2>
          <p>Explore our collections and find the perfect products for your wellness path</p>
          <div className={styles.ctaButtons}>
            <Link href="/products/healing" className={styles.primaryBtn}>
              <ShoppingCart sx={{ fontSize: 20 }} />
              Shop Now
            </Link>
            <Link href="/checkout" className={styles.secondaryBtn}>
              Need Help?
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
