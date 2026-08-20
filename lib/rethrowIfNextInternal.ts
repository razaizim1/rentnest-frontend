export function rethrowIfNextInternal(error: unknown) {
    if (
        typeof error === "object" &&
        error !== null &&
        "digest" in error &&
        typeof (error as { digest?: unknown }).digest === "string"
    ) {
        const digest = (error as { digest: string }).digest;

        if (
            digest === "DYNAMIC_SERVER_USAGE" ||
            digest.startsWith("NEXT_REDIRECT") ||
            digest.startsWith("NEXT_HTTP_ERROR_FALLBACK")
        ) {
            throw error;
        }
    }
}
