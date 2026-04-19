import { NextRequest, NextResponse } from 'next/server';
import { otpService } from '@/lib/otpService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, otp } = body;

    console.log(`🔍 [verify-otp] Received verification request for email: ${email}`);

    if (!email || !otp) {
      console.warn('❌ [verify-otp] Missing email or OTP in request');
      return NextResponse.json(
        { error: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    // Validate OTP format
    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      console.warn('❌ [verify-otp] Invalid OTP format:', otp);
      return NextResponse.json(
        { error: 'OTP must be 6 digits' },
        { status: 400 }
      );
    }

    console.log(`🔄 [verify-otp] Calling otpService.verifyOtp for: ${email}`);
    const result = await otpService.verifyOtp(email, otp);

    if (result.error) {
      console.warn(`⚠️ [verify-otp] OTP verification failed: ${result.error}`);
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    console.log(`✅ [verify-otp] OTP verified successfully for: ${email}`);
    return NextResponse.json(
      { success: true, message: 'OTP verified successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ [verify-otp] Unexpected error:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message, error.stack);
    }
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
