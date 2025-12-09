import { Edit2, Upload, Download } from 'lucide-react';
import type { Product } from '../data/mockData';

interface ProductModalProps {
    product: Product;
    onClose: () => void;
}

const ProductModal = ({ product, onClose }: ProductModalProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl overflow-hidden w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-200">
                {/* Close Button Removed */}

                {/* Image */}
                <div className="relative aspect-[3/4] w-full bg-gray-100">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Info & Actions */}
                <div className="p-6">
                    {/* Info */}
                    <div className="mb-6">
                        <p className="text-sm text-gray-500 font-medium">{product.brand}</p>
                        <div className="flex justify-between items-baseline mt-1 gap-4">
                            <h3 className="text-xl text-gray-900 truncate" title={product.name}>
                                {product.name}
                            </h3>
                            <span className="text-xl text-gray-900 shrink-0">{product.price}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                            {product.details}
                        </p>
                    </div>

                    {/* Action Bar */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                        {/* Left Actions */}
                        <div className="flex gap-3">
                            <button className="relative overflow-hidden group/btn bg-gradient-to-r from-[#E2E2E2] via-[#E2E2E2] to-[#E2E2E2] text-black px-5 py-2 rounded-full text-sm font-semibold shadow-lg transition-all hover:scale-105 active:scale-95">
                                {/* Prism Effect: Transparent (Silver) until ~50% */}
                                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_45%,rgba(255,0,128,0.3)_75%,rgba(121,40,202,0.3)_100%)] opacity-70 group-hover/btn:opacity-100 transition-opacity"></div>
                                {/* Shine */}
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
            </div>
        </div>
    );
};

export default ProductModal;
