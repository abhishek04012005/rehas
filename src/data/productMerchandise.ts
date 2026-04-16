

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
            '/assets/bracelete/rosequartzcrystal/rosequartzcrystal_front.png',
            '/assets/bracelete/rosequartzcrystal/rosequartzcrystal_center.png',
            '/assets/bracelete/rosequartzcrystal/rosequartzcrystal_last.png',
        ],
    },
    {
        category: 'bracelet',
        name: 'Pyrite Bracelet',
        slug: 'pyrite-bracelet',

        tagline: 'Stone of Wealth, Protection & Confidence',
        qualityTag: 'AAA Quality • 100% Natural Pyrite • Handcrafted',

        reviewCount: 96,

        shortDescription:
            'A powerful Pyrite bracelet designed to attract wealth, boost confidence, and protect against negative energies.',

        meaning:
            'Pyrite, often called the “Stone of Wealth,” is known for its strong protective and grounding energy. It enhances confidence, attracts abundance, and shields against negativity while promoting mental clarity and strength.',

        benefit:
            'Wealth attraction, protection from negativity, confidence boost, mental clarity, energy shielding, success manifestation',

        use:
            'Wear daily on the left hand to attract wealth and protection energy. Ideal for business professionals, meditation, and manifestation practices.',

        price: '₹124.00',
        originalPrice: '₹1,499.00',

        paymentHighlights: [
            'Cards & UPI Accepted',
            'No Hidden Charges',
            'Limited Time Offer'
        ],

        sold: 178,
        available: 132,
        endsIn: '29h : 14m : 22s',

        pooja: {
            label: 'Add Energy Activation Ritual',
            note:
                'Your bracelet will be purified and energized through sacred rituals to enhance wealth, protection, and success energy.',
            price: '₹150.00',
        },

        description:
            'This Pyrite Bracelet is crafted from high-quality natural pyrite stones, known for their metallic golden shine and strong protective energy. Often associated with wealth and success, Pyrite helps boost confidence, improve focus, and protect against negative influences. The bracelet is carefully handcrafted with smooth, polished beads that are comfortable for daily wear. It can also be optionally energized through sacred rituals to amplify its natural vibrations. Ideal for professionals, entrepreneurs, and anyone seeking growth, protection, and financial abundance.',

        keyFeatures: [
            'Premium quality natural Pyrite stones',
            'Metallic golden finish with natural texture',
            'Stretchable, durable, and skin-friendly',
            'Handcrafted with precision',
            'Optional energy activation ritual available',
        ],

        benefits: [
            'Attracts wealth, prosperity, and success',
            'Boosts confidence and decision-making ability',
            'Protects from negative energy and evil eye',
            'Enhances focus and mental clarity',
            'Supports manifestation and goal achievement',
        ],

        spiritualSignificance: [
            'Pyrite is known as the stone of wealth and abundance',
            'Associated with the Solar Plexus Chakra (Manipura)',
            'Acts as a shield against negative energy',
            'Enhances willpower, confidence, and inner strength',
        ],

        howToUse: [
            'Wear daily on the left wrist for best results',
            'Use during meditation or manifestation rituals',
            'Set clear intentions for wealth and protection',
            'Avoid wearing during heavy physical activities if uncomfortable',
        ],

        careInstructions: [
            'Clean with a soft dry cloth',
            'Avoid water and harsh chemicals',
            'Store in a dry place away from moisture',
            'Recharge by placing near sunlight occasionally',
        ],

        specifications: {
            material: 'Natural Pyrite Stone',
            beadType: 'Square / Chunky Polished Beads',
            size: 'Free Size (Elastic)',
            weight: 'Medium',
            origin: 'Peru/India',
        },

        faq: [
            {
                question: 'Is this real Pyrite?',
                answer:
                    'Yes, the bracelet is made from 100% natural Pyrite with its signature metallic shine.',
            },
            {
                question: 'Can I wear it every day?',
                answer:
                    'Yes, it is durable and suitable for daily wear, but avoid exposure to water.',
            },
            {
                question: 'Does it really attract wealth?',
                answer:
                    'Pyrite is traditionally believed to attract wealth and success, though it is not a guaranteed financial solution.',
            },
            {
                question: 'Will it fit my wrist?',
                answer:
                    'Yes, it is stretchable and designed to fit most wrist sizes comfortably.',
            },
        ],

        trustBadges: [
            '100% Natural Stone',
            'Handcrafted with Care',
            'Skin-Friendly & Durable',
            'Trusted by 150+ Customers',
        ],

        emotionalHook:
            'Unlock confidence, attract wealth, and shield your energy with the powerful force of Pyrite.',

        images: [
            '/assets/bracelete/pyrite/1.png',
            '/assets/bracelete/pyrite/2.png',
            '/assets/bracelete/pyrite/3.png',
            '/assets/bracelete/pyrite/video.mp4'
        ],
    },
    {
        category: 'bracelet',
        name: 'Citrine Bracelet',
        slug: 'citrine-bracelet',

        tagline: 'Stone of Wealth, Success & Positive Energy',
        qualityTag: 'AAA Quality • 100% Natural Citrine • Handcrafted',

        reviewCount: 124,

        shortDescription:
            'A powerful Citrine bracelet designed to attract wealth, boost confidence, and fill your life with positivity and success.',

        meaning:
            'Citrine is known as the Merchant’s Stone or Success Stone. It is believed to attract wealth, abundance, and prosperity while promoting positivity, confidence, and motivation. It helps remove negative energy and encourages a success-oriented mindset.',

        benefit:
            'Wealth attraction, success, positivity, confidence boost, energy cleansing, motivation',

        use:
            'Wear daily on the left hand to attract prosperity and positive energy. Ideal for business growth, career success, and financial stability.',

        price: '₹139.00',
        originalPrice: '₹1,399.00',

        paymentHighlights: [
            'Cards & UPI Accepted',
            'No Hidden Charges',
            'Limited Time Offer'
        ],

        sold: 298,
        available: 160,
        endsIn: '24h : 10m : 15s',

        pooja: {
            label: 'Add Energy Activation Ritual',
            note:
                'Your bracelet will be purified and energized through sacred rituals to enhance wealth, success, and positive energy attraction.',
            price: '₹150.00',
        },

        description:
            'This Citrine Bracelet is crafted from premium natural citrine stones known for their warm golden-yellow glow. Citrine is widely regarded as the stone of wealth and success, helping to attract financial growth, opportunities, and prosperity. It also enhances confidence, creativity, and motivation, making it ideal for entrepreneurs, professionals, and students. Each bead is finely polished and strung on a durable elastic band, ensuring comfort and elegance for daily wear. Perfect for those seeking abundance, positivity, and personal growth.',

        keyFeatures: [
            'Premium quality natural Citrine stones',
            'Beautiful golden-yellow translucent beads',
            'Strong wealth and success attracting properties',
            'Stretchable, durable, and skin-friendly',
            'Handcrafted with precision',
            'Optional energy activation ritual available',
        ],

        benefits: [
            'Attracts wealth, prosperity, and financial growth',
            'Boosts confidence and self-esteem',
            'Removes negative energy and promotes positivity',
            'Enhances focus, creativity, and motivation',
            'Supports career growth and business success',
            'Promotes happiness and emotional balance',
        ],

        spiritualSignificance: [
            'Known as the Merchant’s Stone or Success Stone',
            'Associated with the Solar Plexus Chakra (Manipura)',
            'Enhances personal power and manifestation energy',
            'Helps in clearing negative energy and blockages',
        ],

        howToUse: [
            'Wear daily on the left wrist for best results',
            'Use during business meetings or important decisions',
            'Keep intentions focused on wealth and success',
            'Ideal for entrepreneurs, professionals, and students',
        ],

        careInstructions: [
            'Clean with a soft dry cloth',
            'Avoid water and harsh chemicals',
            'Store in a clean and dry place',
            'Recharge under sunlight occasionally for best results',
        ],

        specifications: {
            material: 'Natural Citrine Stone',
            beadType: 'Round Polished Beads',
            size: 'Free Size (Elastic)',
            weight: 'Light to Medium',
            origin: 'Brazil/India',
        },

        faq: [
            {
                question: 'Is this real Citrine?',
                answer:
                    'Yes, it is made from natural Citrine stones with natural color variations.',
            },
            {
                question: 'What is Citrine used for?',
                answer:
                    'Citrine is believed to attract wealth, success, and positive energy.',
            },
            {
                question: 'Can I wear it daily?',
                answer:
                    'Yes, it is comfortable and suitable for everyday use.',
            },
            {
                question: 'Will it fit my wrist?',
                answer:
                    'Yes, it is stretchable and fits most wrist sizes comfortably.',
            },
        ],

        trustBadges: [
            '100% Natural Stone',
            'Handcrafted with Care',
            'Skin-Friendly & Durable',
            'Trusted by 250+ Customers',
        ],

        emotionalHook:
            'Unlock wealth, success, and positivity with the powerful energy of Citrine.',

        images: [
            '/assets/bracelete/citrine/citrine_front.png',
            '/assets/bracelete/citrine/citrine_center.png',
            '/assets/bracelete/citrine/3.png',
        ],
    },
    {
        category: 'bracelet',
        name: '7 Chakra Buddha Bracelet',
        slug: '7-chakra-buddha-bracelet',

        tagline: 'Balance Energy, Heal Chakras & Attract Positivity',
        qualityTag: 'AAA Quality • Natural Chakra Stones • Handcrafted',

        reviewCount: 124,

        shortDescription:
            'A powerful 7 Chakra Buddha bracelet designed to balance energy centers, promote healing, and attract peace, positivity, and spiritual growth.',

        meaning:
            'This bracelet is made using seven natural stones representing the seven chakras of the body. Combined with the Buddha charm, it symbolizes mindfulness, inner peace, and spiritual awakening. It helps align energy flow, remove blockages, and restore emotional and physical balance.',

        benefit:
            'Chakra balancing, emotional healing, stress relief, spiritual growth, positive energy attraction, improved focus and clarity',

        use:
            'Wear daily on the left hand to absorb healing energy and balance chakras. Ideal for meditation, yoga, spiritual practices, and daily wear.',

        price: '₹149.00',
        originalPrice: '₹1,499.00',

        paymentHighlights: [
            'Cards & UPI Accepted',
            'No Hidden Charges',
            'Limited Time Offer'
        ],

        sold: 236,
        available: 98,
        endsIn: '27h : 12m : 10s',

        pooja: {
            label: 'Add Chakra Energy Activation Ritual',
            note:
                'Your bracelet will be purified and energized through sacred rituals to activate all seven chakras and enhance healing, positivity, and spiritual energy.',
            price: '₹150.00',
        },

        description:
            'This 7 Chakra Buddha Bracelet is crafted using high-quality natural stones, each representing a specific chakra in the body. The vibrant colors symbolize energy flow from the root to the crown chakra, helping to restore balance and harmony. The centerpiece Buddha charm represents peace, mindfulness, and enlightenment. Wearing this bracelet helps reduce stress, improve focus, and promote emotional well-being. Each bead is polished for a smooth finish and strung on a durable elastic band for comfortable daily wear. It can also be energized through sacred rituals to enhance its spiritual properties. Ideal for meditation, healing practices, and everyday positivity.',

        keyFeatures: [
            'Authentic 7 chakra natural stones',
            'Premium Buddha head charm centerpiece',
            'Vibrant multi-color energy beads',
            'Stretchable, durable, and skin-friendly',
            'Handcrafted with precision',
            'Optional chakra energy activation ritual available',
        ],

        benefits: [
            'Balances all seven chakras',
            'Promotes emotional stability and inner peace',
            'Reduces stress and anxiety',
            'Enhances focus, clarity, and mindfulness',
            'Attracts positivity and spiritual growth',
            'Supports meditation and healing practices',
        ],

        spiritualSignificance: [
            'Represents all seven chakras of the body',
            'Helps remove energy blockages',
            'Buddha symbolizes peace, awareness, and enlightenment',
            'Aligns mind, body, and soul energy',
        ],

        howToUse: [
            'Wear daily on the left wrist for best results',
            'Use during meditation, yoga, or spiritual practices',
            'Focus on intentions while wearing the bracelet',
            'Cleanse regularly to maintain energy flow',
        ],

        careInstructions: [
            'Clean with a soft dry cloth',
            'Avoid water, perfumes, and harsh chemicals',
            'Store in a clean and dry place',
            'Recharge under sunlight or moonlight periodically',
        ],

        specifications: {
            material: 'Natural Chakra Stones',
            beadType: 'Round Polished Beads',
            size: 'Free Size (Elastic)',
            weight: 'Light',
            origin: 'India/Tibet',
        },

        faq: [
            {
                question: 'What are chakra stones?',
                answer:
                    'Chakra stones are natural crystals associated with the seven energy centers in the body, helping to balance and align energy.',
            },
            {
                question: 'Can I wear it every day?',
                answer:
                    'Yes, it is designed for daily wear and spiritual use.',
            },
            {
                question: 'Does it really balance chakras?',
                answer:
                    'It is believed in spiritual practices that chakra stones help balance energy, though results vary by individual.',
            },
            {
                question: 'Will it fit my wrist?',
                answer:
                    'Yes, it is stretchable and fits most wrist sizes comfortably.',
            },
        ],

        trustBadges: [
            '100% Natural Stones',
            'Handcrafted with Care',
            'Skin-Friendly & Durable',
            'Trusted by 200+ Customers',
        ],

        emotionalHook:
            'Restore balance, awaken your inner peace, and align your energy with the power of 7 Chakras.',

        images: [
            '/assets/bracelete/chakra/1.png',
            '/assets/bracelete/chakra/2.png',
            '/assets/bracelete/chakra/3.png',
        ],
    },
    {
        category: 'bracelet',
        name: 'Howlite Bracelet',
        slug: 'howlite-bracelet',

        tagline: 'Stone of Calmness, Peace & Emotional Healing',
        qualityTag: 'AAA Quality • 100% Natural Howlite • Handcrafted',

        reviewCount: 88,

        shortDescription:
            'A calming Howlite bracelet designed to reduce stress, promote peace, and bring emotional balance into your life.',

        meaning:
            'Howlite is known as a powerful calming stone that helps soothe the mind and reduce anxiety. It absorbs negative energy, promotes patience, and encourages emotional expression while supporting inner peace and awareness.',

        benefit:
            'Stress relief, emotional healing, calmness, better sleep, anger control, mental clarity, anxiety reduction',

        use:
            'Wear daily on the left hand to absorb calming energy. Ideal for meditation, relaxation, sleep support, and emotional healing practices.',

        price: '₹129.00',
        originalPrice: '₹1,299.00',

        paymentHighlights: [
            'Cards & UPI Accepted',
            'No Hidden Charges',
            'Limited Time Offer'
        ],

        sold: 164,
        available: 110,
        endsIn: '26h : 45m : 18s',

        pooja: {
            label: 'Add Energy Activation Ritual',
            note:
                'Your bracelet will be purified and energized through sacred rituals to enhance calmness, emotional healing, and positive energy.',
            price: '₹150.00',
        },

        description:
            'This Howlite Bracelet is crafted from high-quality natural howlite stones, recognized for their beautiful white color with subtle grey veining. Known for its soothing energy, Howlite helps calm an overactive mind, reduce stress, and promote emotional balance. It is especially beneficial for those dealing with anxiety, anger, or sleep issues. The bracelet is handcrafted with smooth, polished beads for a comfortable and elegant daily wear experience. It can also be energized through sacred rituals to amplify its calming and healing properties. Ideal for individuals seeking peace, relaxation, and mental clarity.',

        keyFeatures: [
            'Premium quality natural Howlite stones',
            'Elegant white beads with natural grey veins',
            'Smooth polished finish for comfortable wear',
            'Stretchable, durable, and skin-friendly',
            'Handcrafted with precision',
            'Optional energy activation ritual available',
        ],

        benefits: [
            'Reduces stress, anxiety, and overthinking',
            'Promotes calmness and emotional stability',
            'Helps control anger and impatience',
            'Supports better sleep and relaxation',
            'Enhances mindfulness and awareness',
            'Absorbs negative energy',
        ],

        spiritualSignificance: [
            'Known as the stone of calmness and patience',
            'Associated with the Crown Chakra (Sahasrara)',
            'Helps quiet the mind and enhance awareness',
            'Encourages emotional healing and spiritual growth',
        ],

        howToUse: [
            'Wear daily on the left wrist for best results',
            'Use during meditation or relaxation sessions',
            'Keep near your pillow for better sleep',
            'Set intentions for calmness and peace while wearing',
        ],

        careInstructions: [
            'Clean with a soft dry cloth',
            'Avoid water, perfumes, and harsh chemicals',
            'Store in a clean, dry place',
            'Recharge under moonlight or sunlight occasionally',
        ],

        specifications: {
            material: 'Natural Howlite Stone',
            beadType: 'Round Polished Beads',
            size: 'Free Size (Elastic)',
            weight: 'Light',
            origin: 'India/USA',
        },

        faq: [
            {
                question: 'Is this real Howlite?',
                answer:
                    'Yes, the bracelet is made from natural Howlite stones with unique veining patterns.',
            },
            {
                question: 'Can it help with anxiety?',
                answer:
                    'Howlite is traditionally believed to calm the mind and reduce stress, though results may vary.',
            },
            {
                question: 'Can I wear it every day?',
                answer:
                    'Yes, it is comfortable and suitable for daily wear.',
            },
            {
                question: 'Will it fit my wrist?',
                answer:
                    'Yes, it is stretchable and fits most wrist sizes comfortably.',
            },
        ],

        trustBadges: [
            '100% Natural Stone',
            'Handcrafted with Care',
            'Skin-Friendly & Durable',
            'Trusted by 150+ Customers',
        ],

        emotionalHook:
            'Find peace within, calm your mind, and embrace serenity with the soothing energy of Howlite.',

        images: [
            '/assets/bracelete/howlite/1.png',
            '/assets/bracelete/howlite/2.png',
            '/assets/bracelete/howlite/3.png',
        ],
    },
    {
        category: 'bracelet',
        name: '5 Element Energy Balance Bracelet',
        slug: '5-element-energy-balance-bracelet',

        tagline: 'Balance Your Energy, Align Nature Within You',
        qualityTag: 'AAA Quality • Natural Multi-Stone • Handcrafted',

        reviewCount: 102,

        shortDescription:
            'A powerful multi-stone bracelet designed to balance the five natural elements, promote harmony, and protect your energy.',

        meaning:
            'This bracelet is crafted using a unique combination of natural stones representing the five elements—Earth, Fire, Metal, Water, and Energy flow. It helps balance internal energies, remove blockages, and create harmony between mind, body, and environment.',

        benefit:
            'Energy balancing, protection from negativity, emotional stability, grounding, confidence boost, harmony and alignment',

        use:
            'Wear daily on the left hand to absorb balanced elemental energy. Ideal for meditation, healing practices, and daily protection.',

        price: '₹149.00',
        originalPrice: '₹1,499.00',

        paymentHighlights: [
            'Cards & UPI Accepted',
            'No Hidden Charges',
            'Limited Time Offer'
        ],

        sold: 198,
        available: 120,
        endsIn: '28h : 10m : 05s',

        pooja: {
            label: 'Add Energy Activation Ritual',
            note:
                'Your bracelet will be purified and energized through sacred rituals to activate all five elements and enhance protection, balance, and positive energy.',
            price: '₹150.00',
        },

        description:
            'This 5 Element Energy Balance Bracelet is crafted using premium natural stones, each representing a powerful natural element. The combination of green aventurine (Earth), carnelian (Fire), tiger eye (stability), black stone (protection), and hematite (metal energy) creates a perfect balance of energies. It is designed to harmonize your inner energy, protect against negativity, and promote emotional and physical well-being. Each bead is carefully polished and assembled for a comfortable and stylish daily wear. This bracelet is ideal for those seeking balance, protection, and a boost in confidence and stability.',

        keyFeatures: [
            'Combination of 5 natural element stones',
            'Premium polished multi-color beads',
            'Balanced design for energy alignment',
            'Stretchable, durable, and skin-friendly',
            'Handcrafted with precision',
            'Optional energy activation ritual available',
        ],

        benefits: [
            'Balances all five natural elements',
            'Protects from negative energy and evil eye',
            'Promotes emotional and mental stability',
            'Enhances grounding and confidence',
            'Supports energy flow and harmony',
            'Boosts positivity and inner strength',
        ],

        spiritualSignificance: [
            'Represents the balance of Earth, Fire, Metal, and energy flow',
            'Helps align internal and external energies',
            'Encourages harmony between mind and body',
            'Used in spiritual practices for energy stabilization',
        ],

        howToUse: [
            'Wear daily on the left wrist for best results',
            'Use during meditation or energy healing practices',
            'Set intentions for balance and protection',
            'Avoid wearing during heavy physical activities if uncomfortable',
        ],

        careInstructions: [
            'Clean with a soft dry cloth',
            'Avoid water and harsh chemicals',
            'Store in a dry and clean place',
            'Recharge under sunlight or moonlight occasionally',
        ],

        specifications: {
            material: 'Natural Multi-Stone (Aventurine, Carnelian, Tiger Eye, Hematite, Black Stone)',
            beadType: 'Round Polished Beads',
            size: 'Free Size (Elastic)',
            weight: 'Light to Medium',
            origin: 'India/Tibet',
        },

        faq: [
            {
                question: 'What are the 5 elements in this bracelet?',
                answer:
                    'It includes stones representing Earth, Fire, Metal, grounding, and protection energies.',
            },
            {
                question: 'Can I wear it daily?',
                answer:
                    'Yes, it is designed for comfortable daily wear.',
            },
            {
                question: 'Does it really balance energy?',
                answer:
                    'In spiritual practices, these stones are believed to help balance energy, though results may vary.',
            },
            {
                question: 'Will it fit my wrist?',
                answer:
                    'Yes, it is stretchable and fits most wrist sizes comfortably.',
            },
        ],

        trustBadges: [
            '100% Natural Stones',
            'Handcrafted with Care',
            'Skin-Friendly & Durable',
            'Trusted by 180+ Customers',
        ],

        emotionalHook:
            'Bring balance to your life, align your energy, and stay protected with the power of the five elements.',

        images: [
            '/assets/bracelete/5elementenergybalance/1.png',
            '/assets/bracelete/5elementenergybalance/2.png',
            '/assets/bracelete/5elementenergybalance/3.png',
        ],
    },
    {
        category: 'bracelet',
        name: 'Hematite Bracelet',
        slug: 'hematite-bracelet',

        tagline: 'Stone of Grounding, Protection & Strength',
        qualityTag: 'AAA Quality • 100% Natural Hematite • Handcrafted',

        reviewCount: 112,

        shortDescription:
            'A powerful Hematite bracelet designed to provide grounding, protection, and mental clarity while keeping your energy balanced.',

        meaning:
            'Hematite is known as a strong grounding and protective stone. It absorbs negative energy, stabilizes emotions, and enhances focus. This bracelet helps connect you to the earth’s energy, promoting strength, confidence, and balance in daily life.',

        benefit:
            'Grounding, protection from negativity, mental clarity, confidence boost, emotional stability, stress reduction',

        use:
            'Wear daily on the left hand to absorb grounding energy. Ideal for meditation, focus, protection, and daily wear.',

        price: '₹139.00',
        originalPrice: '₹1,299.00',

        paymentHighlights: [
            'Cards & UPI Accepted',
            'No Hidden Charges',
            'Limited Time Offer'
        ],

        sold: 210,
        available: 140,
        endsIn: '30h : 05m : 12s',

        pooja: {
            label: 'Add Energy Activation Ritual',
            note:
                'Your bracelet will be purified and energized through sacred rituals to enhance grounding, protection, and strength.',
            price: '₹150.00',
        },

        description:
            'This Hematite Bracelet is crafted using high-quality natural hematite stones, known for their sleek metallic shine and powerful grounding properties. Hematite is widely used for protection against negative energies and for stabilizing emotional and mental states. The bracelet helps improve focus, boost confidence, and provide a sense of strength and stability. Each bead is smoothly polished and strung on a durable elastic band for comfortable daily wear. It can also be energized through sacred rituals to amplify its protective and grounding effects. Ideal for individuals seeking stability, protection, and mental clarity.',

        keyFeatures: [
            'Premium quality natural Hematite stones',
            'Metallic polished beads with high shine',
            'Strong grounding and protective properties',
            'Stretchable, durable, and skin-friendly',
            'Handcrafted with precision',
            'Optional energy activation ritual available',
        ],

        benefits: [
            'Provides strong grounding and stability',
            'Protects from negative energy and stress',
            'Enhances focus and mental clarity',
            'Boosts confidence and inner strength',
            'Helps balance emotions and reduce anxiety',
            'Supports decision-making and concentration',
        ],

        spiritualSignificance: [
            'Known as the stone of grounding and protection',
            'Associated with the Root Chakra (Muladhara)',
            'Helps connect with earth energy',
            'Stabilizes mind, body, and emotions',
        ],

        howToUse: [
            'Wear daily on the left wrist for best results',
            'Use during meditation for grounding and focus',
            'Set intentions for protection and strength',
            'Avoid wearing during heavy physical activities if uncomfortable',
        ],

        careInstructions: [
            'Clean with a soft dry cloth',
            'Avoid water and harsh chemicals',
            'Store in a dry place away from moisture',
            'Recharge under sunlight or moonlight occasionally',
        ],

        specifications: {
            material: 'Natural Hematite Stone',
            beadType: 'Round Polished Beads',
            size: 'Free Size (Elastic)',
            weight: 'Medium',
            origin: 'India/USA',
        },

        faq: [
            {
                question: 'Is this real Hematite?',
                answer:
                    'Yes, the bracelet is made from natural Hematite stones with a metallic finish.',
            },
            {
                question: 'What is Hematite used for?',
                answer:
                    'Hematite is believed to provide grounding, protection, and mental clarity.',
            },
            {
                question: 'Can I wear it every day?',
                answer:
                    'Yes, it is suitable for daily wear and long-term use.',
            },
            {
                question: 'Will it fit my wrist?',
                answer:
                    'Yes, it is stretchable and fits most wrist sizes comfortably.',
            },
        ],

        trustBadges: [
            '100% Natural Stone',
            'Handcrafted with Care',
            'Skin-Friendly & Durable',
            'Trusted by 200+ Customers',
        ],

        emotionalHook:
            'Stay grounded, protected, and powerful with the stabilizing energy of Hematite.',

        images: [
            '/assets/bracelete/hematite/1.png',
            '/assets/bracelete/hematite/2.png',
            '/assets/bracelete/hematite/3.png',
        ],
    },
    {
        category: 'bracelet',
        name: 'Silver Hematite Bracelet',
        slug: 'silver-hematite-bracelet',

        tagline: 'Grounding Power with a Premium Metallic Shine',
        qualityTag: 'AAA Quality • Natural Silver Hematite • Handcrafted',

        reviewCount: 126,

        shortDescription:
            'A premium silver-finish Hematite bracelet designed for grounding, protection, and a bold, stylish look.',

        meaning:
            'Silver Hematite is known as a powerful grounding stone with a sleek metallic appearance. It helps absorb negative energy, stabilize emotions, and enhance focus while adding a modern, luxurious touch to your style.',

        benefit:
            'Grounding, protection from negativity, mental clarity, confidence boost, emotional stability, stress relief',

        use:
            'Wear daily on the left hand to absorb grounding energy. Perfect for office wear, daily styling, meditation, and protection.',

        price: '₹149.00',
        originalPrice: '₹1,499.00',

        paymentHighlights: [
            'Cards & UPI Accepted',
            'No Hidden Charges',
            'Limited Time Offer'
        ],

        sold: 245,
        available: 135,
        endsIn: '27h : 20m : 10s',

        pooja: {
            label: 'Add Energy Activation Ritual',
            note:
                'Your bracelet will be purified and energized through sacred rituals to enhance grounding, protection, and positive energy flow.',
            price: '₹150.00',
        },

        description:
            'This Silver Hematite Bracelet is crafted from high-quality natural hematite stones with a stunning silver metallic finish. Known for its powerful grounding and protective properties, hematite helps absorb negative energy and promotes emotional balance. The sleek silver shine gives it a premium and modern look, making it perfect for both spiritual use and stylish daily wear. Each bead is polished to perfection and strung on a durable elastic band for maximum comfort. Ideal for individuals seeking protection, confidence, and a bold, elegant accessory.',

        keyFeatures: [
            'Premium natural Silver Hematite stones',
            'High-gloss metallic silver finish',
            'Strong grounding and protective energy',
            'Stretchable, durable, and skin-friendly',
            'Modern and stylish design',
            'Optional energy activation ritual available',
        ],

        benefits: [
            'Provides strong grounding and stability',
            'Protects from negative energy and stress',
            'Enhances focus and mental clarity',
            'Boosts confidence and personal strength',
            'Helps balance emotions and reduce anxiety',
            'Adds a premium stylish look',
        ],

        spiritualSignificance: [
            'Known as the stone of grounding and protection',
            'Associated with the Root Chakra (Muladhara)',
            'Helps align mind, body, and energy',
            'Enhances stability and inner strength',
        ],

        howToUse: [
            'Wear daily on the left wrist for best results',
            'Use during meditation for grounding',
            'Set intentions for protection and strength',
            'Suitable for both casual and formal wear',
        ],

        careInstructions: [
            'Clean with a soft dry cloth',
            'Avoid water and harsh chemicals',
            'Store in a dry and clean place',
            'Recharge under sunlight or moonlight occasionally',
        ],

        specifications: {
            material: 'Natural Silver Hematite Stone',
            beadType: 'Round Polished Beads',
            size: 'Free Size (Elastic)',
            weight: 'Medium',
            origin: 'India/USA',
        },

        faq: [
            {
                question: 'Is this real Hematite?',
                answer:
                    'Yes, it is made from natural hematite stones with a polished silver finish.',
            },
            {
                question: 'Can I wear it daily?',
                answer:
                    'Yes, it is designed for comfortable daily wear and styling.',
            },
            {
                question: 'Does it help with stress?',
                answer:
                    'Hematite is believed to reduce stress and provide grounding energy.',
            },
            {
                question: 'Will it fit my wrist?',
                answer:
                    'Yes, it is stretchable and fits most wrist sizes comfortably.',
            },
        ],

        trustBadges: [
            '100% Natural Stone',
            'Premium Metallic Finish',
            'Handcrafted with Care',
            'Trusted by 200+ Customers',
        ],

        emotionalHook:
            'Stay grounded, protected, and stylish with the powerful shine of Silver Hematite.',

        images: [
            '/assets/bracelete/silverhematite/1.png',
            '/assets/bracelete/silverhematite/2.png',
            '/assets/bracelete/silverhematite/3.png',
        ],
    },
    {
        category: 'bracelet',
        name: 'Green Aventurine Bracelet',
        slug: 'green-aventurine-bracelet',

        tagline: 'Stone of Luck, Prosperity & Opportunity',
        qualityTag: 'AAA Quality • 100% Natural Green Aventurine • Handcrafted',

        reviewCount: 138,

        shortDescription:
            'A powerful Green Aventurine bracelet designed to attract luck, success, and positive opportunities into your life.',

        meaning:
            'Green Aventurine is known as the “Stone of Opportunity” and is believed to be one of the luckiest crystals. It helps attract prosperity, success, and abundance while promoting emotional healing and inner growth.',

        benefit:
            'Luck attraction, wealth growth, emotional healing, confidence boost, positivity, opportunity enhancement',

        use:
            'Wear daily on the left hand to attract luck and positive energy. Ideal for business, career growth, interviews, and financial improvement.',

        price: '₹129.00',
        originalPrice: '₹1,299.00',

        paymentHighlights: [
            'Cards & UPI Accepted',
            'No Hidden Charges',
            'Limited Time Offer'
        ],

        sold: 265,
        available: 150,
        endsIn: '25h : 40m : 55s',

        pooja: {
            label: 'Add Energy Activation Ritual',
            note:
                'Your bracelet will be purified and energized through sacred rituals to attract luck, prosperity, and positive opportunities.',
            price: '₹150.00',
        },

        description:
            'This Green Aventurine Bracelet is crafted from high-quality natural aventurine stones known for their soothing green color and powerful luck-enhancing properties. Often called the “Stone of Opportunity,” it is believed to attract wealth, success, and new opportunities. It also helps in emotional healing, reducing stress, and promoting optimism. Each bead is smoothly polished and strung on a durable elastic band for comfortable daily wear. The bracelet is perfect for individuals looking to improve their financial growth, career success, and overall positivity.',

        keyFeatures: [
            'Premium quality natural Green Aventurine stones',
            'Smooth polished green beads with natural texture',
            'Known as the stone of luck and prosperity',
            'Stretchable, durable, and skin-friendly',
            'Handcrafted with precision',
            'Optional energy activation ritual available',
        ],

        benefits: [
            'Attracts luck, success, and new opportunities',
            'Promotes financial growth and abundance',
            'Enhances confidence and decision-making',
            'Supports emotional healing and positivity',
            'Reduces stress and anxiety',
            'Encourages growth and personal development',
        ],

        spiritualSignificance: [
            'Known as the “Stone of Opportunity”',
            'Associated with the Heart Chakra (Anahata)',
            'Promotes emotional balance and harmony',
            'Helps align energy for growth and success',
        ],

        howToUse: [
            'Wear daily on the left wrist for best results',
            'Use during important meetings or interviews',
            'Set intentions for luck and success',
            'Carry during business or financial activities',
        ],

        careInstructions: [
            'Clean with a soft dry cloth',
            'Avoid water and harsh chemicals',
            'Store in a clean and dry place',
            'Recharge under sunlight or moonlight occasionally',
        ],

        specifications: {
            material: 'Natural Green Aventurine Stone',
            beadType: 'Round Polished Beads',
            size: 'Free Size (Elastic)',
            weight: 'Light to Medium',
            origin: 'India/Brazil',
        },

        faq: [
            {
                question: 'Is this real Green Aventurine?',
                answer:
                    'Yes, it is made from natural Green Aventurine stones with unique color variations.',
            },
            {
                question: 'Can it really bring luck?',
                answer:
                    'Green Aventurine is traditionally believed to attract luck and opportunities, though results may vary.',
            },
            {
                question: 'Can I wear it every day?',
                answer:
                    'Yes, it is comfortable and suitable for daily wear.',
            },
            {
                question: 'Will it fit my wrist?',
                answer:
                    'Yes, it is stretchable and fits most wrist sizes comfortably.',
            },
        ],

        trustBadges: [
            '100% Natural Stone',
            'Handcrafted with Care',
            'Skin-Friendly & Durable',
            'Trusted by 250+ Customers',
        ],

        emotionalHook:
            'Unlock your luck, attract opportunities, and step into success with the powerful energy of Green Aventurine.',

        images: [
            '/assets/bracelete/greenaventurine/1.png',
            '/assets/bracelete/greenaventurine/2.png',
            '/assets/bracelete/greenaventurine/3.png',
        ],
    },
    {
        category: 'bracelet',
        name: 'Carnelian Bracelet',
        slug: 'carnelian-bracelet',

        tagline: 'Stone of Energy, Confidence & Courage',
        qualityTag: 'AAA Quality • 100% Natural Carnelian • Handcrafted',

        reviewCount: 152,

        shortDescription:
            'A powerful Carnelian bracelet designed to boost confidence, energy, and motivation while attracting success and positivity.',

        meaning:
            'Carnelian is known as the stone of motivation and courage. It energizes the body, enhances confidence, and helps overcome fear, hesitation, and laziness. It is widely used to activate inner strength and passion.',

        benefit:
            'Confidence boost, energy activation, motivation, courage, creativity, positivity',

        use:
            'Wear daily on the left hand to enhance energy and confidence. Ideal for students, professionals, entrepreneurs, and creative individuals.',

        price: '₹129.00',
        originalPrice: '₹1,299.00',

        paymentHighlights: [
            'Cards & UPI Accepted',
            'No Hidden Charges',
            'Limited Time Offer'
        ],

        sold: 310,
        available: 165,
        endsIn: '24h : 10m : 30s',

        pooja: {
            label: 'Add Energy Activation Ritual',
            note:
                'Your bracelet will be purified and energized through sacred rituals to enhance confidence, courage, and positive energy flow.',
            price: '₹150.00',
        },

        description:
            'This Carnelian Bracelet is crafted from high-quality natural carnelian stones known for their vibrant reddish-orange color and powerful energizing properties. Carnelian is widely regarded as a stone of action, helping to boost confidence, courage, and motivation. It supports overcoming fear and hesitation while promoting creativity and enthusiasm. Each bead is smoothly polished and strung on a durable elastic band for comfortable daily wear. Ideal for individuals seeking success, energy, and personal growth.',

        keyFeatures: [
            'Premium quality natural Carnelian stones',
            'Smooth polished reddish-orange beads',
            'Known as the stone of energy and motivation',
            'Stretchable, durable, and skin-friendly',
            'Handcrafted with precision',
            'Optional energy activation ritual available',
        ],

        benefits: [
            'Boosts confidence and self-belief',
            'Increases motivation and action-taking ability',
            'Enhances creativity and passion',
            'Helps overcome fear and hesitation',
            'Promotes positivity and enthusiasm',
            'Supports success in career and goals',
        ],

        spiritualSignificance: [
            'Known as the stone of courage and action',
            'Associated with the Sacral Chakra (Swadhisthana)',
            'Activates inner energy and creativity',
            'Helps balance emotions and passion',
        ],

        howToUse: [
            'Wear daily on the left wrist for best results',
            'Use during important tasks or meetings',
            'Set intentions for confidence and success',
            'Ideal during workouts, studies, or creative work',
        ],

        careInstructions: [
            'Clean with a soft dry cloth',
            'Avoid water and harsh chemicals',
            'Store in a dry and safe place',
            'Recharge under sunlight or moonlight occasionally',
        ],

        specifications: {
            material: 'Natural Carnelian Stone',
            beadType: 'Round Polished Beads',
            size: 'Free Size (Elastic)',
            weight: 'Light to Medium',
            origin: 'India/Brazil',
        },

        faq: [
            {
                question: 'Is this real Carnelian?',
                answer:
                    'Yes, it is made from natural Carnelian stones with unique color variations.',
            },
            {
                question: 'What is Carnelian used for?',
                answer:
                    'Carnelian is believed to boost energy, confidence, and motivation.',
            },
            {
                question: 'Can I wear it daily?',
                answer:
                    'Yes, it is comfortable and suitable for everyday use.',
            },
            {
                question: 'Will it fit my wrist?',
                answer:
                    'Yes, it is stretchable and fits most wrist sizes comfortably.',
            },
        ],

        trustBadges: [
            '100% Natural Stone',
            'Handcrafted with Care',
            'Skin-Friendly & Durable',
            'Trusted by 300+ Customers',
        ],

        emotionalHook:
            'Ignite your inner power, take action, and achieve your goals with the energy of Carnelian.',

        images: [
            '/assets/bracelete/carnelian/1.png',
            '/assets/bracelete/carnelian/2.png',
            '/assets/bracelete/carnelian/3.png',
        ],
    },
    {
        category: 'bracelet',
        name: 'Tiger Eye Bracelet',
        slug: 'tiger-eye-bracelet',

        tagline: 'Stone of Protection, Confidence & Success',
        qualityTag: 'AAA Quality • 100% Natural Tiger Eye • Handcrafted',

        reviewCount: 168,

        shortDescription:
            'A powerful Tiger Eye bracelet designed to boost confidence, protect from negative energy, and attract success and wealth.',

        meaning:
            'Tiger Eye is known as a stone of courage and protection. It enhances confidence, strengthens willpower, and helps in making clear decisions. It is widely used for protection from negative energies and attracting prosperity.',

        benefit:
            'Confidence boost, protection, wealth attraction, focus, decision-making, courage',

        use:
            'Wear daily on the left hand for protection and confidence. Ideal for business, career growth, leadership, and decision-making situations.',

        price: '₹129.00',
        originalPrice: '₹1,299.00',

        paymentHighlights: [
            'Cards & UPI Accepted',
            'No Hidden Charges',
            'Limited Time Offer'
        ],

        sold: 342,
        available: 180,
        endsIn: '23h : 55m : 20s',

        pooja: {
            label: 'Add Energy Activation Ritual',
            note:
                'Your bracelet will be purified and energized through sacred rituals to enhance protection, confidence, and success energy.',
            price: '₹150.00',
        },

        description:
            'This Tiger Eye Bracelet is crafted from high-quality natural tiger eye stones known for their golden-brown color and unique silky shine. It is considered a powerful protection stone that helps shield against negative energy while boosting confidence and courage. Tiger Eye is also associated with attracting wealth and improving decision-making abilities. Each bead is polished to perfection and strung on a durable elastic band for comfortable daily wear. Perfect for individuals seeking strength, protection, and success.',

        keyFeatures: [
            'Premium quality natural Tiger Eye stones',
            'Unique golden-brown striped pattern (chatoyancy effect)',
            'Strong protection and confidence-enhancing properties',
            'Stretchable, durable, and skin-friendly',
            'Handcrafted with precision',
            'Optional energy activation ritual available',
        ],

        benefits: [
            'Boosts confidence and personal power',
            'Protects from negative energy and evil eye',
            'Enhances focus and decision-making ability',
            'Attracts wealth and financial opportunities',
            'Strengthens courage and willpower',
            'Promotes mental clarity and stability',
        ],

        spiritualSignificance: [
            'Known as the stone of protection and courage',
            'Associated with the Solar Plexus Chakra (Manipura)',
            'Enhances inner strength and confidence',
            'Balances energy and promotes stability',
        ],

        howToUse: [
            'Wear daily on the left wrist for best results',
            'Use during important meetings or business decisions',
            'Set intentions for protection and success',
            'Ideal for professionals, entrepreneurs, and students',
        ],

        careInstructions: [
            'Clean with a soft dry cloth',
            'Avoid water and harsh chemicals',
            'Store in a clean and dry place',
            'Recharge under sunlight or moonlight occasionally',
        ],

        specifications: {
            material: 'Natural Tiger Eye Stone',
            beadType: 'Round Polished Beads',
            size: 'Free Size (Elastic)',
            weight: 'Light to Medium',
            origin: 'India/South Africa',
        },

        faq: [
            {
                question: 'Is this real Tiger Eye?',
                answer:
                    'Yes, it is made from natural Tiger Eye stones with unique natural patterns.',
            },
            {
                question: 'What is Tiger Eye used for?',
                answer:
                    'Tiger Eye is believed to provide protection, boost confidence, and attract success.',
            },
            {
                question: 'Can I wear it daily?',
                answer:
                    'Yes, it is comfortable and suitable for everyday wear.',
            },
            {
                question: 'Will it fit my wrist?',
                answer:
                    'Yes, it is stretchable and fits most wrist sizes comfortably.',
            },
        ],

        trustBadges: [
            '100% Natural Stone',
            'Handcrafted with Care',
            'Skin-Friendly & Durable',
            'Trusted by 300+ Customers',
        ],

        emotionalHook:
            'Unlock your inner strength, stay protected, and attract success with the powerful energy of Tiger Eye.',

        images: [
            '/assets/bracelete/tigereye/1.png',
            '/assets/bracelete/tigereye/2.png',
            '/assets/bracelete/tigereye/3.png',
        ],
    },
    {
        category: 'bracelet',
        name: 'Black Onyx & Smoky Quartz Bracelet',
        slug: 'black-onyx-smoky-quartz-bracelet',

        tagline: 'Powerful Protection, Grounding & Emotional Balance',
        qualityTag: 'AAA Quality • Natural Black Onyx & Smoky Quartz • Handcrafted',

        reviewCount: 142,

        shortDescription:
            'A powerful combination bracelet designed to protect from negativity, reduce stress, and provide grounding energy.',

        meaning:
            'Black Onyx is known for strong protection and absorbing negative energy, while Smoky Quartz is a grounding stone that helps release stress, fear, and emotional blockages. Together, they create a powerful shield of protection and stability.',

        benefit:
            'Protection, grounding, stress relief, emotional balance, negativity removal, mental clarity',

        use:
            'Wear daily on the left hand for protection and grounding. Ideal for stress relief, meditation, emotional healing, and daily wear.',

        price: '₹149.00',
        originalPrice: '₹1,499.00',

        paymentHighlights: [
            'Cards & UPI Accepted',
            'No Hidden Charges',
            'Limited Time Offer'
        ],

        sold: 276,
        available: 140,
        endsIn: '26h : 15m : 40s',

        pooja: {
            label: 'Add Energy Activation Ritual',
            note:
                'Your bracelet will be purified and energized through sacred rituals to enhance protection, grounding, and emotional healing energy.',
            price: '₹150.00',
        },

        description:
            'This Black Onyx & Smoky Quartz Bracelet is crafted from premium natural stones, combining the deep black shine of onyx with the subtle translucent tones of smoky quartz. Black Onyx is widely known for its powerful protective properties, helping to shield against negative energies and emotional stress. Smoky Quartz complements this by grounding your energy, releasing anxiety, and promoting calmness. Each bead is carefully polished and strung on a durable elastic band, making it comfortable for everyday wear. This bracelet is ideal for individuals seeking protection, stability, and inner peace.',

        keyFeatures: [
            'Premium natural Black Onyx and Smoky Quartz stones',
            'Elegant black and translucent bead combination',
            'Strong protection and grounding energy',
            'Stretchable, durable, and skin-friendly',
            'Handcrafted with precision',
            'Optional energy activation ritual available',
        ],

        benefits: [
            'Protects from negative energy and evil eye',
            'Provides strong grounding and stability',
            'Reduces stress, anxiety, and emotional tension',
            'Enhances mental clarity and focus',
            'Promotes calmness and emotional balance',
            'Supports spiritual and personal growth',
        ],

        spiritualSignificance: [
            'Black Onyx is known as a powerful protection stone',
            'Smoky Quartz is associated with grounding and detoxifying energy',
            'Connected to the Root Chakra (Muladhara)',
            'Helps balance energy and remove negativity',
        ],

        howToUse: [
            'Wear daily on the left wrist for best results',
            'Use during meditation for grounding',
            'Set intentions for protection and calmness',
            'Ideal for stressful environments or travel',
        ],

        careInstructions: [
            'Clean with a soft dry cloth',
            'Avoid water and harsh chemicals',
            'Store in a clean and dry place',
            'Recharge under sunlight or moonlight occasionally',
        ],

        specifications: {
            material: 'Natural Black Onyx & Smoky Quartz',
            beadType: 'Round Polished Beads',
            size: 'Free Size (Elastic)',
            weight: 'Light to Medium',
            origin: 'India/Brazil',
        },

        faq: [
            {
                question: 'Is this made from real stones?',
                answer:
                    'Yes, it is made from natural Black Onyx and Smoky Quartz stones.',
            },
            {
                question: 'What is this bracelet used for?',
                answer:
                    'It is believed to provide protection, grounding, and stress relief.',
            },
            {
                question: 'Can I wear it daily?',
                answer:
                    'Yes, it is designed for comfortable daily wear.',
            },
            {
                question: 'Will it fit my wrist?',
                answer:
                    'Yes, it is stretchable and fits most wrist sizes comfortably.',
            },
        ],

        trustBadges: [
            '100% Natural Stones',
            'Handcrafted with Care',
            'Skin-Friendly & Durable',
            'Trusted by 250+ Customers',
        ],

        emotionalHook:
            'Stay protected, grounded, and calm with the powerful energy of Black Onyx and Smoky Quartz.',

        images: [
            '/assets/bracelete/blackonyx&smokyquartz/1.png',
            '/assets/bracelete/blackonyx&smokyquartz/2.png',
            '/assets/bracelete/blackonyx&smokyquartz/3.png',
        ],
    },
];
