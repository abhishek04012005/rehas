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

const PLANET_COLORS = [
  '#8c7853', // Mercury - Grayish brown
  '#ffc649', // Venus - Golden yellow
  '#4a90e2', // Earth - Blue
  '#e27b58', // Mars - Reddish
  '#c88b3a', // Jupiter - Brown with bands
  '#fad5a5', // Saturn - Pale yellow
  '#4fd0e7', // Uranus - Cyan
  '#4166f5', // Neptune - Deep blue
  '#9ca9a8'  // Pluto - Gray/white
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

      {/* Main Content - Left Solar System, Right Story */}
      <div className={styles.mainContent}>
        {/* Left Side - Solar System Visualization */}
        <div className={styles.chakraSection}>
          <div className={styles.chakraContainer}>
            <div className={styles.solarSystem}>
              {/* Sun */}
              <div className={styles.sun}></div>
              
              {/* Orbit Paths - Individual sizes with responsive scaling */}
              <div className={styles.orbit1}></div>
              <div className={styles.orbit2}></div>
              <div className={styles.orbit3}></div>
              <div className={styles.orbit4}></div>
              <div className={styles.orbit5}></div>
              <div className={styles.orbit6}></div>
              <div className={styles.orbit7}></div>
              <div className={styles.orbit8}></div>
              
              {/* Planets with individual orbit sizes */}
              {/* Mercury - Grayish Brown */}
              <div className={styles.planet1} style={{ '--duration': '4s', '--size': '8px', '--color': '#8c7853' } as any}>
                <div className={styles.planetBody}></div>
              </div>
              
              {/* Venus - Golden Yellow */}
              <div className={styles.planet2} style={{ '--duration': '7s', '--size': '14px', '--color': '#ffc649' } as any}>
                <div className={styles.planetBody}></div>
              </div>
              
              {/* Earth - Blue */}
              <div className={styles.planet3} style={{ '--duration': '10s', '--size': '15px', '--color': '#4a90e2' } as any}>
                <div className={styles.planetBody}></div>
              </div>
              
              {/* Mars - Reddish */}
              <div className={styles.planet4} style={{ '--duration': '13s', '--size': '12px', '--color': '#e27b58' } as any}>
                <div className={styles.planetBody}></div>
              </div>
              
              {/* Jupiter - Brown with Bands */}
              <div className={styles.planet5} style={{ '--duration': '16s', '--size': '28px', '--color': '#c88b3a' } as any}>
                <div className={styles.planetBody}></div>
              </div>
              
              {/* Saturn - Pale Yellow with Rings */}
              <div className={styles.planet6} style={{ '--duration': '19s', '--size': '24px', '--color': '#fad5a5' } as any}>
                <div className={styles.planetBody + ' ' + styles.withRing}></div>
              </div>
              
              {/* Uranus - Cyan */}
              <div className={styles.planet7} style={{ '--duration': '22s', '--size': '18px', '--color': '#4fd0e7' } as any}>
                <div className={styles.planetBody}></div>
              </div>
              
              {/* Neptune - Deep Blue */}
              <div className={styles.planet8} style={{ '--duration': '25s', '--size': '18px', '--color': '#4166f5' } as any}>
                <div className={styles.planetBody}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Story Cards Only */}
        <div className={styles.contentContainer}>
          {/* Story Cards */}
          <section className={styles.storySection}>
            <div className={styles.sectionHeader}>
              {/* <h2>Our Story</h2> */}
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
        </div>
      </div>

      {/* Impact & Purpose Section - Below Both */}
      <div className={styles.belowContainer}>
        {/* Stats Section */}
        <section className={styles.statsSection}>
          <div className={styles.sectionHeader}>
            {/* <h2>Our Impact</h2> */}
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
            {/* <h2>Our Purpose</h2> */}
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
  );
}