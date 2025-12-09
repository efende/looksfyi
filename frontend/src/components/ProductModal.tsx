import { Edit2, Upload, Download } from 'lucide-react';
import type { Product } from '../data/mockData';

interface ProductModalProps {
    product: Product;
    onClose: () => void;
    variant?: 'model' | 'item' | 'look';
}

const ProductModal = ({ product, onClose, variant = 'item' }: ProductModalProps) => {
    const isModel = variant === 'model';
    const isLook = variant === 'look';

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
                <div className={`flex flex-col ${isLook ? 'w-2/3 h-full' : ''}`}>
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
                            {!isModel && <p className="text-sm text-gray-500 font-medium">{product.brand}</p>}

                            <div className="flex justify-between items-center mt-1 gap-4">
                                <h3 className="text-xl text-gray-900 truncate" title={product.name}>
                                    {product.name}
                                </h3>
                                {!isModel && <span className="text-xl text-gray-900 shrink-0">{product.price}</span>}
                            </div>

                            {!isModel && (
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
                                        <button className="bg-gray-100 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                                            Buy
                                        </button>
                                    </>
                                )}
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
                </div>

                {/* Right Column (Only for Look) */}
                {isLook && (
                    <div className="w-1/3 h-full flex flex-col border-l border-gray-100">
                        {/* Header / Info for Look */}
                        <div className="p-6 shrink-0">
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
                        </div>

                        {/* Scrollable Items List (Only for Look) */}
                        {product.relatedImages && (
                            <div className="flex-1 overflow-y-auto px-6 pb-4">
                                <h4 className="text-sm font-semibold text-gray-900 mb-3">Shop the Look</h4>
                                <div className="space-y-3">
                                    {product.relatedImages.map((img, idx) => (
                                        <div key={idx} className="flex gap-4 p-2 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100 group cursor-pointer">
                                            <div className="w-20 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                                <img src={img} alt={`Item ${idx + 1}`} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex flex-col justify-center gap-1">
                                                <p className="text-sm font-medium text-gray-900">Item Name {idx + 1}</p>
                                                <p className="text-xs text-gray-500">$120.00</p>
                                                <button className="text-xs font-semibold text-black underline opacity-0 group-hover:opacity-100 transition-opacity text-left">
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductModal;
