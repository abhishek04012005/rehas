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
  category?: string;
}

// Image URLs for different product types
const productImages: { [key: string]: string } = {
  'Healing Crystals': 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop',
  'Essential Oils': 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=300&fit=crop',
  'Meditation Tools': 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=400&h=300&fit=crop',
  'Ayurvedic Remedies': 'https://images.unsplash.com/photo-1587854692152-cbe660dbde0f?w=400&h=300&fit=crop',
  'Reiki Tools': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5e2?w=400&h=300&fit=crop',
  'Sound Healing': 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=300&fit=crop',
  'Chakra Stones': 'https://images.unsplash.com/photo-1599643478827-d17e9b1aee66?w=400&h=300&fit=crop',
  'Wellness Kits': 'https://images.unsplash.com/photo-1596263353880-a4c4218c7b56?w=400&h=300&fit=crop',
};

export default function ProductShowcase({ data, category }: ProductShowcaseProps) {
  const { hero, practices, cta } = data;
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'none' | 'asc' | 'desc'>('none');

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
  let filteredProducts = practices.list.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.meaning.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort by price
  if (sortBy !== 'none') {
    filteredProducts = [...filteredProducts].sort((a, b) => {
      const priceA = a.price ? parseFloat(a.price.replace(/[₹,]/g, '')) : 0;
      const priceB = b.price ? parseFloat(b.price.replace(/[₹,]/g, '')) : 0;
      return sortBy === 'asc' ? priceA - priceB : priceB - priceA;
    });
  }

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

        {/* Search and Filter Bar */}
        <div className={styles.filterBarWrapper}>
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

          {/* Sort Filter */}
          <div className={styles.sortWrapper}>
            <label htmlFor="sortSelect" className={styles.sortLabel}>Sort by Price:</label>
            <select
              id="sortSelect"
              className={styles.sortSelect}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'none' | 'asc' | 'desc')}
            >
              <option value="none">Default</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </div>

        <div className={styles.productsGrid}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div key={index} className={styles.productCard}>
                {/* Product Image */}
                <div className={styles.productImageWrapper}>
                  {productImages[product.name] ? (
                    <Image
                      src={productImages[product.name]}
                      alt={product.name}
                      width={400}
                      height={300}
                      className={styles.productImage}
                      priority={index < 3}
                    />
                  ) : (
                    <div className={styles.productImagePlaceholder}>
                      <div className={styles.productIcon}>{String.fromCodePoint(0x1f32f + (index % 5))}</div>
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className={styles.productDetails}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productDescription}>{product.meaning}</p>

                  {/* Price Box */}
                  <div className={styles.priceBox}>
                    <span className={styles.priceLabel}>Price</span>
                    <span className={styles.price}>{product.price}</span>
                  </div>

                  {/* Buy Now Button */}
                  <Link 
                    href={`/product/${category || 'healing'}/${encodeURIComponent(product.name.toLowerCase().replace(/\s+/g, '-'))}`}
                    className={styles.buyNowBtn}
                  >
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
