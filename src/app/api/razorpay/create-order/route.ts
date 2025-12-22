import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, orderId, customerEmail, customerPhone, customerName, productTitle } = body;

    if (!amount || !orderId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Initialize Razorpay instance
    const razorpayInstance = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
      key_secret: process.env.RAZORPAY_KEY_SECRET || '',
    });

    // Create Razorpay order
    const options = {
      amount: amount, // Amount in paise
      currency: 'INR',
      receipt: `order_${orderId}`,
      notes: {
        product_title: productTitle,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        order_id: orderId,
      },
    };

    const razorpayOrder = await razorpayInstance.orders.create(options);

    return NextResponse.json({
      razorpayOrderId: razorpayOrder.id,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: amount,
    });
  } catch (error: any) {
    console.error('Razorpay order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment order' },
      { status: 500 }
    );
  }
}
