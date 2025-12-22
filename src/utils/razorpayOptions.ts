interface RazorpayOptionsProps {
  orderId: number;
  amount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  productTitle: string;
  handlePaymentSuccess: (response: any) => Promise<void>;
  handlePaymentCancelled?: () => Promise<void>;
}

export const getRazorpayOptions = ({
  orderId,
  amount,
  customerName,
  customerEmail,
  customerPhone,
  productTitle,
  handlePaymentSuccess,
  handlePaymentCancelled,
}: RazorpayOptionsProps) => {
  return {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
    amount: Math.round(amount * 100), // amount in paise
    currency: 'INR',
    name: 'REHAS',
    description: `Payment for ${productTitle}`,
    order_id: undefined, // Will be set after creating order on backend
    handler: async function (response: any) {
      await handlePaymentSuccess(response);
    },
    modal: {
      ondismiss: async function () {
        if (handlePaymentCancelled) {
          await handlePaymentCancelled();
        }
      },
    },
    prefill: {
      name: customerName,
      email: customerEmail,
      contact: customerPhone,
    },
    notes: {
      order_id: orderId,
      product_title: productTitle,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
    },
    theme: {
      color: '#560067', // REHAS primary color
    },
  };
};
