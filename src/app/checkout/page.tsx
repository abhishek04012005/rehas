import { Metadata } from 'next';
import CheckoutForm from '@/components/checkoutForm/checkoutForm';

type SearchParams = Promise<{
  product?: string;
  amount?: string;
}>;

interface CheckoutPageProps {
  searchParams: SearchParams;
}

export const metadata: Metadata = {
  title: 'Checkout | Shipping Address | REHAS',
  description: 'Enter your shipping address details to complete your order at REHAS.',
  keywords: ['checkout', 'shipping', 'address', 'order', 'REHAS'],
  openGraph: {
    title: 'Checkout | REHAS',
    description: 'Complete your order with shipping details.',
    type: 'website',
  },
};

export default async function CheckoutPage(props: CheckoutPageProps) {
  const searchParams = await props.searchParams;
  const productTitle = searchParams.product || 'REHAS Product';
  const amount = parseFloat(searchParams.amount || '999');
  const decodedProduct = decodeURIComponent(productTitle);

  return <CheckoutForm productTitle={decodedProduct} amount={amount} />;
}
