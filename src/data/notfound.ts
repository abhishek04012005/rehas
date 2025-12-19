// ============================================
// 404 PAGE DATA
// ============================================
export const notFoundData = {
  errorCode: '404',
  title: 'Page Not Found',
  description:
    'The page you\'re looking for seems to have drifted away like a lost star. Don\'t worry, we\'ll guide you back on track.',
  suggestions: {
    title: 'Here are some helpful links:',
    links: [
      { label: '🏠 Return Home', href: '/' },
      { label: '✨ Explore Astrology', href: '/astrology' },
      { label: '🧘 Discover Wellness', href: '/wellness' },
      { label: '📝 Read Our Blog', href: '/blog' },
      { label: '💬 Contact Us', href: '/contact' },
    ],
  },
} as const;
