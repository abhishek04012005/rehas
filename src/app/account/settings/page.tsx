'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '@/context/AuthContext';
import styles from './settings.module.css';

export default function AccountSettingsPage() {
  const { user, loading, updateProfile, changePassword } = useAuth();
  const [fullName, setFullName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (user?.fullName) {
      setFullName(user.fullName);
    }
  }, [user]);

  const handleProfileSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setSaving(true);

    if (!fullName.trim()) {
      setError('Full name cannot be empty.');
      setSaving(false);
      return;
    }

    const result = await updateProfile(fullName.trim());
    if (result.error) {
      setError(result.error);
    } else {
      setMessage('Profile updated successfully.');
    }

    setSaving(false);
  };

  const handlePasswordChange = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setSaving(true);

    if (!currentPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      setError('Please fill in all password fields.');
      setSaving(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      setSaving(false);
      return;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters.');
      setSaving(false);
      return;
    }

    const result = await changePassword(currentPassword, newPassword);
    if (result.error) {
      setError(result.error);
    } else {
      setMessage('Password changed successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }

    setSaving(false);
  };

  if (loading) {
    return <div className={styles.loading}>Loading account settings...</div>;
  }

  if (!user) {
    return (
      <div className={styles.emptyState}>
        <h1>Please sign in to manage your account</h1>
        <p>Account settings are available once you sign in.</p>
        <Link href="/auth?redirect=/account/settings" className={styles.loginButton}>
          Login / Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.settingsPage}>
      <div className={styles.headerSection}>
        <div>
          <h1>Account Settings</h1>
          <p>Update your profile name and change your password securely.</p>
        </div>
        <Link href="/account/orders" className={styles.linkButton}>
          View Order History
        </Link>
      </div>

      {error && <div className={styles.errorBox}>{error}</div>}
      {message && <div className={styles.successBox}>{message}</div>}

      <div className={styles.grid}>
        <form className={styles.card} onSubmit={handleProfileSave}>
          <h2>Profile Information</h2>
          <label>
            <span>Full name</span>
            <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter full name" />
          </label>
          <label>
            <span>Email</span>
            <input type="email" value={user.email || ''} disabled />
          </label>
          <label>
            <span>Phone</span>
            <input type="text" value={user.phone || ''} disabled />
          </label>
          <button type="submit" className={styles.primaryButton} disabled={saving}>
            Save Profile
          </button>
        </form>

        <form className={styles.card} onSubmit={handlePasswordChange}>
          <h2>Change Password</h2>
          <label>
            <span>Current password</span>
            <div className={styles.passwordInputWrapper}>
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowCurrentPassword((current) => !current)}
                aria-label={showCurrentPassword ? 'Hide password' : 'Show password'}
              >
                {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
              </button>
            </div>
          </label>
          <label>
            <span>New password</span>
            <div className={styles.passwordInputWrapper}>
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowNewPassword((current) => !current)}
                aria-label={showNewPassword ? 'Hide password' : 'Show password'}
              >
                {showNewPassword ? <VisibilityOff /> : <Visibility />}
              </button>
            </div>
          </label>
          <label>
            <span>Confirm new password</span>
            <div className={styles.passwordInputWrapper}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowConfirmPassword((current) => !current)}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </button>
            </div>
          </label>
          <button type="submit" className={styles.primaryButton} disabled={saving}>
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
