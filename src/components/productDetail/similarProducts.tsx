'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Star, Percent } from '@mui/icons-material';
import { productMerchandiseData, calculateDiscountPercentage } from '@/data/productMerchandise';
import { useCheckout } from '@/context/CheckoutContext';
import styles from './similarProducts.module.css';

interface SimilarProductsProps {
  category: string;
  currentProductSlug: string;
}

export default function SimilarProducts({ category, currentProductSlug }: SimilarProductsProps) {
  const router = useRouter();
  const { setProductData } = useCheckout();

  // Get similar products from same category, excluding current product
  const similarProducts = productMerchandiseData
    .filter(
      (product) =>
        product.category === category && product.slug !== currentProductSlug
    )
    .slice(0, 3); // Show maximum 3 similar products

  if (similarProducts.length === 0) {
    return null;
  }

  const handleAddToCheckout = (e: React.MouseEvent, product: typeof productMerchandiseData[0]) => {
    e.preventDefault();
    const price = parseFloat(product.price.replace(/[₹,]/g, ''));
    setProductData({
      productTitle: product.name,
      amount: price,
      type: 'product',
    });
    router.push('/checkout');
  };

  return (
    <section className={styles.similarProductsSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>You May Also Like</h2>
        <p className={styles.sectionSubtitle}>
          Explore other premium products in the same category
        </p>

        <div className={styles.productsGrid}>
          {similarProducts.map((product) => {
            const discountPercentage = calculateDiscountPercentage(
              product.originalPrice,
              product.price
            );
            const currentPrice = parseFloat(product.price.replace(/[₹,]/g, ''));

            return (
              <Link
                key={product.slug}
                href={`/product/${product.category}/${product.slug}`}
                className={styles.productCard}
              >
                <div className={styles.imageWrapper}>
                  {product.images && product.images[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className={styles.productImage}
                    />
                  ) : (
                    <div className={styles.imagePlaceholder}>
                      <Percent sx={{ fontSize: 40 }} />
                    </div>
                  )}
                  {discountPercentage && discountPercentage !== '0% off' && (
                    <div className={styles.discountBadge}>
                      {discountPercentage}
                    </div>
                  )}
                  <button
                    className={styles.addToCheckoutBtn}
                    onClick={(e) => handleAddToCheckout(e, product)}
                    title="Add to checkout"
                  >
                    <ShoppingCart sx={{ fontSize: 18 }} />
                  </button>
                </div>

                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productDescription}>
                    {product.shortDescription}
                  </p>

                  <div className={styles.ratingSection}>
                    <div className={styles.stars}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          sx={{ fontSize: 14, color: '#FFB800' }}
                        />
                      ))}
                    </div>
                    <span className={styles.reviewCount}>
                      ({product.reviewCount})
                    </span>
                  </div>

                  <div className={styles.priceSection}>
                    <div className={styles.prices}>
                      <span className={styles.currentPrice}>
                        {product.price}
                      </span>
                      <span className={styles.originalPrice}>
                        {product.originalPrice}
                      </span>
                    </div>
                    <button
                      className={styles.shopNowBtn}
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(`/product/${product.category}/${product.slug}`);
                      }}
                      title="View product details"
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className={styles.browseAllLink}>
          <Link href="/merchandise" className={styles.linkButton}>
            Shop Now Bracelet Products →
          </Link>
        </div>
      </div>
    </section>
  );
}
