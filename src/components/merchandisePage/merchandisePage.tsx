'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, Search } from '@mui/icons-material';
import LineArtBackground from '../lineArtBackground/lineArtBackground';
import { productMerchandiseData, calculateDiscountPercentage } from '@/data/productMerchandise';
import { merchandiseData } from '@/data/content';
import styles from './merchandisepage.module.css';

interface MerchandiseProduct {
  id: string;
  category: 'bracelet' | 'yantra';
  name: string;
  meaning: string;
  benefit: string;
  use: string;
  price: string;
  href: string;
  image: string;
}

const toSlug = (name: string) => encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'));

const allProducts = productMerchandiseData.map((product, index) => ({
  id: `product-${index}`,
  ...product,
  href: `/product/${product.category}/${product.slug}`,
  image: product.images[0] || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=400&fit=crop',
}));

const braceletProducts = allProducts.filter((p) => p.category === 'bracelet');
const yantraProducts = allProducts.filter((p) => p.category === 'yantra');

const categoryTabs = [
  { id: 'all', title: 'All Products', count: allProducts.length },
  { id: 'bracelet', title: 'Bracelets', count: braceletProducts.length },
  { id: 'yantra', title: 'Yantras', count: yantraProducts.length },
];

export default function MerchandisePage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'bracelet' | 'yantra'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = (selectedCategory === 'all' ? allProducts : selectedCategory === 'bracelet' ? braceletProducts : yantraProducts).filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.use.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.merchandise}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <LineArtBackground variant="minimal" opacity={0.3} />
        <div className={styles.heroContent}>
          <h1>{merchandiseData.hero.title}</h1>
          <p>{merchandiseData.hero.subtitle}</p>

        </div>
      </section>

      {/* Main Content */}
      <div className={styles.container}>
        {/* Product List with Category Filter */}
        <section className={styles.productListSection}>
          <div className={styles.gridHeader}>
            <h2>All Merchandise Products</h2>
            <p>Filter by category to explore every item in our bracelet and yantra collections.</p>
          </div>

        <div className={styles.productControls}>
          <div className={styles.searchBox}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search merchandise products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <div className={styles.categoryFilter}>
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`${styles.categoryButton} ${selectedCategory === tab.id ? styles.categoryButtonActive : ''}`}
                onClick={() => setSelectedCategory(tab.id as 'all' | 'bracelet' | 'yantra')}
              >
                {tab.title}
                <span className={styles.categoryCount}>{tab.count}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.productCount}>
          Showing {filteredProducts.length} item{filteredProducts.length !== 1 ? 's' : ''}
        </div>

        <div className={styles.productListGrid}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className={styles.productListCard}>
              <div className={styles.productListImage}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className={styles.productListImageInner}
                />
              </div>
              <div className={styles.productListContent}>
                <span className={styles.productCategoryLabel}>{product.category === 'bracelet' ? 'Bracelet' : 'Yantra'}</span>
                <h3>{product.name}</h3>
                <p>{product.meaning}</p>
                <div className={styles.productMeta}>
                  <div className={styles.priceSection}>
                    {product.originalPrice && (
                      <span className={styles.originalPrice}>{product.originalPrice}</span>
                    )}
                    <span className={styles.currentPrice}>{product.price}</span>
                    {product.originalPrice && product.price && (
                      <span className={styles.discountBadge}>{calculateDiscountPercentage(product.originalPrice, product.price)}</span>
                    )}
                  </div>
                  <span>{product.use}</span>
                </div>
                <Link href={product.href} className={`btn-primary ${styles.productListLink}`}>
                  Shop Now
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noResultsBox}>
            <p>No products found for your search.</p>
            <p>Try a different keyword or select another category.</p>
          </div>
        )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={styles.whyUs}>
        <div className={styles.whyUsContent}>
          <h2>Why Choose Our Merchandise?</h2>
          <div className={styles.reasonsGrid}>
            <div className={styles.reason}>
              <CheckCircle className={styles.reasonIcon} />
              <h4>Authentic Materials</h4>
              <p>All items are made with genuine crystals, metals, and sacred materials</p>
            </div>
            <div className={styles.reason}>
              <CheckCircle className={styles.reasonIcon} />
              <h4>Blessed & Energized</h4>
              <p>Each piece is blessed and energized by experienced practitioners</p>
            </div>
            <div className={styles.reason}>
              <CheckCircle className={styles.reasonIcon} />
              <h4>Handcrafted</h4>
              <p>Carefully handcrafted with attention to detail and spiritual significance</p>
            </div>
            <div className={styles.reason}>
              <CheckCircle className={styles.reasonIcon} />
              <h4>Fast Delivery</h4>
              <p>Quick and secure delivery with proper packaging for sacred items</p>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}