'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import CourseCard from '@/components/courseCard/courseCard';
import LineArtBackground from '@/components/lineArtBackground/lineArtBackground';
import {
  SchoolOutlined,
  CheckCircle,
  EmojiEvents,
  GroupOutlined,
  AllInclusiveOutlined,
  RocketLaunchOutlined,
  Search,
  Clear,
  FilterList,
} from '@mui/icons-material';
import styles from './courseListing.module.css';

interface CourseListingProps {
  title: string;
  subtitle: string;
  description: string;
  courses: Array<{
    name: string;
    description: string;
    price: string;
    href: string;
    image: string;
    imageUrl?: string;
    level?: string;
  }>;
}

export default function CourseListing({
  title,
  subtitle,
  description,
  courses,
}: CourseListingProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'none' | 'asc' | 'desc'>('asc');

  // Extract unique levels from courses
  const uniqueLevels = Array.from(
    new Set(courses.map((course) => course.level).filter(Boolean))
  ) as string[];

  let filteredCourses = courses.filter((course) => {
    // Search filter
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.level?.toLowerCase().includes(searchQuery.toLowerCase());

    // Level filter
    const matchesLevel =
      selectedLevels.length === 0 || (course.level && selectedLevels.includes(course.level));

    return matchesSearch && matchesLevel;
  });

  // Sort by price
  if (sortBy !== 'none') {
    filteredCourses = [...filteredCourses].sort((a, b) => {
      const priceA = parseFloat(a.price.replace(/[₹,]/g, '')) || 0;
      const priceB = parseFloat(b.price.replace(/[₹,]/g, '')) || 0;
      return sortBy === 'asc' ? priceA - priceB : priceB - priceA;
    });
  }

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const toggleLevelFilter = (level: string) => {
    setSelectedLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedLevels([]);
    setSortBy('none');
  };

  return (
    <main className={styles.container}>
      {/* Header */}
      <section className={styles.hero}>
        <LineArtBackground />
        <div className={styles.heroContent}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
          <p className={styles.description}>{description}</p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className={styles.coursesSection}>
        <div className={styles.coursesContainer}>
          <h2>Choose Your Learning Path</h2>
          <p className={styles.sectionSubtitle}>
            Select a course to explore detailed curriculum, pricing options, and enrollment details
          </p>

          {/* Search and Filter Bar */}
          <div className={styles.filterBarWrapper}>
            {/* Search Filter */}
            <div className={styles.searchContainer}>
              <div className={styles.searchInputWrapper}>
                <Search sx={{ fontSize: 20 }} />
                <input
                  type="text"
                  placeholder="Search courses by name, description, or level..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className={styles.clearButton}
                    aria-label="Clear search"
                  >
                    <Clear sx={{ fontSize: 18 }} />
                  </button>
                )}
              </div>
              {searchQuery && (
                <p className={styles.searchResults}>
                  Found {filteredCourses.length} of {courses.length} courses
                </p>
              )}
            </div>


          </div>

          {/* Filter Section */}
          {uniqueLevels.length > 0 && (
            <div className={styles.filterContainer}>
              <div className={styles.filters}>
                <div className={styles.filterHeader}>
                  <FilterList sx={{ fontSize: 20, color: 'var(--primary)' }} />
                  <h3>Filter by Level</h3>
                </div>
                <div className={styles.filterButtons}>
                  {uniqueLevels.map((level) => (
                    <button
                      key={level}
                      onClick={() => toggleLevelFilter(level)}
                      className={`${styles.filterButton} ${selectedLevels.includes(level) ? styles.activeFilter : ''
                        }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
                {(selectedLevels.length > 0 || searchQuery) && (
                  <div className={styles.filterStats}>
                    <p>
                      Showing {filteredCourses.length} of {courses.length} courses
                      {selectedLevels.length > 0 && ` • ${selectedLevels.length} level(s) selected`}
                    </p>
                    <button onClick={handleClearFilters} className={styles.clearFiltersButton}>
                      Clear All Filters
                    </button>

                  </div>

                )}
              </div>
              {/* Sort Filter */}
              {/* <div className={styles.sortWrapper}>
                <label htmlFor="courseSortSelect" className={styles.sortLabel}>Sort by Price:</label>
                <select
                  id="courseSortSelect"
                  className={styles.sortSelect}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'none' | 'asc' | 'desc')}
                >
                  <option value="none">Default</option>
                  <option value="asc">Low to High</option>
                  <option value="desc">High to Low</option>
                </select>
              </div> */}

              <div className={styles.sortWrapper}>
                <span className={styles.sortLabel}>Sort by Price:</span>
                <div className={styles.sortButtons}>
                  <button
                    type="button"
                    className={`${styles.sortButton} ${sortBy === 'asc' ? styles.active : ''}`}
                    onClick={() => setSortBy('asc')}
                  >
                    <span className={styles.sortIcon}>↑</span> Low to High
                  </button>
                  <button
                    type="button"
                    className={`${styles.sortButton} ${sortBy === 'desc' ? styles.active : ''}`}
                    onClick={() => setSortBy('desc')}
                  >
                    <span className={styles.sortIcon}>↓</span> High to Low
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* Courses Grid */}
          <div className={styles.courseGrid}>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course, index) => (
                <CourseCard
                  key={index}
                  name={course.name}
                  description={course.description}
                  price={course.price}
                  href={course.href}
                  image={course.image}
                  imageUrl={course.imageUrl}
                  level={course.level}
                />
              ))
            ) : (
              <div className={styles.noResults}>
                <p>No courses found matching "{searchQuery}"</p>
                <button onClick={handleClearSearch} className={styles.resetButton}>
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className={styles.whyChoose}>
        <div className={styles.whyChooseContainer}>
          <h2>Why Choose Our Healing Courses?</h2>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefit}>
              <SchoolOutlined sx={{ fontSize: 48, color: 'var(--primary)' }} />
              <h3>Expert Instructors</h3>
              <p>Learn from certified masters with 20+ years of experience in healing practices</p>
            </div>
            <div className={styles.benefit}>
              <CheckCircle sx={{ fontSize: 48, color: 'var(--primary)' }} />
              <h3>Hands-On Training</h3>
              <p>Practical learning with real-world applications and supervised practice</p>
            </div>
            <div className={styles.benefit}>
              <EmojiEvents sx={{ fontSize: 48, color: 'var(--primary)' }} />
              <h3>Recognized Certification</h3>
              <p>Industry-recognized certificates upon successful course completion</p>
            </div>
            <div className={styles.benefit}>
              <GroupOutlined sx={{ fontSize: 48, color: 'var(--primary)' }} />
              <h3>Community Support</h3>
              <p>Join a supportive community of healers and practitioners</p>
            </div>
            <div className={styles.benefit}>
              <AllInclusiveOutlined sx={{ fontSize: 48, color: 'var(--primary)' }} />
              <h3>Lifetime Access</h3>
              <p>Lifetime access to course materials and ongoing updates</p>
            </div>
            <div className={styles.benefit}>
              <RocketLaunchOutlined sx={{ fontSize: 48, color: 'var(--primary)' }} />
              <h3>Business Growth</h3>
              <p>Guidance on building and growing your professional healing practice</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
