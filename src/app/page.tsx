import { Metadata } from 'next';
import Hero from '@/components/hero';
import HomeSectionsClient from '@/components/homeSections/homeSectionsClient';

export const metadata: Metadata = {
  title: "REHAS - Reiki | Mantra | Tantra | Astrology | Therapy | M.Y.T. Wisdom | Mind Reading",
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
    title: "REHAS - Reiki | Mantra | Tantra | Astrology | Therapy | M.Y.T. Wisdom | Mind Reading",
    description: "Discover personalized astrology readings, meditation guidance, and wellness services. Connect with cosmic wisdom for spiritual transformation and healing.",
    url: "https://www.rehas.in",
    siteName: "REHAS",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://www.rehas.in/logo.png",
        width: 1200,
        height: 630,
        alt: "REHAS - Cosmic Wellness Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "REHAS - Reiki | Mantra | Tantra | Astrology | Therapy | M.Y.T. Wisdom | Mind Reading",
    description: "Discover personalized astrology readings, meditation guidance, and wellness services.",
    images: ["https://www.rehas.in/logo.png"],
    creator: "@REHAS",
  },
  alternates: {
    canonical: "https://www.rehas.in",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <HomeSectionsClient />
    </>
  );
}
