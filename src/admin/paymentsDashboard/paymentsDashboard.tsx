'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  CreditCard,
  Search,
  Visibility,
  CheckCircle,
  Error,
  HourglassEmpty,
  Info,
  TrendingUp,
  Download,
  Phone,
  WhatsApp,
} from '@mui/icons-material';
import { supabase } from '@/lib/supabase';
import styles from './paymentsDashboard.module.css';
import LineArtBackground from '@/components/lineArtBackground/lineArtBackground';

interface Payment {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  product_title: string;
  amount: number;
  payment_status: 'unpaid' | 'paid' | 'failed';
  status: string;
  order_type: string;
  created_at: string;
  updated_at: string;
  razorpay_payment_id?: string;
  razorpay_order_id?: string;
}

interface PaymentStats {
  totalTransactions: number;
  completedTransactions: number;
  failedTransactions: number;
  pendingTransactions: number;
  totalAmount: number;
  completedAmount: number;
  averageAmount: number;
  successRate: number;
}

export default function PaymentsDashboard() {
  const router = useRouter();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [stats, setStats] = useState<PaymentStats>({
    totalTransactions: 0,
    completedTransactions: 0,
    failedTransactions: 0,
    pendingTransactions: 0,
    totalAmount: 0,
    completedAmount: 0,
    averageAmount: 0,
    successRate: 0,
  });

  useEffect(() => {
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      router.push('/admin/login');
      return;
    }

    fetchPayments();
  }, [router]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const paymentsList = (data || []) as Payment[];
      setPayments(paymentsList);
      setFilteredPayments(paymentsList);

      // Calculate stats
      const completed = paymentsList.filter((p) => p.payment_status === 'paid').length;
      const failed = paymentsList.filter((p) => p.payment_status === 'failed').length;
      const pending = paymentsList.filter((p) => p.payment_status === 'unpaid').length;
      const totalAmount = paymentsList.reduce((sum, p) => sum + (p.amount || 0), 0);
      const completedAmount = paymentsList
        .filter((p) => p.payment_status === 'paid')
        .reduce((sum, p) => sum + (p.amount || 0), 0);

      const stats: PaymentStats = {
        totalTransactions: paymentsList.length,
        completedTransactions: completed,
        failedTransactions: failed,
        pendingTransactions: pending,
        totalAmount: totalAmount,
        completedAmount: completedAmount,
        averageAmount: paymentsList.length > 0 ? totalAmount / paymentsList.length : 0,
        successRate: paymentsList.length > 0 ? (completed / paymentsList.length) * 100 : 0,
      };

      setStats(stats);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Search and Filter
  useEffect(() => {
    let filtered = payments;

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.phone_number.includes(searchTerm) ||
          p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.product_title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((p) => p.payment_status === statusFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter((p) => p.order_type === typeFilter);
    }

    setFilteredPayments(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  }, [searchTerm, statusFilter, typeFilter, payments]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const updatePaymentStatus = async (paymentId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({
          payment_status: newStatus,
          updated_at: new Date().toISOString(),
        })
        .eq('id', paymentId);

      if (error) throw error;

      fetchPayments();
      setShowModal(false);
    } catch (error) {
      console.error('Error updating payment:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return '#10b981';
      case 'unpaid':
        return '#f59e0b';
      case 'failed':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const exportPaymentsCSV = () => {
    const csvContent = [
      ['ID', 'Customer', 'Email', 'Phone', 'Product', 'Amount', 'Status', 'Date'],
      ...filteredPayments.map((p) => [
        p.id,
        p.full_name,
        p.email,
        p.phone_number,
        p.product_title,
        p.amount,
        p.payment_status,
        new Date(p.created_at).toLocaleDateString('en-IN'),
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payments-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  if (loading) {
    return <div className={styles.loadingContainer}>Loading payments...</div>;
  }

  return (
    <div className={styles.dashboard}>
      <LineArtBackground variant="minimal" opacity={0.1} />
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1>Payment Details</h1>
          <p>Track all payment transactions and revenue</p>
        </div>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <CreditCard style={{ color: 'var(--primary)' }} />
            </div>
            <div className={styles.statContent}>
              <h3>Total Transactions</h3>
              <p className={styles.statNumber}>{stats.totalTransactions}</p>
            </div>
          </div>

          <div className={`${styles.statCard} ${styles.statusCompletedCard}`}>
            <div className={styles.statIcon}>
              <CheckCircle />
            </div>
            <div className={styles.statContent}>
              <h3>Completed</h3>
              <p className={styles.statNumber}>{stats.completedTransactions}</p>
            </div>
          </div>

          <div className={`${styles.statCard} ${styles.statusPendingCard}`}>
            <div className={styles.statIcon}>
              <HourglassEmpty />
            </div>
            <div className={styles.statContent}>
              <h3>Pending</h3>
              <p className={styles.statNumber}>{stats.pendingTransactions}</p>
            </div>
          </div>

          <div className={`${styles.statCard} ${styles.statusFailedCard}`}>
            <div className={styles.statIcon}>
              <Error />
            </div>
            <div className={styles.statContent}>
              <h3>Failed</h3>
              <p className={styles.statNumber}>{stats.failedTransactions}</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <CreditCard style={{ color: '#ec4899' }} />
            </div>
            <div className={styles.statContent}>
              <h3>Total Amount</h3>
              <p className={styles.statNumber}>₹{stats.completedAmount.toLocaleString('en-IN')}</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <CreditCard style={{ color: '#3b82f6' }} />
            </div>
            <div className={styles.statContent}>
              <h3>Success Rate</h3>
              <p className={styles.statNumber}>{stats.successRate.toFixed(1)}%</p>
            </div>
          </div>

        </div>

        {/* Controls Section */}
        <div className={styles.controlsSection}>
          <div className={styles.searchBox}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by name, email, phone, or product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className={styles.filterSelect}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
            <option value="failed">Failed</option>
          </select>

          <select
            className={styles.filterSelect}
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="service">Service</option>
            <option value="course">Course</option>
            <option value="product">Product</option>
          </select>

          <button className={styles.exportBtn} onClick={exportPaymentsCSV}>
            <Download />
            Export CSV
          </button>
        </div>

        {/* Table Section */}
        <div className={styles.tableSection}>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Product/Service</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPayments.length > 0 ? (
                  paginatedPayments.map((payment) => (
                    <tr key={payment.id} className={styles.tableRow}>
                      <td className={styles.transactionIdCell}>{String(payment.id).substring(0, 8)}</td>
                      <td className={styles.nameCell}>{payment.full_name}</td>
                      <td className={styles.phoneCell}>
                        <div className={styles.phoneActions}>
                          <span>{payment.phone_number}</span>
                          <div className={styles.phoneButtons}>
                            <a
                              href={`tel:${payment.phone_number}`}
                              className={styles.phoneBtn}
                              title="Call"
                            >
                              <Phone />
                            </a>
                            <a
                              href={`https://wa.me/${payment.phone_number.replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.whatsappBtn}
                              title="WhatsApp"
                            >
                              <WhatsApp />
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className={styles.emailCell}>{payment.email}</td>
                      <td>{payment.product_title}</td>
                      <td className={styles.amountCell}>₹{(payment.amount || 0).toLocaleString('en-IN')}</td>
                      <td>
                        <span
                          className={styles.statusBadge}
                          style={{
                            background: `${getStatusColor(payment.payment_status)}20`,
                            color: getStatusColor(payment.payment_status),
                          }}
                        >
                          {payment.payment_status.charAt(0).toUpperCase() + payment.payment_status.slice(1)}
                        </span>
                      </td>
                      <td className={styles.dateCell}>
                        {new Date(payment.created_at).toLocaleDateString('en-IN')}
                      </td>
                      <td>
                        <button
                          className={styles.viewBtn}
                          onClick={() => {
                            setSelectedPayment(payment);
                            setShowModal(true);
                          }}
                          title="View details"
                        >
                          <Visibility />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className={styles.emptyMessage}>
                      <Info />
                      <p>No payments found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {filteredPayments.length > 0 && (
            <div className={styles.paginationContainer}>
              <div className={styles.paginationLeft}>
                <button
                  className={styles.paginationBtn}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  className={styles.paginationBtn}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>

              <div className={styles.paginationRight}>
                <label htmlFor="itemsPerPage">Items per page:</label>
                <select
                  id="itemsPerPage"
                  className={styles.itemsPerPageSelect}
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={100}>100</option>
                </select>
                <span className={styles.paginationInfo}>
                  Page {currentPage} of {totalPages} ({filteredPayments.length} total)
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedPayment && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Payment Details</h2>
              <button className={styles.closeBtn} onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <label>Order ID</label>
                  <p>{String(selectedPayment.id)}</p>
                </div>
                <div className={styles.detailItem}>
                  <label>Name</label>
                  <p>{selectedPayment.full_name}</p>
                </div>
                <div className={styles.detailItem}>
                  <label>Email</label>
                  <p>{selectedPayment.email}</p>
                </div>
                <div className={styles.detailItem}>
                  <label>Phone</label>
                  <p>{selectedPayment.phone_number}</p>
                </div>
                <div className={styles.detailItem}>
                  <label>Product/Service</label>
                  <p>{selectedPayment.product_title}</p>
                </div>
                <div className={styles.detailItem}>
                  <label>Order Type</label>
                  <p className={styles.typeTag}>{selectedPayment.order_type}</p>
                </div>
                <div className={styles.detailItem}>
                  <label>Amount</label>
                  <p className={styles.amountHighlight}>₹{(selectedPayment.amount || 0).toLocaleString('en-IN')}</p>
                </div>
                <div className={styles.detailItem}>
                  <label>Status</label>
                  <p
                    style={{
                      color: getStatusColor(selectedPayment.payment_status),
                      fontWeight: 600,
                    }}
                  >
                    {selectedPayment.payment_status.charAt(0).toUpperCase() + selectedPayment.payment_status.slice(1)}
                  </p>
                </div>
                <div className={styles.detailItem}>
                  <label>Date</label>
                  <p>{new Date(selectedPayment.created_at).toLocaleString('en-IN')}</p>
                </div>
                {selectedPayment.razorpay_payment_id && (
                  <div className={styles.detailItem}>
                    <label>Payment ID</label>
                    <p className={styles.orderId}>{selectedPayment.razorpay_payment_id}</p>
                  </div>
                )}
              </div>

              {selectedPayment.payment_status === 'unpaid' && (
                <div className={styles.actionButtons}>
                  <button
                    className={styles.actionBtn}
                    style={{ background: '#10b981' }}
                    onClick={() => updatePaymentStatus(selectedPayment.id, 'paid')}
                  >
                    Mark as Paid
                  </button>
                  <button
                    className={styles.actionBtn}
                    style={{ background: '#ef4444' }}
                    onClick={() => updatePaymentStatus(selectedPayment.id, 'failed')}
                  >
                    Mark as Failed
                  </button>
                </div>
              )}

              {selectedPayment.payment_status === 'failed' && (
                <div className={styles.actionButtons}>
                  <button
                    className={styles.actionBtn}
                    style={{ background: '#10b981' }}
                    onClick={() => updatePaymentStatus(selectedPayment.id, 'paid')}
                  >
                    Mark as Paid
                  </button>
                  <button
                    className={styles.actionBtn}
                    style={{ background: '#f59e0b' }}
                    onClick={() => updatePaymentStatus(selectedPayment.id, 'unpaid')}
                  >
                    Mark as Unpaid
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
