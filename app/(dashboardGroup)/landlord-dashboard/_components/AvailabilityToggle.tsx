"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { togglePropertyAvailability } from "../_actions/togglePropertyAvailability";

type AvailabilityToggleProps = {
    propertyId: string;
    available: boolean;
};

export function AvailabilityToggle({
    propertyId,
    available,
}: AvailabilityToggleProps) {
    const router = useRouter();
    const [pending, startTransition] = useTransition();

    const handleToggle = () => {
        startTransition(async () => {
            const result = await togglePropertyAvailability(
                propertyId,
                !available
            );

            if (!result.success) {
                toast.error(result.message);
                return;
            }

            toast.success(result.message);
            router.refresh();
        });
    };

    return (
        <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={pending}
            onClick={handleToggle}
            className="w-full"
        >
            {pending
                ? "Updating..."
                : available
                    ? "Mark Unavailable"
                    : "Mark Available"}
        </Button>
    );
}
