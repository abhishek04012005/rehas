'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronRight, EmojiEvents, AutoStories } from '@mui/icons-material';
import * as MuiIcons from '@mui/icons-material';
import styles from './courseCard.module.css';

interface CourseCardProps {
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  image?: string;
  imageUrl?: string;
  href: string;
  level?: string;
}

export default function CourseCard({
  name,
  description,
  price,
  originalPrice,
  image = 'AutoStoriesOutlined',
  imageUrl,
  href,
  level = 'All Levels',
}: CourseCardProps) {
  const router = useRouter();

  const handleViewCourse = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(href);
  };

  // Get the MUI icon component by name
  const IconComponent = (MuiIcons as any)[image] || MuiIcons.AutoStoriesOutlined;

  return (
    <div className={styles.card}>
      <div className={styles.imageArea}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            width={400}
            height={240}
            className={styles.courseImage}
            priority={false}
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            <IconComponent sx={{ fontSize: 56 }} />
          </div>
        )}
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
            <div className={styles.priceWrapper}>
              {originalPrice && (
                <span className={styles.originalPrice}>{originalPrice}</span>
              )}
              <span className={styles.price}>{price}</span>
            </div>
          </div>
        </div>

        <button onClick={handleViewCourse} className={styles.viewButton}>
          <AutoStories sx={{ fontSize: 16 }} />
          View Course
          <ChevronRight sx={{ fontSize: 18 }} />
        </button>
      </div>
    </div>
  );
}
