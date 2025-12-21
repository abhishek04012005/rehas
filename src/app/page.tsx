import Link from 'next/link';
import { Metadata } from 'next';
import styles from './page.module.css';
import Hero from '@/components/hero/hero';
import About from '@/components/about/about';
import Contact from '@/components/contact/contact';
import Services from '@/components/services/services';
import BlogPreview from '@/components/blogPreview/blogPreview';
import Founder from '@/components/founder/founder';
import TestimonialSlider from '@/components/testimonialSlider/testimonialSlider';

export const metadata: Metadata = {
  title: "REHAS - Ancient Cosmic Wisdom Meets Modern Wellness | Astrology & Meditation",
  description: "Discover personalized astrology readings, meditation guidance, and wellness services. Connect with cosmic wisdom for spiritual transformation and healing.",
  keywords: "astrology, birth chart reading, meditation, wellness, spiritual guidance, yoga, cosmic wisdom, horoscope",
  alternates: {
    canonical: "https://rehas.in",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Founder />
      <Services />
      <BlogPreview />
      <TestimonialSlider/>
      <Contact />
    </>
  );
}
