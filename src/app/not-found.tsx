import Link from 'next/link';
import { Home, AutoAwesome, FavoriteBorder, Description, Mail, School } from '@mui/icons-material';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.errorCode}>404</div>
          <h1>Page Not Found</h1>
          <p>The page you're looking for seems to have drifted away like a lost star. Don't worry, we'll guide you back on track.</p>
          
          <div className={styles.suggestions}>
            <h3>Here are some helpful links:</h3>
            <div className={styles.links}>
              <Link href="/" className={styles.link}><Home sx={{ fontSize: 20 }} /> Return Home</Link>
              <Link href="/astrology" className={styles.link}><AutoAwesome sx={{ fontSize: 20 }} /> Explore Astrology</Link>
              <Link href="/wellness" className={styles.link}><FavoriteBorder sx={{ fontSize: 20 }} /> Discover Wellness</Link>
              <Link href="/blog" className={styles.link}><Description sx={{ fontSize: 20 }} /> Read Our Blog</Link>
              <Link href="/contact" className={styles.link}><Mail sx={{ fontSize: 20 }} /> Contact Us</Link>
              <Link href="/consultation" className={styles.link}><School sx={{ fontSize: 20 }} /> Book Consultation</Link>
            </div>
          </div>

          <div className={styles.cosmic}>
            <div className={styles.star}><AutoAwesome sx={{ fontSize: 24 }} /></div>
            <div className={styles.star}><AutoAwesome sx={{ fontSize: 28 }} /></div>
            <div className={styles.star}><AutoAwesome sx={{ fontSize: 22 }} /></div>
          </div>
        </div>
      </div>
    </main>
  );
}
