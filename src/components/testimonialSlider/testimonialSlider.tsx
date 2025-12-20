'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from '@mui/icons-material';
import { testimonials, pageHeader } from '@/data/testimonial';
import LineArtBackground from '@/components/lineArtBackground/lineArtBackground';
import styles from './testimonialSlider.module.css';

export default function TestimonialSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    // Handle responsive design
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Auto-slide functionality
    useEffect(() => {
        if (!isAutoPlay) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(timer);
    }, [isAutoPlay, testimonials.length]);

    const goToPrevious = () => {
        setCurrentIndex(
            (prev) => (prev - 1 + testimonials.length) % testimonials.length
        );
        setIsAutoPlay(false);
        // Resume autoplay after 10 seconds
        setTimeout(() => setIsAutoPlay(true), 10000);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setIsAutoPlay(false);
        // Resume autoplay after 10 seconds
        setTimeout(() => setIsAutoPlay(true), 10000);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
        setIsAutoPlay(false);
        // Resume autoplay after 10 seconds
        setTimeout(() => setIsAutoPlay(true), 10000);
    };

    const currentTestimonial = testimonials[currentIndex];
    const visibleCount = isMobile ? 1 : 3;
    const visibleTestimonials = testimonials.slice(
        currentIndex,
        currentIndex + visibleCount
    );

    if (visibleTestimonials.length < visibleCount && !isMobile) {
        visibleTestimonials.push(
            ...testimonials.slice(0, visibleCount - visibleTestimonials.length)
        );
    }

    return (
        <div className={styles.testimonialWrapper}>
            {/* Hero Section with LineArt Background */}
            <LineArtBackground variant="minimal" opacity={0.05} />
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1>{pageHeader.title}</h1>
                    <p>{pageHeader.subtitle}</p>
                    <p className={styles.description}>{pageHeader.description}</p>
                </div>
            </section>

            {/* Slider Section with LineArt Background */}
            <div className={styles.sliderContainer}>

                {/* Main Featured Testimonial */}
                <div className={styles.featuredSection}>
                    <div className={styles.testimonialCard}>
                        {/* Rating Stars */}
                        <div className={styles.ratingStars}>
                            {[...Array(currentTestimonial.rating)].map((_, i) => (
                                <Star key={i} className={styles.star} />
                            ))}
                        </div>

                        {/* Testimonial Text */}
                        <blockquote className={styles.testimonialText}>
                            "{currentTestimonial.text}"
                        </blockquote>

                        {/* Author Info */}
                        <div className={styles.authorSection}>
                            <div className={styles.authorImage}>{currentTestimonial.image}</div>
                            <div className={styles.authorInfo}>
                                <h4 className={styles.authorName}>{currentTestimonial.name}</h4>
                                <p className={styles.authorRole}>{currentTestimonial.role}</p>
                                <p className={styles.authorLocation}>{currentTestimonial.location}</p>
                            </div>
                        </div>

                        {/* Service & Transformation */}
                        <div className={styles.serviceInfo}>
                            <div className={styles.serviceTag}>
                                <span className={styles.serviceLabel}>Service:</span>
                                <span className={styles.serviceValue}>{currentTestimonial.service}</span>
                            </div>
                            <div className={styles.transformationTag}>
                                <span className={styles.transformLabel}>Transformation:</span>
                                <span className={styles.transformValue}>{currentTestimonial.transformation}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Carousel Controls */}
                <div className={styles.controls}>
                    <button
                        className={styles.navButton}
                        onClick={goToPrevious}
                        aria-label="Previous testimonial"
                        title="Previous"
                    >
                        <ChevronLeft />
                    </button>

                    {/* Dot Indicators */}
                    <div className={styles.dotsContainer}>
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                className={`${styles.dot} ${index === currentIndex ? styles.active : ''
                                    }`}
                                onClick={() => goToSlide(index)}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>

                    <button
                        className={styles.navButton}
                        onClick={goToNext}
                        aria-label="Next testimonial"
                        title="Next"
                    >
                        <ChevronRight />
                    </button>
                </div>

            </div>
        </div>
    );
}
