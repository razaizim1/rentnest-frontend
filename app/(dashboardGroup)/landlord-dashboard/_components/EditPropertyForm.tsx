"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    updateProperty,
    UpdatePropertyState,
} from "../_actions/updateProperty";
import { IProperty } from "@/lib/types";

type Category = {
    id: string;
    name: string;
};

type EditPropertyFormProps = {
    property: IProperty;
    categories: Category[];
    onSuccess?: () => void;
};

const initialState: UpdatePropertyState = {
    success: false,
    message: "",
};

export function EditPropertyForm({
    property,
    categories,
    onSuccess,
}: EditPropertyFormProps) {
    const router = useRouter();

    const [categoryId, setCategoryId] = useState(
        property.category.id
    );

    const updateAction = updateProperty.bind(
        null,
        property.id
    );

    const [state, action, pending] = useActionState(
        updateAction,
        initialState
    );

    useEffect(() => {
        if (!state.message) return;

        if (state.success) {
            toast.success(state.message);
            onSuccess?.();
            router.refresh();
        } else {
            toast.error(state.message);
        }
    }, [state, router, onSuccess]);

    return (
        <form action={action}>
            <div className="space-y-6">

                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Property Title
                    </label>

                    <Input
                        name="title"
                        defaultValue={property.title}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Description
                    </label>

                    <Textarea
                        name="description"
                        defaultValue={property.description}
                        rows={5}
                        required
                    />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Location
                        </label>

                        <Input
                            name="location"
                            defaultValue={property.location}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Address
                        </label>

                        <Input
                            name="address"
                            defaultValue={property.address}
                            required
                        />
                    </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Monthly Rent
                        </label>

                        <Input
                            name="rentAmount"
                            type="number"
                            min="1"
                            defaultValue={property.rentAmount}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Property Type
                        </label>

                        <Select
                            value={categoryId}
                            onValueChange={setCategoryId}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select property type" />
                            </SelectTrigger>

                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <input
                            type="hidden"
                            name="categoryId"
                            value={categoryId}
                        />
                    </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-3">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Bedrooms
                        </label>

                        <Input
                            name="bedrooms"
                            type="number"
                            min="1"
                            defaultValue={property.bedrooms}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Bathrooms
                        </label>

                        <Input
                            name="bathrooms"
                            type="number"
                            min="1"
                            defaultValue={property.bathrooms}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Area (sqft)
                        </label>

                        <Input
                            name="area"
                            type="number"
                            min="1"
                            defaultValue={property.area ?? ""}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Image URL
                    </label>

                    <Input
                        name="image"
                        type="url"
                        defaultValue={property.image}
                        required
                    />
                </div>

                <label className="flex items-center gap-3 rounded-lg border p-4">
                    <input
                        type="checkbox"
                        name="available"
                        defaultChecked={property.available}
                        className="h-4 w-4"
                    />
                    <span>
                        <span className="block text-sm font-medium">
                            Available for rent
                        </span>
                        <span className="text-xs text-muted-foreground">
                            Uncheck to hide this listing from public search.
                        </span>
                    </span>
                </label>

                <div className="space-y-3">
                    <label className="text-sm font-medium">
                        Amenities
                    </label>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            "Parking",
                            "WiFi",
                            "Security",
                            "Balcony",
                            "Garage",
                            "Garden",
                            "Elevator",
                            "Generator",
                        ].map((amenity) => (
                            <label
                                key={amenity}
                                className="flex items-center gap-2 rounded-lg border p-3"
                            >
                                <input
                                    type="checkbox"
                                    name="amenities"
                                    value={amenity}
                                    defaultChecked={property.amenities?.includes(
                                        amenity
                                    )}
                                    className="h-4 w-4"
                                />

                                <span className="text-sm">
                                    {amenity}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={pending}
                    className="w-full"
                >
                    {pending
                        ? "Updating..."
                        : "Update Property"}
                </Button>

            </div>
        </form>
    );
}