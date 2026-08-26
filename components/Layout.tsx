import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Mail, Globe, MessageCircle, ChevronLeft, Youtube } from 'lucide-react';
import { Banner } from './Banner';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);
    const location = useLocation();

    // Toggle Dark Mode
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const isHome = location.pathname === '/';

    return (
        <div className="min-h-screen flex flex-col font-sans overflow-x-hidden w-full max-w-full">
            {/* Header */}
            <header className="pt-6 pb-2 px-4 flex flex-col items-center relative w-full max-w-full">
                {/* Theme Toggle - Absolute Top Right */}
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="absolute top-6 right-4 md:right-8 p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:scale-110 transition-transform shadow-sm z-10"
                >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* Top Banner - Unified Size */}
                <Banner
                    href="https://rollercoin.com/?r=kyluudij"
                    src="https://static.rollercoin.com/static/img/ref/gen2/w320h50.png"
                    alt="Top Advertisement"
                    className="mb-6"
                />

                {/* Logo & Navigation */}
                <div className="flex flex-col items-center gap-4 w-full max-w-full">
                    <Link to="/" className="group relative">
                        <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-blue-500 to-cyan-400 shadow-lg group-hover:scale-105 transition-transform duration-300">
                            <img
                                src="/images/logo-rkfox.png"
                                alt="RK FOX Logo"
                                className="w-full h-full rounded-full object-cover border-4 border-white dark:border-slate-900"
                            />
                        </div>
                    </Link>

                    <div className="text-center w-full max-w-full flex flex-col items-center">
                        <Link to="/" className="group relative block w-full max-w-lg">
                            <img className="w-full h-auto max-h-[250px] object-cover rounded-xl shadow-md" src="/images/header-cover.png" alt="RK FOX Banner" />
                        </Link>
                        {!isHome && (
                            <Link to="/" className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-blue-500 transition-colors mt-2">
                                <ChevronLeft size={16} /> Voltar para o Início
                            </Link>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow w-full max-w-6xl mx-auto px-4 py-8">
                {children}
            </main>

            {/* Footer - Modeled after Image 5 */}
            <footer className="mt-auto py-12 px-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-800">
                <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8">
                    {/* Footer Banner */}
                    <Banner
                        href="https://rollercoin.com/?r=kyluudij"
                        src="https://static.rollercoin.com/static/img/ref/gen2/w320h50.png"
                        alt="Footer Advertisement"
                    />

                    {/* Contact Info */}
                    <div className="space-y-2">
                        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                            Contato Profissional
                        </p>
                        <a href="mailto:canalrkfox@gmail.com" className="text-xl md:text-2xl font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors">
                            canalrkfox@gmail.com
                        </a>
                    </div>

                    {/* Social Icons (Optional but fits visual) */}
                    <div className="flex gap-4">
                        <a href="/" className="p-3 bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-blue-600 hover:text-white transition-all text-slate-600 dark:text-slate-300">
                            <Globe size={20} />
                        </a>
                        <a href="#" className="p-3 bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-blue-600 hover:text-white transition-all text-slate-600 dark:text-slate-300">
                            <Youtube size={20} />
                        </a>
                    </div>

                    <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">
                        © 2024 RK FOX - Todos os direitos reservados
                    </p>
                </div>
            </footer>
        </div>
    );
};