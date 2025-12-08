import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const Card = ({ children, className = '', onClick }: CardProps) => {
    return (
        <div
            onClick={onClick}
            className={`break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer ${className}`}
        >
            {children}
        </div>
    );
};

export const CardImage = ({ src, alt }: { src: string; alt: string }) => {
    return (
        <>
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
        </>
    );
};
