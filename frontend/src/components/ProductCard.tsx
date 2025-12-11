import { Edit2, Upload, Download } from 'lucide-react';
import type { Product } from '../data/mockData';

interface ProductCardProps {
    product: Product;
    onClick?: () => void;
    variant?: 'model' | 'item' | 'look';
    onAddToWorkspace?: (product: Product, isModel: boolean) => void;
}

const ProductCard = ({ product, onClick, variant = 'item', onAddToWorkspace }: ProductCardProps) => {
    const isModel = variant === 'model';
    const isLook = variant === 'look';

    // Special Rendering for Generating State
    if (product.isGenerating) {
        return (
            <div className="break-inside-avoid relative mb-4 rounded-xl aspect-[3/4] cursor-default bg-gray-100 overflow-hidden flex items-center justify-center">
                {/* Glow Effects - Pulsating Size */}
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-300/60 rounded-full blur-[50px] animate-[pulse_3s_ease-in-out_infinite] scale-150"></div>
                <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-300/60 rounded-full blur-[50px] animate-[pulse_4s_ease-in-out_infinite] scale-150 delay-700"></div>

                <div className="relative z-10 flex flex-col items-center">
                    <h2 className="text-sm font-light text-gray-800 tracking-[0.25em] uppercase border-b border-gray-300 pb-1">Generating</h2>
                </div>
            </div>
        );
    }

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('product', JSON.stringify(product));
        e.dataTransfer.setData('type', variant); // 'model' or 'item' (typically 'item')
        e.dataTransfer.effectAllowed = 'copy';

        // Use the image element as the drag ghost
        const img = e.currentTarget.querySelector('img');
        if (img) {
            e.dataTransfer.setDragImage(img, img.offsetWidth / 2, img.offsetHeight / 2);
        }
    };

    return (
        <div
            onClick={onClick}
            draggable
            onDragStart={handleDragStart}
            className="group break-inside-avoid relative mb-4 cursor-pointer"
        >
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
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (onAddToWorkspace) onAddToWorkspace(product, isModel);
                            }}
                            className="relative overflow-hidden group/btn bg-gradient-to-r from-[#E2E2E2] via-[#E2E2E2] to-[#E2E2E2] text-black px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg transition-all hover:scale-105 active:scale-95">
                            {/* Prism Effect: Transparent (Silver) until ~50% */}
                            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_45%,rgba(255,0,128,0.3)_75%,rgba(121,40,202,0.3)_100%)] opacity-70 group-hover/btn:opacity-100 transition-opacity"></div>
                            {/* Shine */}
                            <div className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                            <span className="relative z-10">AI Try-On</span>
                        </button>
                    </div>

                    {/* Top Right: Save (Items & Looks) */}
                    {!isModel && (
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-[-10px] group-hover:translate-y-0 delay-75">
                            <button className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-black hover:bg-white transition-colors">
                                Save
                            </button>
                        </div>
                    )}

                    {/* Bottom Left: Visit Site (Items only) */}
                    {!isModel && !isLook && (
                        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-[10px] group-hover:translate-y-0 delay-100">
                            <button className="bg-white text-black px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-gray-100 transition-colors">
                                Visit Site
                            </button>
                        </div>
                    )}

                    {/* Bottom Right: Actions */}
                    <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-[10px] group-hover:translate-y-0 delay-150">
                        {!isLook && (
                            <button className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full text-gray-700 hover:text-black hover:bg-white transition-colors">
                                <Edit2 size={14} />
                            </button>
                        )}
                        <button className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full text-gray-700 hover:text-black hover:bg-white transition-colors">
                            <Upload size={14} />
                        </button>
                        <button className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full text-gray-700 hover:text-black hover:bg-white transition-colors">
                            <Download size={14} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer Info (Hidden for Look) */}
            {!isLook && (
                <div className="mt-3">
                    {!isModel && <p className="text-xs text-gray-500 font-medium">{product.brand}</p>}
                    <div className="flex justify-between items-baseline mt-0.5 gap-2">
                        <h3 className="text-sm text-gray-900 truncate" title={product.name}>
                            {product.name}
                        </h3>
                        {!isModel && <span className="text-sm text-gray-900 shrink-0">{product.price}</span>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductCard;
