

// Sample images to replicate the Pinterest/Unsplash aesthetic
const SAMPLE_IMAGES = [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop', // Fashion model
    'https://images.unsplash.com/photo-1542272201-b1ca555f8505?q=80&w=800&auto=format&fit=crop', // Mountain/Nature (from ref)
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop', // Clothes
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop', // Landscape (ref like)
    'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=800&auto=format&fit=crop', // Accessories
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop', // Fashion
    'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=800&auto=format&fit=crop', // Texture
    'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop', // Coat
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop', // Nature
    'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=800&auto=format&fit=crop', // Coffee/Modern
];

const MasonryGrid = () => {
    return (
        <div className="px-4 pb-12 mx-auto max-w-[1600px]">
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {SAMPLE_IMAGES.map((src, index) => (
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
                {/* Repeating images to better fill the grid for demo purposes */}
                {SAMPLE_IMAGES.slice(0, 5).reverse().map((src, index) => (
                    <div
                        key={`dup-${index}`}
                        className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer"
                    >
                        <img
                            src={src}
                            alt={`Pin Dup ${index}`}
                            className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MasonryGrid;
