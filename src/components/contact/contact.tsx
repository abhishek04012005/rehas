'use client';

import { useState } from 'react';
import {
    Phone,
    Email,
    LocationOn,
    AccessTime,
    Send,
    CheckCircle,
} from '@mui/icons-material';
import styles from './contact.module.css';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate form submission
        setTimeout(() => {
            setSubmitted(true);
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            setLoading(false);
            setTimeout(() => setSubmitted(false), 3000);
        }, 1500);
    };

    return (
        <div className={styles.contact}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1>Get in Touch</h1>
                    <p>We'd love to hear from you. Reach out to us anytime.</p>
                </div>
            </section>

            {/* Main Content */}
            <div className={styles.container}>
                <div className={styles.contactGrid}>
                    {/* Contact Information */}
                    <div className={styles.infoSection}>
                        <h2>Contact Information</h2>
                        <p className={styles.sectionDescription}>
                            Have questions? We're here to help and answer any question you might have.
                        </p>

                        <div className={styles.infoCards}>
                            {/* Email */}
                            <div className={styles.infoCard}>
                                <div className={styles.iconWrapper}>
                                    <Email />
                                </div>
                                <div>
                                    <h3>Email</h3>
                                    <p>
                                        <a href="mailto:info@rehas.com">info@rehas.com</a>
                                    </p>
                                    <p className={styles.secondaryText}>We'll respond within 24 hours</p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className={styles.infoCard}>
                                <div className={styles.iconWrapper}>
                                    <Phone />
                                </div>
                                <div>
                                    <h3>Phone</h3>
                                    <p>
                                        <a href="tel:+1234567890">+1 (234) 567-890</a>
                                    </p>
                                    <p className={styles.secondaryText}>Mon-Fri, 9AM-6PM UTC</p>
                                </div>
                            </div>

                            {/* Location */}
                            <div className={styles.infoCard}>
                                <div className={styles.iconWrapper}>
                                    <LocationOn />
                                </div>
                                <div>
                                    <h3>Location</h3>
                                    <p>123 Cosmic Street</p>
                                    <p className={styles.secondaryText}>Universe City, UC 12345</p>
                                </div>
                            </div>

                           
                        </div>


                    </div>

                    {/* Contact Form */}
                    <div className={styles.formSection}>
                        <h2>Send us a Message</h2>
                        <p className={styles.sectionDescription}>
                            Fill out the form below and we'll get back to you as soon as possible.
                        </p>

                        {submitted && (
                            <div className={styles.successMessage}>
                                <CheckCircle />
                                <p>Thank you! Your message has been sent successfully.</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name">Full Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your name"
                                />
                            </div>


                            <div className={styles.formGroup}>
                                <label htmlFor="phone">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+1 (234) 567-890"
                                />
                            </div>

                           

                            <div className={styles.formGroup}>
                                <label htmlFor="message">Message *</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    placeholder="Tell us more about your inquiry..."
                                    rows={6}
                                />
                            </div>

                            <button
                                type="submit"
                                className={styles.submitBtn}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className={styles.loader}></span>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
