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

export interface UserAddress {
  id: number;
  user_id: string;
  address_type: 'home' | 'work' | 'other';
  full_name: string;
  email?: string;
  phone_number?: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
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
  changePassword: (currentPassword: string, newPassword: string, resetToken?: string, email?: string) => Promise<{ error?: string }>;
  getUserAddresses: () => Promise<{ data?: UserAddress[]; error?: string }>;
  addUserAddress: (address: Omit<UserAddress, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<{ data?: UserAddress; error?: string }>;
  updateUserAddress: (id: number, address: Partial<Omit<UserAddress, 'id' | 'user_id' | 'created_at' | 'updated_at'>>) => Promise<{ error?: string }>;
  deleteUserAddress: (id: number) => Promise<{ error?: string }>;
  setDefaultAddress: (id: number) => Promise<{ error?: string }>;
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
      // Validate email format
      if (!email || !email.includes('@')) {
        return { error: 'Please enter a valid email address' };
      }

      console.log('EmailJS Config Check:');
      console.log('- Public Key available:', !!process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
      console.log('- Service ID:', process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID);
      console.log('- Template ID:', process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID);

      // Check if EmailJS credentials are configured
      if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID) {
        console.error('EmailJS credentials not configured');
        return { error: 'Email service is not properly configured. Please contact support.' };
      }

      // Check if user exists
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id, email')
        .eq('email', email)
        .single();

      if (userError || !userData) {
        console.warn(`Password reset requested for non-existent email: ${email}`);
        // Don't reveal if email exists for security
        return { error: 'If this email exists in our system, you will receive a password reset link shortly.' };
      }

      // Generate reset token
      const resetToken = crypto.randomUUID();
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

      console.log('Storing reset token for email:', email);

      // Store reset token in database
      const { error: updateError } = await supabase
        .from('users')
        .update({
          reset_token: resetToken,
          reset_token_expires: expiresAt.toISOString(),
        })
        .eq('email', email);

      if (updateError) {
        console.error('Error storing reset token:', updateError);
        return { error: 'Failed to generate reset token. Please try again.' };
      }

      console.log('Reset token stored successfully');

      // Generate reset link
      const resetLink = `${typeof window !== 'undefined' ? window.location.origin : 'https://yourapp.com'}/auth?reset=true&token=${resetToken}&email=${encodeURIComponent(email)}`;

      console.log('Generated reset link:', resetLink);

      // Prepare template parameters for EmailJS
      // Note: Variable names must match exactly what's in the EmailJS template
      const templateParams = {
        email: email,
        to_email: email,
        reset_link: resetLink,
        user_name: email.split('@')[0], // Extract username from email
      };

      console.log('Template parameters prepared:', JSON.stringify(templateParams, null, 2));
      console.log('Attempting to send email via EmailJS...');
      console.log('Using Service ID:', process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID);
      console.log('Using Template ID:', process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID);

      // Send email via EmailJS with error handling
      let emailResponse;
      try {
        emailResponse = await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
          templateParams
        );
        console.log('EmailJS response:', emailResponse);
      } catch (emailError: any) {
        console.error('EmailJS error caught!');
        console.error('Full error object:', emailError);
        console.error('Error constructor:', emailError?.constructor?.name);
        console.error('Error toString:', emailError?.toString?.());
        
        // Try to extract error properties
        const errorInfo: any = {
          type: typeof emailError,
          isError: emailError instanceof Error,
          hasMessage: 'message' in emailError,
          hasStatus: 'status' in emailError,
          hasText: 'text' in emailError,
        };
        
        // Get all enumerable properties
        try {
          errorInfo.keys = Object.keys(emailError);
          errorInfo.entries = Object.entries(emailError);
        } catch (e) {
          console.error('Could not extract error properties:', e);
        }
        
        // Try to serialize the error
        try {
          errorInfo.serialized = JSON.stringify(emailError);
        } catch (e) {
          errorInfo.serialized = 'Could not serialize';
        }
        
        // Get individual properties if they exist
        if (emailError?.message) errorInfo.message = emailError.message;
        if (emailError?.status) errorInfo.status = emailError.status;
        if (emailError?.text) errorInfo.text = emailError.text;
        if (emailError?.responseText) errorInfo.responseText = emailError.responseText;
        if (emailError?.statusText) errorInfo.statusText = emailError.statusText;
        
        console.error('EmailJS error details:', errorInfo);
        throw emailError;
      }

