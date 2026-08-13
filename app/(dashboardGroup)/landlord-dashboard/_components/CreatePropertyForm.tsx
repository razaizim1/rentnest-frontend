"use client";

import { useActionState, useEffect } from "react";
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
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { createProperty, CreatePropertyState } from "../_actions/createProperty";

type Category = {
    id: string;
    name: string;
};

type CreatePropertyFormProps = {
    categories: Category[];
    onSuccess?: () => void;
};

const initialState: CreatePropertyState = {
    success: false,
    message: "",
};

export function CreatePropertyForm({
    categories,
    onSuccess,
}: CreatePropertyFormProps) {
    const router = useRouter();

    const [state, action, pending] = useActionState(
        createProperty,
        initialState
    );

    useEffect(() => {
        if (!state.message) return;

        if (state.success) {
            onSuccess?.();
            toast.success(state.message);
            router.push("/landlord-dashboard/properties");
            router.refresh();
        } else {
            toast.error(state.message);
        }
    }, [state, router, onSuccess]);

    return (
        <form action={action}>
            <Card>
                <CardHeader>
                    <CardTitle>Property Information</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">

                    {/* Title */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Property Title
                        </label>

                        <Input
                            name="title"
                            placeholder="e.g. Modern Family Apartment"
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
                            placeholder="Describe the property..."
                            rows={5}
                            required
                        />
                    </div>

                    {/* Location / Address */}
                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Location
                            </label>

                            <Input
                                name="location"
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
                                placeholder="Dhanmondi, Dhaka"
                                required
                            />
                        </div>
                    </div>

                    {/* Price / Category */}
                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Monthly Rent
                            </label>

                            <Input
                                name="rentAmount"
                                type="number"
                                min="1"
                                placeholder="25000"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Property Type
                            </label>

                            <Select
                                name="categoryId"
                                required
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
                        </div>
                    </div>

                    {/* Bedrooms / Bathrooms / Area */}
                    <div className="grid gap-5 sm:grid-cols-3">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Bedrooms
                            </label>

                            <Input
                                name="bedrooms"
                                type="number"
                                min="1"
                                placeholder="3"
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
                                placeholder="2"
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
                                placeholder="1200"
                            />
                        </div>
                    </div>

                    {/* Image URL */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Image URL
                        </label>

                        <Input
                            name="image"
                            type="url"
                            placeholder="https://images.unsplash.com/..."
                            required
                        />
                    </div>

                    {/* Amenities */}
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
                                        className="h-4 w-4"
                                    />

                                    <span className="text-sm">
                                        {amenity}
                                    </span>
                                </label>
                            ))}

                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end gap-3 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                                router.push(
                                    "/landlord-dashboard/properties"
                                )
                            }
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={pending}
                        >
                            {pending
                                ? "Creating Property..."
                                : "Create Property"}
                        </Button>
                    </div>

                </CardContent>
            </Card>
        </form>
    );
}