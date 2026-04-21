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
  Receipt,
} from '@mui/icons-material';
import { supabase } from '@/lib/supabase';
import { contactData } from '@/data/contact';
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
  address_line_1?: string;
  address_line_2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
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

  const downloadReceiptPDF = async (order: Order) => {
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      
      const receiptElement = document.createElement('div');
      receiptElement.innerHTML = `
        <div style="
          font-family: Arial, sans-serif;
          padding: 20px;
          background: white;
          max-width: 210mm;
          margin: 0 auto;
          line-height: 1.4;
          color: #333;
        ">
          <div style="
            border: 2px solid #560067;
            padding: 30px;
            background: white;
            border-radius: 8px;
            position: relative;
            overflow: hidden;
          ">
            <div style="
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 4px;
              background: linear-gradient(90deg, #560067, #7b1fa2);
            "></div>

            <div style="
              text-align: center;
              border-bottom: 1px solid #e0e0e0;
              padding-bottom: 20px;
              margin-bottom: 20px;
            ">
              <div style="
                font-size: 28px;
                font-weight: 700;
                color: #560067;
                margin-bottom: 8px;
              ">REHAS DELIVERY</div>
              <div style="
                font-size: 14px;
                color: #666;
              ">Order Receipt & Parcel Label</div>
            </div>

            <!-- Address Section -->
            <div style="
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              margin-bottom: 30px;
            ">
              <!-- From Address -->
              <div style="
                border: 2px solid #000;
                padding: 15px;
                border-radius: 4px;
              ">
                <div style="
                  font-weight: 700;
                  font-size: 11px;
                  text-transform: uppercase;
                  margin-bottom: 10px;
                  border-bottom: 1px solid #000;
                  padding-bottom: 6px;
                  letter-spacing: 1px;
                ">From</div>
                <div style="
                  font-size: 12px;
                  line-height: 1.6;
                  color: #333;
                ">
                  <div><strong>REHAS Wellness</strong></div>
                  <div>${contactData.info.cards[2].value}</div>
                  <div>${contactData.info.cards[2].secondaryText}</div>
                </div>
              </div>

              <!-- To Address -->
              <div style="
                border: 2px solid #000;
                padding: 15px;
                border-radius: 4px;
              ">
                <div style="
                  font-weight: 700;
                  font-size: 11px;
                  text-transform: uppercase;
                  margin-bottom: 10px;
                  border-bottom: 1px solid #000;
                  padding-bottom: 6px;
                  letter-spacing: 1px;
                ">To</div>
                <div style="
                  font-size: 12px;
                  line-height: 1.6;
                  color: #333;
                ">
                  <div><strong>${order.full_name}</strong></div>
                  <div>${order.address_line_1 || ''}${order.address_line_2 ? ', ' + order.address_line_2 : ''}</div>
                  <div>${order.city || ''}${order.state ? ', ' + order.state : ''}${order.postal_code ? ' - ' + order.postal_code : ''}</div>
                  <div>${order.country || ''}</div>
                  <div>${order.phone_number}</div>
                </div>
              </div>
            </div>

            <div style="border-bottom: 2px solid #000; margin: 20px 0;"></div>

            <!-- Product Details Section -->
            <div style="margin-bottom: 20px;">
              <div style="
                color: #560067;
                font-size: 13px;
                font-weight: 700;
                letter-spacing: 0.5px;
                border-bottom: 1px solid #e0e0e0;
                padding-bottom: 6px;
                margin: 0 0 12px 0;
                text-transform: uppercase;
              ">Product Details</div>
              <div style="
                display: grid;
                grid-template-columns: 1fr auto;
                gap: 20px;
                padding: 12px;
                background: #f9f9f9;
                border: 1px solid #e0e0e0;
                border-radius: 4px;
              ">
                <div>
                  <div style="
                    font-weight: 600;
                    color: #333;
                    font-size: 14px;
                    margin-bottom: 4px;
                  ">${order.product_title}</div>
                  ${order.service_title ? `<div style="font-size: 12px; color: #666;">Service: ${order.service_title}</div>` : ''}
                </div>
                <div style="text-align: right;">
                  <div style="
                    font-size: 10px;
                    color: #666;
                    margin-bottom: 4px;
                  ">Amount</div>
                  <div style="
                    font-weight: 700;
                    color: #560067;
                    font-size: 16px;
                  ">₹${(order.amount || 0).toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>

            <!-- Status Section -->
            <div style="
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 12px;
              margin-bottom: 30px;
            ">
              <div style="
                padding: 12px;
                background: #f9f9f9;
                border: 1px solid #e0e0e0;
                border-radius: 4px;
                text-align: center;
              ">
                <div style="
                  font-size: 10px;
                  color: #666;
                  font-weight: 500;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                  margin-bottom: 4px;
                ">Order Status</div>
                <div style="
                  font-weight: 700;
                  color: #560067;
                  font-size: 13px;
                  text-transform: uppercase;
                ">${order.status}</div>
              </div>
              <div style="
                padding: 12px;
                background: #f9f9f9;
                border: 1px solid #e0e0e0;
                border-radius: 4px;
                text-align: center;
              ">
                <div style="
                  font-size: 10px;
                  color: #666;
                  font-weight: 500;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                  margin-bottom: 4px;
                ">Payment Status</div>
                <div style="
                  font-weight: 700;
                  color: #560067;
                  font-size: 13px;
                  text-transform: uppercase;
                ">${order.payment_status}</div>
              </div>
            </div>

            <div style="border-bottom: 1px dashed #999; margin: 20px 0;"></div>

            <!-- Barcode Section -->
            <div style="
              text-align: center;
              margin: 40px auto;
              padding: 30px 20px;
              border: 3px solid #000;
              border-radius: 8px;
              background: #fafafa;
              width: 80%;
              max-width: 300px;
            ">
              <div style="
                font-size: 24px;
                font-weight: 700;
                letter-spacing: 3px;
                margin-bottom: 12px;
                font-family: 'Courier New', monospace;
              ">${String(order.id).substring(0, 12)}</div>
              <div style="
                font-size: 12px;
                margin: 12px 0 0 0;
                color: #333;
                font-weight: 700;
              ">https://rehas.in</div>
            </div>

            <div style="
              text-align: center;
              margin-top: 30px;
              padding-top: 15px;
              border-top: 1px solid #e0e0e0;
              font-size: 9px;
              color: #999;
            ">
              Generated on ${new Date().toLocaleDateString('en-IN')} | Keep this receipt for your records
            </div>
          </div>
        </div>
      `;

      const options = {
        margin: 0.5,
        filename: `receipt-${order.id}-${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      };

      html2pdf().set(options).from(receiptElement.innerHTML).save();
    } catch (error) {
      console.error('Error generating PDF receipt:', error);
    }
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
                  style={{ background: '#10b981' }}
                  onClick={() => downloadReceiptPDF(selectedOrder)}
                  title="Download A4 Receipt for Parcel"
                >
                  <Download style={{ marginRight: '8px' }} />
                  Download Receipt (A4)
                </button>
                
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
