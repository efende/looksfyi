
import React, { useRef } from 'react';
import { X, PlusCircle } from 'lucide-react';
import type { Product } from '../data/mockData';

interface TryOnWorkspaceProps {
    model: Product | null;
    items: Product[];
    prompt: string;
    onSetPrompt: (prompt: string) => void;
    onRemoveItem: (index: number) => void;
    onRemoveModel: () => void;
    onAddProduct: (product: Product, isModel: boolean) => void;
    onGenerate: () => void;
}

const TryOnWorkspace: React.FC<TryOnWorkspaceProps> = ({
    model,
    items,
    prompt,
    onSetPrompt,
    onRemoveItem,
    onRemoveModel,
    onAddProduct,
    onGenerate,
}) => {
    const modelInputRef = useRef<HTMLInputElement>(null);
    const itemInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const processFile = (file: File, isModel: boolean) => {
        if (!file.type.startsWith('image/')) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const dataUrl = e.target?.result as string;
            if (dataUrl) {
                const newProduct: Product = {
                    id: `local-${Date.now()}`,
                    name: file.name,
                    price: '0',
                    image: dataUrl,
                    brand: 'Local Upload',
                    brandAvatar: '',
                    details: 'Uploaded from local device',
                };
                onAddProduct(newProduct, isModel);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleDrop = (e: React.DragEvent, isModel: boolean) => {
        e.preventDefault();

        // 1. Handle Local Files
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            processFile(e.dataTransfer.files[0], isModel);
            return;
        }

        // 2. Handle Internal Drag
        const data = e.dataTransfer.getData('product');
        const sourceType = e.dataTransfer.getData('type');

        if (data) {
            // Enforce Type Restriction:
            // - Models can only go to Model slot
            // - Items can only go to Item slots
            if (isModel && sourceType !== 'model') return;
            if (!isModel && sourceType === 'model') return;

            try {
                const product = JSON.parse(data) as Product;
                onAddProduct(product, isModel);
            } catch (err) {
                console.error("Failed to parse product data", err);
            }
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isModel: boolean) => {
        if (e.target.files && e.target.files.length > 0) {
            processFile(e.target.files[0], isModel);
        }
        // Reset input
        e.target.value = '';
    };

    const renderModelSlot = () => (
        <div
            className="relative w-full h-full flex flex-col items-center justify-center transition-all duration-300 overflow-hidden bg-[#222] group cursor-pointer rounded-xl"
            onDrop={(e) => handleDrop(e, true)}
            onDragOver={handleDragOver}
            onClick={() => !model && modelInputRef.current?.click()}
        >
            {/* Overlay Labels */}
            <div className="absolute top-8 left-8 z-10 pointer-events-none text-white">
                <h2 className="text-sm font-normal opacity-70 mb-2">Model</h2>
            </div>

            {model ? (
                <div className="relative w-full h-full">
                    <img src={model.image} alt="Model" className="w-full h-full object-cover opacity-90 transition-opacity group-hover:opacity-100" />
                    <button
                        onClick={(e) => { e.stopPropagation(); onRemoveModel(); }}
                        className="absolute top-8 right-8 p-2 text-white border border-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-black"
                    >
                        <X size={16} />
                    </button>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors pointer-events-none"></div>
                </div>
            ) : (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -mt-4 flex flex-col items-center gap-4 opacity-70 group-hover:opacity-100 transition-opacity w-full">
                    <PlusCircle size={32} strokeWidth={1} className="text-white" />
                    <span className="text-white text-sm font-medium text-center">Upload Your Model. <br /> Drag & Drop or Click.</span>
                </div>
            )}
        </div>
    );

    return (
        <div className="w-full pt-28 pb-8 px-8 bg-white border-b border-gray-100">
            <input type="file" ref={modelInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, true)} />
            <input type="file" ref={itemInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, false)} />

            {/* Main Container - Restored to max-w-7xl, not full width */}
            <div className="max-w-7xl mx-auto h-[600px] grid grid-cols-12 gap-8">

                {/* --- Left: Model (3 cols) --- */}
                <div className="col-span-3 h-full">
                    {renderModelSlot()}
                </div>

                {/* --- Center: Items (6 cols) --- */}
                {/* --- Center: Items (6 cols) --- */}
                <div
                    className="col-span-6 h-full flex flex-col px-4 group/items relative cursor-pointer"
                    onDrop={(e) => handleDrop(e, false)}
                    onDragOver={handleDragOver}
                    onClick={() => itemInputRef.current?.click()}
                >
                    <div className="mt-8 mb-4 border-b border-gray-100 pb-2">
                        <h2 className="text-sm font-normal text-gray-400">Items</h2>
                    </div>

                    <div className="flex-1 relative overflow-y-auto">
                        <div className="grid grid-cols-4 gap-4 pb-4">
                            {/* Render Occupied Slots */}
                            {items.map((item, idx) => (
                                <div key={idx} className="aspect-square relative group" onClick={(e) => e.stopPropagation()}>
                                    <div className="w-full h-full bg-gray-50 relative group cursor-default rounded-xl overflow-hidden">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onRemoveItem(idx); }}
                                            className="absolute top-1 right-1 p-1 text-black opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/5 rounded-full"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Central Upload Area (Absolute to full column height) */}
                    <div
                        className={`absolute inset-0 pointer-events-none ${items.length > 0 ? 'opacity-0' : 'opacity-100'}`}
                    >
                        <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -mt-4 flex flex-col items-center gap-4 transition-opacity w-full"
                        >
                            <PlusCircle size={32} strokeWidth={1} className="text-gray-400" />
                            <span className="text-gray-400 text-sm font-medium text-center max-w-[200px] leading-relaxed">
                                Upload Your Style: Apparel, Shoes, Accessories. <br /> Drag & Drop or Click.
                            </span>
                        </div>
                    </div>
                </div>

                {/* --- Right: Vision (3 cols) --- */}
                <div className="col-span-3 h-full flex flex-col pl-4 border-l border-gray-50">
                    <div className="mb-6 flex-1 flex flex-col">
                        <h2 className="text-sm font-normal text-gray-400 mb-4 mt-8">Vibe</h2>
                        <textarea
                            value={prompt}
                            onChange={(e) => onSetPrompt(e.target.value)}
                            placeholder="Describe the mood..."
                            className="w-full flex-1 text-sm font-medium placeholder:italic placeholder:text-gray-300 border-none outline-none p-0 bg-transparent text-black resize-none font-sans not-italic"
                        />
                    </div>

                    <button
                        onClick={onGenerate}
                        className="group w-full py-4 text-sm font-medium transition-all duration-300 mt-4 relative flex items-center justify-center
                        bg-transparent text-black rounded-none
                        hover:bg-black hover:text-white hover:rounded-full
                        after:content-[''] after:absolute after:bottom-0 after:left-6 after:right-6 after:h-[1px] after:bg-black after:transition-opacity hover:after:opacity-0"
                    >
                        <span>Generate Look</span>
                        <span className="opacity-0 max-w-0 inline-flex overflow-hidden group-hover:opacity-100 group-hover:max-w-[100px] transition-all duration-300 ease-in-out whitespace-nowrap">
                            <span className="opacity-50 mx-2">|</span> ✦ 5
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TryOnWorkspace;
