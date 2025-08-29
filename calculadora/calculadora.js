// ============================================================================
// VARIÁVEIS GLOBAIS E CONFIGURAÇÕES
// ============================================================================

let urlLiga = ""; // Armazena o ID da liga do usuário
let dadosTempos = {}; // Cache para os resultados de buscarTempos
let dadosMinimos = {}; // Cache para os resultados de buscarMinimos

// Mapa para traduzir nossas siglas (BTC) para os IDs da API CoinGecko (bitcoin)
const coinGeckoIds = {
  BTC: 'bitcoin',
  LTC: 'litecoin',
  BNB: 'binancecoin',
  POL: 'polygon-ecosystem-token',
  XRP: 'ripple',
  DOGE: 'dogecoin',
  ETH: 'ethereum',
  TRX: 'tron',
  SOL: 'solana'
};

/**
 * Trunca um número para um número específico de casas decimais sem arredondamento.
 * @param {number} num O número para truncar.
 * @param {number} places A quantidade de casas decimais a manter.
 * @returns {number} O número truncado.
 */
function truncateNumber(num, places) {
  if (num == null || !isFinite(num)) {
    return num;
  }
  const factor = Math.pow(10, places);
  return Math.trunc(num * factor) / factor;
}

// Mapa que associa cada moeda ao seu divisor específico para o block reward
const divisoresMoedas = {
  RLT: 1e6,  // 1,000,000
  RST: 1e6,  // 1,000,000
  BTC: 1e10, // 10,000,000,000
  LTC: 1e8,  // 100,000,000
  BNB: 1e10, // 10,000,000,000
  POL: 1e10, // 10,000,000,000 (MATIC)
  XRP: 1e6,  // 1,000,000
  DOGE: 1e4,   // 10,000
  ETH: 1e10, // 10,000,000,000
  TRX: 1e10, // 10,000,000,000
  SOL: 1e9   // 1,000,000,000
};

// Definição dos conjuntos de moedas por liga
const moedasb1 = { RLT: "RLT", RST: "RST", BTC: "SAT", LTC: "LTC_SMALL" };
const moedasb2 = { ...moedasb1, BNB: "BNB_SMALL" };
const moedasb3 = { ...moedasb2, POL: "MATIC_SMALL" };
const moedasp1 = { ...moedasb3, XRP: "XRP_SMALL" };
const moedasp2 = { ...moedasp1, DOGE: "DOGE_SMALL" };
const moedasp3 = { ...moedasp2, ETH: "ETH_SMALL" };
const moedaso1 = { ...moedasp3, TRX: "TRX_SMALL" };
const moedaso2 = { ...moedaso1, SOL: "SOL_SMALL" };
const moedasd = { RST: "RST", BTC: "SAT", LTC: "LTC_SMALL", BNB: "BNB_SMALL", POL: "MATIC_SMALL", XRP: "XRP_SMALL", DOGE: "DOGE_SMALL", ETH: "ETH_SMALL", TRX: "TRX_SMALL", SOL: "SOL_SMALL" };

// Mapa que associa o ID da liga ao seu conjunto de moedas
const ligaMoedasMap = {
  "68af01ce48490927df92d687": moedasb1, "68af01ce48490927df92d686": moedasb2, "68af01ce48490927df92d685": moedasb3,
  "68af01ce48490927df92d684": moedasp1, "68af01ce48490927df92d683": moedasp2, "68af01ce48490927df92d682": moedasp3,
  "68af01ce48490927df92d681": moedaso1, "68af01ce48490927df92d680": moedaso2, "68af01ce48490927df92d67f": moedaso2,
  "68af01ce48490927df92d67e": moedaso2, "68af01ce48490927df92d67d": moedaso2, "68af01ce48490927df92d67c": moedaso2,
  "68af01ce48490927df92d67b": moedasd, "68af01ce48490927df92d67a": moedasd, "68af01ce48490927df92d679": moedasd,
};

