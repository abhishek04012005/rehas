

export interface MerchandiseProductDetail {
    category: 'bracelet' | 'yantra';
    name: string;
    slug: string;
    tagline: string;
    qualityTag: string;
    reviewCount: number;
    shortDescription: string;
    meaning: string;
    benefit: string;
    use: string;
    price: string;
    originalPrice: string;
    paymentHighlights: string[];
    sold: number;
    available: number;
    endsIn: string;
    pooja: {
        label: string;
        note: string;
        price: string;
    };
    description: string;
    keyFeatures: string[];
    benefits: string[];
    spiritualSignificance?: string[];
    howToUse?: string[];
    careInstructions?: string[];
    specifications?: {
        material: string;
        beadType?: string;
        size: string;
        weight: string;
        origin: string;
    };
    trustBadges?: string[];
    emotionalHook?: string;
    faq: {
        question: string;
        answer: string;
    }[];
    images: string[];
}

// Helper function to calculate real discount percentage
// Mathematical Formula: Discount % = ((Original Price - Current Price) / Original Price) × 100
export const calculateDiscountPercentage = (originalPrice: string, currentPrice: string): string => {
    try {
        // Parse prices by removing currency symbol and commas
        const original = parseFloat(originalPrice.replace(/[₹,]/g, ''));
        const current = parseFloat(currentPrice.replace(/[₹,]/g, ''));

        // Validate prices: original must be greater than 0 and current must be less than original
        if (original <= 0 || current <= 0 || current > original) return '0%';

        // Calculate discount percentage: ((Original - Current) / Original) × 100
        const discountAmount = original - current;           // Savings amount
        const discountPercentage = (discountAmount / original) * 100;  // Convert to percentage
        const roundedPercentage = Math.round(discountPercentage);      // Round to nearest whole number

        return `${roundedPercentage}% off`;
    } catch {
        return '0%';
    }
};

