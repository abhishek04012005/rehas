'use client';

import { useState } from 'react';
import {
    Phone,
    Email,
    LocationOn,
    Send,
    CheckCircle,
} from '@mui/icons-material';
import LineArtBackground from '../lineArtBackground/lineArtBackground';
import { contactData } from '@/data/content';
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

    const getIconComponent = (iconName: string) => {
        const icons: { [key: string]: React.ReactNode } = {
            Email: <Email />,
            Phone: <Phone />,
            LocationOn: <LocationOn />,
        };
        return icons[iconName] || null;
    };

    return (
        <div className={styles.contact}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <LineArtBackground variant="minimal" />
                <div className={styles.heroContent}>
                    <h1>{contactData.hero.title}</h1>
                    <p>{contactData.hero.subtitle}</p>
                </div>
            </section>

            {/* Main Content */}
            <div className={styles.container}>
                <div className={styles.contactGrid}>
                    {/* Contact Information */}
                    <div className={styles.infoSection}>
                        <h2>{contactData.info.title}</h2>
                        <p className={styles.sectionDescription}>
                            {contactData.info.description}
                        </p>

                        <div className={styles.infoCards}>
                            {contactData.info.cards.map((card, idx) => (
                                <div className={styles.infoCard} key={idx}>
                                    <div className={styles.iconWrapper}>
                                        {getIconComponent(card.icon)}
                                    </div>
                                    <div>
                                        <h3>{card.title}</h3>
                                        <p>
                                            {card.link ? (
                                                <a href={card.link}>{card.value}</a>
                                            ) : (
                                                card.value
                                            )}
                                        </p>
                                        <p className={styles.secondaryText}>{card.secondaryText}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className={styles.formSection}>
                        <h2>{contactData.form.title}</h2>
                        <p className={styles.sectionDescription}>
                            {contactData.form.description}
                        </p>

                        {submitted && (
                            <div className={styles.successMessage}>
                                <CheckCircle />
                                <p>{contactData.form.successMessage}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className={styles.form}>
                            {contactData.form.fields.map((field, idx) => (
                                <div className={styles.formGroup} key={idx}>
                                    <label htmlFor={field.name}>{field.label}</label>
                                    {field.type === 'textarea' ? (
                                        <textarea
                                            id={field.name}
                                            name={field.name}
                                            value={formData[field.name as keyof typeof formData]}
                                            onChange={handleChange}
                                            required={field.required}
                                            placeholder={field.placeholder}
                                            rows={field.rows}
                                        />
                                    ) : (
                                        <input
                                            type={field.type}
                                            id={field.name}
                                            name={field.name}
                                            value={formData[field.name as keyof typeof formData]}
                                            onChange={handleChange}
                                            required={field.required}
                                            placeholder={field.placeholder}
                                        />
                                    )}
                                </div>
                            ))}

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
                                        {contactData.form.submitButton}
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