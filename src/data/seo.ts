/**
 * SEO Configuration for Products and Cities
 * Generates optimized meta descriptions, titles, and keywords
 */

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  longTailKeywords: string[];
  schema: {
    breadcrumb: string[];
    faqSchema?: Array<{ question: string; answer: string }>;
  };
}

/**
 * Major Indian Cities for local SEO optimization
 */
export const majorCities = [
  // Metro Cities
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad',
  // Tier 1 Cities
  'Jaipur', 'Lucknow', 'Chandigarh', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Vadodara',
  // Popular Wellness Cities
  'Rishikesh', 'Goa', 'Varanasi', 'Srinagar', 'Udaipur', 'Dharamshala', 'McLeod Ganj',
  // Growing Markets
  'Coimbatore', 'Nashik', 'Aurangabad', 'Nagpur', 'Kottayam', 'Thiruvananthapuram', 'Kochi',
];

/**
 * Healing modalities and wellness keywords
 */
export const healingModalities = [
  'crystal healing',
  'chakra balancing',
  'energy healing',
  'spiritual wellness',
  'astrology',
  'numerology',
  'meditation aid',
  'stress relief',
  'emotional healing',
  'holistic wellness',
  'Reiki energy',
  'aura cleansing',
  'manifestation',
  'positive energy',
  'spiritual protection',
];

/**
 * Generate SEO-optimized title for product with city
 */
export function generateProductTitle(
  productName: string,
  category: string,
  city?: string,
  zodiacSign?: string
): string {
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
  
  if (city) {
    return `Buy ${productName} in ${city} - Premium ${categoryTitle} | REHAS`;
  }
  
  if (zodiacSign) {
    return `${productName} for ${zodiacSign} - Premium ${categoryTitle} | REHAS Healing`;
  }
  
  return `${productName} - Buy Premium ${categoryTitle} Online | REHAS`;
}

/**
 * Generate SEO-optimized description for product with city
 */
export function generateProductDescription(
  productName: string,
  shortDescription: string,
  category: string,
  city?: string,
  zodiacSign?: string,
  benefits?: string
): string {
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
  const benefitsText = benefits ? ` ${benefits.split(',')[0]}.` : '';
  
  if (city) {
    return `${shortDescription} - Get ${productName} delivered in ${city}. Authentic ${categoryTitle} for holistic wellness.${benefitsText} ✓ Free shipping • Certified products.`;
  }
  
  if (zodiacSign) {
    return `${shortDescription} - Perfect for ${zodiacSign} zodiac sign.${benefitsText} Buy authentic ${categoryTitle} online with expert guidance. ✓ Certified • Fast delivery.`;
  }
  
  return `${shortDescription} - Authentic ${categoryTitle} for holistic wellness.${benefitsText} ✓ Fast shipping across India • Certified products.`;
}

/**
 * Generate SEO keywords for product
 */
export function generateProductKeywords(
  productName: string,
  category: string,
  city?: string,
  zodiacSign?: string,
  planet?: string,
  benefits?: string
): string[] {
  const keywords = [
    // Product keywords
    productName,
    `${productName} bracelet`,
    `buy ${productName}`,
    `${productName} price`,
    `${productName} benefits`,
    `${productName} online`,
    
    // Category keywords
    category,
    `${category} bracelet`,
    `buy ${category}`,
    `best ${category}`,
    `${category} stones`,
    `natural ${category}`,
    
    // Healing keywords
    'crystal healing',
    'spiritual healing',
    'energy healing',
    'chakra balancing',
    'holistic wellness',
    'wellness products',
    'healing crystals',
    
    // City keywords (if provided)
    ...(city ? [
      `${productName} in ${city}`,
      `buy ${category} in ${city}`,
      `${category} near me ${city}`,
      `healing crystals ${city}`,
      `wellness products ${city}`,
      `spiritual healing ${city}`,
    ] : []),
    
    // Zodiac keywords (if provided)
    ...(zodiacSign ? [
      `${productName} ${zodiacSign}`,
      `${zodiacSign} ${category}`,
      `${zodiacSign} crystal`,
      `${zodiacSign} stone`,
      `${zodiacSign} bracelet`,
    ] : []),
    
    // Planet keywords (if provided)
    ...(planet ? [
      `${planet} stone`,
      `${planet} crystal`,
      `${planet} bracelet`,
    ] : []),
    
    // General e-commerce keywords
    'buy online',
    'free shipping',
    'authentic products',
    'certified',
    'REHAS',
    'India',
  ];
  
  return keywords.filter(Boolean);
}

/**
 * Generate long-tail keywords for SEO
 */
