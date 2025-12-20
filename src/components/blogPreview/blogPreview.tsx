'use client';

import { ChevronRight } from '@mui/icons-material';
import { blogData } from '@/data/content';
import styles from './blogPreview.module.css';

export default function BlogPreview() {
  // Show only the first 4 blog posts on the homepage
  const previewPosts = blogData.posts.slice(0, 4);

  return (
    <div className={styles.blogPreview}>
      <div className={styles.container}>
        {/* Header Section - Centered */}
        <div className={styles.header}>
          <h2>Latest Insights & Articles</h2>
          <p>Explore our curated collection of articles on astrology, numerology, and holistic wellness</p>
          <a href="/blog" className={styles.viewAllBtn}>
            View All Articles <ChevronRight />
          </a>
        </div>

        {/* Posts Grid */}
        <div className={styles.postsGrid}>
          {previewPosts.map((post) => (
            <a
              key={post.id}
              href={`/blog/${post.id}`}
              className={styles.postCard}
            >
              <div className={styles.postImage}>{post.image}</div>
              <div className={styles.postContent}>
                <span className={styles.category}>{post.category}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className={styles.postMeta}>
                  <span className={styles.author}>{post.author}</span>
                  <span className={styles.readTime}>{post.readTime}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA Section */}
        <div className={styles.ctaSection}>
          <h3>Discover Your Path to Wellness</h3>
          <p>Join thousands of people exploring astrology, numerology, and healing practices</p>
          <a href="/blog" className={styles.ctaBtn}>
            Explore More Articles
          </a>
        </div>
      </div>
    </div>
  );
}
