import type { Metadata, Viewport } from "next";
import dynamic from 'next/dynamic';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
const NavbarWrapper = dynamic(() => import('@/components/navbarWrapper/navbarWrapper'), {
  loading: () => null,
});
const DeferredLayout = dynamic(() => import('@/components/deferredLayout/deferredLayout'), {
  loading: () => null,
});
import SchemaComponent from "@/components/schemaComponent/schemaComponent";
import { CheckoutProvider } from "@/context/CheckoutContext";
import { AuthProvider } from "@/context/AuthContext";
import { organizationSchema } from "@/lib/seoConfig";

const Footer = dynamic(() => import('@/components/footer/footer'), {
  loading: () => null,
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadataBase = new URL('https://www.rehas.in');

export const metadata: Metadata = {
  title: "REHAS - Reiki | Yoga | Mantra | Tantra | Astrology | Therapy | M.Y.T. Wisdom | Kundalini Energy | Chakra | Mudra | Mind Reading | Energy Merchandise",
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
    title: "REHAS - Reiki | Yoga | Mantra | Tantra | Astrology | Therapy | M.Y.T. Wisdom | Kundalini Energy | Chakra | Mudra | Mind Reading | Energy Merchandise",
    description: "Explore cosmic wisdom through astrology, meditation, and wellness services. Book your consultation with REHAS experts.",
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
    title: "REHAS - Reiki | Yoga | Mantra | Tantra | Astrology | Therapy | M.Y.T. Wisdom | Kundalini Energy | Chakra | Mudra | Mind Reading | Energy Merchandise",
    description: "Explore cosmic wisdom through astrology, meditation, and wellness services.",
    images: ["https://www.rehas.in/logo.png"],
    creator: "@REHAS",
  },
  alternates: {
    canonical: "https://www.rehas.in",
  },
  verification: {
    google: "RFS71sEcGfQ__Ke-RqIuIDPernFo0ROZmArCfBv_qDs",
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
      <head>
        <meta name="p:domain_verify" content="1817761311e9b400a4a1edc37b750f05" />
        <SchemaComponent schema={organizationSchema} />
      </head>
      <body>
        <AuthProvider>
          <CheckoutProvider>
            <DeferredLayout />
            <NavbarWrapper />
            {children}
            <Footer />
          </CheckoutProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
