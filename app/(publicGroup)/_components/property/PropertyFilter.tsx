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

const AMENITIES = [
    "Parking",
    "WiFi",
    "Security",
    "Balcony",
    "Garage",
    "Garden",
    "Elevator",
    "Generator",
];

export function PropertyFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [location, setLocation] = useState(
        searchParams.get("location") || ""
    );
    const [minPrice, setMinPrice] = useState(
        searchParams.get("minPrice") || ""
    );
    const [price, setPrice] = useState(
        searchParams.get("price") || ""
    );
    const [type, setType] = useState(
        searchParams.get("type") || ""
    );
    const [amenities, setAmenities] = useState(
        searchParams.get("amenities") || ""
    );
    const [availability, setAvailability] = useState(
        searchParams.get("availability") || "all"
    );

    const applyParams = (next: URLSearchParams) => {
        next.delete("page");
        const query = next.toString();
        router.replace(query ? `/properties?${query}` : "/properties");
    };

    const handleFilter = () => {
        const params = new URLSearchParams(searchParams.toString());

        if (location.trim()) params.set("location", location.trim());
        else params.delete("location");

        if (minPrice.trim()) params.set("minPrice", minPrice.trim());
        else params.delete("minPrice");

        if (price.trim()) params.set("price", price.trim());
        else params.delete("price");

        if (type) params.set("type", type);
        else params.delete("type");

        if (amenities) params.set("amenities", amenities);
        else params.delete("amenities");

        if (availability && availability !== "all") {
            params.set("availability", availability);
        } else {
            params.delete("availability");
        }

        applyParams(params);
    };

    const handleReset = () => {
        setLocation("");
        setMinPrice("");
        setPrice("");
        setType("");
        setAmenities("");
        setAvailability("all");

        const params = new URLSearchParams(searchParams.toString());
        params.delete("location");
        params.delete("minPrice");
        params.delete("price");
        params.delete("type");
        params.delete("amenities");
        params.delete("availability");
        params.delete("page");

        applyParams(params);
    };

    return (
        <div className="rounded-2xl border bg-card p-5 shadow-sm">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-7">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <Input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Dhaka"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Min Price</label>
                    <Input
                        type="number"
                        min="0"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder="e.g. 10000"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Max Price</label>
                    <Input
                        type="number"
                        min="0"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="e.g. 25000"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Property Type</label>
                    <Select
                        value={type || undefined}
                        onValueChange={setType}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Apartment">Apartment</SelectItem>
                            <SelectItem value="House">House</SelectItem>
                            <SelectItem value="Villa">Villa</SelectItem>
                            <SelectItem value="Duplex">Duplex</SelectItem>
                            <SelectItem value="Studio">Studio</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Amenities</label>
                    <Select
                        value={amenities || undefined}
                        onValueChange={setAmenities}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Any amenity" />
                        </SelectTrigger>
                        <SelectContent>
                            {AMENITIES.map((item) => (
                                <SelectItem key={item} value={item}>
                                    {item}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <Select
                        value={availability || "all"}
                        onValueChange={setAvailability}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="All listings" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All listings</SelectItem>
                            <SelectItem value="available">Available</SelectItem>
                            <SelectItem value="rented">Rented</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-end gap-2">
                    <Button type="button" onClick={handleFilter} className="flex-1">
                        Apply Filter
                    </Button>
                    <Button type="button" variant="outline" onClick={handleReset}>
                        Reset
                    </Button>
                </div>
            </div>
        </div>
    );
}
