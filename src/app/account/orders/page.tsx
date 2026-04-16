'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
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

const normalizePhone = (phone: string | null) => (phone ? phone.replace(/\D/g, '').slice(-10) : '');

export default function OrdersPage() {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);
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
                <div className={styles.modalActions}>
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
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
