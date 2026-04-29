'use client';

import dynamic from 'next/dynamic';

const HomeSections = dynamic(() => import('./homeSections'), {
  ssr: false,
  loading: () => null,
});

export default function HomeSectionsClient() {
  return <HomeSections />;
}
