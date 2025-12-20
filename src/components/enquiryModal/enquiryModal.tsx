'use client';

import { useState } from 'react';
import { Close, Send, CheckCircle } from '@mui/icons-material';
import { supabase } from '@/lib/supabase';
import { servicesData } from '@/data/services';
import styles from './enquiryModal.module.css';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    serviceType: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const serviceOptions = servicesData.services.map(service => ({
    id: service.id,
    title: service.title
  }));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim() || !formData.number.trim() || !formData.serviceType.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.number.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error: insertError } = await supabase
        .from('enquiries')
        .insert([
          {
            name: formData.name,
            phone: formData.number,
            service_type: formData.serviceType,
            status: 'new',
            submitted_from: 'popup',
            created_at: new Date().toISOString(),
          },
        ]);

      if (insertError) {
        throw insertError;
      }

      // Success
      setSubmitted(true);
      setFormData({ name: '', number: '', serviceType: '' });
      
      // Close modal after 3 seconds
      setTimeout(() => {
        onClose();
        setSubmitted(false);
      }, 3000);
    } catch (err: any) {
      console.error('Error submitting form:', err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className={styles.backdrop} onClick={onClose}></div>

      {/* Modal */}
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          {/* Header */}
          <div className={styles.modalHeader}>
            <h2>Quick Enquiry</h2>
            <button
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close modal"
            >
              <Close />
            </button>
          </div>

          {submitted ? (
            // Success Message
            <div className={styles.successMessage}>
              <CheckCircle className={styles.successIcon} />
              <h3>Thank You!</h3>
              <p>We've received your enquiry and will contact you soon.</p>
            </div>
          ) : (
            // Form
            <form onSubmit={handleSubmit} className={styles.form}>
              {error && <div className={styles.errorMessage}>{error}</div>}

              {/* Name Field */}
              <div className={styles.formGroup}>
                <label htmlFor="name">Name *</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  disabled={loading}
                />
              </div>

              {/* Phone Number Field */}
              <div className={styles.formGroup}>
                <label htmlFor="number">Phone Number *</label>
                <input
                  id="number"
                  type="tel"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  placeholder="Your phone number"
                  disabled={loading}
                />
              </div>

              {/* Service Type Field */}
              <div className={styles.formGroup}>
                <label htmlFor="serviceType">Service Type *</label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="">Select a service</option>
                  {serviceOptions.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className={styles.loader}></span>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className={styles.submitIcon} />
                    Send Enquiry
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