// Pegar a data UTC no formato YYYY-MM-DD para as requisições
const hojeUTC = new Date().toISOString().slice(0, 10);

// ============================================================================
// FUNÇÕES DE BUSCA DE DADOS (APIs)
// ============================================================================

/**
 * Busca os preços atuais das criptomoedas em USD e BRL.
 * @returns {Promise<Object>} Um objeto com os preços, ex: { BTC: { usd: 50000, brl: 250000 }, ... }
 */
async function getCryptoPrices() {
  const ids = Object.values(coinGeckoIds).join(',');
  const url = `https://summer-night-03c0.rk-foxx-159.workers.dev/?https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd,brl`;
  const prices = {};

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Erro na requisição da API de cotações");
    const data = await res.json();

    for (const [symbol, id] of Object.entries(coinGeckoIds)) {
      if (data[id]) {
        prices[symbol] = {
          usd: data[id].usd,
          brl: data[id].brl
        };
      }
    }
    console.log("Cotações carregadas:", prices);
    return prices;
  } catch (err) {
    console.error("Erro ao buscar preços:", err);
    return {}; // Retorna objeto vazio em caso de erro
  }
}

/**
 * Busca dados de tempo de bloco, recompensa e poder da rede para a liga atual.
 * @returns {Promise<Object>} Um objeto contendo os resultados agrupados.
 */
async function buscarTempos() {
  const moedas = ligaMoedasMap[urlLiga] ?? {};
  
  const resultados = {
    duration: {},
    block_reward: {},
    total_power: {}
  };

  
  const promises = [];

  // Mapeamento simples dos grupos da API para nossos sufixos de chave
    const groupMap = {
        duration: { key: 'tempo', obj: resultados.duration },
        block_reward: { key: 'bloco', obj: resultados.block_reward },
        total_power: { key: 'poderrede', obj: resultados.total_power }
    };

    for (const [moeda, token] of Object.entries(moedas)) {
        for (const [apiGroup, { key: suffix, obj: targetObject }] of Object.entries(groupMap)) {
            const url = `https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/league/network-info-by-day?from=${hojeUTC}&to=${hojeUTC}&currency=${token}&groupBy=${apiGroup}&leagueId=${urlLiga}`;
            
            promises.push(
                fetch(url)
                    .then(resp => {
                        if (!resp.ok) return { data: [] }; // Evita erro se a requisição falhar
                        return resp.json();
                    })
                    .then(json => {
                        let value = json.data[0]?.value ?? null;

                        // Aplica o divisor específico para block_reward
                        if (apiGroup === 'block_reward' && value !== null) {
                            const divisor = divisoresMoedas[moeda];
                            if (divisor) {
                                value = value / divisor;
                            } else {
                                console.warn(`Nenhum divisor encontrado para a moeda: ${moeda}. Usando valor bruto.`);
                            }
                        }
                        
                        // Constrói a chave correta e armazena no objeto de destino
                        targetObject[`${moeda}${suffix}`] = value;
                    })
                    .catch(err => {
                        console.error(`Erro ao buscar ${moeda} (${apiGroup}):`, err);
                        // Garante que a chave exista como nula em caso de erro de rede
                        const finalKey = `${moeda}${suffix}`;
                        targetObject[finalKey] = null;
                    })
            );
        }
    }

    // Espera todas as requisições terminarem
    await Promise.all(promises);
    
    console.log("Dados da Liga (corrigido):", resultados);
    return resultados;
}

/**
 * Busca os valores mínimos de saque para as moedas.
 * @returns {Promise<Object>} Um objeto com os valores mínimos por balance_key.
 */
async function buscarMinimos() {
  const url = "https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/wallet/get-currencies-config";
  const chavesDesejadas = ["SAT", "BNB_SMALL", "MATIC_SMALL", "XRP_SMALL", "DOGE_SMALL", "ETH_SMALL", "TRX_SMALL", "SOL_SMALL"];
  const resultados = {};

  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error("Erro ao buscar dados da API de config");
    const json = await resp.json();
    for (let moeda of json.data.currencies_config) {
      if (chavesDesejadas.includes(moeda.balance_key)) {
        resultados[moeda.balance_key] = moeda.min;
      }
    }
    console.log("Mínimos de saque:", resultados);
    return resultados;
  } catch (err) {
    console.error("Erro ao buscar mínimos:", err);
    return {};
  }
}

