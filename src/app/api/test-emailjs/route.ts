import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const templateParams = {
      email: 'test@example.com',
      to_email: 'test@example.com',
      reset_link: 'https://example.com/reset?token=123',
      user_name: 'testuser',
    };

    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

    console.log('EmailJS Test - Starting');
    console.log('Service ID:', serviceId);
    console.log('Template ID:', templateId);
    console.log('Public Key:', publicKey?.substring(0, 10) + '...');
    console.log('Template Params:', JSON.stringify(templateParams, null, 2));

    const payload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: templateParams,
    };

    console.log('Sending payload to EmailJS:', JSON.stringify(payload, null, 2));

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    const responseData = responseText ? JSON.parse(responseText) : null;

    console.log('EmailJS Response Status:', response.status);
    console.log('EmailJS Response Text:', responseText);

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: 'EmailJS API error',
          statusCode: response.status,
          statusText: response.statusText,
          response: responseData,
          responseText: responseText,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'EmailJS configured correctly',
      response: responseData,
    });
  } catch (error: any) {
    console.error('EmailJS Test - Error:', {
      message: error?.message,
      status: error?.status,
      text: error?.text,
      statusText: error?.statusText,
      responseText: error?.responseText,
      toString: error?.toString?.(),
      keys: Object.keys(error),
      full: JSON.stringify(error, null, 2),
    });

    return NextResponse.json(
      {
        success: false,
        message: 'EmailJS configuration error',
        error: {
          message: error?.message,
          status: error?.status,
          text: error?.text,
          statusText: error?.statusText,
          responseText: error?.responseText,
          toString: error?.toString?.(),
          keys: Object.keys(error),
        },
      },
      { status: 500 }
    );
  }
}
