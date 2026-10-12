import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
    SheetMinerTier,
    SheetMinerData,
    useSheetDatabase,
    isMinerSellable,
    findSheetMiner,
    isSellableStatus
} from '../utils/sheetDatabase';

export type { SheetMinerTier, SheetMinerData };
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
    FileSpreadsheet,
    FileText,
    MapPin,
    X,
    Wand2
} from 'lucide-react';

export interface OrganizerMiner {
    id: string; // ID único da instância
    miner_id?: string; // ID RollerCoin se disponível
    name: string;
    level: number; // 0 = básico/comum, 1 = incomum/I, 2 = raro/II, 3 = épico/III, etc.
    size: number; // 1 ou 2 células
    power: number; // Em GH/s
    bonus_percent: number; // Bônus individual %
    filename: string;
    canBeSold?: boolean;
    source: 'room' | 'inventory' | 'custom';
    quantity?: number;
    isFirstInRoom?: boolean; // Se fornece bônus ativo na sala
    activeBonus?: number;
    realPower?: number;
    marginalImpact?: number; // Impacto real na conta (GH/s)
    rack_info?: string;
    hasEstimatedLevel?: boolean; // Nível estimado via parser (não catalogado na planilha)
    isLegacyStar?: boolean; // Minerador antigo de nível único com badge de estrela
    room_level?: number;
    rack_x?: number;
    rack_y?: number;
    location_label?: string;
}

// SheetMinerTier & SheetMinerData imported from utils/sheetDatabase

export type SalaSortOption =
    | 'real_power_desc'
    | 'real_power_asc'
    | 'mais_poder_menos_bonus'
    | 'mais_bonus_menos_poder'
    | 'power_desc'
    | 'power_asc'
    | 'bonus_desc'
    | 'bonus_asc'
    | 'name_asc';

export type InvSortOption = SalaSortOption;

export type AutoOptimizationTarget = 'power' | 'bonus' | 'real_power';

export interface LeagueCapTier {
    name: string;
    numeral: string;
    value: string;
    unit: 'PH' | 'EH' | 'ZH';
    tooltip: string;
}

export interface LeagueCapPreset {
    id: string;
    leagueName: string;
    badgeBg: string;
    containerBg: string;
    activeBtn: string;
    idleBtn: string;
    tiers: LeagueCapTier[];
}

export const LEAGUE_CAP_PRESETS: LeagueCapPreset[] = [
    {
        id: 'bronze',
        leagueName: 'Bronze',
        badgeBg: 'bg-amber-900/15 text-amber-800 dark:text-amber-300 border-amber-700/40',
        containerBg: 'bg-amber-950/5 dark:bg-amber-950/25 border-amber-800/25 dark:border-amber-800/40',
        activeBtn: 'bg-gradient-to-r from-amber-700 to-amber-600 text-white shadow-xs ring-1 ring-amber-400 font-black',
        idleBtn: 'bg-white/90 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 border-amber-300/60 dark:border-amber-800/60 hover:bg-amber-100/70 dark:hover:bg-amber-900/40',
        tiers: [
            { name: 'Teto da Bronze 1', numeral: 'I', value: '24,999', unit: 'PH', tooltip: 'Teto da Bronze 1 (Bronze I: 24,999 PH/s)' },
            { name: 'Teto da Bronze 2', numeral: 'II', value: '49,999', unit: 'PH', tooltip: 'Teto da Bronze 2 (Bronze II: 49,999 PH/s)' },
            { name: 'Teto da Bronze 3', numeral: 'III', value: '99,999', unit: 'PH', tooltip: 'Teto da Bronze 3 (Bronze III: 99,999 PH/s)' },
        ]
    },
    {
        id: 'prata',
        leagueName: 'Prata',
        badgeBg: 'bg-slate-200/80 dark:bg-slate-700/60 text-slate-700 dark:text-slate-200 border-slate-400/50 dark:border-slate-600',
        containerBg: 'bg-slate-100/60 dark:bg-slate-800/30 border-slate-300/70 dark:border-slate-700/50',
        activeBtn: 'bg-gradient-to-r from-slate-600 to-slate-500 text-white shadow-xs ring-1 ring-slate-300 font-black',
        idleBtn: 'bg-white/90 dark:bg-slate-800/70 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:bg-slate-200/60 dark:hover:bg-slate-700/70',
        tiers: [
            { name: 'Teto da Prata 1', numeral: 'I', value: '149,999', unit: 'PH', tooltip: 'Teto da Prata 1 (Silver I: 149,999 PH/s)' },
            { name: 'Teto da Prata 2', numeral: 'II', value: '249,999', unit: 'PH', tooltip: 'Teto da Prata 2 (Silver II: 249,999 PH/s)' },
            { name: 'Teto da Prata 3', numeral: 'III', value: '649,999', unit: 'PH', tooltip: 'Teto da Prata 3 (Silver III: 649,999 PH/s)' },
        ]
    },
    {
        id: 'ouro',
        leagueName: 'Ouro',
        badgeBg: 'bg-yellow-500/20 text-yellow-800 dark:text-yellow-300 border-yellow-500/40',
        containerBg: 'bg-yellow-500/5 dark:bg-yellow-950/20 border-yellow-500/25 dark:border-yellow-700/30',
        activeBtn: 'bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-950 shadow-xs ring-1 ring-yellow-300 font-black',
        idleBtn: 'bg-white/90 dark:bg-yellow-950/30 text-yellow-900 dark:text-yellow-200 border-yellow-400/60 dark:border-yellow-800/60 hover:bg-yellow-100/70 dark:hover:bg-yellow-900/40',
        tiers: [
            { name: 'Teto da Ouro 1', numeral: 'I', value: '1,499', unit: 'EH', tooltip: 'Teto da Ouro 1 (Gold I: 1,499 EH/s)' },
            { name: 'Teto da Ouro 2', numeral: 'II', value: '3,499', unit: 'EH', tooltip: 'Teto da Ouro 2 (Gold II: 3,499 EH/s)' },
            { name: 'Teto da Ouro 3', numeral: 'III', value: '15,999', unit: 'EH', tooltip: 'Teto da Ouro 3 (Gold III: 15,999 EH/s)' },
        ]
    },
    {
        id: 'platina',
        leagueName: 'Platina',
        badgeBg: 'bg-cyan-100/80 dark:bg-cyan-950/40 text-cyan-800 dark:text-cyan-200 border-cyan-300/70 dark:border-cyan-700/60',
        containerBg: 'bg-cyan-50/50 dark:bg-cyan-950/20 border-cyan-200/60 dark:border-cyan-800/30',
        activeBtn: 'bg-gradient-to-r from-cyan-600 to-slate-600 text-white shadow-xs ring-1 ring-cyan-300 font-black',
        idleBtn: 'bg-white/90 dark:bg-slate-800/60 text-cyan-900 dark:text-cyan-200 border-cyan-300/60 dark:border-cyan-800/60 hover:bg-cyan-100/60 dark:hover:bg-cyan-900/30',
        tiers: [
            { name: 'Teto da Platina 1', numeral: 'I', value: '49,999', unit: 'EH', tooltip: 'Teto da Platina 1 (Platinum I: 49,999 EH/s)' },
            { name: 'Teto da Platina 2', numeral: 'II', value: '99,999', unit: 'EH', tooltip: 'Teto da Platina 2 (Platinum II: 99,999 EH/s)' },
            { name: 'Teto da Platina 3', numeral: 'III', value: '199,999', unit: 'EH', tooltip: 'Teto da Platina 3 (Platinum III: 199,999 EH/s)' },
        ]
    },
    {
        id: 'diamante',
        leagueName: 'Diamante',
        badgeBg: 'bg-sky-500/15 text-sky-800 dark:text-sky-300 border-sky-400/40',
        containerBg: 'bg-sky-500/5 dark:bg-sky-950/20 border-sky-400/25 dark:border-sky-700/30',
        activeBtn: 'bg-gradient-to-r from-sky-500 to-cyan-500 text-slate-950 shadow-xs ring-1 ring-sky-300 font-black',
        idleBtn: 'bg-white/90 dark:bg-sky-950/30 text-sky-900 dark:text-sky-200 border-sky-300/60 dark:border-sky-800/60 hover:bg-sky-100/60 dark:hover:bg-sky-900/40',
        tiers: [
            { name: 'Teto da Diamante 1', numeral: 'I', value: '374,999', unit: 'EH', tooltip: 'Teto da Diamante 1 (Diamond I: 374,999 EH/s)' },
            { name: 'Teto da Diamante 2', numeral: 'II', value: '649,999', unit: 'EH', tooltip: 'Teto da Diamante 2 (Diamond II: 649,999 EH/s)' },
            { name: 'Teto da Diamante 3', numeral: 'III', value: '1,149', unit: 'ZH', tooltip: 'Teto da Diamante 3 (Diamond III: 1,149 ZH/s)' },
        ]
    },
    {
        id: 'titan',
        leagueName: 'Titan',
        badgeBg: 'bg-rose-500/15 text-rose-800 dark:text-rose-300 border-rose-500/40',
        containerBg: 'bg-rose-500/5 dark:bg-rose-950/20 border-rose-500/25 dark:border-rose-700/30',
        activeBtn: 'bg-gradient-to-r from-rose-600 to-orange-500 text-white shadow-xs ring-1 ring-rose-300 font-black',
        idleBtn: 'bg-white/90 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200 border-rose-300/60 dark:border-rose-800/60 hover:bg-rose-100/60 dark:hover:bg-rose-900/40',
        tiers: [
            { name: 'Teto da Titan 1', numeral: 'I', value: '2,159', unit: 'ZH', tooltip: 'Teto da Titan 1 (Titan I: 2,159 ZH/s)' },
            { name: 'Teto da Titan 2', numeral: 'II', value: '3,999', unit: 'ZH', tooltip: 'Teto da Titan 2 (Titan II: 3,999 ZH/s)' },
            { name: 'Teto da Titan 3', numeral: 'III', value: '12,999', unit: 'ZH', tooltip: 'Teto da Titan 3 (Titan III: 12,999 ZH/s)' },
        ]
    },
    {
        id: 'esmeralda',
        leagueName: 'Esmeralda',
        badgeBg: 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/40',
        containerBg: 'bg-emerald-500/5 dark:bg-emerald-950/20 border-emerald-500/25 dark:border-emerald-700/30',
        activeBtn: 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-xs ring-1 ring-emerald-300 font-black',
        idleBtn: 'bg-white/90 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 border-emerald-300/60 dark:border-emerald-800/60 hover:bg-emerald-100/60 dark:hover:bg-emerald-900/40',
        tiers: [
            { name: 'Teto da Esmeralda 1', numeral: 'I', value: '24,999', unit: 'ZH', tooltip: 'Teto da Esmeralda 1 (Emerald I: 24,999 ZH/s)' },
            { name: 'Teto da Esmeralda 2', numeral: 'II', value: '69,999', unit: 'ZH', tooltip: 'Teto da Esmeralda 2 (Emerald II: 69,999 ZH/s)' },
            { name: 'Teto da Esmeralda 3', numeral: 'III', value: '99,999', unit: 'ZH', tooltip: 'Teto da Esmeralda 3 / Teto pré-Lenda (Emerald III: 99,999 ZH/s)' },
        ]
    }
];

export const resolveLeagueCap = (leagueInput: any): { value: string; unit: 'GH' | 'TH' | 'PH' | 'EH' | 'ZH'; tierName: string } | null => {
    if (!leagueInput) return null;
    let raw = '';
    if (typeof leagueInput === 'string') {
        raw = leagueInput;
    } else if (leagueInput?.title) {
        if (typeof leagueInput.title === 'string') {
            raw = leagueInput.title;
        } else if (typeof leagueInput.title === 'object') {
            raw = leagueInput.title.en || leagueInput.title.pt || leagueInput.title.es || Object.values(leagueInput.title)[0] || '';
        }
    } else if (leagueInput?.name) {
        raw = String(leagueInput.name);
    }

    if (!raw) return null;
    const str = raw.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

    let leaguePresetId = '';
    if (str.includes('bronze')) leaguePresetId = 'bronze';
    else if (str.includes('prata') || str.includes('silver') || str.includes('plata')) leaguePresetId = 'prata';
    else if (str.includes('ouro') || str.includes('gold') || str.includes('oro')) leaguePresetId = 'ouro';
    else if (str.includes('platina') || str.includes('platinum')) leaguePresetId = 'platina';
    else if (str.includes('diamante') || str.includes('diamond')) leaguePresetId = 'diamante';
    else if (str.includes('titan') || str.includes('tita')) leaguePresetId = 'titan';
    else if (str.includes('esmeralda') || str.includes('emerald')) leaguePresetId = 'esmeralda';
    else if (str.includes('lenda') || str.includes('legend') || str.includes('leyenda')) leaguePresetId = 'esmeralda';

    if (!leaguePresetId) return null;

    const preset = LEAGUE_CAP_PRESETS.find(p => p.id === leaguePresetId);
    if (!preset || !preset.tiers || preset.tiers.length === 0) return null;

    let tierIndex = 0; // 0 = I, 1 = II, 2 = III
    if (str.includes('lenda') || str.includes('legend') || str.includes('leyenda')) {
        tierIndex = 2; // Teto pré-lenda (Esmeralda III)
    } else if (/\b(iii|3)\b/.test(str) || str.endsWith('3') || str.includes('_3')) {
        tierIndex = 2;
    } else if (/\b(ii|2)\b/.test(str) || str.endsWith('2') || str.includes('_2')) {
        tierIndex = 1;
    } else if (/\b(i|1)\b/.test(str) || str.endsWith('1') || str.includes('_1')) {
        tierIndex = 0;
    }

    const tier = preset.tiers[tierIndex] || preset.tiers[0];
    return {
        value: tier.value,
        unit: tier.unit,
        tierName: `${preset.leagueName} ${tier.numeral}`
    };
};

