import React from 'react';

interface BannerProps {
    href: string;
    src: string;
    alt: string;
    className?: string;
}

export const Banner: React.FC<BannerProps> = ({ href, src, alt, className = "" }) => {
    return (
        <div className={`w-full max-w-[400px] mx-auto overflow-hidden rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 ${className}`}>
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="block" // Garante que o link ocupe toda a área da imagem
            >
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-auto object-cover max-h-[120px] cursor-pointer"
                    loading="lazy"
                />
            </a>
        </div>
    );
};