
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

    // {
    //   label: 'Service',
    //   href: '/service',
    //   submenu: [
    //     { label: 'General Service', href: '/service/general', icon: 'RoomService' },
    //     { label: 'Healing Service', href: '/service/healing', icon: 'Brightness3' },
    //     { label: 'Aura & Chakra Report', href: '/service/aura-chakra-report', icon: 'PublicOutlined' },
    //     { label: 'Kundali', href: '/service/kundli-analysis', icon: 'Description' },
    //     { label: 'Tarot', href: '/service/tarot', icon: 'CreditCard' },
    //   ],
    // },

    {
      label: 'Therapy',
      href: '/therapy',
      submenu: [
        { label: 'Acupressure', href: '/therapy/acupressure', icon: 'PanTool' },
        { label: 'Magnet Therapy', href: '/therapy/magnet', icon: 'ElectricBolt' },
        { label: 'Marma Therapy', href: '/therapy/marma', icon: 'Healing' },
        { label: 'Auricular Therapy', href: '/therapy/auricular', icon: 'Hearing' },

      ],
    },
    {
      label: 'Astrology',
      href: '/astrology',
      submenu: [
        { label: 'Numerology', href: '/astrology/numerology', icon: 'Numbers' },
        { label: 'Vedic Astro', href: '/astrology/vedic', icon: 'PublicOutlined' },
        { label: 'Tarot Card', href: '/service/tarot', icon: 'CreditCard' },
        { label: 'Cowrie Reading', href: '/astrology/cowrie-reading', icon: 'Casino' },
        { label: 'Palm Reading', href: '/service/palm-reading', icon: 'BackHand' },
        { label: 'Kundli', href: '/service/kundli-analysis', icon: 'Description' },

      ],
    },
    {
      label: 'M.Y.T. Wisdom',
      href: '/myt-wisdom',
      submenu: [
        { label: 'Mantra', href: '/myt/mantra', icon: 'Notifications' },
        { label: 'Yantra', href: '/myt/yantra', icon: 'Diamond' },
        { label: 'Tantra', href: '/myt/tantra', icon: 'FavoriteBorder' },
        { label: 'Mantra Vortex', href: '/myt/mantra-vortex', icon: 'AutoAwesome' },
      ],
    },



    {
      label: 'Courses',
      href: '/courses',
      submenu: [
        { label: 'Healing', href: '/courses/healing', icon: 'SchoolOutlined' },
        { label: 'Therapy', href: '/courses/therapy', icon: 'Numbers' },
        { label: 'Astrology', href: '/courses/astrology', icon: 'PublicOutlined' },
        { label: 'M.Y.T', href: '/courses/myt', icon: 'MicOutlined' },
        { label: 'Mind Reading', href: '/courses/mindreading', icon: 'MenuBook' },
      ],
    },
    //  {
    //   label: 'Products',
    //   href: '/products',
    //   submenu: [
    //     { label: 'Healing', href: '/products/healing', icon: 'SchoolOutlined' },
    //     { label: 'Therapy', href: '/products/therapy', icon: 'Numbers' },
    //     { label: 'Astrology', href: '/products/astrology', icon: 'PublicOutlined' },
    //   ],
    // },
    {label: 'Blog', href: '/blog' },
  ],
  cta: {
    label: 'Book Consultation',
    href: '/enquiry',
  },
} as const;
