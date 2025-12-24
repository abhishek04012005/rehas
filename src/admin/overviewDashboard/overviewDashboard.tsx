'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ShoppingCart,
  CreditCard,
  Mail,
  InboxOutlined,
  TrendingUp,
} from '@mui/icons-material';
import { supabase } from '@/lib/supabase';
import styles from './overviewDashboard.module.css';
import LineArtBackground from '@/components/lineArtBackground/lineArtBackground';

interface OverviewStats {
  orders: {
    total: number;
    pending: number;
    completed: number;
    totalRevenue: number;
  };
  payments: {
    total: number;
    completed: number;
    confirmedAmount: number;
    successRate: number;
  };
  contacts: {
    total: number;
    new: number;
    resolved: number;
  };
  enquiries: {
    total: number;
    new: number;
    completed: number;
  };
}

interface ChartData {
  name: string;
  value: number;
  fill?: string;
}

export default function OverviewDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<OverviewStats>({
    orders: { total: 0, pending: 0, completed: 0, totalRevenue: 0 },
    payments: { total: 0, completed: 0, confirmedAmount: 0, successRate: 0 },
    contacts: { total: 0, new: 0, resolved: 0 },
    enquiries: { total: 0, new: 0, completed: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      router.push('/admin/login');
      return;
    }

    fetchAllStats();
  }, [router]);

  const fetchAllStats = async () => {
    try {
      setLoading(true);

      // Fetch Orders
      const { data: ordersData } = await supabase.from('orders').select('*');
      const orders = ordersData || [];

      // Fetch Payments
      const { data: paymentsData } = await supabase.from('payments').select('*');
      const payments = paymentsData || [];

      // Fetch Contacts
      const { data: contactsData } = await supabase.from('contact_submissions').select('*');
      const contacts = contactsData || [];

      // Fetch Enquiries
      const { data: enquiriesData } = await supabase.from('enquiries').select('*');
      const enquiries = enquiriesData || [];

      // Calculate statistics
      const orderStats = {
        total: orders.length,
        pending: orders.filter((o: any) => o.status === 'pending').length,
        completed: orders.filter((o: any) => o.status === 'completed').length,
        totalRevenue: orders.reduce((sum: number, o: any) => sum + (o.amount || 0), 0),
      };

      const completedPayments = payments.filter((p: any) => p.payment_status === 'paid');
      const confirmedAmount = completedPayments.reduce((sum: number, p: any) => sum + (p.amount || 0), 0);
      
      const paymentStats = {
        total: payments.length,
        completed: completedPayments.length,
        confirmedAmount: confirmedAmount,
        successRate: payments.length > 0 ? (completedPayments.length / payments.length) * 100 : 0,
      };

      const contactStats = {
        total: contacts.length,
        new: contacts.filter((c: any) => c.status === 'new').length,
        resolved: contacts.filter((c: any) => c.status === 'resolved').length,
      };

      const enquiryStats = {
        total: enquiries.length,
        new: enquiries.filter((e: any) => e.status === 'new').length,
        completed: enquiries.filter((e: any) => e.status === 'completed').length,
      };

      setStats({
        orders: orderStats,
        payments: paymentStats,
        contacts: contactStats,
        enquiries: enquiryStats,
      });

      // Prepare chart data
      const chartDataPoints: ChartData[] = [
        { name: 'Orders', value: orders.length, fill: '#3b82f6' },
        { name: 'Payments', value: payments.length, fill: '#a855f7' },
        { name: 'Contacts', value: contacts.length, fill: '#ec4899' },
        { name: 'Enquiries', value: enquiries.length, fill: '#06b6d4' },
      ];
      setChartData(chartDataPoints);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Simple bar chart component
  const BarChart = ({ data }: { data: ChartData[] }) => {
    const maxValue = Math.max(...data.map(d => d.value), 1);
    
    return (
      <div className={styles.barChart}>
        <div className={styles.chartBars}>
          {data.map((item) => (
            <div key={item.name} className={styles.barItem}>
              <div className={styles.barContainer}>
                <div
                  className={styles.bar}
                  style={{
                    height: `${(item.value / maxValue) * 200}px`,
                    backgroundColor: item.fill,
                  }}
                />
              </div>
              <span className={styles.barLabel}>{item.name}</span>
              <span className={styles.barValue}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Status breakdown chart
  const StatusChart = () => {
    const statusData = [
      { name: 'Pending Orders', value: stats.orders.pending, color: '#f59e0b' },
      { name: 'Completed Orders', value: stats.orders.completed, color: '#22c55e' },
      { name: 'New Contacts', value: stats.contacts.new, color: '#f59e0b' },
      { name: 'Resolved Contacts', value: stats.contacts.resolved, color: '#22c55e' },
    ];

    return (
      <div className={styles.statusGrid}>
        {statusData.map((item) => (
          <div key={item.name} className={styles.statusItem}>
            <div className={styles.statusLabel}>{item.name}</div>
            <div
              className={styles.statusValue}
              style={{ color: item.color }}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <main className={styles.dashboard}>
      <LineArtBackground variant="minimal" opacity={0.1} />
      <div className={styles.container}>
        {/* Header */}
        <section className={styles.header}>
          <h1>Admin Dashboard</h1>
          <p>Real-time analytics and performance metrics</p>
        </section>

        {loading ? (
          <div className={styles.loadingState}>
            <p>Loading dashboard data...</p>
          </div>
        ) : (
          <>
            {/* Key Metrics */}
            <section className={styles.keyMetricsSection}>
              <div className={styles.metric}>
                <div className={styles.metricIcon} style={{ color: '#22c55e' }}>
                  <TrendingUp />
                </div>
                <div className={styles.metricContent}>
                  <span className={styles.metricLabel}>Confirmed Revenue</span>
                  <span className={styles.metricValue}>₹{stats.payments.confirmedAmount.toLocaleString('en-IN')}</span>
                  <span className={styles.metricSubtext}>{stats.payments.completed} confirmed payments</span>
                </div>
              </div>
              <div className={styles.metric}>
                <div className={styles.metricIcon} style={{ color: '#3b82f6' }}>
                  <ShoppingCart />
                </div>
                <div className={styles.metricContent}>
                  <span className={styles.metricLabel}>Total Orders</span>
                  <span className={styles.metricValue}>{stats.orders.total}</span>
                  <span className={styles.metricSubtext}>{stats.orders.completed} completed</span>
                </div>
              </div>
              <div className={styles.metric}>
                <div className={styles.metricIcon} style={{ color: '#a855f7' }}>
                  <CreditCard />
                </div>
                <div className={styles.metricContent}>
                  <span className={styles.metricLabel}>Success Rate</span>
                  <span className={styles.metricValue}>{stats.payments.successRate.toFixed(1)}%</span>
                  <span className={styles.metricSubtext}>Payment completion rate</span>
                </div>
              </div>
            </section>

            {/* Charts Section */}
            <section className={styles.chartsSection}>
              <div className={styles.chartCard}>
                <h2>Overview by Module</h2>
                <p className={styles.chartSubtitle}>Total submissions across all modules</p>
                <BarChart data={chartData} />
              </div>

              <div className={styles.chartCard}>
                <h2>Status Breakdown</h2>
                <p className={styles.chartSubtitle}>Pending vs completed items</p>
                <StatusChart />
              </div>
            </section>

            {/* Details Grid */}
            <section className={styles.statsGrid}>
              {/* Orders Card */}
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <ShoppingCart className={styles.cardIcon} style={{ color: '#3b82f6' }} />
                  <h3>Orders Management</h3>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.statRow}>
                    <span>Total Orders</span>
                    <span className={styles.statValue}>{stats.orders.total}</span>
                  </div>
                  <div className={styles.statRow}>
                    <span>Pending</span>
                    <span style={{ color: '#f59e0b' }}>{stats.orders.pending}</span>
                  </div>
                  <div className={styles.statRow}>
                    <span>Completed</span>
                    <span style={{ color: '#22c55e' }}>{stats.orders.completed}</span>
                  </div>
                  <div className={styles.divider} />
                  <div className={styles.statRow}>
                    <span>Total Revenue</span>
                    <span className={styles.statValue} style={{ fontSize: '1.1rem' }}>
                      ₹{stats.orders.totalRevenue.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
                <a href="/admin/orders" className={styles.viewLink}>
                  View Details →
                </a>
              </div>

              {/* Payments Card */}
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <CreditCard className={styles.cardIcon} style={{ color: '#a855f7' }} />
                  <h3>Payment Transactions</h3>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.statRow}>
                    <span>Total Transactions</span>
                    <span className={styles.statValue}>{stats.payments.total}</span>
                  </div>
                  <div className={styles.statRow}>
                    <span>Confirmed</span>
                    <span style={{ color: '#22c55e' }}>{stats.payments.completed}</span>
                  </div>
                  <div className={styles.statRow}>
                    <span>Success Rate</span>
                    <span style={{ color: '#10b981' }}>{stats.payments.successRate.toFixed(1)}%</span>
                  </div>
                  <div className={styles.divider} />
                  <div className={styles.statRow}>
                    <span>Confirmed Amount</span>
                    <span className={styles.statValue} style={{ fontSize: '1.1rem', color: '#10b981' }}>
                      ₹{stats.payments.confirmedAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
                <a href="/admin/payments" className={styles.viewLink}>
                  View Details →
                </a>
              </div>

              {/* Contacts Card */}
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <Mail className={styles.cardIcon} style={{ color: '#ec4899' }} />
                  <h3>Contact Forms</h3>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.statRow}>
                    <span>Total Submissions</span>
                    <span className={styles.statValue}>{stats.contacts.total}</span>
                  </div>
                  <div className={styles.statRow}>
                    <span>New</span>
                    <span style={{ color: '#f59e0b' }}>{stats.contacts.new}</span>
                  </div>
                  <div className={styles.statRow}>
                    <span>Resolved</span>
                    <span style={{ color: '#22c55e' }}>{stats.contacts.resolved}</span>
                  </div>
                  <div className={styles.divider} />
                  <div className={styles.statRow}>
                    <span>Pending</span>
                    <span style={{ color: '#ef4444' }}>
                      {stats.contacts.total - stats.contacts.resolved}
                    </span>
                  </div>
                </div>
                <a href="/admin/contacts" className={styles.viewLink}>
                  View Details →
                </a>
              </div>

              {/* Enquiries Card */}
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <InboxOutlined className={styles.cardIcon} style={{ color: '#06b6d4' }} />
                  <h3>Service Enquiries</h3>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.statRow}>
                    <span>Total Enquiries</span>
                    <span className={styles.statValue}>{stats.enquiries.total}</span>
                  </div>
                  <div className={styles.statRow}>
                    <span>New</span>
                    <span style={{ color: '#f59e0b' }}>{stats.enquiries.new}</span>
                  </div>
                  <div className={styles.statRow}>
                    <span>Completed</span>
                    <span style={{ color: '#22c55e' }}>{stats.enquiries.completed}</span>
                  </div>
                  <div className={styles.divider} />
                  <div className={styles.statRow}>
                    <span>Pending</span>
                    <span style={{ color: '#ef4444' }}>
                      {stats.enquiries.total - stats.enquiries.completed}
                    </span>
                  </div>
                </div>
                <a href="/admin/enquiries" className={styles.viewLink}>
                  View Details →
                </a>
              </div>
            </section>

            {/* Quick Navigation */}
            <section className={styles.quickActions}>
              <h2>Quick Navigation</h2>
              <div className={styles.actionLinks}>
                <a href="/admin/orders" className={styles.actionCard}>
                  <ShoppingCart />
                  <span>Orders</span>
                </a>
                <a href="/admin/payments" className={styles.actionCard}>
                  <CreditCard />
                  <span>Payments</span>
                </a>
                <a href="/admin/contacts" className={styles.actionCard}>
                  <Mail />
                  <span>Contacts</span>
                </a>
                <a href="/admin/enquiries" className={styles.actionCard}>
                  <InboxOutlined />
                  <span>Enquiries</span>
                </a>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
