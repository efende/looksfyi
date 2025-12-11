import React, { useRef } from 'react';
import { Upload, X, Wand2 } from 'lucide-react';
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
            className="relative w-full h-full min-h-[400px] flex flex-col items-center justify-center transition-all duration-300 rounded-xl overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 hover:border-gray-400"
            onDrop={(e) => handleDrop(e, true)}
            onDragOver={handleDragOver}
        >
            {model ? (
                <div className="relative w-full h-full group">
                    <img src={model.image} alt="Model" className="w-full h-full object-cover" />
                    <button
                        onClick={(e) => { e.stopPropagation(); onRemoveModel(); }}
                        className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <X size={16} />
                    </button>
                </div>
            ) : (
                <div
                    className="flex flex-col items-center gap-3 text-center p-6 opacity-60 cursor-pointer w-full h-full justify-center hover:opacity-100 transition-opacity"
                    onClick={() => modelInputRef.current?.click()}
                >
                    <Upload size={32} />
                    <span className="text-gray-500 font-medium text-sm">Drop Model or Click to Upload</span>
                </div>
            )}
        </div>
    );

    const renderItemSlot = (item: Product | undefined, index: number) => (
        <div
            key={index}
            className="relative aspect-square flex flex-col items-center justify-center transition-all duration-300 rounded-xl overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 hover:border-gray-400"
            onDrop={(e) => handleDrop(e, false)}
            onDragOver={handleDragOver}
        >
            {item ? (
                <div className="relative w-full h-full group">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    <button
                        onClick={(e) => { e.stopPropagation(); onRemoveItem(index); }}
                        className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <X size={12} />
                    </button>
                </div>
            ) : (
                <div
                    className="opacity-40 cursor-pointer w-full h-full flex items-center justify-center hover:opacity-100"
                    onClick={() => itemInputRef.current?.click()}
                >
                    <Upload size={20} />
                </div>
            )}
        </div>
    );

    return (
        <div className="w-full pt-28 pb-8 px-8 bg-white">
            <input
                type="file"
                ref={modelInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileChange(e, true)}
            />
            <input
                type="file"
                ref={itemInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileChange(e, false)}
            />

            <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 h-[500px]">
                {/* Left: Model (3 cols) */}
                <div className="col-span-3 h-full flex flex-col">
                    <h3 className="mb-4 text-gray-500 font-medium h-[24px]">Model</h3>
                    <div className="flex-1">
                        {renderModelSlot()}
                    </div>
                </div>

                {/* Center: Items (6 cols) */}
                <div className="col-span-6 h-full flex flex-col">
                    <h3 className="mb-4 text-gray-500 font-medium h-[24px]">Items (Drag & Drop)</h3>
                    <div className="grid grid-cols-4 grid-rows-2 gap-4 flex-1">
                        {/* Render 8 slots. Use items array and fill rest with undefined */}
                        {Array.from({ length: 8 }).map((_, idx) => renderItemSlot(items[idx], idx))}
                    </div>
                </div>

                {/* Right: Prompt (3 cols) */}
                <div className="col-span-3 h-full flex flex-col">
                    <h3 className="mb-4 text-gray-500 font-medium h-[24px]">Vision</h3>
                    <div className="flex-1 flex flex-col gap-4">
                        <textarea
                            value={prompt}
                            onChange={(e) => onSetPrompt(e.target.value)}
                            placeholder="Describe the look... e.g., 'A futuristic cyberpunk vibe with neon accents'"
                            className="w-full flex-1 p-4 resize-none outline-none text-sm transition-all rounded-xl bg-gray-50 focus:bg-white border-2 border-transparent focus:border-gray-200"
                        />

                        <button
                            onClick={onGenerate}
                            className="w-full py-4 px-6 flex items-center justify-center gap-2 font-semibold transition-all bg-black text-white hover:bg-gray-800 rounded-full"
                        >
                            <Wand2 size={20} />
                            <span>Generate Look</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TryOnWorkspace;