export const RoomOrganizer: React.FC = () => {
    const hasRun = useRef(false);

    // Google Script Counter para rastreio operacional
    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        const script_google = 'https://script.google.com/macros/s/AKfycbw7dMd8qM7ArT1znPJMnyTIWf3G0etT4eszMdNfcRimrCJ35Ww8iwCXgC5rhUMxrTI3/exec';
        fetch(script_google, {
            method: 'POST',
            mode: 'no-cors'
        }).catch(e => console.error("Error updating counter:", e));
    }, []);

    // Estados de API e inputs
    const [userLink, setUserLink] = useState('');
    const [customSetBonus, setCustomSetBonus] = useState<number>(0);
    const [inventoryRawText, setInventoryRawText] = useState('');
    const [loading, setLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

    // Base do Google Sheets para detecção de níveis oficiais e status de venda
    const { sheetDb: sheetDatabase } = useSheetDatabase();
    const sheetDataRef = useRef<SheetMinerData[]>(sheetDatabase);

    useEffect(() => {
        sheetDataRef.current = sheetDatabase;
        if (sheetDatabase.length > 0) {
            setSalaMiners(prev => prev.map(m => ({ ...m, canBeSold: isMinerSellable(m.name, sheetDatabase) })));
            setInventoryMiners(prev => prev.map(m => ({ ...m, canBeSold: isMinerSellable(m.name, sheetDatabase) })));
            setDiscardMiners(prev => prev.map(m => ({ ...m, canBeSold: isMinerSellable(m.name, sheetDatabase) })));
        }
    }, [sheetDatabase]);

    // Estados das colunas de mineradores
    const [salaMiners, setSalaMiners] = useState<OrganizerMiner[]>([]);
    const [inventoryMiners, setInventoryMiners] = useState<OrganizerMiner[]>([]);
    const [discardMiners, setDiscardMiners] = useState<OrganizerMiner[]>([]);

    // Snapshot inicial para deltas
    const [initialRoomState, setInitialRoomState] = useState<{
        miners: OrganizerMiner[];
        minersPower: number;
        totalBonusPercent: number;
        initialBaseBonus?: number;
        initialSetBonus?: number;
        totalRealPower: number;
        initialTotalCells: number;
        maxCellsCapacity: number;
    } | null>(null);

    // Dados do perfil
    const [profileData, setProfileData] = useState<any>(null);
    const [showExportModal, setShowExportModal] = useState(false);
    const [selectedSalaIds, setSelectedSalaIds] = useState<Set<string>>(new Set());

    // Filtros e ordenação da Sala
    const [salaSearch, setSalaSearch] = useState('');
    const [salaSort, setSalaSort] = useState<SalaSortOption>('real_power_desc');
    const [salaSizeFilter, setSalaSizeFilter] = useState<'all' | '1' | '2'>('all');
    const [salaSellableFilter, setSalaSellableFilter] = useState<'all' | 'sellable' | 'not_sellable'>('all');
    const [salaDuplicateFilter, setSalaDuplicateFilter] = useState<'all' | 'duplicates' | 'unique' | 'dup_unsellable' | 'dup_sellable'>('all');

    // Filtros e ordenação do Inventário
    const [invSearch, setInvSearch] = useState('');
    const [invSort, setInvSort] = useState<InvSortOption>('real_power_desc');
    const [invPresenceFilter, setInvPresenceFilter] = useState<'all' | 'in_room' | 'new_to_room' | 'dup_inventory'>('all');
    const [invMarketFilter, setInvMarketFilter] = useState<'all' | 'sellable' | 'not_sellable'>('all');
    const [invSizeFilter, setInvSizeFilter] = useState<'all' | '1' | '2'>('all');

    // Filtros do Descarte
    const [discardSearch, setDiscardSearch] = useState('');
    const [discardMarketFilter, setDiscardMarketFilter] = useState<'all' | 'sellable' | 'not_sellable'>('all');
    const [rightPanelTab, setRightPanelTab] = useState<'inventory' | 'discard'>('inventory');

    const [showTextModal, setShowTextModal] = useState(false);
    const [showWelcomeAlert, setShowWelcomeAlert] = useState(true);
    const [copiedAlert, setCopiedAlert] = useState(false);

    // Modal de Otimização com Teto de Poder Real
    const [showOptimizeModal, setShowOptimizeModal] = useState(false);
    const [pendingOptimizeTarget, setPendingOptimizeTarget] = useState<AutoOptimizationTarget>('real_power');
    const [ceilingInput, setCeilingInput] = useState('');
    const [ceilingUnit, setCeilingUnit] = useState<'GH' | 'TH' | 'PH' | 'EH' | 'ZH'>('EH');

    // Sincroniza o Teto Máximo de Poder Real quando o perfil é carregado com a Liga Atual
    useEffect(() => {
        if (profileData?.league) {
            const suggestedCap = resolveLeagueCap(profileData.league);
            if (suggestedCap) {
                setCeilingInput(suggestedCap.value);
                setCeilingUnit(suggestedCap.unit);
            }
        }
    }, [profileData?.league]);

    const proxy = "https://summer-night-03c0.rk-foxx-159.workers.dev/?";

    // Formatadores numéricos
    const formatPower = (ghs: number, showSign = false) => {
        const sign = ghs > 0 && showSign ? '+' : ghs < 0 ? '-' : '';
        const absVal = Math.abs(ghs);
        if (absVal === 0) return '0 GH/s';
        if (absVal >= 1e9) return `${sign}${(absVal / 1e9).toFixed(3).replace('.', ',')} EH/s`;
        if (absVal >= 1e6) return `${sign}${(absVal / 1e6).toFixed(3).replace('.', ',')} PH/s`;
        if (absVal >= 1e3) return `${sign}${(absVal / 1e3).toFixed(3).replace('.', ',')} TH/s`;
        return `${sign}${absVal.toFixed(3).replace('.', ',')} GH/s`;
    };

    const formatBonusDelta = (val: number) => {
        const sign = val > 0 ? '+' : '';
        return `${sign}${val.toFixed(2)}%`;
    };

    const formatPctChange = (pct: number) => {
        const sign = pct > 0 ? '+' : '';
        return `${sign}${pct.toFixed(2)}%`;
    };

    // Chave única para duplicadas (separa instâncias por patamar de força quando o nível é estimado)
    const getMinerKey = (m: OrganizerMiner): string => {
        const cleanName = m.name.replace(/\s*\(!\)\s*$/, '').trim().toLowerCase();
        if (m.level !== undefined && m.level > 0 && !m.hasEstimatedLevel) {
            return `${cleanName}_lvl_${m.level}`;
        }
        return `${cleanName}_lvl_${m.level ?? 0}_pwr_${Math.round(m.power)}`;
    };

    // Badge visual para o nível da mineradora
    const renderLevelBadge = (level: number = 0, isEstimated?: boolean, isLegacyStar?: boolean) => {
        if (isLegacyStar) {
            return (
                <span className="inline-flex items-center gap-1" title="Minerador Legado (Level Único)">
                    <img
                        src="/images/legacy_star.png"
                        alt="★"
                        className="h-3.5 w-auto object-contain inline-block align-middle rounded-xs"
                    />
                    {isEstimated && (
                        <span
                            className="text-[8px] font-black px-1 py-0.5 rounded bg-amber-500 text-white shadow-xs"
                            title="Aviso: Máquina não catalogada na planilha oficial. Nível identificado pelo texto e bônus preservado."
                        >
                            !
                        </span>
                    )}
                </span>
            );
        }

        const lvl = typeof level === 'number' && !isNaN(level) ? Math.max(0, level) : 0;
        const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
        const label = romanNumerals[lvl] || `${lvl + 1}`;

        const colorClasses = [
            'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700', // I (Comum)
            'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800', // II (Incomum)
            'bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800', // III (Rara)
            'bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-300 border border-purple-200 dark:border-purple-800', // IV (Épica)
            'bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700', // V (Lendária)
            'bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-800', // VI (Unreal)
        ];

        const currentStyle = colorClasses[lvl] || colorClasses[0];

        return (
            <span className="inline-flex items-center gap-1">
                <span
                    className={`text-[8px] font-black px-1.5 py-0.5 rounded ${currentStyle}`}
                    title={`Nível ${lvl + 1}${isEstimated ? ' (Nível extraído diretamente do texto)' : ''}`}
                >
                    {label}
                </span>
                {isEstimated && (
                    <span
                        className="text-[8px] font-black px-1 py-0.5 rounded bg-amber-500 text-white shadow-xs"
                        title="Aviso: Máquina não catalogada na planilha oficial. Nível identificado pelo texto e bônus preservado."
                    >
                        !
                    </span>
                )}
            </span>
        );
    };

        // Status de venda determinado exclusivamente pela planilha Google Sheets
    const checkSellable = (minerName: string, minerId?: string): boolean => {
        const db = sheetDataRef.current.length > 0 ? sheetDataRef.current : sheetDatabase;
        return isMinerSellable(minerName, db);
    };

    const generateFilename = (name: string): string => {
        let clean = name.trim()
            .replace(/\s*\(!\)\s*$/, '')
            .replace(/^rating[\s_]*star[:\s_-]*/i, '');

        // Trata mineradoras conhecidas cujo CDN preserva apóstrofo tipográfico U+2019 (’)
        // Ex: "Satoshi's Chest" -> "satoshi’s_chest"
        const baseSlug = clean
            .replace(/['’]/g, '')
            .replace(/\+/g, 'plus')
            .replace(/-/g, '_')
            .replace(/\s+/g, '_')
            .replace(/,/g, '')
            .replace(/\./g, '')
            .toLowerCase();

        const typoApostropheMap: Record<string, string> = {
            'satoshis_chest': 'satoshi’s_chest',
            'kings_legacy': 'king’s_legacy',
            'devils_ember': 'devil’s_ember',
            'hashbeards_ship': 'hashbeard’s_ship',
            'corsairs_oath': 'corsair’s_oath',
        };

        return typoApostropheMap[baseSlug] || baseSlug;
    };

    const parsePowerStringToGhs = (valStr: string, unitStr: string): number => {
        const cleanVal = parseFloat(valStr.replace(/,/g, ''));
        if (isNaN(cleanVal)) return 0;
        const unit = unitStr.toUpperCase().trim();
        if (unit.startsWith('ZH')) return cleanVal * 1e12;
        if (unit.startsWith('EH')) return cleanVal * 1e9;
        if (unit.startsWith('PH')) return cleanVal * 1e6;
        if (unit.startsWith('TH')) return cleanVal * 1e3;
        return cleanVal;
    };

    // Métricas em tempo real da sala
    const currentRoomStats = useMemo(() => {
        const manualBonus = Number(customSetBonus) || 0;
        if (salaMiners.length === 0) {
            const maxCap = initialRoomState?.maxCellsCapacity || 528;
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
                maxCellsCapacity: maxCap,
                availableCells: maxCap,
                occupationPct: 0,
                uniqueMinersCount: 0,
                duplicateCount: 0,
                sellableCount: 0,
                notSellableCount: 0,
                dupUnsellableCount: 0,
                dupSellableCount: 0,
                enrichedMiners: [] as OrganizerMiner[],
                keyCounts: new Map<string, number>()
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
            const key = getMinerKey(m);
            keyCounts.set(key, (keyCounts.get(key) || 0) + 1);
        });

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

            const canBeSold = checkSellable(m.name, m.miner_id);

            if (canBeSold) sellableCount++;
            else notSellableCount++;

            const uniqueKey = getMinerKey(m);
            const isFirst = !seenKeys.has(uniqueKey);
            if (isFirst) {
                seenKeys.add(uniqueKey);
                baseBonusBruto += m.bonus_percent;
            } else {
                duplicateCount++;
                if (canBeSold) dupSellableCount++;
                else dupUnsellableCount++;
            }

            const activeBonus = isFirst ? m.bonus_percent : 0;
            const realPower = m.power * (1 + activeBonus / 100);

            enrichedMiners.push({
                ...m,
                canBeSold,
                size: sz,
                isFirstInRoom: isFirst,
                activeBonus,
                realPower
            });
        });

        const totalCells = cells1C + cells2C;
        const maxCellsCapacity = initialRoomState?.maxCellsCapacity || 528;
        const availableCells = maxCellsCapacity - totalCells;
        const occupationPct = maxCellsCapacity > 0 ? (totalCells / maxCellsCapacity) * 100 : 0;
        const totalBonusBruto = baseBonusBruto + manualBonus;
        const totalPoderReal = totalPoderBruto * (1 + totalBonusBruto / 100);

        enrichedMiners.forEach(m => {
            const uniqueKey = getMinerKey(m);
            const countInRoom = keyCounts.get(uniqueKey) || 1;
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

    // Deltas em relação ao snapshot inicial
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

    const getInsertionImpact = (miner: OrganizerMiner): { impact: number; givesBonus: boolean } => {
        const key = getMinerKey(miner);
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

    // Identificação de nível oficial via Google Sheets
    const detectMinerLevelAndMeta = (
        name: string,
        power: number,
        bonus_percent: number,
        currentDb: SheetMinerData[]
    ): { level: number; isSellable?: boolean; detectedFromDb: boolean } => {
        if (!currentDb || currentDb.length === 0) {
            return { level: 0, detectedFromDb: false };
        }

        const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
        const cleanTargetName = norm(name);

        const matched = findSheetMiner(name, currentDb);
        if (!matched || !matched.tiers || matched.tiers.length === 0) {
            return { level: 0, isSellable: matched ? matched.isSellable : isMinerSellable(name, currentDb), detectedFromDb: false };
        }

        const isSellable = matched.isSellable;

        for (const tier of matched.tiers) {
            const bonusDiff = Math.abs(tier.bonus - bonus_percent);
            const powerDiffRatio = tier.power > 0 ? Math.abs(tier.power - power) / tier.power : 1;
            if (bonusDiff <= 0.05 && powerDiffRatio <= 0.01) {
                return { level: tier.level, isSellable, detectedFromDb: true };
            }
        }

        let bestTier: SheetMinerTier | null = null;
        let minScore = Infinity;

        for (const tier of matched.tiers) {
            const bonusDiff = Math.abs(tier.bonus - bonus_percent);
            const powerDiffRatio = tier.power > 0 ? Math.abs(tier.power - power) / tier.power : 1;
            const score = (bonusDiff * 100) + (powerDiffRatio * 10);
            if (score < minScore) {
                minScore = score;
                bestTier = tier;
            }
        }

        if (bestTier && minScore < 20) {
            return { level: bestTier.level, isSellable, detectedFromDb: true };
        }

        return { level: bestTier ? bestTier.level : 0, isSellable, detectedFromDb: bestTier !== null };
    };

    // Parser robusto com suporte a descarte de Sets e regra de Nível 0 imediato após "open"
    const parseInventoryText = (raw: string): OrganizerMiner[] => {
        if (!raw.trim()) return [];

        let cleaned = raw;
        cleaned = cleaned.replace(/[\s\S]*?(?:Items arranged in your rooms will not appear on this page\.|Os itens organizados em sua sala não aparecerão nesta página\.|Los objetos colocados en tus salas no aparecerán en esta página\.?)\s*/i, '');
        cleaned = cleaned.replace(/\s*(?:About us|Sobre nós|Sobre nosotros)[\s\S]*/i, '');

        const db = sheetDataRef.current.length > 0 ? sheetDataRef.current : sheetDatabase;

        const blockRegex = /(?<header>[\s\S]*?)(?:Size:|Tamanho:|Tamaño:)\s*\n*\s*(?<size>\d+)\s*(?:Cells?|Células|Celdas)\s*\n*\s*(?:Power|Poder)\s*\n*\s*(?<power>[\d.,]+)\s*(?<unit>[A-Za-z/]+)\s*\n*\s*(?:Bonus|Bônus|Bonificación)\s*\n*\s*(?<bonus>[\d.,]+)\s*%\s*\n*\s*(?:Quantity:|Qtd:|Cant:)\s*\n*\s*(?<quantity>\d+)\s*\n*\s*(?<canBeSold>Can't be sold|Can be sold|Não pode ser vendido|Pode ser vendido|No se puede vender|Se pode vender|Se puede vender)/gim;

        const parsedList: OrganizerMiner[] = [];
        let match: RegExpExecArray | null;

        while ((match = blockRegex.exec(cleaned)) !== null) {
            if (!match.groups) continue;
            const { header, size, power, unit, bonus, quantity, canBeSold } = match.groups;

            const rawLines = header.split('\n').map(l => l.trim()).filter(Boolean);

            const lastOpenIdx = rawLines.map(l => l.toLowerCase()).lastIndexOf('open');
            const linesAfterOpen = lastOpenIdx !== -1 ? rawLines.slice(lastOpenIdx + 1) : rawLines;

            let isLegacyStar = false;

            const cleanLines = linesAfterOpen.filter(l => {
                const lower = l.toLowerCase();
                if (lower === 'open' || lower === 'miner details') return false;
                if (lower === 'set badge' || lower === 'badge') return false;
                if (lower === 'storage') return false;
                if (lower.startsWith('quantity: high') || lower.startsWith('quantity: low')) return false;
                if (lower.startsWith('items arranged in your rooms') || lower.startsWith('os itens organizados')) return false;
                if (/^rating[\s_]*star$/i.test(lower)) {
                    isLegacyStar = true;
                    return false;
                }
                return true;
            });

            // Descarte de Set: ignora 'Set' e nomes de conjunto posteriores (ex: 'Royal Set')
            const setIdx = cleanLines.findIndex(l => /^(?:Set|Set:|Conjunto|Coleção)$/i.test(l));
            const nameAndLevelLines = setIdx !== -1 ? cleanLines.slice(0, setIdx) : cleanLines;

            // Filtra possíveis 'rating star' residuais dentro de nameAndLevelLines
            const filteredNameLines: string[] = [];
            for (const line of nameAndLevelLines) {
                if (/^rating[\s_]*star$/i.test(line)) {
                    isLegacyStar = true;
                    continue;
                }
                if (/^rating[\s_]*star[:\s_-]+/i.test(line)) {
                    isLegacyStar = true;
                    filteredNameLines.push(line.replace(/^rating[\s_]*star[:\s_-]+/i, '').trim());
                    continue;
                }
                filteredNameLines.push(line);
            }

            let textLevel = 0;
            let cleanName = '';

            if (filteredNameLines.length > 0) {
                const firstLine = filteredNameLines[0];
                const numMatch = firstLine.match(/^([1-9]|10)$/);
                const romanMatch = firstLine.match(/^(I|II|III|IV|V|VI|VII|VIII|IX|X)$/i);
                const wordMatch = firstLine.match(/^(?:level|lvl|nível|tier)\s*([1-9]|10|[ivx]+)$/i);

                if (numMatch) {
                    textLevel = parseInt(numMatch[1], 10);
                    cleanName = filteredNameLines.slice(1).join(' ').trim();
                } else if (romanMatch) {
                    const rMap: Record<string, number> = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10 };
                    textLevel = rMap[romanMatch[1].toUpperCase()] ?? 1;
                    cleanName = filteredNameLines.slice(1).join(' ').trim();
                } else if (wordMatch) {
                    const val = wordMatch[1];
                    const rMap: Record<string, number> = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10 };
                    textLevel = parseInt(val, 10) || (rMap[val.toUpperCase()] ?? 1);
                    cleanName = filteredNameLines.slice(1).join(' ').trim();
                } else {
                    // Se após open vier diretamente o nome, é Nível 0 garantido
                    textLevel = 0;
                    cleanName = filteredNameLines.join(' ').trim();
                }
            }

            if (/^rating[\s_]*star[:\s_-]*/i.test(cleanName)) {
                isLegacyStar = true;
                cleanName = cleanName.replace(/^rating[\s_]*star[:\s_-]*/i, '').trim();
            }

            cleanName = cleanName.replace(/\s*\(!\)\s*$/, '').trim();

            if (!cleanName || cleanName.toLowerCase().includes('quantity: high')) continue;

            const pwr = parsePowerStringToGhs(power, unit);
            const bns = parseFloat(bonus.replace(/,/g, '.')) || 0;
            const qty = parseInt(quantity, 10) || 1;
            const sz = parseInt(size, 10) || 2;
            const isSellable = isSellableStatus(canBeSold);
            const filename = generateFilename(cleanName);

            const detected = detectMinerLevelAndMeta(cleanName, pwr, bns, db);
            let finalLevel = 0;
            let hasEstimatedLevel = false;
            let finalCanBeSold = isSellable;

            if (detected.detectedFromDb) {
                finalLevel = detected.level;
                if (detected.isSellable !== undefined) finalCanBeSold = detected.isSellable;
            } else {
                finalLevel = isLegacyStar ? 0 : textLevel;
                hasEstimatedLevel = !isLegacyStar;
            }

            const displayName = hasEstimatedLevel ? `${cleanName} (!)` : cleanName;

            parsedList.push({
                id: `inv_${filename}_lvl${finalLevel}_${Date.now()}_${Math.random().toString(36).substr(2, 7)}`,
                name: displayName,
                level: finalLevel,
                size: sz,
                power: pwr,
                bonus_percent: bns,
                filename,
                canBeSold: finalCanBeSold,
                quantity: qty,
                source: 'inventory',
                location_label: 'Inventário',
                hasEstimatedLevel,
                isLegacyStar
            });
        }

        // Prevenção de falso duplicado exclusivamente para itens não catalogados com forças distintas
        const uncatalogedGroups = new Map<string, OrganizerMiner[]>();
        parsedList.forEach(m => {
            if (m.hasEstimatedLevel) {
                const key = m.name.toLowerCase().replace(/\s*\(!\)\s*$/, '');
                if (!uncatalogedGroups.has(key)) uncatalogedGroups.set(key, []);
                uncatalogedGroups.get(key)!.push(m);
            }
        });

        uncatalogedGroups.forEach(group => {
            const distinctPowers = new Set(group.map(m => Math.round(m.power)));
            if (distinctPowers.size > 1) {
                group.sort((a, b) => a.power - b.power);
                group.forEach((m, idx) => {
                    if (m.level === 0) {
                        m.level = idx;
                    }
                });
            }
        });

        return parsedList;
    };

    // Helpers para Teto de Poder Real no Otimizador
    const parseCeilingValueToGhs = (inputStr: string, defaultUnit: 'GH' | 'TH' | 'PH' | 'EH' | 'ZH'): number | null => {
        const raw = inputStr.trim();
        if (!raw) return null;

        const match = raw.match(/^([\d.,]+)\s*([a-zA-Z/]*)$/);
        if (!match) return null;

        let numStr = match[1];
        const unitFound = match[2].toUpperCase().replace(/\/S/g, '').trim();

        if (numStr.includes(',') && !numStr.includes('.')) {
            numStr = numStr.replace(',', '.');
        } else {
            numStr = numStr.replace(/,/g, '');
        }

        const val = parseFloat(numStr);
        if (isNaN(val) || val <= 0) return null;

        let unit = defaultUnit;
        if (unitFound.startsWith('ZH') || unitFound.startsWith('Z')) unit = 'ZH';
        else if (unitFound.startsWith('EH') || unitFound.startsWith('E')) unit = 'EH';
        else if (unitFound.startsWith('PH') || unitFound.startsWith('P')) unit = 'PH';
        else if (unitFound.startsWith('TH') || unitFound.startsWith('T')) unit = 'TH';
        else if (unitFound.startsWith('GH') || unitFound.startsWith('G')) unit = 'GH';

        const multipliers: Record<string, number> = {
            GH: 1,
            TH: 1e3,
            PH: 1e6,
            EH: 1e9,
            ZH: 1e12
        };

        return val * (multipliers[unit] || 1e9);
    };

    const openOptimizeModal = (target: AutoOptimizationTarget) => {
        setPendingOptimizeTarget(target);
        if (!ceilingInput.trim() && profileData?.league) {
            const suggested = resolveLeagueCap(profileData.league);
            if (suggested) {
                setCeilingInput(suggested.value);
                setCeilingUnit(suggested.unit);
            }
        }
        setShowOptimizeModal(true);
    };

    const handleConfirmOptimize = () => {
        const parsedCeiling = parseCeilingValueToGhs(ceilingInput, ceilingUnit);
        setShowOptimizeModal(false);
        handleAutoOptimize(pendingOptimizeTarget, parsedCeiling ?? undefined);
    };

    // Ação: Otimizador Automático de Montagem de Sala (suporta teto máximo de poder real opcional)
    const handleAutoOptimize = (target: AutoOptimizationTarget, maxRealPowerGhs?: number) => {
        const maxCapacity = initialRoomState?.maxCellsCapacity || 528;
        const manualBonus = Number(customSetBonus) || 0;

        // 1. Unificar todas as máquinas disponíveis (Sala + Inventário)
        const pool: OrganizerMiner[] = [];

        salaMiners.forEach(m => {
            pool.push({ ...m, quantity: 1, source: 'room' });
        });

        inventoryMiners.forEach(m => {
            const qty = m.quantity || 1;
            for (let i = 0; i < qty; i++) {
                pool.push({
                    ...m,
                    id: `opt_${m.filename}_lvl${m.level}_${Date.now()}_${i}_${Math.random().toString(36).substr(2, 5)}`,
                    quantity: 1,
                    source: 'inventory'
                });
            }
        });

        if (pool.length === 0) {
            setStatusMessage({ text: "Nenhum minerador disponível para otimizar.", type: 'error' });
            return;
        }

        let finalRoom: OrganizerMiner[] = [];
        let remainingPool = [...pool];

        // MODO 1: FOCO EM PODER BRUTO (Densidade de força por célula)
        if (target === 'power') {
            if (maxRealPowerGhs) {
                let currentRoomMiners: OrganizerMiner[] = [];
                let occupiedCells = 0;
                let candidates = [...remainingPool];
                let currentPoderBruto = 0;
                const tempSet = new Set<string>();
                let currentBaseBonus = 0;

                while (candidates.length > 0) {
                    let bestIdx = -1;
                    let bestScore = -Infinity;

                    for (let i = 0; i < candidates.length; i++) {
                        const cand = candidates[i];
                        if (occupiedCells + cand.size > maxCapacity) continue;

                        const givesNewBonus = !tempSet.has(getMinerKey(cand));
                        const nextPoder = currentPoderBruto + cand.power;
                        const nextBonus = currentBaseBonus + (givesNewBonus ? cand.bonus_percent : 0) + manualBonus;
                        const nextReal = nextPoder * (1 + nextBonus / 100);

                        // Teto Rígido: se ultrapassar o teto estipulado, ignora este candidato e busca outro
                        if (nextReal > maxRealPowerGhs) continue;

                        const effectiveBonus = givesNewBonus ? cand.bonus_percent : 0;
                        const density = cand.power / cand.size;
                        // Score de Custo-Benefício: valoriza densidade de poder bruto e prioriza máquinas com 0% ou pouco bônus
                        // Evita que máquinas repetidas fracas tomem vagas de mineradoras únicas gigantescas
                        const score = density / (1 + (effectiveBonus / 5));

                        if (score > bestScore || (score === bestScore && cand.power > (candidates[bestIdx]?.power || 0))) {
                            bestScore = score;
                            bestIdx = i;
                        }
                    }

                    if (bestIdx === -1) break;

                    const chosen = candidates.splice(bestIdx, 1)[0];
                    currentRoomMiners.push(chosen);
                    occupiedCells += chosen.size;
                    currentPoderBruto += chosen.power;
                    if (!tempSet.has(getMinerKey(chosen))) {
                        tempSet.add(getMinerKey(chosen));
                        currentBaseBonus += chosen.bonus_percent;
                    }
                }

                finalRoom = currentRoomMiners;
                remainingPool = candidates;
            } else {
                remainingPool.sort((a, b) => {
                    const densityA = a.power / a.size;
                    const densityB = b.power / b.size;
                    if (densityB !== densityA) return densityB - densityA;
                    return a.bonus_percent - b.bonus_percent;
                });

                let occupiedCells = 0;
                const newRoom: OrganizerMiner[] = [];
                const newInv: OrganizerMiner[] = [];

                for (const miner of remainingPool) {
                    if (occupiedCells + miner.size > maxCapacity) {
                        newInv.push(miner);
                        continue;
                    }
                    newRoom.push(miner);
                    occupiedCells += miner.size;
                }
                finalRoom = newRoom;
                remainingPool = newInv;
            }
        }

        // MODO 2: FOCO EM BÔNUS MÁXIMO (Máquinas únicas com bônus por célula)
        else if (target === 'bonus') {
            const seenKeys = new Set<string>();
            const uniqueBonusMiners: OrganizerMiner[] = [];
            const duplicatesOrZeroBonus: OrganizerMiner[] = [];

            remainingPool.forEach(m => {
                const key = getMinerKey(m);
                if (!seenKeys.has(key) && m.bonus_percent > 0) {
                    seenKeys.add(key);
                    uniqueBonusMiners.push(m);
                } else {
                    duplicatesOrZeroBonus.push(m);
                }
            });

            uniqueBonusMiners.sort((a, b) => (b.bonus_percent / b.size) - (a.bonus_percent / a.size));
            duplicatesOrZeroBonus.sort((a, b) => (b.power / b.size) - (a.power / a.size));

            const prioritizedList = [...uniqueBonusMiners, ...duplicatesOrZeroBonus];

            let occupiedCells = 0;
            const newRoom: OrganizerMiner[] = [];
            const newInv: OrganizerMiner[] = [];

            let currentPoderBruto = 0;
            const tempSet = new Set<string>();
            let currentBaseBonus = 0;

            for (const miner of prioritizedList) {
                if (occupiedCells + miner.size > maxCapacity) {
                    newInv.push(miner);
                    continue;
                }

                if (maxRealPowerGhs) {
                    const givesNewBonus = !tempSet.has(getMinerKey(miner));
                    const nextPoder = currentPoderBruto + miner.power;
                    const nextBonus = currentBaseBonus + (givesNewBonus ? miner.bonus_percent : 0) + manualBonus;
                    const nextReal = nextPoder * (1 + nextBonus / 100);

                    // Teto Rígido: se ultrapassar o teto estipulado, não insere e avalia as próximas máquinas
                    if (nextReal > maxRealPowerGhs) {
                        newInv.push(miner);
                        continue;
                    }

                    currentPoderBruto = nextPoder;
                    if (givesNewBonus) {
                        tempSet.add(getMinerKey(miner));
                        currentBaseBonus += miner.bonus_percent;
                    }
                }

                newRoom.push(miner);
                occupiedCells += miner.size;
            }
            finalRoom = newRoom;
            remainingPool = newInv;
        }

        // MODO 3: FOCO EM PODER REAL TOTAL (Maximiza Poder Bruto * [1 + Bônus Total])
        else if (target === 'real_power') {
            let currentRoomMiners: OrganizerMiner[] = [];
            let occupiedCells = 0;
            let candidates = [...remainingPool];

            while (candidates.length > 0) {
                const currentPoderBruto = currentRoomMiners.reduce((acc, m) => acc + m.power, 0);
                const tempSet = new Set<string>();
                let currentBaseBonus = 0;
                currentRoomMiners.forEach(m => {
                    const k = getMinerKey(m);
                    if (!tempSet.has(k)) {
                        tempSet.add(k);
                        currentBaseBonus += m.bonus_percent;
                    }
                });

                const currentTotalReal = currentPoderBruto * (1 + (currentBaseBonus + manualBonus) / 100);

                let bestCandidateIdx = -1;
                let bestImpactPerCell = -Infinity;

                for (let i = 0; i < candidates.length; i++) {
                    const cand = candidates[i];
                    if (occupiedCells + cand.size > maxCapacity) continue;

                    const givesNewBonus = !tempSet.has(getMinerKey(cand));
                    const nextPoder = currentPoderBruto + cand.power;
                    const nextBonus = currentBaseBonus + (givesNewBonus ? cand.bonus_percent : 0) + manualBonus;
                    const nextReal = nextPoder * (1 + nextBonus / 100);

                    // Teto Rígido: se ultrapassar o teto estipulado, ignora este candidato e busca outro
                    if (maxRealPowerGhs && nextReal > maxRealPowerGhs) continue;

                    const impact = nextReal - currentTotalReal;
                    const impactPerCell = impact / cand.size;

                    if (impactPerCell > bestImpactPerCell) {
                        bestImpactPerCell = impactPerCell;
                        bestCandidateIdx = i;
                    }
                }

                if (bestCandidateIdx === -1) break;

                const chosen = candidates.splice(bestCandidateIdx, 1)[0];
                currentRoomMiners.push(chosen);
                occupiedCells += chosen.size;
            }

            finalRoom = currentRoomMiners;
            remainingPool = candidates;
        }

        // 2. Consolidar os mineradores excedentes de volta para o Inventário com quantidade
        const consolidatedInv: OrganizerMiner[] = [];
        remainingPool.forEach(item => {
            const existing = consolidatedInv.find(m =>
                m.name.toLowerCase() === item.name.toLowerCase() &&
                m.level === item.level &&
                m.power === item.power &&
                m.bonus_percent === item.bonus_percent &&
                m.size === item.size
            );
            if (existing) {
                existing.quantity = (existing.quantity || 1) + 1;
            } else {
                consolidatedInv.push({ ...item, quantity: 1, source: 'inventory', location_label: 'Inventário' });
            }
        });

        // 3. Atualizar estados
        setSalaMiners(finalRoom);
        setInventoryMiners(consolidatedInv);
        setSelectedSalaIds(new Set());

        const targetLabels: Record<AutoOptimizationTarget, string> = {
            power: 'Foco em Poder Bruto',
            bonus: 'Foco em Bônus Máximo',
            real_power: 'Foco em Poder Real Total'
        };

        const finalRoomReal = (() => {
            let pb = 0;
            const s = new Set<string>();
            let bb = 0;
            finalRoom.forEach(m => {
                pb += m.power;
                const k = getMinerKey(m);
                if (!s.has(k)) {
                    s.add(k);
                    bb += m.bonus_percent;
                }
            });
            return pb * (1 + (bb + manualBonus) / 100);
        })();

        const ceilingMsg = maxRealPowerGhs
            ? ` (Teto máx: ${formatPower(maxRealPowerGhs)} | Atingido: ${formatPower(finalRoomReal)})`
            : '';

        setStatusMessage({
            text: `Otimização concluída! Modo: ${targetLabels[target]}${ceilingMsg}. ${finalRoom.length} máquinas instaladas na sala.`,
            type: 'success'
        });
    };

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
            const merged = [...prev];
            items.forEach(newItem => {
                const existing = merged.find(m => m.name.toLowerCase() === newItem.name.toLowerCase() && m.level === newItem.level && m.power === newItem.power && m.bonus_percent === newItem.bonus_percent && m.size === newItem.size);
                if (existing) {
                    existing.quantity = (existing.quantity || 1) + (newItem.quantity || 1);
                } else {
                    merged.push(newItem);
                }
            });
            return merged;
        });

        setStatusMessage({ text: `${items.length} tipo(s) de mineradores importados com sucesso! Níveis identificados e bônus preservados.`, type: 'success' });
        setShowTextModal(false);
    };

    const handleLoadRoom = async () => {
        if (!userLink.trim()) {
            setStatusMessage({ text: "Insira o link do perfil ou ID do jogador.", type: 'error' });
            return;
        }

        setLoading(true);
        setStatusMessage(null);

        try {
            const profileRes = await fetch(`${proxy}https://rollercoin.com/api/profile/public-user-profile-data/${userLink.trim()}`);
            const profileJson = await profileRes.json();
            const pData = profileJson?.data;
            const avatarId = pData?.avatar_id;

            if (!avatarId) throw new Error("Perfil não encontrado ou inválido.");
            setProfileData(pData);

            // Auto pré-preenchimento do Teto Máximo de Poder Real baseado na Liga Atual do jogador
            const suggestedCap = resolveLeagueCap(pData?.league);
            if (suggestedCap) {
                setCeilingInput(suggestedCap.value);
                setCeilingUnit(suggestedCap.unit);
            }

            const powerRes = await fetch(`${proxy}https://rollercoin.com/api/profile/user-power-data/${avatarId}`);
            const powerData = await powerRes.json();
            const minersPower = powerData?.data?.miners || 0;
            const totalBonusPercent = parseFloat(((powerData?.data?.bonus_percent || 0) / 100).toFixed(2));
            const totalOrig = minersPower * (1 + totalBonusPercent / 100);

            const roomRes = await fetch(`${proxy}https://rollercoin.com/api/game/room-config/${avatarId}`);
            const roomData = await roomRes.json();
            const rawMiners = roomData?.data?.miners || [];
            const rawRacks = roomData?.data?.racks || [];

            let initialCellsCount = 0;

            const processed: OrganizerMiner[] = rawMiners.map((m: any, index: number) => {
                const rack = rawRacks.find((r: any) => r._id === m.placement?.user_rack_id);
                const sz = m.width === 1 ? 1 : 2;
                initialCellsCount += sz;

                const room_level = rack?.placement?.room_level !== undefined ? rack.placement.room_level : undefined;
                const rack_x = rack?.placement?.x !== undefined ? rack.placement.x : undefined;
                const rack_y = rack?.placement?.y !== undefined ? rack.placement.y : undefined;
                const location_label = (room_level !== undefined && rack_y !== undefined && rack_x !== undefined)
                    ? `Sala ${room_level + 1} • Linha ${rack_y + 1} • Rack ${rack_x + 1}`
                    : 'Sala';

                let minerName = m.name || '';
                let isLegacyStar = false;
                if (/^rating[\s_]*star[:\s_-]*/i.test(minerName)) {
                    isLegacyStar = true;
                    minerName = minerName.replace(/^rating[\s_]*star[:\s_-]*/i, '').trim();
                }

                return {
                    id: `room_${m.miner_id}_${m.level}_${index}_${Math.random().toString(36).substr(2, 6)}`,
                    miner_id: m.miner_id,
                    name: minerName,
                    level: isLegacyStar ? 0 : (m.level || 0),
                    size: sz,
                    power: m.power || 0,
                    bonus_percent: parseFloat(((m.bonus_percent || 0) / 100).toFixed(2)),
                    filename: generateFilename(m.filename || minerName),
                    canBeSold: checkSellable(minerName, m.miner_id),
                    source: 'room',
                    isLegacyStar,
                    room_level,
                    rack_x,
                    rack_y,
                    location_label,
                    rack_info: location_label
                };
            });

            const seenKeys = new Set<string>();
            let initialBaseBonus = 0;
            processed.forEach(m => {
                const key = getMinerKey(m);
                if (!seenKeys.has(key)) {
                    seenKeys.add(key);
                    initialBaseBonus += m.bonus_percent;
                }
            });

            const autoDetectedSetBonus = Math.max(0, parseFloat((totalBonusPercent - initialBaseBonus).toFixed(2)));
            setCustomSetBonus(autoDetectedSetBonus);

            let totalRackCellsCapacity = 0;
            if (Array.isArray(rawRacks) && rawRacks.length > 0) {
                rawRacks.forEach((r: any) => {
                    const rackCap = r.capacity || r.cells || (r.shelves ? r.shelves * 2 : (r.height ? r.height * (r.width || 2) : 8));
                    totalRackCellsCapacity += rackCap;
                });
            }

            const totalRoomCapacity = totalRackCellsCapacity > 0
                ? (rawRacks.length >= 66 ? 528 : Math.max(totalRackCellsCapacity, initialCellsCount, 528))
                : 528;

            setSalaMiners(processed);
            setInitialRoomState({
                miners: JSON.parse(JSON.stringify(processed)),
                minersPower,
                totalBonusPercent,
                initialBaseBonus,
                initialSetBonus: autoDetectedSetBonus,
                totalRealPower: totalOrig,
                initialTotalCells: initialCellsCount,
                maxCellsCapacity: totalRoomCapacity
            });

            const freeSlots = Math.max(0, totalRoomCapacity - initialCellsCount);
            setStatusMessage({
                text: `Sala carregada com sucesso! ${processed.length} mineradores e ${initialCellsCount} células ocupadas de ${totalRoomCapacity} células totais (${freeSlots > 0 ? `${freeSlots} livres` : '100% ocupada'}).`,
                type: 'success'
            });
        } catch (e: any) {
            console.error("Erro ao carregar sala:", e);
            setStatusMessage({ text: e.message || "Erro ao buscar dados do jogador na API.", type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    // Movimentações entre colunas
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

    const handleMoveSalaToInventory = (minerId: string) => {
        const item = salaMiners.find(m => m.id === minerId);
        if (!item) return;
        setSalaMiners(prev => prev.filter(m => m.id !== minerId));
        setInventoryMiners(prev => {
            const existing = prev.find(m => m.name.toLowerCase() === item.name.toLowerCase() && m.level === item.level && m.power === item.power && m.bonus_percent === item.bonus_percent && m.size === item.size);
            if (existing) {
                return prev.map(m => m.id === existing.id ? { ...m, quantity: (m.quantity || 1) + 1 } : m);
            } else {
                return [{ ...item, id: `inv_${item.filename}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`, quantity: 1, source: 'inventory', location_label: item.location_label || 'Inventário' }, ...prev];
            }
        });
        setSelectedSalaIds(prev => {
            const next = new Set(prev);
            next.delete(minerId);
            return next;
        });
    };

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
                source: 'room',
                location_label: item.location_label || 'Inventário'
            });
        }

        setSalaMiners(prev => [...newSalaItems, ...prev]);

        if (currentQty <= toMove) {
            setInventoryMiners(prev => prev.filter(m => m.id !== invId));
        } else {
            setInventoryMiners(prev => prev.map(m => m.id === invId ? { ...m, quantity: currentQty - toMove } : m));
        }
    };

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

    const handleMoveDiscardToSala = (minerId: string) => {
        const item = discardMiners.find(m => m.id === minerId);
        if (!item) return;
        setDiscardMiners(prev => prev.filter(m => m.id !== minerId));
        setSalaMiners(prev => [{ ...item, source: 'room' }, ...prev]);
    };

    const handleMoveDiscardToInventory = (minerId: string) => {
        const item = discardMiners.find(m => m.id === minerId);
        if (!item) return;
        setDiscardMiners(prev => prev.filter(m => m.id !== minerId));
        setInventoryMiners(prev => {
            const existing = prev.find(m => m.name.toLowerCase() === item.name.toLowerCase() && m.level === item.level && m.power === item.power && m.bonus_percent === item.bonus_percent && m.size === item.size);
            if (existing) {
                return prev.map(m => m.id === existing.id ? { ...m, quantity: (m.quantity || 1) + 1 } : m);
            } else {
                return [{ ...item, id: `inv_${item.filename}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`, quantity: 1, source: 'inventory' }, ...prev];
            }
        });
    };

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
                const existing = merged.find(m => m.name.toLowerCase() === item.name.toLowerCase() && m.level === item.level && m.power === item.power && m.bonus_percent === item.bonus_percent && m.size === item.size);
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

        const seenKeys = new Set<string>();
        let initialBaseBonus = 0;
        initialRoomState.miners.forEach(m => {
            const key = getMinerKey(m);
            if (!seenKeys.has(key)) {
                seenKeys.add(key);
                initialBaseBonus += m.bonus_percent;
            }
        });
        const autoDetectedSetBonus = Math.max(0, parseFloat((initialRoomState.totalBonusPercent - initialBaseBonus).toFixed(2)));
        setCustomSetBonus(autoDetectedSetBonus);

        setStatusMessage({ text: "Sala restaurada para o estado original!", type: 'info' });
    };

    // Ordenação e filtros limpos da Sala (9 opções estratégicas)
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

        list.sort((a, b) => {
            switch (salaSort) {
                case 'real_power_desc':
                    return (b.marginalImpact ?? b.realPower ?? 0) - (a.marginalImpact ?? a.realPower ?? 0);
                case 'real_power_asc':
                    return (a.marginalImpact ?? a.realPower ?? 0) - (b.marginalImpact ?? b.realPower ?? 0);

                case 'mais_poder_menos_bonus': {
                    const bonusA = a.isFirstInRoom ? a.bonus_percent : 0;
                    const bonusB = b.isFirstInRoom ? b.bonus_percent : 0;
                    const ratioA = a.power / Math.max(bonusA, 0.05);
                    const ratioB = b.power / Math.max(bonusB, 0.05);
                    if (ratioB !== ratioA) return ratioB - ratioA;
                    return b.power - a.power;
                }
                case 'mais_bonus_menos_poder': {
                    const bonusA = a.isFirstInRoom ? a.bonus_percent : 0;
                    const bonusB = b.isFirstInRoom ? b.bonus_percent : 0;
                    const ratioA = bonusA / (a.power / 1000 + 1);
                    const ratioB = bonusB / (b.power / 1000 + 1);
                    if (ratioB !== ratioA) return ratioB - ratioA;
                    return a.power - b.power;
                }

                case 'power_desc':
                    if (b.power === a.power) return b.bonus_percent - a.bonus_percent;
                    return b.power - a.power;
                case 'power_asc':
                    if (a.power === b.power) return a.bonus_percent - b.bonus_percent;
                    return a.power - b.power;

                case 'bonus_desc':
                    if (b.bonus_percent === a.bonus_percent) return (b.marginalImpact ?? b.power) - (a.marginalImpact ?? a.power);
                    return b.bonus_percent - a.bonus_percent;
                case 'bonus_asc':
                    if (a.bonus_percent === b.bonus_percent) return (a.marginalImpact ?? a.power) - (b.marginalImpact ?? b.power);
                    return a.bonus_percent - b.bonus_percent;

                case 'name_asc':
                    return a.name.localeCompare(b.name);

                default:
                    return (b.marginalImpact ?? b.realPower ?? 0) - (a.marginalImpact ?? a.realPower ?? 0);
            }
        });

        return list;
    }, [currentRoomStats.enrichedMiners, salaSearch, salaSizeFilter, salaSellableFilter, salaDuplicateFilter, salaSort]);

    // Mapeamento de contagem no inventário para filtro de repetidas internas
    const inventoryCounts = useMemo(() => {
        const map = new Map<string, number>();
        inventoryMiners.forEach(m => {
            const key = getMinerKey(m);
            map.set(key, (map.get(key) || 0) + (m.quantity || 1));
        });
        return map;
    }, [inventoryMiners]);

    // Ordenação e filtros do Inventário
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

        if (invPresenceFilter === 'new_to_room') {
            list = list.filter(m => {
                const key = getMinerKey(m);
                return (currentRoomStats.keyCounts?.get(key) || 0) === 0;
            });
        } else if (invPresenceFilter === 'in_room') {
            list = list.filter(m => {
                const key = getMinerKey(m);
                return (currentRoomStats.keyCounts?.get(key) || 0) > 0;
            });
        } else if (invPresenceFilter === 'dup_inventory') {
            list = list.filter(m => {
                const key = getMinerKey(m);
                const totalInInv = inventoryCounts.get(key) || 0;
                return totalInInv > 1 || (m.quantity || 1) > 1;
            });
        }

        list.sort((a, b) => {
            switch (invSort) {
                case 'real_power_desc':
                    return getInsertionImpact(b).impact - getInsertionImpact(a).impact;
                case 'real_power_asc':
                    return getInsertionImpact(a).impact - getInsertionImpact(b).impact;

                case 'mais_poder_menos_bonus': {
                    const inRoomA = (currentRoomStats.keyCounts?.get(getMinerKey(a)) || 0) > 0;
                    const inRoomB = (currentRoomStats.keyCounts?.get(getMinerKey(b)) || 0) > 0;
                    const bonusA = inRoomA ? 0 : a.bonus_percent;
                    const bonusB = inRoomB ? 0 : b.bonus_percent;
                    const ratioA = a.power / Math.max(bonusA, 0.05);
                    const ratioB = b.power / Math.max(bonusB, 0.05);
                    if (ratioB !== ratioA) return ratioB - ratioA;
                    return b.power - a.power;
                }
                case 'mais_bonus_menos_poder': {
                    const inRoomA = (currentRoomStats.keyCounts?.get(getMinerKey(a)) || 0) > 0;
                    const inRoomB = (currentRoomStats.keyCounts?.get(getMinerKey(b)) || 0) > 0;
                    const bonusA = inRoomA ? 0 : a.bonus_percent;
                    const bonusB = inRoomB ? 0 : b.bonus_percent;
                    const ratioA = bonusA / (a.power / 1000 + 1);
                    const ratioB = bonusB / (b.power / 1000 + 1);
                    if (ratioB !== ratioA) return ratioB - ratioA;
                    return a.power - b.power;
                }

                case 'power_desc':
                    if (b.power === a.power) return b.bonus_percent - a.bonus_percent;
                    return b.power - a.power;
                case 'power_asc':
                    if (a.power === b.power) return a.bonus_percent - b.bonus_percent;
                    return a.power - b.power;

                case 'bonus_desc':
                    if (b.bonus_percent === a.bonus_percent) return getInsertionImpact(b).impact - getInsertionImpact(a).impact;
                    return b.bonus_percent - a.bonus_percent;
                case 'bonus_asc':
                    if (a.bonus_percent === b.bonus_percent) return getInsertionImpact(a).impact - getInsertionImpact(b).impact;
                    return a.bonus_percent - b.bonus_percent;

                case 'name_asc':
                    return a.name.localeCompare(b.name);

                default:
                    return getInsertionImpact(b).impact - getInsertionImpact(a).impact;
            }
        });
        return list;
    }, [inventoryMiners, invSearch, invMarketFilter, invSizeFilter, invPresenceFilter, invSort, currentRoomStats, inventoryCounts]);

    // Ordenação do Descarte
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

    const getMinerLocationLabel = (m: OrganizerMiner): string => {
        if (m.location_label) return m.location_label;
        if (m.room_level !== undefined && m.rack_y !== undefined && m.rack_x !== undefined) {
            return `Sala ${m.room_level + 1} • Linha ${m.rack_y + 1} • Rack ${m.rack_x + 1}`;
        }
        return 'Inventário';
    };

    const getModificationsData = () => {
        const initialMiners = initialRoomState?.miners || [];
        const currentMiners = salaMiners;
        const removed = initialMiners.filter(initM => !currentMiners.some(s => s.id === initM.id));
        const added = currentMiners.filter(s => !initialMiners.some(initM => initM.id === s.id));
        const intermediate = initialMiners.filter(initM => currentMiners.some(s => s.id === initM.id));
        return { removed, added, intermediate };
    };

    const toStrikethrough = (text: string): string => {
        return text.split('').map(char => char + '\u0336').join('');
    };

    const formatExportBonus = (bonusPercent: number, isDuplicate: boolean): string => {
        const rawBonus = `+${bonusPercent}%`;
        if (isDuplicate && bonusPercent > 0) {
            return `${toStrikethrough(rawBonus)} [Repetido: +0%]`;
        }
        return rawBonus;
    };

    const downloadFile = (content: string, filename: string, mimeType: string) => {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const generateModificationsCSV = (): string => {
        const { removed, added, intermediate } = getModificationsData();
        const userName = profileData?.name || 'Jogador';
        const userLeague = profileData?.league?.title?.en || profileData?.league?.title?.pt || 'N/A';
        const dateStr = new Date().toLocaleString('pt-BR');

        // Métricas Intermediárias (após as remoções e antes das inserções)
        let interMinersPower = 0;
        let interCells = 0;
        const interSeenKeys = new Set<string>();
        let interBaseBonus = 0;

        intermediate.forEach(m => {
            interMinersPower += m.power;
            interCells += (m.size === 1 ? 1 : 2);
            const key = getMinerKey(m);
            if (!interSeenKeys.has(key)) {
                interSeenKeys.add(key);
                interBaseBonus += m.bonus_percent;
            }
        });

        const interSetBonus = Number(customSetBonus) || (initialRoomState?.initialSetBonus || 0);
        const interTotalBonus = interBaseBonus + interSetBonus;
        const interTotalRealPower = interMinersPower * (1 + interTotalBonus / 100);

        const lines: string[] = [];
        lines.push('RELATÓRIO DE MODIFICAÇÕES DA SALA - ROLLERCOIN');
        lines.push(`Jogador:;${userName};Data:;${dateStr}`);
        lines.push(`Liga Atual:;${userLeague}`);
        lines.push('');
        lines.push('RESUMO DO PODER DO USUÁRIO');
        lines.push('Métrica;Inicial;Intermediário (Pós-Remoção);Final;Variação (Delta);Variação (%)');

        const initPoder = initialRoomState ? formatPower(initialRoomState.minersPower) : '0 GH/s';
        const finalPoder = formatPower(currentRoomStats.poderBruto);
        const deltaPoderStr = formatPower(liveDeltas.deltaPoder, true);
        const deltaPoderPctStr = formatPctChange(liveDeltas.deltaPoderPct);
        lines.push(`Poder Bruto (Miners);${initPoder};${formatPower(interMinersPower)};${finalPoder};${deltaPoderStr};${deltaPoderPctStr}`);

        const initBonus = initialRoomState ? initialRoomState.totalBonusPercent.toFixed(2) + '%' : '0.00%';
        const finalBonus = (currentRoomStats.bonusBruto || 0).toFixed(2) + '%';
        const deltaBonusStr = formatBonusDelta(liveDeltas.deltaBonus);
        const deltaBonusPctStr = formatPctChange(liveDeltas.deltaBonusPct);
        lines.push(`Bônus Bruto Total;${initBonus};${interTotalBonus.toFixed(2)}%;${finalBonus};${deltaBonusStr};${deltaBonusPctStr}`);

        const initSetBonus = initialRoomState ? ((initialRoomState.initialSetBonus ?? 0).toFixed(2) + '%') : '0.00%';
        const finalSetBonus = (Number(customSetBonus) || 0).toFixed(2) + '%';
        const deltaSetBonus = ((Number(customSetBonus) || 0) - (initialRoomState?.initialSetBonus || 0));
        const deltaSetBonusStr = (deltaSetBonus > 0 ? '+' : '') + deltaSetBonus.toFixed(2) + '%';
        lines.push(`Bônus de Máquinas Únicas;${(initialRoomState?.initialBaseBonus || 0).toFixed(2)}%;${interBaseBonus.toFixed(2)}%;${(currentRoomStats.baseBonusBruto || 0).toFixed(2)}%;${((currentRoomStats.baseBonusBruto || 0) - (initialRoomState?.initialBaseBonus || 0) > 0 ? '+' : '') + ((currentRoomStats.baseBonusBruto || 0) - (initialRoomState?.initialBaseBonus || 0)).toFixed(2)}%;-`);
        lines.push(`Bônus de Sets;${initSetBonus};${interSetBonus.toFixed(2)}%;${finalSetBonus};${deltaSetBonusStr};-`);

        const initReal = initialRoomState ? formatPower(initialRoomState.totalRealPower) : '0 GH/s';
        const finalReal = formatPower(currentRoomStats.poderReal);
        const deltaRealStr = formatPower(liveDeltas.deltaRealPower, true);
        const deltaRealPctStr = formatPctChange(liveDeltas.deltaRealPowerPct);
        lines.push(`Poder Real Efetivo;${initReal};${formatPower(interTotalRealPower)};${finalReal};${deltaRealStr};${deltaRealPctStr}`);

        const initCells = initialRoomState ? `${initialRoomState.initialTotalCells} cél.` : '0 cél.';
        const finalCells = `${currentRoomStats.totalCells} / ${currentRoomStats.maxCellsCapacity} cél. (${currentRoomStats.availableCells} livres)`;
        const deltaCellsStr = (liveDeltas.deltaCells > 0 ? '+' : '') + liveDeltas.deltaCells + ' cél.';
        lines.push(`Células da Sala;${initCells};${interCells} cél.;${finalCells};${deltaCellsStr};${currentRoomStats.occupationPct.toFixed(1)}% ocup.`);

        lines.push('');
        lines.push(`MODIFICAÇÕES DETALHADAS (${removed.length} removidas; ${added.length} inseridas)`);
        lines.push('MINERADORES REMOVIDOS DA SALA (SAÍRAM);;;;;;;;MINERADORES INSERIDOS NA SALA (ENTRARAM);;;;;;');
        lines.push('Nome;Nível;Tamanho;Poder;Bônus;Localização Original;Status;;Nome;Nível;Tamanho;Poder;Bônus;Origem;Status');

        // Mapeamentos para identificar duplicatas com precisão
        const interKeysCount = new Map<string, number>();
        intermediate.forEach(m => {
            const k = getMinerKey(m);
            interKeysCount.set(k, (interKeysCount.get(k) || 0) + 1);
        });
        const remBonusProvidedKeys = new Set<string>();

        const enrichedMap = new Map<string, OrganizerMiner>();
        currentRoomStats.enrichedMiners.forEach(m => {
            enrichedMap.set(m.id, m);
        });

        const maxRows = Math.max(removed.length, added.length);
        const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

        for (let i = 0; i < maxRows; i++) {
            const rem = removed[i];
            const add = added[i];

            let leftCol = ';;;;;;';
            if (rem) {
                const lvl = romanNumerals[rem.level] || `${rem.level + 1}`;
                const sizeStr = rem.size === 1 ? '1 Célula' : '2 Células';
                const pwrStr = formatPower(rem.power);

                const key = getMinerKey(rem);
                const hasInIntermediate = (interKeysCount.get(key) || 0) > 0;
                let isRemDuplicate = false;
                if (hasInIntermediate) {
                    isRemDuplicate = true;
                } else {
                    if (remBonusProvidedKeys.has(key)) {
                        isRemDuplicate = true;
                    } else {
                        remBonusProvidedKeys.add(key);
                        isRemDuplicate = false;
                    }
                }

                const bnsStr = formatExportBonus(rem.bonus_percent, isRemDuplicate);
                const locStr = getMinerLocationLabel(rem);
                const statusStr = rem.canBeSold ? 'Vendível' : 'Inegociável';
                leftCol = `"${rem.name.replace(/"/g, '""')}";${lvl};${sizeStr};"${pwrStr}";"${bnsStr}";"${locStr}";${statusStr}`;
            }

            let rightCol = ';;;;;;';
            if (add) {
                const lvl = romanNumerals[add.level] || `${add.level + 1}`;
                const sizeStr = add.size === 1 ? '1 Célula' : '2 Células';
                const pwrStr = formatPower(add.power);

                const enrichedAdd = enrichedMap.get(add.id);
                const isAddDuplicate = enrichedAdd ? !enrichedAdd.isFirstInRoom : false;
                const bnsStr = formatExportBonus(add.bonus_percent, isAddDuplicate);

                const origStr = add.location_label || 'Inventário';
                const statusStr = add.canBeSold ? 'Vendível' : 'Inegociável';
                rightCol = `"${add.name.replace(/"/g, '""')}";${lvl};${sizeStr};"${pwrStr}";"${bnsStr}";"${origStr}";${statusStr}`;
            }

            lines.push(`${leftCol};;${rightCol}`);
        }

        return lines.join('\r\n');
    };

    const generateModificationsTXT = (): string => {
        const { removed, added, intermediate } = getModificationsData();
        const userName = profileData?.name || 'Jogador';
        const userLeague = profileData?.league?.title?.en || profileData?.league?.title?.pt || 'N/A';
        const dateStr = new Date().toLocaleString('pt-BR');
        const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

        // Métricas Intermediárias (após as remoções e antes das inserções)
        let interMinersPower = 0;
        let interCells = 0;
        const interSeenKeys = new Set<string>();
        let interBaseBonus = 0;

        intermediate.forEach(m => {
            interMinersPower += m.power;
            interCells += (m.size === 1 ? 1 : 2);
            const key = getMinerKey(m);
            if (!interSeenKeys.has(key)) {
                interSeenKeys.add(key);
                interBaseBonus += m.bonus_percent;
            }
        });

        const interSetBonus = Number(customSetBonus) || (initialRoomState?.initialSetBonus || 0);
        const interTotalBonus = interBaseBonus + interSetBonus;
        const interTotalRealPower = interMinersPower * (1 + interTotalBonus / 100);

        const lines: string[] = [];
        lines.push('========================================================================================');
        lines.push('                    RELATÓRIO DE MODIFICAÇÕES DA SALA - ROLLERCOIN');
        lines.push('========================================================================================');
        lines.push(`Jogador: ${userName}  |  Liga: ${userLeague}  |  Data: ${dateStr}`);
        lines.push('');
        lines.push('--- RESUMO DO PODER DO USUÁRIO ---');

        const initPoder = initialRoomState ? formatPower(initialRoomState.minersPower) : '0 GH/s';
        const finalPoder = formatPower(currentRoomStats.poderBruto);
        const deltaPoderStr = formatPower(liveDeltas.deltaPoder, true);
        const deltaPoderPctStr = formatPctChange(liveDeltas.deltaPoderPct);
        lines.push(`• Poder Bruto (Miners):        Inicial: ${initPoder} -> Interm. (Pós-Remoção): ${formatPower(interMinersPower)} -> Final: ${finalPoder} (Δ ${deltaPoderStr} / ${deltaPoderPctStr})`);

        const initBonus = initialRoomState ? initialRoomState.totalBonusPercent.toFixed(2) + '%' : '0.00%';
        const finalBonus = (currentRoomStats.bonusBruto || 0).toFixed(2) + '%';
        const deltaBonusStr = formatBonusDelta(liveDeltas.deltaBonus);
        const deltaBonusPctStr = formatPctChange(liveDeltas.deltaBonusPct);
        lines.push(`• Bônus Bruto Total:           Inicial: ${initBonus} -> Interm. (Pós-Remoção): ${interTotalBonus.toFixed(2)}% -> Final: ${finalBonus} (Δ ${deltaBonusStr} / ${deltaBonusPctStr})`);

        const initSetBonus = initialRoomState ? ((initialRoomState.initialSetBonus ?? 0).toFixed(2) + '%') : '0.00%';
        const finalSetBonus = (Number(customSetBonus) || 0).toFixed(2) + '%';
        const deltaSetBonus = ((Number(customSetBonus) || 0) - (initialRoomState?.initialSetBonus || 0));
        const deltaSetBonusStr = (deltaSetBonus > 0 ? '+' : '') + deltaSetBonus.toFixed(2) + '%';
        lines.push(`   - Bônus de Únicas:          Inicial: ${(initialRoomState?.initialBaseBonus || 0).toFixed(2)}% -> Interm.: ${interBaseBonus.toFixed(2)}% -> Final: ${(currentRoomStats.baseBonusBruto || 0).toFixed(2)}%`);
        lines.push(`   - Bônus de Sets:            Inicial: ${initSetBonus} -> Interm.: ${interSetBonus.toFixed(2)}% -> Final: ${finalSetBonus} (Δ ${deltaSetBonusStr})`);

        const initReal = initialRoomState ? formatPower(initialRoomState.totalRealPower) : '0 GH/s';
        const finalReal = formatPower(currentRoomStats.poderReal);
        const deltaRealStr = formatPower(liveDeltas.deltaRealPower, true);
        const deltaRealPctStr = formatPctChange(liveDeltas.deltaRealPowerPct);
        lines.push(`• Poder Real Efetivo:          Inicial: ${initReal} -> Interm. (Pós-Remoção): ${formatPower(interTotalRealPower)} -> Final: ${finalReal} (Δ ${deltaRealStr} / ${deltaRealPctStr})`);

        const initCells = initialRoomState ? `${initialRoomState.initialTotalCells} cél.` : '0 cél.';
        const finalCells = `${currentRoomStats.totalCells} / ${currentRoomStats.maxCellsCapacity} cél. (${currentRoomStats.availableCells} livres)`;
        const deltaCellsStr = (liveDeltas.deltaCells > 0 ? '+' : '') + liveDeltas.deltaCells + ' cél.';
        lines.push(`• Células da Sala:             Inicial: ${initCells} -> Interm.: ${interCells} cél. -> Final: ${finalCells}`);
        lines.push(`                               Composição Final: ${currentRoomStats.count1C}x 1C (${currentRoomStats.cells1C}c) • ${currentRoomStats.count2C}x 2C (${currentRoomStats.cells2C}c) • ${currentRoomStats.sellableCount} Vendíveis`);
        lines.push('');

        lines.push('========================================================================================');
        lines.push(`            MINERADORES REMOVIDOS DA SALA (SAÍRAM: ${removed.length})`);
        lines.push('========================================================================================');
        if (removed.length === 0) {
            lines.push('Nenhum minerador foi removido da sala.');
        } else {
            const interKeysCount = new Map<string, number>();
            intermediate.forEach(m => {
                const k = getMinerKey(m);
                interKeysCount.set(k, (interKeysCount.get(k) || 0) + 1);
            });
            const remBonusProvidedKeys = new Set<string>();

            removed.forEach((rem, idx) => {
                const lvl = romanNumerals[rem.level] || `${rem.level + 1}`;
                const sizeStr = rem.size === 1 ? '1C' : '2C';
                const statusStr = rem.canBeSold ? 'Vendível' : 'Inegociável';
                const locStr = getMinerLocationLabel(rem);

                const key = getMinerKey(rem);
                const hasInIntermediate = (interKeysCount.get(key) || 0) > 0;
                let isRemDuplicate = false;
                if (hasInIntermediate) {
                    isRemDuplicate = true;
                } else {
                    if (remBonusProvidedKeys.has(key)) {
                        isRemDuplicate = true;
                    } else {
                        remBonusProvidedKeys.add(key);
                        isRemDuplicate = false;
                    }
                }

                const bnsStr = formatExportBonus(rem.bonus_percent, isRemDuplicate);
                lines.push(`${idx + 1}. ${rem.name} [Nível ${lvl} • ${sizeStr}]`);
                lines.push(`   Poder: ${formatPower(rem.power)} | Bônus: ${bnsStr} | Localização: ${locStr} | Status: ${statusStr}`);
            });
        }
        lines.push('');

        lines.push('========================================================================================');
        lines.push(`            MINERADORES INSERIDOS NA SALA (ENTRARAM: ${added.length})`);
        lines.push('========================================================================================');
        if (added.length === 0) {
            lines.push('Nenhum minerador novo foi inserido na sala.');
        } else {
            const enrichedMap = new Map<string, OrganizerMiner>();
            currentRoomStats.enrichedMiners.forEach(m => {
                enrichedMap.set(m.id, m);
            });

            added.forEach((add, idx) => {
                const lvl = romanNumerals[add.level] || `${add.level + 1}`;
                const sizeStr = add.size === 1 ? '1C' : '2C';
                const statusStr = add.canBeSold ? 'Vendível' : 'Inegociável';
                const origStr = add.location_label || 'Inventário';

                const enrichedAdd = enrichedMap.get(add.id);
                const isAddDuplicate = enrichedAdd ? !enrichedAdd.isFirstInRoom : false;
                const bnsStr = formatExportBonus(add.bonus_percent, isAddDuplicate);

                lines.push(`${idx + 1}. ${add.name} [Nível ${lvl} • ${sizeStr}]`);
                lines.push(`   Poder: ${formatPower(add.power)} | Bônus: ${bnsStr} | Origem: ${origStr} | Status: ${statusStr}`);
            });
        }
        lines.push('========================================================================================');

        return lines.join('\r\n');
    };

    const handleExportRoomJSON = () => {
        const data = {
            exportDate: new Date().toISOString(),
            profile: profileData ? { name: profileData.name, league: profileData.league?.title?.en } : null,
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

            <div className="bg-white dark:bg-dark-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="md:col-span-5 flex gap-2">
                        <div className="relative flex-grow">
                            <input
                                type="text"
                                value={userLink}
                                onChange={(e) => setUserLink(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleLoadRoom();
                                    }
                                }}
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
                                title="Insira seu bônus de Sets/Freon/Ratos/Exchange para somar diretamente ao Bônus Bruto. Subtraia os bônus de rato/freon/exchange para poder organizar a sala com precisão."
                            />
                        </div>
                    </div>

                    <div className="md:col-span-4 flex flex-wrap items-center justify-end gap-2">
                        {/* Botões do Otimizador Automático de Montagem */}
                        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
                            <button
                                onClick={() => openOptimizeModal('real_power')}
                                className="px-2.5 py-1.5 text-xs font-black uppercase tracking-wider rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-sm flex items-center gap-1 active:scale-95"
                                title="Preenche a sala maximizando o Poder Real total (Equilíbrio ideal de Força e Bônus)"
                            >
                                <Wand2 size={13} /> Auto Real
                            </button>
                            <button
                                onClick={() => openOptimizeModal('power')}
                                className="px-2 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-blue-500 rounded-lg transition-all flex items-center gap-1"
                                title="Preenche a sala com o máximo de poder bruto possível"
                            >
                                <Zap size={13} /> Força
                            </button>
                            <button
                                onClick={() => openOptimizeModal('bonus')}
                                className="px-2 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-cyan-500 rounded-lg transition-all flex items-center gap-1"
                                title="Preenche a sala com o máximo de bônus único possível"
                            >
                                <Award size={13} /> Bônus
                            </button>
                        </div>

                        <button
                            onClick={() => setShowTextModal(true)}
                            className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
                        >
                            <Upload size={14} /> + Inv.
                        </button>
                        {initialRoomState && (
                            <button
                                onClick={handleRestoreInitialRoom}
                                className="px-3 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 active:scale-95"
                                title="Restaura a lista original da sala"
                            >
                                <RotateCcw size={14} /> Original
                            </button>
                        )}
                        <button
                            onClick={() => {
                                if (!initialRoomState) {
                                    setStatusMessage({ text: "Carregue o perfil e sala inicial antes de exportar modificações.", type: 'error' });
                                    return;
                                }
                                setShowExportModal(true);
                            }}
                            className="px-3 py-2 bg-slate-800 dark:bg-slate-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
                            title="Exportar relatório de modificações da sala (Excel / Texto)"
                        >
                            <FileSpreadsheet size={14} className="text-emerald-400" />
                            <span>Exportar</span>
                        </button>
                        <button
                            onClick={() => setShowWelcomeAlert(true)}
                            className="px-2.5 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1 active:scale-95 shadow-xs"
                            title="Ver avisos e limitações da ferramenta"
                        >
                            <AlertTriangle size={14} />
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

            <div className="space-y-4">
                {profileData ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-dark-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4">
                            <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-2xl overflow-hidden border border-blue-100 dark:border-blue-800 flex-shrink-0 flex items-center justify-center">
                                <img
                                    src={`https://avatars.rollercoin.com/static/avatars/thumbnails/50/${profileData.avatar_id}.png`}
                                    className="w-full h-full object-cover"
                                    alt=""
                                    onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                                />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 uppercase font-black tracking-wider">Jogador</p>
                                <p className="font-display font-black text-xl dark:text-white uppercase leading-tight">{profileData.name}</p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-dark-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4">
                            <div className="p-3.5 bg-purple-50 dark:bg-purple-900/30 text-purple-600 rounded-2xl flex-shrink-0">
                                <Award size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 uppercase font-black tracking-wider">Liga Atual</p>
                                <p className="font-display font-black text-xl dark:text-white uppercase leading-tight">
                                    {profileData.league?.title?.en || profileData.league?.title?.pt || 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-gradient-to-r from-blue-900/90 via-slate-900 to-slate-900 text-white p-5 rounded-2xl border border-blue-500/30 shadow-xl flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl border border-blue-400/20">
                                <Calculator size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-blue-400 tracking-wider">Organizador de Sala</p>
                                <h2 className="text-lg md:text-xl font-black text-white tracking-tight">
                                    Carregue seu link de perfil ou ID RollerCoin acima para iniciar
                                </h2>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

                    <div className="bg-white dark:bg-dark-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Células da Sala (Tempo Real)</span>
                            <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500">
                                <Grid3X3 size={16} />
                            </div>
                        </div>

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

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                {/* COLUNA 1: SALA */}
                <div className="col-span-12 lg:col-span-6 bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col min-h-[650px]">
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
                                <option value="real_power_desc">Maior Impacto no Poder</option>
                                <option value="real_power_asc">Menor Impacto no Poder</option>
                                <option value="mais_poder_menos_bonus">+Poder / -Bônus</option>
                                <option value="mais_bonus_menos_poder">+Bônus / -Poder</option>
                                <option value="power_desc">Maior Poder Bruto</option>
                                <option value="power_asc">Menor Poder Bruto</option>
                                <option value="bonus_desc">Maior Bônus %</option>
                                <option value="bonus_asc">Menor Bônus %</option>
                                <option value="name_asc">Nome (A - Z)</option>
                            </select>

                            <select
                                value={salaSizeFilter}
                                onChange={(e) => setSalaSizeFilter(e.target.value as any)}
                                className="px-2 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs outline-none"
                            >
                                <option value="all">Todas Células</option>
                                <option value="1">Apenas 1 Célula</option>
                                <option value="2">Apenas 2 Células</option>
                            </select>

                            <select
                                value={salaSellableFilter}
                                onChange={(e) => setSalaSellableFilter(e.target.value as any)}
                                className="px-2 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs outline-none"
                            >
                                <option value="all">Negociabilidade (Todas)</option>
                                <option value="sellable">Apenas Vendíveis</option>
                                <option value="not_sellable">Apenas Inegociáveis</option>
                            </select>

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

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-1.5 flex-wrap">
                                                    <span className="font-bold text-xs text-slate-800 dark:text-white truncate" title={miner.name}>
                                                        {miner.name}
                                                    </span>

                                                    {renderLevelBadge(miner.level, miner.hasEstimatedLevel, miner.isLegacyStar)}

                                                    {miner.canBeSold ? (
                                                        <span className="inline-flex items-center gap-0.5 text-[8px] font-black uppercase px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400" title="Item negociável no Marketplace">
                                                            <ShoppingBag size={9} /> Vendível
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-0.5 text-[8px] font-black uppercase px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400" title="Item inegociável">
                                                            <Lock size={9} /> Inegociável
                                                        </span>
                                                    )}

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

                                                <div className="text-[9px] font-bold text-slate-400 dark:text-slate-500 mt-0.5 flex items-center gap-1.5">
                                                    <MapPin size={10} className="text-slate-400 flex-shrink-0" />
                                                    <span>{getMinerLocationLabel(miner)}</span>
                                                </div>
                                            </div>
                                        </div>

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

                {/* COLUNA 2: INVENTÁRIO / DESCARTE */}
                <div className="col-span-12 lg:col-span-6 bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col min-h-[650px]">
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 space-y-3">
                        <div className="flex items-center justify-between gap-3 flex-wrap">
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

                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1 text-slate-500 font-bold text-[11px] flex-shrink-0">
                                        <ArrowUpDown size={12} />
                                        <span>Ordenar:</span>
                                    </div>
                                    <select
                                        value={invSort}
                                        onChange={(e) => setInvSort(e.target.value as InvSortOption)}
                                        className="w-full px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs outline-none focus:ring-1 focus:ring-emerald-500"
                                    >
                                        <option value="real_power_desc">Maior Impacto no Poder</option>
                                        <option value="real_power_asc">Menor Impacto no Poder</option>
                                        <option value="mais_poder_menos_bonus">+Poder / -Bônus</option>
                                        <option value="mais_bonus_menos_poder">+Bônus / -Poder</option>
                                        <option value="power_desc">Maior Poder Bruto</option>
                                        <option value="power_asc">Menor Poder Bruto</option>
                                        <option value="bonus_desc">Maior Bônus %</option>
                                        <option value="bonus_asc">Menor Bônus %</option>
                                        <option value="name_asc">Nome (A - Z)</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                    <select
                                        value={invPresenceFilter}
                                        onChange={(e) => setInvPresenceFilter(e.target.value as any)}
                                        className="px-2 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-[11px] outline-none focus:ring-1 focus:ring-emerald-500"
                                        title="Filtrar por presença na Sala ou repetição"
                                    >
                                        <option value="all">Presença: Todos</option>
                                        <option value="new_to_room">Novidade (Bônus Ativo)</option>
                                        <option value="in_room">Tem na Sala</option>
                                        <option value="dup_inventory">Repetidas no Inventário</option>
                                    </select>

                                    <select
                                        value={invMarketFilter}
                                        onChange={(e) => setInvMarketFilter(e.target.value as any)}
                                        className="px-2 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-[11px] outline-none"
                                    >
                                        <option value="all">Todas as Miners</option>
                                        <option value="sellable">Apenas Vendíveis</option>
                                        <option value="not_sellable">Apenas Inegociáveis</option>
                                    </select>

                                    <select
                                        value={invSizeFilter}
                                        onChange={(e) => setInvSizeFilter(e.target.value as any)}
                                        className="px-2 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-[11px] outline-none"
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
                                                        {renderLevelBadge(miner.level, miner.hasEstimatedLevel, miner.isLegacyStar)}
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

                                                    <div className="text-[9px] font-bold text-slate-400 dark:text-slate-500 mt-0.5 flex items-center gap-1.5">
                                                        <MapPin size={10} className="text-slate-400 flex-shrink-0" />
                                                        <span>{getMinerLocationLabel(miner)}</span>
                                                    </div>
                                                </div>
                                            </div>

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
                                                        {renderLevelBadge(miner.level, miner.hasEstimatedLevel, miner.isLegacyStar)}
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

                                                    <div className="text-[9px] font-bold text-slate-400 dark:text-slate-500 mt-0.5 flex items-center gap-1.5">
                                                        <MapPin size={10} className="text-slate-400 flex-shrink-0" />
                                                        <span>{getMinerLocationLabel(miner)}</span>
                                                    </div>
                                                </div>
                                            </div>

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

            {/* MODAL DE IMPORTAÇÃO */}
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
                            Abra seu armazenamento no RollerCoin (<span className="font-mono text-blue-500">Storage &gt; Inventory &gt; Miners</span>), selecione o texto (<kbd className="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-[10px]">Ctrl + A</kbd>), copie e cole no campo abaixo:
                        </p>

                        <textarea
                            rows={10}
                            value={inventoryRawText}
                            onChange={(e) => setInventoryRawText(e.target.value)}
                            placeholder="Cole o texto do inventário aqui..."
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

            {/* MODAL DE AVISOS */}
            {showWelcomeAlert && (
                <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white dark:bg-dark-800 rounded-3xl max-w-xl w-full p-6 space-y-5 border border-amber-500/40 dark:border-amber-500/30 shadow-2xl animate-scale-up">
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

                        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar text-xs">
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

                            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
                                <div className="p-1.5 bg-emerald-500 text-white rounded-lg flex-shrink-0 mt-0.5 shadow-xs">
                                    <Package size={14} />
                                </div>
                                <div className="space-y-0.5">
                                    <h4 className="font-bold text-slate-900 dark:text-white">2. Inventário & Detecção Automática de Nível</h4>
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                        Ao colar o texto do inventário, o sistema identifica automaticamente o nível de merge a partir do formato oficial (Nível 0 quando vier sem número, ou Níveis 1 a 5 quando indicado), preservando o bônus de cada máquina.
                                    </p>
                                </div>
                            </div>

                            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
                                <div className="p-1.5 bg-indigo-500 text-white rounded-lg flex-shrink-0 mt-0.5 shadow-xs">
                                    <Grid3X3 size={14} />
                                </div>
                                <div className="space-y-0.5">
                                    <h4 className="font-bold text-slate-900 dark:text-white">3. Cuidado com o Bônus de Racks</h4>
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                        Os bônus específicos concedidos individualmente pelas estantes (racks) <strong>não são considerados no cálculo</strong> desta ferramenta. Leve em conta onde cada miner será instalada. O ideal é <strong>REMOVER</strong> racks com bônus se estiver buscando a estratégia de topo de liga.
                                    </p>
                                </div>
                            </div>

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

                            {/* Point 6: Bônus de Freon/Rato/Exchange Ativo */}
                            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
                                <div className="p-1.5 bg-blue-500 text-white rounded-lg flex-shrink-0 mt-0.5 shadow-xs">
                                    <ArrowUpDown size={14} />
                                </div>
                                <div className="space-y-0.5">
                                    <h4 className="font-bold text-slate-900 dark:text-white">6. Bônus de Freon/Rato/Exchange Ativo</h4>
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                        Caso você esteja com bônus de rato/freon/exchange ativo na sua conta, o valor inicial calculado no <em>"Bônus de Set (%)"</em> aparecerá um pouco superior ao real. Para corrigir, basta <strong>reduzir manualmente o valor dos bônus</strong> do campo de bônus de set no topo da página.
                                    </p>
                                </div>
                            </div>
                        </div>

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

            {/* MODAL DE EXPORTAÇÃO */}
            {showExportModal && (
                <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white dark:bg-dark-800 rounded-3xl max-w-xl w-full p-6 space-y-5 border border-slate-200 dark:border-slate-700 shadow-2xl animate-scale-up">
                        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-2xl">
                                    <FileSpreadsheet size={24} />
                                </div>
                                <div>
                                    <h3 className="font-display font-black text-slate-900 dark:text-white uppercase tracking-tight text-base sm:text-lg">
                                        Exportar Modificações
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {getModificationsData().removed.length} removida(s) • {getModificationsData().added.length} inserida(s) na sala
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowExportModal(false)}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                            <div className="font-bold text-slate-700 dark:text-slate-300 text-[11px] uppercase tracking-wider mb-1 flex items-center justify-between">
                                <span>Impacto das Alterações na Conta</span>
                                <span className="text-emerald-500 font-black">
                                    {liveDeltas.deltaRealPower > 0 ? `+${formatPower(liveDeltas.deltaRealPower)}` : formatPower(liveDeltas.deltaRealPower)}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                                <div className="p-2 bg-white dark:bg-dark-800 rounded-xl border border-slate-200 dark:border-slate-700">
                                    <span className="text-slate-400 text-[9px] uppercase font-sans font-bold block">Poder Bruto</span>
                                    <span className="font-black text-slate-700 dark:text-slate-200">{formatPower(liveDeltas.deltaPoder, true)}</span>
                                </div>
                                <div className="p-2 bg-white dark:bg-dark-800 rounded-xl border border-slate-200 dark:border-slate-700">
                                    <span className="text-slate-400 text-[9px] uppercase font-sans font-bold block">Bônus Bruto</span>
                                    <span className="font-black text-cyan-600 dark:text-cyan-400">{formatBonusDelta(liveDeltas.deltaBonus)}</span>
                                </div>
                                <div className="p-2 bg-white dark:bg-dark-800 rounded-xl border border-slate-200 dark:border-slate-700">
                                    <span className="text-slate-400 text-[9px] uppercase font-sans font-bold block">Bônus de Sets</span>
                                    <span className="font-black text-cyan-600 dark:text-cyan-400">
                                        {(Number(customSetBonus) - (initialRoomState?.initialSetBonus || 0)) > 0 ? '+' : ''}
                                        {(Number(customSetBonus) - (initialRoomState?.initialSetBonus || 0)).toFixed(2)}%
                                    </span>
                                </div>
                                <div className="p-2 bg-white dark:bg-dark-800 rounded-xl border border-slate-200 dark:border-slate-700">
                                    <span className="text-slate-400 text-[9px] uppercase font-sans font-bold block">Células</span>
                                    <span className="font-black text-slate-700 dark:text-slate-200">
                                        {currentRoomStats.totalCells} / {currentRoomStats.maxCellsCapacity} cél.
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2.5">
                            <button
                                onClick={() => {
                                    const csv = generateModificationsCSV();
                                    const filename = `modificacoes_sala_${profileData?.name || 'rollercoin'}.csv`;
                                    downloadFile('\uFEFF' + csv, filename, 'text/csv;charset=utf-8;');
                                    setShowExportModal(false);
                                    setStatusMessage({ text: "Arquivo Excel (.csv) baixado com sucesso!", type: 'success' });
                                }}
                                className="w-full p-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-between shadow-lg shadow-emerald-600/20 transition-all active:scale-98"
                            >
                                <div className="flex items-center gap-3 text-left">
                                    <div className="p-2 bg-white/20 rounded-xl">
                                        <FileSpreadsheet size={18} />
                                    </div>
                                    <div>
                                        <p className="font-black">Baixar Excel (.csv)</p>
                                        <p className="text-[10px] font-medium opacity-90 lowercase font-sans">Colunas lado a lado: removidas à esquerda, inseridas à direita</p>
                                    </div>
                                </div>
                                <Download size={18} />
                            </button>

                            <button
                                onClick={() => {
                                    const txt = generateModificationsTXT();
                                    const filename = `modificacoes_sala_${profileData?.name || 'rollercoin'}.txt`;
                                    downloadFile(txt, filename, 'text/plain;charset=utf-8;');
                                    setShowExportModal(false);
                                    setStatusMessage({ text: "Arquivo Texto (.txt) baixado com sucesso!", type: 'success' });
                                }}
                                className="w-full p-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-between shadow-lg shadow-blue-600/20 transition-all active:scale-98"
                            >
                                <div className="flex items-center gap-3 text-left">
                                    <div className="p-2 bg-white/20 rounded-xl">
                                        <FileText size={18} />
                                    </div>
                                    <div>
                                        <p className="font-black">Baixar Texto (.txt)</p>
                                        <p className="text-[10px] font-medium opacity-90 lowercase font-sans">Relatório formatado: topo o que sai, embaixo o que entra</p>
                                    </div>
                                </div>
                                <Download size={18} />
                            </button>

                            <button
                                onClick={() => {
                                    const txt = generateModificationsTXT();
                                    navigator.clipboard.writeText(txt);
                                    setCopiedAlert(true);
                                    setTimeout(() => setCopiedAlert(false), 2500);
                                    setStatusMessage({ text: "Relatório de modificações copiado para a área de transferência!", type: 'success' });
                                }}
                                className="w-full p-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-98"
                            >
                                {copiedAlert ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                                <span>{copiedAlert ? "Copiado com sucesso!" : "Copiar Relatório em Texto"}</span>
                            </button>
                        </div>

                        <div className="text-center pt-1 border-t border-slate-100 dark:border-slate-700">
                            <button
                                onClick={() => {
                                    handleExportRoomJSON();
                                    setShowExportModal(false);
                                    setStatusMessage({ text: "JSON da sala copiado!", type: 'info' });
                                }}
                                className="text-[10px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 underline"
                            >
                                Ou copiar sala inteira em formato JSON (Backup)
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL DE OTIMIZAÇÃO COM TETO DE PODER REAL */}
            {showOptimizeModal && (
                <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white dark:bg-dark-800 rounded-3xl max-w-lg w-full p-6 space-y-5 border border-slate-200 dark:border-slate-700 shadow-2xl animate-scale-up">
                        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
                            <div className="flex items-center gap-3">
                                <div className={`p-2.5 rounded-2xl ${
                                    pendingOptimizeTarget === 'real_power'
                                        ? 'bg-emerald-500/10 text-emerald-500'
                                        : pendingOptimizeTarget === 'power'
                                            ? 'bg-blue-500/10 text-blue-500'
                                            : 'bg-cyan-500/10 text-cyan-500'
                                }`}>
                                    {pendingOptimizeTarget === 'real_power' && <Wand2 size={24} />}
                                    {pendingOptimizeTarget === 'power' && <Zap size={24} />}
                                    {pendingOptimizeTarget === 'bonus' && <Award size={24} />}
                                </div>
                                <div>
                                    <h3 className="font-display font-black text-slate-900 dark:text-white uppercase tracking-tight text-base sm:text-lg flex items-center gap-2">
                                        Otimizar Sala
                                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                                            pendingOptimizeTarget === 'real_power'
                                                ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
                                                : pendingOptimizeTarget === 'power'
                                                    ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                                                    : 'bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300'
                                        }`}>
                                            {pendingOptimizeTarget === 'real_power' ? 'Auto Real' : pendingOptimizeTarget === 'power' ? 'Força Bruta' : 'Bônus Máximo'}
                                        </span>
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {pendingOptimizeTarget === 'real_power' && 'Maximiza o Poder Real equilibrando força e bônus.'}
                                        {pendingOptimizeTarget === 'power' && 'Maximiza o Poder Bruto por célula.'}
                                        {pendingOptimizeTarget === 'bonus' && 'Maximiza o percentual de bônus único.'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowOptimizeModal(false)}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg font-bold p-1 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                                    Teto Máximo de Poder Real (Opcional)
                                </label>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2 leading-relaxed">
                                    Defina o valor máximo que a sala pode alcançar. A otimização não ultrapassará este teto rígido. Deixe em branco para otimizar <strong>sem teto</strong>.
                                </p>

                                <div className="flex gap-2">
                                    <div className="relative flex-grow">
                                        <input
                                            type="text"
                                            value={ceilingInput}
                                            onChange={(e) => setCeilingInput(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    handleConfirmOptimize();
                                                }
                                            }}
                                            placeholder="Ex: 3,999 ou 500 ph/s (em branco = sem teto)"
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition-all placeholder:text-slate-400 placeholder:font-sans"
                                            autoFocus
                                        />
                                    </div>
                                    <select
                                        value={ceilingUnit}
                                        onChange={(e) => setCeilingUnit(e.target.value as any)}
                                        className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                                        title="Unidade de medida padrão para o teto"
                                    >
                                        <option value="EH">EH/s</option>
                                        <option value="ZH">ZH/s</option>
                                        <option value="PH">PH/s</option>
                                        <option value="TH">TH/s</option>
                                        <option value="GH">GH/s</option>
                                    </select>
                                </div>

                                <div className="space-y-2 mt-3">
                                    {(() => {
                                        const userCap = resolveLeagueCap(profileData?.league);
                                        return (
                                            <div className="flex items-center justify-between gap-1.5 flex-wrap">
                                                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                                                    <span>Atalhos de Ligas (Tetos Rápidos):</span>
                                                </label>
                                                <div className="flex items-center gap-1.5 flex-wrap">
                                                    {userCap && (
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setCeilingInput(userCap.value);
                                                                setCeilingUnit(userCap.unit);
                                                            }}
                                                            className="text-[10px] font-bold px-2 py-0.5 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all flex items-center gap-1 cursor-pointer"
                                                            title={`Restaurar teto sugerido para sua liga (${userCap.tierName}: ${userCap.value} ${userCap.unit}/s)`}
                                                        >
                                                            <Award size={11} className="text-blue-500" />
                                                            <span>Sua Liga: {userCap.tierName}</span>
                                                        </button>
                                                    )}
                                                    <button
                                                        type="button"
                                                        onClick={() => setCeilingInput('')}
                                                        className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border transition-all cursor-pointer ${
                                                            !ceilingInput.trim()
                                                                ? 'bg-blue-500 text-white border-blue-500 shadow-xs'
                                                                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 border-slate-200 dark:border-slate-700'
                                                        }`}
                                                    >
                                                        Limpar (Sem Teto)
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })()}

                                    <div className="space-y-1.5 p-2 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/80 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                                        {LEAGUE_CAP_PRESETS.map(league => (
                                            <div
                                                key={league.id}
                                                className={`flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-xl border transition-all ${league.containerBg}`}
                                            >
                                                <span
                                                    className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md border flex-shrink-0 text-center tracking-wider w-18 ${league.badgeBg}`}
                                                    title={`Liga ${league.leagueName}`}
                                                >
                                                    {league.leagueName}
                                                </span>
                                                <div className="flex flex-wrap gap-1 items-center flex-grow">
                                                    {league.tiers.map(tier => {
                                                        const cleanInput = ceilingInput.trim().replace('.', ',');
                                                        const isActive = cleanInput === tier.value && ceilingUnit === tier.unit;
                                                        return (
                                                            <button
                                                                key={`${league.id}_${tier.value}`}
                                                                type="button"
                                                                onClick={() => {
                                                                    setCeilingInput(tier.value);
                                                                    setCeilingUnit(tier.unit);
                                                                }}
                                                                title={tier.tooltip}
                                                                className={`text-[10px] font-bold px-2 py-0.5 rounded-md transition-all active:scale-95 flex items-center gap-1 border cursor-pointer ${
                                                                    isActive
                                                                        ? league.activeBtn
                                                                        : league.idleBtn
                                                                }`}
                                                            >
                                                                <span className="opacity-60 text-[8px] font-mono font-black">{tier.numeral}</span>
                                                                <span>{tier.value}</span>
                                                                <span className="text-[8px] opacity-75 font-mono">{tier.unit}</span>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* CARD DE FEEDBACK EM TEMPO REAL */}
                            {(() => {
                                const parsed = parseCeilingValueToGhs(ceilingInput, ceilingUnit);
                                if (!ceilingInput.trim()) {
                                    return (
                                        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/80 flex items-start gap-2.5 text-xs">
                                            <Sparkles size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="font-bold text-slate-700 dark:text-slate-200">
                                                    Modo Sem Teto de Poder
                                                </p>
                                                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                                    A sala será preenchida normalmente aproveitando todas as células disponíveis (até {initialRoomState?.maxCellsCapacity || 528} cél.).
                                                </p>
                                            </div>
                                        </div>
                                    );
                                }
                                if (parsed !== null) {
                                    return (
                                        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 flex items-start gap-2.5 text-xs">
                                            <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="font-bold text-emerald-800 dark:text-emerald-300">
                                                    Teto Rígido Reconhecido: {formatPower(parsed)}
                                                </p>
                                                <p className="text-[11px] text-emerald-700/80 dark:text-emerald-400/80 mt-0.5">
                                                    A montagem parará assim que atingir a melhor composição possível <strong>sem ultrapassar</strong> {formatPower(parsed)}.
                                                </p>
                                            </div>
                                        </div>
                                    );
                                }
                                return (
                                    <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 flex items-start gap-2.5 text-xs">
                                        <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-bold text-red-800 dark:text-red-300">
                                                Formato de Poder Inválido
                                            </p>
                                            <p className="text-[11px] text-red-700/80 dark:text-red-400/80 mt-0.5">
                                                Digite um número positivo (ex: 3,999 ou 500 ph/s) ou deixe o campo em branco.
                                            </p>
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>

                        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-700">
                            <button
                                onClick={() => setShowOptimizeModal(false)}
                                className="px-4 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleConfirmOptimize}
                                disabled={Boolean(ceilingInput.trim() && parseCeilingValueToGhs(ceilingInput, ceilingUnit) === null)}
                                className={`px-5 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl text-white shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 ${
                                    pendingOptimizeTarget === 'real_power'
                                        ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
                                        : pendingOptimizeTarget === 'power'
                                            ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'
                                            : 'bg-cyan-600 hover:bg-cyan-700 shadow-cyan-600/20'
                                }`}
                            >
                                {pendingOptimizeTarget === 'real_power' && <Wand2 size={14} />}
                                {pendingOptimizeTarget === 'power' && <Zap size={14} />}
                                {pendingOptimizeTarget === 'bonus' && <Award size={14} />}
                                <span>Executar Otimização</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
