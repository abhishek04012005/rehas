'use client';

import { useState, useEffect } from 'react';
import EnquiryModal from '@/components/enquiryModal';

export default function AutoEnquiryPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if user has already closed the popup in this session
    const popupShown = sessionStorage.getItem('enquiryPopupShown');
    
    if (popupShown) {
      setHasShown(true);
      return;
    }

    // Show popup after 2 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
      setHasShown(true);
      sessionStorage.setItem('enquiryPopupShown', 'true');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return <EnquiryModal isOpen={isOpen} onClose={handleClose} />;
}
