'use client';

import { useEffect, useState } from 'react';
import CompassLoader from '@/components/compassLoader/compassLoader';

export default function PageLoadingWrapper() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loader on initial page load
    const handleLoad = () => {
      setIsLoading(false);
    };

    if (document.readyState === 'complete') {
      setIsLoading(false);
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (!isLoading) return null;

  return <CompassLoader size="large" text="Finding your path" showBackground={true} />;
}
