'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Settings, Save } from '@mui/icons-material';
import { supabase } from '@/lib/supabase';
import styles from './settingsDashboard.module.css';
import LineArtBackground from '@/components/lineArtBackground';

interface Program {
  id: string;
  title: string;
  schedule: string;
  time: string;
  description: string;
}

interface SettingsData {
  popup_enabled: boolean;
  show_enquiry_popup: boolean;
  show_free_programs_popup: boolean;
  free_programs_title: string;
  free_programs_subtitle: string;
  free_programs_cta_text: string;
  programs_config?: Program[];
}

export default function SettingsDashboard() {
  const router = useRouter();
  const [settings, setSettings] = useState<SettingsData>({
    popup_enabled: true,
    show_enquiry_popup: true,
    show_free_programs_popup: true,
    free_programs_title: 'FREE Programs',
    free_programs_subtitle: 'Limited Time Offers - Join Now!',
    free_programs_cta_text: 'Ready to start your wellness journey?',
    programs_config: [],
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
          setSettings({
            popup_enabled: true,
            show_enquiry_popup: true,
            show_free_programs_popup: true,
            free_programs_title: 'FREE Programs',
            free_programs_subtitle: 'Limited Time Offers - Join Now!',
            free_programs_cta_text: 'Ready to start your wellness journey?',
            programs_config: [],
          });
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
      setSettings({
        popup_enabled: true,
        show_enquiry_popup: true,
        show_free_programs_popup: true,
        free_programs_title: 'FREE Programs',
        free_programs_subtitle: 'Limited Time Offers - Join Now!',
        free_programs_cta_text: 'Ready to start your wellness journey?',
        programs_config: [],
      });
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
          
          {/* Master Toggle */}
          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <label htmlFor="popup_enabled" className={styles.settingLabel}>
                Enable Popups
              </label>
              <p className={styles.settingDescription}>
                Master toggle - turn off to disable all popups on homepage
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

          {/* Enquiry Popup Toggle */}
          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <label htmlFor="show_enquiry_popup" className={styles.settingLabel}>
                Show Enquiry Popup
              </label>
              <p className={styles.settingDescription}>
                Display the enquiry form popup on the homepage
              </p>
            </div>
            <div className={styles.toggle}>
              <input
                type="checkbox"
                id="show_enquiry_popup"
                checked={settings.show_enquiry_popup}
                onChange={() => handleToggle('show_enquiry_popup')}
                className={styles.checkbox}
              />
              <label htmlFor="show_enquiry_popup" className={styles.switch}></label>
            </div>
          </div>

          {/* Free Programs Popup Toggle */}
          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <label htmlFor="show_free_programs_popup" className={styles.settingLabel}>
                Show Free Programs Popup
              </label>
              <p className={styles.settingDescription}>
                Display the free programs promotional popup on the homepage (YOGA, HEALING, Stress Management)
              </p>
            </div>
            <div className={styles.toggle}>
              <input
                type="checkbox"
                id="show_free_programs_popup"
                checked={settings.show_free_programs_popup}
                onChange={() => handleToggle('show_free_programs_popup')}
                className={styles.checkbox}
              />
              <label htmlFor="show_free_programs_popup" className={styles.switch}></label>
            </div>
          </div>

          {/* Free Programs Title */}
          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <label htmlFor="free_programs_title" className={styles.settingLabel}>
                Free Programs Title
              </label>
              <p className={styles.settingDescription}>
                Customize the title shown in the free programs popup
              </p>
            </div>
            <input
              type="text"
              id="free_programs_title"
              value={settings.free_programs_title}
              onChange={(e) => setSettings(prev => ({ ...prev, free_programs_title: e.target.value }))}
              className={styles.input}
              placeholder="FREE Programs"
            />
          </div>

          {/* Free Programs Subtitle */}
          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <label htmlFor="free_programs_subtitle" className={styles.settingLabel}>
                Subtitle
              </label>
              <p className={styles.settingDescription}>
                Customize the subtitle/tagline for the popup
              </p>
            </div>
            <input
              type="text"
              id="free_programs_subtitle"
              value={settings.free_programs_subtitle}
              onChange={(e) => setSettings(prev => ({ ...prev, free_programs_subtitle: e.target.value }))}
              className={styles.input}
              placeholder="Limited Time Offers - Join Now!"
            />
          </div>

          {/* Free Programs CTA Text */}
          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <label htmlFor="free_programs_cta_text" className={styles.settingLabel}>
                CTA Text
              </label>
              <p className={styles.settingDescription}>
                Customize the call-to-action text before the enquiry button
              </p>
            </div>
            <input
              type="text"
              id="free_programs_cta_text"
              value={settings.free_programs_cta_text}
              onChange={(e) => setSettings(prev => ({ ...prev, free_programs_cta_text: e.target.value }))}
              className={styles.input}
              placeholder="Ready to start your wellness journey?"
            />
          </div>
        </div>

        {/* Program Customization Section */}
        {settings.programs_config && settings.programs_config.length > 0 && (
          <div className={styles.settingsCard}>
            <h2>Customize Programs</h2>
            {settings.programs_config.map((program, idx) => (
              <div key={program.id} className={styles.programBlock}>
                <h3>{program.title}</h3>
                
                <div className={styles.settingItem}>
                  <label className={styles.settingLabel}>Program Title</label>
                  <input
                    type="text"
                    value={program.title}
                    onChange={(e) => {
                      const updated = [...settings.programs_config!];
                      updated[idx].title = e.target.value;
                      setSettings(prev => ({ ...prev, programs_config: updated }));
                    }}
                    className={styles.input}
                  />
                </div>

                <div className={styles.settingItem}>
                  <label className={styles.settingLabel}>Schedule</label>
                  <input
                    type="text"
                    value={program.schedule}
                    onChange={(e) => {
                      const updated = [...settings.programs_config!];
                      updated[idx].schedule = e.target.value;
                      setSettings(prev => ({ ...prev, programs_config: updated }));
                    }}
                    className={styles.input}
                    placeholder="e.g., Monday to Friday"
                  />
                </div>

                <div className={styles.settingItem}>
                  <label className={styles.settingLabel}>Time</label>
                  <input
                    type="text"
                    value={program.time}
                    onChange={(e) => {
                      const updated = [...settings.programs_config!];
                      updated[idx].time = e.target.value;
                      setSettings(prev => ({ ...prev, programs_config: updated }));
                    }}
                    className={styles.input}
                    placeholder="e.g., 5:00 AM - 6:00 AM"
                  />
                </div>

                <div className={styles.settingItem}>
                  <label className={styles.settingLabel}>Description</label>
                  <textarea
                    value={program.description}
                    onChange={(e) => {
                      const updated = [...settings.programs_config!];
                      updated[idx].description = e.target.value;
                      setSettings(prev => ({ ...prev, programs_config: updated }));
                    }}
                    className={`${styles.input} ${styles.textarea}`}
                    rows={3}
                    placeholder="Describe this program..."
                  />
                </div>
              </div>
            ))}
          </div>
        )}

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