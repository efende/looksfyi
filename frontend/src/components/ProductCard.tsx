import { Edit2, Upload, Download } from 'lucide-react';
import type { Product } from '../data/mockData';

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <div className="group break-inside-avoid relative mb-4 cursor-pointer">
            {/* Image Container */}
            <div className="relative overflow-hidden rounded-xl bg-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
                    {/* Top Left: AI Try-On */}
                    <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-[-10px] group-hover:translate-y-0">
                        <button className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-black hover:bg-white transition-colors">
                            AI Try-On
                        </button>
                    </div>

                    {/* Top Right: Save */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-[-10px] group-hover:translate-y-0 delay-75">
                        <button className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-black hover:bg-white transition-colors">
                            Save
                        </button>
                    </div>

                    {/* Bottom Left: Buy */}
                    <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-[10px] group-hover:translate-y-0 delay-100">
                        <button className="bg-white text-black px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-gray-100 transition-colors">
                            Buy
                        </button>
                    </div>

                    {/* Bottom Right: Actions */}
                    <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-[10px] group-hover:translate-y-0 delay-150">
                        <button className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full text-gray-700 hover:text-black hover:bg-white transition-colors">
                            <Edit2 size={14} />
                        </button>
                        <button className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full text-gray-700 hover:text-black hover:bg-white transition-colors">
                            <Upload size={14} />
                        </button>
                        <button className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full text-gray-700 hover:text-black hover:bg-white transition-colors">
                            <Download size={14} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer Info */}
            <div className="mt-3">
                <p className="text-xs text-gray-500 font-medium">{product.brand}</p>
                <div className="flex justify-between items-baseline mt-0.5 gap-2">
                    <h3 className="text-sm text-gray-900 truncate" title={product.name}>
                        {product.name}
                    </h3>
                    <span className="text-sm text-gray-900 shrink-0">{product.price}</span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
