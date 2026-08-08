import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex min-h-[80vh] items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-8xl font-bold text-primary">404</h1>

                <h2 className="mt-4 text-3xl font-semibold">
                    Page Not Found
                </h2>

                <p className="mt-3 max-w-md text-muted-foreground">
                    Sorry, the page you&apos;re looking for doesn&apos;t exist or may have
                    been moved.
                </p>

                <div className="mt-8 flex justify-center gap-4">
                    <Button asChild>
                        <Link href="/">
                            Back to Home
                        </Link>
                    </Button>

                    <Button asChild variant="outline">
                        <Link href="/properties">
                            Browse Properties
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}