'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { productMerchandiseData } from '@/data/productMerchandise';
import styles from './orders.module.css';

interface OrderRecord {
  id: number;
  product_title: string;
  amount: string;
  items?: any;
  full_name?: string;
  email?: string;
  phone_number?: string;
  address_line_1?: string;
  address_line_2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  payment_status: string;
  payment_method?: string;
  transaction_id?: string;
  razorpay_payment_id?: string;
  status: string;
  created_at: string;
}

// Helper function to validate UUID format
const isValidUUID = (uuid: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

const normalizePhone = (phone: string | null) => (phone ? phone.replace(/\D/g, '').slice(-10) : '');

// Helper function to convert product title to slug
const titleToSlug = (title: string): string => {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

export default function OrdersPage() {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    title: '',
    content: '',
  });
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      const phone = normalizePhone(user.phone);
      let query = supabase.from('orders').select('*').order('created_at', { ascending: false });

      if (user.email) {
        query = query.or(`email.eq.${user.email},phone_number.eq.${phone}`);
      } else if (phone) {
        query = query.eq('phone_number', phone);
      }

      const { data, error } = await query;
      if (error) {
        setError(error.message);
      } else if (data) {
        setOrders(data as OrderRecord[]);
      }
      setIsLoading(false);
    };

    fetchOrders();
  }, [user]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder || !user) return;

    setReviewSubmitting(true);
    setReviewError('');
    setReviewSuccess('');

    try {
      // Extract product name from order items or use product_title
      let productName = selectedOrder.product_title;

      // Try to extract from items JSON
      try {
        const items = typeof selectedOrder.items === 'string' ? JSON.parse(selectedOrder.items) : selectedOrder.items;
        if (Array.isArray(items) && items.length > 0) {
          const firstItem = items[0];
          productName = firstItem.productTitle || firstItem.name || productName;
        }
      } catch (_err) {
        // Use product_title as fallback
      }

      // Find product in merchandise data - try exact match first, then partial match
      let matchedProduct = productMerchandiseData.find(
        (product) => product.name.toLowerCase() === productName.toLowerCase()
      );

      // If no exact match, try to find by partial match (first few words)
      if (!matchedProduct) {
        const productWords = productName.toLowerCase().split(' ');
        matchedProduct = productMerchandiseData.find((product) => {
          const merchandiseName = product.name.toLowerCase();
          return productWords.some(word => merchandiseName.includes(word)) &&
                 productWords.slice(0, 2).every(word => merchandiseName.includes(word));
        });
      }

      // Get the correct slug from merchandise data or fallback
      const productSlug = matchedProduct ? matchedProduct.slug : titleToSlug(productName);
      const finalProductName = matchedProduct ? matchedProduct.name : productName;

      // Only include user_id if it's a valid UUID
      const userId = user.id && isValidUUID(user.id) ? user.id : null;

      const { error: submitError } = await supabase.from('product_reviews').insert({
        product_id: productSlug,
        product_name: finalProductName,
        user_id: userId,
        user_name: selectedOrder.full_name || user.email?.split('@')[0] || 'Anonymous',
        user_email: user.email || '',
        rating: reviewData.rating,
        review_title: reviewData.title,
        review_content: reviewData.content,
        is_verified_purchase: true,
        status: 'approved',
        created_at: new Date().toISOString(),
      });

      if (submitError) {
        setReviewError(submitError.message || 'Failed to submit review');
      } else {
        setReviewSuccess('Review submitted successfully! It will appear after admin approval.');
        setReviewData({ rating: 5, title: '', content: '' });
        setShowReviewForm(false);
        setTimeout(() => {
          setReviewSuccess('');
        }, 3000);
      }
    } catch (err: any) {
      setReviewError(err.message || 'An error occurred while submitting your review');
    } finally {
      setReviewSubmitting(false);
    }
  };

  if (loading || isLoading) {
    return <div className={styles.loading}>Loading your order history...</div>;
  }

  if (!user) {
    return (
      <div className={styles.emptyState}>
        <h1>Please log in to view your orders</h1>
        <p>Order history is available once you sign in with your Gmail or mobile number.</p>
        <Link href="/auth?redirect=/account/orders" className={styles.loginButton}>
          Login / Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.ordersPage}>
      <div className={styles.ordersHeader}>
        <div>
          <h1>My Orders</h1>
          <p>Review your recent purchases and order status.</p>
        </div>
        <Link href="/cart" className={styles.cartLink}>View Cart</Link>
      </div>

      {error && <div className={styles.errorBox}>{error}</div>}

      {orders.length === 0 ? (
        <div className={styles.emptyState}>
          <h2>No orders found</h2>
          <p>Once you place an order, it will appear here.</p>
          <Link href="/products/healing" className={styles.shopButton}>
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.tableWrapper}>
          <div className={styles.tableHeaderBar}>
            <div>
              <p className={styles.summaryLabel}>Recent orders</p>
              <h2 className={styles.summaryValue}>{orders.length} order{orders.length > 1 ? 's' : ''}</h2>
            </div>
            <span className={styles.tableNote}>Tap any row for details on mobile</span>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.ordersTable}>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Placed</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className={styles.orderRow}>
                    <td data-label="Order">#{order.id}</td>
                    <td data-label="Placed">{new Date(order.created_at).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}</td>
                    <td data-label="Items">{order.product_title}</td>
                    <td data-label="Total">₹{parseFloat(order.amount || '0').toFixed(2)}</td>
                    <td data-label="Status">
                      <span className={styles.statusBadge}>{order.status}</span>
                    </td>
                      <td data-label="Payment">
                      <span className={styles.paymentBadge}>{order.payment_status}</span>
                    </td>
                    <td data-label="Actions">
                      <div className={styles.actionButtonGroup}>
                        <button
                          type="button"
                          className={styles.detailsButton}
                          onClick={() => setSelectedOrder(order)}
                        >
                          Details
                        </button>
                        {order.payment_status.toLowerCase() !== 'paid' ? (
                          <Link href={`/checkout?orderId=${order.id}`} className={styles.actionButton}>
                            Pay Now
                          </Link>
                        ) : (
                          <button
                            onClick={() => {
                              // Store order data in localStorage for receipt view
                              localStorage.setItem('receiptOrderData', JSON.stringify({
                                orderId: order.id,
                                transactionId: order.razorpay_payment_id || order.transaction_id || '',
                                amount: order.amount,
                                method: order.payment_method || 'razorpay'
                              }));
                              window.location.href = '/payment/success';
                            }}
                            className={styles.actionButton}
                          >
                            Receipt
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

          {selectedOrder && (
            <div className={styles.modalBackdrop} onClick={() => setSelectedOrder(null)}>
              <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.modalClose} onClick={() => setSelectedOrder(null)}>
                  ×
                </button>
                <h2>Order #{selectedOrder.id} Details</h2>
                <div className={styles.modalSection}>
                  <span className={styles.modalLabel}>Placed</span>
                  <span>{new Date(selectedOrder.created_at).toLocaleString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}</span>
                </div>
                <div className={styles.modalSection}>
                  <span className={styles.modalLabel}>Status</span>
                  <span>{selectedOrder.status}</span>
                </div>
                <div className={styles.modalSection}>
                  <span className={styles.modalLabel}>Payment Status</span>
                  <span>{selectedOrder.payment_status}</span>
                </div>
                {selectedOrder.payment_method && (
                  <div className={styles.modalSection}>
                    <span className={styles.modalLabel}>Payment Method</span>
                    <span>{selectedOrder.payment_method}</span>
                  </div>
                )}
                {selectedOrder.transaction_id && (
                  <div className={styles.modalSection}>
                    <span className={styles.modalLabel}>Transaction ID</span>
                    <span>{selectedOrder.transaction_id}</span>
                  </div>
                )}
                <div className={styles.modalSection}>
                  <span className={styles.modalLabel}>Total Amount</span>
                  <span>₹{parseFloat(selectedOrder.amount || '0').toFixed(2)}</span>
                </div>
                <div className={styles.modalSection}>
                  <span className={styles.modalLabel}>Items</span>
                  <div className={styles.modalItems}>
                    {(() => {
                      try {
                        const items = typeof selectedOrder.items === 'string' ? JSON.parse(selectedOrder.items) : selectedOrder.items;
                        if (Array.isArray(items) && items.length > 0) {
                          return items.map((item: any, idx: number) => (
                            <div key={idx} className={styles.modalItemRow}>
                              <span>{item.productTitle || item.name || item.title || 'Item'}</span>
                              <span>Qty {item.quantity || 1}</span>
                              <span>₹{((typeof item.amount === 'string' ? parseFloat(item.amount.replace(/[₹,]/g, '')) : item.amount) || 0).toFixed(2)}</span>
                            </div>
                          ));
                        }
                      } catch (_err) {
                        // ignore JSON parse errors
                      }
                      return <div>{selectedOrder.product_title}</div>;
                    })()}
                  </div>
                </div>
                {(selectedOrder.address_line_1 || selectedOrder.city) && (
                  <div className={styles.modalSection}>
                    <span className={styles.modalLabel}>Shipping Address</span>
                    <div>
                      <div>{selectedOrder.address_line_1}</div>
                      {selectedOrder.address_line_2 && <div>{selectedOrder.address_line_2}</div>}
                      <div>{selectedOrder.city}, {selectedOrder.state} - {selectedOrder.postal_code}</div>
                      <div>{selectedOrder.country}</div>
                    </div>
                  </div>
                )}

                {!showReviewForm ? (
                  <div className={styles.modalActions}>
                    <button
                      className={styles.modalActionButton}
                      onClick={() => setShowReviewForm(true)}
                    >
                      ⭐ Add Review
                    </button>
                    {selectedOrder.payment_status.toLowerCase() !== 'paid' ? (
                      <Link href={`/checkout?orderId=${selectedOrder.id}`} className={styles.modalActionButton}>
                        Pay Now
                      </Link>
                    ) : (
                      <Link
                        href={`/payment/success?orderId=${selectedOrder.id}&transactionId=${encodeURIComponent(selectedOrder.razorpay_payment_id || selectedOrder.transaction_id || '')}&amount=${encodeURIComponent(selectedOrder.amount)}&method=${encodeURIComponent(selectedOrder.payment_method || 'razorpay')}`}
                        className={styles.modalActionButton}
                      >
                        Download Receipt
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className={styles.reviewFormContainer}>
                    <h3>Add Review for {selectedOrder.product_title}</h3>
                    
                    {reviewError && <div className={styles.errorBox}>{reviewError}</div>}
                    {reviewSuccess && <div className={styles.successBox}>{reviewSuccess}</div>}
                    
                    <form onSubmit={handleReviewSubmit}>
                      <div className={styles.formGroup}>
                        <label>Rating</label>
                        <div className={styles.ratingInput}>
                          {[1, 2, 3, 4, 5].map((num) => (
                            <button
                              key={num}
                              type="button"
                              className={`${styles.starButton} ${reviewData.rating >= num ? styles.active : ''}`}
                              onClick={() => setReviewData({ ...reviewData, rating: num })}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="review-title">Review Title</label>
                        <input
                          id="review-title"
                          type="text"
                          placeholder="E.g., Excellent product!"
                          value={reviewData.title}
                          onChange={(e) => setReviewData({ ...reviewData, title: e.target.value })}
                          required
                          className={styles.formInput}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="review-content">Your Review</label>
                        <textarea
                          id="review-content"
                          placeholder="Share your thoughts about this product..."
                          value={reviewData.content}
                          onChange={(e) => setReviewData({ ...reviewData, content: e.target.value })}
                          required
                          rows={4}
                          className={styles.formInput}
                        />
                      </div>

                      <div className={styles.reviewFormActions}>
                        <button
                          type="submit"
                          disabled={reviewSubmitting}
                          className={styles.submitButton}
                        >
                          {reviewSubmitting ? 'Submitting...' : 'Submit Review'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowReviewForm(false);
                            setReviewError('');
                            setReviewSuccess('');
                          }}
                          className={styles.cancelButton}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
