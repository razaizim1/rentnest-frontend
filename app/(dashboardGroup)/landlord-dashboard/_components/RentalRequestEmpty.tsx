import { ClipboardList } from "lucide-react";

export function RentalRequestEmpty() {
    return (
        <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed p-8 text-center">
            <ClipboardList className="h-12 w-12 text-muted-foreground" />

            <h2 className="mt-4 text-xl font-semibold">
                No Rental Requests
            </h2>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
                You don&apos;t have any rental requests at the moment.
            </p>
        </div>
    );
}