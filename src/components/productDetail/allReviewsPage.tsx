'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Star, Delete, ArrowBack, Sort } from '@mui/icons-material';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import styles from './allReviewsPage.module.css';

interface Review {
  id: string;
  userId?: string;
  userName: string;
  email?: string;
  userEmail?: string;
  rating: number;
  title: string;
  content: string;
  createdAt: string;
  isPurchased: boolean;
  productId?: string;
}

interface AllReviewsPageProps {
  productId: string;
  productName: string;
  category: string;
}

export default function AllReviewsPage({
  productId,
  productName,
  category,
}: AllReviewsPageProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'recent' | 'helpful' | 'rating-high' | 'rating-low'>('recent');
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);

  // Fetch all reviews
  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        const { data: supabaseReviews, error } = await supabase
          .from('product_reviews')
          .select('*')
          .eq('product_id', productId)
          .eq('status', 'approved')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }

        let allReviews: Review[] = [];

        if (supabaseReviews && supabaseReviews.length > 0) {
          allReviews = supabaseReviews.map((review: any) => ({
            id: review.id,
            userId: review.user_id,
            userName: review.user_name,
            email: review.user_email,
            rating: review.rating,
            title: review.review_title,
            content: review.review_content,
            createdAt: review.created_at,
            isPurchased: review.is_verified_purchase,
            productId: review.product_id,
          }));
        }

        setReviews(allReviews);
        applySorting(allReviews, 'recent');
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setLoading(false);
      }
    };

    fetchAllReviews();
  }, [productId]);

  // Apply sorting
  const applySorting = (reviewsToSort: Review[], sortType: typeof sortBy) => {
    let sorted = [...reviewsToSort];

    switch (sortType) {
      case 'recent':
        sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'rating-high':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'rating-low':
        sorted.sort((a, b) => a.rating - b.rating);
        break;
      case 'helpful':
        // For now, helpful is same as recent (can be enhanced with helpful count in future)
        sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    setFilteredReviews(sorted);
  };

  const handleSortChange = (newSort: typeof sortBy) => {
    setSortBy(newSort);
    applySorting(reviews, newSort);
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    try {
      const { error } = await supabase
        .from('product_reviews')
        .delete()
        .eq('id', reviewId);

      if (error) throw error;

      const updatedReviews = reviews.filter((r) => r.id !== reviewId);
      setReviews(updatedReviews);
      applySorting(updatedReviews, sortBy);
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Error deleting review');
    }
  };

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0;

  const ratingDistribution = {
    5: reviews.filter((r) => r.rating === 5).length,
    4: reviews.filter((r) => r.rating === 4).length,
    3: reviews.filter((r) => r.rating === 3).length,
    2: reviews.filter((r) => r.rating === 2).length,
    1: reviews.filter((r) => r.rating === 1).length,
  };

  return (
    <main className={styles.container}>
      {/* Header */}
      {loading ? (
        <div className={styles.loadingHeader}>
          <div className={styles.skeletonTitle}></div>
          <div className={styles.skeletonReviewCount}></div>
        </div>
      ) : (
        <div className={styles.header}>
          <button
            className={styles.backButton}
            onClick={() =>
              router.push(`/product/${category}/${productId}`)
            }
            title="Back to product"
          >
            <ArrowBack sx={{ fontSize: 24 }} />
            Back to Product
          </button>
          <div>
            <h1 className={styles.title}>{productName} - All Reviews</h1>
            <p className={styles.reviewCount}>
              {reviews.length} review{reviews.length !== 1 ? 's' : ''} •{' '}
              <span className={styles.averageRating}>{averageRating}</span> / 5
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      {loading ? (
        <div className={styles.loadingMainContent}>
          {/* Loading Rating Summary */}
          <div className={styles.loadingRatingSummary}>
            <div className={styles.skeletonRatingOverview}>
              <div className={styles.skeletonLargeRating}></div>
              <div className={styles.skeletonStarsRow}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className={styles.skeletonStar}></div>
                ))}
              </div>
            </div>
            <div className={styles.skeletonDistributionBars}>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={styles.skeletonBar}></div>
              ))}
            </div>
          </div>

          {/* Loading Reviews Section */}
          <div className={styles.loadingReviewsSection}>
            <div className={styles.skeletonSortControls}>
              {[1, 2, 3].map((i) => (
                <div key={i} className={styles.skeletonSortButton}></div>
              ))}
            </div>
            <div className={styles.skeletonReviewsList}>
              {[1, 2, 3].map((i) => (
                <div key={i} className={styles.skeletonReviewItem}>
                  <div className={styles.skeletonReviewHeader}>
                    <div style={{ flex: 1 }}>
                      <div className={styles.skeletonReviewerName}></div>
                      <div className={styles.skeletonReviewDate}></div>
                    </div>
                  </div>
                  <div className={styles.skeletonRatingStars}>
                    {[1, 2, 3, 4, 5].map((j) => (
                      <div key={j} className={styles.skeletonRatingStar}></div>
                    ))}
                  </div>
                  <div className={styles.skeletonReviewTitle}></div>
                  <div className={styles.skeletonReviewContent}></div>
                  <div className={styles.skeletonReviewContent}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.mainContent}>
        {/* Rating Summary */}
        <section className={styles.ratingSummary}>
          <div className={styles.ratingOverview}>
            <div className={styles.largeAverageRating}>
              <span className={styles.rating}>{averageRating}</span>
              <span className={styles.maxRating}>/ 5</span>
            </div>
            <div className={styles.starsDisplay}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  sx={{
                    fontSize: 24,
                    color:
                      i < Math.round(parseFloat(averageRating as string))
                        ? '#ffc107'
                        : '#e0e0e0',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Rating Distribution */}
          <div className={styles.ratingDistribution}>
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className={styles.ratingBar}>
                <span className={styles.ratingLabel}>{rating} Star</span>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progress}
                    style={{
                      width: `${
                        reviews.length > 0
                          ? (ratingDistribution[rating as keyof typeof ratingDistribution] /
                              reviews.length) *
                            100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
                <span className={styles.count}>
                  {ratingDistribution[rating as keyof typeof ratingDistribution]}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className={styles.divider}></div>

        {/* Reviews Section */}
        <section className={styles.reviewsSection}>
          {/* Sort Controls */}
          <div className={styles.sortControls}>
            <div className={styles.sortLabel}>
              <Sort sx={{ fontSize: 20 }} />
              <span>Sort by:</span>
            </div>
            <div className={styles.sortButtons}>
              {[
                { value: 'recent', label: 'Most Recent' },
                { value: 'rating-high', label: 'Highest Rating' },
                { value: 'rating-low', label: 'Lowest Rating' },
              ].map(({ value, label }) => (
                <button
                  key={value}
                  className={`${styles.sortButton} ${
                    sortBy === value ? styles.sortButtonActive : ''
                  }`}
                  onClick={() => handleSortChange(value as typeof sortBy)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Reviews List */}
          {loading ? (
            <div className={styles.loadingContainer}>
              <p>Loading reviews...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className={styles.noReviews}>
              <p>No reviews yet. Be the first to share your experience!</p>
            </div>
          ) : (
            <div className={styles.reviewsList}>
              {filteredReviews.map((review) => (
                <div key={review.id} className={styles.reviewItem}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.reviewerInfo}>
                      <h3 className={styles.reviewerName}>{review.userName}</h3>
                      {/* <p className={styles.reviewDate}>
                        {new Date(review.createdAt).toLocaleDateString(
                          'en-IN',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
                      </p> */}
                    </div>
                    {user?.id === review.userId && (
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDeleteReview(review.id)}
                        title="Delete review"
                      >
                        <Delete sx={{ fontSize: 18 }} />
                      </button>
                    )}
                  </div>

                  <div className={styles.ratingDisplay}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        sx={{
                          fontSize: 16,
                          color: i < review.rating ? '#ffc107' : '#e0e0e0',
                        }}
                      />
                    ))}
                    <span className={styles.ratingValue}>{review.rating}.0</span>
                  </div>

                  <h4 className={styles.reviewTitle}>{review.title}</h4>
                  <p className={styles.reviewContent}>{review.content}</p>

                  {review.isPurchased && (
                    <p className={styles.verifiedBadge}>✓ Verified Purchase</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
      )}
    </main>
  );
}
