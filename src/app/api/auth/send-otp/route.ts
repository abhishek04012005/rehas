import { NextRequest, NextResponse } from 'next/server';
import { otpService } from '@/lib/otpService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    console.log(`📧 [send-otp] Received request for email: ${email}`);

    if (!email) {
      console.warn('❌ [send-otp] Missing email in request');
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.warn('❌ [send-otp] Invalid email format:', email);
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    console.log(`🔄 [send-otp] Calling otpService.sendOtp for: ${email}`);
    const result = await otpService.sendOtp(email);

    if (result.error) {
      console.warn(`⚠️ [send-otp] OTP service error: ${result.error}`);
      // Return 409 Conflict for email already exists, 400 for other errors
      const statusCode = result.error.toLowerCase().includes('already registered') ? 409 : 400;
      return NextResponse.json(
        { error: result.error },
        { status: statusCode }
      );
    }

    console.log(`✅ [send-otp] OTP sent successfully for: ${email}`);
    return NextResponse.json(
      { 
        success: true, 
        message: 'OTP sent to your email',
        // Include test OTP in response if available (for development)
        ...(process.env.NODE_ENV === 'development' && result.testOtp ? { testOtp: result.testOtp } : {})
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ [send-otp] Unexpected error:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message, error.stack);
    }
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
