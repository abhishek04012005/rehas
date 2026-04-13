'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ShoppingCart, CheckCircle, ChevronRight, EmojiEvents, ChevronLeft, PlayCircle, Close } from '@mui/icons-material';
import { useCheckout } from '@/context/CheckoutContext';
import { calculateDiscountPercentage } from '@/data/productMerchandise';
import LineArtBackground from '../lineArtBackground/lineArtBackground';
import SimilarProducts from './similarProducts';
import styles from './productDetail.module.css';

interface ProductDetailData {
  name: string;
  category: string;
  slug?: string;
  tagline?: string;
  qualityTag?: string;
  reviewCount?: number;
  shortDescription?: string;
  meaning: string;
  benefit: string;
  use: string;
  price?: string;
  originalPrice?: string;
  monthlyPlan?: string;
  paymentHighlights?: string[];
  sold?: number;
  available?: number;
  endsIn?: string;
  pooja?: {
    label: string;
    note: string;
    price?: string;
  };
  description?: string;
  keyFeatures?: string[];
  benefits?: string[];
  spiritualSignificance?: string[];
  howToUse?: string[];
  careInstructions?: string[];
  specifications?: {
    material: string;
    beadType?: string;
    size: string;
    weight: string;
    origin: string;
  };
  trustBadges?: string[];
  emotionalHook?: string;
  faq?: {
    question: string;
    answer: string;
  }[];
  images?: string[];
}

// Helper function to detect if URL is a video
const isVideo = (url: string): boolean => {
  if (!url) return false;
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'];
  const isVideoFile = videoExtensions.some(ext => url.toLowerCase().includes(ext));
  const isYouTube = url.includes('youtube.com') || url.includes('youtu.be') || url.includes('vimeo.com');
  return isVideoFile || isYouTube;
};

