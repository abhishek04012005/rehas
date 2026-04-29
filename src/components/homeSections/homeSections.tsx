'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const About = dynamic(() => import('@/components/about'), {
  ssr: false,
  loading: () => null,
});
const Contact = dynamic(() => import('@/components/contact'), {
  ssr: false,
  loading: () => null,
});
const Healing = dynamic(() => import('@/components/healing'), {
  ssr: false,
  loading: () => null,
});
const Therapy = dynamic(() => import('@/components/therapy'), {
  ssr: false,
  loading: () => null,
});
const BlogPreview = dynamic(() => import('@/components/blogPreview'), {
  ssr: false,
  loading: () => null,
});
const Founder = dynamic(() => import('@/components/founder'), {
  ssr: false,
  loading: () => null,
});
const TestimonialSlider = dynamic(() => import('@/components/testimonialSlider'), {
  ssr: false,
  loading: () => null,
});

function LazySection({ Component }: { Component: React.ComponentType<any> }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px 0px' }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <div ref={ref}>
      {isVisible ? <Component /> : null}
    </div>
  );
}

export default function HomeSections() {
  return (
    <>
      <LazySection Component={About} />
      <LazySection Component={Founder} />
      <LazySection Component={Healing} />
      <LazySection Component={Therapy} />
      <LazySection Component={BlogPreview} />
      <LazySection Component={TestimonialSlider} />
      <LazySection Component={Contact} />
    </>
  );
}
