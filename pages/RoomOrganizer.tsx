import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
    LayoutGrid,
    Package,
    Trash2,
    Search,
    ArrowUpDown,
    RotateCcw,
    CheckSquare,
    Square,
    Calculator,
    TrendingUp,
    TrendingDown,
    Zap,
    Award,
    Sparkles,
    Info,
    Download,
    Upload,
    Copy,
    Check,
    RefreshCw,
    Lock,
    ShoppingBag,
    Grid3X3,
    AlertCircle,
    CheckCircle2,
    AlertTriangle,
    ShieldAlert
} from 'lucide-react';

export interface OrganizerMiner {
    id: string; // Unique instance ID
    miner_id?: string; // RollerCoin database ID if available
    name: string;
    level: number; // Merge level (0 = basic, 1 = uncommon/I, 2 = rare/II, etc.)
    size: number; // 1 or 2 cells
    power: number; // In GH/s
    bonus_percent: number; // Individual miner bonus % (e.g. 2.5)
    filename: string;
    canBeSold?: boolean;
    source: 'room' | 'inventory' | 'custom';
    quantity?: number; // Used mainly for inventory aggregation
    isFirstInRoom?: boolean; // If this copy provides bonus in room (only 1st copy of identical name + level)
    activeBonus?: number; // The actual bonus it gives to the room (0 if duplicate of identical name + level)
    realPower?: number; // Power * (1 + activeBonus/100)
    marginalImpact?: number; // Real Power impact on total account if removed/added (in GH/s)
    rack_info?: string;
    hasEstimatedLevel?: boolean; // Flag indicating level was estimated from text parser
}

export type SalaSortOption =
    | 'real_power_desc'
    | 'real_power_asc'
    | 'power_desc'
    | 'power_asc'
    | 'bonus_desc'
    | 'bonus_asc'
    | 'name_asc'
    | 'size_desc'
    | 'size_asc'
    | 'repeated_first'
    | 'sellable_first'
    | 'not_sellable_first';

