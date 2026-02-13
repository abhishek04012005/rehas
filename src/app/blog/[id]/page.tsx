import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogDetail from '@/components/blogDetail';
import { blogData } from '@/data/content';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const post = blogData.posts.find((p) => p.id === params.id);

  if (!post) {
    return {
      title: 'Blog Article Not Found | REHAS',
      description: 'The blog post you are looking for does not exist.',
    };
  }

  const fullTitle = `${post.title} | Blog | REHAS`;
  const fullUrl = `https://rehas.in/blog/${params.id}`;

  return {
    title: fullTitle,
    description: post.excerpt,
    keywords: post.keywords ? Array.from(post.keywords) : ['blog', 'article', 'REHAS'],
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: fullTitle,
      description: post.excerpt,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
          type: 'image/jpeg',
        },
      ],
      url: fullUrl,
      type: 'article',
      siteName: 'REHAS',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: post.excerpt,
      images: [post.image],
      creator: '@rehas_in',
    },
    alternates: {
      canonical: fullUrl,
    },
    authors: [
      {
        name: post.author,
      },
    ],
  };
}

export async function generateStaticParams() {
  return blogData.posts.map((post) => ({
    id: post.id,
  }));
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function BlogDetailPage(props: Props) {
  const params = await props.params;
  const post = blogData.posts.find((p) => p.id === params.id);

  if (!post) {
    notFound();
  }

  return <BlogDetail />;
}
