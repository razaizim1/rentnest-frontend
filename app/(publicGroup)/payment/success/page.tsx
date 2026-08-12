import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type SuccessPageProps = {
    searchParams: Promise<{
        rentalRequestId?: string;
    }>;
};

export default async function PaymentSuccessPage({
    searchParams,
}: SuccessPageProps) {
    const params = await searchParams;

    return (
        <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl border p-8 text-center shadow-sm">

                <CheckCircle2
                    className="mx-auto mb-5 text-green-600"
                    size={64}
                />

                <h1 className="text-3xl font-bold">
                    Payment Successful!
                </h1>

                <p className="mt-3 text-muted-foreground">
                    Your payment has been completed successfully.
                </p>

                {params.rentalRequestId && (
                    <p className="mt-4 text-sm text-muted-foreground">
                        Rental Request ID:{" "}
                        <span className="font-medium text-foreground">
                            {params.rentalRequestId}
                        </span>
                    </p>
                )}

                <Button asChild className="mt-6 w-full">
                    <Link href="/dashboard">
                        Go to Dashboard
                    </Link>
                </Button>

            </div>
        </div>
    );
}