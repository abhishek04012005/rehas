'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Settings, Save } from '@mui/icons-material';
import { supabase } from '@/lib/supabase';
import styles from './settingsDashboard.module.css';
import LineArtBackground from '@/components/lineArtBackground';

interface SettingsData {
  popup_enabled: boolean;
}

export default function SettingsDashboard() {
  const router = useRouter();
  const [settings, setSettings] = useState<SettingsData>({
    popup_enabled: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      router.push('/admin/login');
      return;
    }

    fetchSettings();
  }, [router]);

  const fetchSettings = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No settings record found - create default settings
          const { data: newData, error: insertError } = await supabase
            .from('settings')
            .insert({ popup_enabled: true })
            .select()
            .single();

          if (insertError) {
            if (insertError.code === '42P01' || insertError.message?.includes('relation') || insertError.message?.includes('does not exist')) {
              // Table doesn't exist - show error message
              setError('Settings table does not exist. Please run the database setup SQL from SUPABASE_SETUP.md');
              return;
            }
            setError('Error loading settings. Please check your database connection.');
            return;
          }

          if (newData) {
            setSettings(newData);
          }
        } else if (error.code === '42P01' || error.message?.includes('relation') || error.message?.includes('does not exist')) {
          setError('Settings table does not exist. Please run the database setup SQL from SUPABASE_SETUP.md');
          return;
        } else {
          // Other database errors: fallback to default settings
          console.warn('Fetched settings failed, falling back to defaults:', error);
          setSettings({ popup_enabled: true });
          setError(null);
          return;
        }
        return;
      }

      if (data) {
        setSettings(data);
      }
    } catch {
      console.warn('Network error while fetching settings, falling back to defaults.');
      setSettings({ popup_enabled: true });
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    try {
      setSaving(true);
      const { data: existingData, error: selectError } = await supabase
        .from('settings')
        .select('id')
        .single();

      if (selectError && selectError.code !== 'PGRST116') {
        if (selectError.code === '42P01' || selectError.message?.includes('relation') || selectError.message?.includes('does not exist')) {
          setStatusType('error');
          setStatusMessage('Settings table does not exist. Please run the database setup SQL from SUPABASE_SETUP.md');
          setSaving(false);
          return;
        }
        console.error('Error checking existing settings:', selectError);
        setStatusType('error');
        setStatusMessage('Error saving settings. Please check your database connection.');
        setSaving(false);
        return;
      }

      let error;
      if (existingData) {
        // Update existing record
        const { error: updateError } = await supabase
          .from('settings')
          .update(settings)
          .eq('id', existingData.id);
        error = updateError;
      } else {
        // Insert new record
        const { error: insertError } = await supabase
          .from('settings')
          .insert(settings);
        error = insertError;
      }

      if (error) {
        if (error.code === '42P01' || error.message?.includes('relation') || error.message?.includes('does not exist')) {
          setStatusType('error');
          setStatusMessage('Settings table does not exist. Please run the database setup SQL from SUPABASE_SETUP.md');
          setSaving(false);
          return;
        }
        console.error('Error saving settings:', error);
        setStatusType('error');
        setStatusMessage('Error saving settings. Please check your database connection.');
        setSaving(false);
        return;
      }

      setStatusType('success');
      setStatusMessage('Settings saved successfully!');
      setError(null); // Clear any previous errors
    } catch {
      console.error('Network error saving settings');
      setStatusType('error');
      setStatusMessage('Network error saving settings. Please check your internet connection.');
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = (key: keyof SettingsData) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading settings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <div className={styles.errorIcon}>⚠️</div>
        <h2>Error Loading Settings</h2>
        <p>{error}</p>
        <button className={styles.retryBtn} onClick={fetchSettings}>
          Try Again
        </button>
      </div>
    );
  }

  const StatusPopup = () => {
    if (!statusMessage || !statusType) return null;

    return (
      <div className={`${styles.statusPopup} ${statusType === 'error' ? styles.statusError : styles.statusSuccess}`}>
        {statusMessage}
        <button className={styles.statusCloseBtn} onClick={() => { setStatusMessage(null); setStatusType(null); }}>
          ✕
        </button>
      </div>
    );
  };

  return (
    <>
      <LineArtBackground />
      <StatusPopup />
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.icon}>
            <Settings />
          </div>
          <h1>Settings</h1>
          <p>Manage website settings and configurations</p>
        </div>

        <div className={styles.settingsCard}>
          <h2>Popup Settings</h2>
          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <label htmlFor="popup_enabled" className={styles.settingLabel}>
                Enable Enquiry Popup
              </label>
              <p className={styles.settingDescription}>
                Show an enquiry popup on the homepage after a few seconds
              </p>
            </div>
            <div className={styles.toggle}>
              <input
                type="checkbox"
                id="popup_enabled"
                checked={settings.popup_enabled}
                onChange={() => handleToggle('popup_enabled')}
                className={styles.checkbox}
              />
              <label htmlFor="popup_enabled" className={styles.switch}></label>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.saveBtn}
            onClick={saveSettings}
            disabled={saving}
          >
            <Save />
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
    </>
  );
}