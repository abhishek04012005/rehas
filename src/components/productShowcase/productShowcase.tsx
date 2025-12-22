'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ShoppingCart, Search } from '@mui/icons-material';
import { useState } from 'react';
import LineArtBackground from '../lineArtBackground/lineArtBackground';
import styles from './productShowcase.module.css';
import { HealingServiceData } from '../healingService/healingService';

interface ProductShowcaseProps {
  data: HealingServiceData;
}

export default function ProductShowcase({ data }: ProductShowcaseProps) {
  const { hero, practices, cta } = data;
  const [searchQuery, setSearchQuery] = useState('');

  if (!practices) {
    return (
      <main className={styles.container}>
        <section className={styles.hero}>
          <LineArtBackground />
          <p>No products available</p>
        </section>
      </main>
    );
  }

  // Filter products based on search query
  const filteredProducts = practices.list.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.meaning.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <LineArtBackground />
        <div className={styles.heroContent}>
          <div className={styles.breadcrumb}>
            <span>Products</span>
            <ChevronRight sx={{ fontSize: 20 }} />
            <span>{hero.title}</span>
          </div>
          <h1 className={styles.title}>{hero.title}</h1>
          <p className={styles.subtitle}>{hero.subtitle}</p>
          <p className={styles.description}>{hero.description}</p>
        </div>
      </section>

      {/* Products Grid */}
      <section className={styles.productsSection}>
        <div className={styles.sectionHeader}>
          <h2>{practices.title}</h2>
          <p>{practices.description}</p>
        </div>

        {/* Search Bar */}
        <div className={styles.searchWrapper}>
          <div className={styles.searchContainer}>
            <Search sx={{ fontSize: 20 }} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          {searchQuery && (
            <p className={styles.searchResults}>
              Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        <div className={styles.productsGrid}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div key={index} className={styles.productCard}>
                {/* Product Image */}
                <div className={styles.productImageWrapper}>
                  <div className={styles.productImagePlaceholder}>
                    <div className={styles.productIcon}>{String.fromCodePoint(0x1f32f + (index % 5))}</div>
                  </div>
                </div>

                {/* Product Details */}
                <div className={styles.productDetails}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productDescription}>{product.meaning}</p>

                  {/* Price Box */}
                  <div className={styles.priceBox}>
                    <span className={styles.priceLabel}>Price</span>
                    <span className={styles.price}>₹999</span>
                  </div>

                  {/* Buy Now Button */}
                  <Link href="/enquiry" className={styles.buyNowBtn}>
                    <ShoppingCart sx={{ fontSize: 16 }} />
                    Buy Now
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noResults}>
              <p>No products found matching "{searchQuery}"</p>
              <p className={styles.noResultsHint}>Try searching with different keywords</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      {cta && (
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2>{cta.title}</h2>
          <p>{cta.subtitle}</p>
          <div className={styles.ctaButtons}>
            <Link href={cta.buttons[0].href} className={styles.primaryBtn}>
              <ShoppingCart sx={{ fontSize: 20 }} />
              {cta.buttons[0].label}
            </Link>
            <Link href={cta.buttons[1].href} className={styles.secondaryBtn}>
              {cta.buttons[1].label}
            </Link>
          </div>
        </div>
      </section>
      )}
    </main>
  );
}