// ============================================================================
// FUNÇÕES AUXILIARES (Helpers)
// ============================================================================

/**
 * Converte um valor de poder bruto em uma string formatada (Ghs, Ths, etc.).
 * @param {number} value - O valor do poder.
 * @returns {string} O poder formatado.
 */
function convertPower(value) {
  const absValue = Math.abs(value);
  const numericValue = parseFloat(value);
  if (absValue >= 1e9) return (numericValue / 1e9).toFixed(3).replace('.', ',') + ' Ehs';
  if (absValue >= 1e6) return (numericValue / 1e6).toFixed(3).replace('.', ',') + ' Phs';
  if (absValue >= 1e3) return (numericValue / 1e3).toFixed(3).replace('.', ',') + ' Ths';
  return numericValue.toFixed(3).replace('.', ',') + ' Ghs';
}

/**
 * Define o conteúdo de uma célula da tabela com um valor numérico simples, sem zeros à direita.
 */
function setCell(id, value, decimals = 6) {
  const el = document.getElementById(id);
  if (!el) return;
  
  if (value == null || !isFinite(value)) {
    el.innerText = "-";
    return;
  }

  // 1. Trunca o número para evitar arredondamento
  const truncatedValue = truncateNumber(value, decimals);
  
  // 2. Formata para exibir no máximo 'decimals' casas, sem forçar zeros
  el.innerText = truncatedValue.toLocaleString('pt-BR', {
    maximumFractionDigits: decimals 
  });
}


/**
 * Define o conteúdo de uma célula com valores de cripto, USD e BRL, sem zeros à direita no valor da cripto.
 */
function setComplexCell(id, cryptoValue, decimals, moeda, cryptoPrices) {
  const el = document.getElementById(id);
  if (!el) return;

  if (cryptoValue == null || !isFinite(cryptoValue)) {
    el.innerHTML = "-";
    return;
  }

  // 1. Trunca o valor da cripto para evitar arredondamento
  const truncatedCryptoValue = truncateNumber(cryptoValue, decimals);
  
  // 2. Formata o valor da cripto para exibir sem zeros desnecessários
  const cryptoFormatted = truncatedCryptoValue.toLocaleString('pt-BR', {
    maximumFractionDigits: decimals
  });

  const prices = cryptoPrices[moeda];

  if (!prices) {
    el.innerHTML = cryptoFormatted;
    return;
  }

  // Usa o valor original (mais preciso) para os cálculos de moeda fiduciária
  const usdValue = cryptoValue * prices.usd;
  const brlValue = cryptoValue * prices.brl;
  const usdFormatted = usdValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  const brlFormatted = brlValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  el.innerHTML = `${cryptoFormatted}<br>${usdFormatted}<br>${brlFormatted}`;
}

// ============================================================================
// FUNÇÃO PRINCIPAL E ATUALIZAÇÃO DA TABELA
// ============================================================================

/**
 * Orquestra a busca de todos os dados e aciona a atualização da interface.
 */
