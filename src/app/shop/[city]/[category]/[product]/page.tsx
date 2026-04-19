import { Metadata } from 'next';
import ProductDetail from '@/components/productDetail';
import { productHealingData } from '@/data/productHealing';
import { productTherapyData } from '@/data/productTherapy';
import { productAstrologyData } from '@/data/productAstrology';
import { productMerchandiseData } from '@/data/productMerchandise';
import { cities } from '@/data/cities';

const siteConfig = {
  domain: 'https://rehas.in',
  name: 'REHAS',
  description: 'Premium wellness, healing, and spiritual products online',
};

type Params = Promise<{
  city: string;
  category: string;
  product: string;
}>;

// Get all products from data files
const getAllProducts = () => {
  const allProducts = [
    { category: 'healing', data: productHealingData },
    { category: 'therapy', data: productTherapyData },
    { category: 'astrology', data: productAstrologyData },
  ];

  const products: any[] = [];
  allProducts.forEach(({ category, data }) => {
    if (data.practices?.list) {
      data.practices.list.forEach((product: any, index: number) => {
        const sessionPrice = data.sessions?.types?.[index]?.price || '₹999';
        products.push({
          category,
          name: product.name,
          slug: product.name.toLowerCase().replace(/\s+/g, '-'),
          meaning: product.meaning,
          benefit: product.benefit,
          use: product.use,
          price: sessionPrice,
          image: 'https://rehas.in/og-image.jpg',
        });
      });
    }
  });

  productMerchandiseData.forEach((product) => {
    products.push({
      category: product.category,
      name: product.name,
      slug: product.slug,
      meaning: product.shortDescription,
      benefit: product.benefits.join(', '),
      use: product.description,
      price: product.price,
      image: product.images?.[0] || 'https://rehas.in/og-image.jpg',
    });
  });

  return products;
};

// Generate static params for city + product combinations
export async function generateStaticParams() {
  const products = getAllProducts();
  const cityList = cities.map(city => ({
    slug: city.name.toLowerCase().replace(/\s+/g, '-'),
    name: city.name,
    state: city.state,
  }));
  
  const params: Array<{ city: string; category: string; product: string }> = [];
  
  cityList.forEach(city => {
    products.forEach(product => {
      params.push({
        city: city.slug,
        category: product.category,
        product: product.slug,
      });
    });
  });

  // Limit to reasonable number for build time
  return params.slice(0, 100);
}

// Generate metadata with location-based SEO
export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const params = await props.params;
  const { city: citySlug, category, product: productSlug } = params;
  
  // Convert slug back to find city
  const cityName = cities.find(c => 
    c.name.toLowerCase().replace(/\s+/g, '-') === citySlug
  );
  
  const products = getAllProducts();
  const productData = products.find(
    (p) => p.category === category && p.slug === productSlug
  );

  if (!productData || !cityName) {
    return {
      title: 'Product Not Found | REHAS',
      description: 'The requested product could not be found on REHAS.',
    };
  }

  const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);
  const productUrl = `${siteConfig.domain}/shop/${citySlug}/${category}/${productSlug}`;
  
  // Location-specific title for better local SEO
  const title = `${productData.name} in ${cityName.name}, ${cityName.state} | Buy Online at REHAS`;
  
  // Location-specific description
  const description = `Get ${productData.name} in ${cityName.name}, ${cityName.state}. Premium ${categoryLabel} product by REHAS. ${productData.meaning}. Fast delivery. ₹${productData.price}`;

  // Enhanced keywords with location
  const categoryKeywords: { [key: string]: string[] } = {
    bracelet: ['crystal bracelet', 'healing bracelet', 'gemstone bracelet', 'chakra bracelet', 'spiritual jewelry'],
    yantra: ['sacred yantra', 'healing yantra', 'spiritual yantra'],
    healing: ['healing session', 'energy healing', 'spiritual healing'],
    therapy: ['therapy session', 'alternative therapy', 'healing therapy'],
    astrology: ['astrology session', 'astrological consultation', 'vedic astrology'],
    service: ['wellness service', 'spiritual service', 'healing service'],
  };

  const baseKeywords = categoryKeywords[category] || [];
  const keywords = [
    productData.name,
    `${productData.name} in ${cityName.name}`,
    `buy ${productData.name}`,
    category,
    `${category} in ${cityName.name}`,
    cityName.name,
    cityName.state,
    'REHAS',
    'wellness',
    'spiritual',
    'healing',
    ...baseKeywords,
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productData.name,
    description: description,
    brand: {
      '@type': 'Brand',
      name: siteConfig.name,
    },
    url: productUrl,
    image: productData.image,
    price: productData.price.replace(/[₹,]/g, ''),
    priceCurrency: 'INR',
    areaServed: {
      '@type': 'City',
      name: cityName.name,
      state: cityName.state,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      reviewCount: '100',
    },
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'INR',
      price: productData.price.replace(/[₹,]/g, ''),
      availability: 'https://schema.org/InStock',
      areaServed: {
        '@type': 'City',
        name: cityName.name,
      },
    },
  };

  return {
    title: title,
    description: description,
    keywords: keywords,
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      title: `${productData.name} in ${cityName.name} | REHAS`,
      description: description,
      url: productUrl,
      images: [
        {
          url: productData.image,
          width: 1200,
          height: 630,
          alt: productData.name,
        },
      ],
      siteName: siteConfig.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${productData.name} in ${cityName.name} | REHAS`,
      description: description,
      images: [productData.image],
    },
    other: {
      'og:price:amount': productData.price.replace(/[₹,]/g, ''),
      'og:price:currency': 'INR',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function CityProductPage(props: { params: Params }) {
  const params = await props.params;
  const { city: citySlug, category, product: productSlug } = params;

  const products = getAllProducts();
  const product = products.find(
    (p) => p.category === category && p.slug === productSlug
  );

  if (!product) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>Product Not Found</h1>
        <p>The product you are looking for does not exist.</p>
      </div>
    );
  }

  // Find complete product data for passing to component
  let detailedProduct: any = product;

  // Try to find merchandise product with full details
  const merchandiseProduct = productMerchandiseData.find((p) => p.slug === productSlug);
  if (merchandiseProduct) {
    detailedProduct = { ...product, ...merchandiseProduct };
  }

  // Convert slug back to find city
  const cityName = cities.find(c => 
    c.name.toLowerCase().replace(/\s+/g, '-') === citySlug
  );
  
  const productUrl = `${siteConfig.domain}/shop/${citySlug}/${category}/${productSlug}`;
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.meaning,
    brand: {
      '@type': 'Brand',
      name: siteConfig.name,
    },
    url: productUrl,
    image: product.image,
    price: product.price.replace(/[₹,]/g, ''),
    priceCurrency: 'INR',
    areaServed: cityName ? {
      '@type': 'City',
      name: cityName.name,
      state: cityName.state,
    } : undefined,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      reviewCount: '100',
    },
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'INR',
      price: product.price.replace(/[₹,]/g, ''),
      availability: 'https://schema.org/InStock',
      areaServed: cityName ? {
        '@type': 'City',
        name: cityName.name,
      } : undefined,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetail product={{ ...detailedProduct, slug: productSlug }} />
    </>
  );
}
