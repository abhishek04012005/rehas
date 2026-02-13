import { Metadata } from 'next';
import ProductDetail from '@/components/productDetail';
import { productHealingData } from '@/data/productHealing';
import { productTherapyData } from '@/data/productTherapy';
import { productAstrologyData } from '@/data/productAstrology';

type Params = Promise<{
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
        // Get price from sessions if available
        const sessionPrice = data.sessions?.types?.[index]?.price || '₹999';
        products.push({
          category,
          name: product.name,
          slug: product.name.toLowerCase().replace(/\s+/g, '-'),
          meaning: product.meaning,
          benefit: product.benefit,
          use: product.use,
          price: sessionPrice,
        });
      });
    }
  });

  return products;
};

// Generate static params for all products
export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    category: product.category,
    product: product.slug,
  }));
}

// Generate metadata
export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const params = await props.params;
  const { category, product: productSlug } = params;
  
  const products = getAllProducts();
  const productData = products.find(
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
    description: productData.meaning,
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
      description: productData.meaning,
      type: 'website',
    },
  };
}

export default async function ProductPage(props: {
  params: Params;
}) {
  const params = await props.params;
  const { category, product: productSlug } = params;

  const products = getAllProducts();
  const productData = products.find(
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

  return (
    <ProductDetail
      productName={productData.name}
      category={category}
      meaning={productData.meaning}
      benefit={productData.benefit}
      use={productData.use}
      price={productData.price}
    />
  );
}
