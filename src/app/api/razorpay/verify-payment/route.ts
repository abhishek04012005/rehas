import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      orderId,
      isCOD,
      paymentMethod,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    } = body;

    console.log('Verify payment request:', { orderId, isCOD, paymentMethod });

    if (!orderId) {
      return NextResponse.json(
        { error: 'Missing order ID' },
        { status: 400 }
      );
    }

    // Handle Cash on Delivery
    if (isCOD || paymentMethod === 'cod') {
      console.log('Processing COD order:', orderId);
      
      const { data, error } = await supabase
        .from('orders')
        .update({
          payment_status: 'pending',
          payment_method: 'cod',
          transaction_id: `COD-${orderId}-${new Date().getTime()}`,
          status: 'confirmed',
          updated_at: new Date().toISOString(),
        })
        .eq('id', orderId)
        .select();

      console.log('COD update response:', { data, error });

      if (error) {
        console.error('Supabase COD update error:', error);
        return NextResponse.json(
          { error: `Failed to update order: ${error.message}` },
          { status: 500 }
        );
      }

      if (!data || data.length === 0) {
        return NextResponse.json(
          { error: 'Order not found in database' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'COD order confirmed successfully',
        orderId: orderId,
      });
    }

    // Handle Razorpay payment
    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json(
        { error: 'Missing required payment details' },
        { status: 400 }
      );
    }

    // Verify Razorpay signature
    const body_sha = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET_KEY_ID || '')
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');

    const isSignatureValid = body_sha === razorpaySignature;

    if (!isSignatureValid) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Update order in Supabase with payment details
    const { data, error } = await supabase
      .from('orders')
      .update({
        payment_status: 'completed',
        payment_method: 'razorpay',
        transaction_id: razorpayPaymentId,
        razorpay_order_id: razorpayOrderId,
        razorpay_payment_id: razorpayPaymentId,
        razorpay_signature: razorpaySignature,
        status: 'confirmed',
        updated_at: new Date().toISOString(),
      })
      .eq('id', orderId)
      .select();

    if (error) {
      console.error('Supabase Razorpay update error:', error);
      return NextResponse.json(
        { error: `Failed to update order: ${error.message}` },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'Order not found in database' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      orderId: orderId,
      transactionId: razorpayPaymentId,
    });
  } catch (error: any) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: error.message || 'Payment verification failed' },
      { status: 500 }
    );
  }
}
