import { useEffect, useState } from 'react';

export interface SheetMinerTier {
    level: number; // 0=Common, 1=Uncommon, 2=Rare, 3=Epic, 4=Legendary, 5=Unreal
    power: number; // in GH/s
    bonus: number; // in %
}

export interface SheetMinerData {
    name: string;
    status?: string;
    size?: number;
    tiers: SheetMinerTier[];
    isSellable: boolean;
}

const SHEET_ID = "171LSMNAiJ74obfmLzueKtzuyu7Bg9Ql5dBWQ1GkjQTI";
const API_KEY = "AIzaSyBP12YfPrz9MhCH3J7boeondSm7HYVCUvA";
const SHEET_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Web!A1:AE?key=${API_KEY}`;

const CACHE_KEY = "rc_sheet_miner_database_v2";
const CACHE_TIMESTAMP_KEY = "rc_sheet_miner_database_ts";
const CACHE_MAX_AGE_MS = 1000 * 60 * 60 * 4; // 4 horas antes de revalidar em segundo plano

/**
 * Lê o cache do localStorage imediatamente para garantir carregamento instantâneo (0ms).
 */
const initCacheFromStorage = (): SheetMinerData[] => {
    try {
        if (typeof window !== 'undefined' && window.localStorage) {
            const stored = localStorage.getItem(CACHE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            }
        }
    } catch (e) {
        console.warn("Aviso ao ler cache do localStorage no sheetDatabase:", e);
    }
    return [];
};

let cachedDb: SheetMinerData[] = initCacheFromStorage();
let inflightPromise: Promise<SheetMinerData[]> | null = null;
const listeners = new Set<(db: SheetMinerData[]) => void>();

/**
 * Determina se o status da planilha indica vendível/negociável ou inegociável.
 * Status na planilha:
 * - 'Sellable|Mergeable' -> true
 * - 'Sellable|Don't Mergeable' -> true
 * - 'Don't sellable|Mergeable' -> false
 * - 'Don't Sellable|Don't Mergeable' -> false
 */
export const isSellableStatus = (status?: string): boolean => {
    if (!status || typeof status !== 'string') return false;
    const s = status.toLowerCase().trim();

    // 1. Prioridade máxima para verificar negações ("Don't sellable", "Não pode...", "Inegociável")
    if (
        s.includes("don't sellable") ||
        s.includes("dont sellable") ||
        s.includes("not sellable") ||
        s.includes("can't be sold") ||
        s.includes("cant be sold") ||
        s.includes("não pode") ||
        s.includes("nao pode") ||
        s.includes("no se puede") ||
        s.includes("no se pode") ||
        s.includes("inegoci")
    ) {
        return false;
    }

    // 2. Se tiver indicativo positivo de venda
    if (
        s.includes("sellable") ||
        s.includes("pode ser vendido") ||
        s.includes("se puede vender") ||
        s.includes("can be sold") ||
        s.includes("vendív") ||
        s.includes("vendiv")
    ) {
        return true;
    }

    return false;
};

export const normalizeMinerName = (s: string): string => {
    return (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
};

export const cleanBaseMinerName = (s: string): string => {
    return (s || '')
        .replace(/\s+(?:I|II|III|IV|V|VI|VII|VIII|IX|X)\b/i, '')
        .replace(/\s+(?:lvl\.?|level)\s*\d+\b/i, '')
        .replace(/\s*\((?:Common|Uncommon|Rare|Epic|Legendary|Unreal|Legado|Legacy|Incomum|Rara|Épica|Epica|Lendária|Lendaria)\)/i, '')
        .trim();
};

export const findSheetMiner = (name: string, db: SheetMinerData[]): SheetMinerData | undefined => {
    if (!name || !db || db.length === 0) return undefined;
    const targetNorm = normalizeMinerName(name);

    // 1. Correspondência exata normalizada
    let match = db.find(m => normalizeMinerName(m.name) === targetNorm);
    if (match) return match;

    // 2. Correspondência sem sufixo de nível ou numeral romano
    const cleaned = cleanBaseMinerName(name);
    if (cleaned && cleaned !== name) {
        const cleanedNorm = normalizeMinerName(cleaned);
        match = db.find(m => normalizeMinerName(m.name) === cleanedNorm);
        if (match) return match;
    }

    // 3. Correspondência por prefixo
    const lower = name.toLowerCase().trim();
    match = db.find(m => {
        const dbLower = m.name.toLowerCase().trim();
        return lower.startsWith(dbLower + ' ') || lower.startsWith(dbLower + '(');
    });
    if (match) return match;

    // 4. Inclusão de substring para nomes mais longos
    match = db.find(m => {
        const normDb = normalizeMinerName(m.name);
        return normDb.length >= 4 && targetNorm.includes(normDb);
    });

    return match;
};

/**
 * Consulta a base da planilha para verificar se a miner é vendível.
 */
export const isMinerSellable = (minerName: string, customDb?: SheetMinerData[]): boolean => {
    const db = (customDb && customDb.length > 0) ? customDb : cachedDb;
    if (!db || db.length === 0) return false;
    const found = findSheetMiner(minerName, db);
    return found ? found.isSellable : false;
};

export const getCachedSheetDatabase = (): SheetMinerData[] => {
    return cachedDb;
};

const parseRawRows = (rows: any[]): SheetMinerData[] => {
    const parsePwr = (val: string | undefined): number => {
        if (!val) return 0;
        const clean = val.replace(/\s+/g, '').replace(/,/g, '');
        return (parseFloat(clean) || 0) * 1000;
    };

    const parseBns = (val: string | undefined): number => {
        if (!val) return 0;
        const clean = val.replace(/%/g, '').replace(/,/g, '.').trim();
        return parseFloat(clean) || 0;
    };

    return rows
        .filter((row: any) => row && row[0] && typeof row[0] === 'string' && row[0].trim() !== '')
        .map((row: any) => {
            const name = String(row[0]).trim();
            const status = row[1] || '';
            const size = parseInt(row[2], 10) || 2;
            const isSellable = isSellableStatus(status);

            const tiers: SheetMinerTier[] = [];
            // Col D & E: Comum (Lvl 0)
            if (row[3] !== undefined && row[3] !== '') tiers.push({ level: 0, power: parsePwr(row[3]), bonus: parseBns(row[4]) });
            // Col F & G: Incomum (Lvl 1)
            if (row[5] !== undefined && row[5] !== '') tiers.push({ level: 1, power: parsePwr(row[5]), bonus: parseBns(row[6]) });
            // Col L & M: Rara (Lvl 2)
            if (row[11] !== undefined && row[11] !== '') tiers.push({ level: 2, power: parsePwr(row[11]), bonus: parseBns(row[12]) });
            // Col R & S: Épica (Lvl 3)
            if (row[17] !== undefined && row[17] !== '') tiers.push({ level: 3, power: parsePwr(row[17]), bonus: parseBns(row[18]) });
            // Col X & Y: Lendária (Lvl 4)
            if (row[23] !== undefined && row[23] !== '') tiers.push({ level: 4, power: parsePwr(row[23]), bonus: parseBns(row[24]) });
            // Col AD & AE: Unreal (Lvl 5)
            if (row[29] !== undefined && row[29] !== '') tiers.push({ level: 5, power: parsePwr(row[29]), bonus: parseBns(row[30]) });

            return { name, status, size, tiers, isSellable };
        });
};

/**
 * Carrega a planilha com estratégia Cache-First (Instantâneo) + Stale-While-Revalidate em segundo plano.
 */
export const loadSheetDatabase = async (forceFresh = false): Promise<SheetMinerData[]> => {
    if (inflightPromise) return inflightPromise;

    const isCacheStale = () => {
        try {
            const ts = localStorage.getItem(CACHE_TIMESTAMP_KEY);
            if (!ts) return true;
            return Date.now() - parseInt(ts, 10) > CACHE_MAX_AGE_MS;
        } catch {
            return true;
        }
    };

    // Se temos cache rápido em memória e não está expirado nem forçado, retorna instantâneo
    if (cachedDb.length > 0 && !forceFresh && !isCacheStale()) {
        return cachedDb;
    }

    inflightPromise = (async () => {
        try {
            // Se cache ainda estiver vazio (ex: primeiro acesso absoluto), tenta ler o fallback local estático primeiro
            if (cachedDb.length === 0) {
                try {
                    const fallbackRes = await fetch('./sheet_miners_fallback.json');
                    if (fallbackRes.ok) {
                        const rawFallback = await fallbackRes.json();
                        if (Array.isArray(rawFallback) && rawFallback.length > 0) {
                            const parsedFallback = parseRawRows(rawFallback);
                            if (parsedFallback.length > 0) {
                                cachedDb = parsedFallback;
                                listeners.forEach(cb => cb(parsedFallback));
                            }
                        }
                    }
                } catch {
                    // Ignora e continua para busca direta no Google Sheets API
                }
            }

            // Busca na API oficial do Google Sheets (atualização remota)
            const res = await fetch(SHEET_URL);
            const data = await res.json();
            if (data.values && Array.isArray(data.values) && data.values.length > 0) {
                const parsed = parseRawRows(data.values);
                cachedDb = parsed;
                try {
                    localStorage.setItem(CACHE_KEY, JSON.stringify(parsed));
                    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
                } catch {
                    // Storage quota protection
                }
                listeners.forEach(cb => cb(parsed));
                return parsed;
            }

            return cachedDb;
        } catch (e) {
            console.error("Falha ao atualizar dados da planilha Google Sheets em segundo plano:", e);
            return cachedDb;
        } finally {
            inflightPromise = null;
        }
    })();

    // Se já temos cache, não bloqueia a execução da interface enquanto atualiza silenciosamente
    if (cachedDb.length > 0) {
        return cachedDb;
    }

    return inflightPromise;
};

// React hook para usar a planilha em qualquer componente com resposta instantânea
export const useSheetDatabase = () => {
    const [sheetDb, setSheetDb] = useState<SheetMinerData[]>(cachedDb);
    const [loading, setLoading] = useState<boolean>(cachedDb.length === 0);

    useEffect(() => {
        let mounted = true;
        const handler = (data: SheetMinerData[]) => {
            if (mounted) {
                setSheetDb(data);
                setLoading(false);
            }
        };

        listeners.add(handler);

        // Se já temos dados no cache, o estado inicial já é instantâneo (0ms)
        if (cachedDb.length > 0) {
            setSheetDb(cachedDb);
            setLoading(false);
        }

        // Executa revalidação ou fetch de inicialização
        loadSheetDatabase().then(data => {
            if (mounted && data.length > 0) {
                setSheetDb(data);
                setLoading(false);
            }
        });

        return () => {
            mounted = false;
            listeners.delete(handler);
        };
    }, []);

    return { sheetDb, loading };
};
