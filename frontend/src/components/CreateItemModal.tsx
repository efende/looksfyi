import { Upload } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '../data/mockData';

interface CreateItemModalProps {
    onClose: () => void;
    onCreate: (item: Product) => void;
    mode?: 'item' | 'model';
}

export default function CreateItemModal({ onClose, onCreate, mode = 'item' }: CreateItemModalProps) {
    const [step, setStep] = useState<'input' | 'selection'>('input');
    const [formData, setFormData] = useState({
        name: '',
        details: '',
        link: '',
        image: null as string | null,
    });

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) processFile(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) processFile(file);
    };

    const processFile = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({ ...prev, image: reader.result as string }));
        };
        reader.readAsDataURL(file);
    };

    const handleCreate = () => {
        if (!formData.name || !formData.image) return;
        setStep('selection');
    };

    const handleSelectStyle = () => {
        const newItem: Product = {
            id: Date.now().toString(),
            name: formData.name,
            brand: 'New Brand',
            brandAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop',
            price: '$0.00',
            image: formData.image!,
            details: formData.details,
        };
        onCreate(newItem);
        onClose();
    };

    // Overlay click closes modal; inner content stops propagation
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white rounded-3xl w-full max-w-5xl h-[700px] overflow-hidden shadow-2xl flex relative" onClick={e => e.stopPropagation()}>
                {/* No Layout Switcher - Only Split Layout */}
                {step === 'input' ? (
                    <div className="w-full h-full relative">
                        <div className="flex w-full h-full">
                            <div className="w-1/2 p-8 bg-gray-50 border-r border-gray-100 flex flex-col justify-center items-center relative">
                                <h2 className="text-2xl font-handwriting mb-8 text-gray-500 absolute top-8 left-8 -rotate-2">
                                    {mode === 'model' ? 'Create Model' : 'Create Items'}
                                </h2>
                                <UploadArea
                                    formData={formData}
                                    onDrop={handleDrop}
                                    onUpload={handleImageUpload}
                                    className="w-full flex-1 rounded-2xl bg-white"
                                    compact={false}
                                    mode={mode}
                                />
                            </div>
                            <div className="w-1/2 p-12 flex flex-col justify-center bg-white">
                                <div className="space-y-5 max-w-sm mx-auto w-full">
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-900 ml-1">
                                            {mode === 'model' ? 'Model Name' : 'Item Name'}
                                        </label>
                                        <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 outline-none" placeholder={mode === 'model' ? "e.g. Summer Look" : "e.g. Vintage Lamp"} />
                                    </div>

                                    {mode === 'item' && (
                                        <>
                                            <div className="space-y-1">
                                                <label className="text-sm font-medium text-gray-900 ml-1">Details</label>
                                                <textarea value={formData.details} onChange={e => setFormData({ ...formData, details: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 outline-none h-32 resize-none" placeholder="Add description..." />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-sm font-medium text-gray-900 ml-1">Item URL</label>
                                                <input type="text" value={formData.link} onChange={e => setFormData({ ...formData, link: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 outline-none" placeholder="http://" />
                                            </div>
                                        </>
                                    )}

                                    <div className="pt-2">
                                        <button onClick={handleCreate} disabled={!formData.name || !formData.image} className="w-full py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 disabled:opacity-50 transition-all">
                                            {mode === 'model' ? 'Create Model' : 'Create Item'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Selection Phase (unchanged)
                    <div className="flex flex-col w-full h-full bg-gray-50">
                        <div className="px-8 py-6 bg-white border-b border-gray-100 flex justify-between items-center shrink-0">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Choose a Style</h2>
                                <p className="text-sm text-gray-500">Select how you want this item to appear</p>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                                {/* Style 1: Modern Card */}
                                <div onClick={() => handleSelectStyle()} className="group cursor-pointer">
                                    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                                        <div className="aspect-[4/5] bg-gray-100 relative overflow-hidden">
                                            <img src={formData.image!} alt={formData.name} className="w-full h-full object-cover" />
                                            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold">Modern</div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-bold text-gray-900">{formData.name}</h3>
                                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{formData.details}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Style 2: Minimal */}
                                <div onClick={() => handleSelectStyle()} className="group cursor-pointer">
                                    <div className="bg-white p-4 rounded-xl border border-gray-100 hover:border-gray-300 transition-all h-full flex flex-col items-center text-center">
                                        <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-gray-50">
                                            <img src={formData.image!} alt={formData.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="bg-gray-50 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-gray-500 mb-2">Minimal</div>
                                        <h3 className="font-medium text-gray-900">{formData.name}</h3>
                                    </div>
                                </div>
                                {/* Additional styles can remain as before */}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// Helper Component: Upload Area
const UploadArea = ({
    formData,
    onDrop,
    onUpload,
    className = '',
    compact = false,
    mode = 'item',
}: {
    formData: { image: string | null };
    onDrop: (e: React.DragEvent) => void;
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    compact?: boolean;
    mode?: 'item' | 'model';
}) => (
    <label
        onDragOver={e => e.preventDefault()}
        onDrop={onDrop}
        className={`flex flex-col items-center justify-center cursor-pointer transition-all group relative overflow-hidden ${className} ${formData.image ? 'border-0' : 'border-2 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50'}`}
    >
        <input type="file" accept="image/*" className="hidden" onChange={onUpload} />
        {formData.image ? (
            <img src={formData.image} alt="Preview" className="w-full h-full object-contain" />
        ) : (
            <div className="text-center p-6">
                <div className={`bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform ${compact ? 'w-10 h-10' : 'w-16 h-16'}`}>
                    <Upload className="text-gray-400" size={compact ? 20 : 28} />
                </div>
                {!compact && (
                    <p className="text-sm font-medium text-gray-500 font-handwriting">
                        {mode === 'model'
                            ? "Upload Your Model. Drag & Drop or Click."
                            : "Upload Your Style: Apparel, Shoes, Accessories. Drag & Drop or Click."}
                    </p>
                )}
            </div>
        )}
    </label>
);
