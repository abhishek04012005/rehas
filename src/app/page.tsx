import Link from 'next/link';
import styles from './page.module.css';
import Hero from '@/components/hero/hero';
import About from '@/components/about/about';
import Contact from '@/components/contact/contact';
import Services from '@/components/services/services';
import BlogPreview from '@/components/blogPreview/blogPreview';
import Founder from '@/components/founder/founder';
import TestimonialSlider from '@/components/testimonialSlider/testimonialSlider';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Founder />
      <Services />
      <BlogPreview />
      <TestimonialSlider/>
      <Contact />
    </>
  );
}
