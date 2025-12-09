



import { useState } from 'react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import type { Product } from '../data/mockData';

interface MasonryGridProps {
    products: Product[];
    variant?: 'model' | 'item';
}

const MasonryGrid = ({ products, variant = 'item' }: MasonryGridProps) => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    return (
        <>
            <div className="px-4 pb-12 mx-auto max-w-[1920px]">
                <div className="columns-2 md:columns-4 lg:columns-5 xl:columns-6 2xl:columns-7 gap-4 space-y-4">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            variant={variant}
                            onClick={() => setSelectedProduct(product)}
                        />
                    ))}
                </div>
            </div>

            {
                selectedProduct && (
                    <ProductModal
                        product={selectedProduct}
                        variant={variant}
                        onClose={() => setSelectedProduct(null)}
                    />
                )
            }
        </>
    );
};

export default MasonryGrid;
