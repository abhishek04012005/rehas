'use client';

import dynamic from 'next/dynamic';

const PageLoadingWrapper = dynamic(
  () => import('@/components/pageLoadingWrapper/pageLoadingWrapper'),
  { ssr: false, loading: () => null }
);
const AutoEnquiryPopup = dynamic(
  () => import('@/components/autoEnquiryPopup/autoEnquiryPopup'),
  { ssr: false, loading: () => null }
);

export default function DeferredLayout() {
  return (
    <>
      <PageLoadingWrapper />
      <AutoEnquiryPopup />
    </>
  );
}
