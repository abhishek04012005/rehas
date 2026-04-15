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
                  {/* <button
                    className={styles.addToCheckoutBtn}
                    onClick={(e) => handleAddToCheckout(e, product)}
                    title="Add to checkout"
                  >
                    <ShoppingCart sx={{ fontSize: 18 }} />
                  </button> */}
                </div>

                <div className={styles.productDetails}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productDescription}>
                    {product.shortDescription || product.meaning}
                  </p>

                  <div className={styles.pricingSection}>
                    <div className={styles.priceRow}>
                      <span className={styles.originalPrice}>{product.originalPrice}</span>
                      <span className={styles.currentPrice}>{product.price}</span>
                    </div>
                  </div>

                  {/* <div className={styles.usageInstruction}>
                    {product.use}
                  </div> */}

                  <button
                    className={styles.buyNowBtn}
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(`/product/${product.category}/${product.slug}`);
                    }}
                    title="View product details"
                  >
                    <ShoppingCart sx={{ fontSize: 16 }} />
                    Buy Now
                  </button>
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
