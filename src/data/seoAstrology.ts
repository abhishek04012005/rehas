import { HealingServiceData } from '@/components/healingService/healingService';
import seoAstrologyData from '@/lib/seo-astrology.json';

export interface SeoAstrologyCategory {
  description: string;
  page_meta: {
    title: string;
    description: string;
    slug: string;
    slug_hinglish?: string;
  };
  keywords: string[];
  keywords_hinglish?: string[];
}

export interface SimpleSeoPage {
  title: string;
  description: string;
  keywords: string[];
}

// Get simple SEO page data
export function getSimpleSeoPageData(category: SeoAstrologyCategory): SimpleSeoPage {
  return {
    title: category.page_meta.title,
    description: category.page_meta.description,
    keywords: category.keywords,
  };
}

// Transform SEO astrology JSON data into HealingServiceData format
export function transformSeoDataToHealingService(category: SeoAstrologyCategory): HealingServiceData {
  const keywords = category.keywords || [];
  
  return {
    hero: {
      title: category.page_meta.title.split('|')[0].trim(),
      subtitle: 'Expert Guidance from Vedic Astrology',
      description: category.page_meta.description,
    },
    overview: {
      title: 'Understanding Your Astrological Journey',
      description: category.page_meta.description + '\n\nOur expert astrologers use Vedic principles to provide personalized insights and remedies tailored to your unique birth chart and life circumstances.',
      image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop',
    },
    benefits: {
      title: 'Key Benefits',
      description: 'Discover how astrological guidance can transform your life',
      items: [
        {
          title: 'Personalized Insights',
          description: 'Get deep understanding of your personality, strengths, and challenges based on your birth chart.',
          icon: 'Visibility',
        },
        {
          title: 'Life Path Clarity',
          description: 'Understand your life purpose and the best timing for major decisions and ventures.',
          icon: 'Lightbulb',
        },
        {
          title: 'Powerful Remedies',
          description: 'Learn effective Vedic remedies to mitigate challenges and enhance positive planetary influences.',
          icon: 'AutoAwesome',
        },
        {
          title: 'Relationship Harmony',
          description: 'Improve your relationships through astrological compatibility analysis and guidance.',
          icon: 'Favorite',
        },
        {
          title: 'Career Advancement',
          description: 'Discover your professional strengths and the best timing for career growth opportunities.',
          icon: 'FlashOn',
        },
        {
          title: 'Expert Consultation',
          description: 'Access guidance from experienced Vedic astrologers who understand complex astrological patterns.',
          icon: 'SelfImprovement',
        },
      ],
    },
    process: {
      title: 'Our Consultation Process',
      steps: [
        {
          number: '01',
          title: 'Birth Chart Analysis',
          description: 'We create and analyze your complete Janam Kundli to understand your planetary positions and their influences.',
        },
        {
          number: '02',
          title: 'In-Depth Interpretation',
          description: 'Our expert astrologers interpret your birth chart details, identifying key patterns and life themes.',
        },
        {
          number: '03',
          title: 'Personalized Guidance',
          description: 'Receive tailored recommendations and insights specific to your life situation and goals.',
        },
        {
          number: '04',
          title: 'Remedial Solutions',
          description: 'Learn about effective remedies, gemstones, mantras, and practices to enhance positive energies.',
        },
        {
          number: '05',
          title: 'Follow-up Support',
          description: 'Get ongoing support and guidance as you implement the recommended practices and track your progress.',
        },
      ],
    },
    sessions: {
      title: 'Our Consultation Services',
      types: [
        {
          name: 'Birth Chart Analysis',
          duration: '45 minutes',
          price: '₹1,499',
          originalPrice: '₹2,499',
          description: 'Complete analysis of your birth chart with detailed interpretation of planetary positions and their impact on your life.',
          includes: [
            'Full Janam Kundli creation',
            'Planetary position analysis',
            'House interpretation',
            'Key life themes identification',
            'Initial remedial suggestions',
          ],
        },
        {
          name: 'Personalized Consultation',
          duration: '60 minutes',
          price: '₹2,499',
          originalPrice: '₹3,999',
          description: 'In-depth consultation addressing your specific concerns and life questions with detailed astrological analysis.',
          includes: [
            'Complete birth chart review',
            'Focused area analysis',
            'Personalized remedies',
            'Gemstone recommendations',
            'Mantra and ritual guidance',
            'Follow-up guidance document',
          ],
        },
        {
          name: 'Premium Life Guidance',
          duration: '90 minutes',
          price: '₹4,999',
          originalPrice: '₹7,499',
          description: 'Comprehensive life guidance covering career, relationships, health, and spiritual growth with detailed remedial strategies.',
          includes: [
            'Complete astrological analysis',
            'Career and finance predictions',
            'Relationship compatibility',
            'Health and wellness insights',
            'Custom remedial plan',
            '30-day follow-up support',
            'Personalized remedies guidance',
          ],
        },
        {
          name: 'Kundli Matching Service',
          duration: '40 minutes',
          price: '₹999',
          description: 'Comprehensive compatibility analysis for marriage including detailed assessment of all astrological factors.',
          includes: [
            'Guna matching analysis',
            'Doshas assessment',
            'Compatibility report',
            'Remedial suggestions',
            'Auspicious timing recommendations',
          ],
        },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions',
      questions: [
        {
          question: 'Is astrology scientifically valid?',
          answer: 'Astrology is an ancient system of knowledge with thousands of years of documented observations. While modern science continues to study its principles, astrology has proven its value for millions of people seeking guidance and self-understanding.',
        },
        {
          question: 'What do I need for a birth chart reading?',
          answer: 'To create an accurate birth chart, we need your date of birth, exact time of birth, and place of birth. The more precise the birth time, the more accurate the analysis.',
        },
        {
          question: 'How accurate are astrological predictions?',
          answer: 'Astrology provides insights into life patterns and tendencies rather than absolute predictions. Accuracy depends on the birth data precision and the astrologer\'s expertise. Our experienced astrologers have a high success rate with accurate birth information.',
        },
        {
          question: 'Can remedies really help?',
          answer: 'Vedic remedies work by harmonizing your energies with planetary influences. Many clients report positive changes within weeks or months of following recommended remedies consistently.',
        },
        {
          question: 'How long do remedies take to work?',
          answer: 'Most remedies show initial effects within 40 days to 3 months, depending on the severity of the issue and consistency in following the prescribed practices. Long-term benefits accumulate with continued practice.',
        },
        {
          question: 'What is Kundli matching?',
          answer: 'Kundli matching is the traditional practice of comparing two birth charts to assess compatibility for marriage. It analyzes 8 different dimensions (gunas) and checks for serious doshas that might affect the relationship.',
        },
      ],
    },
    cta: {
      title: 'Ready for Your Astrological Guidance?',
      subtitle: 'Connect with our expert astrologers to understand your cosmic blueprint and chart your path to success and happiness.',
      buttons: [
        {
          label: 'Book a Consultation',
          href: '#sessions',
          type: 'primary',
        },
        {
          label: 'Learn More',
          href: '#overview',
          type: 'secondary',
        },
      ],
    },
  };
}

// Get all SEO astrology categories
export function getAllSeoAstrologyCategories(): SeoAstrologyCategory[] {
  return (seoAstrologyData as { categories: SeoAstrologyCategory[] }).categories;
}

// Get a specific category by slug
export function getSeoAstrologyBySlug(slug: string): SeoAstrologyCategory | null {
  const categories = getAllSeoAstrologyCategories();
  return categories.find(cat => cat.page_meta.slug === slug) || null;
}

// Get all slugs for static generation
export function getAllSeoAstrologySlug(): string[] {
  return getAllSeoAstrologyCategories().map(cat => cat.page_meta.slug);
}
