'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShoppingCart, CheckCircle, ChevronRight, EmojiEvents } from '@mui/icons-material';
import { useCheckout } from '@/context/CheckoutContext';
import LineArtBackground from '../lineArtBackground/lineArtBackground';
import styles from './productDetail.module.css';

interface ProductDetailProps {
  productName: string;
  category: string;
  meaning: string;
  benefit: string;
  use: string;
  price?: string;
}

export default function ProductDetail({
  productName,
  category,
  meaning,
  benefit,
  use,
  price = '₹999',
}: ProductDetailProps) {
  const router = useRouter();
  const { setProductData } = useCheckout();
  const categoryPath = `/products/${category}`;
  const categoryDisplay = category.charAt(0).toUpperCase() + category.slice(1);
  
  // Extract numeric amount from price string (e.g., "₹1,500" -> 1500)
  const amount = parseFloat(price.replace(/[₹,]/g, '')) || 999;

  const handleCheckout = () => {
    // Store product data in context
    setProductData({ productTitle: productName, amount });
    // Navigate to checkout without URL parameters
    router.push('/checkout');
  };

  return (
    <main className={styles.container}>
      {/* Header */}
      <section className={styles.hero}>
        <LineArtBackground />
        <div className={styles.heroContent}>
          <div className={styles.breadcrumb}>
            <span>Products</span>
            <ChevronRight sx={{ fontSize: 20 }} />
            <span>{categoryDisplay}</span>
            <ChevronRight sx={{ fontSize: 20 }} />
            <span>{productName}</span>
          </div>
          <h1 className={styles.productTitle}>{productName}</h1>
          <p className={styles.productSubtitle}>Discover the complete details and benefits</p>
        </div>
      </section>

      {/* Product Details Section */}
      <section className={styles.detailsSection}>
        <div className={styles.detailsContainer}>
          {/* Product Image Section */}
          <div className={styles.imageSection}>
            <div className={styles.productImageWrapper}>
              <div className={styles.productImagePlaceholder}>
                <EmojiEvents sx={{ fontSize: 80 }} />
              </div>
            </div>
          </div>

          {/* Product Information Section */}
          <div className={styles.infoSection}>
            {/* Price Box */}
            <div className={styles.priceBox}>
              <span className={styles.priceLabel}>Price</span>
              <span className={styles.price}>{price}</span>
            </div>

            {/* Description */}
            <div className={styles.infoBox}>
              <h2 className={styles.boxTitle}>Description</h2>
              <p className={styles.boxContent}>{meaning}</p>
            </div>

            {/* Benefits Grid */}
            <div className={styles.benefitsGrid}>
              <div className={styles.benefitBox}>
                <h3 className={styles.boxTitle}>Benefits</h3>
                <ul className={styles.benefitList}>
                  {benefit.split(',').map((item, index) => (
                    <li key={index}>
                      <CheckCircle sx={{ fontSize: 18 }} />
                      <span>{item.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.useBox}>
                <h3 className={styles.boxTitle}>Best For</h3>
                <ul className={styles.benefitList}>
                  {use.split(',').map((item, index) => (
                    <li key={index}>
                      <CheckCircle sx={{ fontSize: 18 }} />
                      <span>{item.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.actionButtons}>
              <button 
                onClick={handleCheckout}
                className={styles.checkoutBtn}
              >
                <ShoppingCart sx={{ fontSize: 18 }} />
                Proceed to Checkout
              </button>
              <Link href={categoryPath} className={styles.continueBtn}>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresContainer}>
          <h2>Why Choose This Product?</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <CheckCircle sx={{ fontSize: 32, color: 'var(--primary)' }} />
              <h3>Premium Quality</h3>
              <p>Sourced and tested for highest standards</p>
            </div>
            <div className={styles.featureCard}>
              <CheckCircle sx={{ fontSize: 32, color: 'var(--primary)' }} />
              <h3>Authentic</h3>
              <p>100% genuine products with certificates</p>
            </div>
            <div className={styles.featureCard}>
              <CheckCircle sx={{ fontSize: 32, color: 'var(--primary)' }} />
              <h3>Expert Support</h3>
              <p>Guidance on usage and benefits included</p>
            </div>
            <div className={styles.featureCard}>
              <CheckCircle sx={{ fontSize: 32, color: 'var(--primary)' }} />
              <h3>Fast Delivery</h3>
              <p>Quick shipping across the country</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2>Ready to Transform Your Wellness Journey?</h2>
          <p>Order this product today and experience the difference</p>
          <button 
            onClick={handleCheckout}
            className={styles.ctaButton}
          >
            <ShoppingCart sx={{ fontSize: 20 }} />
            Order Now
          </button>
        </div>
      </section>
    </main>
  );
}
