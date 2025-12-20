import Testimonial from '@/components/testimonial/testimonial';

export const metadata = {
  title: 'Client Testimonials | REHAS - Cosmic Wellness',
  description:
    'Discover real stories of transformation from our clients. Learn how REHAS wellness services have changed lives through astrology, numerology, and energy healing.',
  keywords:
    'testimonials, client reviews, cosmic wellness, transformation stories, astrology, numerology, energy healing',
  openGraph: {
    title: 'Client Testimonials | REHAS - Cosmic Wellness',
    description: 'Real stories of transformation and cosmic awakening from our clients.',
    url: 'https://rehas.com/testimonials',
    type: 'website',
  },
};

export default function TestimonialPageRoute() {
  return <Testimonial />;
}
