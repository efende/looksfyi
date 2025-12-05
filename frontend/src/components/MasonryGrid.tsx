



interface MasonryGridProps {
    images: string[];
}

const MasonryGrid = ({ images }: MasonryGridProps) => {
    return (
        <div className="px-4 pb-12 mx-auto max-w-[1920px]">
            <div className="columns-2 md:columns-4 lg:columns-5 xl:columns-6 2xl:columns-7 gap-4 space-y-4">
                {images.map((src, index) => (
                    <div
                        key={index}
                        className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer"
                    >
                        <img
                            src={src}
                            alt={`Pin ${index}`}
                            className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                        />
                        {/* Overlay on hover (optional enhancement for premium feel) */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MasonryGrid;