      if (emailResponse?.status === 200) {
        console.log('Password reset email sent successfully');
        return { error: undefined };
      } else {
        console.error('EmailJS returned unexpected status:', emailResponse?.status);
        return { error: 'Failed to send reset email. Please try again.' };
      }
    } catch (error: any) {
      console.error('Password reset error caught:', error);
      console.error('Error type:', typeof error);
      console.error('Error keys:', error ? Object.keys(error) : 'null');
      console.error('Error stringified:', JSON.stringify(error));
      
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      
      // Provide friendlier error message
      let errorMsg = 'Failed to send reset email. Please try again later.';
      if (error?.message?.includes('Invalid service ID')) {
        errorMsg = 'Email service is misconfigured. Please contact support.';
      } else if (error?.message?.includes('Invalid template ID')) {
        errorMsg = 'Email template is misconfigured. Please contact support.';
      } else if (error?.message?.includes('Network')) {
        errorMsg = 'Network error. Please check your internet connection.';
      }
      
      return { error: errorMsg };
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

  const changePassword = async (currentPassword: string, newPassword: string, resetToken?: string, email?: string) => {
    try {
      // Handle password reset via token
      if (resetToken && email) {
        // Verify reset token
        const { data: userData, error: tokenError } = await supabase
          .from('users')
          .select('id, email, reset_token_expires')
          .eq('email', email)
          .eq('reset_token', resetToken)
          .single();

        if (tokenError || !userData) {
          return { error: 'Invalid or expired reset token' };
        }

        // Check if token is expired
        const expiresAt = new Date(userData.reset_token_expires);
        if (expiresAt < new Date()) {
          return { error: 'Reset token has expired' };
        }

        // Update password and clear reset token
        const { error: updateError } = await supabase
          .from('users')
          .update({
            password: newPassword,
            reset_token: null,
            reset_token_expires: null,
          })
          .eq('email', email);

        if (updateError) {
          return { error: 'Failed to update password' };
        }

        return { error: undefined };
      }

      // Handle regular password change (authenticated user)
      if (!user?.email) {
        return { error: 'User not authenticated' };
      }

      // Verify current password by checking against stored password
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('password')
        .eq('email', user.email)
        .single();

      if (userError || userData.password !== currentPassword) {
        return { error: 'Current password is incorrect' };
      }

      // Update password
      const { error: updateError } = await supabase
        .from('users')
        .update({ password: newPassword })
        .eq('email', user.email);

      if (updateError) {
        return { error: 'Failed to update password' };
      }

      return { error: undefined };
    } catch (error) {
      console.error('Change password error:', error);
      return { error: 'Failed to change password' };
    }
  };

  const getUserAddresses = async () => {
    if (!user) {
      return { error: 'User not authenticated' };
    }

    // Validate user.id is a proper string UUID
    if (!user.id || typeof user.id !== 'string' || user.id.trim() === '') {
      console.error('Invalid user ID for get addresses:', user.id, 'Type:', typeof user.id);
      return { error: 'Invalid user ID' };
    }

    const { data, error } = await supabase
      .from('user_addresses')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .order('is_default', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching addresses:', error);
      return { error: error.message };
    }

    return { data };
  };

  const addUserAddress = async (address: Omit<UserAddress, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      if (!user) {
        return { error: 'User not authenticated' };
      }

      console.log('Adding address for user:', user.id, 'Type:', typeof user.id);
      console.log('Address data received:', address);

      // Validate user.id is a proper string UUID
      if (!user.id || typeof user.id !== 'string' || user.id.trim() === '') {
        console.error('Invalid user ID:', user.id, 'Type:', typeof user.id);
        return { error: 'Invalid user ID' };
      }

      // If this is set as default, unset other defaults for this user and type
      if (address.is_default) {
        const { error: updateError } = await supabase
          .from('user_addresses')
          .update({ is_default: false })
          .eq('user_id', user.id)
          .eq('address_type', address.address_type);

        if (updateError) {
          console.error('Error updating default addresses:', updateError);
          // Continue with insert even if update fails
        }
      }

      console.log('Inserting address with data:', {
        user_id: user.id,
        address_type: address.address_type,
        full_name: address.full_name,
        email: address.email,
        phone_number: address.phone_number,
        address_line_1: address.address_line_1,
        address_line_2: address.address_line_2,
        city: address.city,
        state: address.state,
        postal_code: address.postal_code,
        country: address.country,
        is_default: address.is_default,
        is_active: address.is_active,
      });

      const { data, error } = await supabase
        .from('user_addresses')
        .insert({
          user_id: user.id,
          address_type: address.address_type,
          full_name: address.full_name,
          email: address.email || null,
          phone_number: address.phone_number || null,
          address_line_1: address.address_line_1,
          address_line_2: address.address_line_2 || null,
          city: address.city,
          state: address.state,
          postal_code: address.postal_code,
          country: address.country,
          is_default: address.is_default || false,
          is_active: address.is_active !== false,
        })
        .select()
        .single();

      console.log('Supabase response - data:', data, 'error:', error);

      if (error) {
        console.error('Error adding address:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        console.error('Error details:', error.details);
        console.error('Error hint:', error.hint);
        console.error('Error details - user_id:', user.id, 'Type:', typeof user.id);
        console.error('Address data being inserted:', {
          user_id: user.id,
          address_type: address.address_type,
          full_name: address.full_name,
          email: address.email,
        });
        return { error: error.message || 'Failed to add address' };
      }

      console.log('Address added successfully:', data);
      return { data };
    } catch (err) {
      console.error('Exception in addUserAddress:', err);
      return { error: 'An unexpected error occurred while adding the address' };
    }
  };

  const updateUserAddress = async (id: number, updates: Partial<Omit<UserAddress, 'id' | 'user_id' | 'created_at' | 'updated_at'>>) => {
    if (!user) {
      return { error: 'User not authenticated' };
    }

    // Validate user.id is a proper string UUID
    if (!user.id || typeof user.id !== 'string' || user.id.trim() === '') {
      console.error('Invalid user ID for update:', user.id, 'Type:', typeof user.id);
      return { error: 'Invalid user ID' };
    }

    // If setting as default, unset other defaults for this user and type
    if (updates.is_default) {
      const { data: currentAddress, error: fetchError } = await supabase
        .from('user_addresses')
        .select('address_type')
        .eq('id', id)
        .single();

      if (fetchError) {
        console.error('Error fetching current address:', fetchError);
        return { error: fetchError.message };
      }

      if (currentAddress) {
        const { error: updateError } = await supabase
          .from('user_addresses')
          .update({ is_default: false })
          .eq('user_id', user.id)
          .eq('address_type', currentAddress.address_type)
          .neq('id', id);

        if (updateError) {
          console.error('Error updating default addresses:', updateError);
          // Continue with update even if unsetting defaults fails
        }
      }
    }

    const { error } = await supabase
      .from('user_addresses')
      .update(updates)
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      return { error: error.message };
    }

    return { error: undefined };
  };

  const deleteUserAddress = async (id: number) => {
    if (!user) {
      return { error: 'User not authenticated' };
    }

    // Validate user.id is a proper string UUID
    if (!user.id || typeof user.id !== 'string' || user.id.trim() === '') {
      console.error('Invalid user ID for delete:', user.id, 'Type:', typeof user.id);
      return { error: 'Invalid user ID' };
    }

    const { error } = await supabase
      .from('user_addresses')
      .update({ is_active: false })
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting address:', error);
      return { error: error.message };
    }

    return { error: undefined };
  };

  const setDefaultAddress = async (id: number) => {
    if (!user) {
      return { error: 'User not authenticated' };
    }

    // Validate user.id is a proper string UUID
    if (!user.id || typeof user.id !== 'string' || user.id.trim() === '') {
      console.error('Invalid user ID for set default:', user.id, 'Type:', typeof user.id);
      return { error: 'Invalid user ID' };
    }

    // Get the address type for this address
    const { data: address } = await supabase
      .from('user_addresses')
      .select('address_type')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (!address) {
      return { error: 'Address not found' };
    }

    // Unset all defaults for this type
    await supabase
      .from('user_addresses')
      .update({ is_default: false })
      .eq('user_id', user.id)
      .eq('address_type', address.address_type);

    // Set this address as default
    const { error } = await supabase
      .from('user_addresses')
      .update({ is_default: true })
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      return { error: error.message };
    }

    return { error: undefined };
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
        getUserAddresses,
        addUserAddress,
        updateUserAddress,
        deleteUserAddress,
        setDefaultAddress,
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
