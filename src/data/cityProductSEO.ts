/**
 * City-Based Product SEO Utilities
 * Generates localized SEO content for products in specific cities
 */

import { majorCities } from './seo';
import { cities } from './cities';

export interface CityProductSEO {
  city: string;
  state?: string;
  productTitle: string;
  productDescription: string;
  keywords: string[];
  longTailKeywords: string[];
  localContent: string;
}

/**
 * Get city metadata from cities array
 */
export function getCityMetadata(cityName: string): { name: string; state: string } {
  const cityData = cities.find(c => c.name === cityName);
  return cityData ? { name: cityData.name, state: cityData.state } : { name: cityName, state: 'India' };
}

/**
 * Generate city-specific product SEO content
 */
export function generateCityProductSEO(
  productName: string,
  productShortDesc: string,
  category: string,
  city: string,
  benefits?: string,
  zodiacSign?: string
): CityProductSEO {
  const cityInfo = getCityMetadata(city);
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
  
  const keywords = [
    // Product + City
    `${productName} in ${city}`,
    `buy ${productName} ${city}`,
    `${productName} online ${city}`,
    `${productName} price ${city}`,
    
    // Category + City
    `${category} in ${city}`,
    `buy ${category} ${city}`,
    `best ${category} ${city}`,
    `${category} shop ${city}`,
    `${categoryTitle} bracelet ${city}`,
    
    // General wellness + City
    `crystal healing ${city}`,
    `spiritual products ${city}`,
    `healing crystals ${city}`,
    `wellness products ${city}`,
    `holistic healing ${city}`,
    `chakra balancing ${city}`,
  ];
  
  const longTailKeywords = [
    `where to buy ${productName} in ${city}`,
    `${productName} benefits in ${city}`,
    `authentic ${productName} ${city}`,
    `genuine ${category} near ${city}`,
    `${category} with free delivery ${city}`,
    `best quality ${category} in ${city}`,
    `how much does ${productName} cost in ${city}`,
    `${category} shops near me ${city}`,
    `buy certified ${category} in ${city}`,
    `${category} for healing in ${city}`,
    `spiritual wellness in ${city}`,
    `chakra healing crystals ${city}`,
    `meditation aids available in ${city}`,
    `holistic wellness products ${city}`,
    `astrology products ${city}`,
    ...(zodiacSign ? [
      `${productName} for ${zodiacSign} in ${city}`,
      `${zodiacSign} healing crystal ${city}`,
    ] : []),
  ];
  
  const localContent = `
Discover authentic ${productName} in ${city}, ${cityInfo.state}. 
${productShortDesc} 
Perfect for residents of ${city} seeking holistic wellness and spiritual healing. 
We deliver ${category} products across ${city} with fast, free shipping. 
All products are certified and come with authenticity guarantees. 
Shop the best quality ${category} online and experience the benefits of natural healing crystals. 
Join thousands of happy customers in ${city} who trust REHAS for their spiritual wellness needs.
${benefits ? `Key benefits: ${benefits}` : ''}
  `.trim();
  
  return {
    city,
    state: cityInfo.state,
    productTitle: `Buy ${productName} in ${city} - Premium ${categoryTitle} | REHAS`,
    productDescription: `${productShortDesc} - Shop authentic ${productName} in ${city}. Get certified healing crystals delivered fast with free shipping. ✓ 100% genuine • Expert support.`,
    keywords,
    longTailKeywords,
    localContent,
  };
}

/**
 * Generate product page URL slug for a city
 */
export function generateCityProductUrl(
  category: string,
  productSlug: string,
  city?: string
): string {
  const baseUrl = `https://rehas.in/product/${category}/${productSlug}`;
  if (city) {
    // Use path-based URL structure for better SEO
    return `${baseUrl}/${city.toLowerCase().replace(/\s+/g, '-')}`;
  }
  return baseUrl;
}

/**
 * Generate meta tags for city-specific product pages
 */
export function generateCityProductMetaTags(
  productName: string,
  city: string,
  imageUrl?: string
): Record<string, string> {
  const cityInfo = getCityMetadata(city);
  
  return {
    'og:title': `${productName} in ${city} | REHAS`,
    'og:description': `Buy authentic ${productName} in ${city}, ${cityInfo.state}. Fast delivery, certified products, expert support.`,
    'og:type': 'product',
    'og:url': generateCityProductUrl('product', productName.toLowerCase().replace(/\s+/g, '-'), city),
    ...(imageUrl ? { 'og:image': imageUrl } : {}),
    'twitter:card': 'summary_large_image',
    'twitter:title': `${productName} in ${city}`,
    'twitter:description': `Get ${productName} delivered in ${city} with authenticity guarantee.`,
    ...(imageUrl ? { 'twitter:image': imageUrl } : {}),
    'geo:region': `IN-${cityInfo.state.replace(/\s+/g, '')}`,
    'geo:placename': city,
  };
}

/**
 * Get all major cities for sitemap and dynamic route generation
 */
export function getAllCities(): string[] {
  return cities.map(c => c.name);
}

/**
 * Generate city-product combination for dynamic routes
 */
export function generateCityProductRoutes(
  productSlug: string,
  category: string
): Array<{ city: string; params: Record<string, string> }> {
  return getAllCities().map(city => ({
    city,
    params: {
      category,
      product: productSlug,
      city,
    },
  }));
}

/**
 * Generate local business schema for city
 */
export function generateLocalBusinessSchemaForCity(
  city: string,
  productCategory?: string
): string {
  const cityInfo = getCityMetadata(city);
  
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': `REHAS Wellness - ${city}`,
    'description': `Premium ${productCategory || 'healing crystal'} products and wellness services in ${city}`,
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': city,
      'addressRegion': cityInfo.state,
      'addressCountry': 'IN',
    },
    'areaServed': {
      '@type': 'City',
      'name': city,
    },
    'contactPoint': {
      '@type': 'ContactPoint',
      'contactType': 'Customer Service',
      'email': 'support@rehas.in',
    },
    'url': 'https://rehas.in',
  });
}
