"use client"; // Error boundaries must be Client Components

import Link from "next/link";
import { useEffect } from "react";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Error({
    error,
    unstable_retry,
}: {
    error: Error & { digest?: string };
    unstable_retry: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-10">
            <Card className="w-full max-w-lg border shadow-sm">
                <CardContent className="flex flex-col items-center p-10 text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-600">
                        <AlertTriangle size={40} />
                    </div>

                    <h2 className="mt-6 text-2xl font-bold">
                        Something went wrong!
                    </h2>

                    <p className="mt-2 max-w-sm text-muted-foreground">
                        An unexpected error occurred while loading this page. You can try again or return to the home page.
                    </p>

                    {error.digest && (
                        <p className="mt-3 rounded-md bg-muted px-3 py-1 font-mono text-xs text-muted-foreground">
                            Error ID: {error.digest}
                        </p>
                    )}

                    <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
                        <Button
                            variant="outline"
                            asChild
                            className="flex-1"
                        >
                            <Link href="/">
                                <Home className="mr-2 h-4 w-4" />
                                Back to Home
                            </Link>
                        </Button>

                        <Button
                            onClick={() => unstable_retry()}
                            className="flex-1"
                        >
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Try again
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}