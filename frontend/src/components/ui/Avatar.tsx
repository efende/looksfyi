import React from 'react';

interface AvatarProps {
    src: string;
    alt: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    children?: React.ReactNode; // For badges/overlays
}

const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
};

export const Avatar = ({ src, alt, size = 'md', className = '', children }: AvatarProps) => {
    return (
        <div className="relative inline-block">
            <div className={`${sizeClasses[size]} rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-gray-100 ${className}`}>
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover"
                />
            </div>
            {children}
        </div>
    );
};

export const AvatarBadge = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
    return (
        <div className={`absolute bottom-0 right-0 bg-black text-white p-1 rounded-full border-2 border-white flex items-center justify-center w-6 h-6 ${className}`}>
            {children}
        </div>
    );
};
