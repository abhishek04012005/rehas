import { Metadata } from 'next';
import ProductDetail from '@/components/productDetail';
import { productMerchandiseData } from '@/data/productMerchandise';
import { 
  generateCityProductSEO, 
  generateCityProductUrl,
} from '@/data/cityProductSEO';
import { cities } from '@/data/cities';

type Params = Promise<{
  category: string;
  product: string;
  city: string;
}>;

// Make route dynamic (on-demand rendering) to avoid prerendering 500+ pages
export const dynamicParams = true;

// Generate metadata with city-specific SEO
export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const params = await props.params;
  const { category, product: productSlug, city: citySlug } = params;

  // Convert city slug back to proper city name
  const cityName = cities.find(
    (c) => c.name.toLowerCase().replace(/\s+/g, '-') === citySlug
  )?.name;

  if (!cityName) {
    return {
      title: 'City Not Found | REHAS',
      description: 'The requested city is not available.',
    };
  }

  const productData = productMerchandiseData.find(
    (p) => p.category === category && p.slug === productSlug
  );

  if (!productData) {
    return {
      title: 'Product Not Found | REHAS',
      description: 'The requested product could not be found.',
    };
  }

  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rehas.in';
  const productUrl = generateCityProductUrl(category, productSlug, cityName);
  
  const cityData = cities.find((c) => c.name === cityName);
  const state = cityData?.state || 'India';

  // Generate city-specific SEO content
  const citySEO = generateCityProductSEO(
    productData.name,
    productData.shortDescription,
    category,
    cityName,
    productData.benefits ? productData.benefits.join(', ') : undefined,
    productData.zodiacSign
  );

  // Combine general and city-specific keywords
  const keywordsList = [
    productData.name,
    `${productData.name} in ${cityName}`,
    `${productData.name} ${categoryTitle}`,
    `buy ${productData.name} ${cityName}`,
    `${categoryTitle} in ${cityName}`,
    ...citySEO.keywords,
    ...citySEO.longTailKeywords.slice(0, 10),
  ].filter(Boolean);

  return {
    title: citySEO.productTitle,
    description: citySEO.productDescription,
    keywords: keywordsList,
    authors: [{ name: 'REHAS Wellness' }],
    creator: 'REHAS',
    publisher: 'REHAS Wellness Platform',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      title: citySEO.productTitle,
      description: citySEO.productDescription,
      type: 'website',
      url: productUrl,
      images: productData.images && productData.images.length > 0 ? productData.images.map((img, idx) => ({
        url: img,
        width: 1200,
        height: 630,
        alt: `${productData.name} in ${cityName} - Image ${idx + 1}`,
      })) : [],
    } as any,
    twitter: {
      card: 'summary_large_image',
      title: citySEO.productTitle,
      description: citySEO.productDescription,
      images: productData.images && productData.images.length > 0 ? [productData.images[0]] : undefined,
    },
    other: {
      'og:price:amount': productData.price.replace(/[₹,]/g, ''),
      'og:price:currency': 'INR',
      'product:availability': 'in stock',
      'geo:region': `IN-${state.replace(/\s+/g, '')}`,
      'geo:placename': cityName,
    },
  };
}

export default async function CityProductPage(props: {
  params: Params;
}) {
  const params = await props.params;
  const { category, product: productSlug, city: citySlug } = params;

  // Convert city slug back to proper city name
  const cityName = cities.find(
    (c) => c.name.toLowerCase().replace(/\s+/g, '-') === citySlug
  )?.name;

  const productData = productMerchandiseData.find(
    (p) => p.category === category && p.slug === productSlug
  );

  if (!productData || !cityName) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800">Product not found</h1>
      </div>
    );
  }

  return (
    <div>
      <ProductDetail product={productData} city={cityName} />
    </div>
  );
}
