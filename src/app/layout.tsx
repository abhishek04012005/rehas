import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/navbarWrapper/navbarWrapper";
import PageLoadingWrapper from "@/components/pageLoadingWrapper/pageLoadingWrapper";
import AutoEnquiryPopup from "@/components/autoEnquiryPopup/autoEnquiryPopup";
import Footer from "@/components/footer/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "REHAS - Ancient Cosmic Wisdom Meets Modern Wellness",
  description: "Explore cosmic wisdom through astrology, meditation, and wellness services. Book your consultation with REHAS experts for personalized spiritual guidance and healing.",
  keywords: "astrology, meditation, wellness, spiritual guidance, birth chart reading, yoga, cosmic wisdom",
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
    description: "Explore cosmic wisdom through astrology, meditation, and wellness services. Book your consultation with REHAS experts.",
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
    description: "Explore cosmic wisdom through astrology, meditation, and wellness services.",
    images: ["https://rehas.in/og-image.png"],
  },
  alternates: {
    canonical: "https://rehas.in",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PageLoadingWrapper />
        <AutoEnquiryPopup />
        <NavbarWrapper />
        {children}
        <Footer />
      </body>
    </html>
  );
}
