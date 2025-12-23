import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      fullName,
      email,
      phoneNumber,
      birthDate,
      age,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      productTitle,
      amount,
      orderType = 'service',
      serviceId,
      serviceTitle,
      serviceDescription,
    } = body;

    // Validation
    if (!fullName || !email || !phoneNumber || !productTitle || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate phone number
    if (phoneNumber.length !== 10 || !/^[6-9]/.test(phoneNumber)) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      );
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Calculate amount in paise
    const amountInPaise = Math.round(amount * 100);

    console.log('Creating order:', {
      fullName,
      email,
      phoneNumber,
      birthDate,
      age,
      productTitle,
      amount,
      amountInPaise,
    });

    // Insert order into database
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          full_name: fullName,
          email: email,
          phone_number: phoneNumber,
          birth_date: birthDate,
          age: age,
          address_line_1: addressLine1,
          address_line_2: addressLine2,
          city: city,
          state: state,
          postal_code: postalCode,
          country: country,
          product_title: productTitle,
          service_title: serviceTitle || productTitle,
          service_description: serviceDescription,
          amount: amount,
          amount_in_paise: amountInPaise,
          currency: 'INR',
          order_type: orderType,
          service_id: serviceId,
          status: 'pending',
          payment_status: 'unpaid',
        },
      ])
      .select();

    if (error) {
      console.error('Database error:', error);
      
      // Check if it's a table not found error
      if (error.message?.includes('orders') || error.message?.includes('relation')) {
        return NextResponse.json(
          { 
            error: `Database not initialized. Please execute the migration SQL in Supabase. See: DATABASE_SETUP_INSTRUCTIONS.md`,
            details: error.message
          },
          { status: 503 }
        );
      }
      
      return NextResponse.json(
        { error: `Database error: ${error.message}` },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      );
    }

    console.log('Order created successfully:', data[0].id);

    return NextResponse.json(
      {
        success: true,
        orderId: data[0].id,
        message: 'Order created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
