import { PropertySkeletonGrid } from "../_components/property/PropertySkeletonGrid";

export default function PropertiesLoading() {
    return (
        <main className="min-h-screen bg-muted/20">
            <section className="border-b bg-background">
                <div className="container mx-auto px-4 py-14">
                    <div className="mx-auto max-w-3xl space-y-4 text-center">
                        <div className="mx-auto h-4 w-40 animate-pulse rounded bg-muted" />
                        <div className="mx-auto h-12 w-3/4 animate-pulse rounded bg-muted" />
                        <div className="mx-auto h-5 w-full max-w-2xl animate-pulse rounded bg-muted" />
                    </div>
                    <div className="mx-auto mt-8 h-14 max-w-3xl animate-pulse rounded-2xl bg-muted" />
                </div>
            </section>
            <section className="container mx-auto px-4 py-10">
                <PropertySkeletonGrid />
            </section>
        </main>
    );
}
