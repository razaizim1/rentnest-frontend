"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";

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
import { IProperty, UpdatePropertyState } from "@/lib/types";
import { updateProperty } from "../_actions/updateProperty";


type PropertyEditFormProps = {
    property: IProperty;
};

const initialState: UpdatePropertyState = {
    success: false,
    message: "",
};

export function PropertyEditForm({
    property,
}: PropertyEditFormProps) {
    const updatePropertyWithId = updateProperty.bind(
        null,
        property.id
    );

    const [state, action, pending] = useActionState(
        updatePropertyWithId,
        initialState
    );

    useEffect(() => {
        if (!state.message) return;

        if (state.success) {
            toast.success(state.message);
        } else {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <form action={action} className="space-y-6">

            {/* Title */}
            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Property Title
                </label>

                <Input
                    name="title"
                    defaultValue={property.title}
                    placeholder="Enter property title"
                    required
                />
            </div>

            {/* Description */}
            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Description
                </label>

                <Textarea
                    name="description"
                    defaultValue={property.description}
                    placeholder="Describe the property"
                    rows={5}
                    required
                />
            </div>

            {/* Location / Address */}
            <div className="grid gap-4 md:grid-cols-2">

                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Location
                    </label>

                    <Input
                        name="location"
                        defaultValue={property.location}
                        placeholder="Dhaka"
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
                        placeholder="Banani"
                        required
                    />
                </div>

            </div>

            {/* Price / Bedrooms / Bathrooms / Area */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Rent Amount
                    </label>

                    <Input
                        type="number"
                        name="rentAmount"
                        defaultValue={property.rentAmount}
                        min="1"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Bedrooms
                    </label>

                    <Input
                        type="number"
                        name="bedrooms"
                        defaultValue={property.bedrooms}
                        min="1"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Bathrooms
                    </label>

                    <Input
                        type="number"
                        name="bathrooms"
                        defaultValue={property.bathrooms}
                        min="1"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Area (sqft)
                    </label>

                    <Input
                        type="number"
                        name="area"
                        defaultValue={property.area ?? ""}
                        min="1"
                    />
                </div>

            </div>

            {/* Category */}
            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Property Type
                </label>

                <Select
                    name="categoryId"
                    defaultValue={property.category?.id}
                    required
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select property type" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="CATEGORY_ID_1">
                            Apartment
                        </SelectItem>

                        <SelectItem value="CATEGORY_ID_2">
                            House
                        </SelectItem>

                        <SelectItem value="CATEGORY_ID_3">
                            Villa
                        </SelectItem>

                        <SelectItem value="CATEGORY_ID_4">
                            Duplex
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Image */}
            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Image URL
                </label>

                <Input
                    name="image"
                    type="url"
                    defaultValue={property.image}
                    placeholder="https://example.com/image.jpg"
                    required
                />
            </div>

            {/* Amenities */}
            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Amenities
                </label>

                <Input
                    name="amenities"
                    defaultValue={
                        property.amenities?.join(", ") || ""
                    }
                    placeholder="Parking, WiFi, Gym"
                />

                <p className="text-xs text-muted-foreground">
                    Separate amenities with commas.
                </p>
            </div>

            {/* Error */}
            {state.message && !state.success && (
                <p className="text-sm text-destructive">
                    {state.message}
                </p>
            )}

            {/* Submit */}
            <div className="flex justify-end">
                <Button
                    type="submit"
                    disabled={pending}
                >
                    {pending
                        ? "Updating..."
                        : "Update Property"}
                </Button>
            </div>

        </form>
    );
}