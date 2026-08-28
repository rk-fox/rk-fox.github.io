import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    Calculator,
    Wallet,
    TrendingUp,
    Search,
    ExternalLink,
    Zap,
    LayoutList,
    Calendar,
    Trophy,
    ArrowRight,
    ArrowLeftRight,
    Paintbrush,
    Music,
    FileImage,
    Flame,
    Grid,
    Youtube,
    Send,
    CreditCard,
    Video,
    Wrench,
    Gift,
    Combine,
    Gamepad2,
    Bitcoin,
    LayoutGrid,
    Sparkles
} from 'lucide-react';

export const Hub: React.FC = () => {
    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        const script_google = 'https://script.google.com/macros/s/AKfycbyiwGM4G3QVt0DQTPCKvpR0QglskRcnxCDmS_CfC4Ho-A5pUAvP5eAa0ehw27B-BMDM/exec';

        const updateCounterA2 = () => {
            fetch(script_google, {
                method: 'POST',
                mode: 'no-cors'
            }).catch(e => console.error("Error updating counter:", e));
        };

        updateCounterA2();
    }, []);

    return (
        <div className="space-y-10 font-sans">

            {/* SECTION: SOCIAL MEDIA */}
            <div className="space-y-4">
                <h3 className="font-display font-black text-slate-800 dark:text-white uppercase flex items-center gap-2 text-lg">
                    <Zap className="text-blue-500 fill-blue-500" size={20} /> Mídias Sociais
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a href="https://www.youtube.com/@RKFox" target="_blank" className="flex items-center gap-4 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-xl shadow-sm transition-all hover:-translate-y-0.5 group">
                        <div className="p-2 bg-white/20 rounded-full group-hover:scale-110 transition-transform">
                            <Youtube size={24} fill="red" strokeWidth={1.5} />
                        </div>
                        <span className="font-bold text-lg">YouTube</span>
                    </a>
                    <a href="https://t.me/+alVozn_qNRAxZmNh" target="_blank" className="flex items-center gap-4 bg-sky-500 hover:bg-sky-600 text-white p-4 rounded-xl shadow-sm transition-all hover:-translate-y-0.5 group">
                        <div className="p-2 bg-white/20 rounded-full group-hover:scale-110 transition-transform">
                            <Send size={24} fill="blue" strokeWidth={1.5} />
                        </div>
                        <span className="font-bold text-lg">Telegram</span>
                    </a>
                </div>
            </div>

            {/* SECTION: UTILITIES */}
            <div className="space-y-6">
                <h3 className="font-display font-black text-slate-800 dark:text-white uppercase flex items-center gap-2 text-lg">
                    <Wrench className="text-blue-500" size={20} /> Utilidades RollerCoin
                </h3>

                {/* Main Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Card: Room Organizer (New - Emerald) */}
                    <Link to="/organizer">
                        <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-sm border-2 border-emerald-500/40 dark:border-emerald-500/30 flex flex-col h-full relative hover:shadow-md hover:-translate-y-0.5 transition-all">
                            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mb-4 text-emerald-600 dark:text-emerald-400">
                                <Sparkles size={20} />
                            </div>
                            <h4 className="font-display font-bold text-lg text-slate-800 dark:text-white mb-2">Organizador de Sala</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 flex-grow leading-relaxed">
                                Importe seu inventário, organize suas salas, simule trocas e veja o Poder Real e bônus atualizados em tempo real!
                            </p>
                            <button className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-lg text-center transition-colors flex items-center justify-center gap-2">
                                Acessar <Grid size={14} />
                            </button>
                        </div>
                    </Link>

                    {/* Card 1: Efficiency (Red) */}
                    <Link to="/efficiency">
                        <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col h-full hover:shadow-md hover:-translate-y-0.5 transition-all">
                            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center mb-4 text-slate-600 dark:text-slate-300">
                                <Zap size={20} />
                            </div>
                            <h4 className="font-display font-bold text-lg text-slate-800 dark:text-white mb-2">Calculadora de Eficiência</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 flex-grow leading-relaxed">
                                Otimize seus ganhos analisando a eficiência energética e retorno de seus mineradores.
                            </p>
                            <button className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-lg text-center transition-colors flex items-center justify-center gap-2">
                                Acessar <ExternalLink size={14} />
                            </button>
                        </div>
                    </Link>

                    {/* Card 2: Room Planner (Orange) */}
                    <Link to="/whale">
                        <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-sm border-2 border-orange-400/50 dark:border-orange-500/30 flex flex-col h-full relative hover:shadow-md hover:-translate-y-0.5 transition-all">
                            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4 text-orange-600">
                                <LayoutGrid size={20} />
                            </div>
                            <h4 className="font-display font-bold text-lg text-slate-800 dark:text-white mb-2">Planejador de Salas</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 flex-grow leading-relaxed">
                                Organize seus racks e maximize o bônus de sua sala de mineração estrategicamente.
                            </p>
                            <button className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-lg text-center transition-colors flex items-center justify-center gap-2">
                                Acessar <Grid size={14} />
                            </button>
                        </div>
                    </Link>

                    {/* Card 3: Burn Planner (Blue) */}
                    <Link to="/burn">
                        <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col h-full hover:shadow-md hover:-translate-y-0.5 transition-all">
                            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center mb-4 text-slate-600 dark:text-slate-300">
                                <Flame size={20} />
                            </div>
                            <h4 className="font-display font-bold text-lg text-slate-800 dark:text-white mb-2">Planejador de Queima</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 flex-grow leading-relaxed">
                                Calcule o melhor momento e valor para queimar seus itens por recompensas.
                            </p>
                            <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-lg text-center transition-colors flex items-center justify-center gap-2">
                                Acessar <ExternalLink size={14} />
                            </button>
                        </div>
                    </Link>
                </div>

                {/* Sub Menu Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <Link to="/ranking" className="bg-white dark:bg-dark-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center gap-2 hover:border-blue-500 transition-colors group">
                        <Trophy size={20} className="text-blue-600 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-bold uppercase text-slate-600 dark:text-slate-300">Ranking</span>
                    </Link>
                    <Link to="/farm" className="bg-white dark:bg-dark-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center gap-2 hover:border-blue-500 transition-colors group">
                        <Calculator size={20} className="text-blue-600 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-bold uppercase text-slate-600 dark:text-slate-300">Calc Farm</span>
                    </Link>
                    <Link to="https://minaryganar.com/rollercoin/" target="_blank" rel="noreferrer" className="bg-white dark:bg-dark-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center gap-2 hover:border-blue-500 transition-colors group">
                        <Gift size={20} className="text-blue-600 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-bold uppercase text-slate-600 dark:text-slate-300">Recompensas</span>
                    </Link>
                    <Link to="https://minaryganar.com/rollercoin/miners/cathouse-miner/" target="_blank" rel="noreferrer" className="bg-white dark:bg-dark-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center gap-2 hover:border-blue-500 transition-colors group">
                        <Combine size={20} className="text-blue-600 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-bold uppercase text-slate-600 dark:text-slate-300">Fusões</span>
                    </Link>
                    <Link to="https://rollercoin.com/?r=kyluudij" target="_blank" rel="noreferrer" className="bg-white dark:bg-dark-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center gap-2 hover:border-blue-500 transition-colors group">
                        <Gamepad2 size={20} className="text-blue-600 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-bold uppercase text-slate-600 dark:text-slate-300">RollerCoin</span>
                    </Link>
                </div>
            </div>

            {/* SECTION: SPLIT TASKS & CRYPTO */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Task Timewall */}
                <div className="space-y-4">
                    <h3 className="font-display font-black text-slate-800 dark:text-white uppercase flex items-center gap-2 text-lg">
                        <CreditCard className="text-blue-500" size={20} /> Task Timewall
                    </h3>
                    <div className="space-y-3">
                        <Link to="https://youtu.be/TpdYh4UKzhE" target="_blank" rel="noreferrer">
                            <div className="bg-white dark:bg-dark-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between group hover:border-red-500 transition-colors cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <Youtube size={20} className="text-red-600" />
                                    <span className="font-bold text-sm text-slate-700 dark:text-white">Vídeo Tutorial</span>
                                </div>
                                <ExternalLink size={16} className="text-slate-400 group-hover:text-red-500" />
                            </div>
                        </Link>
                    </div>
                    <div className="space-y-3">
                        <Link to="https://mpago.li/2u71oNR" target="_blank" rel="noreferrer">
                            <div className="bg-white dark:bg-dark-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between group hover:border-green-500 transition-colors cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <CreditCard size={20} className="text-green-600" />
                                    <span className="font-bold text-sm text-slate-700 dark:text-white">Cartão Grátis + R$20 Bônus</span>
                                </div>
                                <Gift size={16} className="text-slate-400 group-hover:text-green-500" />
                            </div>
                        </Link>
                    </div>
                </div>


                {/* Cripto & Exchanges */}
                <div className="space-y-4">
                    <h3 className="font-display font-black text-slate-800 dark:text-white uppercase flex items-center gap-2 text-lg">
                        <Bitcoin className="text-blue-500" size={20} /> Cripto & Exchanges
                    </h3>
                    <div className="space-y-3">
                        <a href="https://sideshift.ai/a/RKFox" target="_blank" rel="noreferrer" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-between transition-colors shadow-sm">
                            <span>SideShift</span>
                            <ArrowLeftRight size={18} />
                        </a>
                        <a href="https://ff.io/?ref=rkfox" target="_blank" rel="noreferrer" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-between transition-colors shadow-sm">
                            <span>Fixed Float</span>
                            <Zap size={18} fill="currentColor" />
                        </a>
                        <a href="https://quantfury.com/portuge/" target="_blank" rel="noreferrer" className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 px-4 rounded-xl flex flex-col items-center justify-center transition-colors shadow-sm border border-slate-700">
                            <span className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Quantfury Ref</span>
                            <span className="text-yellow-500 text-lg tracking-wider">FN8G3J54</span>
                        </a>
                    </div>
                </div>

            </div>

            {/* Promo Banner */}
            <div className="bg-blue-600 rounded-xl p-6 md:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-blue-500/20">
                <div className="text-center md:text-left">
                    <h3 className="font-display font-black text-2xl md:text-3xl mb-2">Precisa de arte, mídia ou música?</h3>
                    <p className="text-blue-100 font-medium">Serviços profissionais para criadores e marcas.</p>
                </div>
                <a href="https://linktr.ee/GUERDEART" target="_blank" rel="noreferrer" className="w-full sm:w-auto text-center bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors shadow-sm sm:whitespace-nowrap">
                    Portfólio e Contato GUERDE
                </a>
            </div>

        </div >
    );
};