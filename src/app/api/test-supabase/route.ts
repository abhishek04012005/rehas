import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    console.log('🧪 Testing Supabase connection...');

    // Try to query the otp_verifications table to check if connection works
    const { data, error } = await supabase
      .from('otp_verifications')
      .select('count', { count: 'exact', head: true })
      .limit(0);

    if (error) {
      console.error('❌ Supabase error:', error);
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          details: error,
          message: 'Cannot connect to Supabase database',
        },
        { status: 500 }
      );
    }

    console.log('✅ Supabase connection successful');
    return NextResponse.json(
      {
        success: true,
        message: 'Supabase is properly configured and connected',
        environment: {
          supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Configured' : '❌ Missing',
          supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ? '✅ Configured' : '❌ Missing',
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Test error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'An unexpected error occurred during testing',
      },
      { status: 500 }
    );
  }
}