export function generateLongTailKeywords(
  productName: string,
  category: string,
  benefits?: string,
  city?: string
): string[] {
  const longTailKeywords = [
    `what are the benefits of ${productName}`,
    `how to use ${productName}`,
    `best ${category} for healing`,
    `authentic ${productName} online`,
    `${category} for stress relief`,
    `${category} for emotional healing`,
    `${category} for positive energy`,
    `${category} for chakra balancing`,
    `genuine ${productName} price`,
    `natural ${category} bracelet`,
    `${category} with free shipping`,
    `${category} with certificate of authenticity`,
    `best quality ${category}`,
    `handcrafted ${productName}`,
    `where to buy ${category}`,
    `${category} vs other healing stones`,
    `how long does ${category} last`,
    `${category} care and maintenance`,
    `astrological significance of ${productName}`,
    `${category} for meditation`,
    
    // City-based long-tail keywords
    ...(city ? [
      `${category} stores in ${city}`,
      `buy ${productName} in ${city}`,
      `best ${category} shop in ${city}`,
      `${category} price in ${city}`,
      `healing crystals near ${city}`,
      `${category} delivery in ${city}`,
    ] : []),
  ];
  
  return longTailKeywords.filter(Boolean);
}

/**
 * Generate FAQ Schema for product
 */
export function generateFAQSchema(
  productName: string,
  benefits?: string,
  zodiacSign?: string
): Array<{ question: string; answer: string }> {
  return [
    {
      question: `What is ${productName}?`,
      answer: `${productName} is a natural healing crystal known for promoting wellness and positive energy. It has been used in spiritual and holistic healing practices for centuries.`,
    },
    {
      question: `What are the benefits of ${productName}?`,
      answer: benefits || 'This crystal is believed to promote emotional healing, stress relief, positive energy flow, and overall wellness.',
    },
    {
      question: `How should I wear ${productName}?`,
      answer: `Wear the ${productName} bracelet on your left wrist for maximum benefit. Left wrist is believed to be more receptive to healing energy. You can wear it daily or during meditation.`,
    },
    {
      question: `Is this ${productName} authentic?`,
      answer: `Yes, all our products are 100% authentic and certified. Each piece is sourced directly and comes with authenticity certificates. We guarantee natural, genuine crystals.`,
    },
    {
      question: `How do I care for my ${productName}?`,
      answer: `Keep your crystal away from extreme heat and sunlight. Clean it gently with a soft cloth. Recharge it under moonlight or sunlight monthly for best results.`,
    },
    {
      question: `What is the delivery time for ${productName}?`,
      answer: `We offer fast delivery across India. Standard delivery takes 3-5 business days. Express delivery options are available for faster shipping.`,
    },
    {
      question: `Do you offer energy activation ritual for ${productName}?`,
      answer: `Yes, we offer optional energy activation rituals (puja ceremony) performed with your name and intention. This personalizes the crystal to your spiritual goals.`,
    },
    {
      question: `Can I return ${productName}?`,
      answer: `All sales are final. However, in case of damage during shipping, please contact our support team with photos for review and assistance.`,
    },
    ...(zodiacSign ? [{
      question: `Is ${productName} suitable for ${zodiacSign}?`,
      answer: `Yes, ${productName} is particularly beneficial for ${zodiacSign} sign individuals. It helps enhance positive traits and balance the zodiac energies.`,
    }] : []),
  ];
}

/**
 * Generate breadcrumb schema
 */
export function generateBreadcrumbSchema(
  category: string,
  productName: string
): string[] {
  return [
    'Home',
    'Products',
    category.charAt(0).toUpperCase() + category.slice(1),
    productName,
  ];
}

/**
 * Generate local business schema for city-based SEO
 */
export function generateLocalBusinessSchema(
  city?: string
): {
  '@context': string;
  '@type': string;
  'name': string;
  'url': string;
  'areaServed': string;
  'contactPoint': object;
} | null {
  if (!city) return null;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': `REHAS Wellness - ${city}`,
    'url': `https://www.rehas.in`,
    'areaServed': city,
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+91-XXXX-XXXXXX',
      'contactType': 'Customer Service',
    },
  };
}

/**
 * Meta tags for social sharing
 */
export function generateSocialMeta(
  productName: string,
  description: string,
  imageUrl?: string
): Record<string, string> {
  return {
    'og:title': productName,
    'og:description': description,
    'og:type': 'product',
    'og:url': `https://www.rehas.in/product/${productName.toLowerCase().replace(/\s+/g, '-')}`,
    ...(imageUrl ? { 'og:image': imageUrl } : {}),
    'twitter:card': 'summary_large_image',
    'twitter:title': productName,
    'twitter:description': description,
    ...(imageUrl ? { 'twitter:image': imageUrl } : {}),
  };
}
