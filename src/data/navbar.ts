
export const navbarData = {
  logo: {
    text: 'REHAS',
    badge: 'Star',
  },
  links: [
    { label: 'Home', href: '/' },

    {
      label: 'Healing',
      href: '/healing',
      submenu: [
        { label: 'Reiki', href: '/healing/reiki', icon: 'Brightness3' },
        { label: 'Mantra', href: '/healing/mantra', icon: 'Nightlight' },
        { label: 'Tantra', href: '/healing/tantra', icon: 'FavoriteBorder' },
      ],
    },

    {
      label: 'Service',
      href: '/service',
      submenu: [
        { label: 'General Service', href: '/service/general', icon: 'RoomService' },
        { label: 'Healing Service', href: '/service/healing', icon: 'Brightness3' },
        { label: 'Astro Report', href: '/service/astro-report', icon: 'PublicOutlined' },
        { label: 'Kundli Analysis', href: '/service/kundli-analysis', icon: 'Description' },
        { label: 'Tarot', href: '/service/tarot', icon: 'CreditCard' },
      ],
    },

    {
      label: 'Therapy',
      href: '/therapy',
      submenu: [
        { label: 'Reiki', href: '/therapy/reiki', icon: 'Brightness3' },
        { label: 'Acupressure', href: '/therapy/acupressure', icon: 'PanTool' },
        { label: 'Acupuncture', href: '/therapy/acupuncture', icon: 'MedicalInformation' },
        { label: 'Physiotherapy', href: '/therapy/physiotherapy', icon: 'LocalHospital' },
        { label: 'Magnet Therapy', href: '/therapy/magnet', icon: 'Grain' },
      ],
    },

    {
      label: 'M.Y.T Wisdom',
      href: '/myt-wisdom',
      submenu: [
        { label: 'Mantra', href: '/myt/mantra', icon: 'Notifications' },
        { label: 'Yantra', href: '/myt/yantra', icon: 'Diamond' },
        { label: 'Tantra', href: '/myt/tantra', icon: 'FavoriteBorder' },
        { label: 'Mantra Manipulation', href: '/myt/mantra-manipulation', icon: 'AutoAwesome' },
        { label: 'Himalayan Tantra', href: '/myt/himalayan-tantra', icon: 'Terrain' },
        { label: 'Tantric & Esoteric Wisdom', href: '/myt/esoteric', icon: 'AccountBalance' },
      ],
    },

    {
      label: 'Astrology',
      href: '/astrology',
      submenu: [
        { label: 'Course', href: '/astrology/course', icon: 'SchoolOutlined' },
        { label: 'Vedic Astro', href: '/astrology/vedic', icon: 'PublicOutlined' },
        { label: 'Numerology', href: '/astrology/numerology', icon: 'Numbers' },
        { label: 'Counselling', href: '/astrology/counselling', icon: 'MicOutlined' },
        { label: 'Reading', href: '/astrology/reading', icon: 'MenuBook' },
      ],
    },

    { label: 'About', href: '/about' },
  ],
  cta: {
    label: 'Book Consultation',
    href: '/enquiry',
  },
} as const;
