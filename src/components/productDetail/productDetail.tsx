import Link from 'next/link';
import { ShoppingCart, CheckCircle, ChevronRight } from '@mui/icons-material';
import LineArtBackground from '../lineArtBackground/lineArtBackground';
import styles from './productDetail.module.css';

interface ProductDetailProps {
  productName: string;
  category: string;
  meaning: string;
  benefit: string;
  use: string;
}

export default function ProductDetail({
  productName,
  category,
  meaning,
  benefit,
  use,
}: ProductDetailProps) {
  const categoryPath = `/products/${category}`;
  const price = '₹999';
  const categoryDisplay = category.charAt(0).toUpperCase() + category.slice(1);

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
                <div className={styles.productIcon}>🏆</div>
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
              <Link href="/enquiry" className={styles.checkoutBtn}>
                <ShoppingCart sx={{ fontSize: 18 }} />
                Proceed to Checkout
              </Link>
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
              <div className={styles.featureIcon}>✓</div>
              <h3>Premium Quality</h3>
              <p>Sourced and tested for highest standards</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>✓</div>
              <h3>Authentic</h3>
              <p>100% genuine products with certificates</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>✓</div>
              <h3>Expert Support</h3>
              <p>Guidance on usage and benefits included</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>✓</div>
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
          <Link href="/enquiry" className={styles.ctaButton}>
            <ShoppingCart sx={{ fontSize: 20 }} />
            Order Now
          </Link>
        </div>
      </section>
    </main>
  );
}
