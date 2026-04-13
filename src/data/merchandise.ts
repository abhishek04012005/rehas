// ============================================
// MERCHANDISE DATA
// ============================================
import { merchandiseYantraData } from './merchandiseYantra';
import { merchandiseBraceletData } from './merchandiseBracelet';

// Image URLs for different product types
export const productImages: { [key: string]: string } = {
  'Healing Crystals': 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop',
  'Essential Oils': 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=300&fit=crop',
  'Meditation Tools': 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=400&h=300&fit=crop',
  'Ayurvedic Remedies': 'https://images.unsplash.com/photo-1587854692152-cbe660dbde0f?w=400&h=300&fit=crop',
  'Reiki Tools': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5e2?w=400&h=300&fit=crop',
  'Sound Healing': 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=300&fit=crop',
  'Chakra Stones': 'https://images.unsplash.com/photo-1599643478827-d17e9b1aee66?w=400&h=300&fit=crop',
  'Wellness Kits': 'https://images.unsplash.com/photo-1596263353880-a4c4218c7b56?w=400&h=300&fit=crop',
  // Yantra products
  'Sri Yantra': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
  'Mahalaxmi Yantra': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
  'Shree Yantra': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
  'Vastu Yantra': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
  'Baglamukhi Yantra': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
  'Saraswati Yantra': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
  // Bracelet products
  'Rudraksha Bracelet': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
  'Crystal Healing Bracelet': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
  'Tigers Eye Bracelet': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
  'Rose Quartz Bracelet': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
  'Amethyst Bracelet': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
  'Black Tourmaline Bracelet': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
  'Lapis Lazuli Bracelet': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
  'Citrine Bracelet': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
};

export const merchandiseData = {
  hero: {
    title: 'Sacred Merchandise',
    subtitle: 'Discover authentic healing bracelets and powerful yantras for your spiritual journey',
    description: 'Explore our curated collection of sacred yantras and healing bracelets, each crafted with spiritual intention to support your journey of healing, manifestation, and spiritual growth.',
  },
  overview: {
    title: 'Sacred Products for Spiritual Enhancement',
    description: 'Discover our collection of authentic yantras and healing bracelets crafted with intention using genuine crystals and sacred beads for protection, healing, and spiritual enhancement.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=400&fit=crop',
  },
  benefits: {
    title: 'Benefits of Sacred Products',
    description: 'Powerful spiritual tools for your journey',
    items: [
      {
        title: 'Spiritual Protection',
        description: 'Shield against negative energies and psychic attacks.',
        icon: 'Shield',
      },
      {
        title: 'Energy Healing',
        description: 'Natural healing energies from crystals and sacred geometry.',
        icon: 'Healing',
      },
      {
        title: 'Manifestation Power',
        description: 'Accelerate the manifestation of desires and goals.',
        icon: 'Flash',
      },
      {
        title: 'Meditation Focus',
        description: 'Deepen meditation and spiritual concentration.',
        icon: 'Brightness3',
      },
      {
        title: 'Divine Connection',
        description: 'Strengthen connection with deities and cosmic energies.',
        icon: 'Link',
      },
      {
        title: 'Harmonious Energy',
        description: 'Balance and harmonize the energies in your space.',
        icon: 'Balance',
      },
    ],
  },
  process: {
    title: 'How to Choose Your Sacred Product',
    steps: [
      {
        number: '01',
        title: 'Identify Your Intention',
        description: 'Determine what you want to manifest or heal.',
      },
      {
        number: '02',
        title: 'Research Properties',
        description: 'Learn about crystal, yantra, or bead properties and meanings.',
      },
      {
        number: '03',
        title: 'Check Compatibility',
        description: 'Ensure the product resonates with your energy.',
      },
      {
        number: '04',
        title: 'Cleanse & Energize',
        description: 'Prepare your product for maximum effectiveness.',
      },
      {
        number: '05',
        title: 'Use with Intention',
        description: 'Wear or place mindfully and maintain its energy.',
      },
    ],
  },
  practices: {
    title: 'Sacred Products',
    description: 'Yantras and bracelets for spiritual enhancement',
    list: [
      ...(merchandiseYantraData.practices?.list || []).map(product => ({ ...product, category: 'yantra' })),
      ...(merchandiseBraceletData.practices?.list || []).map(product => ({ ...product, category: 'bracelet' }))
    ]
  },
  sessions: {
    title: 'Product Collections',
    types: [
      {
        name: 'Complete Protection Set',
        duration: 'Yantra + Bracelet',
        description: 'Ultimate protection package with yantra and healing bracelet.',
        price: '₹4,500',
        includes: [
          'Sri Yantra or Mahalaxmi Yantra',
          'Rudraksha or Crystal Bracelet',
          'Energization ceremony',
          'Usage guide',
        ],
      },
      {
        name: 'Manifestation Set',
        duration: 'Yantra + Bracelet',
        description: 'Powerful combination for manifestation and abundance.',
        price: '₹5,000',
        includes: [
          'Shree Yantra',
          'Citrine or Pyrite Bracelet',
          'Sacred rituals',
          'Manifestation guide',
        ],
      },
    ],
  },
  faq: {
    title: 'Sacred Products FAQ',
    questions: [
      {
        question: 'How do I know which product is right for me?',
        answer: 'Trust your intuition. Research the properties of different crystals, yantras, and beads. Choose based on your current needs and what resonates with you energetically.',
      },
      {
        question: 'How should I care for my sacred products?',
        answer: 'Cleanse regularly with sage, moonlight, or sound. Store in a sacred space when not in use. Handle with clean hands and positive intentions.',
      },
      {
        question: 'Can I wear multiple bracelets at once?',
        answer: 'Yes, you can layer bracelets, but start with 2-3 complementary pieces. Allow your energy to adjust to each new piece before adding more.',
      },
      {
        question: 'How long does it take to feel the effects?',
        answer: 'Effects vary by individual. Some feel immediate shifts, while others notice gradual changes over days or weeks. Consistency is key.',
      },
      {
        question: 'Do yantras need to be consecrated?',
        answer: 'Yes, traditional puja ceremony enhances the yantra\'s power. We provide consecration services and instructions for optimal effectiveness.',
      },
    ],
  },
  cta: {
    title: 'Begin Your Spiritual Journey',
    subtitle: 'Choose your sacred tools and start manifesting your highest potential',
    buttons: [
      {
        label: 'Explore Products',
        href: '/merchandise',
        type: 'primary' as const,
      },
      {
        label: 'Contact Us',
        href: '/contact',
        type: 'secondary' as const,
      },
    ],
  },
};