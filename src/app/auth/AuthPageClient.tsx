'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowBack, Visibility, VisibilityOff, CheckCircle } from '@mui/icons-material';
import { useAuth } from '@/context/AuthContext';
import NavbarWrapper from '@/components/navbarWrapper';
import styles from './auth.module.css';

export default function AuthPageClient() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params.get('redirect') || '/merchandise';
  const resetMode = params.get('reset') === 'true';
  const resetToken = params.get('token');
  const resetEmail = params.get('email');

  const { user, loading, signInWithEmail, signUpWithEmail, signInWithPhoneOtp, verifyPhoneOtp, sendPasswordReset, changePassword } = useAuth();
  const [tab, setTab] = useState<'signin' | 'signup' | 'reset' | 'changePassword'>(resetMode ? (resetToken ? 'changePassword' : 'reset') : 'signin');
  const [resetType, setResetType] = useState<'forgot' | 'change' | null>(resetToken ? 'change' : null);
  const [fullName, setFullName] = useState('');
  const [identifier, setIdentifier] = useState(''); // email or phone for signin
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // OTP Signup state
  const [signupOtpStep, setSignupOtpStep] = useState<'email' | 'verify' | 'details'>('email');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupOtpCode, setSignupOtpCode] = useState('');
  const [signupOtpVerified, setSignupOtpVerified] = useState(false);

  useEffect(() => {
    if (user) {
      const destination = redirectTo || '/account/orders';
      router.push(destination);
    }
  }, [user, router, redirectTo]);

  useEffect(() => {
    if (resetMode) {
      if (resetToken && resetEmail) {
        setTab('changePassword');
        setResetType('change');
        setIdentifier(resetEmail); // Pre-fill email for password reset
      } else {
        setTab('reset');
        setResetType('forgot');
      }
    }
  }, [resetMode, resetToken, resetEmail]);

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
        // Step 1: Send OTP to email
        if (signupOtpStep === 'email') {
          if (!signupEmail.trim() || !isEmail(signupEmail)) {
            throw new Error('Enter a valid email address');
          }
          // Call send-otp API
          const sendOtpResponse = await fetch('/api/auth/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: signupEmail.trim() }),
          });
          if (!sendOtpResponse.ok) {
            const data = await sendOtpResponse.json();
            throw new Error(data.error || 'Failed to send OTP');
          }
          setSignupOtpStep('verify');
          setMessage('OTP sent to your email. Check your inbox.');
          return;
        }

        // Step 2: Verify OTP
        if (signupOtpStep === 'verify') {
          if (!signupOtpCode.trim() || signupOtpCode.length !== 6) {
            throw new Error('Enter a valid 6-digit OTP');
          }
          // Call verify-otp API
          const verifyOtpResponse = await fetch('/api/auth/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: signupEmail.trim(), otp: signupOtpCode.trim() }),
          });
          if (!verifyOtpResponse.ok) {
            const data = await verifyOtpResponse.json();
            throw new Error(data.error || 'Invalid OTP');
          }
          setSignupOtpVerified(true);
          setSignupOtpStep('details');
          setMessage('OTP verified! Now enter your account details.');
          return;
        }

        // Step 3: Create account
        if (signupOtpStep === 'details') {
          if (!signupOtpVerified) {
            throw new Error('Please verify your OTP first');
          }
          if (!fullName.trim()) {
            throw new Error('Enter your full name');
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

          // Call signup-otp API
          const signupResponse = await fetch('/api/auth/signup-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: signupEmail.trim(),
              password: password,
              fullName: fullName.trim(),
            }),
          });
          if (!signupResponse.ok) {
            const data = await signupResponse.json();
            throw new Error(data.error || 'Failed to create account');
          }

          // Reset signup form
          setMessage('Account created successfully! Signing you in...');
          setFullName('');
          setPassword('');
          setConfirmPassword('');
          setSignupEmail('');
          setSignupOtpCode('');
          setSignupOtpStep('email');
          setSignupOtpVerified(false);

          // Auto sign in with email
          const signInResult = await signInWithEmail(signupEmail.trim(), password);
          if (signInResult.error) throw new Error(signInResult.error);
          router.push(redirectTo);
          return;
        }
      }

      if (tab === 'reset') {
        const result = await sendPasswordReset(identifier.trim());
        if (result.error) throw new Error(result.error);
        setMessage('Password reset link sent to your email.');
        return;
      }

      if (tab === 'changePassword') {
        if (resetToken && resetEmail) {
          // Handle password reset via token
          if (!newPassword.trim()) {
            throw new Error('Enter your new password');
          }
          if (newPassword.length < 6) {
            throw new Error('New password must be at least 6 characters');
          }
          if (newPassword !== confirmPassword) {
            throw new Error('Passwords do not match');
          }
          const result = await changePassword('', newPassword, resetToken, resetEmail);
          if (result.error) throw new Error(result.error);
          setMessage('Password reset successfully! You can now sign in with your new password.');
          setTab('signin');
          setNewPassword('');
          setConfirmPassword('');
          return;
        } else {
          // Handle regular password change for authenticated user
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
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to authenticate';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <NavbarWrapper />
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
          <button type="button" className={tab === 'signup' ? styles.activeTab : ''} onClick={() => { 
            setTab('signup'); 
            setOtpSent(false); 
            setMessage(''); 
            setError('');
            setSignupOtpStep('email');
            setSignupOtpVerified(false);
            setSignupOtpCode('');
            setSignupEmail('');
            setFullName('');
            setPassword('');
            setConfirmPassword('');
          }}>
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
            <div className={styles.stepIndicator}>
              <div className={signupOtpStep === 'email' ? styles.stepActive : signupOtpStep === 'verify' || signupOtpStep === 'details' ? styles.stepCompleted : styles.stepInactive}>
                {signupOtpStep === 'verify' || signupOtpStep === 'details' ? <CheckCircle /> : 1}
              </div>
              <div className={styles.stepLine}></div>
              <div className={signupOtpStep === 'verify' ? styles.stepActive : signupOtpStep === 'details' ? styles.stepCompleted : styles.stepInactive}>
                {signupOtpStep === 'details' ? <CheckCircle /> : 2}
              </div>
              <div className={styles.stepLine}></div>
              <div className={signupOtpStep === 'details' ? styles.stepActive : styles.stepInactive}>
                3
              </div>
            </div>
          )}

          {/* SIGNUP: Email Input */}
          {tab === 'signup' && signupOtpStep === 'email' && (
            <>
              <label>
                <span>Email address</span>
                <input
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="your.email@gmail.com"
                />
              </label>
            </>
          )}

          {/* SIGNUP: OTP Verification */}
          {tab === 'signup' && signupOtpStep === 'verify' && (
            <>
              <div className={styles.otpInfo}>
                <p>We sent a verification code to:</p>
                <p className={styles.emailDisplay}>{signupEmail}</p>
              </div>
              <label>
                <span>Enter 6-digit OTP</span>
                <input
                  type="text"
                  value={signupOtpCode}
                  onChange={(e) => setSignupOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="123456"
                  maxLength={6}
                />
              </label>
              <button
                type="button"
                className={styles.changeEmailBtn}
                onClick={() => {
                  setSignupOtpStep('email');
                  setSignupOtpCode('');
                }}
              >
                Use a different email
              </button>
            </>
          )}

          {/* SIGNUP: Account Details */}
          {tab === 'signup' && signupOtpStep === 'details' && (
            <>
              <div className={styles.verifiedInfo}>
                <CheckCircle className={styles.checkIcon} />
                <p>Email verified successfully!</p>
              </div>
              <label>
                <span>Full name</span>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                />
              </label>
              <label>
                <span>Password</span>
                <div className={styles.passwordInputWrapper}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
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
              <label>
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
            </>
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

          {tab === 'changePassword' && resetToken && (
            <>
              <div className={styles.resetInfo}>
                <p>Reset your password for: <strong>{resetEmail}</strong></p>
              </div>
              <label>
                <span>New Password</span>
                <div className={styles.passwordInputWrapper}>
                  <input type={showNewPassword ? 'text' : 'password'} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password" />
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
                <span>Confirm New Password</span>
                <div className={styles.passwordInputWrapper}>
                  <input type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" />
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
              <button type="button" className={styles.backButton} onClick={() => { setTab('signin'); setResetType(null); setMessage(''); setError(''); }}>
                Back to Sign In
              </button>
            </>
          )}

          {tab === 'changePassword' && !resetToken && (
            <>
              <label>
                <span>Current Password</span>
                <div className={styles.passwordInputWrapper}>
                  <input type={showCurrentPassword ? 'text' : 'password'} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Enter current password" />
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
                <span>New Password</span>
                <div className={styles.passwordInputWrapper}>
                  <input type={showNewPassword ? 'text' : 'password'} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password" />
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
            </>
          )}

          {tab === 'signin' && (
            <>
              <label>
                <span>Email</span>
                <input type="email" value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="your.email@gmail.com" />
              </label>
              <label>
                <span>Password</span>
                <div className={styles.passwordInputWrapper}>
                  <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
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

          {!(tab === 'reset' && resetType === null) && (
            <button type="submit" className={styles.submitBtn} disabled={submitting || loading}>
              {tab === 'signin' && isEmail(identifier) && 'Sign In with Email'}
              {tab === 'signin' && isPhone(identifier) && (otpSent ? 'Verify OTP' : 'Send OTP')}
              {tab === 'signin' && !isEmail(identifier) && !isPhone(identifier) && 'Sign In'}
              {tab === 'signup' && signupOtpStep === 'email' && 'Send OTP'}
              {tab === 'signup' && signupOtpStep === 'verify' && 'Verify OTP'}
              {tab === 'signup' && signupOtpStep === 'details' && 'Create Account'}
              {tab === 'reset' && resetType === 'forgot' && 'Send Reset Link'}
              {tab === 'changePassword' && resetToken && 'Reset Password'}
              {tab === 'changePassword' && !resetToken && 'Change Password'}
            </button>
          )}
        </form>

        <div className={styles.footerText}>
          <p>Use your Gmail address or phone number to sign in or sign up for secure checkout.</p>
          <Link href="/checkout" className={styles.secondaryLink}>Proceed as guest on checkout</Link>
        </div>
      </div>
      </div>
    </>
  );
}
