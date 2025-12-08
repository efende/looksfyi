



import { Card, CardImage } from './ui/Card';

interface MasonryGridProps {
    images: string[];
}

const MasonryGrid = ({ images }: MasonryGridProps) => {
    return (
        <div className="px-4 pb-12 mx-auto max-w-[1920px]">
            <div className="columns-2 md:columns-4 lg:columns-5 xl:columns-6 2xl:columns-7 gap-4 space-y-4">
                {images.map((src, index) => (
                    <Card key={index}>
                        <CardImage src={src} alt={`Pin ${index}`} />
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default MasonryGrid;
