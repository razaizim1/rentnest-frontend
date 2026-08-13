export function PropertyEmpty() {
    return (
        <div className="py-20 text-center">
            <h3 className="text-xl font-semibold">
                No properties found
            </h3>

            <p className="mt-2 text-muted-foreground">
                Try a different search term or adjust your filters.
            </p>
        </div>
    );
}