'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowBack, Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '@/context/AuthContext';
import styles from './auth.module.css';

export default function AuthPageClient() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params.get('redirect') || '/checkout';
  const resetMode = params.get('reset') === 'true';

  const { user, loading, signInWithEmail, signUpWithEmail, signInWithPhoneOtp, verifyPhoneOtp, sendPasswordReset, changePassword } = useAuth();
  const [tab, setTab] = useState<'signin' | 'signup' | 'reset' | 'changePassword'>(resetMode ? 'reset' : 'signin');
  const [resetType, setResetType] = useState<'forgot' | 'change' | null>(null);
  const [fullName, setFullName] = useState('');
  const [identifier, setIdentifier] = useState(''); // email or phone
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      const destination = redirectTo || '/account/orders';
      router.push(destination);
    }
  }, [user, router, redirectTo]);

  useEffect(() => {
    if (resetMode) {
      setTab('reset');
      setResetType('forgot');
    }
  }, [resetMode]);

  const isEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const isPhone = (value: string) => /^\d{10}$/.test(value.replace(/\D/g, ''));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setSubmitting(true);

    try {
      if (tab === 'signin') {
        if (isEmail(identifier)) {
          if (!password.trim()) {
            throw new Error('Enter your password');
          }
          const result = await signInWithEmail(identifier.trim(), password);
          if (result.error) throw new Error(result.error);
          router.push(redirectTo);
          return;
        } else if (isPhone(identifier)) {
          const formatted = identifier.replace(/\D/g, '').slice(-10);
          if (formatted.length !== 10) {
            throw new Error('Enter a valid 10-digit phone number');
          }
          if (!otpSent) {
            const result = await signInWithPhoneOtp(formatted);
            if (result.error) throw new Error(result.error);
            setOtpSent(true);
            setMessage('OTP sent to your mobile number.');
            return;
          }
          if (!otpCode.trim()) {
            throw new Error('Enter the OTP code');
          }
          const result = await verifyPhoneOtp(formatted, otpCode.trim());
          if (result.error) throw new Error(result.error);
          router.push(redirectTo);
          return;
        } else {
          throw new Error('Enter a valid email or 10-digit phone number');
        }
      }

      if (tab === 'signup') {
        if (!fullName.trim()) {
          throw new Error('Enter your full name');
        }
        if (!identifier.trim() || !isEmail(identifier)) {
          throw new Error('Enter a valid email address');
        }
        if (!password.trim()) {
          throw new Error('Enter a password');
        }
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }
        if (!phone.trim() || !/^[0-9]{10}$/.test(phone)) {
          throw new Error('Enter a valid 10-digit phone number');
        }
        const result = await signUpWithEmail(identifier.trim(), password, fullName.trim(), phone.trim());
        if (result.error) throw new Error(result.error);
        setMessage('Sign up successful. Please sign in to continue.');
        setTab('signin');
        setPassword('');
        setConfirmPassword('');
        return;
      }

      if (tab === 'reset') {
        const result = await sendPasswordReset(identifier.trim());
        if (result.error) throw new Error(result.error);
        setMessage('Password reset link sent to your email.');
        return;
      }

      if (tab === 'changePassword') {
        if (!user) {
          throw new Error('You must be signed in to change your password');
        }
        if (!currentPassword.trim()) {
          throw new Error('Enter your current password');
        }
        if (!newPassword.trim()) {
          throw new Error('Enter your new password');
        }
        if (newPassword.length < 6) {
          throw new Error('New password must be at least 6 characters');
        }
        const result = await changePassword(currentPassword, newPassword);
        if (result.error) throw new Error(result.error);
        setMessage('Password changed successfully.');
        setCurrentPassword('');
        setNewPassword('');
        return;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to authenticate';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div>
            <h1>Welcome to REHAS</h1>
            <p>Login with Gmail or phone to continue your wellness journey.</p>
          </div>
          <Link href="/" className={styles.backLink}>
            <ArrowBack fontSize="small" /> Back to Home
          </Link>
        </div>

        <div className={styles.tabBar}>
          <button type="button" className={tab === 'signin' ? styles.activeTab  : ''} onClick={() => { setTab('signin'); setOtpSent(false); setMessage(''); setError(''); }}>
            Sign In
          </button>
          <button type="button" className={tab === 'signup' ? styles.activeTab : ''} onClick={() => { setTab('signup'); setOtpSent(false); setMessage(''); setError(''); }}>
            Sign Up
          </button>
          <button type="button" className={tab === 'reset' ? styles.activeTab : ''} onClick={() => { setTab('reset'); setOtpSent(false); setMessage(''); setError(''); }}>
            Forget Password
          </button>
        </div>

        {error && <div className={styles.statusError}>{error}</div>}
        {message && <div className={styles.statusSuccess}>{message}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          {tab === 'signup' && (
            <label>
              <span>Full name</span>
              <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter full name" />
            </label>
          )}

          {tab === 'signup' && (
            <label>
              <span>Email address</span>
              <input type="text" value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="your.email@gmail.com" />
            </label>
          )}

          {tab === 'signup' && (
            <label className={styles.passwordField}>
              <span>Password</span>
              <div className={styles.passwordInputWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </button>
              </div>
            </label>
          )}

          {tab === 'signup' && (
            <label className={styles.passwordField}>
              <span>Confirm Password</span>
              <div className={styles.passwordInputWrapper}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowConfirmPassword((current) => !current)}
                  aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </button>
              </div>
            </label>
          )}

          {tab === 'signup' && (
            <label>
              <span>Phone number</span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="9876543210"
              />
            </label>
          )}

          {tab === 'reset' && resetType === null && (
            <div className={styles.resetOptions}>
              <h3>Password Options</h3>
              <button type="button" className={styles.optionButton} onClick={() => {
                if (user) {
                  setTab('changePassword');
                  setResetType('change');
                } else {
                  setTab('signin');
                  setResetType(null);
                  setMessage('Please sign in first to change your password.');
                }
              }}>
                I know my password - Change to new password
              </button>
              <button type="button" className={styles.optionButton} onClick={() => setResetType('forgot')}>
                I forgot my password - Send reset link to Gmail
              </button>
              <button type="button" className={styles.backButton} onClick={() => { setTab('signin'); setResetType(null); }}>
                Back to Sign In
              </button>
            </div>
          )}

          {tab === 'reset' && resetType === 'forgot' && (
            <label>
              <span>Email address</span>
              <input type="text" value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="your.email@gmail.com" />
            </label>
          )}

          {tab === 'changePassword' && (
            <>
              <label>
                <span>Current Password</span>
                <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Enter current password" />
              </label>
              <label>
                <span>New Password</span>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password" />
              </label>
            </>
          )}

          {tab === 'signin' && (
            <>
              <label>
                <span>Email or Phone</span>
                <input type="text" value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="your.email@gmail.com or 9876543210" />
              </label>
              <label>
                <span>Password</span>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
              </label>
              <button type="button" className={styles.forgotPasswordLink} onClick={() => { setResetType('forgot'); setTab('reset'); setMessage(''); setError(''); }}>
                Forgot Password?
              </button>
            </>
          )}

          {tab === 'signin' && isPhone(identifier) && otpSent && (
            <label>
              <span>Enter OTP</span>
              <input value={otpCode} onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="123456" />
            </label>
          )}

          <button type="submit" className={styles.submitBtn} disabled={submitting || loading || (tab === 'reset' && resetType === null)}>
            {tab === 'signin' && isEmail(identifier) && 'Sign In with Email'}
            {tab === 'signin' && isPhone(identifier) && (otpSent ? 'Verify OTP' : 'Send OTP')}
            {tab === 'signin' && !isEmail(identifier) && !isPhone(identifier) && 'Sign In'}
            {tab === 'signup' && 'Create Account'}
            {tab === 'reset' && resetType === 'forgot' && 'Send Reset Link'}
            {tab === 'changePassword' && 'Change Password'}
          </button>
        </form>

        <div className={styles.footerText}>
          <p>Use your Gmail address or phone number to sign in or sign up for secure checkout.</p>
          <Link href="/checkout" className={styles.secondaryLink}>Proceed as guest on checkout</Link>
        </div>
      </div>
    </div>
  );
}
