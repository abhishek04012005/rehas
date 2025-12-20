'use client';

import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import * as bcryptjs from 'bcryptjs';
import CompassLoader from '@/components/compassLoader/compassLoader';
import styles from './login.module.css';

export default function AdminLogin() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Fetch admin user from Supabase
      const { data: user, error: fetchError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('username', credentials.username)
        .single();

      if (fetchError || !user) {
        setError('Invalid username or password');
        setLoading(false);
        return;
      }

      // Verify password with bcrypt
      const passwordMatch = await bcryptjs.compare(
        credentials.password,
        user.password_hash
      );

      if (!passwordMatch) {
        setError('Invalid username or password');
        setLoading(false);
        return;
      }

      // Check if user is active
      if (!user.is_active) {
        setError('Account is inactive. Contact support.');
        setLoading(false);
        return;
      }

      // Store admin session in localStorage
      const sessionToken = btoa(
        JSON.stringify({
          id: user.id,
          username: user.username,
          email: user.email,
          timestamp: new Date().getTime(),
        })
      );

      localStorage.setItem('adminSession', sessionToken);
      localStorage.setItem('adminUsername', user.username);
      localStorage.setItem('adminId', user.id);

      // Redirect to dashboard
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      {/* Cosmic Background */}
      <div className={styles.cosmicBackground}>
        <div className={styles.orbTopLeft}></div>
        <div className={styles.orbBottomRight}></div>
        <div className={styles.starField}>
          {[...Array(12)].map((_, i) => {
            // Use deterministic values based on index instead of random
            const left = ((i * 13.7) % 100);
            const top = ((i * 19.3) % 100);
            const delay = ((i * 0.25) % 3);
            return (
              <div
                key={i}
                className={styles.star}
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>
      </div>

      <div className={styles.loginCard}>
        {/* Header */}
        <div className={styles.header}>
          <h1>
            <span className={styles.gradientText}>Admin</span> Login
          </h1>
          <p>Manage REHAS Contact Submissions</p>
        </div>

        {/* Error Message */}
        {error && <div className={styles.errorMessage}>{error}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Username Field */}
          <div className={styles.formGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
              disabled={loading}
            />
          </div>

          {/* Password Field */}
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                disabled={loading}
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? (
              <CompassLoader size="small" />
            ) : (
              'Login to Dashboard'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className={styles.footer}>
          <p>
            Admin credentials required.{' '}
            <a href="/">Back to Home</a>
          </p>
        </div>
      </div>
    </div>
  );
}
