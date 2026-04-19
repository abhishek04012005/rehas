'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, SendOutlined, Delete, ExpandMore } from '@mui/icons-material';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import styles from './productDetail.module.css';

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

interface ReviewsData {
  productId: string;
  reviews: Review[];
}

export default function ReviewsSection({
  productId,
  productName,
  category,
}: {
  productId: string;
  productName: string;
  category?: string;
}) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    rating: 5,
    title: '',
    content: '',
  });
  const [userHasPurchased, setUserHasPurchased] = useState(false);
  const [userReview, setUserReview] = useState<Review | null>(null);

  // Fetch reviews from Supabase
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Fetch approved reviews from Supabase
        const { data: supabaseReviews, error } = await supabase
          .from('product_reviews')
          .select('*')
          .eq('product_id', productId)
          .eq('status', 'approved')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Supabase error:', error);
          // Fallback to dummy data if Supabase fails
          throw error;
        }

        let allReviews: Review[] = [];

        if (supabaseReviews && supabaseReviews.length > 0) {
          // Transform Supabase data to Review format
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

        // Check if user has purchased this product and already reviewed
        if (user) {
          const userOrder = checkUserPurchase(productId);
          setUserHasPurchased(userOrder);

          const existingReview = allReviews.find(
            (r: Review) => r.userId === user.id
          );
          if (existingReview) {
            setUserReview(existingReview);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId, user]);

  // Check if user has purchased this product (from localStorage orders)
  const checkUserPurchase = (productSlug: string): boolean => {
    if (!user) return false;
    try {
      const ordersKey = `user_orders_${user.id}`;
      const userOrders = localStorage.getItem(ordersKey);
      if (!userOrders) return false;
      const orders = JSON.parse(userOrders);
      return orders.some((order: any) =>
        order.items?.some((item: any) =>
          item.productTitle?.toLowerCase().includes(productSlug.toLowerCase())
        )
      );
    } catch {
      return false;
    }
  };

  const handleRatingClick = (rating: number) => {
    setFormData({ ...formData, rating });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert('Please login to add a review');
      return;
    }

    if (!userHasPurchased && !userReview) {
      alert('You can only review products you have purchased');
      return;
    }

    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const reviewData = {
        product_id: productId,
        product_name: productName,
        user_id: user.id,
        user_name: user.fullName || user.email?.split('@')[0] || 'Anonymous',
        user_email: user.email || '',
        rating: formData.rating,
        review_title: formData.title,
        review_content: formData.content,
        is_verified_purchase: true,
        status: 'approved',
      };

      if (userReview) {
        // Update existing review
        const { error } = await supabase
          .from('product_reviews')
          .update(reviewData)
          .eq('id', userReview.id);

        if (error) throw error;

        const updatedReviews = reviews.map((r) =>
          r.id === userReview.id
            ? {
                ...r,
                ...reviewData,
                userId: user.id,
                userName: reviewData.user_name,
                email: reviewData.user_email,
                title: reviewData.review_title,
                content: reviewData.review_content,
                isPurchased: true,
              }
            : r
        );
        setReviews(updatedReviews);
        setUserReview(updatedReviews.find((r) => r.id === userReview.id) || null);
      } else {
        // Add new review
        const { data, error } = await supabase
          .from('product_reviews')
          .insert([reviewData])
          .select();

        if (error) throw error;

        if (data && data.length > 0) {
          const newReview: Review = {
            id: data[0].id,
            userId: data[0].user_id,
            userName: data[0].user_name,
            email: data[0].user_email,
            rating: data[0].rating,
            title: data[0].review_title,
            content: data[0].review_content,
            createdAt: data[0].created_at,
            isPurchased: data[0].is_verified_purchase,
            productId: data[0].product_id,
          };
          const updatedReviews = [newReview, ...reviews];
          setReviews(updatedReviews);
          setUserReview(newReview);
        }
      }

      setFormData({ rating: 5, title: '', content: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review');
    }
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
      setUserReview(null);
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Error deleting review');
    }
  };

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0;

  if (loading) {
    return (
      <section className={styles.reviewsSection}>
        <div className={styles.reviewsContainer}>
          <div className={styles.reviewsHeaderSkeleton}>
            <div className={styles.skeletonTitle}></div>
            <div className={styles.skeletonSubtitle}></div>
          </div>
          <div className={styles.reviewsListSkeleton}>
            {[1, 2, 3].map((index) => (
              <div key={index} className={styles.reviewItemSkeleton}>
                <div className={styles.skeletonReviewHeader}>
                  <div className={styles.skeletonAvatar}></div>
                  <div className={styles.skeletonReviewerInfo}>
                    <div className={styles.skeletonName}></div>
                    <div className={styles.skeletonRating}></div>
                  </div>
                </div>
                <div className={styles.skeletonReviewTitle}></div>
                <div className={styles.skeletonReviewContent}></div>
                <div className={styles.skeletonReviewContent}></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.reviewsSection}>
      <div className={styles.reviewsContainer}>
        <div className={styles.reviewsHeader}>
          <div>
            <h2>Customer Reviews</h2>
            <p className={styles.reviewStats}>
              {reviews.length} review{reviews.length !== 1 ? 's' : ''} • Average rating:{' '}
              <span className={styles.averageRating}>{averageRating}</span> / 5
            </p>
          </div>
          {user && (userHasPurchased || userReview) && (
            <button
              className={styles.addReviewBtn}
              onClick={() => setShowForm(!showForm)}
            >
              {userReview ? 'Edit Your Review' : 'Add Review'}
            </button>
          )}
          {user && !userHasPurchased && !userReview && (
            <div className={styles.purchaseRequired}>
              <p>Purchase this product to leave a review</p>
            </div>
          )}
          {!user && (
            <div className={styles.loginRequired}>
              <p>Login to write a review</p>
            </div>
          )}
        </div>

        {/* Review Form */}
        {showForm && user && (userHasPurchased || userReview) && (
          <div className={styles.reviewFormContainer}>
            <h3>{userReview ? 'Edit Your Review' : 'Write a Review'}</h3>
            <form onSubmit={handleSubmitReview} className={styles.reviewForm}>
              <div className={styles.formGroup}>
                <label>Rating *</label>
                <div className={styles.ratingInput}>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      className={`${styles.ratingButton} ${
                        formData.rating >= rating ? styles.ratingActive : ''
                      }`}
                      onClick={() => handleRatingClick(rating)}
                      title={`${rating} star${rating > 1 ? 's' : ''}`}
                    >
                      <Star sx={{ fontSize: 28 }} />
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="title">Review Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="E.g., Great product, highly recommend!"
                  value={formData.title}
                  onChange={handleInputChange}
                  maxLength={100}
                  required
                />
                <p className={styles.charCount}>
                  {formData.title.length}/100
                </p>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="content">Review *</label>
                <textarea
                  id="content"
                  name="content"
                  placeholder="Share your experience with this product..."
                  value={formData.content}
                  onChange={handleInputChange}
                  maxLength={500}
                  rows={5}
                  required
                />
                <p className={styles.charCount}>
                  {formData.content.length}/500
                </p>
              </div>

              <div className={styles.formActions}>
                <button type="submit" className={styles.submitBtn}>
                  <SendOutlined sx={{ fontSize: 18 }} />
                  {userReview ? 'Update Review' : 'Submit Review'}
                </button>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => {
                    setShowForm(false);
                    setFormData({ rating: 5, title: '', content: '' });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Reviews List */}
        <div className={styles.reviewsList}>
          {reviews.length === 0 ? (
            <div className={styles.noReviews}>
              <p>No reviews yet. Be the first to share your experience!</p>
            </div>
          ) : (
            <>
              {/* Show only 2 latest reviews */}
              {reviews
                .slice(0, 2)
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((review) => (
                  <div key={review.id} className={styles.reviewItem}>
                    <div className={styles.reviewItemHeader}>
                      <div className={styles.reviewerDetails}>
                        <h4>{review.userName}</h4>
                        {/* <p className={styles.reviewDate}>
                          {new Date(review.createdAt).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                    </p> */}
                  </div>
                  {user?.id === review.userId && (
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDeleteReview(review.id)}
                      title="Delete review"
                    >
                      <Delete sx={{ fontSize: 18 }} />
                    </button>
                  )}
                </div>

                <div className={styles.reviewRating}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      sx={{
                        fontSize: 16,
                        color: i < review.rating ? '#ffc107' : '#e0e0e0',
                      }}
                    />
                  ))}
                  <span className={styles.ratingNumber}>{review.rating}.0</span>
                </div>

                <h3 className={styles.reviewTitle}>{review.title}</h3>
                <p className={styles.reviewContent}>{review.content}</p>

                {review.isPurchased && (
                  <p className={styles.verifiedBadge}>✓ Verified Purchase</p>
                )}
              </div>
            ))}

              {/* Show All Reviews Button - Navigate to dedicated page */}
              {reviews.length > 2 && (
                <Link
                  href={`/product/${category || 'merchandise'}/${productId}/reviews`}
                  className={styles.showAllReviewsBtn}
                >
                  <ExpandMore sx={{ fontSize: 20 }} />
                  Show All {reviews.length} Reviews
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
