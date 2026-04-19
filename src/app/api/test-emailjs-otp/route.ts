import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_OTP_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_OTP_PRIVATE_KEY;
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_OTP_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_OTP_TEMPLATE_ID;

    console.log('🧪 Testing EmailJS OTP Credentials...');
    console.log('Public Key:', publicKey ? '✅ Present' : '❌ Missing');
    console.log('Private Key:', privateKey ? '✅ Present' : '❌ Missing');
    console.log('Service ID:', serviceId);
    console.log('Template ID:', templateId);

    const authKey = privateKey || publicKey;

    const testPayload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: authKey,
      template_params: {
        to_email: 'registration@rehas.in',
        otp_code: '123456',
        user_email: 'registration@rehas.in',
      },
    };

    console.log('🧪 TEST PAYLOAD:');
    console.log(JSON.stringify(testPayload, null, 2));

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testPayload),
    });

    const responseText = await response.text();
    let responseData: any = null;

    try {
      responseData = responseText ? JSON.parse(responseText) : null;
    } catch (e) {
      responseData = responseText;
    }

    console.log('📥 EMAILJS FULL RESPONSE:');
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    console.log('Body:', responseData || responseText);

    const isSuccess = response.status === 200;

    return NextResponse.json(
      {
        success: isSuccess,
        status: response.status,
        statusText: response.statusText,
        message: responseData?.message || responseText,
        fullResponse: responseData || responseText,
        credentialsUsed: {
          authKeyType: privateKey ? 'Private Key' : 'Public Key',
          publicKey: publicKey,
          privateKey: privateKey,
          serviceId,
          templateId,
        },
        testEmail: 'registration@rehas.in',
        testOtp: '123456',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Test error:', error);
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
