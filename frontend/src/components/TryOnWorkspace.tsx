
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
            className="relative w-full h-full flex flex-col items-center justify-center transition-all duration-300 overflow-hidden bg-[#222] group cursor-pointer"
            onDrop={(e) => handleDrop(e, true)}
            onDragOver={handleDragOver}
            onClick={() => !model && modelInputRef.current?.click()}
        >
            {/* Overlay Labels */}
            <div className="absolute top-8 left-8 z-10 pointer-events-none text-white">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-70 mb-2">Model</h2>
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
                    <span className="text-white text-xs font-bold uppercase tracking-widest">Add Model or Drag Here</span>
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
                    className="col-span-6 h-full flex flex-col px-4 group/items relative"
                    onDrop={(e) => handleDrop(e, false)}
                    onDragOver={handleDragOver}
                >
                    <div className="mt-8 mb-4 border-b border-gray-100 pb-2">
                        <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Items</h2>
                    </div>

                    <div className="flex-1 relative overflow-y-auto">
                        <div className="grid grid-cols-4 gap-4 pb-4">
                            {/* Render Occupied Slots */}
                            {items.map((item, idx) => (
                                <div key={idx} className="aspect-square relative group">
                                    <div className="w-full h-full bg-gray-50 relative group cursor-default">
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
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -mt-4 flex flex-col items-center gap-4 pointer-events-auto cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
                            onClick={() => itemInputRef.current?.click()}
                        >
                            <PlusCircle size={32} strokeWidth={1} className="text-gray-400" />
                            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest text-center max-w-[200px] leading-relaxed">
                                Add Apparel, Shoes, or Accessories<br />— or Drag Here
                            </span>
                        </div>
                    </div>
                </div>

                {/* --- Right: Vision (3 cols) --- */}
                <div className="col-span-3 h-full flex flex-col pl-4 border-l border-gray-50">
                    <div className="mb-6 flex-1 flex flex-col">
                        <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 mt-8">Vibe</h2>
                        <textarea
                            value={prompt}
                            onChange={(e) => onSetPrompt(e.target.value)}
                            placeholder="Describe the mood..."
                            className="w-full flex-1 font-serif italic text-2xl placeholder:text-black/25 border-none outline-none p-0 bg-transparent text-black resize-none"
                        />
                    </div>

                    <div className="relative flex items-end justify-end mt-4 border-b border-black pb-4 cursor-pointer group" onClick={onGenerate}>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 group-hover:mr-2 transition-all duration-300">Generate Look</span>
                        <div className="flex items-center mb-1 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                            <span className="text-gray-300 text-[10px] mr-2">|</span>
                            <span className="text-[10px] font-bold">✦ 5</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TryOnWorkspace;
