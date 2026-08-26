import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Search, Info, TrendingDown, LayoutGrid, RefreshCw, Trophy, X } from 'lucide-react';

interface DBItem {
    name: string;
    common: { power: number; bonus: number };
    uncommon: { power: number; bonus: number };
    rare: { power: number; bonus: number };
    epic: { power: number; bonus: number };
    legendary: { power: number; bonus: number };
    unreal: { power: number; bonus: number };
    legacy: { power: number; bonus: number };
}

interface RoomMiner {
    miner_id: string;
    user_rack_id: string;
    name: string;
    width: number;
    level: number;
    power: number;
    filename: string;
    bonus_percent: number;
    is_in_set: boolean;
    repetitions: string | number;
    setImpact: number;
    setBonus: number;
    type: string;
    sellable?: boolean;
    room_level: number;
    rack_x: number;
    rack_y: number;
    impact: number;
    formattedImpact: string;
}

export const WhalePlanner: React.FC = () => {
    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        const script_google = 'https://script.google.com/macros/s/AKfycbw9TfgggqeY_ByvmDb15Vgi6DfOaPjc5FyIb_yCjkMBIXE7toViYYj1UerBJw6KUcWP/exec';

        const updateCounterB2 = () => {
            fetch(script_google, {
                method: 'POST',
                mode: 'no-cors'
            }).catch(e => console.error("Error updating counter:", e));
        };

        updateCounterB2();
    }, []);
    const [userLink, setUserLink] = useState('');
    const [loading, setLoading] = useState(false);
    const [dbMiners, setDbMiners] = useState<DBItem[]>([]);
    const [selectedWhale, setSelectedWhale] = useState<RoomMiner | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [simulationResult, setSimulationResult] = useState<{ impact: number; formatted: string } | null>(null);
    const [selectedNewMiner, setSelectedNewMiner] = useState<{ item: DBItem, level: string } | null>(null);
    const [userStats, setUserStats] = useState({ minersPower: 0, totalBonusPercent: 0, totalOrig: 0 });
    const [slotsFilter, setSlotsFilter] = useState<'1' | '2' | 'both'>('both');
    const [marketFilter, setMarketFilter] = useState<'sellable' | 'not_sellable' | 'both'>('both');
    const [allMiners, setAllMiners] = useState<RoomMiner[]>([]);
    const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

    const proxy = "https://summer-night-03c0.rk-foxx-159.workers.dev/?";

    const convertPower = (value: number) => {
        const absValue = Math.abs(value);
        const sign = value < 0 ? '-' : '';
        if (absValue >= 1e9) return sign + (absValue / 1e9).toFixed(3).replace('.', ',') + ' EH/s';
        if (absValue >= 1e6) return sign + (absValue / 1e6).toFixed(3).replace('.', ',') + ' PH/s';
        if (absValue >= 1e3) return sign + (absValue / 1e3).toFixed(3).replace('.', ',') + ' TH/s';
        return sign + absValue.toFixed(3).replace('.', ',') + ' GH/s';
    };

    // Helper to load external scripts
    const loadScript = (src: string) => {
        return new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${src}"]`)) {
                resolve(true);
                return;
            }
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => reject(new Error(`Failed to load script ${src}`));
            document.body.appendChild(script);
        });
    };

    // Load external miner data for sellable check
    useEffect(() => {
        const loadMinerData = async () => {
            try {
                const scripts = [
                    'https://wminerrc.github.io/calculator/data/basic_miners.js',
                    'https://wminerrc.github.io/calculator/data/merge_miners.js',
                    'https://wminerrc.github.io/calculator/data/old/merge_miners.js',
                ];
                await Promise.all(scripts.map(loadScript));
            } catch (e) {
                console.error("Failed to load miner data scripts", e);
            }
        };
        loadMinerData();
    }, []);

    const checkSellable = (minerId: string) => {
        const win = window as any;
        const datasets = [win.basic_miners, win.merge_miners, win.old_merge_miners];
        for (const dataset of datasets) {
            if (!dataset) continue;
            const miner = dataset.find((m: any) => m.miner_id === minerId);
            if (miner) {
                return miner.is_can_be_sold_on_mp || false;
            }
        }
        return false;
    };

    const loadDatabase = useCallback(async () => {
        const sheetId = "171LSMNAiJ74obfmLzueKtzuyu7Bg9Ql5dBWQ1GkjQTI";
        const apiKey = "AIzaSyBP12YfPrz9MhCH3J7boeondSm7HYVCUvA";
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Database!C4:AP?key=${apiKey}`;

        try {
            const res = await fetch(url);
            const data = await res.json();
            if (!data.values) return;

            const items: DBItem[] = data.values.map((row: any) => ({
                name: row[0],
                common: { power: (parseFloat(row[1]) || 0) * 1000, bonus: parseFloat(row[2]) || 0 },
                uncommon: { power: (parseFloat(row[23]) || 0) * 1000, bonus: parseFloat(row[28]) || 0 },
                rare: { power: (parseFloat(row[24]) || 0) * 1000, bonus: parseFloat(row[29]) || 0 },
                epic: { power: (parseFloat(row[25]) || 0) * 1000, bonus: parseFloat(row[30]) || 0 },
                legendary: { power: (parseFloat(row[26]) || 0) * 1000, bonus: parseFloat(row[31]) || 0 },
                unreal: { power: (parseFloat(row[27]) || 0) * 1000, bonus: parseFloat(row[32]) || 0 },
                legacy: { power: (parseFloat(row[38]) || 0) * 1000, bonus: parseFloat(row[39]) || 0 }
            }));
            setDbMiners(items);
        } catch (e) {
            console.error("DB Load Error", e);
        }
    }, []);

    useEffect(() => {
        loadDatabase();
    }, [loadDatabase]);

    const handleSearch = async () => {
        if (!userLink) return;
        setLoading(true);

        try {
            // Profile & Power Data
            const profileRes = await fetch(`${proxy}https://rollercoin.com/api/profile/public-user-profile-data/${userLink}`);
            const profileData = await profileRes.json();
            const avatarId = profileData?.data?.avatar_id;

            if (!avatarId) throw new Error("Invalid User");

            const powerRes = await fetch(`${proxy}https://rollercoin.com/api/profile/user-power-data/${avatarId}`);
            const powerData = await powerRes.json();

            const minersPower = powerData.data.miners;
            let totalBonusPercent = powerData.data.bonus_percent;
            totalBonusPercent = parseFloat((totalBonusPercent / 100).toFixed(2));
            const totalOrig = minersPower * (1 + (totalBonusPercent / 100));

            // Room Config
            const roomRes = await fetch(`${proxy}https://rollercoin.com/api/game/room-config/${avatarId}`);
            const roomData = await roomRes.json();
            const rawMiners = roomData.data.miners;
            const rawRacks = roomData.data.racks;

            const minerCount: any = {};
            rawMiners.forEach((m: any) => {
                const key = `${m.miner_id}_${m.level}`;
                minerCount[key] = (minerCount[key] || 0) + 1;
            });

            const seen: any = {};
            let processedMiners: RoomMiner[] = rawMiners.map((m: any) => {
                const key = `${m.miner_id}_${m.level}`;
                const isFirst = !seen[key];
                seen[key] = true;

                const rack = rawRacks.find((r: any) => r._id === m.placement.user_rack_id);

                return {
                    miner_id: m.miner_id,
                    user_rack_id: m.placement.user_rack_id,
                    name: m.name,
                    width: m.width,
                    level: m.level,
                    power: m.power,
                    filename: m.filename,
                    bonus_percent: isFirst ? m.bonus_percent / 100 : 0,
                    is_in_set: m.is_in_set,
                    repetitions: isFirst ? "Não" : minerCount[key],
                    setImpact: 0,
                    setBonus: 0,
                    type: m.type,
                    sellable: checkSellable(m.miner_id),
                    room_level: rack?.placement?.room_level || 0,
                    rack_x: rack?.placement?.x || 0,
                    rack_y: rack?.placement?.y || 0,
                    impact: 0,
                    formattedImpact: ''
                };
            });


            // Set Adjustments (User Provided Logic)
            const applySets = (minersList: RoomMiner[]) => {
                const applyBonusAdjustment = (miners: RoomMiner[], targetIds: string[], fullSetBonus: number, partialSetBonus: number) => {
                    const matchingMiners = miners.filter(miner => targetIds.includes(miner.miner_id));
                    const bonusAdjustment = matchingMiners.length === 4 ? fullSetBonus : (matchingMiners.length >= 2 ? partialSetBonus : 0);
                    matchingMiners.forEach(miner => miner.setBonus += bonusAdjustment);
                };

                const applyBonus2Adjustment = (miners: RoomMiner[], targetIds: string[], fullSetBonus: number, partialSetBonus: number) => {
                    const matchingMiners = miners.filter(miner => targetIds.includes(miner.miner_id));
                    const bonusAdjustment = matchingMiners.length === 3 ? fullSetBonus : (matchingMiners.length === 2 ? partialSetBonus : 0);
                    matchingMiners.forEach(miner => miner.setBonus += bonusAdjustment);
                };

                const applyBonus3Adjustment = (miners: RoomMiner[], targetIds: string[], fullSetBonus: number, p1: number, p2: number) => {
                    const matchingMiners = miners.filter(miner => targetIds.includes(miner.miner_id));
                    const bonusAdjustment = matchingMiners.length === 4 ? fullSetBonus : (matchingMiners.length === 3 ? p1 : (matchingMiners.length === 2 ? p2 : 0));
                    matchingMiners.forEach(miner => miner.setBonus += bonusAdjustment);
                };

                const applyBonus4Adjustment = (
                    miners: RoomMiner[],
                    targetIds: string[],
                    fullSetBonus: number,    // 8 items
                    partialSetBonus3: number, // 6 items
                    partialSetBonus2: number, // 4 items
                    partialSetBonus1: number  // 2 items
                ) => {
                    const matchingMiners = miners.filter(miner => targetIds.includes(miner.miner_id));
                    const count = matchingMiners.length;

                    const bonusAdjustment =
                        count === 8 ? fullSetBonus
                            : count >= 6 ? partialSetBonus3
                                : count >= 4 ? partialSetBonus2
                                    : count >= 2 ? partialSetBonus1
                                        : 0;

                    matchingMiners.forEach(miner => miner.setBonus += bonusAdjustment);
                };

                const applyImpact3Adjustment = (miners: RoomMiner[], targetIds: string[], full: number, partial: number) => {
                    const matchingMiners = miners.filter(miner => targetIds.includes(miner.miner_id));
                    const adjustment = matchingMiners.length === 3 ? full : (matchingMiners.length >= 2 ? partial : 0);
                    matchingMiners.forEach(miner => miner.setImpact += adjustment);
                };

                const applyImpact4Adjustment = (miners: RoomMiner[], targetIds: string[], full: number, partial: number) => {
                    const matchingMiners = miners.filter(miner => targetIds.includes(miner.miner_id));
                    const adjustment = matchingMiners.length === 4 ? full : (matchingMiners.length >= 2 ? partial : 0);
                    matchingMiners.forEach(miner => miner.setImpact += adjustment);
                };

                // Imperial Set
                applyBonus2Adjustment(minersList, ["66e40f32e0dd3530da8bf7da", "674882691745a1e9ed4c3d56", "674882a81745a1e9ed4c3e66", "66e40f06e0dd3530da8bf564", "66e40f5de0dd3530da8bfa3a", "674882691745a1e9ed4c3d5e", "674882a81745a1e9ed4c3e6e"], 10, 5);
                // Radio Set
                applyBonus3Adjustment(minersList, ["693bd5f1b13b27427ba8a5c2", "693bd7d2b13b27427ba8af47", "693bd585b13b27427ba89ee7", "693bd705b13b27427ba8ac8e"], 90, 60, 40);
                // Designer Set (8 items: 24%, 4 items: 8%)
                // Passing 0 for intermediate 6-item and 2-item tiers if not applicable, assuming 8->24 and 4->8.
                applyBonus4Adjustment(minersList, ["684947c1ccf7adb5d76505a6", "68626997411d00ff277d7a18", "686269fb411d00ff277d7b8d", "68626a8e411d00ff277d81cc", "68494781ccf7adb5d765052d", "68626962411d00ff277d76e9", "686269cb411d00ff277d7a80", "68626a5c411d00ff277d815a"], 120, 75, 40, 15);
                // Royal Set
                applyBonusAdjustment(minersList, ["6909e357dbb4b86eca7f24fa", "6909e3d4dbb4b86eca7f286c", "6909e466dbb4b86eca7f2928", "6909e329dbb4b86eca7f2489", "6909e395dbb4b86eca7f273b", "6909e466dbb4b86eca7f2925"], 45, 25);
                // Set 1 (24/8)
                applyBonusAdjustment(minersList, ["68244844fbb67c190eed4dd7", "6824489bfbb67c190eed5222", "682448fcfbb67c190eed530f", "6824481dfbb67c190eed4d7d", "68244872fbb67c190eed4e6f", "682448ccfbb67c190eed52bb"], 24, 8);
                // Set 2 (20/10)
                applyBonusAdjustment(minersList, ["67c08778b5e8c2c0f194631d", "67c0879cb5e8c2c0f194636b", "67c087bcb5e8c2c0f19463b9", "67c087e3b5e8c2c0f1946b75"], 20, 10);
                // Set 3 (10/5)
                applyBonusAdjustment(minersList, ["66f1c200e0dd3530daa2eadf", "66f1c1b9e0dd3530daa2e9df", "66f1c18fe0dd3530daa2e8dd", "66f1c1dee0dd3530daa2ea96"], 10, 5);
                // Set 4 (7/2)
                applyBonusAdjustment(minersList, ["6687cf817643815232d65da6", "6687cfd57643815232d65e39", "6687cf557643815232d65d5c", "6687cfae7643815232d65def"], 7, 2);

                // Impact Adjustments
                applyImpact3Adjustment(minersList, ["67338357d9b2852bde4b077d", "67338298d9b2852bde4afb0d", "67338415d9b2852bde4b0dc6"], 15000000, 7500000);
                applyImpact3Adjustment(minersList, ["66c31b17b82bcb27662d302b", "66c31aecb82bcb27662d2f53", "66c31b3eb82bcb27662d30d8"], 10000000, 5000000);
                applyImpact3Adjustment(minersList, ["66ead1cde0dd3530da969ea9", "66ead191e0dd3530da969e5f", "66ead1fbe0dd3530da969ef3"], 8000000, 5000000);
                applyImpact4Adjustment(minersList, ["6687cea87643815232d65882", "6687cefd7643815232d65d11", "6687ce4e7643815232d65297", "6687ced67643815232d65cc8"], 3000000, 2000000);
                applyImpact4Adjustment(minersList, ["6687cd307643815232d64077", "6687cdc47643815232d64726", "6687ccfc7643815232d6402d", "6687cd837643815232d640c1"], 2500000, 1500000);
                applyImpact4Adjustment(minersList, ["674df56acbe1e47b27075ab6", "674df5c5cbe1e47b27075b51", "674df539cbe1e47b27075a68", "674df599cbe1e47b27075b04"], 25000000, 10000000);
            };

            applySets(processedMiners);

            setUserStats({ minersPower, totalBonusPercent, totalOrig });
            setAllMiners(processedMiners);

        } catch (e) {
            console.error(e);
            alert("Erro ao buscar dados do jogador.");
        } finally {
            setLoading(false);
        }
    };

    const minerImpacts = React.useMemo(() => {
        if (allMiners.length === 0) return [];

        let filtered = [...allMiners];
        if (slotsFilter !== 'both') {
            filtered = filtered.filter(m => m.width === parseInt(slotsFilter));
        }
        if (marketFilter === 'sellable') {
            filtered = filtered.filter(m => m.sellable === true);
        } else if (marketFilter === 'not_sellable') {
            filtered = filtered.filter(m => m.sellable === false);
        }

        const { minersPower, totalBonusPercent, totalOrig } = userStats;

        return filtered.map(m => {
            const remainingPower = minersPower - m.power;
            const remainingBonus = totalBonusPercent - m.bonus_percent;
            const newAdjusted = remainingPower * ((100 + remainingBonus - m.setBonus) / 100);
            const impact = (newAdjusted - totalOrig) - m.setImpact;
            return {
                ...m,
                impact,
                formattedImpact: convertPower(impact)
            };
        }).sort((a, b) => b.impact - a.impact).slice(0, 10);
    }, [allMiners, slotsFilter, marketFilter, userStats]);

    const getLevelInfo = (level: number, type: string) => {
        const levels = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Unreal', 'Legacy'];
        const colors = ['', 'text-green-500', 'text-blue-400', 'text-pink-500', 'text-yellow-400', 'text-red-500', 'text-orange-400'];

        let text = levels[level] || 'Unknown';
        let color = colors[level] || 'text-slate-400';

        if (level === 1) {
            if (type === 'merge') { text = 'Uncommon'; color = 'text-green-500'; }
            else if (type === 'old_merge') { text = 'Legacy'; color = 'text-orange-400'; }
        }

        return { text, color };
    };

    const handleSimulateUpdate = (miner: DBItem, level: string) => {
        if (!selectedWhale) return;

        const levelKey = level.toLowerCase() as keyof DBItem;
        const targetData = (miner[levelKey] as { power: number; bonus: number }) || { power: 0, bonus: 0 };

        const powerValue = targetData.power;
        const bonusValue = targetData.bonus;

        const { minersPower, totalBonusPercent, totalOrig } = userStats;
        const podervelho = selectedWhale.power;
        const bonusvelho = selectedWhale.bonus_percent; // This is already divided by 100 in processed minres

        // Formula from impact.js:
        // let newImpact = (((somaminer - podervelho + powerValue) * (1 + ((somabonus - bonusvelho*100 + bonusValue)/100))) - ((somaminer * (1 + (somabonus/100)))));
        const newImpact = (((minersPower - podervelho + powerValue) * (1 + ((totalBonusPercent - bonusvelho + bonusValue) / 100))) - totalOrig);

        setSimulationResult({
            impact: newImpact,
            formatted: convertPower(newImpact)
        });
        setSelectedNewMiner({ item: miner, level });
    };

    const filteredMiners = dbMiners.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 50);

    const renderSimulatorBody = () => {
        if (!selectedWhale) return null;

        return (
            <div>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 mb-6">
                    <div className="flex items-center gap-4 mb-4">
                        <img src={`https://static.rollercoin.com/static/img/market/miners/${selectedWhale.filename}.gif?v=1`} className="w-16 h-16 object-contain" alt="" />
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase">Miner Atual</p>
                            <p className="font-black text-slate-800 dark:text-white leading-tight uppercase">{selectedWhale.name}</p>
                            <p className="text-[10px] font-bold text-blue-500">+{selectedWhale.bonus_percent.toFixed(2)}% Bônus</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white dark:bg-dark-800 p-2 rounded-xl text-center border border-slate-200 dark:border-slate-700">
                            <p className="text-[8px] font-bold text-slate-400 uppercase">Poder</p>
                            <p className="text-xs font-black dark:text-white">{convertPower(selectedWhale.power)}</p>
                        </div>
                        <div className="bg-white dark:bg-dark-800 p-2 rounded-xl text-center border border-slate-200 dark:border-slate-700">
                            <p className="text-[8px] font-bold text-slate-400 uppercase">Impacto</p>
                            <p className="text-xs font-black text-red-500">-{convertPower(Math.abs(selectedWhale.impact))}</p>
                        </div>
                    </div>
                </div>

                {selectedNewMiner && (
                    <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl p-4 border border-emerald-100 dark:border-emerald-800 mb-6 animate-fade-in">
                        <div className="flex items-center gap-4 mb-4">
                            <img src={`https://static.rollercoin.com/static/img/market/miners/${selectedNewMiner.item.name.toLowerCase().replace(/\s+/g, '_')}.gif?v=1`} className="w-16 h-16 object-contain" alt="" />
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase">Simulação Nova</p>
                                <p className="font-black text-slate-800 dark:text-white leading-tight uppercase text-xs">{selectedNewMiner.item.name}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <p className="text-[10px] font-black text-emerald-500 uppercase">{selectedNewMiner.level}</p>
                                    <p className="text-[10px] font-bold text-blue-500">
                                        +{((selectedNewMiner.item[selectedNewMiner.level.toLowerCase() as keyof DBItem] as { power: number; bonus: number })?.bonus || 0).toFixed(2)}% Bônus
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-white dark:bg-dark-800 p-2 rounded-xl text-center border border-slate-200 dark:border-slate-700">
                                <p className="text-[8px] font-bold text-slate-400 uppercase">Poder</p>
                                <p className="text-xs font-black dark:text-white">{convertPower(selectedNewMiner.item[selectedNewMiner.level.toLowerCase() as keyof DBItem]?.power || 0)}</p>
                            </div>
                            <div className="bg-white dark:bg-dark-800 p-2 rounded-xl text-center border border-slate-200 dark:border-slate-700">
                                <p className="text-[8px] font-bold text-slate-400 uppercase">Impacto Final</p>
                                <p className={`text-xs font-black ${simulationResult?.impact && simulationResult.impact < 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                                    {simulationResult?.formatted || '0,000 PH/s'}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="space-y-4 relative">
                    <p className="text-[10px] font-black text-slate-400 uppercase text-center">Simular substituição por:</p>
                    <div className="relative">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setIsDropdownOpen(true);
                            }}
                            onFocus={() => setIsDropdownOpen(true)}
                            className="w-full pl-4 pr-10 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl outline-none font-bold text-sm dark:text-white focus:ring-2 focus:ring-blue-500"
                            placeholder="Pesquisar minerador..."
                        />
                        <LayoutGrid size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />

                        {isDropdownOpen && searchTerm.length > 0 && (
                            <div className="absolute z-50 bottom-full left-0 w-full mb-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl max-h-60 overflow-y-auto">
                                {filteredMiners.map((m, i) => (
                                    <div key={i} className="p-2 border-b border-white/5 last:border-0">
                                        <p className="text-[10px] font-black text-slate-500 px-2 pt-1">{m.name}</p>
                                        <div className="flex flex-wrap gap-1 p-1">
                                            {['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Unreal', 'Legacy'].map(lvl => {
                                                const d = m[lvl.toLowerCase() as keyof DBItem] as any;
                                                if (!d || d.power === 0) return null;
                                                return (
                                                    <button
                                                        key={lvl}
                                                        onClick={() => {
                                                            handleSimulateUpdate(m, lvl);
                                                            setIsDropdownOpen(false);
                                                            setSearchTerm('');
                                                        }}
                                                        className={`px-2 py-1 rounded-md text-[9px] font-black uppercase transition-all ${getLevelInfo(['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Unreal', 'Legacy'].indexOf(lvl), 'basic').color} hover:bg-white/10`}
                                                    >
                                                        {lvl}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="p-4 bg-orange-50 dark:bg-orange-900/10 rounded-xl border border-orange-100 dark:border-orange-900/30">
                        <p className="text-[10px] font-black text-orange-600 uppercase mb-1 flex items-center gap-1">
                            <Info size={10} /> Dica de Baleia
                        </p>
                        <p className="text-[10px] text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                            Ao remover um minerador com bônus alto, o impacto negativo pode ser maior que o ganho bruto do novo minerador.
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-8 animate-fade-in max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="font-display text-4xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">Planejador de Baleias</h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">Identifique os mineradores de menor impacto e planeje substituições estratégicas</p>
            </div>

            {/* Filters and Search Bar Container */}
            <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 flex flex-col gap-6">
                {/* Filters Row */}
                <div className="flex flex-wrap gap-8 items-center px-4">
                    {/* Slots Filter */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Slots</label>
                        <div className="flex gap-4">
                            {[
                                { id: '1', label: '1 slot' },
                                { id: '2', label: '2 slots' },
                                { id: 'both', label: 'Ambos' }
                            ].map((opt) => (
                                <label key={opt.id} className="flex items-center gap-2 cursor-pointer group">
                                    <div className="relative flex items-center justify-center">
                                        <input
                                            type="radio"
                                            name="slots"
                                            checked={slotsFilter === opt.id}
                                            onChange={() => setSlotsFilter(opt.id as any)}
                                            className="sr-only"
                                        />
                                        <div className={`w-4 h-4 rounded-full border-2 transition-all ${slotsFilter === opt.id ? 'border-blue-500 bg-blue-500' : 'border-slate-300 dark:border-slate-600'}`} />
                                        {slotsFilter === opt.id && <div className="absolute w-1.5 h-1.5 bg-white rounded-full" />}
                                    </div>
                                    <span className={`text-[11px] font-bold transition-colors ${slotsFilter === opt.id ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>{opt.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Market Filter */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mercado</label>
                        <div className="flex gap-4">
                            {[
                                { id: 'sellable', label: 'Negociável' },
                                { id: 'not_sellable', label: 'Inegociável' },
                                { id: 'both', label: 'Ambos' }
                            ].map((opt) => (
                                <label key={opt.id} className="flex items-center gap-2 cursor-pointer group">
                                    <div className="relative flex items-center justify-center">
                                        <input
                                            type="radio"
                                            name="market"
                                            checked={marketFilter === opt.id}
                                            onChange={() => setMarketFilter(opt.id as any)}
                                            className="sr-only"
                                        />
                                        <div className={`w-4 h-4 rounded-full border-2 transition-all ${marketFilter === opt.id ? 'border-blue-500 bg-blue-500' : 'border-slate-300 dark:border-slate-600'}`} />
                                        {marketFilter === opt.id && <div className="absolute w-1.5 h-1.5 bg-white rounded-full" />}
                                    </div>
                                    <span className={`text-[11px] font-bold transition-colors ${marketFilter === opt.id ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>{opt.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-2">
                    <div className="flex-grow flex items-center px-4 gap-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-transparent focus-within:border-blue-500 transition-all">
                        <Search size={18} className="text-slate-400" />
                        <input
                            value={userLink}
                            onChange={(e) => setUserLink(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            className="w-full py-4 bg-transparent outline-none text-slate-900 dark:text-white font-bold"
                            placeholder="Digite o Link da Sala (após /p/)"
                        />
                    </div>
                    <button
                        onClick={handleSearch}
                        disabled={loading}
                        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-blue-500/20"
                    >
                        {loading ? 'ANALISANDO...' : 'BUSCAR'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* List Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center gap-2 px-2">
                        <TrendingDown size={20} className="text-red-500" />
                        <h3 className="text-lg font-black uppercase text-slate-700 dark:text-white">Top 10 Menor Impacto</h3>
                    </div>

                    {minerImpacts.map((m, idx) => {
                        const levelInfo = getLevelInfo(m.level, m.type);
                        return (
                            <div
                                key={idx}
                                onClick={() => {
                                    setSelectedWhale(m);
                                    setSimulationResult(null);
                                    setSelectedNewMiner(null);
                                    setIsMobileModalOpen(true);
                                }}
                                className={`p-6 cursor-pointer transition-all bg-white dark:bg-dark-800 rounded-[2.5rem] border shadow-lg hover:shadow-xl hover:-translate-y-1 ${selectedWhale?.miner_id === m.miner_id ? 'border-blue-500 ring-4 ring-blue-500/20' : 'border-slate-100 dark:border-slate-700'}`}
                            >
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Rank and Image Container */}
                                    <div className="flex flex-col items-center gap-2 w-full md:w-40 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{idx + 1}º Lugar</span>
                                        <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-2xl flex-shrink-0 p-2 shadow-inner border border-slate-100 dark:border-slate-700">
                                            <img src={`https://static.rollercoin.com/static/img/market/miners/${m.filename}.gif?v=1`} alt="" className="w-full h-full object-contain" />
                                        </div>
                                        <div className="text-center mt-2">
                                            <span className={`text-[9px] font-black uppercase tracking-widest ${levelInfo.color}`}>{levelInfo.text}</span>
                                            <div className="font-black text-xs dark:text-white uppercase leading-tight mt-1 tracking-tight">{m.name}</div>
                                            <div className={`text-[9px] font-black mt-2 uppercase px-2 py-0.5 rounded-full border ${m.sellable ? 'text-blue-500 border-blue-500/20 bg-blue-500/5' : 'text-red-500 border-red-500/20 bg-red-500/5'}`}>
                                                {m.sellable ? 'Negociável' : 'Inegociável'}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-3">
                                        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-[1.5rem] border border-slate-100 dark:border-slate-800">
                                            <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Poder</p>
                                            <p className="text-sm font-bold dark:text-white">{convertPower(m.power)}</p>
                                        </div>
                                        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-[1.5rem] border border-slate-100 dark:border-slate-800">
                                            <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Bônus</p>
                                            <p className="text-sm font-bold text-blue-500">{m.bonus_percent.toFixed(2)}%</p>
                                        </div>
                                        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-[1.5rem] border border-slate-100 dark:border-slate-800">
                                            <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Impacto Total</p>
                                            <p className="text-sm font-bold text-red-500">-{convertPower(Math.abs(m.impact))}</p>
                                        </div>
                                        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-[1.5rem] border border-slate-100 dark:border-slate-800">
                                            <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                                                Localização
                                            </p>
                                            <p className="text-[11px] font-black dark:text-slate-300">
                                                Sala: {m.room_level + 1} <br />
                                                Linha: {m.rack_y + 1} <br />
                                                Rack: {m.rack_x + 1}
                                            </p>
                                        </div>
                                        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-[1.5rem] border border-slate-100 dark:border-slate-800">
                                            <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Faz parte de Set?</p>
                                            <p className="text-xs font-black dark:text-white">{m.setBonus > 0 || m.is_in_set ? 'Sim' : 'Não'}</p>
                                        </div>
                                        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-[1.5rem] border border-slate-100 dark:border-slate-800">
                                            <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Repetida/Merge</p>
                                            <p className="text-xs font-black dark:text-white">{m.repetitions}</p>
                                        </div>
                                        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-[1.5rem] border border-slate-100 dark:border-slate-800 col-span-2">
                                            <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Bônus de Set</p>
                                            <p className="text-sm font-bold text-emerald-500">{m.setBonus > 0 ? `+${m.setBonus}%` : (m.setImpact > 0 ? `+${convertPower(m.setImpact)}` : '0%')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {minerImpacts.length === 0 && !loading && (
                        <div className="bg-white dark:bg-dark-800 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 py-20 text-center text-slate-300 dark:text-slate-600 shadow-sm">
                            <Search size={48} strokeWidth={1} className="mx-auto mb-4 opacity-20" />
                            <p className="text-xs font-black uppercase tracking-widest">Busque um jogador para ver os impactos</p>
                        </div>
                    )}
                </div>

                {/* Simulation Column (Desktop) */}
                <div className="hidden lg:block lg:col-span-1 space-y-6">
                    {selectedWhale ? (
                        <div className="bg-white dark:bg-dark-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-2xl shadow-blue-500/5 sticky top-8">
                            <h3 className="text-center font-black uppercase text-sm mb-6 dark:text-white">Simulador de Troca</h3>
                            {renderSimulatorBody()}
                        </div>
                    ) : (
                        <div className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-3xl border-2 border-dashed border-blue-200 dark:border-blue-900/50 text-center flex flex-col items-center justify-center min-h-[400px]">
                            <Info size={32} className="text-blue-400 mb-4" />
                            <h4 className="font-display font-black text-slate-800 dark:text-white uppercase mb-2">Simulação de Troca</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Selecione um minerador da lista para ver os detalhes e simular trocas</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Simulator Popup / Modal */}
            {isMobileModalOpen && selectedWhale && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in lg:hidden">
                    <div
                        className="fixed inset-0"
                        onClick={() => setIsMobileModalOpen(false)}
                    />
                    <div className="relative w-full max-w-lg bg-white dark:bg-dark-800 rounded-t-[2.5rem] sm:rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-2xl max-h-[85vh] overflow-y-auto z-10 animate-slide-up">
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-700">
                            <div className="flex items-center gap-2">
                                <LayoutGrid size={18} className="text-blue-500" />
                                <h3 className="font-black uppercase text-sm dark:text-white">Simulador de Troca</h3>
                            </div>
                            <button
                                onClick={() => setIsMobileModalOpen(false)}
                                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                aria-label="Fechar"
                            >
                                <X size={18} />
                            </button>
                        </div>
                        {renderSimulatorBody()}
                    </div>
                </div>
            )}

            {/* Floating button on mobile when a miner is selected and modal is closed */}
            {selectedWhale && !isMobileModalOpen && (
                <div className="fixed bottom-6 right-6 z-40 lg:hidden">
                    <button
                        onClick={() => setIsMobileModalOpen(true)}
                        className="flex items-center gap-2 px-5 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider rounded-full shadow-2xl shadow-blue-500/50 border-2 border-white/20 active:scale-95 transition-all"
                    >
                        <LayoutGrid size={16} />
                        <span>Simulador</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    </button>
                </div>
            )}
        </div>
    );
};