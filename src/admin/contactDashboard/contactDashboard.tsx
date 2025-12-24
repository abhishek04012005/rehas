'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Phone,
  Mail,
  WhatsApp,
  Search,
  Visibility,
  MailOutline,
  NewReleases,
  PhoneInTalk,
  CheckCircleOutline,
} from '@mui/icons-material';
import { supabase } from '@/lib/supabase';

import styles from './contactDashboard.module.css';
import LineArtBackground from '@/components/lineArtBackground/lineArtBackground';

interface ContactSubmission {
  id: string;
  name: string;
  phone: string;
  message: string;
  status: string;
  created_at: string;
  notes?: string;
}

export default function ContactDashboard() {
  const router = useRouter();
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    resolved: 0,
  });

  useEffect(() => {
    // Check if admin is logged in
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      router.push('/admin/login');
      return;
    }

    fetchContacts();
  }, [router]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const contactsList = data || [];
      setContacts(contactsList);
      setFilteredContacts(contactsList);

      // Calculate stats
      setStats({
        total: contactsList.length,
        new: contactsList.filter((c) => c.status === 'new').length,
        contacted: contactsList.filter((c) => c.status === 'contacted').length,
        resolved: contactsList.filter((c) => c.status === 'resolved').length,
      });
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Search and Filter
  useEffect(() => {
    let filtered = contacts;

    if (searchTerm) {
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.phone.includes(searchTerm) ||
          c.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((c) => c.status === statusFilter);
    }

    setFilteredContacts(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  }, [searchTerm, statusFilter, contacts]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const paginatedContacts = filteredContacts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleStatusChange = async (
    contactId: string,
    newStatus: string
  ) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status: newStatus })
        .eq('id', contactId);

      if (error) throw error;

      // Update local state
      setContacts(
        contacts.map((c) =>
          c.id === contactId ? { ...c, status: newStatus } : c
        )
      );

      if (selectedContact?.id === contactId) {
        setSelectedContact({ ...selectedContact, status: newStatus });
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
      case 'resolved':
        return styles.statusResolved;
      case 'spam':
        return styles.statusSpam;
      default:
        return '';
    }
  };

  return (
    <div className={styles.dashboard}>

        <LineArtBackground variant="minimal" opacity={0.1} />
      {/* Main Content */}
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1>Contact Submissions Dashboard</h1>
          <p>Manage and track all contact form submissions</p>
        </div>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><MailOutline /></div>
            <div className={styles.statContent}>
              <h3>Total Submissions</h3>
              <p className={styles.statNumber}>{stats.total}</p>
            </div>
          </div>

          <div className={`${styles.statCard} ${styles.statusNewCard}`}>
            <div className={styles.statIcon}><NewReleases /></div>
            <div className={styles.statContent}>
              <h3>New</h3>
              <p className={styles.statNumber}>{stats.new}</p>
            </div>
          </div>

          <div className={`${styles.statCard} ${styles.statusContactedCard}`}>
            <div className={styles.statIcon}><PhoneInTalk /></div>
            <div className={styles.statContent}>
              <h3>Contacted</h3>
              <p className={styles.statNumber}>{stats.contacted}</p>
            </div>
          </div>

          <div className={`${styles.statCard} ${styles.statusResolvedCard}`}>
            <div className={styles.statIcon}><CheckCircleOutline /></div>
            <div className={styles.statContent}>
              <h3>Resolved</h3>
              <p className={styles.statNumber}>{stats.resolved}</p>
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
              placeholder="Search by name, phone, or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Buttons */}
          <div className={styles.filterButtons}>
            <button
              className={`${styles.filterBtn} ${
                statusFilter === 'all' ? styles.active : ''
              }`}
              onClick={() => setStatusFilter('all')}
            >
              All
            </button>
            <button
              className={`${styles.filterBtn} ${
                statusFilter === 'new' ? styles.active : ''
              }`}
              onClick={() => setStatusFilter('new')}
            >
              New
            </button>
            <button
              className={`${styles.filterBtn} ${
                statusFilter === 'contacted' ? styles.active : ''
              }`}
              onClick={() => setStatusFilter('contacted')}
            >
              Contacted
            </button>
            <button
              className={`${styles.filterBtn} ${
                statusFilter === 'resolved' ? styles.active : ''
              }`}
              onClick={() => setStatusFilter('resolved')}
            >
              Resolved
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className={styles.tableSection}>
          {loading ? (
            <div className={styles.loadingState}>
              <p>Fetching contacts...</p>
            </div>
          ) : filteredContacts.length > 0 ? (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedContacts.map((contact) => (
                    <tr key={contact.id} className={styles.tableRow}>
                      <td className={styles.nameCell}>{contact.name}</td>
                      <td className={styles.phoneCell}>
                        <div className={styles.phoneActions}>
                          <span>{contact.phone}</span>
                          <div className={styles.phoneButtons}>
                            <a
                              href={`tel:${contact.phone}`}
                              className={styles.phoneBtn}
                              title="Call"
                            >
                              <Phone />
                            </a>
                            <a
                              href={`https://wa.me/${contact.phone.replace(/\D/g, '')}`}
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
                      <td className={styles.messageCell}>
                        <div className={styles.messagePreview}>
                          {contact.message.substring(0, 50)}
                          {contact.message.length > 50 ? '...' : ''}
                        </div>
                      </td>
                      <td className={styles.statusCell}>
                        <select
                          value={contact.status}
                          onChange={(e) =>
                            handleStatusChange(contact.id, e.target.value)
                          }
                          className={`${styles.statusSelect} ${getStatusColor(
                            contact.status
                          )}`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="resolved">Resolved</option>
                          <option value="spam">Spam</option>
                        </select>
                      </td>
                      <td className={styles.dateCell}>
                        {new Date(contact.created_at).toLocaleDateString()}
                      </td>
                      <td className={styles.actionsCell}>
                        <button
                          className={styles.viewBtn}
                          onClick={() => {
                            setSelectedContact(contact);
                            setShowModal(true);
                          }}
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
              {filteredContacts.length > 0 && (
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
                      Page {currentPage} of {totalPages} ({filteredContacts.length} total)
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <Mail className={styles.emptyIcon} />
              <p>No contacts found</p>
              <span>Try adjusting your search or filters</span>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {showModal && selectedContact && (
        <div className={styles.modalBackdrop} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Contact Details</h2>
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
                <p>{selectedContact.name}</p>
              </div>

              <div className={styles.infoGroup}>
                <label>Phone</label>
                <p>
                  <a href={`tel:${selectedContact.phone}`}>
                    {selectedContact.phone}
                  </a>
                </p>
              </div>

              <div className={styles.infoGroup}>
                <label>Message</label>
                <p className={styles.messageContent}>{selectedContact.message}</p>
              </div>

              <div className={styles.infoGroup}>
                <label>Status</label>
                <select
                  value={selectedContact.status}
                  onChange={(e) => {
                    handleStatusChange(selectedContact.id, e.target.value);
                    setSelectedContact({
                      ...selectedContact,
                      status: e.target.value,
                    });
                  }}
                  className={styles.statusSelect}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="resolved">Resolved</option>
                  <option value="spam">Spam</option>
                </select>
              </div>

              <div className={styles.infoGroup}>
                <label>Date Submitted</label>
                <p>{new Date(selectedContact.created_at).toLocaleString('en-IN')}</p>
              </div>

              <div className={styles.modalActions}>
                <a
                  href={`tel:${selectedContact.phone}`}
                  className={`${styles.actionBtn} ${styles.callBtn}`}
                >
                  <Phone /> Call Now
                </a>
                <a
                  href={`https://wa.me/${selectedContact.phone.replace(/\D/g, '')}`}
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
