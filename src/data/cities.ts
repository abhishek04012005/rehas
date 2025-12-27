export interface City {
  name: string;
  slug: string;
  state: string;
  description: string;
  population?: string;
}

export const citiesData: City[] = [
  {
    name: 'Mumbai',
    slug: 'mumbai',
    state: 'Maharashtra',
    description: 'The financial capital of India, Mumbai is a vibrant metropolis with diverse spiritual and wellness communities.',
  },
  {
    name: 'Delhi',
    slug: 'delhi',
    state: 'Delhi',
    description: 'The capital city of India, Delhi is a hub for spiritual practices, astrology, and alternative healing traditions.',
  },
  {
    name: 'Bangalore',
    slug: 'bangalore',
    state: 'Karnataka',
    description: 'Known as the IT capital, Bangalore is increasingly embracing holistic wellness and spiritual practices.',
  },
  {
    name: 'Pune',
    slug: 'pune',
    state: 'Maharashtra',
    description: 'A cultural hub in Maharashtra, Pune is renowned for its spiritual heritage and wellness communities.',
  },
  {
    name: 'Hyderabad',
    slug: 'hyderabad',
    state: 'Telangana',
    description: 'A modern city with ancient spiritual roots, Hyderabad blends tradition with contemporary wellness practices.',
  },
  {
    name: 'Chennai',
    slug: 'chennai',
    state: 'Tamil Nadu',
    description: 'The temple city of South India, Chennai is deeply rooted in ancient healing and spiritual traditions.',
  },
  {
    name: 'Kolkata',
    slug: 'kolkata',
    state: 'West Bengal',
    description: 'A city of great cultural significance, Kolkata is a center for arts, philosophy, and spiritual wisdom.',
  },
  {
    name: 'Ahmedabad',
    slug: 'ahmedabad',
    state: 'Gujarat',
    description: 'A vibrant city in Gujarat with a strong tradition of wellness and spiritual practices.',
  },
  {
    name: 'Jaipur',
    slug: 'jaipur',
    state: 'Rajasthan',
    description: 'The pink city of India, Jaipur is known for its connection to astrology and vedic wisdom.',
  },
  {
    name: 'Lucknow',
    slug: 'lucknow',
    state: 'Uttar Pradesh',
    description: 'A city of culture and grace, Lucknow has a rich heritage of spiritual and healing practices.',
  },
  {
    name: 'Chandigarh',
    slug: 'chandigarh',
    state: 'Chandigarh',
    description: 'A planned modern city, Chandigarh is a growing center for wellness and holistic health practices.',
  },
  {
    name: 'Indore',
    slug: 'indore',
    state: 'Madhya Pradesh',
    description: 'A city in the heart of India, Indore is known for its wellness initiatives and spiritual communities.',
  },
  {
    name: 'Goa',
    slug: 'goa',
    state: 'Goa',
    description: 'Famous for its beaches and spiritual retreats, Goa is a premier destination for healing and wellness.',
  },
  {
    name: 'Kochi',
    slug: 'kochi',
    state: 'Kerala',
    description: 'The queen of the Arabian Sea, Kochi is renowned for ayurvedic treatments and holistic wellness.',
  },
  {
    name: 'Surat',
    slug: 'surat',
    state: 'Gujarat',
    description: 'A dynamic business city, Surat is increasingly becoming a wellness and spiritual hub.',
  },
];

export const cityMap: Record<string, City> = citiesData.reduce(
  (acc, city) => {
    acc[city.slug] = city;
    return acc;
  },
  {} as Record<string, City>
);

export function getCityBySlug(slug: string): City | undefined {
  return cityMap[slug.toLowerCase()];
}

export function getAllCitySlugs(): string[] {
  return citiesData.map((city) => city.slug);
}
