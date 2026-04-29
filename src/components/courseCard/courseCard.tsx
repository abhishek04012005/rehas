'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ChevronRight from '@mui/icons-material/ChevronRight';
import EmojiEvents from '@mui/icons-material/EmojiEvents';
import AutoStories from '@mui/icons-material/AutoStories';
import AutoStoriesOutlined from '@mui/icons-material/AutoStoriesOutlined';
import AudiotrackOutlined from '@mui/icons-material/AudiotrackOutlined';
import AutoAwesome from '@mui/icons-material/AutoAwesome';
import EmojiEventsOutlined from '@mui/icons-material/EmojiEventsOutlined';
import Favorite from '@mui/icons-material/Favorite';
import Psychology from '@mui/icons-material/Psychology';
import Spa from '@mui/icons-material/Spa';
import StarOutlined from '@mui/icons-material/StarOutlined';
import CalculateOutlined from '@mui/icons-material/CalculateOutlined';
import CasinoOutlined from '@mui/icons-material/CasinoOutlined';
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

  const iconMap = {
    AutoStoriesOutlined,
    AudiotrackOutlined,
    AutoAwesome,
    EmojiEventsOutlined,
    Favorite,
    Psychology,
    Spa,
    StarOutlined,
    CalculateOutlined,
    CasinoOutlined,
    PokerOutlined: CasinoOutlined,
  } as const;

  const IconComponent = iconMap[image as keyof typeof iconMap] || AutoStoriesOutlined;

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
