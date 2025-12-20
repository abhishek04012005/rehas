'use client';

import { useState } from 'react';
import { Send, CheckCircle } from '@mui/icons-material';
import { supabase } from '@/lib/supabase';
import CompassLoader from '@/components/compassLoader/compassLoader';
import LineArtBackground from '@/components/lineArtBackground/lineArtBackground';
import { servicesData } from '@/data/services';
import styles from './enquiry.module.css';

export default function Enquiry() {
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
            submitted_from: 'page',
            created_at: new Date().toISOString(),
          },
        ]);

      if (insertError) {
        throw insertError;
      }

      // Success
      setSubmitted(true);
      setFormData({ name: '', number: '', serviceType: '' });
      
      // Hide success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      console.error('Error submitting form:', err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.enquiry}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <LineArtBackground variant="minimal" opacity={0.15} />
        <div className={styles.heroContent}>
          <h1>Send Us an Enquiry</h1>
          <p>Get in touch with our team and discover the perfect service for you</p>
        </div>
      </section>

      {/* Main Content */}
      <div className={styles.container}>
        <div className={styles.enquiryWrapper}>
          {/* Left Side - Info */}
          <div className={styles.infoSection}>
            <div className={styles.infoBox}>
              <h3>Why Enquire?</h3>
              <p>
                Let us know more about your needs and preferences. Our expert team will get back to you 
                with personalized recommendations tailored to your specific requirements.
              </p>
            </div>

            <div className={styles.infoBox}>
              <h3>What Happens Next?</h3>
              <ul className={styles.stepsList}>
                <li>You submit your enquiry</li>
                <li>Our team reviews your details</li>
                <li>We contact you within 24 hours</li>
                <li>Get personalized guidance</li>
              </ul>
            </div>

            <div className={styles.infoBox}>
              <h3>Available Services</h3>
              <ul className={styles.servicesList}>
                {serviceOptions.map((service) => (
                  <li key={service.id}>{service.title}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className={styles.formSection}>
            {submitted ? (
              // Success Message
              <div className={styles.successBox}>
                <CheckCircle className={styles.successIcon} />
                <h3>Thank You!</h3>
                <p>Your enquiry has been received successfully.</p>
                <p className={styles.successSubtext}>
                  Our team will contact you within 24 hours.
                </p>
              </div>
            ) : (
              // Form
              <form onSubmit={handleSubmit} className={styles.form}>
                <h2>Quick Enquiry Form</h2>

                {error && <div className={styles.errorMessage}>{error}</div>}

                {/* Name Field */}
                <div className={styles.formGroup}>
                  <label htmlFor="name">Full Name *</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
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
                    placeholder="Enter your phone number"
                    disabled={loading}
                  />
                </div>

                {/* Service Type Field */}
                <div className={styles.formGroup}>
                  <label htmlFor="serviceType">Select Service Type *</label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    disabled={loading}
                  >
                    <option value="">Choose a service</option>
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
                      <CompassLoader size="small" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className={styles.submitIcon} />
                      Submit Enquiry
                    </>
                  )}
                </button>

                <p className={styles.formNote}>
                  * All fields are required
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
