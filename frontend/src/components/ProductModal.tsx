import { ChevronLeft, Edit2, Upload, Download, ShoppingBag, Plus } from 'lucide-react';
import type { Product } from '../data/mockData';
import { useState } from 'react';

interface ProductModalProps {
    product: Product;
    onClose: () => void;
    variant?: 'model' | 'item' | 'look';
}

const ProductModal = ({ product, onClose, variant = 'item' }: ProductModalProps) => {
    const isModel = variant === 'model';
    const isLook = variant === 'look';
    const [selectedRelatedItem, setSelectedRelatedItem] = useState<Product | null>(null);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className={`relative bg-white rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 ${isLook ? 'w-[90vw] max-w-6xl h-[85vh] flex' : 'w-fit max-w-[90vw]'}`}>
                {/* Left Column (Look) / Main Content (Standard) */}
                <div className={`flex flex-col relative overflow-hidden ${isLook ? 'w-2/3 h-full' : ''}`}>
                    {/* Image Section */}
                    <div className={`relative bg-gray-100 ${isLook ? 'flex-1 overflow-hidden' : 'h-[70vh]'}`}>
                        <img
                            src={product.image}
                            alt={product.name}
                            className={`h-full w-full ${isLook ? 'object-contain' : 'object-cover'}`}
                        />
                    </div>

                    {/* Info & Actions Section */}
                    <div className="p-6 shrink-0 bg-white relative z-10">
                        {/* Info */}
                        <div className="mb-6">
                            {!isModel && !isLook && <p className="text-sm text-gray-500 font-medium">{product.brand}</p>}

                            <div className="flex justify-between items-center mt-1 gap-4">
                                {isLook ? (
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 shrink-0">
                                            <img
                                                src={product.brandAvatar}
                                                alt={product.brand}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <h3 className="text-xl text-gray-900 truncate font-semibold" title={product.brand}>
                                            {product.brand}
                                        </h3>
                                    </div>
                                ) : (
                                    <h3 className="text-xl text-gray-900 truncate" title={product.name}>
                                        {product.name}
                                    </h3>
                                )}
                                {!isModel && !isLook && <span className="text-xl text-gray-900 shrink-0">{product.price}</span>}
                            </div>

                            {!isModel && !isLook && (
                                <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                                    {product.details}
                                </p>
                            )}
                        </div>

                        {/* Action Bar */}
                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                            {/* Left Actions */}
                            <div className="flex gap-3">
                                <button className="relative overflow-hidden group/btn bg-gradient-to-r from-[#E2E2E2] via-[#E2E2E2] to-[#E2E2E2] text-black px-5 py-2 rounded-full text-sm font-semibold shadow-lg transition-all hover:scale-105 active:scale-95">
                                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_45%,rgba(255,0,128,0.3)_75%,rgba(121,40,202,0.3)_100%)] opacity-70 group-hover/btn:opacity-100 transition-opacity"></div>
                                    <div className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                                    <span className="relative z-10 flex items-center gap-2">AI Try-On</span>
                                </button>
                                {!isModel && (
                                    <>
                                        <button className="bg-gray-100 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                                            Save
                                        </button>
                                        {!isLook && (
                                            <button className="bg-gray-100 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                                                Buy
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>

                            {/* Right Actions */}
                            <div className="flex gap-2">
                                {!isLook && (
                                    <button className="p-2 text-gray-600 hover:text-black hover:bg-gray-50 rounded-full transition-colors" title="Edit">
                                        <Edit2 size={20} />
                                    </button>
                                )}
                                <button className="p-2 text-gray-600 hover:text-black hover:bg-gray-50 rounded-full transition-colors" title="Upload">
                                    <Upload size={20} />
                                </button>
                                <button className="p-2 text-gray-600 hover:text-black hover:bg-gray-50 rounded-full transition-colors" title="Download">
                                    <Download size={20} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* NEW: Left Side Detail Overlay (Slide from Left) */}
                    {isLook && (
                        <div
                            className={`absolute inset-0 bg-white z-30 flex flex-col transition-transform duration-300 ease-in-out ${selectedRelatedItem ? 'translate-x-0' : '-translate-x-full'
                                }`}
                        >
                            {selectedRelatedItem && (
                                <>
                                    {/* Back Button Overlay */}
                                    <div className="absolute top-6 left-6 z-30">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedRelatedItem(null);
                                            }}
                                            className="bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
                                        >
                                            <ChevronLeft size={20} className="text-gray-900" />
                                        </button>
                                    </div>

                                    {/* Image Section (Flexible) */}
                                    <div className="flex-1 relative bg-gray-100 overflow-hidden">
                                        <img
                                            src={selectedRelatedItem.image}
                                            alt={selectedRelatedItem.name}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>

                                    {/* Info & Actions Section (Matching Standard Item View) */}
                                    <div className="p-6 shrink-0 bg-white relative z-10">
                                        {/* Info */}
                                        <div className="mb-6">
                                            <p className="text-sm text-gray-500 font-medium">{selectedRelatedItem.brand}</p>

                                            <div className="flex justify-between items-center mt-1 gap-4">
                                                <h3 className="text-xl text-gray-900 truncate" title={selectedRelatedItem.name}>
                                                    {selectedRelatedItem.name}
                                                </h3>
                                                <span className="text-xl text-gray-900 shrink-0">{selectedRelatedItem.price}</span>
                                            </div>

                                            <p className="text-sm text-gray-500 mt-3 leading-relaxed line-clamp-2">
                                                {selectedRelatedItem.details}
                                            </p>
                                        </div>

                                        {/* Action Bar */}
                                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                            {/* Left Actions */}
                                            <div className="flex gap-3">
                                                <button className="relative overflow-hidden group/btn bg-gradient-to-r from-[#E2E2E2] via-[#E2E2E2] to-[#E2E2E2] text-black px-5 py-2 rounded-full text-sm font-semibold shadow-lg transition-all hover:scale-105 active:scale-95">
                                                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_45%,rgba(255,0,128,0.3)_75%,rgba(121,40,202,0.3)_100%)] opacity-70 group-hover/btn:opacity-100 transition-opacity"></div>
                                                    <div className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                                                    <span className="relative z-10 flex items-center gap-2">AI Try-On</span>
                                                </button>

                                                <button className="bg-gray-100 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                                                    Save
                                                </button>
                                                <button className="bg-gray-100 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                                                    Buy
                                                </button>
                                            </div>

                                            {/* Right Actions */}
                                            <div className="flex gap-2">
                                                <button className="p-2 text-gray-600 hover:text-black hover:bg-gray-50 rounded-full transition-colors" title="Edit">
                                                    <Edit2 size={20} />
                                                </button>
                                                <button className="p-2 text-gray-600 hover:text-black hover:bg-gray-50 rounded-full transition-colors" title="Upload">
                                                    <Upload size={20} />
                                                </button>
                                                <button className="p-2 text-gray-600 hover:text-black hover:bg-gray-50 rounded-full transition-colors" title="Download">
                                                    <Download size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>

                {/* Right Column (Only for Look) */}
                {isLook && (
                    <div className="w-1/3 h-full flex flex-col border-l border-gray-100 shrink-0 relative overflow-hidden bg-white">

                        {/* 1. Main List View */}
                        <div className="absolute inset-0 flex flex-col bg-white">
                            {/* Scrollable Items List */}
                            {product.relatedProducts && (
                                <div className="flex-1 overflow-y-auto px-4 py-4 scroll-smooth">
                                    <h4 className="text-sm font-semibold text-gray-900 mb-4 px-1">Shop the Look</h4>

                                    <div className="grid grid-cols-2 gap-x-3 gap-y-6">
                                        {product.relatedProducts.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className={`group/item cursor-pointer transition-opacity duration-200 ${selectedRelatedItem === item ? 'opacity-100' : 'opacity-100'}`} // Keep full opacity, selection is shown on left
                                                onClick={() => setSelectedRelatedItem(prev => prev === item ? null : item)}
                                            >
                                                {/* Image Container */}
                                                <div className={`aspect-square rounded-xl overflow-hidden bg-gray-100 relative mb-0 border-2 transition-colors ${selectedRelatedItem === item ? 'border-black' : 'border-transparent'}`}>
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-500" />

                                                    {/* Hover Actions Overlay */}
                                                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 z-20">

                                                        {/* Top Left: AI Try-On (Silver Prism - Matching ProductCard) */}
                                                        <div className="absolute top-2 left-2">
                                                            <button
                                                                className="relative overflow-hidden group/btn bg-gradient-to-r from-[#E2E2E2] via-[#E2E2E2] to-[#E2E2E2] text-black px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg hover:scale-105 transition-transform"
                                                                onClick={(e) => { e.stopPropagation(); }}
                                                            >
                                                                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_45%,rgba(255,0,128,0.3)_75%,rgba(121,40,202,0.3)_100%)] opacity-70 group-hover/btn:opacity-100 transition-opacity"></div>
                                                                <div className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                                                                <span className="relative z-10 whitespace-nowrap">AI Try-On</span>
                                                            </button>
                                                        </div>

                                                        {/* Top Right: Save (Plus Icon) */}
                                                        <div className="absolute top-2 right-2">
                                                            <button
                                                                className="bg-white/90 backdrop-blur-sm p-2 rounded-full text-black hover:bg-white transition-colors shadow-sm"
                                                                onClick={(e) => { e.stopPropagation(); }}
                                                            >
                                                                <Plus size={14} />
                                                            </button>
                                                        </div>

                                                        {/* Bottom Left: Buy (ShoppingBag Icon) */}
                                                        <div className="absolute bottom-2 left-2">
                                                            <button
                                                                className="bg-white text-black p-2 rounded-full hover:bg-gray-100 transition-colors shadow-sm"
                                                                onClick={(e) => { e.stopPropagation(); }}
                                                            >
                                                                <ShoppingBag size={14} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Text Info Below (Matching ProductCard) */}
                                                <div className="mt-3 px-0.5">
                                                    <p className="text-xs text-gray-500 font-medium mb-0.5">{item.brand}</p>
                                                    <div className="flex justify-between items-baseline gap-2">
                                                        <h3 className="text-sm text-gray-900 truncate" title={item.name}>
                                                            {item.name}
                                                        </h3>
                                                        <span className="text-sm text-gray-900 shrink-0">{item.price}</span>
                                                    </div>
                                                </div>

                                            </div>
                                        ))}
                                    </div>

                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductModal;
