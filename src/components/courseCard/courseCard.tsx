'use client';

import Link from 'next/link';
import { ChevronRight, EmojiEvents } from '@mui/icons-material';
import styles from './courseCard.module.css';

interface CourseCardProps {
  name: string;
  description: string;
  price: string;
  image?: string;
  href: string;
  level?: string;
}

export default function CourseCard({
  name,
  description,
  price,
  image = '📚',
  href,
  level = 'All Levels',
}: CourseCardProps) {
  return (
    <Link href={href} className={styles.card}>
      <div className={styles.imageArea}>
        <div className={styles.imagePlaceholder}>{image}</div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.description}>{description}</p>

        <div className={styles.footer}>
          <div className={styles.levelPrice}>
            <span className={styles.level}>
              <EmojiEvents sx={{ fontSize: 14 }} />
              {level}
            </span>
            <span className={styles.price}>{price}</span>
          </div>
          <div className={styles.arrow}>
            <ChevronRight sx={{ fontSize: 20 }} />
          </div>
        </div>
      </div>
    </Link>
  );
}
