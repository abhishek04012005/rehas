'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, CheckCircle, ChevronRight, EmojiEvents, ChevronLeft, PlayCircle, Close } from '@mui/icons-material';
import { useCheckout } from '@/context/CheckoutContext';
import { useAuth } from '@/context/AuthContext';
import { calculateDiscountPercentage } from '@/data/productMerchandise';
import LineArtBackground from '../lineArtBackground/lineArtBackground';
import SimilarProducts from './similarProducts';
import ReviewsSection from './reviewsSection';
import styles from './productDetail.module.css';

interface ProductDetailData {
  name: string;
  category: string;
  slug?: string;
  tagline?: string;
  qualityTag?: string;
  shortDescription?: string;
  meaning: string;
  benefit: string;
  use: string;
  price?: string;
  originalPrice?: string;
  pricingTiers?: {
    basic: { price: string; originalPrice?: string; label: string; description?: string };
    market: { price: string; originalPrice?: string; label: string; description?: string };
    premium: { price: string; originalPrice?: string; label: string; description?: string };
  };
  monthlyPlan?: string;
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
  zodiacSign?: string;
  planet?: string;
  mulankNumber?: string;
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

// Helper function to get zodiac sign symbol
const getZodiacSymbol = (sign: string): string => {
  const signMap: { [key: string]: string } = {
    'Aries': '♈',
    'Taurus': '♉',
    'Gemini': '♊',
    'Cancer': '♋',
    'Leo': '♌',
    'Virgo': '♍',
    'Libra': '♎',
    'Scorpio': '♏',
    'Sagittarius': '♐',
    'Capricorn': '♑',
    'Aquarius': '♒',
    'Pisces': '♓',
    'All Signs': '♈♉♊♋♌♍♎♏♐♑♒♓'
  };
  return signMap[sign] || '✨';
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
  const { setProductData, addToCart } = useCheckout();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPoojaSelected, setIsPoojaSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<'basic' | 'market' | 'premium'>('basic');
  
  const categoryDisplay = product.category.charAt(0).toUpperCase() + product.category.slice(1);
  const productName = product.name;
  
  // Determine which price to show
  let productPrice = product.pricingTiers ? product.pricingTiers[selectedTier].price : (product.price || '₹999');
  let currentAmount = parseFloat(productPrice.replace(/[₹,]/g, '')) || 999;

  if (isPoojaSelected && product.pooja?.price) {
    // Add pooja price from productMerchandise.ts
    const poojaPrice = parseFloat(product.pooja.price.replace(/[₹,]/g, '')) || 0;
    currentAmount = currentAmount + poojaPrice;
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { user } = useAuth();

  const handleCheckout = () => {
    const tierLabel = product.pricingTiers ? product.pricingTiers[selectedTier].label : '';
    setProductData({ 
      productTitle: product.pricingTiers ? `${productName} (${tierLabel})` : productName, 
      amount: currentAmount,
      type: 'product',
      isPoojaSelected: isPoojaSelected,
      poojaLabel: isPoojaSelected ? product.pooja?.label : undefined,
      poojaPrice: isPoojaSelected ? product.pooja?.price : undefined,
      selectedTier: product.pricingTiers ? selectedTier : undefined
    });
    if (!user) {
      router.push('/auth?redirect=/checkout');
      return;
    }
    router.push('/checkout');
  };

  const handleAddToCart = () => {
    const tierLabel = product.pricingTiers ? product.pricingTiers[selectedTier].label : '';
    const itemId = `${product.category}-${productName}-${tierLabel}-${isPoojaSelected ? product.pooja?.label : 'default'}`;
    const newItem = {
      id: itemId,
      productId: itemId, // Add productId for database storage
      productTitle: product.pricingTiers ? `${productName} (${tierLabel})` : productName,
      amount: currentAmount,
      quantity: 1,
      type: 'product' as const,
      description: displayDescription,
      isPoojaSelected,
      poojaLabel: isPoojaSelected ? product.pooja?.label : undefined,
      poojaPrice: isPoojaSelected ? product.pooja?.price : undefined,
      selectedTier: product.pricingTiers ? selectedTier : undefined,
    };
    addToCart(newItem);

    // Show success modal instead of alert
    setIsSuccessModalOpen(true);
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
                      onClick={() => setIsModalOpen(true)}
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
                    onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
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
                    onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
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

          {/* Success Modal for Cart Addition */}
          {isSuccessModalOpen && (
            <div className={styles.successModalOverlay} onClick={() => setIsSuccessModalOpen(false)}>
              <div className={styles.successModalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.successModalHeader}>
                  <div className={styles.successIcon}>
                    <CheckCircle sx={{ fontSize: 48, color: '#4CAF50' }} />
                  </div>
                  <h3 className={styles.successTitle}>Added to Cart!</h3>
                </div>
                <div className={styles.successModalBody}>
                  <p className={styles.successMessage}>
                    <strong>{product.pricingTiers ? `${productName} (${product.pricingTiers[selectedTier].label})` : productName}</strong> has been added to your cart successfully.
                  </p>
                  <div className={styles.successActions}>
                    <button 
                      className={styles.continueShoppingBtn}
                      onClick={() => setIsSuccessModalOpen(false)}
                    >
                      Continue Shopping
                    </button>
                    <Link href="/cart" className={styles.viewCartBtn}>
                      View Cart
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className={styles.infoSection}>
            {product.pricingTiers ? (
              <div className={styles.pricingTiers}>
                <h3 className={styles.pricingTitle}>
                  {product.pricingTiers[selectedTier].label} Package Selected
                </h3>
                <div className={styles.tierOptions}>
                  {Object.entries(product.pricingTiers).map(([tierKey, tier]) => (
                    <div
                      key={tierKey}
                      className={`${styles.tierCard} ${selectedTier === tierKey ? styles.tierSelected : ''}`}
                      onClick={() => setSelectedTier(tierKey as 'basic' | 'market' | 'premium')}
                    >
                      <h4 className={styles.tierLabel}>{tier.label}</h4>
                      <span className={styles.tierPrice}>{tier.price}</span>
                      {tier.originalPrice && (
                        <span className={styles.tierOriginalPrice}>
                          {tier.originalPrice}
                        </span>
                      )}
                      {tier.originalPrice && (
                        <span className={styles.tierDiscount}>
                          {calculateDiscountPercentage(tier.originalPrice, tier.price)}
                        </span>
                      )}
                      {tier.description && <p className={styles.tierDescription}>{tier.description}</p>}
                    </div>
                  ))}
                </div>
                <div className={styles.selectedPrice}>
                  <span className={styles.priceLabel}>Selected Price</span>
                  <span className={styles.price}>{productPrice}</span>
                </div>
              </div>
            ) : (
              <div className={styles.priceBox}>
                <span className={styles.priceLabel}>Sale price</span>
                <span className={styles.price}>{productPrice}</span>
              </div>
            )}


            <div className={styles.pricingDetails}>
              {product.originalPrice && !product.pricingTiers && (
                <div className={styles.pricingRow}>
                  <span>Regular price</span>
                  <span className={styles.regularPrice}>{product.originalPrice}</span>
                </div>
              )}
              {product.originalPrice && product.price && !product.pricingTiers && (
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
                    <span className={styles.poojaTitle}>{product.pooja?.label || 'Add Pooja'}</span>
                    <span className={styles.poojaPrice}>+ {product.pooja?.price || '₹0'}</span>
                  </label>
                </div>
                <p className={styles.poojaNote}>{product.pooja.note}</p>
              </div>
            )}

            <div className={styles.actionButtons}>
              <button onClick={handleAddToCart} className={styles.cartBtn}>
                <ShoppingCart sx={{ fontSize: 20 }} />
                <span>Add to Cart</span>
              </button>
              <button onClick={handleCheckout} className={styles.buyNowBtn}>
                <ShoppingCart sx={{ fontSize: 20 }} />
                <span>Buy Now</span>
              </button>
              <p className={styles.secureCheckout}>✓ Secure checkout • Free shipping on selected items</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Below Image */}
      <section className={styles.contentBelowImage}>
        <div className={styles.contentContainer}>
          <div className={styles.infoBox}>
            <h2 className={styles.boxTitle}>Product Summary</h2>
            <p className={styles.boxContent}>{displayDescription}</p>
          </div>

          {/* Astrological Information Section */}
          {(product.zodiacSign || product.planet || product.mulankNumber) && (
            <div className={styles.astrologicalGrid}>
              {product.zodiacSign && (
                <div className={styles.astrologicalBox}>
                  <h3 className={styles.boxTitle}>
                    <span className={styles.zodiacSymbol}>{getZodiacSymbol(product.zodiacSign.split(',')[0].trim())}</span>
                    Zodiac Sign
                  </h3>
                  <ul className={styles.benefitList}>
                    <li>
                      <CheckCircle sx={{ fontSize: 18 }} />
                      <span>{product.zodiacSign}</span>
                    </li>
                  </ul>
                </div>
              )}
              {product.planet && (
                <div className={styles.astrologicalBox}>
                  <h3 className={styles.boxTitle}>
                    <span className={styles.planetSymbol}>🪐</span>
                    Planet
                  </h3>
                  <ul className={styles.benefitList}>
                    <li>
                      <CheckCircle sx={{ fontSize: 18 }} />
                      <span>{product.planet}</span>
                    </li>
                  </ul>
                </div>
              )}
              {product.mulankNumber && (
                <div className={styles.astrologicalBox}>
                  <h3 className={styles.boxTitle}>
                    <span className={styles.numberSymbol}>✨</span>
                    Mulank
                  </h3>
                  <ul className={styles.benefitList}>
                    <li>
                      <CheckCircle sx={{ fontSize: 18 }} />
                      <span>{product.mulankNumber}</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}

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

          <div className={styles.additionalInfoGrid}>
            {product.emotionalHook && (
              <div className={styles.infoBox}>
                <h2 className={styles.boxTitle}>Emotional Hook</h2>
                <p className={styles.boxContent}>{product.emotionalHook}</p>
              </div>
            )}

            {product.careInstructions && product.careInstructions.length > 0 && (
              <div className={styles.infoBox}>
                <h2 className={styles.boxTitle}>Care Instructions</h2>
                <ul className={styles.infoList}>
                  {product.careInstructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ul>
              </div>
            )}

            {product.howToUse && product.howToUse.length > 0 && (
              <div className={styles.infoBox}>
                <h2 className={styles.boxTitle}>How to Use</h2>
                <ul className={styles.infoList}>
                  {product.howToUse.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
            )}

            {product.specifications && (
              <div className={styles.infoBox}>
                <h2 className={styles.boxTitle}>Specifications</h2>
                <ul className={styles.specList}>
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <li key={key} className={styles.specItem}>
                      <span className={styles.specKey}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}</span>
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.trustBadges && product.trustBadges.length > 0 && (
              <div className={styles.infoBox}>
                <h2 className={styles.boxTitle}>Trust Badges</h2>
                <ul className={styles.badgeList}>
                  {product.trustBadges.map((badge, index) => (
                    <li key={index} className={styles.badgeItem}>{badge}</li>
                  ))}
                </ul>
              </div>
            )}
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

          {/* No Refund for Energy-Activated Products */}
          <div className={styles.energyActivationPolicy}>
            <h3>Why No Refund for Energy-Activated Bracelets?</h3>
            <p>
              When you select the <strong>"Energy Cleansing Ritual"</strong> or <strong>"Energy Activation Ritual"</strong> option, a sacred puja (ritual ceremony) is performed on your bracelet with your name and intention. Once this spiritual activation is completed:
            </p>
            <ul>
              <li><strong>Personalized Energy Work:</strong> The bracelet becomes spiritually personalized to you through ritual activation</li>
              <li><strong>Irreversible Process:</strong> The energy work performed cannot be reversed or transferred</li>
              <li><strong>Spiritual Commitment:</strong> The ritual creates a sacred bond between you and the crystal's healing energy</li>
              <li><strong>No Returns Accepted:</strong> Bracelets with completed puja ceremonies are non-refundable under any circumstances</li>
            </ul>
            <p className={styles.policyNote}>
              Please ensure you are ready for the spiritual commitment before selecting the energy activation ritual. If you prefer to purchase without the ritual, you can choose a bracelet without this service, which is still subject to our standard no-refund policy.
            </p>
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

      {/* Reviews Section */}
      <ReviewsSection productId={product.slug || ''} productName={product.name} />

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
