import Link from 'next/link';
import styles from './page.module.css';
import Hero from '@/components/hero/hero';
import About from '@/components/about/about';
import Contact from '@/components/contact/contact';
import Services from '@/components/services/services';
import BlogPreview from '@/components/blogPreview/blogPreview';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <BlogPreview />
      <Contact />
    </>
  );
}
