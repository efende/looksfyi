import React from 'react';
import { Upload, X, Wand2 } from 'lucide-react';
import type { Product } from '../data/mockData';


interface TryOnWorkspaceProps {
    model: Product | null;
    items: Product[];
    prompt: string;
    onSetPrompt: (prompt: string) => void;
    onRemoveItem: (index: number) => void;
    onRemoveModel: () => void;
    onDropModel: (e: React.DragEvent) => void;
    onDropItem: (e: React.DragEvent, index?: number) => void;
    onGenerate: () => void;
}

const TryOnWorkspace: React.FC<TryOnWorkspaceProps> = ({
    model,
    items,
    prompt,
    onSetPrompt,
    onRemoveItem,
    onRemoveModel,
    onDropModel,
    onDropItem,
    onGenerate,
}) => {

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const renderModelSlot = () => (
        <div
            className="relative w-full h-full min-h-[400px] flex flex-col items-center justify-center transition-all duration-300 rounded-xl overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 hover:border-gray-400"
            onDrop={onDropModel}
            onDragOver={handleDragOver}
        >
            {model ? (
                <div className="relative w-full h-full group">
                    <img src={model.image} alt="Model" className="w-full h-full object-cover" />
                    <button
                        onClick={onRemoveModel}
                        className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <X size={16} />
                    </button>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-3 text-center p-6 opacity-60">
                    <Upload size={32} />
                    <span className="text-gray-500 font-medium text-sm">Drop Model Here</span>
                </div>
            )}
        </div>
    );

    const renderItemSlot = (item: Product | undefined, index: number) => (
        <div
            key={index}
            className="relative aspect-square flex flex-col items-center justify-center transition-all duration-300 rounded-xl overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 hover:border-gray-400"
            onDrop={(e) => onDropItem(e, index)}
            onDragOver={handleDragOver}
        >
            {item ? (
                <div className="relative w-full h-full group">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    <button
                        onClick={() => onRemoveItem(index)}
                        className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <X size={12} />
                    </button>
                </div>
            ) : (
                <div className="opacity-40">
                    <Upload size={20} />
                </div>
            )}
        </div>
    );

    return (
        <div className="w-full pt-28 pb-8 px-8 bg-white">
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
