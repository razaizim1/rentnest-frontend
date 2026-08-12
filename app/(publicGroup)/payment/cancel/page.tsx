import Link from "next/link";
import { CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";

type CancelPageProps = {
    searchParams: Promise<{
        rentalRequestId?: string;
    }>;
};

export default async function PaymentCancelPage({
    searchParams,
}: CancelPageProps) {
    const params = await searchParams;

    return (
        <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl border p-8 text-center shadow-sm">

                <CircleX
                    className="mx-auto mb-5 text-red-500"
                    size={64}
                />

                <h1 className="text-3xl font-bold">
                    Payment Cancelled
                </h1>

                <p className="mt-3 text-muted-foreground">
                    Your payment was cancelled. No payment has been completed.
                </p>

                {params.rentalRequestId && (
                    <p className="mt-4 text-sm text-muted-foreground">
                        Rental Request ID:{" "}
                        <span className="font-medium text-foreground">
                            {params.rentalRequestId}
                        </span>
                    </p>
                )}

                <div className="mt-6 flex gap-3">
                    <Button variant="outline" asChild className="flex-1">
                        <Link href="/dashboard">
                            Dashboard
                        </Link>
                    </Button>

                    <Button asChild className="flex-1">
                        <Link href="/properties">
                            Browse Properties
                        </Link>
                    </Button>
                </div>

            </div>
        </div>
    );
}