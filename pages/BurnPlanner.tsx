import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link2, LayoutList, RefreshCcw, Calculator, Flame, Info, ChevronDown, ChevronUp, CheckSquare, Square, Search } from 'lucide-react';

interface ParsedMiner {
    id: string; // Unique ID for selection (e.g., source_name_level)
    level: number;
    name: string;
    set: string;
    size: number;
    power: number;
    bonus: number;
    quantity: number;
    unitario: number;
    total: number;
    filename: string;
    canBeSold: boolean;
    source: 'room' | 'inventory';
}

// Collapsible Table Component
const CollapsibleTable = ({
    title,
    miners,
    selectedIds,
    onToggleSelect,
    onToggleAll,
    isOpen,
    onToggleOpen,
    colorClass
}: {
    title: string;
    miners: ParsedMiner[];
    selectedIds: Set<string>;
    onToggleSelect: (id: string) => void;
    onToggleAll: (ids: string[], select: boolean) => void;
    isOpen: boolean;
    onToggleOpen: () => void;
    colorClass: string;
}) => {
    if (miners.length === 0) return null;

    const totalPower = miners.reduce((acc, m) => acc + (m.power * m.quantity), 0);
    const totalQty = miners.reduce((acc, m) => acc + m.quantity, 0);
    const totalPoints = miners.reduce((acc, m) => acc + m.total, 0);
    const allSelected = miners.every(m => selectedIds.has(m.id));

    const formatPower = (ghs: number) => {
        if (ghs >= 1e9) return `${(ghs / 1e9).toFixed(2)} EH/s`;
        if (ghs >= 1e6) return `${(ghs / 1e6).toFixed(2)} PH/s`;
        if (ghs >= 1e3) return `${(ghs / 1e3).toFixed(2)} TH/s`;
        return `${ghs.toFixed(2)} GH/s`;
    };

    const getRarityColor = (level: number) => {
        switch (level) {
            case 0: return 'text-slate-500';
            case 1: return 'text-green-500';
            case 2: return 'text-blue-500';
            case 3: return 'text-purple-500';
            case 4: return 'text-yellow-500';
            case 5: return 'text-red-500';
            case 6: return 'text-orange-500';
            default: return 'text-slate-400';
        }
    };

    const getRarityName = (level: number) => {
        const names = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Unreal', 'Legacy'];
        return names[level] || 'Basic';
    };

    return (
        <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-all">
            <div
                className={`px-6 py-4 flex justify-between items-center cursor-pointer transition-colors ${isOpen ? 'bg-slate-50 dark:bg-slate-900/50' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
                onClick={onToggleOpen}
            >
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${colorClass} bg-opacity-10 text-opacity-100`}>
                        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                    <div>
                        <h3 className="text-sm font-black uppercase text-slate-700 dark:text-white">{title}</h3>
                        <div className="flex gap-3 text-[10px] font-bold text-slate-400 uppercase mt-0.5">
                            <span>{miners.length} Tipos</span>
                            <span>•</span>
                            <span>{totalQty} Qtd</span>
                            <span>•</span>
                            <span>{formatPower(totalPower)}</span>
                            <span>•</span>
                            <span className="text-orange-500">{Math.floor(totalPoints).toLocaleString()} Pts</span>
                        </div>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="border-t border-slate-100 dark:border-slate-800 overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-slate-900/20 text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                                <th className="px-6 py-3 w-10 text-center">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onToggleAll(miners.map(m => m.id), !allSelected);
                                        }}
                                        className="text-slate-400 hover:text-blue-500 transition-colors"
                                    >
                                        {allSelected ? <CheckSquare size={16} /> : <Square size={16} />}
                                    </button>
                                </th>
                                <th className="px-6 py-3">Minerador</th>
                                <th className="px-6 py-3 text-center">Poder</th>
                                <th className="px-6 py-3 text-center">Bônus</th>
                                <th className="px-6 py-3 text-center">Unitário (Pts)</th>
                                <th className="px-6 py-3 text-center">Total (Pts)</th>
                                <th className="px-6 py-3 text-right">Qtd</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                            {miners.map((miner) => {
                                const isSelected = selectedIds.has(miner.id);
                                return (
                                    <tr
                                        key={miner.id}
                                        className={`hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer ${isSelected ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
                                        onClick={() => onToggleSelect(miner.id)}
                                    >
                                        <td className="px-6 py-3 text-center">
                                            <div className={`transition-colors ${isSelected ? 'text-blue-500' : 'text-slate-300 dark:text-slate-600'}`}>
                                                {isSelected ? <CheckSquare size={16} /> : <Square size={16} />}
                                            </div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg p-1 flex-shrink-0">
                                                    <img src={`https://static.rollercoin.com/static/img/market/miners/${miner.filename}.gif?v=1`} alt="" className="w-full h-full object-contain" />
                                                </div>
                                                <div>
                                                    <div className="font-black text-xs dark:text-white leading-tight">{miner.name}</div>
                                                    <div className={`text-[9px] font-bold uppercase tracking-wide mt-0.5 ${getRarityColor(miner.level)}`}>
                                                        {getRarityName(miner.level)}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-3 text-center">
                                            <div className="text-xs font-bold dark:text-slate-300">{formatPower(miner.power)}</div>
                                        </td>
                                        <td className="px-6 py-3 text-center">
                                            <div className="text-xs font-bold text-blue-500">+{miner.bonus}%</div>
                                        </td>
                                        <td className="px-6 py-3 text-center">
                                            <div className="text-xs font-bold text-orange-500">{Math.floor(miner.unitario).toLocaleString()}</div>
                                        </td>
                                        <td className="px-6 py-3 text-center">
                                            <div className="text-xs font-black text-orange-600">{Math.floor(miner.total).toLocaleString()}</div>
                                        </td>
                                        <td className="px-6 py-3 text-right">
                                            <span className="inline-flex items-center justify-center min-w-[24px] px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-md text-[10px] font-black dark:text-white">
                                                x{miner.quantity}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export const BurnPlanner: React.FC = () => {
    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        const script_google = 'https://script.google.com/macros/s/AKfycbyS5c2Nr70VpAzYyM4cpGZtbm5wMWuX_AnhOJSHGg7ulIqs_1IH3opajMZoaQSlIBGP/exec';

        const updateCounterF2 = () => {
            fetch(script_google, {
                method: 'POST',
                mode: 'no-cors'
            }).catch(e => console.error("Error updating counter:", e));
        };

        updateCounterF2();
    }, []);
    const [userLink, setUserLink] = useState('');
    const [inventoryData, setInventoryData] = useState('');
    const [ptsTHs, setPtsTHs] = useState<number>(100);
    const [ptsBonus, setPtsBonus] = useState<number>(10);
    const [loading, setLoading] = useState(false);

    // Data States
    const [roomSellable, setRoomSellable] = useState<ParsedMiner[]>([]);
    const [roomUns, setRoomUns] = useState<ParsedMiner[]>([]);
    const [invSellable, setInvSellable] = useState<ParsedMiner[]>([]);
    const [invUns, setInvUns] = useState<ParsedMiner[]>([]);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    // UI States
    const [openTables, setOpenTables] = useState({
        roomSellable: false,
        roomUns: false,
        invSellable: false,
        invUns: false
    });

    const formatPower = (ghs: number) => {
        if (ghs == 0) return '0 GH/s';
        if (ghs >= 1e9) return `${(ghs / 1e9).toFixed(3)} EH/s`;
        if (ghs >= 1e6) return `${(ghs / 1e6).toFixed(3)} PH/s`;
        if (ghs >= 1e3) return `${(ghs / 1e3).toFixed(3)} TH/s`;
        return `${ghs.toFixed(3)} GH/s`;
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

    const cleanInventoryText = (text: string) => {
        let cleaned = text;

        // Remove header/footer (supporting multiple languages)
        cleaned = cleaned.replace(/[\s\S]*?(?:Items arranged in your rooms will not appear on this page\.|Os itens organizados em sua sala não aparecerão nesta página\.|Los objetos colocados en tus salas no aparecerán en esta página\.?)\s*/, '');
        cleaned = cleaned.replace(/\s*(?:About us|Sobre nós|Sobre nosotros)[\s\S]*/, '');

        // Split by "open"
        let parts = cleaned.split(/open\s*/);
        let resultArray = [];

        const prefixPart = (t: string) => {
            t = t.trim();
            if (t.startsWith("Rating star")) return "Level 6 " + t;
            let firstToken = t.split(/\s+/)[0];
            if (t && !/^\d+$/.test(firstToken)) return "Level 0 " + t;
            return "Level " + t;
        };

        if (parts.length > 0) parts[0] = prefixPart(parts[0]);

        for (let i = 0; i < parts.length; i++) {
            let current = parts[i].trim();
            if (!current) continue;

            // Fix "Set" counting
            let setCount = (current.match(/Set/g) || []).length;
            if (setCount === 1) {
                current = current.replace(/(Set)(.*?)(Size:|Tamanho:|Tamaño:)/, '$1 0 $2 $3');
            }
            resultArray.push(current);

            if (i < parts.length - 1) parts[i + 1] = prefixPart(parts[i + 1]);
        }

        let final = resultArray.join(" open ");
        final = final.replace(/(Rating star|set badge|Cells|Células|Celdas|Miner details|Detalhes da máquina|Información del minero|open)/g, '').trim();
        return final.replace(/\s+/g, " ").trim();
    };

    const parseInventory = (text: string, source: 'room' | 'inventory') => {
        const regex = /Level\s+(?<level>\d+)\s+(?<name>.+?)\s+Set\s+(?<set>.*?)\s+(?:(?:Size:)|(?:Tamanho:)|(?:Tamaño:))\s*(?<size>\d+)\s+(?:(?:Power)|(?:Poder))\s+(?<power>[\d.,]+)\s?(?<unit>[A-Za-z/]+)\s+(?:(?:Bonus)|(?:Bônus)|(?:Bonificación))\s+(?<bonus>[\d.,]+)\s*%\s+(?:(?:Quantity:)|(?:Qtd:)|(?:Cant:))\s*(?<quantity>\d+)\s+(?<canBeSold>(?:(?:Can't be sold)|(?:Can be sold)|(?:Não pode ser vendido)|(?:Pode ser vendido)|(?:No se puede vender)|(?:Se puede vender)))/g;

        const results: ParsedMiner[] = [];
        let match;

        while ((match = regex.exec(text)) !== null) {
            if (!match.groups) continue;
            let { level, name, power, unit, bonus, quantity, canBeSold } = match.groups;

            let pwr = parseFloat(power.replace(/,/g, ''));
            if (unit === "Eh/s") pwr *= 1e9;
            else if (unit === "Ph/s") pwr *= 1e6;
            else if (unit === "Th/s") pwr *= 1e3;

            const bonusVal = parseFloat(bonus);
            const unitario = Math.round((((pwr / (ptsTHs * 1000)) + (bonusVal / ptsBonus)) * 1000));
            const total = unitario * parseInt(quantity, 10);

            // Filename generation
            const filename = name.trim()
                .replace(/'/g, '')
                .replace(/’/g, '')
                .replace(/\+/g, 'plus')
                .replace(/-/g, '_')
                .replace(/\s+/g, '_')
                .replace(/,/g, '')
                .replace(/\./g, '')
                .toLowerCase();

            results.push({
                id: `${source}_${filename}_${level}_${Math.random().toString(36).substr(2, 9)}`,
                level: parseInt(level, 10),
                name: name.trim(),
                set: match.groups.set,
                size: parseInt(match.groups.size),
                power: pwr,
                bonus: bonusVal,
                quantity: parseInt(quantity, 10),
                unitario,
                total,
                filename,
                canBeSold: /(Can be sold|Pode ser vendido|Se puede vender)/.test(canBeSold),
                source
            });
        }
        return results;
    };

    const handleOrganize = async () => {
        if (!userLink && !inventoryData) {
            alert("Por favor, insira o link do perfil ou os dados do inventário.");
            return;
        }

        setLoading(true);

        try {
            await Promise.all([
                loadScript('https://wminerrc.github.io/calculator/data/basic_miners.js'),
                loadScript('https://wminerrc.github.io/calculator/data/merge_miners.js'),
                loadScript('https://wminerrc.github.io/calculator/data/old/merge_miners.js')
            ]);

            const win = window as any;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const minerDBs = [win.basic_miners, win.merge_miners, win.old_merge_miners];

            const newRoomSellable: ParsedMiner[] = [];
            const newRoomUns: ParsedMiner[] = [];

            // 1. Process Room
            if (userLink) {
                const proxy = "https://summer-night-03c0.rk-foxx-159.workers.dev/?";
                const profileUrl = `${proxy}https://rollercoin.com/api/profile/public-user-profile-data/${userLink}`;
                const profileRes = await fetch(profileUrl);
                const profileData = await profileRes.json();
                const avatarId = profileData?.data?.avatar_id;

                if (avatarId) {
                    const roomUrl = `${proxy}https://rollercoin.com/api/game/room-config/${avatarId}`;
                    const roomRes = await fetch(roomUrl);
                    const roomData = await roomRes.json();
                    const roomMiners = roomData?.data?.miners || [];

                    // Aggregate counts
                    const counts: Record<string, { type: string, quantity: number }> = {};
                    roomMiners.forEach((m: any) => {
                        if (!counts[m.miner_id]) counts[m.miner_id] = { type: m.type, quantity: 0 };
                        counts[m.miner_id].quantity++;
                    });

                    for (const [miner_id, { type, quantity }] of Object.entries(counts)) {
                        let info;
                        if (type === "basic") info = win.basic_miners;
                        else if (type === "merge") info = win.merge_miners;
                        else if (type === "old_merge") info = win.old_merge_miners;

                        const found = info?.find((m: any) => m.miner_id === miner_id);
                        
                        let pwr: number, bns: number, minerName: string, minerLevel: number, minerFilename: string, canBeSold: boolean;

                        if (found) {
                            pwr = found.power;
                            bns = found.bonus_power / 100;
                            minerName = found.name.en;
                            minerLevel = type === "old_merge" ? 6 : found.level;
                            minerFilename = found.filename;
                            canBeSold = found.is_can_be_sold_on_mp || false;
                        } else {
                            // Fallback: usar dados da API do RollerCoin
                            const rawMiner = roomMiners.find((m: any) => m.miner_id === miner_id);
                            if (!rawMiner) continue;
                            pwr = rawMiner.power;
                            bns = rawMiner.bonus_percent / 100;
                            minerName = rawMiner.name;
                            minerLevel = type === "old_merge" ? 6 : rawMiner.level;
                            minerFilename = rawMiner.filename;
                            canBeSold = false; // Sem dados externos, assume inegociável
                        }

                        const unitario = Math.round((((pwr / (ptsTHs * 1000)) + (bns / ptsBonus)) * 1000));

                        const minerObj: ParsedMiner = {
                            id: `room_${miner_id}_${Math.random()}`,
                            level: minerLevel,
                            name: minerName,
                            set: "Room",
                            size: 1, // simplified
                            power: pwr,
                            bonus: bns,
                            quantity: quantity,
                            unitario,
                            total: unitario * quantity,
                            filename: minerFilename,
                            canBeSold,
                            source: 'room'
                        };

                        if (minerObj.canBeSold) newRoomSellable.push(minerObj);
                        else newRoomUns.push(minerObj);
                    }
                }
            }

            // 2. Process Inventory
            let newInvSellable: ParsedMiner[] = [];
            let newInvUns: ParsedMiner[] = [];

            if (inventoryData) {
                const cleaned = cleanInventoryText(inventoryData);
                const parsed = parseInventory(cleaned, 'inventory');

                parsed.forEach(m => {
                    if (m.canBeSold) newInvSellable.push(m);
                    else newInvUns.push(m);
                });
            }

            // Sort arrays
            const sorter = (a: ParsedMiner, b: ParsedMiner) => b.unitario - a.unitario;
            newRoomSellable.sort(sorter);
            newRoomUns.sort(sorter);
            newInvSellable.sort(sorter);
            newInvUns.sort(sorter);

            setRoomSellable(newRoomSellable);
            setRoomUns(newRoomUns);
            setInvSellable(newInvSellable);
            setInvUns(newInvUns);

            // Set Open Tables based on content
            setOpenTables({
                roomSellable: newRoomSellable.length > 0,
                roomUns: false,
                invSellable: newInvSellable.length > 0,
                invUns: false
            });

        } catch (error) {
            console.error(error);
            alert("Erro ao processar dados.");
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setRoomSellable([]);
        setRoomUns([]);
        setInvSellable([]);
        setInvUns([]);
        setSelectedIds(new Set());
        setInventoryData('');
        setUserLink('');
    };

    const toggleSelect = (id: string) => {
        const newSet = new Set(selectedIds);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        setSelectedIds(newSet);
    };

    const toggleAll = (ids: string[], select: boolean) => {
        const newSet = new Set(selectedIds);
        ids.forEach(id => {
            if (select) newSet.add(id);
            else newSet.delete(id);
        });
        setSelectedIds(newSet);
    };

    const selectedStats = useMemo(() => {
        const allMiners = [...roomSellable, ...roomUns, ...invSellable, ...invUns];
        const selected = allMiners.filter(m => selectedIds.has(m.id));

        return {
            count: selected.reduce((acc, m) => acc + m.quantity, 0),
            points: selected.reduce((acc, m) => acc + m.total, 0),
            power: selected.reduce((acc, m) => acc + (m.power * m.quantity), 0),
            bonus: selected.reduce((acc, m) => acc + (m.bonus * m.quantity), 0)
        };
    }, [selectedIds, roomSellable, roomUns, invSellable, invUns]);

    return (
        <div className="space-y-8 animate-fade-in max-w-7xl mx-auto px-4 pb-24">
            <div className="text-center mb-12">
                <h2 className="font-display text-4xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">Planejador de Queima</h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">Sincronize sua sala e inventário para maximizar seus pontos no evento</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Inputs Column */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-700">
                        <h3 className="text-xs font-black uppercase text-slate-400 mb-6 flex items-center gap-2">
                            <Calculator size={14} /> Configuração de Entrada
                        </h3>

                        <div className="space-y-5">
                            <div>
                                <label className="flex items-center gap-2 text-xs font-black uppercase text-slate-500 mb-2">
                                    <Link2 size={14} /> ID do Perfil / Link
                                </label>
                                <input
                                    value={userLink}
                                    onChange={(e) => setUserLink(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                                    placeholder="Ex: RKFox ou Link Completo"
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-xs font-black uppercase text-slate-500 mb-2">
                                    <LayoutList size={14} /> Dados do Inventário
                                </label>
                                <textarea
                                    value={inventoryData}
                                    onChange={(e) => setInventoryData(e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none resize-none text-xs font-mono"
                                    placeholder="Copie e cole os dados do inventário aqui..."
                                />
                            </div>

                            <div className="bg-orange-50 dark:bg-orange-900/10 p-4 rounded-2xl border border-orange-200/50 dark:border-orange-900/30">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-[10px] font-black uppercase text-orange-600">Pontuação do Evento</h4>
                                    <Info size={12} className="text-orange-400 cursor-help" />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[8px] font-black uppercase text-slate-400 mb-1">Pts / THs</label>
                                        <input
                                            type="number"
                                            value={ptsTHs}
                                            onChange={(e) => setPtsTHs(Number(e.target.value))}
                                            className="w-full py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-black text-center text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[8px] font-black uppercase text-slate-400 mb-1">Pts / % Bônus</label>
                                        <input
                                            type="number"
                                            value={ptsBonus}
                                            onChange={(e) => setPtsBonus(Number(e.target.value))}
                                            className="w-full py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-black text-center text-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleOrganize}
                                disabled={loading}
                                className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 text-white font-black text-sm uppercase tracking-widest rounded-xl shadow-xl shadow-orange-500/20 transition-all active:scale-[0.98]"
                            >
                                {loading ? 'Processando...' : 'ORGANIZAR QUEIMA'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Tables */}
                    <div className="space-y-4">
                        <CollapsibleTable
                            title="Miners NEGOCIÁVEIS da Sala"
                            miners={roomSellable}
                            selectedIds={selectedIds}
                            onToggleSelect={toggleSelect}
                            onToggleAll={toggleAll}
                            isOpen={openTables.roomSellable}
                            onToggleOpen={() => setOpenTables(prev => ({ ...prev, roomSellable: !prev.roomSellable }))}
                            colorClass="text-green-500"
                        />
                        <CollapsibleTable
                            title="Miners INEGOCIÁVEIS da Sala"
                            miners={roomUns}
                            selectedIds={selectedIds}
                            onToggleSelect={toggleSelect}
                            onToggleAll={toggleAll}
                            isOpen={openTables.roomUns}
                            onToggleOpen={() => setOpenTables(prev => ({ ...prev, roomUns: !prev.roomUns }))}
                            colorClass="text-red-500"
                        />
                        <CollapsibleTable
                            title="Miners NEGOCIÁVEIS do Inventário"
                            miners={invSellable}
                            selectedIds={selectedIds}
                            onToggleSelect={toggleSelect}
                            onToggleAll={toggleAll}
                            isOpen={openTables.invSellable}
                            onToggleOpen={() => setOpenTables(prev => ({ ...prev, invSellable: !prev.invSellable }))}
                            colorClass="text-green-500"
                        />
                        <CollapsibleTable
                            title="Miners INEGOCIÁVEIS do Inventário"
                            miners={invUns}
                            selectedIds={selectedIds}
                            onToggleSelect={toggleSelect}
                            onToggleAll={toggleAll}
                            isOpen={openTables.invUns}
                            onToggleOpen={() => setOpenTables(prev => ({ ...prev, invUns: !prev.invUns }))}
                            colorClass="text-red-500"
                        />

                        {roomSellable.length === 0 && roomUns.length === 0 && invSellable.length === 0 && invUns.length === 0 && !loading && (
                            <div className="flex flex-col items-center justify-center py-20 text-slate-300 dark:text-slate-600 bg-white dark:bg-dark-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                                <Flame size={48} strokeWidth={1} className="mb-4 opacity-20" />
                                <p className="text-sm font-bold uppercase tracking-widest">Nenhum dado processado</p>
                                <p className="text-xs">Insira os dados à esquerda para começar</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Sticky Footer Summary */}
            {selectedStats.count > 0 && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 dark:bg-black/90 backdrop-blur-md text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-8 z-50 border border-white/10 animate-fade-in-up">
                    <div>
                        <p className="text-[9px] font-black uppercase text-slate-400">Selecionados</p>
                        <p className="text-lg font-black">{selectedStats.count}</p>
                    </div>
                    <div>
                        <p className="text-[9px] font-black uppercase text-slate-400">Poder Total</p>
                        <p className="text-lg font-black">{formatPower(selectedStats.power)}</p>
                    </div>
                    <div>
                        <p className="text-[9px] font-black uppercase text-slate-400">Total Pontos</p>
                        <p className="text-lg font-black text-orange-500">{Math.floor(selectedStats.points).toLocaleString()}</p>
                    </div>
                    <button
                        onClick={handleReset}
                        className="ml-4 p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors"
                    >
                        <RefreshCcw size={16} />
                    </button>
                </div>
            )}
        </div>
    );
};