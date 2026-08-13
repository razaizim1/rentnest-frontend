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

export type ParamsWithId = {
    params: Promise<{
        id: string;
    }>;
};

export interface IUser {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar: string | null;
    role: "TENANT" | "LANDLORD" | "ADMIN";
    status: string;
    createdAt: string;
}

export interface IRental {
    id: string;
    moveInDate: string;
    status: string;

    property: {
        id: string;
        title: string;
        image: string;
        location: string;
        rentAmount: number;
    };
}

export type GetPropertiesParams = {
    search?: string;
    location?: string;
    price?: string;
    type?: string;
    page?: string;
    limit?: string;
};

export type PropertiesPageProps = {
    searchParams: Promise<{
        search?: string;
        location?: string;
        price?: string;
        type?: string;
        page?: string;
        limit?: string;
    }>;
};

export type LandlordStatsProps = {
    totalProperties: number;
    pendingRequests: number;
    approvedRequests: number;
    activeRequests: number;
};

export type IRentalRequest = {
    id: string;
    status:
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "ACTIVE"
    | "COMPLETED";

    moveInDate: string;
    message?: string | null;

    tenant: {
        id: string;
        name: string;
        email: string;
    };

    property: {
        id: string;
        title: string;
        location: string;
        rentAmount: number;
        image: string;
    };
};