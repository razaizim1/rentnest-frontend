export interface IProperty {
    id: string;
    title: string;
    description: string;
    location: string;
    address: string;
    image: string;
    rentAmount: number;
    bedrooms: number;
    bathrooms: number;
    area: number;
    amenities: string[];
    available: boolean;

    category: {
        id: string;
        name: string;
    };

    _count: {
        reviews: number;
    };
}