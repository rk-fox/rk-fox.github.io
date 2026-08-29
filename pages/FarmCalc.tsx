import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Calculator, User, Award, Wallet, TrendingUp, Info, RefreshCw, Zap } from 'lucide-react';

interface CryptoPrice {
    usd: number;
    brl: number;
}

interface RawFarmItem {
    moeda: string;
    token: string;
    durationSec: number;
    blockReward: number;
    totalPower: number;
    minimo: number;
    price?: CryptoPrice;
}

interface FarmRow {
    token: string;
    time: string;
    reward: string;
    block: string;
    day: string;
    month: string;
    withdraw: string;
    isFiat: boolean;
    usdBlock?: string;
    usdDay?: string;
    usdMonth?: string;
    fiatBlock?: string;
    fiatDay?: string;
    fiatMonth?: string;
    rawUsdDay?: number;
    rawWithdrawDays?: number;
}

export const FarmCalc: React.FC = () => {
    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        const script_google = 'https://script.google.com/macros/s/AKfycbxXE-hJGU4J2b76mButw9dQggLONaWXanf8yMB9Iy2yHyAJwLlGwoZOwwsIiRhNpFYQ/exec';

        const updateCounterH2 = () => {
            fetch(script_google, {
                method: 'POST',
                mode: 'no-cors'
            }).catch(e => console.error("Error updating counter:", e));
        };

        updateCounterH2();
    }, []);

    const [loading, setLoading] = useState(false);
    const [profileLink, setProfileLink] = useState('');
    const [profileData, setProfileData] = useState<any>(null);
    const [rawFarmItems, setRawFarmItems] = useState<RawFarmItem[]>([]);
    const [force10Min, setForce10Min] = useState<boolean>(false);

    const [userPower, setUserPower] = useState<number>(0);

    const proxy = "https://summer-night-03c0.rk-foxx-159.workers.dev/?";
    const coinGeckoIds: any = { BTC: 'bitcoin', LTC: 'litecoin', BNB: 'binancecoin', POL: 'polygon-ecosystem-token', XRP: 'ripple', DOGE: 'dogecoin', ETH: 'ethereum', TRX: 'tron', SOL: 'solana', ALGO: 'algorand' };
    const divisoresMoedas: any = { RLT: 1e6, RST: 1e6, HMT: 1e6, BTC: 1e10, LTC: 1e8, BNB: 1e10, POL: 1e10, XRP: 1e6, DOGE: 1e4, ETH: 1e10, TRX: 1e10, SOL: 1e9, ALGO: 1e6 };

    const moedasb1 = { RLT: "RLT", RST: "RST", BTC: "SAT", LTC: "LTC_SMALL" };
    const moedasb2 = { ...moedasb1, BNB: "BNB_SMALL" };
    const moedasb3 = { ...moedasb2, POL: "MATIC_SMALL" };
    const moedasp1 = { ...moedasb3, XRP: "XRP_SMALL" };
    const moedasp2 = { ...moedasp1, DOGE: "DOGE_SMALL" };
    const moedasp3 = { ...moedasp2, ETH: "ETH_SMALL" };
    const moedaso1 = { ...moedasp3, TRX: "TRX_SMALL" };
    const moedaso2 = { ...moedaso1, SOL: "SOL_SMALL", HMT: "HMT" };
    const moedaspl1 = { ...moedaso2, ALGO: "ALGO_SMALL" };
    const moedasd = { RST: "RST", BTC: "SAT", LTC: "LTC_SMALL", BNB: "BNB_SMALL", POL: "MATIC_SMALL", XRP: "XRP_SMALL", DOGE: "DOGE_SMALL", ETH: "ETH_SMALL", TRX: "TRX_SMALL", SOL: "SOL_SMALL", ALGO: "ALGO_SMALL" };

    const ligaMoedasMap: any = { "68af01ce48490927df92d687": moedasb1, "68af01ce48490927df92d686": moedasb2, "68af01ce48490927df92d685": moedasb3, "68af01ce48490927df92d684": moedasp1, "68af01ce48490927df92d683": moedasp2, "68af01ce48490927df92d682": moedasp3, "68af01ce48490927df92d681": moedaso1, "68af01ce48490927df92d680": moedaso2, "68af01ce48490927df92d67f": moedaso2, "68af01ce48490927df92d67e": moedaspl1, "68af01ce48490927df92d67d": moedaspl1, "68af01ce48490927df92d67c": moedaspl1, "68af01ce48490927df92d67b": moedasd, "68af01ce48490927df92d67a": moedasd, "68af01ce48490927df92d679": moedasd };

    const formatPower = (value: number) => {
        if (value >= 1e9) return (value / 1e9).toFixed(3).replace('.', ',') + ' EH/s';
        if (value >= 1e6) return (value / 1e6).toFixed(3).replace('.', ',') + ' PH/s';
        if (value >= 1e3) return (value / 1e3).toFixed(3).replace('.', ',') + ' TH/s';
        return value.toFixed(3).replace('.', ',') + ' GH/s';
    };

    const truncateNumber = (num: number, places: number) => {
        const factor = Math.pow(10, places);
        return Math.trunc(num * factor) / factor;
    };

    const handleCalculate = async () => {
        if (!profileLink) return;
        setLoading(true);

        try {
            // 1. Profile & League
            const profileRes = await fetch(`${proxy}https://rollercoin.com/api/profile/public-user-profile-data/${profileLink}`);
            if (!profileRes.ok) throw new Error(`Erro Perfil API: ${profileRes.status}`);
            const pData = (await profileRes.json()).data;
            setProfileData(pData);

            const leagueId = pData.league_id;
            const avatarId = pData.avatar_id;

            // 2. User Power
            const powerRes = await fetch(`${proxy}https://rollercoin.com/api/profile/user-power-data/${avatarId}`);
            if (!powerRes.ok) throw new Error(`Erro Poder API: ${powerRes.status}`);
            const powerData = (await powerRes.json()).data;
            const currentPower = powerData.current_power;
            setUserPower(currentPower);
            const userPowerVal = currentPower;

            // 3. Prices (com cache de 5 minutos e Fallbacks de APIs)
            let cryptoPrices: any = {};
            const cachedPricesStr = localStorage.getItem('cryptoPricesCache');
            let fetchNewPrices = true;

            if (cachedPricesStr) {
                const cachedData = JSON.parse(cachedPricesStr);
                const isExpired = Date.now() - cachedData.timestamp > 5 * 60 * 1000; // 5 minutos
                if (!isExpired) {
                    cryptoPrices = cachedData.prices;
                    fetchNewPrices = false;
                }
            }

            if (fetchNewPrices) {
                let success = false;
                
                // Camada 1: CoinGecko
                if (!success) {
                    try {
                        const ids = Object.values(coinGeckoIds).join(',');
                        const priceRes = await fetch(`${proxy}https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd,brl`);
                        if (!priceRes.ok) throw new Error(`CoinGecko HTTP: ${priceRes.status}`);
                        const prices = await priceRes.json();
                        for (const [symbol, id] of Object.entries(coinGeckoIds)) {
                            if (prices[id as string]) cryptoPrices[symbol] = prices[id as string];
                        }
                        success = Object.keys(cryptoPrices).length > 0;
                    } catch (e) { console.warn("Fallback: CoinGecko falhou", e); }
                }

                // Camada 2: CryptoCompare
                if (!success) {
                    try {
                        const symbols = Object.keys(coinGeckoIds).map(s => s === 'POL' ? 'POL,MATIC' : s).join(',');
                        const res = await fetch(`${proxy}https://min-api.cryptocompare.com/data/pricemulti?fsyms=${symbols}&tsyms=USD,BRL`);
                        if (!res.ok) throw new Error(`CryptoCompare HTTP: ${res.status}`);
                        const data = await res.json();
                        if (data.Response === 'Error') throw new Error(data.Message);
                        for (const symbol of Object.keys(coinGeckoIds)) {
                            let s = symbol === 'POL' && !data['POL'] && data['MATIC'] ? 'MATIC' : symbol;
                            if (data[s]) cryptoPrices[symbol] = { usd: data[s].USD, brl: data[s].BRL };
                        }
                        success = Object.keys(cryptoPrices).length > 0;
                    } catch (e) { console.warn("Fallback: CryptoCompare falhou", e); }
                }

                // Camada 3: Binance
                if (!success) {
                    try {
                        const res = await fetch(`${proxy}https://api.binance.com/api/v3/ticker/price`);
                        if (!res.ok) throw new Error(`Binance HTTP: ${res.status}`);
                        const data = await res.json();
                        const pMap: any = {};
                        for (const item of data) pMap[item.symbol] = parseFloat(item.price);
                        
                        const usdToBrl = (pMap['BTCUSDT'] && pMap['BTCBRL']) ? (pMap['BTCBRL'] / pMap['BTCUSDT']) : 5.0;
                        for (const symbol of Object.keys(coinGeckoIds)) {
                            let t = symbol + 'USDT';
                            if (symbol === 'POL' && !pMap[t]) t = 'MATICUSDT';
                            if (pMap[t]) cryptoPrices[symbol] = { usd: pMap[t], brl: pMap[t] * usdToBrl };
                        }
                        success = Object.keys(cryptoPrices).length > 0;
                    } catch (e) { console.warn("Fallback: Binance falhou", e); }
                }

                // Salvar no cache se alguma camada funcionou
                if (success) {
                    localStorage.setItem('cryptoPricesCache', JSON.stringify({
                        timestamp: Date.now(),
                        prices: cryptoPrices
                    }));
                } else {
                    console.warn("Falha em todas as APIs de cotação. Usando cache antigo se existir.");
                    if (cachedPricesStr) cryptoPrices = JSON.parse(cachedPricesStr).prices;
                }
            }

            // 4. Min Withdrawal
            const minRes = await fetch(`${proxy}https://rollercoin.com/api/wallet/get-currencies-config`);
            if (!minRes.ok) throw new Error(`Erro Currencies API: ${minRes.status}`);
            const minJson = await minRes.json();
            const minimos: any = {};
            minJson.data.currencies_config.forEach((c: any) => {
                minimos[c.balance_key] = c.min;
            });

            // 5. Network Data & Loop
            const moedas = ligaMoedasMap[leagueId] || moedasd;
            const today = new Date().toISOString().slice(0, 10);
            const rawItems: RawFarmItem[] = [];

            const promises = Object.entries(moedas).map(async ([moeda, token]) => {
                const results: any = {};
                const apiGroups = ['duration', 'block_reward', 'total_power'];

                await Promise.all(apiGroups.map(async (group) => {
                    const url = `${proxy}https://rollercoin.com/api/league/network-info-by-day?from=${today}&to=${today}&currency=${token}&groupBy=${group}&leagueId=${leagueId}`;
                    const res = await fetch(url);
                    if (!res.ok) throw new Error(`Erro Network Info API: ${res.status}`);
                    const json = await res.json();
                    let val = json.data?.[0]?.value || 0;

                    if (group === 'block_reward') val = val / (divisoresMoedas[moeda] || 1);
                    results[group] = val;
                }));

                rawItems.push({
                    moeda,
                    token: token as string,
                    durationSec: results.duration || 600,
                    blockReward: results.block_reward || 0,
                    totalPower: results.total_power || 0,
                    minimo: minimos[token as string] || 0,
                    price: cryptoPrices[moeda],
                });
            });

            await Promise.all(promises);
            setRawFarmItems(rawItems);

        } catch (e) {
            console.error(e);
            alert("Erro ao calcular farm. Verifique o link e tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    // Construção Reativa das Linhas de Farm (permite alternar Forçar 10 min instantaneamente)
    const farmRows = useMemo<FarmRow[]>(() => {
        if (rawFarmItems.length === 0 || userPower <= 0) return [];

        return rawFarmItems.map(item => {
            const tempoSec = force10Min ? 600 : item.durationSec;
            const bloco = item.blockReward;
            const poderRede = item.totalPower;
            const minimo = item.minimo;
            const userPowerVal = userPower;

            const fblk = (userPowerVal / (poderRede + userPowerVal)) * bloco;
            const fdia = tempoSec > 0 ? (86400 / tempoSec) * fblk : 0;
            const fmes = fdia * 30;

            let withdraw = "X";
            let rawWithdrawDays = Infinity;
            if (!["RLT", "RST", "HMT", "ALGO"].includes(item.moeda)) {
                if (minimo > 0 && fblk > 0 && tempoSec > 0) {
                    const dias = ((minimo / fblk) * (tempoSec / 60)) / 1440;
                    withdraw = `${dias.toFixed(2).replace('.', ',')} dias`;
                    rawWithdrawDays = dias;
                } else {
                    withdraw = "-";
                }
            }

            const pricesForMoeda = item.price;
            const rawUsdDay = pricesForMoeda ? (fdia * pricesForMoeda.usd) : 0;

            return {
                token: item.moeda,
                time: `${(tempoSec / 60).toFixed(2)} min`,
                reward: bloco.toFixed(8),
                block: fblk.toFixed(10),
                day: fdia.toFixed(8),
                month: fmes.toFixed(8),
                withdraw,
                isFiat: !!pricesForMoeda,
                usdBlock: pricesForMoeda ? (fblk * pricesForMoeda.usd).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : undefined,
                usdDay: pricesForMoeda ? (fdia * pricesForMoeda.usd).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : undefined,
                usdMonth: pricesForMoeda ? (fmes * pricesForMoeda.usd).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : undefined,
                fiatBlock: pricesForMoeda ? (fblk * pricesForMoeda.brl).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : undefined,
                fiatDay: pricesForMoeda ? (fdia * pricesForMoeda.brl).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : undefined,
                fiatMonth: pricesForMoeda ? (fmes * pricesForMoeda.brl).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : undefined,
                rawUsdDay,
                rawWithdrawDays,
            };
        }).sort((a, b) => a.token.localeCompare(b.token));
    }, [rawFarmItems, force10Min, userPower]);

    // Formatação Condicional: Maior ganho em USD por dia (geral e com saque) e menor tempo para saque
    const { maxUsdDay, maxWithdrawableUsdDay } = useMemo(() => {
        let maxOverall = 0;
        let maxWithdrawable = 0;
        let topTokenHasNoWithdraw = false;

        farmRows.forEach(r => {
            const usd = r.rawUsdDay || 0;
            if (usd > maxOverall) {
                maxOverall = usd;
                topTokenHasNoWithdraw = r.withdraw === 'X';
            }
            if (r.withdraw !== 'X' && usd > maxWithdrawable) {
                maxWithdrawable = usd;
            }
        });

        return {
            maxUsdDay: maxOverall,
            maxWithdrawableUsdDay: topTokenHasNoWithdraw ? maxWithdrawable : 0,
        };
    }, [farmRows]);

    const minWithdrawDays = useMemo(() => {
        const values = farmRows.map(r => r.rawWithdrawDays || Infinity).filter(v => v > 0 && isFinite(v));
        return values.length > 0 ? Math.min(...values) : Infinity;
    }, [farmRows]);

    return (
        <div className="space-y-8 animate-fade-in max-w-7xl mx-auto px-4 pb-20">
            <div className="text-center mb-12">
                <h2 className="font-display text-4xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">Calculadora de Farm</h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">Estime seus rendimentos reais com base no seu poder e na rede RollerCoin</p>
            </div>

            {/* Input Section */}
            <div className="bg-white dark:bg-dark-800 p-6 md:p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700">
                <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-grow w-full">
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2 px-1 text-left">Link do Perfil RollerCoin</label>
                        <input
                            type="text"
                            value={profileLink}
                            onChange={(e) => setProfileLink(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                            className="w-full px-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white font-bold"
                            placeholder="https://rollercoin.com/p/..."
                        />
                    </div>
                    <button
                        onClick={handleCalculate}
                        disabled={loading || !profileLink}
                        className="w-full md:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 h-[58px]"
                    >
                        {loading ? <RefreshCw size={20} className="animate-spin" /> : <><Calculator size={20} /> CALCULAR</>}
                    </button>
                </div>
            </div>

            {profileData && (
                <div className="space-y-8">
                    {/* User Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white dark:bg-dark-800 p-6 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 flex items-center gap-4">
                            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl overflow-hidden border border-blue-100 dark:border-blue-800">
                                <img src={`https://avatars.rollercoin.com/static/avatars/thumbnails/50/${profileData.avatar_id}.png`} className="w-full h-full object-cover" alt="" />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 uppercase font-black">Jogador</p>
                                <p className="font-display font-black text-xl dark:text-white uppercase leading-tight">{profileData.name}</p>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-dark-800 p-6 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 flex items-center gap-4">
                            <div className="p-4 bg-purple-50 dark:bg-purple-900/30 text-purple-600 rounded-2xl">
                                <Award size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 uppercase font-black">Liga Atual</p>
                                <p className="font-display font-black text-xl dark:text-white uppercase leading-tight">{profileData.league.title.en}</p>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-dark-800 p-6 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 flex items-center gap-4">
                            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 rounded-2xl">
                                <Zap size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 uppercase font-black">Poder Total</p>
                                <p className="font-display font-black text-xl dark:text-white uppercase leading-tight">{formatPower(userPower)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Results Table */}
                    <div className="bg-white dark:bg-dark-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                        <div className="bg-blue-600 px-6 md:px-8 py-4 flex items-center justify-between gap-4">
                            <h3 className="text-white font-black uppercase tracking-widest text-sm flex items-center gap-2">
                                <Wallet size={18} className="text-blue-200" /> Rendimentos Estimados
                            </h3>
                            
                            <div className="flex items-center gap-3">
                                {/* Toggle Button de Alto Contraste e Posição Fixa */}
                                <button
                                    type="button"
                                    onClick={() => setForce10Min(!force10Min)}
                                    className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all shadow-sm border ${
                                        force10Min
                                            ? 'bg-emerald-500 text-white border-emerald-400 shadow-emerald-950/20'
                                            : 'bg-white/15 hover:bg-white/25 text-white border-white/20'
                                    }`}
                                    title={force10Min ? 'Modo Ativo: Bloco fixado em 10:00 min. Clique para usar tempo real.' : 'Clique para fixar o tempo de bloco em 10:00 min.'}
                                >
                                    <div className={`w-7 h-4 rounded-full p-0.5 transition-colors flex items-center ${
                                        force10Min ? 'bg-white' : 'bg-black/40'
                                    }`}>
                                        <div className={`w-3 h-3 rounded-full transition-transform transform shadow-xs ${
                                            force10Min ? 'translate-x-3 bg-emerald-600' : 'translate-x-0 bg-white'
                                        }`} />
                                    </div>
                                    <span className="whitespace-nowrap">Forçar Bloco em 10 min</span>
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto custom-scrollbar">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                                        <th className="px-8 py-4 border-r border-slate-100 dark:border-slate-800" rowSpan={2}>Token</th>
                                        <th className="hidden md:table-cell px-8 py-4 text-center border-r border-slate-100 dark:border-slate-800" rowSpan={2}>Tempo</th>
                                        <th className="hidden md:table-cell px-8 py-4 text-center border-r border-slate-100 dark:border-slate-800" rowSpan={2}>Bloco</th>
                                        <th className="hidden md:table-cell px-8 py-2 text-center border-b border-slate-100 dark:border-slate-800 bg-slate-100/30 dark:bg-slate-800/20" colSpan={3}>Seu Ganho</th>
                                        <th className="md:hidden px-8 py-2 text-center border-b border-slate-100 dark:border-slate-800 bg-slate-100/30 dark:bg-slate-800/20" colSpan={1}>Seu Ganho</th>
                                        <th className="px-8 py-4 text-center" rowSpan={2}>Saque em</th>
                                    </tr>
                                    <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                                        <th className="hidden md:table-cell px-8 py-2 text-center border-r border-slate-100 dark:border-slate-800 min-w-[140px]">Por Bloco</th>
                                        <th className="px-8 py-2 text-center border-r border-slate-100 dark:border-slate-800 min-w-[140px]">Por Dia</th>
                                        <th className="hidden md:table-cell px-8 py-2 text-center border-r border-slate-100 dark:border-slate-800 min-w-[140px]">Por Mês</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {farmRows.map((row, idx) => {
                                        const isOverallBestUsd = maxUsdDay > 0 && Math.abs((row.rawUsdDay || 0) - maxUsdDay) < 1e-9;
                                        const isWithdrawableBestUsd = maxWithdrawableUsdDay > 0 && Math.abs((row.rawUsdDay || 0) - maxWithdrawableUsdDay) < 1e-9 && row.withdraw !== 'X';
                                        const isBestDailyUsd = isOverallBestUsd || isWithdrawableBestUsd;
                                        const isBestWithdraw = minWithdrawDays < Infinity && Math.abs((row.rawWithdrawDays || Infinity) - minWithdrawDays) < 1e-6;

                                        return (
                                            <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                                <td className="px-8 py-5 font-black text-sm dark:text-white border-r border-slate-50 dark:border-slate-800/50">
                                                    <div className="flex items-center gap-2">
                                                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                                        {row.token}
                                                    </div>
                                                </td>

                                                <td className="hidden md:table-cell px-8 py-5 text-center font-bold text-slate-400 text-xs border-r border-slate-50 dark:border-slate-800/50">{row.time}</td>

                                                <td className="hidden md:table-cell px-8 py-5 text-center font-bold text-slate-500 dark:text-slate-400 text-xs border-r border-slate-50 dark:border-slate-800/50">{row.reward}</td>

                                                <td className="hidden md:table-cell px-8 py-5 text-center border-r border-slate-50 dark:border-slate-800/50">
                                                    <div className="font-mono font-black text-emerald-500 dark:text-emerald-400 text-sm tracking-tight">{row.block}</div>
                                                    {row.isFiat && (
                                                        <div className="mt-1 space-y-0.5">
                                                            <div className="text-[10px] font-bold text-slate-400">{row.usdBlock}</div>
                                                            <div className="text-[10px] font-bold text-slate-400">{row.fiatBlock}</div>
                                                        </div>
                                                    )}
                                                </td>

                                                {/* Ganho Por Dia - Destaque leve se for o maior valor em USD */}
                                                <td className={`px-8 py-5 text-center border-r border-slate-50 dark:border-slate-800/50 transition-colors ${
                                                    isBestDailyUsd ? 'bg-emerald-500/15 dark:bg-emerald-500/20' : ''
                                                }`}>
                                                    <div className="font-mono font-black text-emerald-500 dark:text-emerald-400 text-sm tracking-tight">{row.day}</div>
                                                    {row.isFiat && (
                                                        <div className="mt-1 space-y-0.5">
                                                            <div className={`text-[10px] ${isBestDailyUsd ? 'font-black text-emerald-700 dark:text-emerald-300' : 'font-bold text-slate-400'}`}>
                                                                {row.usdDay}
                                                            </div>
                                                            <div className="text-[10px] font-bold text-slate-400">{row.fiatDay}</div>
                                                        </div>
                                                    )}
                                                </td>

                                                <td className="hidden md:table-cell px-8 py-5 text-center border-r border-slate-50 dark:border-slate-800/50">
                                                    <div className="font-mono font-black text-emerald-500 dark:text-emerald-400 text-sm tracking-tight">{row.month}</div>
                                                    {row.isFiat && (
                                                        <div className="mt-1 space-y-0.5">
                                                            <div className="text-[10px] font-bold text-slate-400">{row.usdMonth}</div>
                                                            <div className="text-[10px] font-bold text-slate-400">{row.fiatMonth}</div>
                                                        </div>
                                                    )}
                                                </td>

                                                {/* Saque em - Destaque leve se for o menor tempo para saque */}
                                                <td className={`px-8 py-5 text-center transition-colors ${
                                                    isBestWithdraw ? 'bg-emerald-500/15 dark:bg-emerald-500/20' : ''
                                                }`}>
                                                    <span className={`text-xs font-black px-3 py-1 rounded-full ${
                                                        row.withdraw === 'X'
                                                            ? 'bg-slate-100 text-slate-300 dark:bg-slate-800'
                                                            : isBestWithdraw
                                                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                                                                : 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                                                    }`}>
                                                        {row.withdraw}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};