export const RoomOrganizer: React.FC = () => {
    const hasRun = useRef(false);

    // Google Script Counter for Room Organizer (optional tracking)
    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        const script_google = 'https://script.google.com/macros/s/AKfycbw9TfgggqeY_ByvmDb15Vgi6DfOaPjc5FyIb_yCjkMBIXE7toViYYj1UerBJw6KUcWP/exec';
        fetch(script_google, {
            method: 'POST',
            mode: 'no-cors'
        }).catch(e => console.error("Error updating counter:", e));
    }, []);

    // API & Input states
    const [userLink, setUserLink] = useState('');
    const [customSetBonus, setCustomSetBonus] = useState<number>(0);
    const [inventoryRawText, setInventoryRawText] = useState('');
    const [loading, setLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

    // 3 Main Column States
    const [salaMiners, setSalaMiners] = useState<OrganizerMiner[]>([]);
    const [inventoryMiners, setInventoryMiners] = useState<OrganizerMiner[]>([]);
    const [discardMiners, setDiscardMiners] = useState<OrganizerMiner[]>([]);

    // Initial Snapshot for Delta calculations & 100% capacity calculation
    const [initialRoomState, setInitialRoomState] = useState<{
        miners: OrganizerMiner[];
        minersPower: number;
        totalBonusPercent: number;
        totalRealPower: number;
        initialTotalCells: number;
    } | null>(null);

    // Selection sets for bulk actions
    const [selectedSalaIds, setSelectedSalaIds] = useState<Set<string>>(new Set());

    // Search and Filters
    const [salaSearch, setSalaSearch] = useState('');
    const [salaSort, setSalaSort] = useState<SalaSortOption>('real_power_desc');
    const [salaSizeFilter, setSalaSizeFilter] = useState<'all' | '1' | '2'>('all');
    const [salaSellableFilter, setSalaSellableFilter] = useState<'all' | 'sellable' | 'not_sellable'>('all');
    const [salaDuplicateFilter, setSalaDuplicateFilter] = useState<'all' | 'duplicates' | 'unique' | 'dup_unsellable' | 'dup_sellable'>('all');

    const [invSearch, setInvSearch] = useState('');
    const [invMarketFilter, setInvMarketFilter] = useState<'all' | 'sellable' | 'not_sellable'>('all');
    const [invSizeFilter, setInvSizeFilter] = useState<'all' | '1' | '2'>('all');

    const [discardSearch, setDiscardSearch] = useState('');
    const [discardMarketFilter, setDiscardMarketFilter] = useState<'all' | 'sellable' | 'not_sellable'>('all');
    const [rightPanelTab, setRightPanelTab] = useState<'inventory' | 'discard'>('inventory');

    const [showTextModal, setShowTextModal] = useState(false);
    const [showWelcomeAlert, setShowWelcomeAlert] = useState(true);
    const [copiedAlert, setCopiedAlert] = useState(false);

    const proxy = "https://summer-night-03c0.rk-foxx-159.workers.dev/?";

    // Power formatter
    const formatPower = (ghs: number, showSign = false) => {
        const sign = ghs > 0 && showSign ? '+' : ghs < 0 ? '-' : '';
        const absVal = Math.abs(ghs);
        if (absVal === 0) return '0 GH/s';
        if (absVal >= 1e9) return `${sign}${(absVal / 1e9).toFixed(3).replace('.', ',')} EH/s`;
        if (absVal >= 1e6) return `${sign}${(absVal / 1e6).toFixed(3).replace('.', ',')} PH/s`;
        if (absVal >= 1e3) return `${sign}${(absVal / 1e3).toFixed(3).replace('.', ',')} TH/s`;
        return `${sign}${absVal.toFixed(3).replace('.', ',')} GH/s`;
    };

    // Formatter for Bonus delta
    const formatBonusDelta = (val: number) => {
        const sign = val > 0 ? '+' : '';
        return `${sign}${val.toFixed(2)}%`;
    };

    // Formatter for % difference
    const formatPctChange = (pct: number) => {
        const sign = pct > 0 ? '+' : '';
        return `${sign}${pct.toFixed(2)}%`;
    };

    // Load external miner metadata scripts for sellable identification
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

    // Helper: Filename sanitization for RollerCoin static images
    const generateFilename = (name: string): string => {
        return name.trim()
            .replace(/'/g, '')
            .replace(/’/g, '')
            .replace(/\+/g, 'plus')
            .replace(/-/g, '_')
            .replace(/\s+/g, '_')
            .replace(/,/g, '')
            .replace(/\./g, '')
            .toLowerCase();
    };

    // Power unit parser to GH/s
    const parsePowerStringToGhs = (valStr: string, unitStr: string): number => {
        const cleanVal = parseFloat(valStr.replace(/,/g, ''));
        if (isNaN(cleanVal)) return 0;
        const unit = unitStr.toUpperCase().trim();
        if (unit.startsWith('ZH')) return cleanVal * 1e12;
        if (unit.startsWith('EH')) return cleanVal * 1e9;
        if (unit.startsWith('PH')) return cleanVal * 1e6;
        if (unit.startsWith('TH')) return cleanVal * 1e3;
        return cleanVal; // GH/s
    };

    // Calculate live room metrics (Poder Bruto, Bônus Bruto, Poder Real, Células)
    const currentRoomStats = useMemo(() => {
        const manualBonus = Number(customSetBonus) || 0;
        if (salaMiners.length === 0) {
            return {
                poderBruto: 0,
                baseBonusBruto: 0,
                autoSetBonus: 0,
                customSetBonus: manualBonus,
                bonusBruto: manualBonus,
                poderReal: 0,
                minersCount: 0,
                totalCells: 0,
                count1C: 0,
                count2C: 0,
                cells1C: 0,
                cells2C: 0,
                maxCellsCapacity: initialRoomState?.initialTotalCells || 0,
                availableCells: initialRoomState?.initialTotalCells || 0,
                occupationPct: 0,
                uniqueMinersCount: 0,
                duplicateCount: 0,
                sellableCount: 0,
                notSellableCount: 0,
                dupUnsellableCount: 0,
                dupSellableCount: 0,
                enrichedMiners: [] as OrganizerMiner[]
            };
        }

        let totalPoderBruto = 0;
        let count1C = 0;
        let count2C = 0;
        let cells1C = 0;
        let cells2C = 0;
        const seenKeys = new Set<string>();
        let baseBonusBruto = 0;
        let duplicateCount = 0;
        let sellableCount = 0;
        let notSellableCount = 0;
        let dupUnsellableCount = 0;
        let dupSellableCount = 0;
        const enrichedMiners: OrganizerMiner[] = [];

        const keyCounts = new Map<string, number>();
        salaMiners.forEach(m => {
            const key = `${m.name.trim().toLowerCase()}_lvl_${m.level ?? 0}`;
            keyCounts.set(key, (keyCounts.get(key) || 0) + 1);
        });

        // 1st pass: Calculate base power, uniqueness, cells, and active bonus per miner
        salaMiners.forEach(m => {
            totalPoderBruto += m.power;
            const sz = m.size === 1 ? 1 : 2;
            if (sz === 1) {
                count1C++;
                cells1C += 1;
            } else {
                count2C++;
                cells2C += 2;
            }

            if (m.canBeSold) sellableCount++;
            else notSellableCount++;

            // Unique key to distinguish miner types: SAME MODEL / NAME AND SAME MERGE LEVEL = DUPLICATE
            // In RollerCoin:
            // - Same Name + Same Level -> Duplicate (Only 1st copy contributes bonus, others contribute +0%)
            // - Same Name + Different Level (e.g. Normal Lvl 0 vs Merge Lvl 1) -> NOT duplicate, BOTH give bonus!
            const uniqueKey = `${m.name.trim().toLowerCase()}_lvl_${m.level ?? 0}`;

            const isFirst = !seenKeys.has(uniqueKey);
            if (isFirst) {
                seenKeys.add(uniqueKey);
                baseBonusBruto += m.bonus_percent;
            } else {
                duplicateCount++;
                if (m.canBeSold) dupSellableCount++;
                else dupUnsellableCount++;
            }

            const activeBonus = isFirst ? m.bonus_percent : 0;
            // Real power contribution = base power * (1 + activeBonus/100)
            const realPower = m.power * (1 + activeBonus / 100);

            enrichedMiners.push({
                ...m,
                size: sz,
                isFirstInRoom: isFirst,
                activeBonus,
                realPower
            });
        });

        const totalCells = cells1C + cells2C;
        const maxCellsCapacity = initialRoomState?.initialTotalCells || totalCells;
        const availableCells = maxCellsCapacity - totalCells; // > 0 means liberated/free slots, < 0 means overflow
        const occupationPct = maxCellsCapacity > 0 ? (totalCells / maxCellsCapacity) * 100 : 0;
        const totalBonusBruto = baseBonusBruto + manualBonus;
        const totalPoderReal = totalPoderBruto * (1 + totalBonusBruto / 100);

        // 2nd pass: Compute dynamic marginal removal impact on Total Real Power
        enrichedMiners.forEach(m => {
            const uniqueKey = `${m.name.trim().toLowerCase()}_lvl_${m.level ?? 0}`;
            const countInRoom = keyCounts.get(uniqueKey) || 1;
            // If only 1 copy in room, removing it removes its bonus %
            const lostBonus = countInRoom === 1 ? m.bonus_percent : 0;
            const newPoderBruto = Math.max(0, totalPoderBruto - m.power);
            const newBonusBruto = Math.max(0, totalBonusBruto - lostBonus);
            const newPoderReal = newPoderBruto * (1 + newBonusBruto / 100);
            m.marginalImpact = Math.max(0, totalPoderReal - newPoderReal);
        });

        return {
            poderBruto: totalPoderBruto,
            baseBonusBruto,
            customSetBonus: manualBonus,
            bonusBruto: totalBonusBruto,
            poderReal: totalPoderReal,
            minersCount: salaMiners.length,
            totalCells,
            count1C,
            count2C,
            cells1C,
            cells2C,
            maxCellsCapacity,
            availableCells,
            occupationPct,
            uniqueMinersCount: seenKeys.size,
            duplicateCount,
            sellableCount,
            notSellableCount,
            dupUnsellableCount,
            dupSellableCount,
            enrichedMiners,
            keyCounts
        };
    }, [salaMiners, initialRoomState, customSetBonus]);

    // Live Deltas vs Initial State
    const liveDeltas = useMemo(() => {
        if (!initialRoomState) {
            return {
                deltaPoder: 0,
                deltaPoderPct: 0,
                deltaBonus: 0,
                deltaBonusPct: 0,
                deltaRealPower: 0,
                deltaRealPowerPct: 0,
                deltaCells: 0
            };
        }

        const deltaPoder = currentRoomStats.poderBruto - initialRoomState.minersPower;
        const deltaPoderPct = initialRoomState.minersPower > 0
            ? (deltaPoder / initialRoomState.minersPower) * 100
            : 0;

        const deltaBonus = currentRoomStats.bonusBruto - initialRoomState.totalBonusPercent;
        const deltaBonusPct = initialRoomState.totalBonusPercent > 0
            ? (deltaBonus / initialRoomState.totalBonusPercent) * 100
            : 0;

        const deltaRealPower = currentRoomStats.poderReal - initialRoomState.totalRealPower;
        const deltaRealPowerPct = initialRoomState.totalRealPower > 0
            ? (deltaRealPower / initialRoomState.totalRealPower) * 100
            : 0;

        const deltaCells = currentRoomStats.totalCells - initialRoomState.initialTotalCells;

        return {
            deltaPoder,
            deltaPoderPct,
            deltaBonus,
            deltaBonusPct,
            deltaRealPower,
            deltaRealPowerPct,
            deltaCells
        };
    }, [currentRoomStats, initialRoomState]);

    // Marginal impact of adding a miner to the room (used in Inventory & Discard)
    const getInsertionImpact = (miner: OrganizerMiner): { impact: number; givesBonus: boolean } => {
        const key = `${miner.name.trim().toLowerCase()}_lvl_${miner.level ?? 0}`;
        const isAlreadyInRoom = (currentRoomStats.keyCounts?.get(key) || 0) > 0;
        const gainedBonus = isAlreadyInRoom ? 0 : miner.bonus_percent;

        const newPoderBruto = currentRoomStats.poderBruto + miner.power;
        const newBonusBruto = currentRoomStats.bonusBruto + gainedBonus;
        const newPoderReal = newPoderBruto * (1 + newBonusBruto / 100);

        const impact = Math.max(0, newPoderReal - currentRoomStats.poderReal);
        return {
            impact,
            givesBonus: !isAlreadyInRoom && miner.bonus_percent > 0
        };
    };

    // Robust Parser for Inventory Text (Supports both structured multi-line and single-line / token formats)
    const parseInventoryText = (raw: string): OrganizerMiner[] => {
        if (!raw.trim()) return [];

        let cleaned = raw;
        // Clean leading banners and links
        cleaned = cleaned.replace(/[\s\S]*?(?:Items arranged in your rooms will not appear on this page\.|Os itens organizados em sua sala não aparecerão nesta página\.|Los objetos colocados en tus salas no aparecerán en esta página\.?)\s*/i, '');
        cleaned = cleaned.replace(/\s*(?:About us|Sobre nós|Sobre nosotros)[\s\S]*/i, '');

        // Strategy 1: Multi-line / newline delimited blocks
        const regexMulti = /(?:^|\n)(?<name>[^\n]+?)\s*\n+(?:Set\s*\n+)?(?:Size:|Tamanho:|Tamaño:)\s*\n*(?<size>\d+)\s*(?:Cells?|Células|Celdas)\s*\n*(?:Power|Poder)\s*\n*(?<power>[\d.,]+)\s*(?<unit>[A-Za-z/]+)\s*\n*(?:Bonus|Bônus|Bonificación)\s*\n*(?<bonus>[\d.,]+)\s*%\s*\n*(?:Quantity:|Qtd:|Cant:)\s*\n*(?<quantity>\d+)\s*\n*(?<canBeSold>Can't be sold|Can be sold|Não pode ser vendido|Pode ser vendido|No se pode vender|No se puede vender|Se puede vender)/gim;

        const parsedList: OrganizerMiner[] = [];
        let match: RegExpExecArray | null;

        while ((match = regexMulti.exec(cleaned)) !== null) {
            if (!match.groups) continue;
            const { name, size, power, unit, bonus, quantity, canBeSold } = match.groups;

            const cleanName = name.trim();
            if (cleanName.toLowerCase().includes('quantity: high') || cleanName.toLowerCase().includes('storage')) continue;

            const pwr = parsePowerStringToGhs(power, unit);
            const bns = parseFloat(bonus.replace(/,/g, '.')) || 0;
            const qty = parseInt(quantity, 10) || 1;
            const sz = parseInt(size, 10) || 2;
            const isSellable = /(Can be sold|Pode ser vendido|Se puede vender)/i.test(canBeSold);
            const filename = generateFilename(cleanName);

            parsedList.push({
                id: `inv_${filename}_${Date.now()}_${Math.random().toString(36).substr(2, 7)}`,
                name: cleanName,
                level: 0,
                size: sz,
                power: pwr,
                bonus_percent: bns,
                filename,
                canBeSold: isSellable,
                quantity: qty,
                source: 'inventory'
            });
        }

        // Strategy 2: If strategy 1 didn't find items (e.g. copied horizontally or with 'open' tokens), try tokenized regex
        if (parsedList.length === 0) {
            const regexInline = /(?<name>[A-Za-z0-9\s'’\-–+()#&/.]+?)\s+(?:Set\s+)?(?:Size:|Tamanho:|Tamaño:)\s*(?<size>\d+)\s*(?:Cells?|Células|Celdas)\s+(?:Power|Poder)\s+(?<power>[\d.,]+)\s*(?<unit>[A-Za-z/]+)\s+(?:Bonus|Bônus|Bonificación)\s+(?<bonus>[\d.,]+)\s*%\s+(?:Quantity:|Qtd:|Cant:)\s*(?<quantity>\d+)\s+(?<canBeSold>Can't be sold|Can be sold|Não pode ser vendido|Pode ser vendido|No se puede vender|Se puede vender)/gim;
            while ((match = regexInline.exec(cleaned)) !== null) {
                if (!match.groups) continue;
                const { name, size, power, unit, bonus, quantity, canBeSold } = match.groups;

                const cleanName = name.trim().replace(/^.*?(?:Miner details|open)\s+/i, '');
                if (cleanName.toLowerCase().includes('quantity: high') || cleanName.toLowerCase().includes('storage')) continue;

                const pwr = parsePowerStringToGhs(power, unit);
                const bns = parseFloat(bonus.replace(/,/g, '.')) || 0;
                const qty = parseInt(quantity, 10) || 1;
                const sz = parseInt(size, 10) || 2;
                const isSellable = /(Can be sold|Pode ser vendido|Se puede vender)/i.test(canBeSold);
                const filename = generateFilename(cleanName);

                parsedList.push({
                    id: `inv_${filename}_${Date.now()}_${Math.random().toString(36).substr(2, 7)}`,
                    name: cleanName,
                    level: 0,
                    size: sz,
                    power: pwr,
                    bonus_percent: bns,
                    filename,
                    canBeSold: isSellable,
                    quantity: qty,
                    source: 'inventory'
                });
            }
        }

        return parsedList;
    };

    // Action: Process Inventory Text Input
    const handleProcessInventory = () => {
        if (!inventoryRawText.trim()) {
            setStatusMessage({ text: "Insira o texto do inventário para processar.", type: 'error' });
            return;
        }

        const items = parseInventoryText(inventoryRawText);
        if (items.length === 0) {
            setStatusMessage({
                text: "Não foi possível encontrar mineradores no texto. Verifique se o texto inclui Nome, Tamanho, Poder e Bônus.",
                type: 'error'
            });
            return;
        }

        setInventoryMiners(prev => {
            // Merge with existing inventory items if duplicates exist
            const merged = [...prev];
            items.forEach(newItem => {
                const existing = merged.find(m => m.name.toLowerCase() === newItem.name.toLowerCase() && m.power === newItem.power && m.bonus_percent === newItem.bonus_percent && m.size === newItem.size);
                if (existing) {
                    existing.quantity = (existing.quantity || 1) + (newItem.quantity || 1);
                } else {
                    merged.push(newItem);
                }
            });
            return merged;
        });

        setStatusMessage({ text: `${items.length} tipo(s) de mineradores importados com sucesso para o Inventário!`, type: 'success' });
        setShowTextModal(false);
    };

    // Action: Fetch User Room from RollerCoin API
    const handleLoadRoom = async () => {
        if (!userLink.trim()) {
            setStatusMessage({ text: "Insira o link do perfil ou ID do jogador.", type: 'error' });
            return;
        }

        setLoading(true);
        setStatusMessage(null);

        try {
            // 1. Profile Data
            const profileRes = await fetch(`${proxy}https://rollercoin.com/api/profile/public-user-profile-data/${userLink.trim()}`);
            const profileData = await profileRes.json();
            const avatarId = profileData?.data?.avatar_id;

            if (!avatarId) {
                throw new Error("Perfil não encontrado ou inválido.");
            }

            // 2. Power Data
            const powerRes = await fetch(`${proxy}https://rollercoin.com/api/profile/user-power-data/${avatarId}`);
            const powerData = await powerRes.json();
            const minersPower = powerData?.data?.miners || 0;
            const totalBonusPercent = parseFloat(((powerData?.data?.bonus_percent || 0) / 100).toFixed(2));
            const totalOrig = minersPower * (1 + totalBonusPercent / 100);

            // 3. Room Config
            const roomRes = await fetch(`${proxy}https://rollercoin.com/api/game/room-config/${avatarId}`);
            const roomData = await roomRes.json();
            const rawMiners = roomData?.data?.miners || [];
            const rawRacks = roomData?.data?.racks || [];

            let initialCellsCount = 0;

            const processed: OrganizerMiner[] = rawMiners.map((m: any, index: number) => {
                const rack = rawRacks.find((r: any) => r._id === m.placement?.user_rack_id);
                const sz = m.width === 1 ? 1 : 2;
                initialCellsCount += sz;

                return {
                    id: `room_${m.miner_id}_${m.level}_${index}_${Math.random().toString(36).substr(2, 6)}`,
                    miner_id: m.miner_id,
                    name: m.name,
                    level: m.level || 0,
                    size: sz,
                    power: m.power || 0,
                    bonus_percent: parseFloat(((m.bonus_percent || 0) / 100).toFixed(2)),
                    filename: m.filename || generateFilename(m.name),
                    canBeSold: checkSellable(m.miner_id),
                    source: 'room',
                    rack_info: rack ? `R${rack.placement?.room_level || 1} X:${rack.placement?.x || 0} Y:${rack.placement?.y || 0}` : undefined
                };
            });

            // Calculate base unique bonus to auto-fill the user's exact Set Bonus from the profile
            const seenKeys = new Set<string>();
            let initialBaseBonus = 0;
            processed.forEach(m => {
                const key = `${m.name.trim().toLowerCase()}_lvl_${m.level ?? 0}`;
                if (!seenKeys.has(key)) {
                    seenKeys.add(key);
                    initialBaseBonus += m.bonus_percent;
                }
            });

            // The difference between total profile bonus and unique miners is the user's exact real Set Bonus!
            const autoDetectedSetBonus = Math.max(0, parseFloat((totalBonusPercent - initialBaseBonus).toFixed(2)));
            setCustomSetBonus(autoDetectedSetBonus);

            setSalaMiners(processed);
            setInitialRoomState({
                miners: JSON.parse(JSON.stringify(processed)),
                minersPower,
                totalBonusPercent,
                totalRealPower: totalOrig,
                initialTotalCells: initialCellsCount
            });

            setStatusMessage({
                text: `Sala carregada com sucesso! ${processed.length} mineradores e ${initialCellsCount} células (100% de capacidade).`,
                type: 'success'
            });
        } catch (e: any) {
            console.error("Erro ao carregar sala:", e);
            setStatusMessage({ text: e.message || "Erro ao buscar dados do jogador na API.", type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    // Movement: Move from Sala to Discard
    const handleMoveSalaToDiscard = (minerId: string) => {
        const item = salaMiners.find(m => m.id === minerId);
        if (!item) return;

        setSalaMiners(prev => prev.filter(m => m.id !== minerId));
        setDiscardMiners(prev => [item, ...prev]);
        setSelectedSalaIds(prev => {
            const next = new Set(prev);
            next.delete(minerId);
            return next;
        });
    };

    // Movement: Move from Sala to Inventory
    const handleMoveSalaToInventory = (minerId: string) => {
        const item = salaMiners.find(m => m.id === minerId);
        if (!item) return;

        setSalaMiners(prev => prev.filter(m => m.id !== minerId));
        setInventoryMiners(prev => {
            const existing = prev.find(m => m.name.toLowerCase() === item.name.toLowerCase() && m.power === item.power && m.bonus_percent === item.bonus_percent && m.size === item.size);
            if (existing) {
                return prev.map(m => m.id === existing.id ? { ...m, quantity: (m.quantity || 1) + 1 } : m);
            } else {
                return [{ ...item, id: `inv_${item.filename}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`, quantity: 1, source: 'inventory' }, ...prev];
            }
        });
        setSelectedSalaIds(prev => {
            const next = new Set(prev);
            next.delete(minerId);
            return next;
        });
    };

    // Movement: Move from Inventory to Sala (1 copy or All)
    const handleMoveInventoryToSala = (invId: string, count: number = 1) => {
        const item = inventoryMiners.find(m => m.id === invId);
        if (!item) return;

        const currentQty = item.quantity || 1;
        const toMove = Math.min(currentQty, count);

        const newSalaItems: OrganizerMiner[] = [];
        for (let i = 0; i < toMove; i++) {
            newSalaItems.push({
                ...item,
                id: `room_from_inv_${item.filename}_${Date.now()}_${i}_${Math.random().toString(36).substr(2, 6)}`,
                quantity: undefined,
                source: 'room'
            });
        }

        setSalaMiners(prev => [...newSalaItems, ...prev]);

        if (currentQty <= toMove) {
            setInventoryMiners(prev => prev.filter(m => m.id !== invId));
        } else {
            setInventoryMiners(prev => prev.map(m => m.id === invId ? { ...m, quantity: currentQty - toMove } : m));
        }
    };

    // Movement: Move from Inventory to Discard
    const handleMoveInventoryToDiscard = (invId: string, count: number = 1) => {
        const item = inventoryMiners.find(m => m.id === invId);
        if (!item) return;

        const currentQty = item.quantity || 1;
        const toMove = Math.min(currentQty, count);

        const newDiscardItems: OrganizerMiner[] = [];
        for (let i = 0; i < toMove; i++) {
            newDiscardItems.push({
                ...item,
                id: `disc_from_inv_${item.filename}_${Date.now()}_${i}_${Math.random().toString(36).substr(2, 6)}`,
                quantity: undefined
            });
        }

        setDiscardMiners(prev => [...newDiscardItems, ...prev]);

        if (currentQty <= toMove) {
            setInventoryMiners(prev => prev.filter(m => m.id !== invId));
        } else {
            setInventoryMiners(prev => prev.map(m => m.id === invId ? { ...m, quantity: currentQty - toMove } : m));
        }
    };

    // Movement: Move from Discard to Sala
    const handleMoveDiscardToSala = (minerId: string) => {
        const item = discardMiners.find(m => m.id === minerId);
        if (!item) return;

        setDiscardMiners(prev => prev.filter(m => m.id !== minerId));
        setSalaMiners(prev => [{ ...item, source: 'room' }, ...prev]);
    };

    // Movement: Move from Discard to Inventory
    const handleMoveDiscardToInventory = (minerId: string) => {
        const item = discardMiners.find(m => m.id === minerId);
        if (!item) return;

        setDiscardMiners(prev => prev.filter(m => m.id !== minerId));
        setInventoryMiners(prev => {
            const existing = prev.find(m => m.name.toLowerCase() === item.name.toLowerCase() && m.power === item.power && m.bonus_percent === item.bonus_percent && m.size === item.size);
            if (existing) {
                return prev.map(m => m.id === existing.id ? { ...m, quantity: (m.quantity || 1) + 1 } : m);
            } else {
                return [{ ...item, id: `inv_${item.filename}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`, quantity: 1, source: 'inventory' }, ...prev];
            }
        });
    };

    // Bulk actions
    const handleBulkMoveSalaToDiscard = () => {
        if (selectedSalaIds.size === 0) return;
        const toMove = salaMiners.filter(m => selectedSalaIds.has(m.id));
        setSalaMiners(prev => prev.filter(m => !selectedSalaIds.has(m.id)));
        setDiscardMiners(prev => [...toMove, ...prev]);
        setSelectedSalaIds(new Set());
    };

    const handleBulkMoveSalaToInventory = () => {
        if (selectedSalaIds.size === 0) return;
        const toMove = salaMiners.filter(m => selectedSalaIds.has(m.id));
        setSalaMiners(prev => prev.filter(m => !selectedSalaIds.has(m.id)));

        setInventoryMiners(prev => {
            const merged = [...prev];
            toMove.forEach(item => {
                const existing = merged.find(m => m.name.toLowerCase() === item.name.toLowerCase() && m.power === item.power && m.bonus_percent === item.bonus_percent && m.size === item.size);
                if (existing) {
                    existing.quantity = (existing.quantity || 1) + 1;
                } else {
                    merged.push({ ...item, id: `inv_${item.filename}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`, quantity: 1, source: 'inventory' });
                }
            });
            return merged;
        });
        setSelectedSalaIds(new Set());
    };

    // Quick helper: Discard all Unsellable Duplicates
    const handleDiscardUnsellableDuplicates = () => {
        const enriched = currentRoomStats.enrichedMiners;
        const target = enriched.filter(m => !m.isFirstInRoom && !m.canBeSold);
        if (target.length === 0) {
            setStatusMessage({ text: "Não há mineradores repetidos inegociáveis na sala.", type: 'info' });
            return;
        }

        const targetIds = new Set(target.map(m => m.id));
        setSalaMiners(prev => prev.filter(m => !targetIds.has(m.id)));
        setDiscardMiners(prev => [...target, ...prev]);
        setStatusMessage({ text: `${target.length} minerador(es) repetido(s) inegociáveis movidos para o Descarte!`, type: 'success' });
    };

    // Quick helper: Move all Sellable Duplicates to Inventory to sell
    const handleMoveSellableDuplicatesToInventory = () => {
        const enriched = currentRoomStats.enrichedMiners;
        const target = enriched.filter(m => !m.isFirstInRoom && m.canBeSold);
        if (target.length === 0) {
            setStatusMessage({ text: "Não há mineradores repetidos negociáveis na sala.", type: 'info' });
            return;
        }

        const targetIds = new Set(target.map(m => m.id));
        setSalaMiners(prev => prev.filter(m => !targetIds.has(m.id)));

        setInventoryMiners(prev => {
            const merged = [...prev];
            target.forEach(item => {
                const existing = merged.find(m => m.name.toLowerCase() === item.name.toLowerCase() && m.power === item.power && m.bonus_percent === item.bonus_percent && m.size === item.size);
                if (existing) {
                    existing.quantity = (existing.quantity || 1) + 1;
                } else {
                    merged.push({ ...item, id: `inv_${item.filename}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`, quantity: 1, source: 'inventory' });
                }
            });
            return merged;
        });

        setStatusMessage({ text: `${target.length} minerador(es) repetido(s) negociáveis guardados no Inventário para venda!`, type: 'success' });
    };

    const handleRestoreInitialRoom = () => {
        if (!initialRoomState) return;
        setSalaMiners(JSON.parse(JSON.stringify(initialRoomState.miners)));
        setSelectedSalaIds(new Set());

        // Restore exact set bonus
        const seenKeys = new Set<string>();
        let initialBaseBonus = 0;
        initialRoomState.miners.forEach(m => {
            const key = `${m.name.trim().toLowerCase()}_lvl_${m.level ?? 0}`;
            if (!seenKeys.has(key)) {
                seenKeys.add(key);
                initialBaseBonus += m.bonus_percent;
            }
        });
        const autoDetectedSetBonus = Math.max(0, parseFloat((initialRoomState.totalBonusPercent - initialBaseBonus).toFixed(2)));
        setCustomSetBonus(autoDetectedSetBonus);

        setStatusMessage({ text: "Sala restaurada para o estado original!", type: 'info' });
    };

    // Filtered & Sorted Sala Miners
    const displayedSalaMiners = useMemo(() => {
        let list = [...currentRoomStats.enrichedMiners];

        if (salaSearch.trim()) {
            const q = salaSearch.toLowerCase();
            list = list.filter(m => m.name.toLowerCase().includes(q));
        }

        if (salaSizeFilter !== 'all') {
            list = list.filter(m => m.size === parseInt(salaSizeFilter, 10));
        }

        if (salaSellableFilter === 'sellable') {
            list = list.filter(m => m.canBeSold === true);
        } else if (salaSellableFilter === 'not_sellable') {
            list = list.filter(m => m.canBeSold === false);
        }

        if (salaDuplicateFilter === 'duplicates') {
            list = list.filter(m => !m.isFirstInRoom);
        } else if (salaDuplicateFilter === 'unique') {
            list = list.filter(m => m.isFirstInRoom);
        } else if (salaDuplicateFilter === 'dup_unsellable') {
            list = list.filter(m => !m.isFirstInRoom && !m.canBeSold);
        } else if (salaDuplicateFilter === 'dup_sellable') {
            list = list.filter(m => !m.isFirstInRoom && m.canBeSold);
        }

        // Sorting
        list.sort((a, b) => {
            switch (salaSort) {
                case 'real_power_desc':
                    return (b.marginalImpact ?? b.realPower ?? 0) - (a.marginalImpact ?? a.realPower ?? 0);
                case 'real_power_asc':
                    return (a.marginalImpact ?? a.realPower ?? 0) - (b.marginalImpact ?? b.realPower ?? 0);
                case 'power_desc':
                    return b.power - a.power;
                case 'power_asc':
                    return a.power - b.power;
                case 'bonus_desc':
                    return b.bonus_percent - a.bonus_percent;
                case 'bonus_asc':
                    return a.bonus_percent - b.bonus_percent;
                case 'name_asc':
                    return a.name.localeCompare(b.name);
                case 'size_desc':
                    return b.size - a.size;
                case 'size_asc':
                    return a.size - b.size;
                case 'repeated_first':
                    if (a.isFirstInRoom === b.isFirstInRoom) return (b.marginalImpact ?? b.power) - (a.marginalImpact ?? a.power);
                    return a.isFirstInRoom ? 1 : -1;
                case 'sellable_first':
                    if (a.canBeSold === b.canBeSold) return (b.marginalImpact ?? b.power) - (a.marginalImpact ?? a.power);
                    return a.canBeSold ? -1 : 1;
                case 'not_sellable_first':
                    if (a.canBeSold === b.canBeSold) return (b.marginalImpact ?? b.power) - (a.marginalImpact ?? a.power);
                    return !a.canBeSold ? -1 : 1;
                default:
                    return (b.marginalImpact ?? b.realPower ?? 0) - (a.marginalImpact ?? a.realPower ?? 0);
            }
        });

        return list;
    }, [currentRoomStats.enrichedMiners, salaSearch, salaSizeFilter, salaSellableFilter, salaDuplicateFilter, salaSort]);

    // Filtered Inventory Miners (Sorted by marginal insertion impact on Total Real Power)
    const displayedInvMiners = useMemo(() => {
        let list = [...inventoryMiners];
        if (invSearch.trim()) {
            const q = invSearch.toLowerCase();
            list = list.filter(m => m.name.toLowerCase().includes(q));
        }
        if (invMarketFilter === 'sellable') {
            list = list.filter(m => m.canBeSold === true);
        } else if (invMarketFilter === 'not_sellable') {
            list = list.filter(m => m.canBeSold === false);
        }
        if (invSizeFilter !== 'all') {
            list = list.filter(m => m.size === parseInt(invSizeFilter, 10));
        }
        list.sort((a, b) => getInsertionImpact(b).impact - getInsertionImpact(a).impact);
        return list;
    }, [inventoryMiners, invSearch, invMarketFilter, invSizeFilter, currentRoomStats]);

    // Filtered Discard Miners (Sorted by marginal insertion impact on Total Real Power)
    const displayedDiscardMiners = useMemo(() => {
        let list = [...discardMiners];
        if (discardSearch.trim()) {
            const q = discardSearch.toLowerCase();
            list = list.filter(m => m.name.toLowerCase().includes(q));
        }
        if (discardMarketFilter === 'sellable') {
            list = list.filter(m => m.canBeSold === true);
        } else if (discardMarketFilter === 'not_sellable') {
            list = list.filter(m => m.canBeSold === false);
        }
        list.sort((a, b) => getInsertionImpact(b).impact - getInsertionImpact(a).impact);
        return list;
    }, [discardMiners, discardSearch, discardMarketFilter, currentRoomStats]);

    // Export room as JSON
    const handleExportRoom = () => {
        const data = {
            exportDate: new Date().toISOString(),
            stats: {
                minersCount: currentRoomStats.minersCount,
                totalCells: currentRoomStats.totalCells,
                maxCellsCapacity: currentRoomStats.maxCellsCapacity,
                availableCells: currentRoomStats.availableCells,
                poderBrutoGhs: currentRoomStats.poderBruto,
                bonusBrutoPercent: currentRoomStats.bonusBruto,
                poderRealGhs: currentRoomStats.poderReal
            },
            miners: salaMiners
        };

        const jsonStr = JSON.stringify(data, null, 2);
        navigator.clipboard.writeText(jsonStr);
        setCopiedAlert(true);
        setTimeout(() => setCopiedAlert(false), 2500);
    };

    return (
        <div className="space-y-8 animate-fade-in max-w-[1700px] w-full mx-auto px-2 sm:px-4 md:px-6 pb-24 font-sans">
            {/* Header */}
            <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 font-black text-xs uppercase tracking-widest">
                    <Sparkles size={14} /> Ferramenta de Otimização
                </div>
                <h1 className="font-display text-3xl md:text-5xl font-black text-slate-800 dark:text-white uppercase tracking-tight">
                    Organizador de Sala
                </h1>
                <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-sm">
                    Construa e compare o poder da sua sala, gerencie células ocupadas e livres, simule trocas com o inventário e visualize o <span className="font-bold text-blue-500">Poder Real</span> em tempo real!
                </p>
            </div>

            {/* Input Controls Bar */}
            <div className="bg-white dark:bg-dark-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    {/* User Link Input */}
                    <div className="md:col-span-5 flex gap-2">
                        <div className="relative flex-grow">
                            <input
                                type="text"
                                value={userLink}
                                onChange={(e) => setUserLink(e.target.value)}
                                placeholder="Link do Perfil ou ID RollerCoin (ex: RKFox)"
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                            <Search className="absolute left-3 top-3.5 text-slate-400" size={18} />
                        </div>
                        <button
                            onClick={handleLoadRoom}
                            disabled={loading}
                            className="px-5 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 whitespace-nowrap active:scale-95"
                        >
                            {loading ? <RefreshCw className="animate-spin" size={16} /> : <Download size={16} />}
                            Carregar Sala
                        </button>
                    </div>

                    {/* Custom Set Bonus Input Field */}
                    <div className="md:col-span-3 flex items-center gap-2 bg-slate-50 dark:bg-slate-900/80 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-inner">
                        <Award size={18} className="text-cyan-500 flex-shrink-0" />
                        <div className="flex-grow min-w-0">
                            <label className="block text-[9px] font-black uppercase text-slate-400 tracking-wider">
                                Bônus de Set (%)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={customSetBonus === 0 ? '' : customSetBonus}
                                onChange={(e) => setCustomSetBonus(parseFloat(e.target.value) || 0)}
                                placeholder="0.00 %"
                                className="w-full bg-transparent text-cyan-600 dark:text-cyan-400 font-mono font-black text-sm outline-none placeholder:text-slate-400"
                                title="Insira seu bônus de Sets para somar diretamente ao Bônus Bruto"
                            />
                        </div>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="md:col-span-4 flex flex-wrap items-center justify-end gap-2">
                        <button
                            onClick={() => setShowTextModal(true)}
                            className="px-3.5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
                        >
                            <Upload size={15} /> Importar Inv.
                        </button>
                        {initialRoomState && (
                            <button
                                onClick={handleRestoreInitialRoom}
                                className="px-3 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 active:scale-95"
                                title="Restaura a lista original da sala"
                            >
                                <RotateCcw size={15} /> Original
                            </button>
                        )}
                        <button
                            onClick={handleExportRoom}
                            className="px-3 py-3 bg-slate-800 dark:bg-slate-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
                            title="Copiar dados da sala atual em JSON"
                        >
                            {copiedAlert ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
                            {copiedAlert ? 'Copiado!' : 'Exportar'}
                        </button>
                        <button
                            onClick={() => setShowWelcomeAlert(true)}
                            className="px-3 py-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 active:scale-95 shadow-xs"
                            title="Ver avisos e limitações da ferramenta"
                        >
                            <AlertTriangle size={15} /> Avisos
                        </button>
                    </div>
                </div>

                {statusMessage && (
                    <div className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${statusMessage.type === 'success'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                        : statusMessage.type === 'error'
                            ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800'
                            : 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                        }`}>
                        <Info size={14} />
                        {statusMessage.text}
                    </div>
                )}
            </div>

            {/* Formula Banner & Real-time Live Stats Dashboard */}
            <div className="space-y-4">
                {/* Equation Card */}
                <div className="bg-gradient-to-r from-blue-900/90 via-slate-900 to-slate-900 text-white p-5 rounded-2xl border border-blue-500/30 shadow-xl relative overflow-hidden">
                    <div className="absolute -right-8 -top-8 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl border border-blue-400/20">
                                <Calculator size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-blue-400 tracking-wider">Equação Fundamental do Jogo</p>
                                <h2 className="text-xl md:text-2xl font-black font-mono text-white tracking-wide">
                                    Poder Real = Poder Bruto × (1 + Bônus)
                                </h2>
                            </div>
                        </div>
                        <div className="text-xs text-slate-300 bg-black/40 px-4 py-2 rounded-xl border border-white/10 text-center md:text-right">
                            <span className="text-slate-400 block text-[10px] uppercase font-bold">Fórmula matemática:</span>
                            <span className="font-mono text-cyan-300 font-bold">Poder Real = Poder(GH/s) × (1 + Bônus% / 100)</span>
                        </div>
                    </div>
                </div>

                {/* Real-time Metric Cards with Live Deltas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Card 1: Poder Bruto */}
                    <div className="bg-white dark:bg-dark-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Poder Bruto (Miners)</span>
                            <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-500">
                                <Zap size={16} />
                            </div>
                        </div>
                        <div className="text-xl md:text-2xl font-black text-slate-800 dark:text-white font-mono">
                            {formatPower(currentRoomStats.poderBruto)}
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                            {initialRoomState ? (
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold ${liveDeltas.deltaPoder > 0
                                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
                                    : liveDeltas.deltaPoder < 0
                                        ? 'bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400'
                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                                    }`}>
                                    {liveDeltas.deltaPoder > 0 ? <TrendingUp size={12} /> : liveDeltas.deltaPoder < 0 ? <TrendingDown size={12} /> : null}
                                    Δ {formatPower(liveDeltas.deltaPoder, true)} ({formatPctChange(liveDeltas.deltaPoderPct)})
                                </span>
                            ) : (
                                <span className="text-[10px] text-slate-400 font-medium">Soma das máquinas na sala</span>
                            )}
                        </div>
                    </div>

                    {/* Card 2: Bônus Bruto */}
                    <div className="bg-white dark:bg-dark-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Bônus Bruto (Miners + Sets)</span>
                                <div className="p-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-900/30 text-cyan-500">
                                    <Award size={16} />
                                </div>
                            </div>
                            <div className="text-xl md:text-2xl font-black text-cyan-600 dark:text-cyan-400 font-mono">
                                {(currentRoomStats.bonusBruto || 0).toFixed(2)}%
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold mt-1">
                                Únicas: <span className="text-slate-700 dark:text-slate-200">{(currentRoomStats.baseBonusBruto || 0).toFixed(2)}%</span> + Sets: <span className="text-cyan-500 font-black">+{(Number(customSetBonus) || 0).toFixed(2)}%</span>
                            </div>
                        </div>

                        <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            {initialRoomState ? (
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold ${liveDeltas.deltaBonus > 0
                                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
                                    : liveDeltas.deltaBonus < 0
                                        ? 'bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400'
                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                                    }`}>
                                    {liveDeltas.deltaBonus > 0 ? <TrendingUp size={12} /> : liveDeltas.deltaBonus < 0 ? <TrendingDown size={12} /> : null}
                                    Δ {formatBonusDelta(liveDeltas.deltaBonus)} ({formatPctChange(liveDeltas.deltaBonusPct)})
                                </span>
                            ) : (
                                <span className="text-[9px] text-slate-400">Total somado c/ sets</span>
                            )}
                        </div>
                    </div>

                    {/* Card 3: Poder Real (DESTAQUE) */}
                    <div className="bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent bg-white dark:bg-dark-800 p-5 rounded-2xl border-2 border-emerald-500/40 shadow-md relative overflow-hidden">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Poder Real Efetivo</span>
                            <div className="p-1.5 rounded-lg bg-emerald-500 text-white shadow-sm">
                                <Sparkles size={16} />
                            </div>
                        </div>
                        <div className="text-xl md:text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                            {formatPower(currentRoomStats.poderReal)}
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                            {initialRoomState ? (
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-black ${liveDeltas.deltaRealPower > 0
                                    ? 'bg-emerald-500 text-white shadow-sm'
                                    : liveDeltas.deltaRealPower < 0
                                        ? 'bg-red-500 text-white shadow-sm'
                                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-200'
                                    }`}>
                                    {liveDeltas.deltaRealPower > 0 ? <TrendingUp size={12} /> : liveDeltas.deltaRealPower < 0 ? <TrendingDown size={12} /> : null}
                                    Δ {formatPower(liveDeltas.deltaRealPower, true)} ({formatPctChange(liveDeltas.deltaRealPowerPct)})
                                </span>
                            ) : (
                                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Poder com bônus aplicado</span>
                            )}
                        </div>
                    </div>

                    {/* Card 4: Ocupação e Células da Sala */}
                    <div className="bg-white dark:bg-dark-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Células da Sala (Tempo Real)</span>
                            <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500">
                                <Grid3X3 size={16} />
                            </div>
                        </div>

                        {/* Cells Progress & Count */}
                        <div className="space-y-1.5">
                            <div className="flex items-baseline justify-between">
                                <div>
                                    <span className="text-xl font-black text-slate-800 dark:text-white font-mono">{currentRoomStats.totalCells}</span>
                                    <span className="text-xs text-slate-400 ml-1">/ {currentRoomStats.maxCellsCapacity || currentRoomStats.totalCells} cél.</span>
                                </div>
                                <div>
                                    {currentRoomStats.availableCells > 0 ? (
                                        <span className="text-xs font-black text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md flex items-center gap-1">
                                            <CheckCircle2 size={12} /> +{currentRoomStats.availableCells} Livres
                                        </span>
                                    ) : currentRoomStats.availableCells === 0 ? (
                                        <span className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                                            100% Ocupada
                                        </span>
                                    ) : (
                                        <span className="text-xs font-black text-red-500 bg-red-50 dark:bg-red-950/40 px-2 py-0.5 rounded-md flex items-center gap-1">
                                            <AlertCircle size={12} /> {Math.abs(currentRoomStats.availableCells)} Excedentes
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Progress bar */}
                            <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-300 ${currentRoomStats.totalCells <= currentRoomStats.maxCellsCapacity
                                        ? 'bg-emerald-500'
                                        : 'bg-red-500'
                                        }`}
                                    style={{ width: `${Math.min(currentRoomStats.occupationPct, 100)}%` }}
                                />
                            </div>
                        </div>

                        {/* Breakdown: 1C vs 2C & Negotiable */}
                        <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap justify-between items-center text-[10px] font-bold text-slate-500">
                            <span>{currentRoomStats.count1C}x 1C ({currentRoomStats.cells1C}c)</span>
                            <span>•</span>
                            <span>{currentRoomStats.count2C}x 2C ({currentRoomStats.cells2C}c)</span>
                            <span>•</span>
                            <span className="text-emerald-600 dark:text-emerald-400">{currentRoomStats.sellableCount} Vendíveis</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2-COLUMN MAIN WORKSPACE: SALA (50%) | INVENTÁRIO & DESCARTE (50%) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                {/* ========================================================================= */}
                {/* COLUMN 1: SALA (6 cols = 50% on desktop) */}
                {/* ========================================================================= */}
                <div className="col-span-12 lg:col-span-6 bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col min-h-[650px]">
                    {/* Header */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                                    <LayoutGrid size={18} />
                                </div>
                                <div>
                                    <h3 className="font-display font-black text-slate-800 dark:text-white uppercase tracking-tight text-base">
                                        SALA
                                    </h3>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">
                                        {currentRoomStats.minersCount} Miners • {currentRoomStats.totalCells} / {currentRoomStats.maxCellsCapacity} Células
                                        {currentRoomStats.availableCells > 0 && (
                                            <span className="text-emerald-500 font-black ml-1">({currentRoomStats.availableCells} livres)</span>
                                        )}
                                    </p>
                                </div>
                            </div>

                            {/* Batch Actions for Sala */}
                            {selectedSalaIds.size > 0 && (
                                <div className="flex items-center gap-1.5 animate-fade-in">
                                    <button
                                        onClick={handleBulkMoveSalaToInventory}
                                        className="px-2.5 py-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-700 dark:text-slate-200 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1"
                                        title="Mover selecionados para o Inventário"
                                    >
                                        <Package size={12} /> ({selectedSalaIds.size}) Inv.
                                    </button>
                                    <button
                                        onClick={handleBulkMoveSalaToDiscard}
                                        className="px-2.5 py-1.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1"
                                        title="Mover selecionados para o Descarte"
                                    >
                                        <Trash2 size={12} /> ({selectedSalaIds.size}) Descarte
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Search & Selection Bar */}
                        <div className="flex gap-2">
                            <div className="relative flex-grow">
                                <input
                                    type="text"
                                    value={salaSearch}
                                    onChange={(e) => setSalaSearch(e.target.value)}
                                    placeholder="Buscar miner na sala..."
                                    className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <Search className="absolute left-2.5 top-2.5 text-slate-400" size={14} />
                            </div>
                            <button
                                onClick={() => {
                                    if (selectedSalaIds.size === displayedSalaMiners.length) {
                                        setSelectedSalaIds(new Set());
                                    } else {
                                        setSelectedSalaIds(new Set(displayedSalaMiners.map(m => m.id)));
                                    }
                                }}
                                className="p-2 text-slate-500 hover:text-blue-500 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-1 text-xs font-bold"
                                title={selectedSalaIds.size === displayedSalaMiners.length ? "Desmarcar todos" : "Selecionar todos visíveis"}
                            >
                                {selectedSalaIds.size > 0 && selectedSalaIds.size === displayedSalaMiners.length ? <CheckSquare size={16} className="text-blue-500" /> : <Square size={16} />}
                            </button>
                        </div>

                        {/* Quick Smart Buttons for Duplicates */}
                        {(currentRoomStats.dupUnsellableCount > 0 || currentRoomStats.dupSellableCount > 0) && (
                            <div className="flex flex-wrap gap-1.5 pt-0.5">
                                {currentRoomStats.dupUnsellableCount > 0 && (
                                    <button
                                        onClick={handleDiscardUnsellableDuplicates}
                                        className="px-2 py-1 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1"
                                        title="Descartar repetidas que não podem ser vendidas no marketplace"
                                    >
                                        <Trash2 size={11} /> Descartar {currentRoomStats.dupUnsellableCount}x Inegociáveis (+0%)
                                    </button>
                                )}
                                {currentRoomStats.dupSellableCount > 0 && (
                                    <button
                                        onClick={handleMoveSellableDuplicatesToInventory}
                                        className="px-2 py-1 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 hover:text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1"
                                        title="Guardar no inventário as repetidas que podem ser vendidas no marketplace"
                                    >
                                        <ShoppingBag size={11} /> Guardar {currentRoomStats.dupSellableCount}x Vendíveis (+0%) no Inv.
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Sort Dropdown and Quick Filters */}
                        <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                            <div className="flex items-center gap-1 text-slate-500 font-bold">
                                <ArrowUpDown size={12} />
                                <span>Ordenar:</span>
                            </div>
                            <select
                                value={salaSort}
                                onChange={(e) => setSalaSort(e.target.value as SalaSortOption)}
                                className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option value="real_power_desc">Maior Poder Real (Efetivo)</option>
                                <option value="real_power_asc">Menor Poder Real</option>
                                <option value="power_desc">Maior Poder Bruto</option>
                                <option value="power_asc">Menor Poder Bruto</option>
                                <option value="bonus_desc">Maior Bônus %</option>
                                <option value="bonus_asc">Menor Bônus %</option>
                                <option value="repeated_first">Repetidos Primeiro (0% Bônus)</option>
                                <option value="not_sellable_first">Inegociáveis Primeiro</option>
                                <option value="sellable_first">Vendíveis Primeiro</option>
                                <option value="size_desc">2 Células Primeiro</option>
                                <option value="size_asc">1 Célula Primeiro</option>
                                <option value="name_asc">Nome (A - Z)</option>
                            </select>

                            {/* Size filter */}
                            <select
                                value={salaSizeFilter}
                                onChange={(e) => setSalaSizeFilter(e.target.value as any)}
                                className="px-2 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs outline-none"
                            >
                                <option value="all">Todas Células</option>
                                <option value="1">Apenas 1 Célula</option>
                                <option value="2">Apenas 2 Células</option>
                            </select>

                            {/* Market filter */}
                            <select
                                value={salaSellableFilter}
                                onChange={(e) => setSalaSellableFilter(e.target.value as any)}
                                className="px-2 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs outline-none"
                            >
                                <option value="all">Negociabilidade (Todas)</option>
                                <option value="sellable">Apenas Vendíveis</option>
                                <option value="not_sellable">Apenas Inegociáveis</option>
                            </select>

                            {/* Duplicates filter */}
                            <select
                                value={salaDuplicateFilter}
                                onChange={(e) => setSalaDuplicateFilter(e.target.value as any)}
                                className="px-2 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs outline-none"
                            >
                                <option value="all">Todos os Itens</option>
                                <option value="unique">Apenas Únicos</option>
                                <option value="duplicates">Apenas Repetidos</option>
                                <option value="dup_unsellable">Repetidos Inegociáveis</option>
                                <option value="dup_sellable">Repetidos Vendíveis</option>
                            </select>
                        </div>
                    </div>

                    {/* Miners List in Sala */}
                    <div className="flex-grow overflow-y-auto max-h-[750px] divide-y divide-slate-100 dark:divide-slate-800/50 p-2">
                        {displayedSalaMiners.length === 0 ? (
                            <div className="py-24 text-center text-slate-400 space-y-3">
                                <LayoutGrid size={40} className="mx-auto opacity-30" />
                                <p className="text-xs font-bold uppercase tracking-wider">Nenhum minerador na Sala</p>
                                <p className="text-[11px] text-slate-500">Carregue um perfil acima ou adicione itens do inventário.</p>
                            </div>
                        ) : (
                            displayedSalaMiners.map((miner) => {
                                const isSelected = selectedSalaIds.has(miner.id);
                                return (
                                    <div
                                        key={miner.id}
                                        className={`p-3 rounded-xl transition-all flex items-center justify-between gap-3 group hover:bg-slate-50 dark:hover:bg-slate-800/40 ${isSelected ? 'bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800' : ''
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            {/* Checkbox */}
                                            <button
                                                onClick={() => {
                                                    const next = new Set(selectedSalaIds);
                                                    if (next.has(miner.id)) next.delete(miner.id);
                                                    else next.add(miner.id);
                                                    setSelectedSalaIds(next);
                                                }}
                                                className="text-slate-300 hover:text-blue-500 transition-colors"
                                            >
                                                {isSelected ? <CheckSquare size={16} className="text-blue-500" /> : <Square size={16} />}
                                            </button>

                                            {/* Image */}
                                            <div className="w-11 h-11 bg-slate-100 dark:bg-slate-800 rounded-lg p-1 flex-shrink-0 flex items-center justify-center relative">
                                                <img
                                                    src={`https://static.rollercoin.com/static/img/market/miners/${miner.filename}.gif?v=1`}
                                                    alt={miner.name}
                                                    onError={(e) => {
                                                        (e.target as HTMLElement).style.display = 'none';
                                                    }}
                                                    className="w-full h-full object-contain"
                                                />
                                                <span className={`absolute -bottom-1 -right-1 text-[8px] font-black px-1 rounded ${miner.size === 1 ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-white'}`} title={`${miner.size} Célula(s)`}>
                                                    {miner.size}C
                                                </span>
                                            </div>

                                            {/* Info */}
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-1.5 flex-wrap">
                                                    <span className="font-bold text-xs text-slate-800 dark:text-white truncate" title={miner.name}>
                                                        {miner.name}
                                                    </span>

                                                    {miner.level > 0 && (
                                                        <span className="text-[7px] font-black px-1 rounded bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300">
                                                            Lvl {miner.level}
                                                        </span>
                                                    )}

                                                    {/* Market Status Badge */}
                                                    {miner.canBeSold ? (
                                                        <span className="inline-flex items-center gap-0.5 text-[8px] font-black uppercase px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400" title="Item negociável no Marketplace">
                                                            <ShoppingBag size={9} /> Vendível
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-0.5 text-[8px] font-black uppercase px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400" title="Item inegociável">
                                                            <Lock size={9} /> Inegociável
                                                        </span>
                                                    )}

                                                    {/* Duplicate Status Badge */}
                                                    {!miner.isFirstInRoom && (
                                                        <span className="text-[8px] font-black uppercase px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400" title="Item repetido não gera bônus na sala">
                                                            Repetido (+0%)
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex items-center gap-2 text-[10px] mt-0.5 font-mono flex-wrap">
                                                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                                                        {formatPower(miner.power)}
                                                    </span>
                                                    <span className="text-slate-400">•</span>
                                                    <span className={`font-bold ${miner.isFirstInRoom ? 'text-cyan-500' : 'text-slate-400 line-through'}`}>
                                                        +{miner.bonus_percent}% Bônus
                                                    </span>
                                                    <span className="text-slate-400">•</span>
                                                    <span
                                                        className="font-mono font-black text-rose-500 dark:text-rose-400"
                                                        title="Impacto no Poder Total: Poder que será reduzido de toda a conta se você retirar esta máquina da sala"
                                                    >
                                                        Impacto: -{formatPower(miner.marginalImpact || 0)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action buttons */}
                                        <div className="flex items-center gap-1 opacity-90 group-hover:opacity-100 flex-shrink-0">
                                            <button
                                                onClick={() => handleMoveSalaToInventory(miner.id)}
                                                className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                                                title={miner.canBeSold ? "Guardar no Inventário (Recomendado para vender)" : "Mover para o Inventário"}
                                            >
                                                <Package size={15} />
                                            </button>
                                            <button
                                                onClick={() => handleMoveSalaToDiscard(miner.id)}
                                                className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                                                title={!miner.canBeSold ? "Mover para Descarte (Inegociável)" : "Mover para o Descarte"}
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* ========================================================================= */}
                {/* COLUMN 2: INVENTÁRIO / DESCARTE (6 cols = 50% on desktop) */}
                {/* ========================================================================= */}
                <div className="col-span-12 lg:col-span-6 bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col min-h-[650px]">
                    {/* Header with Segmented Tab Switcher */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 space-y-3">
                        <div className="flex items-center justify-between gap-3 flex-wrap">
                            {/* Segmented Pills */}
                            <div className="p-1 bg-slate-200/80 dark:bg-slate-800 rounded-xl flex items-center gap-1">
                                <button
                                    onClick={() => setRightPanelTab('inventory')}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${rightPanelTab === 'inventory'
                                        ? 'bg-white dark:bg-dark-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                                        }`}
                                >
                                    <Package size={15} />
                                    <span>Inventário</span>
                                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                                        {inventoryMiners.reduce((acc, m) => acc + (m.quantity || 1), 0)}
                                    </span>
                                </button>

                                <button
                                    onClick={() => setRightPanelTab('discard')}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${rightPanelTab === 'discard'
                                        ? 'bg-white dark:bg-dark-700 text-red-500 shadow-sm'
                                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                                        }`}
                                >
                                    <Trash2 size={15} />
                                    <span>Descarte</span>
                                    {discardMiners.length > 0 && (
                                        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-red-500 text-white font-mono font-black animate-pulse">
                                            {discardMiners.length}
                                        </span>
                                    )}
                                </button>
                            </div>

                            {/* Right Action Button */}
                            {rightPanelTab === 'inventory' ? (
                                <button
                                    onClick={() => setShowTextModal(true)}
                                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                                    title="Colar texto copiado do RollerCoin"
                                >
                                    <Upload size={14} /> + Colar Texto
                                </button>
                            ) : (
                                discardMiners.length > 0 && (
                                    <button
                                        onClick={() => setDiscardMiners([])}
                                        className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5"
                                        title="Limpar todos os itens do descarte"
                                    >
                                        <Trash2 size={14} /> Esvaziar Descarte
                                    </button>
                                )
                            )}
                        </div>

                        {/* Search & Filters based on selected tab */}
                        {rightPanelTab === 'inventory' ? (
                            <div className="space-y-2">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={invSearch}
                                        onChange={(e) => setInvSearch(e.target.value)}
                                        placeholder="Buscar no inventário..."
                                        className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                    <Search className="absolute left-2.5 top-2.5 text-slate-400" size={14} />
                                </div>

                                <div className="flex gap-2">
                                    <select
                                        value={invMarketFilter}
                                        onChange={(e) => setInvMarketFilter(e.target.value as any)}
                                        className="w-1/2 px-2 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-[11px] outline-none"
                                    >
                                        <option value="all">Todas as Miners</option>
                                        <option value="sellable">Apenas Vendíveis</option>
                                        <option value="not_sellable">Apenas Inegociáveis</option>
                                    </select>

                                    <select
                                        value={invSizeFilter}
                                        onChange={(e) => setInvSizeFilter(e.target.value as any)}
                                        className="w-1/2 px-2 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-[11px] outline-none"
                                    >
                                        <option value="all">Qualquer Tamanho</option>
                                        <option value="1">1 Célula</option>
                                        <option value="2">2 Células</option>
                                    </select>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={discardSearch}
                                        onChange={(e) => setDiscardSearch(e.target.value)}
                                        placeholder="Buscar no descarte..."
                                        className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                    <Search className="absolute left-2.5 top-2.5 text-slate-400" size={14} />
                                </div>

                                <select
                                    value={discardMarketFilter}
                                    onChange={(e) => setDiscardMarketFilter(e.target.value as any)}
                                    className="w-full px-2 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-[11px] outline-none"
                                >
                                    <option value="all">Todos os Itens Descartados</option>
                                    <option value="sellable">Apenas Vendíveis</option>
                                    <option value="not_sellable">Apenas Inegociáveis</option>
                                </select>
                            </div>
                        )}
                    </div>

                    {/* Miners List Content */}
                    <div className="flex-grow overflow-y-auto max-h-[750px] divide-y divide-slate-100 dark:divide-slate-800/50 p-2">
                        {rightPanelTab === 'inventory' ? (
                            displayedInvMiners.length === 0 ? (
                                <div className="py-24 text-center text-slate-400 space-y-3">
                                    <Package size={36} className="mx-auto opacity-30" />
                                    <p className="text-xs font-bold uppercase tracking-wider">Inventário Vazio</p>
                                    <button
                                        onClick={() => setShowTextModal(true)}
                                        className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-lg text-xs font-black uppercase tracking-wider transition-all"
                                    >
                                        + Colar Texto
                                    </button>
                                </div>
                            ) : (
                                displayedInvMiners.map((miner) => {
                                    const { impact, givesBonus } = getInsertionImpact(miner);
                                    return (
                                        <div
                                            key={miner.id}
                                            className="p-3 rounded-xl transition-all flex items-center justify-between gap-2.5 group hover:bg-slate-50 dark:hover:bg-slate-800/40"
                                        >
                                            <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg p-1 flex-shrink-0 flex items-center justify-center relative">
                                                    <img
                                                        src={`https://static.rollercoin.com/static/img/market/miners/${miner.filename}.gif?v=1`}
                                                        alt=""
                                                        onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                                                        className="w-full h-full object-contain"
                                                    />
                                                    <span className="absolute -bottom-1 -right-1 text-[8px] font-black px-1 rounded bg-emerald-600 text-white shadow-xs">
                                                        x{miner.quantity || 1}
                                                    </span>
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center gap-1.5 flex-wrap">
                                                        <span className="font-bold text-xs text-slate-800 dark:text-white truncate" title={miner.name}>
                                                            {miner.name}
                                                        </span>
                                                        <span className={`text-[7px] font-black px-1 py-0.2 rounded ${miner.size === 1 ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300' : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300'}`}>
                                                            {miner.size}C
                                                        </span>
                                                        {miner.level > 0 ? (
                                                            <span className="text-[7px] font-black px-1 rounded bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300">
                                                                Lvl {miner.level}
                                                            </span>
                                                        ) : miner.hasEstimatedLevel ? (
                                                            <span className="text-[7px] font-black px-1 rounded bg-amber-100 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400" title="Nível estimado">
                                                                Nvl Est.
                                                            </span>
                                                        ) : null}
                                                        {miner.canBeSold ? (
                                                            <span className="text-[7px] font-black px-1 rounded bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400">
                                                                Vendível
                                                            </span>
                                                        ) : (
                                                            <span className="text-[7px] font-black px-1 rounded bg-slate-100 text-slate-400 dark:bg-slate-800">
                                                                Ineg.
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center gap-1.5 text-[10px] mt-0.5 font-mono text-slate-500 flex-wrap">
                                                        <span className="font-bold text-slate-700 dark:text-slate-300">{formatPower(miner.power)}</span>
                                                        <span>•</span>
                                                        <span className={givesBonus ? "text-cyan-500 font-bold" : "text-slate-400 font-bold"} title={givesBonus ? "Bônus ativo novo para a sala" : "Máquina repetida na sala (+0% bônus)"}>
                                                            {givesBonus ? `+${miner.bonus_percent}%` : '+0%'}
                                                        </span>
                                                        <span>•</span>
                                                        <span
                                                            className="font-black text-emerald-600 dark:text-emerald-400"
                                                            title="Impacto no Poder Total: Ganho real que será somado à conta ao colocar esta máquina na sala"
                                                        >
                                                            Impacto: +{formatPower(impact)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action buttons */}
                                            <div className="flex items-center gap-1 flex-shrink-0">
                                                <button
                                                    onClick={() => handleMoveInventoryToSala(miner.id, 1)}
                                                    className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition-all shadow-sm active:scale-95 whitespace-nowrap"
                                                    title={`Colocar 1 unidade na Sala (Ocupará ${miner.size} célula(s))`}
                                                >
                                                    +1 Sala
                                                </button>
                                                {(miner.quantity || 1) > 1 && (
                                                    <button
                                                        onClick={() => handleMoveInventoryToSala(miner.id, miner.quantity || 1)}
                                                        className="px-2 py-1 bg-slate-200 dark:bg-slate-700 hover:bg-blue-600 hover:text-white text-slate-700 dark:text-slate-200 rounded-lg text-[9px] font-black uppercase transition-all whitespace-nowrap"
                                                        title="Colocar todas as unidades na Sala"
                                                    >
                                                        Todos
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleMoveInventoryToDiscard(miner.id, 1)}
                                                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                                                    title="Descartar 1 unidade"
                                                >
                                                    <Trash2 size={13} />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                            )
                        ) : (
                            displayedDiscardMiners.length === 0 ? (
                                <div className="py-24 text-center text-slate-400 space-y-3">
                                    <Trash2 size={36} className="mx-auto opacity-30" />
                                    <p className="text-xs font-bold uppercase tracking-wider">Descarte Vazio</p>
                                    <p className="text-[11px] text-slate-500">Miners removidos da sala aparecerão aqui.</p>
                                </div>
                            ) : (
                                displayedDiscardMiners.map((miner) => {
                                    const { impact, givesBonus } = getInsertionImpact(miner);
                                    return (
                                        <div
                                            key={miner.id}
                                            className="p-3 rounded-xl transition-all flex items-center justify-between gap-2.5 group hover:bg-slate-50 dark:hover:bg-slate-800/40"
                                        >
                                            <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg p-1 flex-shrink-0 flex items-center justify-center opacity-70 relative">
                                                    <img
                                                        src={`https://static.rollercoin.com/static/img/market/miners/${miner.filename}.gif?v=1`}
                                                        alt=""
                                                        onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                                                        className="w-full h-full object-contain"
                                                    />
                                                    <span className="absolute -bottom-1 -right-1 text-[7px] font-black px-1 rounded bg-slate-700 text-white">
                                                        {miner.size}C
                                                    </span>
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center gap-1 flex-wrap">
                                                        <span className="font-bold text-xs text-slate-800 dark:text-white truncate" title={miner.name}>
                                                            {miner.name}
                                                        </span>
                                                        {miner.level > 0 && (
                                                            <span className="text-[7px] font-black px-1 rounded bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300">
                                                                Lvl {miner.level}
                                                            </span>
                                                        )}
                                                        {miner.canBeSold ? (
                                                            <span className="text-[7px] font-black px-1 rounded bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400">
                                                                Vendível
                                                            </span>
                                                        ) : (
                                                            <span className="text-[7px] font-black px-1 rounded bg-slate-100 text-slate-400 dark:bg-slate-800">
                                                                Ineg.
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono mt-0.5 flex-wrap">
                                                        <span>{formatPower(miner.power)}</span>
                                                        <span>•</span>
                                                        <span className={givesBonus ? "text-cyan-500 font-bold" : "text-slate-400 font-bold"}>
                                                            {givesBonus ? `+${miner.bonus_percent}%` : '+0%'}
                                                        </span>
                                                        <span>•</span>
                                                        <span
                                                            className="font-black text-emerald-600 dark:text-emerald-400"
                                                            title="Impacto no Poder Total: Ganho real que será somado à conta ao resgatar para a sala"
                                                        >
                                                            Impacto: +{formatPower(impact)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action buttons */}
                                            <div className="flex items-center gap-1 flex-shrink-0">
                                                <button
                                                    onClick={() => handleMoveDiscardToSala(miner.id)}
                                                    className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition-all shadow-sm active:scale-95 whitespace-nowrap"
                                                    title="Restaurar para a Sala"
                                                >
                                                    + Sala
                                                </button>
                                                <button
                                                    onClick={() => handleMoveDiscardToInventory(miner.id)}
                                                    className="p-1.5 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                                                    title="Mover para o Inventário"
                                                >
                                                    <Package size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                            )
                        )}
                    </div>
                </div>
            </div>

            {/* MODAL: Import Inventory Text */}
            {showTextModal && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white dark:bg-dark-800 rounded-2xl max-w-2xl w-full p-6 space-y-4 border border-slate-200 dark:border-slate-700 shadow-2xl animate-scale-up">
                        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
                            <div className="flex items-center gap-2">
                                <Package className="text-emerald-500" size={20} />
                                <h3 className="font-display font-black text-slate-800 dark:text-white uppercase text-base">
                                    Importar Inventário via Texto
                                </h3>
                            </div>
                            <button
                                onClick={() => setShowTextModal(false)}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold"
                            >
                                ✕
                            </button>
                        </div>

                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Abra sua página de armazenamento/inventário no RollerCoin (<span className="font-mono text-blue-500">Storage &gt; Inventory &gt; Miners</span>), selecione o texto da lista (<kbd className="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-[10px]">Ctrl + A</kbd> ou selecione os mineradores), copie e cole no campo abaixo:
                        </p>

                        <textarea
                            rows={10}
                            value={inventoryRawText}
                            onChange={(e) => setInventoryRawText(e.target.value)}
                            placeholder="Cole o texto do inventário aqui... Exemplo:
Shamaniac
Set
Size:
2 Cells
Power
820.240 Th/s
Bonus
1 %
Quantity:
1
Can't be sold
Miner details
..."
                            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-xs outline-none focus:ring-2 focus:ring-emerald-500 resize-none custom-scrollbar"
                        />

                        <div className="flex items-center justify-between gap-3 pt-2">
                            <button
                                onClick={() => setInventoryRawText('')}
                                className="px-4 py-2 text-slate-500 hover:text-red-500 text-xs font-bold uppercase transition-colors"
                            >
                                Limpar
                            </button>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowTextModal(false)}
                                    className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold uppercase rounded-xl transition-all"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleProcessInventory}
                                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
                                >
                                    Processar e Adicionar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL: Welcome & Important Warnings */}
            {showWelcomeAlert && (
                <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white dark:bg-dark-800 rounded-3xl max-w-xl w-full p-6 space-y-5 border border-amber-500/40 dark:border-amber-500/30 shadow-2xl animate-scale-up">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-amber-500/10 text-amber-500 rounded-2xl">
                                    <AlertTriangle size={24} />
                                </div>
                                <div>
                                    <h3 className="font-display font-black text-slate-900 dark:text-white uppercase tracking-tight text-base sm:text-lg flex items-center gap-2">
                                        Avisos Importantes
                                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300">
                                            Experimental
                                        </span>
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Leia atentamente antes de utilizar a ferramenta de organização.
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowWelcomeAlert(false)}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg font-bold p-1 transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Warning Points Grid */}
                        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar text-xs">
                            {/* Point 1: Ferramenta Experimental */}
                            <div className="p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/40 flex items-start gap-3">
                                <div className="p-1.5 bg-amber-500 text-white rounded-lg flex-shrink-0 mt-0.5 shadow-xs">
                                    <Sparkles size={14} />
                                </div>
                                <div className="space-y-0.5">
                                    <h4 className="font-bold text-amber-900 dark:text-amber-200">1. Ferramenta em Fase Experimental</h4>
                                    <p className="text-amber-800/90 dark:text-amber-300/80 leading-relaxed">
                                        Esta ferramenta é um modelo experimental de auxílio para simulação de posicionamento. Sempre confira os números finais no RollerCoin.
                                    </p>
                                </div>
                            </div>

                            {/* Point 2: Inventário e Repetidas */}
                            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
                                <div className="p-1.5 bg-emerald-500 text-white rounded-lg flex-shrink-0 mt-0.5 shadow-xs">
                                    <Package size={14} />
                                </div>
                                <div className="space-y-0.5">
                                    <h4 className="font-bold text-slate-900 dark:text-white">2. Inventário & Miners Repetidas</h4>
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                        O texto copiado do inventário do jogo não informa o nível de merge. Portanto, o inventário <strong>não consegue ignorar o bônus de miners, caso sejam repetidas</strong>.
                                    </p>
                                </div>
                            </div>

                            {/* Point 3: Bônus de Racks */}
                            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
                                <div className="p-1.5 bg-indigo-500 text-white rounded-lg flex-shrink-0 mt-0.5 shadow-xs">
                                    <Grid3X3 size={14} />
                                </div>
                                <div className="space-y-0.5">
                                    <h4 className="font-bold text-slate-900 dark:text-white">3. Cuidado com o Bônus de Racks</h4>
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                        Os bônus específicos concedidos individualmente pelas estantes (racks) <strong>não são considerados no cálculo</strong> desta ferramenta. Leve em conta onde cada miner será instalada.
                                    </p>
                                </div>
                            </div>

                            {/* Point 4: Bônus de Set */}
                            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
                                <div className="p-1.5 bg-cyan-500 text-white rounded-lg flex-shrink-0 mt-0.5 shadow-xs">
                                    <Award size={14} />
                                </div>
                                <div className="space-y-0.5">
                                    <h4 className="font-bold text-slate-900 dark:text-white">4. Remoção de Miner Pertencente a Set</h4>
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                        Se você remover da sala uma miner que faça parte de um Set ativo e for quebrar o conjunto, lembre-se de <strong>reduzir manualmente o valor</strong> no campo <em>"Bônus de Set (%)"</em> no topo da página.
                                    </p>
                                </div>
                            </div>

                            {/* Point 5: Negociabilidade de Miners */}
                            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
                                <div className="p-1.5 bg-rose-500 text-white rounded-lg flex-shrink-0 mt-0.5 shadow-xs">
                                    <ShoppingBag size={14} />
                                </div>
                                <div className="space-y-0.5">
                                    <h4 className="font-bold text-slate-900 dark:text-white">5. Identificação de Itens Negociáveis / Inegociáveis</h4>
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                        Ainda não está sendo possível definir com precisão absoluta quais miners são negociáveis ou inegociáveis. Trate essa indicação como estimativa preliminar.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer Button */}
                        <div className="pt-2">
                            <button
                                onClick={() => setShowWelcomeAlert(false)}
                                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-amber-500/25 transition-all active:scale-98 flex items-center justify-center gap-2"
                            >
                                <Check size={16} /> Entendi e Quero Continuar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
