



import ProductCard from './ProductCard';
import type { Product } from '../data/mockData';

interface MasonryGridProps {
    products: Product[];
}

const MasonryGrid = ({ products }: MasonryGridProps) => {
    return (
        <div className="px-4 pb-12 mx-auto max-w-[1920px]">
            <div className="columns-2 md:columns-4 lg:columns-5 xl:columns-6 2xl:columns-7 gap-4 space-y-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default MasonryGrid;
