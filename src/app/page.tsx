import { Metadata } from 'next';
import Hero from '@/components/hero/hero';
import About from '@/components/about/about';
import Contact from '@/components/contact/contact';
import Healing from '@/components/healing/healing';
import Therapy from '@/components/therapy/therapy';
import BlogPreview from '@/components/blogPreview/blogPreview';
import Founder from '@/components/founder/founder';
import TestimonialSlider from '@/components/testimonialSlider/testimonialSlider';

export const metadata: Metadata = {
  title: "REHAS - Reiki | Mantra | Tantra | Astrology | Therapy | M.Y.T Wisdom | Mind Reading",
  description: "Discover personalized astrology readings, meditation guidance, and wellness services. Connect with cosmic wisdom for spiritual transformation and healing.",
  keywords: ["astrology", "birth chart reading", "meditation", "wellness", "spiritual guidance", "yoga", "cosmic wisdom", "horoscope", "astrology readings", "healing services"],
  authors: [{ name: "REHAS" }],
  creator: "REHAS",
  publisher: "REHAS",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "REHAS - Ancient Cosmic Wisdom Meets Modern Wellness",
    description: "Discover personalized astrology readings, meditation guidance, and wellness services. Connect with cosmic wisdom for spiritual transformation and healing.",
    url: "https://rehas.in",
    siteName: "REHAS",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://rehas.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "REHAS - Cosmic Wellness Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "REHAS - Ancient Cosmic Wisdom Meets Modern Wellness",
    description: "Discover personalized astrology readings, meditation guidance, and wellness services.",
    images: ["https://rehas.in/og-image.png"],
    creator: "@REHAS",
  },
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
      <Healing />
      <Therapy />
      <BlogPreview />
      <TestimonialSlider />
      <Contact />
    </>
  );
}