// Helper function to get YouTube embed URL
const getYouTubeEmbedUrl = (url: string): string => {
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  if (url.includes('youtube.com/watch')) {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  if (url.includes('vimeo.com')) {
    const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
    return `https://player.vimeo.com/video/${videoId}`;
  }
  return url;
};

interface ProductDetailProps {
  product: ProductDetailData;
}

export default function ProductDetail({
  product,
}: ProductDetailProps) {
  const router = useRouter();
  const { setProductData } = useCheckout();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPoojaSelected, setIsPoojaSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const categoryPath = `/products/${product.category}`;
  const categoryDisplay = product.category.charAt(0).toUpperCase() + product.category.slice(1);
  const productName = product.name;
  
  // Determine which price to show
  let productPrice = product.price || '₹999';
  let currentAmount = parseFloat(productPrice.replace(/[₹,]/g, '')) || 999;

  if (isPoojaSelected && product.pooja?.price) {
    // Add 100 to the base product price for pooja
    currentAmount = currentAmount + 100;
    productPrice = `₹${currentAmount.toFixed(2)}`;
  }

  const displayDescription = product.description || product.meaning;
  const displayShort = product.shortDescription || product.meaning;
  const displayBenefits = product.benefits || (product.benefit ? product.benefit.split(',').map((item) => item.trim()) : []);
  const displayUse = product.use || '';
  
  const images = product.images && product.images.length > 0 ? product.images : [];
  const hasImages = images.length > 0;

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleModalPrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleModalNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleCheckout = () => {
    setProductData({ 
      productTitle: productName, 
      amount: currentAmount,
      type: 'product'
    });
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
          {product.tagline && <p className={styles.productTagline}>{product.tagline}</p>}
          {product.qualityTag && <p className={styles.qualityTag}>{product.qualityTag}</p>}
          <p className={styles.productSubtitle}>{displayShort}</p>
        </div>
      </section>

      {/* Product Details Section */}
      <section className={styles.detailsSection}>
        <div className={styles.detailsContainer}>
          <div className={styles.imageSection}>
            {hasImages ? (
              <div className={styles.imageCarousel}>
                <button
                  className={styles.carouselButton}
                  onClick={handlePrevImage}
                  aria-label="Previous media"
                >
                  <ChevronLeft sx={{ fontSize: 28 }} />
                </button>
                <div className={styles.carouselImageWrapper}>
                  {isVideo(images[currentImageIndex]) ? (
                    <>
                      {images[currentImageIndex].includes('youtube.com') || images[currentImageIndex].includes('youtu.be') || images[currentImageIndex].includes('vimeo.com') ? (
                        <iframe
                          width="100%"
                          height="100%"
                          src={getYouTubeEmbedUrl(images[currentImageIndex])}
                          title={`${productName} - video ${currentImageIndex + 1}`}
                          className={styles.videoEmbed}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <video
                          controls
                          autoPlay
                          muted
                          loop
                          className={styles.carouselImage}
                          controlsList="nodownload"
                        >
                          <source src={images[currentImageIndex]} />
                          Your browser does not support the video tag.
                        </video>
                      )}
                      <div className={styles.mediaTypeIndicator}>
                        <PlayCircle sx={{ fontSize: 24 }} />
                        <span>Video</span>
                      </div>
                    </>
                  ) : (
                    <img
                      src={images[currentImageIndex]}
                      alt={`${productName} - image ${currentImageIndex + 1}`}
                      className={styles.carouselImage}
                      onClick={handleOpenModal}
                      style={{ cursor: 'pointer' }}
                    />
                  )}
                </div>
                <button
                  className={styles.carouselButton}
                  onClick={handleNextImage}
                  aria-label="Next media"
                >
                  <ChevronRight sx={{ fontSize: 28 }} />
                </button>
              </div>
            ) : (
              <div className={styles.productImageWrapper}>
                <div className={styles.productImagePlaceholder}>
                  <EmojiEvents sx={{ fontSize: 80 }} />
                </div>
              </div>
            )}
            {hasImages && images.length > 1 && (
              <div className={styles.imageDots}>
                {images.map((item, index) => (
                  <button
                    key={index}
                    className={`${styles.dot} ${index === currentImageIndex ? styles.dotActive : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                    aria-label={`Go to media ${index + 1} ${isVideo(item) ? '(video)' : '(image)'}`}
                    title={isVideo(item) ? 'Video' : 'Image'}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Image Modal */}
          {isModalOpen && hasImages && (
            <div className={styles.modalOverlay} onClick={handleCloseModal}>
              <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button
                  className={styles.modalClose}
                  onClick={handleCloseModal}
                  aria-label="Close modal"
                >
                  <Close sx={{ fontSize: 32 }} />
                </button>
                
                <div className={styles.modalCarousel}>
                  <button
                    className={styles.modalNavButton}
                    onClick={handleModalPrevImage}
                    aria-label="Previous image"
                  >
                    <ChevronLeft sx={{ fontSize: 40 }} />
                  </button>
                  
                  <div className={styles.modalImageWrapper}>
                    {isVideo(images[currentImageIndex]) ? (
                      <>
                        {images[currentImageIndex].includes('youtube.com') || images[currentImageIndex].includes('youtu.be') || images[currentImageIndex].includes('vimeo.com') ? (
                          <iframe
                            width="100%"
                            height="100%"
                            src={getYouTubeEmbedUrl(images[currentImageIndex])}
                            title={`${productName} - video ${currentImageIndex + 1}`}
                            className={styles.modalVideo}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <video
                            controls
                            autoPlay
                            muted
                            loop
                            className={styles.modalVideo}
                            controlsList="nodownload"
                          >
                            <source src={images[currentImageIndex]} />
                            Your browser does not support the video tag.
                          </video>
                        )}
                      </>
                    ) : (
                      <img
                        src={images[currentImageIndex]}
                        alt={`${productName} - image ${currentImageIndex + 1}`}
                        className={styles.modalImage}
                      />
                    )}
                  </div>
                  
                  <button
                    className={styles.modalNavButton}
                    onClick={handleModalNextImage}
                    aria-label="Next image"
                  >
                    <ChevronRight sx={{ fontSize: 40 }} />
                  </button>
                </div>
                
                {images.length > 1 && (
                  <div className={styles.modalDots}>
                    {images.map((item, index) => (
                      <button
                        key={index}
                        className={`${styles.modalDot} ${index === currentImageIndex ? styles.modalDotActive : ''}`}
                        onClick={() => setCurrentImageIndex(index)}
                        aria-label={`Go to media ${index + 1} ${isVideo(item) ? '(video)' : '(image)'}`}
                      />
                    ))}
                  </div>
                )}
                
                <div className={styles.modalCounter}>
                  {currentImageIndex + 1} / {images.length}
                </div>
              </div>
            </div>
          )}

          <div className={styles.infoSection}>
            <div className={styles.priceBox}>
              <span className={styles.priceLabel}>Sale price</span>
              <span className={styles.price}>{productPrice}</span>
            </div>

            <div className={styles.pricingDetails}>
              {product.originalPrice && (
                <div className={styles.pricingRow}>
                  <span>Regular price</span>
                  <span className={styles.regularPrice}>{product.originalPrice}</span>
                </div>
              )}
              {product.originalPrice && product.price && (
                <div className={styles.pricingRow}>
                  <span>Discount</span>
                  <span className={styles.discount}>{calculateDiscountPercentage(product.originalPrice, product.price)}</span>
                </div>
              )}
              {product.monthlyPlan && (
                <div className={styles.pricingRow}>
                  <span>or</span>
                  <span className={styles.monthlyPlan}>{product.monthlyPlan}</span>
                </div>
              )}
            </div>

            {product.paymentHighlights && product.paymentHighlights.length > 0 && (
              <div className={styles.paymentHighlights}>
                {product.paymentHighlights.map((item, index) => (
                  <span key={index}>{item}</span>
                ))}
              </div>
            )}

            <div className={styles.actionButtons}>
              <button onClick={handleCheckout} className={styles.buyNowBtn}>
                <ShoppingCart sx={{ fontSize: 20 }} />
                <span>Proceed to Checkout</span>
              </button>
              <p className={styles.secureCheckout}>✓ Secure checkout • Free shipping on selected items</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Below Image */}
      <section className={styles.contentBelowImage}>
        <div className={styles.contentContainer}>
          {product.pooja && (
            <div className={styles.poojaSection}>
              <div className={styles.poojaToggle}>
                <input
                  type="checkbox"
                  id="poojaCheckbox"
                  checked={isPoojaSelected}
                  onChange={(e) => setIsPoojaSelected(e.target.checked)}
                  className={styles.poojaCheckbox}
                />
                <label htmlFor="poojaCheckbox" className={styles.poojaLabel}>
                  <span className={styles.poojaTitle}>Add Pooja</span>
                  <span className={styles.poojaPrice}>+ 1</span>
                </label>
              </div>
              <p className={styles.poojaNote}>{product.pooja.note}</p>
            </div>
          )}

          <div className={styles.infoBox}>
            <h2 className={styles.boxTitle}>Product Summary</h2>
            <p className={styles.boxContent}>{displayDescription}</p>
          </div>

          {product.keyFeatures && product.keyFeatures.length > 0 && (
            <div className={styles.infoBox}>
              <h2 className={styles.boxTitle}>Key Features</h2>
              <ul className={styles.featureList}>
                {product.keyFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <div className={styles.benefitsGrid}>
            <div className={styles.benefitBox}>
              <h3 className={styles.boxTitle}>Benefits</h3>
              <ul className={styles.benefitList}>
                {displayBenefits.map((item, index) => (
                  <li key={index}>
                    <CheckCircle sx={{ fontSize: 18 }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.useBox}>
              <h3 className={styles.boxTitle}>Best For</h3>
              <ul className={styles.benefitList}>
                {displayUse.split(',').map((item, index) => (
                  <li key={index}>
                    <CheckCircle sx={{ fontSize: 18 }} />
                    <span>{item.trim()}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {product.spiritualSignificance && product.spiritualSignificance.length > 0 && (
        <section className={styles.contentBelowImage}>
          <div className={styles.contentContainer}>
            <div className={styles.infoBox}>
              <h2 className={styles.boxTitle}>Spiritual Significance</h2>
              <ul className={styles.featureList}>
                {product.spiritualSignificance.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {product.faq && product.faq.length > 0 && (
        <section className={styles.faqSection}>
          <div className={styles.faqContainer}>
            <h2>Frequently Asked Questions</h2>
            {product.faq.map((item, index) => (
              <div key={index} className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>{item.question}</h3>
                <p className={styles.faqAnswer}>{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Refund Policy Section */}
      <section className={styles.refundSection}>
        <div className={styles.refundContainer}>
          <h2>No Refund Policy</h2>
          <div className={styles.refundContent}>
            <div className={styles.refundItem}>
              <h3>No Refunds</h3>
              <p>We do not offer refunds for product purchases. All sales are final unless otherwise stated.</p>
            </div>
            <div className={styles.refundItem}>
              <h3>Exceptions</h3>
              <p>In rare cases of damage during shipping, please contact support immediately with photos for review.</p>
            </div>
            <div className={styles.refundItem}>
              <h3>Support</h3>
              <p>If you have any concerns, our support team is available to help at support@rehas.in.</p>
            </div>
          </div>
        </div>
      </section>

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

      {/* Similar Products Section - Only for merchandise products */}
      {product.slug && product.category && (
        <SimilarProducts
          category={product.category}
          currentProductSlug={product.slug}
        />
      )}

    </main>
  );
}