export const productMerchandiseData: MerchandiseProductDetail[] = [
    {
        category: 'bracelet',
        name: 'Rose Quartz Crystal Bracelet',
        slug: 'rose-quartz-crystal-bracelet',

        tagline: 'Stone of Love, Healing & Emotional Balance',
        qualityTag: 'AAA Quality • 100% Natural Rose Quartz • Handcrafted',

        reviewCount: 128,

        shortDescription:
            'A beautifully handcrafted Rose Quartz bracelet designed to attract love, promote emotional healing, and bring inner peace and harmony into your life.',

        meaning:
            'Rose Quartz is known as the “Stone of Love.” It carries gentle, nurturing energy that promotes self-love, emotional healing, compassion, and positive relationships. This bracelet symbolizes peace, love, and emotional balance.',

        benefit:
            'Emotional healing, self-love, stress relief, relationship harmony, positive energy flow, heart chakra activation',

        use:
            'Wear daily on the left wrist to absorb its calming and loving energy. Ideal for meditation, emotional healing practices, or daily wear.',

        price: '₹1.00',
        originalPrice: '₹1,220.00',

        paymentHighlights: [
            'Cards & UPI Accepted',
            'No Hidden Charges',
            'Limited Time Offer'
        ],

        sold: 241,
        available: 156,
        endsIn: '33h : 59m : 53s',

        pooja: {
            label: 'Add Energy Cleansing Ritual',
            note:
                'Your bracelet will be purified and energized through sacred rituals to enhance love, positivity, and emotional healing energy.',
            price: '₹120.00',
        },

        description:
            'This Rose Quartz Crystal Bracelet is crafted from high-quality natural rose quartz beads, known for their soft pink hue and powerful emotional healing properties. It helps open the heart chakra, attract love, reduce stress, and promote inner peace. Each bracelet is carefully handcrafted with smooth, polished beads and can be optionally energized through cleansing rituals to amplify its natural vibrations. Perfect for everyday wear, meditation, or gifting, this bracelet is both a beautiful accessory and a meaningful spiritual companion.',

        keyFeatures: [
            'Premium quality natural Rose Quartz beads',
            'Soft pink polished finish with natural inclusions',
            'Stretchable, skin-friendly, and lightweight',
            'Handcrafted with precision and care',
            'Optional energy cleansing ritual available',
        ],

        benefits: [
            'Attracts love and strengthens relationships',
            'Promotes emotional healing and self-love',
            'Reduces stress and anxiety',
            'Balances the heart chakra',
            'Encourages peace, harmony, and positivity',
        ],

        spiritualSignificance: [
            'Rose Quartz is known as the stone of unconditional love',
            'Associated with the heart chakra (Anahata)',
            'Helps release emotional wounds and negativity',
            'Encourages compassion, forgiveness, and trust',
        ],

        howToUse: [
            'Wear daily on the left wrist for maximum effect',
            'Use during meditation or relaxation practices',
            'Set your intention while wearing (love, healing, peace)',
            'Avoid wearing during heavy physical work if uncomfortable',
        ],

        careInstructions: [
            'Clean gently with a soft cloth',
            'Avoid exposure to harsh chemicals or perfumes',
            'Store in a clean, dry place',
            'Recharge by placing under moonlight occasionally',
        ],

        specifications: {
            material: 'Natural Rose Quartz Stone',
            beadType: 'Round Polished Beads',
            size: 'Free Size (Elastic)',
            weight: 'Lightweight',
            origin: 'Brazil/India',
        },

        faq: [
            {
                question: 'Is this real Rose Quartz?',
                answer:
                    'Yes, the bracelet is made from 100% natural Rose Quartz with visible natural inclusions.',
            },
            {
                question: 'Will it fit my wrist?',
                answer:
                    'Yes, it is stretchable and fits most wrist sizes comfortably.',
            },
            {
                question: 'Can I wear it daily?',
                answer:
                    'Absolutely, it is lightweight, skin-friendly, and perfect for everyday use.',
            },
            {
                question: 'Does it have healing properties?',
                answer:
                    'While not a medical product, many people use Rose Quartz for emotional healing, love, and stress relief.',
            },
        ],

        trustBadges: [
            '100% Natural Stone',
            'Handcrafted with Care',
            'Skin-Friendly & Comfortable',
            'Trusted by 200+ Customers',
        ],

        emotionalHook:
            'Invite love, peace, and emotional healing into your life with the gentle power of Rose Quartz.',

        images: [
            '/assets/bracelete/rosequartzcrystal/1.png',
            '/assets/bracelete/rosequartzcrystal/2.png',
            '/assets/bracelete/rosequartzcrystal/3.png',
        ],
    },
    {
        category: 'bracelet',
        name: 'Crystal Healing Bracelet',
        slug: 'crystal-healing-bracelet',
        tagline: 'Balance Your Energy & Emotions',
        qualityTag: 'AAA Quality • 100% Authentic • Lab Certified',
        reviewCount: 48,
        shortDescription:
            'Genuine crystal beads designed to restore balance, soothe emotions, and raise your vibration throughout the day.',
        meaning:
            'Genuine crystal beads designed to restore balance, soothe emotions, and raise your vibration throughout the day.',
        benefit: 'Emotional balance, stress relief, intuition boost, energetic harmony',
        use: 'Wear during meditation or emotional healing rituals',
        price: '₹1,264.00',
        originalPrice: '₹1,580.00',
        paymentHighlights: ['Cards Accepted', '0 Extra Cost', 'Limited Time Offer'],
        sold: 78,
        available: 146,
        endsIn: '29h : 12m : 08s',
        pooja: {
            label: 'Add Pooja',
            note:
                'Delivery Note: By opting for this puja, you will receive products that are specially energized with sacred rituals.',
            price: '₹999.00',
        },
        description:
            'This Crystal Healing Bracelet is crafted with selected stones that help bring emotional harmony, mental clarity, and energetic protection.',
        keyFeatures: [
            'Genuine crystal beads for energetic balance',
            'Smooth finish for all-day comfort',
            'Designed to support emotional wellbeing',
            'Perfect for daily wear and meditation',
        ],
        benefits: [
            'Emotional balance',
            'Stress relief',
            'Enhanced intuition',
            'Positive energy flow',
        ],
        spiritualSignificance: [
            'Crystal healing is rooted in ancient wisdom and chakra balancing practices',
            'Promotes alignment of physical, emotional, and spiritual energy',
            'Supports connection to higher consciousness and inner wisdom',
            'Enhances intuitive and psychic abilities through vibrational frequencies',
        ],
        faq: [
            {
                question: 'How should I wear the bracelet?',
                answer:
                    'Wear it on your left wrist to receive healing energies during the day.',
            },
            {
                question: 'Can I wear it while sleeping?',
                answer:
                    'Yes, but remove the bracelet if you feel any discomfort while resting.',
            },
        ],
        images: [
            'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1547219141-49acc3db90f7?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1583974685839-2d4fa0ef2c3a?w=600&h=600&fit=crop',
        ],
    },
    {
        category: 'bracelet',
        name: 'Tigers Eye Bracelet',
        slug: 'tigers-eye-bracelet',
        tagline: 'Confidence, Courage & Protection',
        qualityTag: 'AAA Quality • 100% Authentic • Lab Certified',
        reviewCount: 39,
        shortDescription:
            'A powerful bracelet made with Tiger Eye to support courage, focus, and grounded success in every decision.',
        meaning:
            'A powerful bracelet made with Tiger Eye to support courage, focus, and grounded success in every decision.',
        benefit: 'Confidence, courage, grounding, protection',
        use: 'Wear when you need focus, protection, and personal power',
        price: '₹1,498.75',
        originalPrice: '₹1,873.44',
        paymentHighlights: ['Cards Accepted', '0 Extra Cost', 'Limited Time Offer'],
        sold: 61,
        available: 119,
        endsIn: '40h : 22m : 11s',
        description:
            'Tiger Eye is known as a stone of courage and clarity. This bracelet helps stabilize your energy and promote inner power.',
        keyFeatures: [
            'Polished Tiger Eye beads',
            'Grounding and protective energy',
            'Designed for focus and confidence',
            'Durable stretch cord for comfort',
        ],
        benefits: [
            'Courage and confidence',
            'Inner stability',
            'Protection from negative thoughts',
            'Improved decision-making',
        ],
        spiritualSignificance: [
            'Tiger Eye is a stone of power and protection in many traditions',
            'Associated with the solar plexus chakra for personal will and strength',
            'Known to attract prosperity through focused intention',
            'Represents the balance between shadow and light',
        ],
        faq: [
            {
                question: 'Is this bracelet good for work?',
                answer:
                    'Yes, it is especially helpful for focus and confidence during professional activities.',
            },
            {
                question: 'How do I care for it?',
                answer:
                    'Keep it away from water and recharge it under moonlight occasionally.',
            },
        ],
        images: [
            'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1529372839458-34c4e4e0a7c8?w=600&h=600&fit=crop',
        ],
        pooja: {
            label: 'Add Pooja',
            note:
                'Delivery Note: By opting for this puja, you will receive products that are specially energized with sacred rituals.',
            price: '₹999.00',
        },
    },
    {
        category: 'bracelet',
        name: 'Rose Quartz Bracelet',
        slug: 'rose-quartz-bracelet',
        tagline: 'Heart Healing & Loving Energy',
        qualityTag: 'AAA Quality • 100% Authentic • Lab Certified',
        reviewCount: 44,
        shortDescription:
            'A soft, loving bracelet crafted to open the heart, invite compassion, and attract harmonious relationships.',
        meaning:
            'A soft, loving bracelet crafted to open the heart, invite compassion, and attract harmonious relationships.',
        benefit: 'Heart healing, self-love, emotional calm, relationship support',
        use: 'Wear to support love energy and emotional healing',
        price: '₹1,099.00',
        originalPrice: '₹1,373.00',
        paymentHighlights: ['Cards Accepted', '0 Extra Cost', 'Limited Time Offer'],
        sold: 88,
        available: 145,
        endsIn: '27h : 05m : 59s',
        description:
            'Rose Quartz supports emotional healing, self-love, and peaceful relationships. This bracelet is ideal for anyone seeking a gentle energetic boost.',
        keyFeatures: [
            'Premium Rose Quartz beads',
            'Supports heart chakra energy',
            'Comfortable, everyday wear',
            'Elegant soft pink finish',
        ],
        benefits: [
            'Self-love and compassion',
            'Emotional balance',
            'Harmonious relationships',
            'Calm and nurturing energy',
        ],
        spiritualSignificance: [
            'Rose Quartz is the universal stone of love in crystal healing traditions',
            'Opens and heals the heart chakra for deep emotional work',
            'Attracts unconditional love and divine compassion',
            'Promotes forgiveness, peace, and inner child healing',
        ],
        faq: [
            {
                question: 'Can I wear this every day?',
                answer:
                    'Yes, it is gentle enough for daily wear and supports long-term emotional balance.',
            },
            {
                question: 'Does it come with a box?',
                answer:
                    'Yes, each bracelet ships in protective packaging with a care card.',
            },
        ],
        images: [
            'https://images.unsplash.com/photo-1515562141207-6461a4b5b629?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&h=600&fit=crop',
        ],
        pooja: {
            label: 'Add Pooja',
            note:
                'Delivery Note: By opting for this puja, you will receive products that are specially energized with sacred rituals.',
            price: '₹999.00',
        },
    },
    {
        category: 'yantra',
        name: 'Sri Yantra',
        slug: 'sri-yantra',
        tagline: 'Harmonize Energy & Manifest Prosperity',
        qualityTag: 'AAA Quality • 100% Authentic • Lab Certified',
        reviewCount: 28,
        shortDescription:
            'A powerful yantra that helps align your energy field, sharpen focus, and support abundance rituals.',
        meaning:
            'A powerful yantra that helps align your energy field, sharpen focus, and support abundance rituals.',
        benefit: 'Manifestation, mental clarity, abundance, energy alignment',
        use: 'Place on your altar or workspace for daily energy rituals',
        price: '₹1,264.00',
        originalPrice: '₹1,580.00',
        paymentHighlights: ['Cards Accepted', '0 Extra Cost', 'Limited Time Offer'],
        sold: 43,
        available: 98,
        endsIn: '31h : 47m : 20s',
        description:
            'The Sri Yantra is one of the most revered sacred geometries for spiritual empowerment, abundance, and mental clarity.',
        keyFeatures: [
            'Sacred Sri Yantra design',
            'Energized for manifestation',
            'Ideal for home or ritual space',
            'Premium craftsmanship',
        ],
        benefits: [
            'Abundance manifestation',
            'Mental clarity',
            'Spiritual balance',
            'Energetic harmony',
        ],
        spiritualSignificance: [
            'Sri Yantra is the most sacred geometry representing the divine feminine energy',
            'Symbolizes the union of Shiva and Shakti, consciousness and creation',
            'Activates the crown chakra and connection to divine abundance',
            'Used for thousands of years in tantric and vedic practices for manifestation',
        ],
        faq: [
            {
                question: 'How should I place the Yantra?',
                answer:
                    'Place it on your altar, workspace, or meditation area facing east or north.',
            },
            {
                question: 'Can it be used during meditation?',
                answer:
                    'Yes, it enhances focus and deepens your meditative practice.',
            },
        ],
        images: [
            'https://images.unsplash.com/photo-1589519160732-57fc498494f8?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1578398967566-cbc3c8f2a1d5?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1580893438979-16ec42127dd5?w=600&h=600&fit=crop',
        ],
        pooja: {
            label: 'Add Pooja',
            note:
                'Delivery Note: By opting for this puja, you will receive products that are specially energized with sacred rituals.',
            price: '₹999.00',
        },
    },
    {
        category: 'yantra',
        name: 'Mahalaxmi Yantra',
        slug: 'mahalaxmi-yantra',
        tagline: 'Invite Wealth, Grace & Prosperity',
        qualityTag: 'AAA Quality • 100% Authentic • Lab Certified',
        reviewCount: 34,
        shortDescription:
            'A sacred yantra dedicated to the goddess of prosperity, designed to attract wealth and auspicious energy.',
        meaning:
            'A sacred yantra dedicated to the goddess of prosperity, designed to attract wealth and auspicious energy.',
        benefit: 'Wealth attraction, prosperity, auspicious energy, abundance support',
        use: 'Use in your home altar or business space for prosperity rituals',
        price: '₹1,498.75',
        originalPrice: '₹1,873.44',
        paymentHighlights: ['Cards Accepted', '0 Extra Cost', 'Limited Time Offer'],
        sold: 51,
        available: 133,
        endsIn: '25h : 15m : 12s',
        description:
            'The Mahalaxmi Yantra is a powerful tool for inviting prosperity, success, and abundance into your home or business.',
        keyFeatures: [
            'Energized by Vedic rituals',
            'Ideal for wealth-focused practice',
            'Premium yantra craftsmanship',
            'Perfect for altar display',
        ],
        benefits: [
            'Wealth attraction',
            'Improved financial flow',
            'Business abundance',
            'Spiritual grace',
        ],
        spiritualSignificance: [
            'Mahalaxmi Yantra honors the goddess of wealth, prosperity, and abundance',
            'Invokes divine grace and blessings for financial success and auspiciousness',
            'Represents the flow of prosperity in all aspects of life',
            'Traditionally used in homes and businesses for abundant manifestation',
        ],
        faq: [
            {
                question: 'Is this yantra suitable for businesses?',
                answer:
                    'Yes, it is often used to support financial success and auspicious growth.',
            },
            {
                question: 'Does it come with activation instructions?',
                answer:
                    'Yes, each yantra includes simple guidance for activation and placement.',
            },
        ],
        images: [
            'https://images.unsplash.com/photo-1589519160732-57fc498494f8?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1578398967566-cbc3c8f2a1d5?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1580893438979-16ec42127dd5?w=600&h=600&fit=crop',
        ],
        pooja: {
            label: 'Add Pooja',
            note:
                'Delivery Note: By opting for this puja, you will receive products that are specially energized with sacred rituals.',
            price: '₹999.00',
        },
    },
];
