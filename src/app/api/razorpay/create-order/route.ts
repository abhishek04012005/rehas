import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, orderId, customerEmail, customerPhone, customerName, productTitle } = body;

    console.log('=== CREATE ORDER REQUEST ===');
    console.log('Amount:', amount);
    console.log('Order ID:', orderId);
    console.log('Customer Email:', customerEmail);

    if (!amount || !orderId) {
      return NextResponse.json(
        { error: 'Missing required fields: amount and orderId' },
        { status: 400 }
      );
    }

    // Check if Razorpay credentials are set
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_SECRET_KEY_ID;

    console.log('Checking credentials...');
    console.log('Key ID exists:', !!keyId);
    console.log('Key Secret exists:', !!keySecret);
    console.log('Key ID value:', keyId ? keyId.substring(0, 10) + '...' : 'NOT SET');

    if (!keyId) {
      return NextResponse.json(
        { error: 'Razorpay Key ID not configured in environment variables (NEXT_PUBLIC_RAZORPAY_KEY_ID)' },
        { status: 500 }
      );
    }

    if (!keySecret) {
      return NextResponse.json(
        { error: 'Razorpay Key Secret not configured in environment variables (RAZORPAY_SECRET_KEY_ID)' },
        { status: 500 }
      );
    }

    console.log('Initializing Razorpay instance...');
    
    // Initialize Razorpay instance
    const razorpayInstance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
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

    console.log('Creating order with options:', JSON.stringify(options, null, 2));

    let razorpayOrder;
    try {
      razorpayOrder = await razorpayInstance.orders.create(options);
      console.log('Order created successfully:', razorpayOrder.id);
    } catch (razorpayError: any) {
      console.error('=== RAZORPAY API ERROR ===');
      console.error('Error type:', razorpayError.constructor.name);
      console.error('Error message:', razorpayError.message);
      console.error('Error code:', razorpayError.code);
      console.error('Error statusCode:', razorpayError.statusCode);
      console.error('Full error:', JSON.stringify(razorpayError, null, 2));
      
      throw razorpayError;
    }

    return NextResponse.json({
      razorpayOrderId: razorpayOrder.id,
      key: keyId,
      amount: amount,
    });
  } catch (error: any) {
    console.error('=== FINAL ERROR ===');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Stack:', error.stack);
    
    // Provide detailed error message
    let detailedError = 'Failed to create payment order';
    
    if (error.statusCode === 400) {
      detailedError = `Razorpay validation error: ${error.message}`;
    } else if (error.statusCode === 401 || error.statusCode === 403) {
      detailedError = 'Razorpay authentication failed. Please check your API keys.';
    } else if (error.message?.includes('ENOTFOUND') || error.message?.includes('network')) {
      detailedError = 'Network error connecting to Razorpay. Check your internet connection.';
    } else if (error.message) {
      detailedError = error.message;
    }
    
    return NextResponse.json(
      { error: detailedError },
      { status: 500 }
    );
  }
}
