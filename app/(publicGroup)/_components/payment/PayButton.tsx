"use client";

import { createPayment } from "@/app/(dashboardGroup)/dashboard/_actions/createPayment";
import { Button } from "@/components/ui/button";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";

type PayButtonProps = {
    rentalRequestId: string;
};

export function PayButton({ rentalRequestId }: PayButtonProps) {
    const [state, action, pending] = useActionState(
        createPayment,
        null
    );

    useEffect(() => {
        if (!state) return;

        if (!state.success) {
            toast.error(state.message || "Payment failed");
        }
    }, [state]);

    return (
        <form action={action}>
            {/* Hidden input — this is what FormData.get('rentalRequestId') reads */}
            <input type="hidden" name="rentalRequestId" value={rentalRequestId} />
            <Button
                type="submit"
                disabled={pending}
                className="flex-1"
            >
                {pending ? "Processing..." : "Pay Now"}
            </Button>
        </form>
    );
}