// ============================================
// SERVICES COMPONENT DATA
// ============================================
export const servicesData = {
  hero: {
    title: 'Our Services',
    subtitle: 'Transform Your Life Through Ancient Wisdom & Modern Wellness',
  },
  services: [
    {
      id: 'numerology',
      title: 'Numerology',
      description:
        'Unlock the hidden meanings of numbers in your life. Our expert numerologists analyze your name and birth date to reveal your life path, destiny, and personal vibrations.',
      muiIcon: 'Numbers',
      features: [
        'Life Path Analysis',
        'Destiny Reading',
        'Year Forecast',
        'Vibration Check',
      ],
      color: '#d4a5d9',
      position: 'left',
    },
    {
      id: 'astrology',
      title: 'Astrology',
      description:
        'Explore the cosmos through your birth chart. Our certified astrologers provide detailed readings of your sun, moon, and rising signs. Understand planetary influences on your personality and relationships.',
      muiIcon: 'Brightness3',
      features: [
        'Birth Chart Reading',
        'Transit Analysis',
        'Compatibility',
        'Horoscope',
      ],
      color: '#92487a',
      position: 'right',
    },
    {
      id: 'reiki',
      title: 'Reiki',
      description:
        'Experience the healing power of universal life force energy. Our certified Reiki practitioners channel positive energy to balance your chakras and promote deep relaxation.',
      muiIcon: 'PanTool',
      features: [
        'Full Body Healing',
        'Chakra Balance',
        'Distance Reiki',
        'Energy Cleanse',
      ],
      color: '#560067',
      position: 'left',
    },
    {
      id: 'sound-therapy',
      title: 'Sound Therapy',
      description:
        'Harness the healing vibrations of sound. Our sound therapists use singing bowls, tuning forks, and binaural beats to realign your energy centers and promote healing.',
      muiIcon: 'MusicNote',
      features: [
        'Singing Bowls',
        'Frequency Healing',
        'Binaural Beats',
        'Sound Bath',
      ],
      color: '#d4a5d9',
      position: 'right',
    },
    {
      id: 'chakra-cleaning',
      title: 'Chakra Cleaning',
      description:
        'Cleanse and balance your seven energy centers. Our energy healers identify blockages in your chakras and use specialized techniques to clear stagnant energy.',
      muiIcon: 'FlashOn',
      features: [
        'Chakra Assessment',
        'Blockage Clearing',
        'Energy Alignment',
        'Frequency Balance',
      ],
      color: '#92487a',
      position: 'left',
    },
    {
      id: 'aura-cleaning',
      title: 'Aura Cleaning',
      description:
        'Purify and strengthen your energetic field. Our aura readers see your energetic signature and remove negative imprints to restore your natural radiance.',
      muiIcon: 'Opacity',
      features: [
        'Aura Reading',
        'Energy Removal',
        'Aura Strengthen',
        'Color Healing',
      ],
      color: '#560067',
      position: 'right',
    },
  ],
  cta: {
    title: 'Ready to Transform Your Life?',
    subtitle: 'Book a session with our expert practitioners today',
    buttons: [
      {
        label: 'Book Consultation',
        href: '/consultation',
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
