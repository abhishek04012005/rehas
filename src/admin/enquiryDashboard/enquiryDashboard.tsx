'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Phone,
  WhatsApp,
  Search,
  Visibility,
  InboxOutlined,
  NewReleases,
  PhoneInTalk,
  CheckCircleOutline,
  SplitscreenOutlined,
} from '@mui/icons-material';
import { supabase } from '@/lib/supabase';
import CompassLoader from '@/components/compassLoader/compassLoader';
import styles from './enquiryDashboard.module.css';
import LineArtBackground from '@/components/lineArtBackground/lineArtBackground';

interface Enquiry {
  id: number;
  name: string;
  phone: string;
  service_type: string;
  status: string;
  submitted_from: string;
  created_at: string;
  updated_at: string;
}

export default function EnquiryDashboard() {
  const router = useRouter();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    completed: 0,
    popup: 0,
    page: 0,
  });

  useEffect(() => {
    // Check if admin is logged in
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      router.push('/admin/login');
      return;
    }

    fetchEnquiries();
  }, [router]);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const enquiriesList = data || [];
      setEnquiries(enquiriesList);
      setFilteredEnquiries(enquiriesList);

      // Calculate stats
      setStats({
        total: enquiriesList.length,
        new: enquiriesList.filter((e) => e.status === 'new').length,
        contacted: enquiriesList.filter((e) => e.status === 'contacted').length,
        completed: enquiriesList.filter((e) => e.status === 'completed').length,
        popup: enquiriesList.filter((e) => e.submitted_from === 'popup').length,
        page: enquiriesList.filter((e) => e.submitted_from === 'page').length,
      });
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Search and Filter
  useEffect(() => {
    let filtered = enquiries;

    if (searchTerm) {
      filtered = filtered.filter(
        (e) =>
          e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          e.phone.includes(searchTerm) ||
          e.service_type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((e) => e.status === statusFilter);
    }

    if (sourceFilter !== 'all') {
      filtered = filtered.filter((e) => e.submitted_from === sourceFilter);
    }

    setFilteredEnquiries(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  }, [searchTerm, statusFilter, sourceFilter, enquiries]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage);
  const paginatedEnquiries = filteredEnquiries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleStatusChange = async (
    enquiryId: number,
    newStatus: string
  ) => {
    try {
      const { error } = await supabase
        .from('enquiries')
        .update({ status: newStatus })
        .eq('id', enquiryId);

      if (error) throw error;

      // Update local state
      setEnquiries(
        enquiries.map((e) =>
          e.id === enquiryId ? { ...e, status: newStatus } : e
        )
      );

      if (selectedEnquiry?.id === enquiryId) {
        setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return styles.statusNew;
      case 'contacted':
        return styles.statusContacted;
      case 'completed':
        return styles.statusCompleted;
      case 'spam':
        return styles.statusSpam;
      default:
        return '';
    }
  };

  const getSourceColor = (source: string) => {
    return source === 'popup' ? styles.sourcePopup : styles.sourcePage;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className={styles.dashboard}>
      <LineArtBackground variant="minimal" opacity={0.1} />

      {/* Main Content */}
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1>Enquiry Management Dashboard</h1>
          <p>Track and manage all service enquiries from customers</p>
        </div>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <InboxOutlined />
            </div>
            <div className={styles.statContent}>
              <h3>Total Enquiries</h3>
              <p className={styles.statNumber}>{stats.total}</p>
            </div>
          </div>

          <div className={`${styles.statCard} ${styles.statusNewCard}`}>
            <div className={styles.statIcon}>
              <NewReleases />
            </div>
            <div className={styles.statContent}>
              <h3>New</h3>
              <p className={styles.statNumber}>{stats.new}</p>
            </div>
          </div>

          <div className={`${styles.statCard} ${styles.statusContactedCard}`}>
            <div className={styles.statIcon}>
              <PhoneInTalk />
            </div>
            <div className={styles.statContent}>
              <h3>Contacted</h3>
              <p className={styles.statNumber}>{stats.contacted}</p>
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
              <SplitscreenOutlined />
            </div>
            <div className={styles.statContent}>
              <h3>Source Split</h3>
              <p className={styles.statNumber}>
                {stats.popup}P / {stats.page}F
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className={styles.controlsSection}>
          {/* Search Box */}
          <div className={styles.searchBox}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by name, phone, or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <select
            className={styles.filterSelect}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="completed">Completed</option>
            <option value="spam">Spam</option>
          </select>

          {/* Source Filter */}
          <select
            className={styles.filterSelect}
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
          >
            <option value="all">All Sources</option>
            <option value="popup">Popup Form</option>
            <option value="page">Full Page</option>
          </select>
        </div>

        {/* Table Section */}
        <div className={styles.tableSection}>
          {loading ? (
            <div className={styles.loadingState}>
              <CompassLoader size="large" text="Fetching enquiries" />
            </div>
          ) : filteredEnquiries.length > 0 ? (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th className={styles.hideOnTablet}>Phone</th>
                    <th className={styles.hideOnMobile}>Service</th>
                    <th>Status</th>
                    <th className={styles.hideOnMobile}>Source</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedEnquiries.map((enquiry) => (
                    <tr key={enquiry.id} className={styles.tableRow}>
                      <td className={styles.nameCell}>{enquiry.name}</td>
                      <td className={`${styles.phoneCell} ${styles.hideOnTablet}`}>
                        <div className={styles.phoneActions}>
                          <span>{enquiry.phone}</span>
                          <div className={styles.phoneButtons}>
                            <a
                              href={`tel:${enquiry.phone}`}
                              className={styles.phoneBtn}
                              title="Call"
                            >
                              <Phone />
                            </a>
                            <a
                              href={`https://wa.me/${enquiry.phone.replace(/\D/g, '')}`}
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
                      <td className={`${styles.serviceCell} ${styles.hideOnMobile}`}>
                        <span className={styles.serviceBadge}>
                          {enquiry.service_type}
                        </span>
                      </td>
                      <td>
                        <span className={`${styles.statusBadge} ${getStatusColor(enquiry.status)}`}>
                          {enquiry.status.charAt(0).toUpperCase() +
                            enquiry.status.slice(1)}
                        </span>
                      </td>
                      <td className={`${styles.sourceCell} ${styles.hideOnMobile}`}>
                        <span
                          className={`${styles.sourceBadge} ${getSourceColor(
                            enquiry.submitted_from
                          )}`}
                        >
                          {enquiry.submitted_from === 'popup' ? 'Popup' : 'Page'}
                        </span>
                      </td>
                      <td className={styles.dateCell}>
                        {formatDate(enquiry.created_at)}
                      </td>
                      <td className={styles.actionsCell}>
                        <button
                          onClick={() => {
                            setSelectedEnquiry(enquiry);
                            setShowModal(true);
                          }}
                          className={styles.viewBtn}
                          title="View Details"
                        >
                          <Visibility />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination Controls */}
              {filteredEnquiries.length > 0 && (
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
                      Page {currentPage} of {totalPages} ({filteredEnquiries.length} total)
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <InboxOutlined className={styles.emptyIcon} />
              <h3>No enquiries found</h3>
              <p>
                {searchTerm || statusFilter !== 'all' || sourceFilter !== 'all'
                  ? 'Try adjusting your filters'
                  : 'No service enquiries yet. When customers submit enquiries, they will appear here.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {showModal && selectedEnquiry && (
        <div className={styles.modalBackdrop} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Enquiry Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className={styles.closeBtn}
              >
                ×
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.infoGroup}>
                <label>Name</label>
                <p>{selectedEnquiry.name}</p>
              </div>

              <div className={styles.infoGroup}>
                <label>Phone</label>
                <p>
                  <a href={`tel:${selectedEnquiry.phone}`}>
                    {selectedEnquiry.phone}
                  </a>
                </p>
              </div>

              <div className={styles.infoGroup}>
                <label>Service Type</label>
                <span className={styles.serviceBadge}>
                  {selectedEnquiry.service_type}
                </span>
              </div>

              <div className={styles.infoGroup}>
                <label>Submission Source</label>
                <span
                  className={`${styles.sourceBadge} ${getSourceColor(
                    selectedEnquiry.submitted_from
                  )}`}
                >
                  {selectedEnquiry.submitted_from === 'popup'
                    ? 'Auto-Popup Form'
                    : 'Full Page Form'}
                </span>
              </div>

              <div className={styles.infoGroup}>
                <label>Status</label>
                <select
                  value={selectedEnquiry.status}
                  onChange={(e) =>
                    handleStatusChange(selectedEnquiry.id, e.target.value)
                  }
                  className={styles.statusSelect}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="completed">Completed</option>
                  <option value="spam">Spam</option>
                </select>
              </div>

              <div className={styles.infoGroup}>
                <label>Submitted On</label>
                <p>{new Date(selectedEnquiry.created_at).toLocaleString('en-IN')}</p>
              </div>

              <div className={styles.infoGroup}>
                <label>Last Updated</label>
                <p>{new Date(selectedEnquiry.updated_at).toLocaleString('en-IN')}</p>
              </div>

              <div className={styles.modalActions}>
                <a
                  href={`tel:${selectedEnquiry.phone}`}
                  className={`${styles.actionBtn} ${styles.callBtn}`}
                >
                  <Phone /> Call Now
                </a>
                <a
                  href={`https://wa.me/${selectedEnquiry.phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.actionBtn} ${styles.whatsappActionBtn}`}
                >
                  <WhatsApp /> Send WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
