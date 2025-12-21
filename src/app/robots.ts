import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/_next/', '/api/', '/*.json$'],
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 0,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: ['MJ12bot', 'AhrefsBot', 'SemrushBot'],
        disallow: '/',
      },
    ],
    sitemap: 'https://rehas.in/sitemap.xml',
    host: 'https://rehas.in',
  };
}
