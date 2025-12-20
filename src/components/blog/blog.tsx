'use client';

import { useState } from 'react';
import { Search, Bookmark, BookmarkBorder, ChevronRight } from '@mui/icons-material';
import LineArtBackground from '../lineArtBackground/lineArtBackground';
import { blogData } from '@/data/content';
import styles from './blog.module.css';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedPosts, setSavedPosts] = useState<string[]>([]);

  // Filter posts based on category and search
  const filteredPosts = blogData.posts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get featured posts
  const featuredPosts = blogData.posts.filter((post) => post.featured).slice(0, 2);

  const toggleSavePost = (postId: string) => {
    setSavedPosts((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    );
  };

  return (
    <div className={styles.blog}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <LineArtBackground variant="minimal" opacity={0.3} />
        <div className={styles.heroContent}>
          <h1>{blogData.hero.title}</h1>
          <p>{blogData.hero.subtitle}</p>
        </div>
      </section>

      {/* Main Content */}
      <div className={styles.container}>
        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className={styles.featuredSection}>
            <h2>Featured Posts</h2>
            <div className={styles.featuredGrid}>
              {featuredPosts.map((post) => (
                <a
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className={styles.featuredCard}
                >
                  <div className={styles.featuredImage}>{post.image}</div>
                  <div className={styles.featuredContent}>
                    <span className={styles.category}>{post.category}</span>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <div className={styles.featuredMeta}>
                      <span>{post.author}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Search and Filters */}
        <section className={styles.filterSection}>
          <div className={styles.searchBox}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className={styles.categoryFilter}>
            {blogData.categories.map((category) => (
              <button
                key={category}
                className={`${styles.categoryBtn} ${
                  selectedCategory === category ? styles.active : ''
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Articles Grid */}
        <section className={styles.articlesSection}>
          <div className={styles.articlesHeader}>
            <h2>All Articles</h2>
            <span className={styles.count}>{filteredPosts.length} articles</span>
          </div>

          {filteredPosts.length > 0 ? (
            <div className={styles.articlesGrid}>
              {filteredPosts.map((post) => (
                <article className={styles.articleCard} key={post.id}>
                  <div className={styles.articleImage}>{post.image}</div>
                  <div className={styles.articleContent}>
                    <span className={styles.articleCategory}>{post.category}</span>
                    <a href={`/blog/${post.id}`} className={styles.articleTitle}>
                      {post.title}
                    </a>
                    <p className={styles.articleExcerpt}>{post.excerpt}</p>
                    <div className={styles.articleMeta}>
                      <div className={styles.metaLeft}>
                        <span className={styles.author}>{post.author}</span>
                        <span className={styles.date}>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                        <span className={styles.readTime}>{post.readTime}</span>
                      </div>
                      <button
                        className={styles.saveBtn}
                        onClick={() => toggleSavePost(post.id)}
                        title={savedPosts.includes(post.id) ? 'Remove bookmark' : 'Add bookmark'}
                      >
                        {savedPosts.includes(post.id) ? <Bookmark /> : <BookmarkBorder />}
                      </button>
                    </div>
                    <a href={`/blog/${post.id}`} className={styles.readMore}>
                      Read Article <ChevronRight />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>
              <p>No articles found matching your search.</p>
              <button onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}>Reset Filters</button>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <h2>{blogData.cta.title}</h2>
          <p>{blogData.cta.subtitle}</p>
          <div className={styles.ctaButtons}>
            {blogData.cta.buttons.map((btn, idx) => (
              <a
                key={idx}
                href={btn.href}
                className={btn.type === 'primary' ? styles.primaryBtn : styles.secondaryBtn}
              >
                {btn.label}
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
