'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ShoppingCart,
  Search,
  Visibility,
  NewReleases,
  CheckCircleOutline,
  HourglassEmpty,
  CancelOutlined,
  Paid,
  Info,
  Download,
  Phone,
  WhatsApp,
} from '@mui/icons-material';
import { supabase } from '@/lib/supabase';
import styles from './ordersDashboard.module.css';
import LineArtBackground from '@/components/lineArtBackground';

interface Order {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  product_title: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  payment_status: 'unpaid' | 'paid' | 'failed';
  order_type: string;
  service_title?: string;
  created_at: string;
  updated_at: string;
}

interface OrderStats {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  totalRevenue: number;
  paidRevenue: number;
}

export default function OrdersDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [stats, setStats] = useState<OrderStats>({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    totalRevenue: 0,
    paidRevenue: 0,
  });

  useEffect(() => {
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      router.push('/admin/login');
      return;
    }

    fetchOrders();
  }, [router]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const ordersList = (data || []) as Order[];
      setOrders(ordersList);
      setFilteredOrders(ordersList);

      // Calculate stats
      const stats: OrderStats = {
        total: ordersList.length,
        pending: ordersList.filter((o) => o.status === 'pending').length,
        confirmed: ordersList.filter((o) => o.status === 'confirmed').length,
        completed: ordersList.filter((o) => o.status === 'completed').length,
        totalRevenue: ordersList.reduce((sum, o) => sum + (o.amount || 0), 0),
        paidRevenue: ordersList
          .filter((o) => o.payment_status === 'paid')
          .reduce((sum, o) => sum + (o.amount || 0), 0),
      };

      setStats(stats);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Search and Filter
  useEffect(() => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(
        (o) =>
          o.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          o.phone_number.includes(searchTerm) ||
          o.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          o.product_title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((o) => o.status === statusFilter);
    }

    if (paymentFilter !== 'all') {
      filtered = filtered.filter((o) => o.payment_status === paymentFilter);
    }

    setFilteredOrders(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  }, [searchTerm, statusFilter, paymentFilter, orders]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const updateOrderStatus = async (
    orderId: string,
    newStatus: string,
    newPaymentStatus?: string
  ) => {
    try {
      const updateData: any = { status: newStatus, updated_at: new Date().toISOString() };
      if (newPaymentStatus) {
        updateData.payment_status = newPaymentStatus;
      }

      const { error } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', orderId);

      if (error) throw error;

      fetchOrders();
      setShowModal(false);
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#3b82f6';
      case 'confirmed':
        return '#a855f7';
      case 'completed':
        return '#22c55e';
      case 'cancelled':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'unpaid':
        return '#f59e0b';
      case 'paid':
        return '#10b981';
      case 'failed':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const exportOrdersCSV = () => {
    const csvContent = [
      ['ID', 'Customer', 'Email', 'Phone', 'Product', 'Amount', 'Order Status', 'Payment Status', 'Date'],
      ...filteredOrders.map((o) => [
        o.id,
        o.full_name,
        o.email,
        o.phone_number,
        o.product_title,
        o.amount,
        o.status,
        o.payment_status,
        new Date(o.created_at).toLocaleDateString('en-IN'),
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  if (loading) {
    return <div className={styles.loadingContainer}>Loading orders...</div>;
  }

  return (
    <div className={styles.dashboard}>
      <LineArtBackground variant="minimal" opacity={0.1} />
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1>Orders & Bookings</h1>
          <p>Manage all customer orders and bookings</p>
        </div>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <ShoppingCart style={{ color: 'var(--primary)' }} />
            </div>
            <div className={styles.statContent}>
              <h3>Total Orders</h3>
              <p className={styles.statNumber}>{stats.total}</p>
            </div>
          </div>

          <div className={`${styles.statCard} ${styles.statusPendingCard}`}>
            <div className={styles.statIcon}>
              <HourglassEmpty />
            </div>
            <div className={styles.statContent}>
              <h3>Pending</h3>
              <p className={styles.statNumber}>{stats.pending}</p>
            </div>
          </div>

          <div className={`${styles.statCard} ${styles.statusConfirmedCard}`}>
            <div className={styles.statIcon}>
              <NewReleases />
            </div>
            <div className={styles.statContent}>
              <h3>Confirmed</h3>
              <p className={styles.statNumber}>{stats.confirmed}</p>
            </div>
          </div>

          <div className={`${styles.statCard} ${styles.statusCompletedCard}`}>
            <div className={styles.statIcon}>
              <CheckCircleOutline />
            </div>
            <div className={styles.statContent}>
              <h3>Completed</h3>
              <p className={styles.statNumber}>{stats.completed}</p>
            </div>
          </div>


          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <CheckCircleOutline style={{ color: '#10b981' }} />
            </div>
            <div className={styles.statContent}>
              <h3>Total Amount</h3>
              <p className={styles.statNumber}>₹{stats.paidRevenue.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className={styles.controlsSection}>
          <div className={styles.searchBox}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by name, phone, email, or product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className={styles.filterSelect}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            className={styles.filterSelect}
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
          >
            <option value="all">All Payments</option>
            <option value="unpaid">Unpaid</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
          </select>

          <button className={styles.exportBtn} onClick={exportOrdersCSV}>
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
                  <th>Customer Name</th>
                  <th>Phone</th>
                  <th>Product/Service</th>
                  <th>Amount</th>
                  <th>Order Status</th>
                  <th>Payment Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.length > 0 ? (
                  paginatedOrders.map((order) => (
                    <tr key={order.id} className={styles.tableRow}>
                      <td className={styles.orderIdCell}>{String(order.id).substring(0, 8)}</td>
                      <td className={styles.nameCell}>{order.full_name}</td>
                      <td className={styles.phoneCell}>
                        <div className={styles.phoneActions}>
                          <span>{order.phone_number}</span>
                          <div className={styles.phoneButtons}>
                            <a
                              href={`tel:${order.phone_number}`}
                              className={styles.phoneBtn}
                              title="Call"
                            >
                              <Phone />
                            </a>
                            <a
                              href={`https://wa.me/${order.phone_number.replace(/\D/g, '')}`}
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
                      <td>{order.product_title}</td>
                      <td className={styles.amountCell}>₹{(order.amount || 0).toLocaleString('en-IN')}</td>
                      <td>
                        <span
                          className={styles.statusBadge}
                          style={{ background: `${getStatusColor(order.status)}20`, color: getStatusColor(order.status) }}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <span
                          className={styles.statusBadge}
                          style={{ background: `${getPaymentStatusColor(order.payment_status)}20`, color: getPaymentStatusColor(order.payment_status) }}
                        >
                          {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                        </span>
                      </td>
                      <td className={styles.dateCell}>
                        {new Date(order.created_at).toLocaleDateString('en-IN')}
                      </td>
                      <td>
                        <button
                          className={styles.viewBtn}
                          onClick={() => {
                            setSelectedOrder(order);
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
                      <p>No orders found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {filteredOrders.length > 0 && (
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
                  Page {currentPage} of {totalPages} ({filteredOrders.length} total)
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedOrder && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Order Details</h2>
              <button className={styles.closeBtn} onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <label>Order ID</label>
                  <p>{selectedOrder.id}</p>
                </div>
                <div className={styles.detailItem}>
                  <label>Customer Name</label>
                  <p>{selectedOrder.full_name}</p>
                </div>
                <div className={styles.detailItem}>
                  <label>Email</label>
                  <p>{selectedOrder.email}</p>
                </div>
                <div className={styles.detailItem}>
                  <label>Phone</label>
                  <p>{selectedOrder.phone_number}</p>
                </div>
                <div className={styles.detailItem}>
                  <label>Product/Service</label>
                  <p>{selectedOrder.product_title}</p>
                </div>
                <div className={styles.detailItem}>
                  <label>Amount</label>
                  <p>₹{(selectedOrder.amount || 0).toLocaleString('en-IN')}</p>
                </div>
                <div className={styles.detailItem}>
                  <label>Order Status</label>
                  <p
                    style={{
                      color: getStatusColor(selectedOrder.status),
                      fontWeight: 600,
                    }}
                  >
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </p>
                </div>
                <div className={styles.detailItem}>
                  <label>Payment Status</label>
                  <p
                    style={{
                      color: getPaymentStatusColor(selectedOrder.payment_status),
                      fontWeight: 600,
                    }}
                  >
                    {selectedOrder.payment_status.charAt(0).toUpperCase() + selectedOrder.payment_status.slice(1)}
                  </p>
                </div>
                <div className={styles.detailItem}>
                  <label>Order Type</label>
                  <p>{selectedOrder.order_type}</p>
                </div>
                <div className={styles.detailItem}>
                  <label>Date</label>
                  <p>{new Date(selectedOrder.created_at).toLocaleString('en-IN')}</p>
                </div>
              </div>

              <div className={styles.actionButtons}>
                
                <button
                  className={styles.actionBtn}
                  style={{ background: 'var(--primary)' }}
                  onClick={() => updateOrderStatus(selectedOrder.id, 'completed', 'paid')}
                >
                  Mark as Completed & Paid
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
