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

  return {
    title: `${productData.name} | Premium ${category.charAt(0).toUpperCase() + category.slice(1)} Products | REHAS`,
    description: productData.shortDescription,
    keywords: [
      productData.name,
      category,
      'product',
      'wellness',
      'healing',
      'REHAS',
    ],
    openGraph: {
      title: `${productData.name} | REHAS`,
      description: productData.shortDescription,
      type: 'website',
      images: productData.images && productData.images.length > 0 ? [{
        url: productData.images[0],
        width: 1200,
        height: 630,
        alt: productData.name,
      }] : undefined,
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
