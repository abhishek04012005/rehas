'use client';

import LineArtBackground from '../lineArtBackground/lineArtBackground';
import { aboutData } from '@/data/content';
import { rehasData } from '@/data/rehasData';
import styles from './about.module.css';
import { 
  FavoriteBorder, 
  LocalFireDepartment, 
  Favorite,
  Visibility,
  AutoAwesome,
  Lightbulb,
  TrendingUp
} from '@mui/icons-material';

const CHAKRA_ICONS = [
  FavoriteBorder,  // Root chakra
  LocalFireDepartment,  // Sacral chakra
  Lightbulb,  // Solar plexus
  Favorite,  // Heart chakra
  AutoAwesome,  // Throat chakra
  Visibility,  // Third eye
  TrendingUp  // Crown chakra
];

const CHAKRA_COLORS = [
  '#e74c3c', // Red
  '#e67e22', // Orange
  '#f39c12', // Yellow
  '#27ae60', // Green
  '#3498db', // Blue
  '#9b59b6', // Purple
  '#2c3e50'  // Violet
];

export default function About() {
  return (
    <div className={styles.about}>
      <LineArtBackground variant="minimal" opacity={0.05} />
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>{aboutData.hero.title}</h1>
          <p>{aboutData.hero.subtitle}</p>
        </div>
      </section>

      {/* Main Content - Left Chakra, Right Content */}
      <div className={styles.mainContent}>
        {/* Left Side - Solar System Visualization */}
        <div className={styles.chakraSection}>
          <div className={styles.chakraContainer}>
            <div className={styles.solarSystem}>
              {/* Sun */}
              <div className={styles.sun}></div>
              
              {/* Orbit Paths */}
              <div className={styles.orbit} style={{ '--orbit-size': '120px' } as any}></div>
              <div className={styles.orbit} style={{ '--orbit-size': '160px' } as any}></div>
              <div className={styles.orbit} style={{ '--orbit-size': '200px' } as any}></div>
              <div className={styles.orbit} style={{ '--orbit-size': '240px' } as any}></div>
              <div className={styles.orbit} style={{ '--orbit-size': '280px' } as any}></div>
              <div className={styles.orbit} style={{ '--orbit-size': '320px' } as any}></div>
              <div className={styles.orbit} style={{ '--orbit-size': '360px' } as any}></div>
              <div className={styles.orbit} style={{ '--orbit-size': '400px' } as any}></div>
              <div className={styles.orbit} style={{ '--orbit-size': '440px' } as any}></div>
              
              {/* Planets */}
              {/* Mercury - Red/Root Chakra */}
              <div className={styles.planet} style={{ '--orbit-size': '120px', '--duration': '4s', '--size': '8px', '--color': '#e74c3c' } as any}>
                <div className={styles.planetBody}></div>
              </div>
              
              {/* Venus - Orange/Sacral Chakra */}
              <div className={styles.planet} style={{ '--orbit-size': '160px', '--duration': '7s', '--size': '14px', '--color': '#e67e22' } as any}>
                <div className={styles.planetBody}></div>
              </div>
              
              {/* Earth - Yellow/Solar Plexus Chakra */}
              <div className={styles.planet} style={{ '--orbit-size': '200px', '--duration': '10s', '--size': '15px', '--color': '#f39c12' } as any}>
                <div className={styles.planetBody}></div>
              </div>
              
              {/* Mars - Green/Heart Chakra */}
              <div className={styles.planet} style={{ '--orbit-size': '240px', '--duration': '13s', '--size': '12px', '--color': '#27ae60' } as any}>
                <div className={styles.planetBody}></div>
              </div>
              
              {/* Jupiter - Blue/Throat Chakra */}
              <div className={styles.planet} style={{ '--orbit-size': '280px', '--duration': '16s', '--size': '28px', '--color': '#3498db' } as any}>
                <div className={styles.planetBody}></div>
              </div>
              
              {/* Saturn - Purple/Third Eye Chakra with rings */}
              <div className={styles.planet} style={{ '--orbit-size': '320px', '--duration': '19s', '--size': '24px', '--color': '#9b59b6' } as any}>
                <div className={styles.planetBody + ' ' + styles.withRing}></div>
              </div>
              
              {/* Uranus - Deep Purple/Crown Chakra */}
              <div className={styles.planet} style={{ '--orbit-size': '360px', '--duration': '22s', '--size': '18px', '--color': '#2c3e50' } as any}>
                <div className={styles.planetBody}></div>
              </div>
              
              {/* Neptune - Primary Theme Color */}
              <div className={styles.planet} style={{ '--orbit-size': '400px', '--duration': '25s', '--size': '18px', '--color': '#560067' } as any}>
                <div className={styles.planetBody}></div>
              </div>
              
              {/* Pluto - Secondary Theme Color */}
              <div className={styles.planet} style={{ '--orbit-size': '440px', '--duration': '28s', '--size': '6px', '--color': '#924a7a' } as any}>
                <div className={styles.planetBody}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - All Content */}
        <div className={styles.contentContainer}>
          {/* Story Cards */}
          <section className={styles.storySection}>
            <div className={styles.sectionHeader}>
              <h2>Our Story</h2>
              <div className={styles.headerUnderline}></div>
            </div>
            <div className={styles.contentGrid}>
              {aboutData.story.cards.map((card, idx) => (
                <div className={styles.contentCard} key={idx}>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Stats Section */}
          <section className={styles.statsSection}>
            <div className={styles.sectionHeader}>
              <h2>Our Impact</h2>
              <div className={styles.headerUnderline}></div>
            </div>
            <div className={styles.statsGrid}>
              {aboutData.stats.map((stat, idx) => (
                <div className={styles.statCard} key={idx}>
                  <div className={styles.statNumber}>{stat.number}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Mission & Vision Section */}
          <section className={styles.missionVisionSection}>
            <div className={styles.sectionHeader}>
              <h2>Our Purpose</h2>
              <div className={styles.headerUnderline}></div>
            </div>
            <div className={styles.purposeGrid}>
              <div className={styles.purposeCard}>
                <h3>Our Mission</h3>
                <p>{rehasData.about.missionStatement}</p>
              </div>
              <div className={styles.purposeCard}>
                <h3>Our Vision</h3>
                <p>{rehasData.about.visionStatement}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}