'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import emailjs from '@emailjs/browser';

export interface AuthUser {
  id: string;
  email: string | null;
  phone: string | null;
  fullName?: string | null;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ error?: string }>;
  signUpWithEmail: (email: string, password: string, fullName?: string, phone?: string) => Promise<{ error?: string }>;
  signInWithPhoneOtp: (phone: string) => Promise<{ error?: string }>;
  verifyPhoneOtp: (phone: string, token: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<{ error?: string }>;
  updateProfile: (fullName: string) => Promise<{ error?: string }>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mapUser = (user: User | null): AuthUser | null => {
  if (!user) return null;
  return {
    id: user.id,
    email: user.email ?? null,
    phone: user.phone ?? null,
    fullName: (user.user_metadata as any)?.full_name || null,
  };
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init({
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'your_public_key_here',
    });

    let mounted = true;

    const loadSession = async () => {
      try {
        // First check for Supabase session (for phone auth)
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (!sessionError && sessionData.session?.user) {
          if (mounted) {
            setUser(mapUser(sessionData.session.user));
            setLoading(false);
            setInitialLoadComplete(true);
          }
          return;
        }

        // If no Supabase session, check localStorage for email auth (only on client side)
        if (typeof window !== 'undefined') {
          const storedUser = localStorage.getItem('auth_user');
          if (storedUser) {
            try {
              const parsedUser = JSON.parse(storedUser);
              if (mounted) {
                setUser(parsedUser);
                setLoading(false);
                setInitialLoadComplete(true);
              }
            } catch (error) {
              console.error('Error parsing stored user:', error);
              localStorage.removeItem('auth_user');
              if (mounted) {
                setLoading(false);
                setInitialLoadComplete(true);
              }
            }
          } else {
            // No stored user either
            if (mounted) {
              setLoading(false);
              setInitialLoadComplete(true);
            }
          }
        } else {
          // Server side, just set loading to false
          if (mounted) {
            setLoading(false);
            setInitialLoadComplete(true);
          }
        }
      } catch (error) {
        console.error('Error loading session:', error);
        if (mounted) {
          setUser(null);
          setLoading(false);
          setInitialLoadComplete(true);
        }
      }
    };

    loadSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (mounted && initialLoadComplete) { // Only handle auth changes after initial load is complete
        if (event === 'SIGNED_OUT') {
          setUser(null);
          if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_user');
          }
        } else if (session?.user && event === 'SIGNED_IN') {
          setUser(mapUser(session.user));
          // Clear localStorage since we're now using Supabase session
          if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_user');
          }
        }
        // For other events or when no session, don't touch the user state
        // This preserves localStorage-based email authentication
      }
    });

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('id, email, full_name, phone_number')
      .eq('email', email)
      .eq('password', password)
      .single();

    if (error) {
      return { error: 'Invalid email or password' };
    }

    if (data) {
      const userData = {
        id: String(data.id),
        email: data.email,
        phone: data.phone_number,
        fullName: data.full_name,
      };
      setUser(userData);
      // Store user data in localStorage for persistence (client side only)
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_user', JSON.stringify(userData));
      }
    }

    return { error: undefined };
  };

  const signUpWithEmail = async (email: string, password: string, fullName?: string, phone?: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert({
          email,
          password,
          full_name: fullName || null,
          phone_number: phone || null,
        })
        .select()
        .single();

      if (error) {
        return { error: error.message };
      }

      if (data) {
        const userData = {
          id: String(data.id),
          email: data.email,
          phone: data.phone_number,
          fullName: data.full_name,
        };
        setUser(userData);
        // Store user data in localStorage for persistence (client side only)
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_user', JSON.stringify(userData));
        }
      }

      return { error: undefined };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Sign up failed';
      return { error: message };
    }
  };

  const signInWithPhoneOtp = async (phone: string) => {
    const normalized = phone.startsWith('+') ? phone.replace(/\D/g, '') : `+91${phone.replace(/\D/g, '')}`;
    const { error } = await supabase.auth.signInWithOtp({ phone: normalized });
    return { error: error?.message };
  };

  const verifyPhoneOtp = async (phone: string, token: string) => {
    const normalized = phone.startsWith('+') ? phone.replace(/\D/g, '') : `+91${phone.replace(/\D/g, '')}`;
    const { data, error } = await supabase.auth.verifyOtp({
      phone: normalized,
      token,
      type: 'sms',
    });

    if (data.user) {
      setUser(mapUser(data.user));
    }

    return { error: error?.message };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    // Clear stored user data (client side only)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_user');
    }
  };

  const sendPasswordReset = async (email: string) => {
    try {
      // First, trigger Supabase reset to get the reset link
      const { error: supabaseError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth?reset=true`,
      });

      if (supabaseError) {
        return { error: supabaseError.message };
      }

      // Send custom email via EmailJS
      const templateParams = {
        to_email: email,
        reset_link: `${window.location.origin}/auth?reset=true`,
        user_email: email,
      };

      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'your_service_id',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'your_template_id',
        templateParams
      );

      if (result.status !== 200) {
        return { error: 'Failed to send reset email' };
      }

      return { error: undefined };
    } catch (error) {
      return { error: 'Failed to send reset email' };
    }
  };

  const updateProfile = async (fullName: string) => {
    // For email users, update the custom users table
    if (user && !user.phone) {
      const { data, error } = await supabase
        .from('users')
        .update({ full_name: fullName })
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        return { error: error.message };
      }

      if (data) {
        const updatedUser = {
          ...user,
          fullName: data.full_name,
        };
        setUser(updatedUser);
        // Update localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_user', JSON.stringify(updatedUser));
        }
      }
    } else {
      // For phone users, use Supabase auth
      const { data, error } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
        },
      });

      if (data.user) {
        setUser(mapUser(data.user));
      }

      return { error: error?.message };
    }

    return { error: undefined };
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    // First verify current password by attempting to sign in
    if (!user?.email) {
      return { error: 'User not authenticated' };
    }

    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });

    if (signInError) {
      return { error: 'Current password is incorrect' };
    }

    // Update password
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    return { error: error?.message };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithEmail,
        signUpWithEmail,
        signInWithPhoneOtp,
        verifyPhoneOtp,
        signOut,
        sendPasswordReset,
        updateProfile,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
