import { Metadata } from 'next';
import AllReviewsPage from '../../../../../components/productDetail/allReviewsPage';
import { productMerchandiseData } from '@/data/productMerchandise';
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

  productMerchandiseData.forEach((product) => {
    products.push({
      category: product.category,
      name: product.name,
      slug: product.slug,
      meaning: product.shortDescription,
      benefit: product.benefits.join(', '),
      use: product.description,
      price: product.price,
    });
  });

  return products;
};

const getProduct = async (category: string, productSlug: string) => {
  const allProducts = getAllProducts();
  return allProducts.find(
    (p) => p.category === category && p.slug === productSlug
  );
};

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.category, params.product);

  return {
    title: product
      ? `${product.name} - Customer Reviews | REHAS`
      : 'Product Reviews | REHAS',
    description: product
      ? `Read customer reviews for ${product.name}`
      : 'View product reviews on REHAS',
  };
}

export async function generateStaticParams() {
  const allProducts = getAllProducts();
  return allProducts.map((product) => ({
    category: product.category,
    product: product.slug,
  }));
}

export default async function ReviewsPage(props: { params: Params }) {
  const params = await props.params;
  const product = await getProduct(params.category, params.product);

  if (!product) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>Product Not Found</h1>
        <p>The product you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <AllReviewsPage
      productId={product.slug}
      productName={product.name}
      category={params.category}
    />
  );
}
