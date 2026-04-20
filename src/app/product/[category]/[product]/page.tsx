import { Metadata } from 'next';
import ProductDetail from '@/components/productDetail';
import { productMerchandiseData } from '@/data/productMerchandise';

type Params = Promise<{
  category: string;
  product: string;
}>;

// Get all merchandise products
const getAllMerchandiseProducts = () => {
  return productMerchandiseData.map((product) => ({
    category: product.category,
    slug: product.slug,
  }));
};

// Generate static params only for merchandise products
export async function generateStaticParams() {
  return getAllMerchandiseProducts();
}

// Generate metadata
export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const params = await props.params;
  const { category, product: productSlug } = params;
  
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
  const productUrl = `${baseUrl}/product/${category}/${productSlug}`;

  // Enhanced keywords including cities and healing modalities
  const keywordsList = [
    productData.name,
    `${productData.name} bracelet`,
    `${productData.name} buy online`,
    `natural ${productData.name}`,
    category,
    categoryTitle,
    `buy ${category}`,
    `best ${category}`,
    'crystal healing',
    'spiritual healing',
    'holistic wellness',
    'healing crystals',
    'wellness products',
    'spiritual products',
    'energy healing',
    'chakra balancing',
    'astrology products',
    'manifestation tools',
    'meditation aid',
    'stress relief',
    'emotional healing',
    productData.zodiacSign ? `${productData.zodiacSign} bracelet` : '',
    productData.planet ? `${productData.planet} stone` : '',
    'India',
    'buy online',
    'free shipping',
    'authentic crystals',
    'certified products',
    'REHAS healing',
  ].filter(Boolean);

  return {
    title: `${productData.name} - Buy Premium ${categoryTitle} Online | REHAS`,
    description: `${productData.shortDescription} - Authentic ${categoryTitle} for holistic wellness. Fast shipping across India. ✓ Certified products.`,
    keywords: keywordsList,
    authors: [{ name: 'REHAS Wellness' }],
    creator: 'REHAS',
    publisher: 'REHAS Wellness Platform',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      title: `${productData.name} - Premium ${categoryTitle}`,
      description: productData.shortDescription,
      type: 'website',
      url: productUrl,
      images: productData.images && productData.images.length > 0 ? productData.images.map((img, idx) => ({
        url: img,
        width: 1200,
        height: 630,
        alt: `${productData.name} - Image ${idx + 1}`,
      })) : [],
    } as any,
    twitter: {
      card: 'summary_large_image',
      title: `${productData.name} - Premium ${categoryTitle}`,
      description: productData.shortDescription,
      images: productData.images && productData.images.length > 0 ? [productData.images[0]] : undefined,
    },
    other: {
      'og:price:amount': productData.price.replace(/[₹,]/g, ''),
      'og:price:currency': 'INR',
      'product:availability': 'in stock',
    },
  };
}

export default async function ProductPage(props: {
  params: Params;
}) {
  const params = await props.params;
  const { category, product: productSlug } = params;

  const productData = productMerchandiseData.find(
    (p) => p.category === category && p.slug === productSlug
  );

  if (!productData) {
    return (
      <div style={{ padding: '60px 40px', textAlign: 'center' }}>
        <h1>Product Not Found</h1>
        <p>The requested product could not be found.</p>
      </div>
    );
  }

  return <ProductDetail product={productData as any} />;
}
