'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ShoppingCart, Search } from '@mui/icons-material';
import { useState } from 'react';
import LineArtBackground from '../lineArtBackground/lineArtBackground';
import styles from './productShowcase.module.css';
import { HealingServiceData } from '../healingService/healingService';
import { productMerchandiseData, MerchandiseProductDetail, calculateDiscountPercentage } from '@/data/productMerchandise';

interface ProductShowcaseProps {
  data: HealingServiceData;
  category?: string;
}

export default function ProductShowcase({ data, category }: ProductShowcaseProps) {
  const { hero, cta } = data;
  const allProducts = productMerchandiseData;
  const displayPractices = category 
    ? { 
        title: category === 'yantra' ? 'Sacred Yantras' : 'Healing Bracelets',
        description: category === 'yantra' ? 'Powerful yantras for spiritual manifestation' : 'Crystal and rudraksha bracelets for spiritual protection',
        list: allProducts.filter(product => product.category === category)
      }
    : { 
        title: 'Sacred Products',
        description: 'Yantras and bracelets for spiritual enhancement',
        list: allProducts
      };
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'none' | 'asc' | 'desc'>('none');

  // Filter products based on search query
  let filteredProducts = displayPractices.list.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
          <h2>{displayPractices.title}</h2>
          <p>{displayPractices.description}</p>
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
                  {product.images && product.images.length > 0 ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
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
                  <p className={styles.productDescription}>{product.shortDescription || product.meaning}</p>

                  {/* Pricing Section */}
                  <div className={styles.pricingSection}>
                    <div className={styles.priceRow}>
                      <span className={styles.originalPrice}>{product.originalPrice}</span>
                      <span className={styles.currentPrice}>{product.price}</span>
                    </div>
                    <div className={styles.discountBadge}>
                      {calculateDiscountPercentage(product.originalPrice, product.price)}
                    </div>
                  </div>

                  {/* Usage Instruction */}
                  {/* <div className={styles.usageInstruction}>
                    {product.use}
                  </div> */}

                  {/* Buy Now Button */}
                  <Link
                    href={`/product/${product.category}/${product.slug}`}
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
