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

    landlord: {
        id: string;
        name: string;
        email: string;
        phone?: string;
        avatar?: string | null;
    };

    category: {
        id: string;
        name: string;
    };

    _count: {
        reviews: number;
        rentalRequests: number;
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
    hasReviewed?: boolean;

    property: {
        id: string;
        title: string;
        image: string;
        location: string;
        rentAmount: number;
    };

    payment?: {
        id: string;
        rentalRequestId: string;
        amount: number;
        transactionId: string;
        method: string;
        provider: string;
        status: string;
        paidAt: string | null;
        createdAt: string;
        updatedAt: string;
    } | null;
}

export type GetPropertiesParams = {
    search?: string;
    location?: string;
    price?: string;
    minPrice?: string;
    amenities?: string;
    type?: string;
    availability?: string;
    page?: string;
    limit?: string;
};

export type PropertiesPageProps = {
    searchParams: Promise<{
        search?: string;
        location?: string;
        price?: string;
        minPrice?: string;
        amenities?: string;
        type?: string;
        availability?: string;
        page?: string;
        limit?: string;
    }>;
};

export type LandlordStatsProps = {
    totalProperties: number;
    pendingRequests: number;
    approvedRequests: number;
    activeRequests: number;
    earnings: number;
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
        phone?: string;
    };

    property: {
        id: string;
        title: string;
        location: string;
        rentAmount: number;
        image: string;

        landlord: {
            id: string;
            name: string;
            email: string;
        };
    };

    payment?: {
        id: string;
        amount: number;
        status: string;
        paidAt?: string | null;
    } | null;
};

export type UpdatePropertyState = {
    success: boolean;
    statusCode?: number;
    message: string;
    data?: unknown;
};

export interface IReview {
    id: string;
    rating: number;
    comment: string;
    createdAt: string;
    tenant: {
        id: string;
        name: string;
        avatar?: string | null;
    };
}

export type GetAdminUsersParams = {
    page?: string;
    limit?: string;
    search?: string;
};

export type GetAdminPropertiesParams = {
    page?: string;
    limit?: string;
    location?: string;
    minPrice?: string;
    maxPrice?: string;
    categoryId?: string;
};

export interface IAdminProperty extends IProperty {
    landlord: {
        id: string;
        name: string;
        email: string;
        phone?: string;
        avatar?: string | null;
    };

    _count: {
        reviews: number;
        rentalRequests: number;
    };
}

export type AdminPropertyTableProps = {
    properties: IAdminProperty[];
};
