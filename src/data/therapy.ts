// ============================================
// THERAPY SECTION DATA
// ============================================
export const therapyData = {
  hero: {
    title: 'Therapy Services',
    subtitle: 'Holistic Healing Through Traditional Therapeutic Practices',
  },
  items: [
    {
      id: 'acupressure',
      title: 'Acupressure',
      description:
        'Stimulate your body\'s natural healing ability through ancient pressure point therapy. Acupressure activates meridian pathways to relieve pain, restore balance, and enhance vitality without needles.',
      image: '/assets/service/acupressure1.png',                                                                                                                                                                                                               
      features: [
        'Pressure Point Therapy',
        'Pain Relief',
        'Energy Balance',
        'Meridian Activation',
      ],
      color: 'var(--primary)',
      position: 'left',
      details: {
        longDescription: 'Acupressure is an ancient healing technique based on Traditional Chinese Medicine principles. By applying pressure to specific points on the body (acupoints), practitioners stimulate the body\'s natural healing mechanisms, restore energy flow (Qi), and promote physical and emotional wellness.',
        benefits: [
          'Effective pain relief and management',
          'Improved circulation and energy flow',
          'Stress reduction and relaxation',
          'Enhanced immune function',
          'Better sleep quality',
          'Holistic body-mind healing',
        ],
        duration: '60-75 minutes',
        price: '₹2,000',
        includes: [
          'Comprehensive health assessment',
          'Meridian pathway analysis',
          'Acupressure point stimulation',
          'Energy balance restoration',
          'Self-care acupressure guidance',
        ],
      },
    },
    {
      id: 'magnet',
      title: 'Magnet Therapy',
      description:
        'Harness the power of magnetic fields to restore cellular health. Magnet therapy uses strategically placed magnets to improve circulation, reduce inflammation, and facilitate the body\'s natural healing processes.',
      image: '/assets/service/magnet_therapy1.png',
      features: [
        'Magnetic Field Therapy',
        'Cellular Healing',
        'Inflammation Reduction',
        'Circulation Boost',
      ],
      color: 'var(--primary)',
      position: 'right',
      details: {
        longDescription: 'Magnet therapy utilizes the natural properties of magnetic fields to promote healing and wellness. By improving blood circulation, reducing inflammation, and balancing cellular energy, magnetic therapy supports the body\'s innate ability to heal itself and maintain optimal health.',
        benefits: [
          'Improved blood circulation and oxygen flow',
          'Reduced inflammation and swelling',
          'Natural pain relief',
          'Enhanced cellular regeneration',
          'Better sleep and relaxation',
          'Boosted immune system function',
        ],
        duration: '45-60 minutes',
        price: '₹1,800',
        includes: [
          'Magnetic field assessment',
          'Strategic magnet placement',
          'Circulation stimulation therapy',
          'Inflammation reduction treatment',
          'Home magnet therapy guidance',
        ],
      },
    },
    {
      id: 'marma',
      title: 'Marma Therapy',
      description:
        'Unlock the vital energy points of your body through this ancient Ayurvedic healing art. Marma therapy stimulates 107 vital points to detoxify, balance doshas, and restore optimal health.',
      image: '/assets/service/marma_therapy1.png',
      features: [
        'Vital Point Stimulation',
        'Dosha Balancing',
        'Detoxification',
        'Energy Restoration',
      ],
      color: 'var(--primary)',
      position: 'left',
      details: {
        longDescription: 'Marma therapy is an ancient Ayurvedic science that works with 107 vital energy points throughout the body. These sensitive areas correspond to organs, systems, and consciousness. By stimulating these marma points, practitioners release blockages, balance the three doshas, and promote profound healing.',
        benefits: [
          'Detoxification of body and mind',
          'Dosha balancing and equilibrium',
          'Release of emotional blockages',
          'Enhanced energy and vitality',
          'Improved organ function',
          'Spiritual awakening and consciousness expansion',
        ],
        duration: '75-90 minutes',
        price: '₹2,500',
        includes: [
          'Dosha and constitution assessment',
          'Marma point identification',
          'Vital point stimulation therapy',
          'Detoxification support',
          'Personalized marma care plan',
        ],
      },
    },
    {
      id: 'auricular',
      title: 'Auricular Therapy',
      description:
        'Experience powerful healing through your ears. Auricular therapy stimulates reflex points on the ear that correspond to your entire body, promoting pain relief, stress reduction, and holistic healing.',
      image: '/assets/service/auricular_therapy1.png',
      features: [
        'Ear Reflex Therapy',
        'Whole Body Healing',
        'Stress Relief',
        'Pain Management',
      ],
      color: 'var(--primary)',
      position: 'right',
      details: {
        longDescription: 'Auricular therapy, also called ear acupuncture, is based on the principle that the ear is a microsystem reflecting the entire body. By stimulating specific reflex points on the ear, practitioners can treat various conditions and promote overall health and wellness.',
        benefits: [
          'Whole-body healing through ear reflexes',
          'Effective pain and migraine relief',
          'Stress and anxiety reduction',
          'Addiction recovery support',
          'Improved sleep and relaxation',
          'Quick and non-invasive treatment',
        ],
        duration: '30-45 minutes',
        price: '₹1,500',
        includes: [
          'Ear reflex point assessment',
          'Targeted ear stimulation therapy',
          'Whole-body healing activation',
          'Stress relief treatment',
          'Ear point care instructions',
        ],
      },
    },
  ],
  cta: {
    title: 'Restore Your Health Naturally',
    subtitle: 'Discover the power of traditional therapeutic healing',
    buttons: [
      {
        label: 'Book Now',
        href: '/enquiry',
        type: 'primary',
      },
      {
        label: 'Learn More',
        href: '/contact',
        type: 'secondary',
      },
    ],
  },
} as const;
