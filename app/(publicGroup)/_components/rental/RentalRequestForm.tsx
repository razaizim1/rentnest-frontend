"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { createRental } from "../../_actions/createRental";
import { useRouter } from "next/navigation";

type RentalRequestFormProps = {
    propertyId: string;
};

export const RentalRequestForm = ({
    propertyId,
}: RentalRequestFormProps) => {

    const router = useRouter();
    const [state, action, pending] = useActionState(
        createRental,
        {
            success: false,
            message: "",
        }
    );

    useEffect(() => {
        if (!state.message) return;

        if (state.success) {
            toast.success(state.message);
            router.push("/dashboard");
            router.refresh();
        } else {
            toast.error(state.message);
        }
    }, [state, router]);
    return (
        <form action={action} className="space-y-5">

            <div className="space-y-2">

                <Label htmlFor="moveInDate">
                    Move In Date
                </Label>

                <div className="relative">

                    <CalendarDays className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />

                    <Input
                        id="moveInDate"
                        name="moveInDate"
                        type="date"
                        className="pl-10"
                        required
                    />

                </div>

            </div>

            <div className="space-y-2">

                <Label htmlFor="message">
                    Message (Optional)
                </Label>

                <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Write a short message for the landlord..."
                />

            </div>

            <input
                type="hidden"
                name="propertyId"
                value={propertyId}
            />

            <Button
                type="submit"
                className="h-11 w-full"
                disabled={pending}
            >
                {pending ? "Submitting..." : "Submit Rental Request"}
            </Button>

        </form>
    );
};
export default RentalRequestForm;
