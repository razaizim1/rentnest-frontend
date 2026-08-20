import Image from "next/image";

type PropertyGalleryProps = {
    image: string;
    title: string;
    category?: string;
    available?: boolean;
};

export function PropertyGallery({
    image,
    title,
    category,
    available,
}: PropertyGalleryProps) {
    return (
        <div className="grid gap-3 lg:grid-cols-[1.6fr_1fr]">
            <div className="relative min-h-[280px] overflow-hidden rounded-3xl lg:min-h-[520px]">
                <Image
                    src={image}
                    alt={title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-6">
                    <div className="flex flex-wrap gap-2">
                        {category && (
                            <span className="rounded-full bg-white/95 px-3 py-1 text-sm font-medium text-foreground">
                                {category}
                            </span>
                        )}
                        {available === false && (
                            <span className="rounded-full bg-red-600 px-3 py-1 text-sm font-medium text-white">
                                Rented
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
                <div className="relative min-h-[140px] overflow-hidden rounded-3xl lg:min-h-[252px]">
                    <Image
                        src={image}
                        alt={`${title} living space`}
                        fill
                        sizes="(max-width: 1024px) 50vw, 40vw"
                        className="object-cover object-left"
                    />
                </div>
                <div className="relative min-h-[140px] overflow-hidden rounded-3xl lg:min-h-[252px]">
                    <Image
                        src={image}
                        alt={`${title} interior`}
                        fill
                        sizes="(max-width: 1024px) 50vw, 40vw"
                        className="object-cover object-right"
                    />
                </div>
            </div>
        </div>
    );
}
