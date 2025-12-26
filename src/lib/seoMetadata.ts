import type { Metadata } from "next";

const BASE_URL = "https://rehas.in";
const SITE_NAME = "REHAS";
const OG_IMAGE = `${BASE_URL}/og-image.png`;

export interface SEOMetadataParams {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  imageUrl?: string;
  imageAlt?: string;
  type?: "website" | "article" | "product" | "service";
  author?: string;
  datePublished?: string;
  dateModified?: string;
}

/**
 * Generate metadata for a page
 * @param params SEOMetadataParams object
 * @returns Metadata object for Next.js
 */
export function generateSEOMetadata({
  title,
  description,
  path,
  keywords = [],
  imageUrl = OG_IMAGE,
  imageAlt = SITE_NAME,
  type = "website",
  author = SITE_NAME,
  datePublished,
  dateModified,
}: SEOMetadataParams): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const canonicalUrl = `${BASE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    keywords: [...keywords],
    authors: [{ name: author }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    ...(datePublished && { publishedTime: datePublished }),
    ...(dateModified && { modifiedTime: dateModified }),
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
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: type as any,
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: "@REHAS",
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

/**
 * Generate breadcrumb schema.org JSON-LD
 */
export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${BASE_URL}${crumb.path}`,
    })),
  };
}

/**
 * Generate organization schema.org JSON-LD
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description: "Ancient Cosmic Wisdom Meets Modern Wellness",
    sameAs: [
      "https://facebook.com/rehas",
      "https://twitter.com/rehas",
      "https://instagram.com/rehas",
      "https://linkedin.com/company/rehas",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "contact@rehas.in",
    },
  };
}

/**
 * Generate service schema.org JSON-LD
 */
export function generateServiceSchema(params: {
  name: string;
  description: string;
  price?: string;
  priceCurrency?: string;
  duration?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: params.name,
    description: params.description,
    ...(params.image && { image: params.image }),
    ...(params.price && {
      offers: {
        "@type": "Offer",
        price: params.price,
        priceCurrency: params.priceCurrency || "INR",
        ...(params.duration && { duration: params.duration }),
      },
    }),
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: BASE_URL,
    },
  };
}

/**
 * Generate product schema.org JSON-LD
 */
export function generateProductSchema(params: {
  name: string;
  description: string;
  image: string;
  price: string;
  priceCurrency?: string;
  rating?: number;
  reviewCount?: number;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: params.name,
    description: params.description,
    image: params.image,
    offers: {
      "@type": "Offer",
      price: params.price,
      priceCurrency: params.priceCurrency || "INR",
      availability: `https://schema.org/${params.availability || "InStock"}`,
      url: BASE_URL,
    },
    ...(params.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: params.rating,
        reviewCount: params.reviewCount || 1,
      },
    }),
  };
}

/**
 * Generate article schema.org JSON-LD
 */
export function generateArticleSchema(params: {
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  body?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: params.headline,
    description: params.description,
    ...(params.image && { image: params.image }),
    datePublished: params.datePublished,
    dateModified: params.dateModified || params.datePublished,
    author: {
      "@type": "Organization",
      name: params.author || SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
    },
    ...(params.body && { articleBody: params.body }),
  };
}

/**
 * Generate FAQ schema.org JSON-LD
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate course schema.org JSON-LD
 */
export function generateCourseSchema(params: {
  name: string;
  description: string;
  image?: string;
  price?: string;
  priceCurrency?: string;
  duration?: string;
  level?: "Beginner" | "Intermediate" | "Advanced";
  instructor?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: params.name,
    description: params.description,
    ...(params.image && { image: params.image }),
    ...(params.price && {
      offers: {
        "@type": "Offer",
        price: params.price,
        priceCurrency: params.priceCurrency || "INR",
      },
    }),
    ...(params.duration && { duration: params.duration }),
    ...(params.level && { educationLevel: params.level }),
    ...(params.instructor && {
      instructor: {
        "@type": "Person",
        name: params.instructor,
      },
    }),
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: BASE_URL,
    },
  };
}

/**
 * Generate local business schema.org JSON-LD
 */
export function generateLocalBusinessSchema(params?: {
  name?: string;
  address?: string;
  telephone?: string;
  email?: string;
  latitude?: number;
  longitude?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: params?.name || SITE_NAME,
    url: BASE_URL,
    ...(params?.telephone && { telephone: params.telephone }),
    ...(params?.email && { email: params.email }),
    ...(params?.address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: params.address,
        addressCountry: "IN",
      },
    }),
    ...(params?.latitude &&
      params?.longitude && {
        geo: {
          "@type": "GeoCoordinates",
          latitude: params.latitude,
          longitude: params.longitude,
        },
      }),
  };
}
