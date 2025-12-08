import React from 'react';

interface TabButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    active?: boolean;
    children: React.ReactNode;
}

export const TabButton = ({ active, children, className = '', ...props }: TabButtonProps) => {
    return (
        <button
            {...props}
            className={`
                relative py-2 text-sm font-normal transition-colors duration-200
                ${active ? 'text-black' : 'text-gray-500 hover:text-black'}
                ${className}
            `}
        >
            {children}
            {active && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black rounded-full" />
            )}
        </button>
    );
};
