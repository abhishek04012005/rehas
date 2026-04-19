import { supabase } from '@/lib/supabase';

// Store generated OTPs in memory for testing (in development)
const generatedOTPs: Map<string, { otp: string; timestamp: number }> = new Map();

export const otpService = {
  // Generate and send OTP
  async sendOtp(email: string) {
    try {
      // Validate email
      if (!email || !email.includes('@')) {
        return { error: 'Invalid email address' };
      }

      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      console.log('📝 Generated OTP for', email, ':', otp);

      // Calculate expiration time in UTC
      const now = new Date();
      const expirationMs = 10 * 60 * 1000; // 10 minutes
      const expiresAtTime = new Date(now.getTime() + expirationMs);
      
      // Store the timestamp as ISO string - PostgreSQL will handle timezone conversion
      const expiresAtIso = expiresAtTime.toISOString();
      
      console.log('🕐 OTP Expiration:', {
        generated_at: now.toISOString(),
        expires_at: expiresAtIso,
        email: email,
        expiration_minutes: 10,
      });

      // First, try to delete existing OTP (might not exist, that's ok)
      const { error: deleteError } = await supabase
        .from('otp_verifications')
        .delete()
        .eq('email', email);

      if (deleteError) {
        // Log but don't fail - might be first OTP for this email
        console.warn('Note when deleting old OTP:', deleteError.message);
      }

      // Now insert the new OTP
      const { data, error: insertError } = await supabase
        .from('otp_verifications')
        .insert({
          email,
          otp_code: otp,
          attempts: 0,
          verified: false,
          expires_at: expiresAtIso,
        })
        .select()
        .single();

      if (insertError) {
        console.error('❌ Error storing OTP in database:', {
          message: insertError.message,
          code: insertError.code,
          details: insertError.details,
          hint: insertError.hint,
          email: email,
        });
        
        // Provide more specific error messages
        if (insertError.code === '23505') { // Unique constraint violation
          return { error: 'Please wait before requesting another OTP' };
        }
        
        return { error: 'Failed to generate OTP. Please try again.' };
      }

      console.log('✅ OTP stored successfully in database');

      // For development/testing: store OTP in memory and log it
      generatedOTPs.set(email, { otp, timestamp: Date.now() });
      
      // Send OTP email via EmailJS
      try {
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_OTP_PUBLIC_KEY;
        const privateKey = process.env.EMAILJS_OTP_PRIVATE_KEY;
        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_OTP_SERVICE_ID;
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_OTP_TEMPLATE_ID;

        // Use private key if available (for strict mode), otherwise fall back to public key
        const authKey = privateKey || publicKey;

        if (!authKey || !serviceId || !templateId) {
          console.warn('⚠️ EmailJS OTP credentials not fully configured');
          console.warn('   Auth Key available:', authKey ? '✅' : '❌');
          console.warn('   Service ID:', serviceId ? '✅' : '❌');
          console.warn('   Template ID:', templateId ? '✅' : '❌');
          console.log(`📧 Fallback: OTP for testing is: ${otp}`);
          return { 
            success: true, 
            testOtp: otp,
            message: 'OTP generated. Check server logs for the code (EmailJS not configured).' 
          };
        }

        const emailjsPayload = {
          service_id: serviceId,
          template_id: templateId,
          user_id: authKey,
          template_params: {
            to_email: email,
            otp_code: otp,
            user_email: email,
          },
        };

        console.log('📧 Sending OTP email via EmailJS...');
        console.log('   Service ID:', serviceId);
        console.log('   Template ID:', templateId);
        console.log('   Auth Key Type:', privateKey ? 'Private' : 'Public');
        console.log('   Auth Key (first 10 chars):', authKey.substring(0, 10) + '...');
        console.log('   To Email:', email);
        console.log('   Full Payload:', JSON.stringify(emailjsPayload, null, 2));
        
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(emailjsPayload),
        });

        const responseText = await response.text();
        let responseData: any = null;
        
        try {
          responseData = responseText ? JSON.parse(responseText) : null;
        } catch (e) {
          responseData = responseText;
        }
        
        console.log('EmailJS Response:', {
          status: response.status,
          statusText: response.statusText,
          body: responseData || responseText,
        });
        
        if (!response.ok) {
          console.error('❌ EmailJS API error:', {
            status: response.status,
            statusText: response.statusText,
            response: responseData || responseText,
          });
          
          // Parse error message from EmailJS
          let errorMessage = 'Failed to send OTP email';
          if (responseData?.message) {
            errorMessage = responseData.message;
          } else if (responseText) {
            errorMessage = responseText;
          }
          
          console.error('📋 Troubleshooting:');
          console.error('   - Verify Service ID matches your EmailJS account');
          console.error('   - Verify Template ID matches your EmailJS account');
          console.error('   - Verify Auth Key (Public/Private) is correct');
          console.error('   - Visit: https://dashboard.emailjs.com/admin/account');
          
          return { error: errorMessage };
        }

        console.log('✅ OTP email sent successfully to:', email);
        console.log(`📧 User should receive OTP at: ${email}`);
        
        return { 
          success: true,
          message: 'OTP sent to your email. Please check your inbox.' 
        };
      } catch (emailError) {
        console.error('❌ Error sending OTP email:', emailError);
        if (emailError instanceof Error) {
          console.error('Error details:', emailError.message);
          console.error('Stack:', emailError.stack);
        }
        
        // Fallback: Return test OTP for development
        if (process.env.NODE_ENV !== 'production') {
          console.log('⚠️ EmailJS failed. Returning test OTP:', otp);
          return {
            success: true,
            testOtp: otp,
            message: 'OTP generated (EmailJS unavailable in dev mode). Check server logs for code.'
          };
        }
        
        return { error: 'Failed to send OTP email. Please try again.' };
      }
    } catch (error) {
      console.error('❌ Unexpected error in sendOtp:', error);
      if (error instanceof Error) {
        console.error('Error details:', error.message, error.stack);
      }
      return { error: 'An unexpected error occurred. Please try again.' };
    }
  },

  // Verify OTP
  async verifyOtp(email: string, otp: string) {
    try {
      // Validate inputs
      if (!email || !otp) {
        return { error: 'Email and OTP are required' };
      }

      if (otp.length !== 6 || !/^\d+$/.test(otp)) {
        return { error: 'OTP must be 6 digits' };
      }

      console.log(`🔍 Verifying OTP for ${email}`);

      // Get OTP record
      const { data: otpRecord, error: fetchError } = await supabase
        .from('otp_verifications')
        .select('*')
        .eq('email', email)
        .single();

      if (fetchError) {
        console.error('❌ Error fetching OTP record:', {
          code: fetchError.code,
          message: fetchError.message,
          email: email,
        });
        return { error: 'OTP not found. Please request a new one.' };
      }

      if (!otpRecord) {
        console.warn('⚠️ No OTP record found for:', email);
        return { error: 'OTP not found. Please request a new one.' };
      }

      console.log('📋 OTP Record fetched:', {
        email: otpRecord.email,
        has_code: !!otpRecord.otp_code,
        attempts: otpRecord.attempts,
        verified: otpRecord.verified,
        created_at: otpRecord.created_at,
        expires_at: otpRecord.expires_at,
        now: new Date().toISOString(),
      });

      // Check if expired
      const expiresAtFromDB = otpRecord.expires_at;
      const expiresAtUtc = expiresAtFromDB.includes('Z') ? expiresAtFromDB : `${expiresAtFromDB}Z`;
      const expiresAt = new Date(expiresAtUtc);
      const now = new Date();
      const isExpired = expiresAt < now;
      const remainingMs = expiresAt.getTime() - now.getTime();

      console.log('⏰ Expiration check:', {
        expiresAt: expiresAt.toISOString(),
        now: now.toISOString(),
        isExpired: isExpired,
        remainingSeconds: Math.max(0, Math.floor(remainingMs / 1000)),
      });

      if (isExpired) {
        console.warn('⚠️ OTP expired for:', email);
        return { error: 'OTP has expired. Please request a new one.' };
      }

      // Check attempts
      if (otpRecord.attempts >= 3) {
        console.warn('⚠️ Too many attempts for:', email);
        return { error: 'Too many failed attempts. Please request a new OTP.' };
      }

      // Verify OTP
      if (otpRecord.otp_code !== otp) {
        console.warn(`⚠️ Invalid OTP attempt for ${email} (attempt ${otpRecord.attempts + 1}/3)`);
        
        // Increment attempts
        const { error: updateError } = await supabase
          .from('otp_verifications')
          .update({ attempts: otpRecord.attempts + 1 })
          .eq('email', email);

        if (updateError) {
          console.error('Error updating attempts:', updateError);
        }

        return { error: 'Invalid OTP. Please try again.' };
      }

      console.log('✅ OTP code matched!');

      // OTP verified - mark as verified
      const { error: verifyError } = await supabase
        .from('otp_verifications')
        .update({
          verified: true,
          verified_at: new Date().toISOString(),
        })
        .eq('email', email);

      if (verifyError) {
        console.error('❌ Error marking OTP as verified:', verifyError);
        return { error: 'Failed to verify OTP' };
      }

      console.log('✅ OTP verified and marked in database for:', email);
      return { success: true };
    } catch (error) {
      console.error('❌ Unexpected error in verifyOtp:', error);
      if (error instanceof Error) {
        console.error('Error details:', error.message, error.stack);
      }
      return { error: 'An unexpected error occurred. Please try again.' };
    }
  },

  // Create user after OTP verification
  async createUserWithOtp(email: string, fullName: string, password: string) {
    try {
      // Validate inputs
      if (!email || !fullName || !password) {
        return { error: 'Email, full name, and password are required' };
      }

      if (password.length < 6) {
        return { error: 'Password must be at least 6 characters' };
      }

      console.log(`👤 Creating user account for ${email}`);

      // Check if OTP was verified
      const { data: otpRecord, error: fetchError } = await supabase
        .from('otp_verifications')
        .select('verified, verified_at')
        .eq('email', email)
        .single();

      if (fetchError) {
        console.error('❌ Error fetching OTP record:', fetchError);
        return { error: 'OTP verification not found. Please start over.' };
      }

      if (!otpRecord || !otpRecord.verified) {
        console.warn('⚠️ OTP not verified for:', email);
        return { error: 'Please verify your email with OTP first' };
      }

      console.log('✅ OTP verification confirmed');

      // Check if email already exists
      const { data: existingUser, error: existingError } = await supabase
        .from('users')
        .select('id, email')
        .eq('email', email)
        .single();

      // If no error and got data, email exists
      if (!existingError && existingUser) {
        console.warn('⚠️ Email already registered:', email);
        return { error: 'Email already registered. Please sign in instead.' };
      }

      console.log(`📝 Inserting new user record for ${email}`);

      // Create user account
      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert({
          email,
          password,
          full_name: fullName,
        })
        .select('id, email, full_name')
        .single();

      if (insertError) {
        console.error('❌ Error creating user:', {
          message: insertError.message,
          code: insertError.code,
          details: insertError.details,
          email: email,
        });

        // Provide specific error messages
        if (insertError.code === '23505') { // Unique constraint violation
          return { error: 'Email already registered. Please sign in instead.' };
        }

        return { error: 'Failed to create account. Please try again.' };
      }

      console.log('✅ User account created:', newUser.id);

      // Clean up OTP record
      const { error: deleteError } = await supabase
        .from('otp_verifications')
        .delete()
        .eq('email', email);

      if (deleteError) {
        console.warn('⚠️ Could not delete OTP record:', deleteError);
        // Don't fail the signup, just log the warning
      } else {
        console.log('✅ OTP record cleaned up');
      }

      console.log('✅ Account creation complete for:', email);
      return { success: true, user: newUser };
    } catch (error) {
      console.error('❌ Unexpected error in createUserWithOtp:', error);
      if (error instanceof Error) {
        console.error('Error details:', error.message, error.stack);
      }
      return { error: 'An unexpected error occurred. Please try again.' };
    }
  },
};
