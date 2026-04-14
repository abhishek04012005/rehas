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
  payment_status: string;
  status: string;
  created_at: string;
}

const normalizePhone = (phone: string | null) => (phone ? phone.replace(/\D/g, '').slice(-10) : '');

export default function OrdersPage() {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState<OrderRecord[]>([]);
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
        <div className={styles.orderGrid}>
          {orders.map((order) => (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.orderRow}>
                <span className={styles.orderLabel}>Order ID</span>
                <strong>#{order.id}</strong>
              </div>
              <div className={styles.orderRow}>
                <span className={styles.orderLabel}>Placed on</span>
                <span>{new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div className={styles.orderRow}>
                <span className={styles.orderLabel}>Items</span>
                <span>{order.product_title}</span>
              </div>
              <div className={styles.orderRow}>
                <span className={styles.orderLabel}>Amount</span>
                <span>₹{parseFloat(order.amount || '0').toFixed(2)}</span>
              </div>
              <div className={`${styles.orderRow} ${styles.statusRow}`}>
                <span className={styles.orderLabel}>Status</span>
                <span className={styles.statusBadge}>{order.status}</span>
              </div>
              <div className={`${styles.orderRow} ${styles.statusRow}`}>
                <span className={styles.orderLabel}>Payment</span>
                <span className={styles.paymentBadge}>{order.payment_status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
