'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowBack, Share, Bookmark, BookmarkBorder, ChevronRight, Twitter, Facebook, LinkedIn } from '@mui/icons-material';
import LineArtBackground from '../lineArtBackground/lineArtBackground';
import { blogData } from '@/data/content';
import styles from './blogDetail.module.css';

export default function BlogDetail() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;
  const [shareUrls, setShareUrls] = useState({
    facebook: '',
    linkedin: '',
    twitter: '',
  });
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // Get current URL on client side only
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const title = encodeURIComponent('Check out this amazing blog post on REHAS');
    setShareUrls({
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${title}&url=${encodeURIComponent(currentUrl)}`,
    });
  }, []);

  const post = blogData.posts.find((p) => p.id === postId);

  if (!post) {
    return (
      <div className={styles.blogDetail}>
        <div className={styles.notFound}>
          <div className={styles.notFoundContent}>
            <h1>Post Not Found</h1>
            <p>The blog post you're looking for doesn't exist.</p>
            <button onClick={() => router.push('/blog')} className={styles.backBtn}>
              <ArrowBack /> Back to Blog
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Get related posts (same category, different post)
  const relatedPosts = blogData.posts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  // Extract headings from content for table of contents
  const extractHeadings = (content: string) => {
    const headingMatches = content.match(/^##\s+(.+)$/gm) || [];
    return headingMatches.map((match) => ({
      text: match.replace(/^##\s/, ''),
      id: match.replace(/^##\s/, '').toLowerCase().replace(/\s+/g, '-'),
    }));
  };

  const headings = extractHeadings(post.fullContent);

  return (
    <div className={styles.blogDetail}>
      {/* Back Button */}
      <div className={styles.backButtonContainer}>
        <button onClick={() => router.back()} className={styles.backBtn}>
          <ArrowBack /> Back
        </button>
      </div>

      {/* Hero Section */}
      <section className={styles.hero}>
        <LineArtBackground variant="minimal" opacity={0.3} />
        <div className={styles.heroContent}>
          <span className={styles.category}>{post.category}</span>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          <div className={styles.heroMeta}>
            <span className={styles.author}>{post.author}</span>
            <span className={styles.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span className={styles.readTime}>{post.readTime}</span>
          </div>
        </div>
        <div className={styles.featuredImage}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            className={styles.image}
            priority
          />
        </div>
      </section>

      {/* Article Content */}
      <article className={styles.articleContent}>
        <div className={styles.content}>
          {/* Main Content */}
          <div className={styles.mainContent}>
            <div
              className={styles.contentBody}
              dangerouslySetInnerHTML={{
                __html: post.fullContent
                  .split('\n\n')
                  .map((paragraph) => {
                    // Handle headings
                    if (paragraph.startsWith('##')) {
                      return `<h2>${paragraph.replace(/^##\s/, '')}</h2>`;
                    }
                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                      return `<strong>${paragraph.replace(/\*\*/g, '')}</strong>`;
                    }
                    // Handle lists
                    if (paragraph.startsWith('-') || paragraph.startsWith('1.')) {
                      const items = paragraph.split('\n').filter((line) => line.trim());
                      const listItems = items.map((item) => {
                        const content = item.replace(/^[-1-9]+\.\s/, '');
                        return `<li>${content}</li>`;
                      });
                      return `<ul>${listItems.join('')}</ul>`;
                    }
                    return `<p>${paragraph}</p>`;
                  })
                  .join(''),
              }}
            />
          </div>

          {/* Sidebar */}
          <aside className={styles.sidebar}>
            {/* Table of Contents */}
            {headings.length > 0 && (
              <div className={styles.tocBox}>
                <h3>Contents</h3>
                <nav className={styles.toc}>
                  {headings.map((heading) => (
                    <a key={heading.id} href={`#${heading.id}`} className={styles.tocLink}>
                      {heading.text}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Share */}
            <div className={styles.shareBox}>
              <h3>Share This Post</h3>
              <div className={styles.shareButtons}>
                <a
                  href={shareUrls.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.shareBtn}
                  title="Share on Twitter/X"
                  aria-label="Share on Twitter"
                >
                  <Twitter />
                </a>
                <a
                  href={shareUrls.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.shareBtn}
                  title="Share on Facebook"
                  aria-label="Share on Facebook"
                >
                  <Facebook />
                </a>
                <a
                  href={shareUrls.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.shareBtn}
                  title="Share on LinkedIn"
                  aria-label="Share on LinkedIn"
                >
                  <LinkedIn />
                </a>
              </div>
            </div>

            {/* Keywords */}
            {post.keywords && post.keywords.length > 0 && (
              <div className={styles.keywordsBox}>
                <h3>Tags</h3>
                <div className={styles.keywords}>
                  {post.keywords.map((keyword) => (
                    <span key={keyword} className={styles.keyword}>
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className={styles.ctaBox}>
              <h3>Ready to Begin?</h3>
              <p>Explore our services and start your healing journey today.</p>
              <a href="/enquiry" className={styles.ctaBtn}>
                View Services <ChevronRight />
              </a>
            </div>
          </aside>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className={styles.relatedSection}>
          <div className={styles.container}>
            <h2>Related Articles</h2>
            <div className={styles.relatedGrid}>
              {relatedPosts.map((relatedPost) => (
                <a
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.id}`}
                  className={styles.relatedCard}
                >
                  <div className={styles.relatedImage}>
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      className={styles.image}
                    />
                  </div>
                  <div className={styles.relatedContent}>
                    <h3>{relatedPost.title}</h3>
                    <p>{relatedPost.excerpt}</p>
                    <div className={styles.relatedMeta}>
                      <span>{relatedPost.author}</span>
                      <span>{relatedPost.readTime}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Blog */}
      <section className={styles.backSection}>
        <div className={styles.container}>
          <a href="/blog" className={styles.backLink}>
            <ArrowBack /> Back to All Articles
          </a>
        </div>
      </section>
    </div>
  );
}
