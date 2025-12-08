import React from 'react';

// Heading Component
interface HeadingProps {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    children: React.ReactNode;
    className?: string;
}

export const Heading = ({ level = 1, children, className = '' }: HeadingProps) => {
    const Tag = `h${level}` as React.ElementType;
    const baseStyles = 'font-normal text-gray-900 tracking-wide';

    const sizeStyles = {
        1: 'text-2xl',
        2: 'text-xl',
        3: 'text-lg',
        4: 'text-base',
        5: 'text-sm',
        6: 'text-xs',
    };

    return (
        <Tag className={`${baseStyles} ${sizeStyles[level]} ${className}`}>
            {children}
        </Tag>
    );
};

// Text Component
interface TextProps {
    variant?: 'default' | 'muted' | 'small';
    children: React.ReactNode;
    className?: string;
    as?: any;
}

export const Text = ({ variant = 'default', children, className = '', as: Component = 'span' }: TextProps) => {
    const styles = {
        default: 'text-black',
        muted: 'text-gray-500',
        small: 'text-sm',
    };

    return (
        <Component className={`${styles[variant]} ${className}`}>
            {children}
        </Component>
    );
};

// Link Component
interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children: React.ReactNode;
}

export const Link = ({ children, className = '', ...props }: LinkProps) => {
    return (
        <a
            {...props}
            className={`text-sm text-gray-400 hover:text-black transition-colors hover:underline ${className}`}
        >
            {children}
        </a>
    );
};
