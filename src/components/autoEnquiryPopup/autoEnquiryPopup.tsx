'use client';

import { useState, useEffect } from 'react';
import EnquiryModal from '@/components/enquiryModal';
import { supabase } from '@/lib/supabase';

export default function AutoEnquiryPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    // Check if popup is enabled
    const checkSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('settings')
          .select('popup_enabled')
          .single();

        if (error) {
          // Handle different error cases
          if (error.code === 'PGRST116') {
            // No settings record found - table exists but no data
            // Default to enabled
            setIsEnabled(true);
          } else if (error.code === '42P01' || error.message?.includes('relation') || error.message?.includes('does not exist')) {
            // Table doesn't exist - default to enabled
            setIsEnabled(true);
          } else {
            // Other errors - log but default to enabled for safety
            console.warn('Unexpected error fetching settings, defaulting to enabled:', error);
            setIsEnabled(true);
          }
          return;
        }

        if (data) {
          setIsEnabled(data.popup_enabled ?? true);
        } else {
          setIsEnabled(true);
        }
      } catch (error) {
        // Network or other unexpected errors - default to enabled
        console.warn('Error fetching settings, defaulting to enabled:', error);
        setIsEnabled(true);
      }
    };

    checkSettings();
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    // Check if user has already closed the popup in this session
    const popupShown = sessionStorage.getItem('enquiryPopupShown');

    if (popupShown) {
      return;
    }

    // Show popup after 2 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem('enquiryPopupShown', 'true');
    }, 2000);

    return () => clearTimeout(timer);
  }, [isEnabled]);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isEnabled) return null;

  return <EnquiryModal isOpen={isOpen} onClose={handleClose} />;
}