async function calcular() {
  const linkSala = document.getElementById("linkSala").value.trim();
  if (linkSala === "") {
    alert("Preencha o link da sala!");
    return;
  }

  document.getElementById('nome').innerText = "Carregando...";
  document.getElementById('avatar').style.display = 'none';

  try {
    // Inicia buscas de dados que não dependem umas das outras em paralelo
    const pricesPromise = getCryptoPrices();
    const profilePromise = fetch(`https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/profile/public-user-profile-data/${linkSala}`).then(res => res.json());
    
    const profileData = (await profilePromise).data;
    urlLiga = profileData.league_id; // Define a variável global necessária para outras buscas
    
    document.getElementById('nome').innerText = profileData.name;
    document.getElementById('avatar').src = `https://avatars.rollercoin.com/static/avatars/thumbnails/50/${profileData.avatar_id}.png`;
    document.getElementById('avatar').style.display = 'block';
    document.getElementById('ligaAtual').innerText = profileData.league.title.en;

    const powerData = (await fetch(`https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/profile/user-power-data/${profileData.avatar_id}`).then(res => res.json())).data;
    const poderAtual = powerData.current_power;
    document.getElementById('poderAtual').innerText = convertPower(poderAtual);
    
    // Aguarda a conclusão de todas as buscas de dados restantes
    const [cryptoPrices, tempos, minimos] = await Promise.all([
        pricesPromise,
        buscarTempos(),
        buscarMinimos()
    ]);

    dadosTempos = tempos;
    dadosMinimos = minimos;
    
    // Com todos os dados em mãos, atualiza a tabela
    atualizarTabela(poderAtual, cryptoPrices);

  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    document.getElementById('nome').innerText = "Erro ao carregar.";
    alert("Ocorreu um erro ao buscar os dados. Verifique o link da sala e tente novamente.");
  }
}

/**
 * ⭐ CORRIGIDO: Preenche a tabela de resultados com base nos dados calculados.
 * @param {number} poderAtual - O poder do usuário.
 * @param {Object} cryptoPrices - O objeto com as cotações das moedas.
 */
function atualizarTabela(poderAtual, cryptoPrices) {
  if (!urlLiga || !dadosTempos || !dadosMinimos) {
    console.warn("Dados necessários para atualizar a tabela estão faltando.");
    return;
  }
  const moedasAtivas = ligaMoedasMap[urlLiga] ?? {};
  const { duration, blockReward, totalPower } = dadosTempos;

  for (const [moeda, balanceKey] of Object.entries(moedasAtivas)) {
    const tempoSec = Number(duration[`${moeda}tempo`]);
    const bloco = Number(blockReward[`${moeda}bloco`]);
    const poderRede = Number(totalPower[`${moeda}poderrede`]);

    const tempoMin = tempoSec > 0 ? (tempoSec / 60) : null;
    
    // --- LÓGICA CORRIGIDA AQUI ---
    // A verificação agora é mais flexível e correta, permitindo que fblk seja 0.
    let fblk = null;
    if (bloco != null && poderRede != null && poderAtual != null && (poderRede + poderAtual) > 0) {
      fblk = (poderAtual / (poderRede + poderAtual)) * bloco;
    }

    const fdia = (tempoSec > 0 && fblk !== null) ? (86400 / tempoSec) * fblk : null;
    const fmes = fdia !== null ? (fdia * 30) : null;

    let saqueTexto = "X";
    if (!["RLT", "RST", "LTC"].includes(moeda)) {
      const minimo = Number(dadosMinimos?.[balanceKey]);

      // A condição 'fblk > 0' agora funciona como esperado, pois fblk não será null indevidamente.
      if (minimo > 0 && fblk > 0 && tempoSec > 0) {
        const minutosParaSaque = (minimo / fblk) * (tempoSec / 60);
        const dias = minutosParaSaque / 1440;
        saqueTexto = `${dias.toFixed(2).replace('.', ',')} dias`;
      } else {
        saqueTexto = "-";
      }
    }

    setCell(`${moeda}tempo`, tempoMin, 2);
    setCell(`${moeda}bloco`, bloco, 8);
    setCell(`${moeda}saque`, saqueTexto);
    
    setComplexCell(`${moeda}fblk`, fblk, 8, moeda, cryptoPrices);
    setComplexCell(`${moeda}fdia`, fdia, 6, moeda, cryptoPrices);
    setComplexCell(`${moeda}fmes`, fmes, 6, moeda, cryptoPrices);
  }
  console.log("Tabela atualizada com o cálculo de saque corrigido!");
}
