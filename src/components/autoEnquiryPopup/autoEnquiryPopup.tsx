'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import EnquiryModal from '@/components/enquiryModal';
import FreeProgramsPopup from '@/components/freeProgramsPopup';
import { supabase } from '@/lib/supabase';

interface Program {
  id: string;
  title: string;
  schedule: string;
  time: string;
  description: string;
}

interface Settings {
  popup_enabled: boolean;
  show_enquiry_popup: boolean;
  show_free_programs_popup: boolean;
  free_programs_title?: string;
  free_programs_subtitle?: string;
  free_programs_cta_text?: string;
  programs_config?: Program[];
}

export default function AutoEnquiryPopup() {
  const pathname = usePathname();
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [freeOpen, setFreeOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    popup_enabled: true,
    show_enquiry_popup: true,
    show_free_programs_popup: true,
    free_programs_title: 'FREE Programs',
    free_programs_subtitle: 'Limited Time Offers - Join Now!',
    free_programs_cta_text: 'Ready to start your wellness journey?',
    programs_config: [],
  });

  // Check if current page is a merchandise product page or merchandise listing page
  const isMerchandisePage = pathname?.match(/^\/merchandise|^\/product\/(bracelet|yantra)\/[^/]+($|\/)/);

  useEffect(() => {
    // Check if popup is enabled
    const checkSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('settings')
          .select('popup_enabled, show_enquiry_popup, show_free_programs_popup, free_programs_title, free_programs_subtitle, free_programs_cta_text, programs_config')
          .single();

        if (error) {
          // Handle different error cases
          if (error.code === 'PGRST116' || error.code === '42P01' || error.message?.includes('relation')) {
            console.log('Settings table/record not found, using defaults');
            // No settings record or table doesn't exist - use defaults
            return;
          }
          console.warn('Unexpected error fetching settings, using defaults:', error);
          return;
        }

        if (data) {
          console.log('Settings fetched successfully:', data);
          setSettings({
            popup_enabled: data.popup_enabled ?? true,
            show_enquiry_popup: data.show_enquiry_popup ?? true,
            show_free_programs_popup: data.show_free_programs_popup ?? true,
            free_programs_title: data.free_programs_title ?? 'FREE Programs',
            free_programs_subtitle: data.free_programs_subtitle ?? 'Limited Time Offers - Join Now!',
            free_programs_cta_text: data.free_programs_cta_text ?? 'Ready to start your wellness journey?',
            programs_config: data.programs_config ?? [],
          });
        }
      } catch (error) {
        // Network or other unexpected errors - use defaults
        console.warn('Error fetching settings:', error);
      }
    };

    checkSettings();
  }, []);

  useEffect(() => {
    if (!settings.popup_enabled || isMerchandisePage) return;

    // Check if user has already closed the popup in this session
    const popupShown = sessionStorage.getItem('enquiryPopupShown');

    if (popupShown) {
      return;
    }

    // Show popup after 3 seconds - prioritize free programs if both enabled
    const timer = setTimeout(() => {
      console.log('Popup trigger - Settings:', {
        popup_enabled: settings.popup_enabled,
        show_enquiry_popup: settings.show_enquiry_popup,
        show_free_programs_popup: settings.show_free_programs_popup,
      });

      if (settings.show_free_programs_popup) {
        console.log('Opening free programs popup');
        setFreeOpen(true);
      } else if (settings.show_enquiry_popup) {
        console.log('Opening enquiry popup');
        setEnquiryOpen(true);
      }

      sessionStorage.setItem('enquiryPopupShown', 'true');
    }, 3000);

    return () => clearTimeout(timer);
  }, [settings, isMerchandisePage]);

  const handleClose = () => {
    setEnquiryOpen(false);
    setFreeOpen(false);
  };

  if (!settings.popup_enabled || isMerchandisePage) return null;

  return (
    <>
      <EnquiryModal isOpen={enquiryOpen} onClose={handleClose} />
      <FreeProgramsPopup
        isOpen={freeOpen}
        onClose={handleClose}
        title={settings.free_programs_title}
        subtitle={settings.free_programs_subtitle}
        ctaText={settings.free_programs_cta_text}
        programs={settings.programs_config}
      />
    </>
  );
}
