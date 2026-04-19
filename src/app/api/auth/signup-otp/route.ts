import { NextRequest, NextResponse } from 'next/server';
import { otpService } from '@/lib/otpService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, fullName, password } = body;

    console.log(`👤 [signup-otp] Received signup request for email: ${email}`);

    if (!email || !fullName || !password) {
      console.warn('❌ [signup-otp] Missing required fields');
      return NextResponse.json(
        { error: 'Email, full name, and password are required' },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      console.warn('❌ [signup-otp] Password too short');
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.warn('❌ [signup-otp] Invalid email format:', email);
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Validate full name
    if (fullName.trim().length < 2) {
      console.warn('❌ [signup-otp] Invalid full name');
      return NextResponse.json(
        { error: 'Full name must be at least 2 characters' },
        { status: 400 }
      );
    }

    console.log(`🔄 [signup-otp] Calling otpService.createUserWithOtp for: ${email}`);
    const result = await otpService.createUserWithOtp(email, fullName.trim(), password);

    if (result.error) {
      console.warn(`⚠️ [signup-otp] Account creation failed: ${result.error}`);
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    console.log(`✅ [signup-otp] Account created successfully for: ${email}`);
    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully',
        user: result.user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('❌ [signup-otp] Unexpected error:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message, error.stack);
    }
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
