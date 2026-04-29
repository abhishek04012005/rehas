'use client';

import { useState, useEffect } from 'react';
import styles from './analytics.module.css';

import {
  Download,
  TrendingUp,
  Smartphone,
  Monitor,
  BarChartOutlined,
  SearchOutlined,
} from '@mui/icons-material';
import { supabase } from '@/lib/supabase';

interface AnalyticsData {
  totalClicks: number;
  mobileClicks: number;
  desktopClicks: number;
  mobilePercentage: number;
  desktopPercentage: number;
  topPages: Array<{ page: string; count: number }>;
  topBrowsers: Array<{ browser: string; count: number }>;
  hourlyDistribution: Array<{ hour: number; count: number }>;
}

interface ClickRecord {
  id: number;
  clicked_at: string;
  page_url: string;
  device_type: string;
  browser_info: string;
  referrer: string;
  ip_address: string;
}

interface ClicksData {
  data: ClickRecord[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function WhatsAppAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [clicks, setClicks] = useState<ClicksData | null>(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  // Filters
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month' | 'all'>('week');
  const [deviceFilter, setDeviceFilter] = useState<'all' | 'mobile' | 'desktop'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  // Fetch analytics data
  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      // Calculate date range
      const now = new Date();
      let startDate: Date;

      switch (timeRange) {
        case 'today':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        case 'week':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        default:
          startDate = new Date(0); // All time
      }

      // Build query
      let query = supabase
        .from('whatsapp_clicks')
        .select('*')
        .gte('clicked_at', startDate.toISOString());

      if (deviceFilter !== 'all') {
        query = query.eq('device_type', deviceFilter);
      }

      const { data: clicks, error } = await query;

      if (error) {
        console.error('Error fetching analytics:', error);
        return;
      }

      // Calculate analytics
      const totalClicks = clicks?.length || 0;
      const mobileClicks = clicks?.filter((click: any) => click.device_type === 'mobile').length || 0;
      const desktopClicks = clicks?.filter((click: any) => click.device_type === 'desktop').length || 0;

      // Calculate percentages
      const mobilePercentage = totalClicks > 0 ? (mobileClicks / totalClicks) * 100 : 0;
      const desktopPercentage = totalClicks > 0 ? (desktopClicks / totalClicks) * 100 : 0;

      // Top pages
      const pageCounts: { [key: string]: number } = {};
      clicks?.forEach((click: any) => {
        const page = click.page_url || 'Unknown';
        pageCounts[page] = (pageCounts[page] || 0) + 1;
      });

      const topPages = Object.entries(pageCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([page, count]) => ({ page, count }));

      // Top browsers
      const browserCounts: { [key: string]: number } = {};
      clicks?.forEach((click: any) => {
        try {
          const browserInfo = JSON.parse(click.browser_info || '{}');
          const browser = browserInfo.platform || 'Unknown';
          browserCounts[browser] = (browserCounts[browser] || 0) + 1;
        } catch {
          browserCounts['Unknown'] = (browserCounts['Unknown'] || 0) + 1;
        }
      });

      const topBrowsers = Object.entries(browserCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([browser, count]) => ({ browser, count }));

      setAnalytics({
        totalClicks,
        mobileClicks,
        desktopClicks,
        mobilePercentage,
        desktopPercentage,
        topPages,
        topBrowsers,
        hourlyDistribution: [] // Not implementing hourly distribution for now
      });

    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch click records
  const fetchClicks = async () => {
    try {
      // Calculate date range
      const now = new Date();
      let startDate: Date;

      switch (timeRange) {
        case 'today':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        case 'week':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        default:
          startDate = new Date(0); // All time
      }

      // Build query
      let query = supabase
        .from('whatsapp_clicks')
        .select('*')
        .gte('clicked_at', startDate.toISOString())
        .order('clicked_at', { ascending: false });

      if (deviceFilter !== 'all') {
        query = query.eq('device_type', deviceFilter);
      }

      if (searchQuery) {
        query = query.or(`page_url.ilike.%${searchQuery}%,browser_info.ilike.%${searchQuery}%,referrer.ilike.%${searchQuery}%`);
      }

      // Get total count first
      let countQuery = supabase
        .from('whatsapp_clicks')
        .select('*', { count: 'exact', head: true })
        .gte('clicked_at', startDate.toISOString());

      if (deviceFilter !== 'all') {
        countQuery = countQuery.eq('device_type', deviceFilter);
      }

      if (searchQuery) {
        countQuery = countQuery.or(`page_url.ilike.%${searchQuery}%,browser_info.ilike.%${searchQuery}%,referrer.ilike.%${searchQuery}%`);
      }

      const { count: totalCount } = await countQuery;

      // Apply pagination
      const from = currentPage * 20;
      const to = from + 19;

      const { data: records, error } = await query.range(from, to);

      if (error) {
        console.error('Error fetching click records:', error);
        return;
      }

      const totalPages = Math.ceil((totalCount || 0) / 20);

      setClicks({
        data: records || [],
        total: totalCount || 0,
        page: currentPage,
        limit: 20,
        totalPages
      });

    } catch (error) {
      console.error('Error fetching click records:', error);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchAnalytics();
  }, [timeRange, deviceFilter]);

  // Fetch clicks when filters or search changes
  useEffect(() => {
    setCurrentPage(0);
    fetchClicks();
  }, [timeRange, deviceFilter, searchQuery]);

  // Fetch clicks when page changes
  useEffect(() => {
    fetchClicks();
  }, [currentPage]);

  // Export data
  const handleExport = async () => {
    try {
      setExporting(true);

      // Calculate date range
      const now = new Date();
      let startDate: Date;

      switch (timeRange) {
        case 'today':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        case 'week':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        default:
          startDate = new Date(0); // All time
      }

      // Build query
      let query = supabase
        .from('whatsapp_clicks')
        .select('*')
        .gte('clicked_at', startDate.toISOString())
        .order('clicked_at', { ascending: false });

      if (deviceFilter !== 'all') {
        query = query.eq('device_type', deviceFilter);
      }

      const { data: records, error } = await query;

      if (error) {
        console.error('Error exporting data:', error);
        return;
      }

      // Convert to CSV
      if (!records || records.length === 0) {
        alert('No data to export');
        return;
      }

      const headers = ['ID', 'Clicked At', 'Page URL', 'Device Type', 'Browser Info', 'Referrer', 'IP Address', 'User Agent'];
      const csvContent = [
        headers.join(','),
        ...records.map((record: any) => [
          record.id,
          `"${record.clicked_at}"`,
          `"${record.page_url || ''}"`,
          record.device_type,
          `"${record.browser_info || ''}"`,
          `"${record.referrer || ''}"`,
          `"${record.ip_address || ''}"`,
          `"${record.user_agent || ''}"`
        ].join(','))
      ].join('\n');

      // Download CSV
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `whatsapp-analytics-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Error exporting data:', error);
    } finally {
      setExporting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatPageUrl = (url: string) => {
    return url.length > 40 ? url.substring(0, 40) + '...' : url;
  };

  return (
    <div className={styles.analyticsContainer}>
      <div className={styles.content}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>WhatsApp Analytics</h1>
          <p className={styles.subtitle}>Monitor and analyze all WhatsApp button clicks from your website</p>
        </div>

        {/* Export Button (Positioned Absolutely) */}
        <button
          className={styles.exportBtn}
          onClick={handleExport}
          disabled={exporting}
        >
          <Download style={{ fontSize: '1.2rem' }} />
          {exporting ? 'Exporting...' : 'Export CSV'}
        </button>

        {/* Filters */}
        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Time Period</label>
            <select
              className={styles.filterSelect}
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
            >
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="all">All Time</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Device Type</label>
            <select
              className={styles.filterSelect}
              value={deviceFilter}
              onChange={(e) => setDeviceFilter(e.target.value as any)}
            >
              <option value="all">All Devices</option>
              <option value="mobile">Mobile Only</option>
              <option value="desktop">Desktop Only</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Search</label>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Page, browser, referrer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Statistics */}
        {loading ? (
          <div className={styles.loadingIndicator}>Loading analytics...</div>
        ) : analytics ? (
          <>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <TrendingUp />
                </div>
                <div className={styles.statContent}>
                  <h3 className={styles.statLabel}>Total Clicks</h3>
                  <p className={styles.statValue}>{(analytics.totalClicks || 0).toLocaleString()}</p>
                  <p className={styles.statSubtext}>All-time WhatsApp interactions</p>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <Smartphone />
                </div>
                <div className={styles.statContent}>
                  <h3 className={styles.statLabel}>Mobile Clicks</h3>
                  <p className={styles.statValue}>{(analytics.mobileClicks || 0).toLocaleString()}</p>
                  <p className={styles.statSubtext}>
                    {(analytics.mobilePercentage || 0).toFixed(1)}% of total
                  </p>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <Monitor />
                </div>
                <div className={styles.statContent}>
                  <h3 className={styles.statLabel}>Desktop Clicks</h3>
                  <p className={styles.statValue}>{(analytics.desktopClicks || 0).toLocaleString()}</p>
                  <p className={styles.statSubtext}>
                    {(analytics.desktopPercentage || 0).toFixed(1)}% of total
                  </p>
                </div>
              </div>
            </div>

            {/* Charts Grid */}
            <div className={styles.chartsGrid}>
              {/* Top Pages */}
              <div className={styles.chartCard}>
                <div className={styles.chartTitle}>Top Pages</div>
                {(analytics.topPages && analytics.topPages.length > 0) ? (
                  <div>
                    {analytics.topPages.map((page, idx) => (
                      <div
                        key={idx}
                        style={{
                          marginBottom: '1rem',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            flex: 1,
                            marginRight: '1rem',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontSize: '0.9rem',
                          }}
                          title={page.page}
                        >
                          {formatPageUrl(page.page)}
                        </div>
                        <div
                          style={{
                            background: 'var(--primary)',
                            color: 'white',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '20px',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {page.count}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.noDataMessage}>No data available</div>
                )}
              </div>

              {/* Top Browsers */}
              <div className={styles.chartCard}>
                <div className={styles.chartTitle}>Top Browsers</div>
                {(analytics.topBrowsers && analytics.topBrowsers.length > 0) ? (
                  <div>
                    {analytics.topBrowsers.map((browser, idx) => (
                      <div
                        key={idx}
                        style={{
                          marginBottom: '1rem',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <div style={{ fontSize: '0.9rem' }}>{browser.browser}</div>
                        <div
                          style={{
                            background: 'var(--secondary)',
                            color: 'white',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '20px',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                          }}
                        >
                          {browser.count}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.noDataMessage}>No data available</div>
                )}
              </div>
            </div>
          </>
        ) : null}

        {/* Detailed Records Table */}
        <div className={styles.listingsCard}>
          <div className={styles.listingsHeader}>
            <div className={styles.listingsTitle}>
              <BarChartOutlined style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              Click Records
            </div>
          </div>

          {clicks && clicks.data.length > 0 ? (
            <>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead className={styles.tableHeader}>
                    <tr>
                      <th>Date & Time</th>
                      <th>Page</th>
                      <th>Device</th>
                      <th>Browser</th>
                      <th>Referrer</th>
                      <th>IP Address</th>
                    </tr>
                  </thead>
                  <tbody className={styles.tableBody}>
                    {clicks.data.map((click) => (
                      <tr key={click.id}>
                        <td>{formatDate(click.clicked_at)}</td>
                        <td title={click.page_url}>{formatPageUrl(click.page_url || '-')}</td>
                        <td>
                          <span
                            className={`${styles.deviceBadge} ${
                              click.device_type === 'mobile' ? styles.mobile : styles.desktop
                            }`}
                          >
                            {click.device_type || 'unknown'}
                          </span>
                        </td>
                        <td>{(() => {
                          try {
                            const browserInfo = JSON.parse(click.browser_info || '{}');
                            return browserInfo.platform || 'Unknown';
                          } catch {
                            return 'Unknown';
                          }
                        })()}</td>
                        <td title={click.referrer || 'Direct'}>
                          {click.referrer && click.referrer !== 'direct'
                            ? formatPageUrl(click.referrer)
                            : 'Direct'}
                        </td>
                        <td>{click.ip_address || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className={styles.pagination}>
                <button
                  className={styles.paginationBtn}
                  disabled={currentPage === 0}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </button>
                <span className={styles.paginationInfo}>
                  Page {currentPage + 1} of {clicks?.totalPages || 1}
                </span>
                <button
                  className={styles.paginationBtn}
                  disabled={!clicks || currentPage >= clicks.totalPages - 1}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateIcon}>📊</div>
              <div className={styles.emptyStateText}>No click records found</div>
              <div style={{ fontSize: '0.9rem', color: '#ccc', marginTop: '0.5rem' }}>
                Try adjusting your filters or check back later
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
