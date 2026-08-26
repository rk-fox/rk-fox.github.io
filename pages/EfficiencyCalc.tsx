import React, { useState, useEffect, useRef } from 'react';
import { Calculator, Search, TrendingUp, TrendingDown, Info, DollarSign, Zap } from 'lucide-react';

export const EfficiencyCalc: React.FC = () => {
    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        const script_google = 'https://script.google.com/macros/s/AKfycbzczni1hzu4ZbwOgeOF6OxRDECu05uimOEbsrobN0LKw711L8TuX2q7PhXKpzgDmgRn/exec';

        const updateCounterC2 = () => {
            fetch(script_google, {
                method: 'POST',
                mode: 'no-cors'
            }).catch(e => console.error("Error updating counter:", e));
        };

        updateCounterC2();
    }, []);

    const [userLink, setUserLink] = useState('');
    const [loading, setLoading] = useState(false);

    // Initial Stats
    const [initialStats, setInitialStats] = useState({
        miners: 0,
        bonusPercent: 0,
        totalPower: 0
    });

    // Inputs
    const [inputs, setInputs] = useState({
        sellPower: 0,
        sellBonus: 0,
        buyPower: 0,
        buyBonus: 0,
        custoRLT: 0
    });

    // Results
    const [results, setResults] = useState({
        newPower: 0,
        finalPowerChange: 0,
        effMiner: 0,
        effPower: 0,
        conclusao: ''
    });

    const proxy = "https://summer-night-03c0.rk-foxx-159.workers.dev/?";

    const convertPower = (value: number) => {
        const absValue = Math.abs(value);
        if (absValue >= 1e12) return (value / 1e12).toFixed(3).replace('.', ',') + ' ZH/s';
        if (absValue >= 1e9) return (value / 1e9).toFixed(3).replace('.', ',') + ' EH/s';
        if (absValue >= 1e6) return (value / 1e6).toFixed(3).replace('.', ',') + ' PH/s';
        if (absValue >= 1e3) return (value / 1e3).toFixed(3).replace('.', ',') + ' TH/s';
        return value.toFixed(3).replace('.', ',') + ' GH/s';
    };

    const handleFetchProfile = async () => {
        if (!userLink) return;
        setLoading(true);
        try {
            const profileRes = await fetch(`${proxy}https://rollercoin.com/api/profile/public-user-profile-data/${userLink}`);
            const profileData = await profileRes.json();
            const avatarId = profileData?.data?.avatar_id;

            if (!avatarId) throw new Error("Invalid User");

            const powerRes = await fetch(`${proxy}https://rollercoin.com/api/profile/user-power-data/${avatarId}`);
            const powerData = await powerRes.json();
            const data = powerData.data;

            const miners = data.miners;
            const bonusPercent = data.bonus_percent / 10000;
            const totalPower = miners * (1 + bonusPercent);

            setInitialStats({
                miners,
                bonusPercent,
                totalPower
            });
        } catch (e) {
            console.error(e);
            alert("Erro ao buscar dados do perfil.");
        } finally {
            setLoading(false);
        }
    };

    const handleCalculate = () => {
        const { sellPower, sellBonus, buyPower, buyBonus, custoRLT } = inputs;

        // Internal units are GH/s for power and decimal for bonus
        const sP = sellPower * 1000000; // PH/s to GH/s
        const sB = sellBonus / 100;
        const bP = buyPower * 1000000; // PH/s to GH/s
        const bB = buyBonus / 100;

        const currentMiners = initialStats.miners - sP + bP;
        const currentBonusPercent = initialStats.bonusPercent - sB + bB;

        const newTotalPower = currentMiners * (1 + currentBonusPercent);
        const finalPowerChange = newTotalPower - initialStats.totalPower;

        const effMiner = bP > 0 ? custoRLT / ((bP * (1 + bB)) / 1000000) : 0;
        const effPower = finalPowerChange > 0 ? custoRLT / (finalPowerChange / 1000000000) : 0;

        let conclusao = '';
        if (effPower > 0) {
            if (effPower <= 2.10) conclusao = 'EXCELENTE';
            else conclusao = 'CARO';
        }

        setResults({
            newPower: newTotalPower,
            finalPowerChange,
            effMiner,
            effPower,
            conclusao
        });
    };

    return (
        <div className="space-y-8 animate-fade-in max-w-6xl mx-auto px-4 pb-20">
            <div className="text-center mb-12">
                <h2 className="font-display text-4xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">Calculadora de Eficiência</h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">Analise se vale a pena trocar seus mineradores com base no custo por PH/s</p>
            </div>

            {/* Profile Section */}
            <div className="bg-white dark:bg-dark-800 p-6 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700">
                <div className="flex flex-col md:flex-row gap-6 items-end">
                    <div className="flex-grow">
                        <label className="block text-xs font-black uppercase text-slate-500 mb-2 px-1">Seu Perfil</label>
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                value={userLink}
                                onChange={(e) => setUserLink(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                                placeholder="Link do Perfil (apenas a parte após o /p/)"
                            />
                        </div>
                    </div>
                    <button
                        onClick={handleFetchProfile}
                        disabled={loading}
                        className="w-full md:w-auto px-10 py-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-emerald-500/20"
                    >
                        {loading ? 'BUSCANDO...' : 'CARREGAR DADOS'}
                    </button>
                </div>

                {initialStats.miners > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-100 dark:border-slate-700">
                        <div className="text-center">
                            <p className="text-xs font-black text-slate-400 uppercase">Poder Base</p>
                            <p className="text-lg font-black dark:text-white">{convertPower(initialStats.miners)}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs font-black text-slate-400 uppercase">Bônus Atual</p>
                            <p className="text-lg font-black text-blue-500">{(initialStats.bonusPercent * 100).toFixed(2)}%</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs font-black text-slate-400 uppercase">Poder do Bônus</p>
                            <p className="text-lg font-black dark:text-white">{convertPower(initialStats.miners * initialStats.bonusPercent)}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs font-black text-slate-400 uppercase">Poder Total</p>
                            <p className="text-lg font-black text-emerald-600">{convertPower(initialStats.totalPower)}</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Simulation Inputs */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-dark-800 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700">
                        <h3 className="text-lg font-black uppercase text-slate-800 dark:text-white mb-8 flex items-center gap-2">
                            <Calculator size={18} className="text-emerald-500" /> Simular Troca
                        </h3>

                        <div className="space-y-8">
                            {/* Sell Section */}
                            <div className="space-y-4">
                                <p className="text-sm font-black text-red-500 uppercase flex items-center gap-2">
                                    <TrendingDown size={14} /> O que você vai PERDER (Venda)
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Poder (PH/s)</label>
                                        <input
                                            type="number"
                                            value={inputs.sellPower}
                                            onChange={(e) => setInputs({ ...inputs, sellPower: Number(e.target.value) })}
                                            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-center"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Bônus (%)</label>
                                        <input
                                            type="number"
                                            value={inputs.sellBonus}
                                            onChange={(e) => setInputs({ ...inputs, sellBonus: Number(e.target.value) })}
                                            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-center"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Buy Section */}
                            <div className="space-y-4">
                                <p className="text-sm font-black text-emerald-500 uppercase flex items-center gap-2">
                                    <TrendingUp size={14} /> O que você vai GANHAR (Compra)
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Poder (PH/s)</label>
                                        <input
                                            type="number"
                                            value={inputs.buyPower}
                                            onChange={(e) => setInputs({ ...inputs, buyPower: Number(e.target.value) })}
                                            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-center"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Bônus (%)</label>
                                        <input
                                            type="number"
                                            value={inputs.buyBonus}
                                            onChange={(e) => setInputs({ ...inputs, buyBonus: Number(e.target.value) })}
                                            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-center"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Cost Section */}
                            <div className="pt-4">
                                <label className="block text-sm font-black uppercase text-slate-500 mb-2">Custo Líquido da Operação (RLT)</label>
                                <div className="relative">
                                    <DollarSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="number"
                                        value={inputs.custoRLT}
                                        onChange={(e) => setInputs({ ...inputs, custoRLT: Number(e.target.value) })}
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-black text-xl outline-none"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleCalculate}
                                className="w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-widest rounded-2xl shadow-xl transition-all active:scale-[0.98]"
                            >
                                Calcular Eficiência
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Card */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-dark-800 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 h-full flex flex-col">
                        <h3 className="text-sm font-black uppercase text-slate-800 dark:text-white mb-8">Resultado da Operação</h3>

                        <div className="flex-grow space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700">
                                    <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Variação de Poder</p>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-xl font-black ${results.finalPowerChange >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                            {results.finalPowerChange >= 0 ? '▲' : '▼'} {convertPower(results.finalPowerChange)}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700">
                                    <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Novo Poder Total</p>
                                    <p className="text-xl font-black dark:text-white">{convertPower(results.newPower)}</p>
                                </div>
                            </div>

                            <div className="p-8 bg-slate-900 dark:bg-black rounded-3xl text-white">
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <p className="text-[10px] font-black opacity-40 uppercase">Eficiência Real</p>
                                        <p className="text-4xl font-black text-emerald-400">{results.effPower.toFixed(2)}</p>
                                        <p className="text-[10px] font-bold opacity-60">RLT por cada 1 EH/s de ganho</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black opacity-40 uppercase">Status</p>
                                        <p className={`text-xl font-black ${results.conclusao === 'EXCELENTE' ? 'text-emerald-400' : 'text-red-400'}`}>
                                            {results.conclusao || '---'}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-6 border-t border-white/10">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold opacity-60">Eficiência Bruta (Miner)</span>
                                        <span className="text-sm font-black">{results.effMiner.toFixed(2)} RLT/PH</span>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-xl flex items-start gap-3">
                                        <Info size={16} className="text-blue-400 mt-0.5" />
                                        <p className="text-[10px] opacity-70 leading-relaxed">
                                            A eficiência real considera o impacto do poder e do bônus da miner no poder total da conta. A eficiência bruta considera apenas o poder e bônus da miner isoladamente, sem considerar o impacto na conta.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <div className="flex items-center gap-2 mb-2">
                                <Zap size={14} className="text-orange-500" />
                                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Métrica de Mercado</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-1000 ${results.effPower <= 1.20 ? 'bg-emerald-500' : 'bg-red-500'}`}
                                    style={{ width: `${Math.min(100, Math.max(0, (1 - results.effPower / 3.0) * 100))}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};