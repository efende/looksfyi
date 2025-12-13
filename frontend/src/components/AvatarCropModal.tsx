
import React, { useState, useRef } from 'react';
import { X, Minus, Plus } from 'lucide-react';

interface AvatarCropModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageSrc?: string;
}

const AvatarCropModal: React.FC<AvatarCropModalProps> = ({ isOpen, onClose, imageSrc }) => {
    const [zoom, setZoom] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStart({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        setPosition({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleWheel = (e: React.WheelEvent) => {
        e.stopPropagation();
        // Optional: Zoom on scroll could be added but user asked for slider
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-center pt-6 pb-4 relative">
                    <h2 className="text-xl font-medium text-gray-900">Crop Avatar</h2>
                    <button
                        onClick={onClose}
                        className="absolute right-5 top-6 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 pb-6 space-y-6">

                    {/* Crop Area */}
                    <div
                        ref={containerRef}
                        className={`relative w-full aspect-square bg-gray-100 rounded-xl overflow-hidden select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onWheel={handleWheel}
                    >
                        {/* Image Layer */}
                        <div
                            className="w-full h-full flex items-center justify-center will-change-transform"
                            style={{
                                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                                transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                            }}
                        >
                            <img
                                src={imageSrc || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=contain"}
                                alt="Crop Target"
                                className="max-w-none w-[120%] h-[120%] object-cover pointer-events-none select-none"
                                draggable={false}
                            />
                        </div>

                        {/* Overlay Layer (Circle Guide) */}
                        <div className="absolute inset-0 pointer-events-none z-10">
                            {/* The shadow overlay using a massive box-shadow on a centered circle */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 [mask-image:exclude]">
                                <div className="w-56 h-56 rounded-full border-2 border-white/80 shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] bg-transparent"></div>
                                {/* Note: The common CSS trick for 'cutout' overlay is usually box-shadow or mask, 
                                     but since we have a simple need, the shadow trick on a transparent div inside overflow-hidden parent works well. 
                                     Wait, the bg-black/50 above might cover the hole if I'm not careful.
                                     Let's stick to the box-shadow trick which is robust for this. */}
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                {/* The 'Hole' and border */}
                                <div className="w-56 h-56 rounded-full border-2 border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]"></div>
                            </div>
                        </div>
                    </div>

                    {/* Slider Control */}
                    <div className="flex items-center gap-3 px-2">
                        <Minus size={16} className="text-gray-400" />
                        <input
                            type="range"
                            min="1"
                            max="3"
                            step="0.01"
                            value={zoom}
                            onChange={(e) => setZoom(parseFloat(e.target.value))}
                            className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                        />
                        <Plus size={16} className="text-gray-400" />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 px-4 rounded-full border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 bg-black text-white text-sm font-medium py-3 px-4 rounded-full border border-transparent hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl active:scale-[0.99] duration-200"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AvatarCropModal;
