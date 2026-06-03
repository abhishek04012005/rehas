import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import SeoAstrologyPage from './seoAstrologyPageComponent';
import {
  getSeoAstrologyBySlug,
  getSimpleSeoPageData,
} from '@/data/seoAstrology';

interface Params {
  slug: string;
}

interface Props {
  params: Promise<Params>;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const category = getSeoAstrologyBySlug(slug);

  if (!category) {
    return {
      title: 'Not Found',
      description: 'Page not found',
    };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: category.page_meta.title,
    description: category.page_meta.description,
    keywords: category.keywords.join(', '),
    alternates: {
      canonical: `https://www.rehas.in/${slug}`,
    },
    openGraph: {
      title: category.page_meta.title,
      description: category.page_meta.description,
      url: `https://www.rehas.in/${slug}`,
      type: 'website',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200&h=630&fit=crop',
          width: 1200,
          height: 630,
          alt: category.page_meta.title,
        },
        ...previousImages,
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: category.page_meta.title,
      description: category.page_meta.description,
      images: ['https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200&h=630&fit=crop'],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const category = getSeoAstrologyBySlug(slug);

  if (!category) {
    notFound();
  }

  const pageData = getSimpleSeoPageData(category);

  return <SeoAstrologyPage data={pageData} />;
}
