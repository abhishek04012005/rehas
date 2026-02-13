import { Metadata } from 'next';
import Testimonial from '@/components/testimonial';

export const metadata: Metadata = {
  title: 'Client Testimonials | REHAS Success Stories',
  description:
    'Read real transformation stories from our clients. Discover how REHAS astrology, numerology, and energy healing services have enriched lives.',
  keywords: [
    'Testimonials',
    'Client Reviews',
    'Success Stories',
    'Cosmic Wellness',
    'Transformation Stories',
    'Healing Results',
    'Client Feedback',
  ],
  openGraph: {
    title: 'Client Testimonials | REHAS Success Stories',
    description: 'Real stories of transformation and cosmic awakening from our clients.',
    url: 'https://rehas.in/testimonials',
    type: 'website',
  },
  alternates: {
    canonical: 'https://rehas.in/testimonials',
  },
};

export default function TestimonialPageRoute() {
  return <Testimonial />;
}
