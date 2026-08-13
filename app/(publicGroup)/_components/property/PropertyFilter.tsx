"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function PropertyFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [location, setLocation] = useState(
        searchParams.get("location") || ""
    );

    const [price, setPrice] = useState(
        searchParams.get("price") || ""
    );

    const [type, setType] = useState(
        searchParams.get("type") || ""
    );

    const handleFilter = () => {
        const params = new URLSearchParams(
            searchParams.toString()
        );

        if (location.trim()) {
            params.set("location", location.trim());
        } else {
            params.delete("location");
        }

        if (price.trim()) {
            params.set("price", price.trim());
        } else {
            params.delete("price");
        }

        if (type) {
            params.set("type", type);
        } else {
            params.delete("type");
        }

        params.delete("page");

        const query = params.toString();

        router.replace(
            query
                ? `/properties?${query}`
                : "/properties"
        );
    };

    const handleReset = () => {
        setLocation("");
        setPrice("");
        setType("");

        const params = new URLSearchParams(
            searchParams.toString()
        );

        params.delete("location");
        params.delete("price");
        params.delete("type");
        params.delete("page");

        const query = params.toString();

        router.replace(
            query
                ? `/properties?${query}`
                : "/properties"
        );
    };

    return (
        <div className="rounded-2xl border bg-card p-5 shadow-sm">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

                {/* Location */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Location
                    </label>

                    <Input
                        value={location}
                        onChange={(e) =>
                            setLocation(e.target.value)
                        }
                        placeholder="e.g. Dhaka"
                    />
                </div>

                {/* Price */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Max Price
                    </label>

                    <Input
                        type="number"
                        min="0"
                        value={price}
                        onChange={(e) =>
                            setPrice(e.target.value)
                        }
                        placeholder="e.g. 25000"
                    />
                </div>

                {/* Type */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Property Type
                    </label>

                    <Select
                        value={type}
                        onValueChange={setType}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="All Types" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="Apartment">
                                Apartment
                            </SelectItem>

                            <SelectItem value="House">
                                House
                            </SelectItem>

                            <SelectItem value="Villa">
                                Villa
                            </SelectItem>

                            <SelectItem value="Duplex">
                                Duplex
                            </SelectItem>

                            <SelectItem value="Studio">
                                Studio
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Actions */}
                <div className="flex items-end gap-2">
                    <Button
                        type="button"
                        onClick={handleFilter}
                        className="flex-1"
                    >
                        Apply Filter
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                </div>

            </div>
        </div>
    );
}