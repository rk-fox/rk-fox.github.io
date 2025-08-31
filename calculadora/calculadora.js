// Função para reorganizar a tabela para mobile
function applyMobileTableLayout() {
    const table = document.getElementById('resultado-tabela');
    if (!table) return;

    // Clonar a tabela original para não modificar diretamente a que está no DOM
    const mobileTable = table.cloneNode(true);
    const originalBody = table.querySelector('tbody');
    const mobileBody = mobileTable.querySelector('tbody');

    // Limpar o corpo da tabela mobile para reconstruir
    mobileBody.innerHTML = '';

    // Array para armazenar a nova ordem de colunas e seus cabeçalhos para mobile
    // [original_td_index, 'Novo Cabeçalho']
    const mobileColumns = [
        { tdIndex: 0, headerText: 'TOKEN' }, // TOKEN
        { tdIndex: 1, headerText: 'TEMPO' }, // TEMPO
        { tdIndex: 4, headerText: 'DIA' },   // DIA (índice 4 na tabela original)
        { tdIndex: 6, headerText: 'SAQUE' }  // SAQUE (índice 6 na tabela original)
    ];

    // Criar um novo thead para a tabela mobile
    const newThead = document.createElement('thead');
    const newTr = document.createElement('tr');
    mobileColumns.forEach(col => {
        const th = document.createElement('th');
        th.textContent = col.headerText;
        newTr.appendChild(th);
    });
    newThead.appendChild(newTr);

    // Substituir o thead original pelo novo thead mobile
    mobileTable.querySelector('thead').replaceWith(newThead);

    // Iterar pelas linhas do corpo original para construir as novas linhas mobile
    Array.from(originalBody.rows).forEach(originalRow => {
        const newRow = document.createElement('tr');
        mobileColumns.forEach(col => {
            // Clonar a célula original para manter o ID e o span
            const originalCell = originalRow.cells[col.tdIndex];
            if (originalCell) {
                const newCell = originalCell.cloneNode(true); // Clonar a célula com conteúdo e IDs
                newRow.appendChild(newCell);
            } else {
                // Adicionar célula vazia se a original não existir (prevenção de erro)
                const emptyCell = document.createElement('td');
                emptyCell.textContent = '-';
                newRow.appendChild(emptyCell);
            }
        });
        mobileBody.appendChild(newRow);
    });

    // Substituir a tabela original pela tabela mobile modificada
    table.replaceWith(mobileTable);
    table.id = 'original-resultado-tabela'; // Mudar ID da original para controle
    mobileTable.id = 'resultado-tabela'; // Usar o mesmo ID para o CSS existente
}

// Função para restaurar a tabela original
function restoreOriginalTableLayout() {
    const mobileTable = document.getElementById('resultado-tabela');
    const originalTable = document.getElementById('original-resultado-tabela');
    if (mobileTable && originalTable) {
        mobileTable.replaceWith(originalTable);
        originalTable.id = 'resultado-tabela';
    }
}

// Media Query Listener
const mediaQuery = window.matchMedia('(max-width: 998px)'); // Ajuste o breakpoint conforme necessário

function handleTabletChange(e) {
    if (e.matches) {
        // A tela é menor ou igual a 998px
        console.log("Aplicando layout mobile...");
        applyMobileTableLayout();
    } else {
        // A tela é maior que 998px
        console.log("Restaurando layout original...");
        restoreOriginalTableLayout();
    }
}

// Adicionar listener
mediaQuery.addListener(handleTabletChange);

// Executar a função uma vez ao carregar a página para aplicar o layout inicial
handleTabletChange(mediaQuery);

// ============================================================================
// CONFIGURAÇÕES GLOBAIS
// ============================================================================

let urlLiga = ""; // Armazena o ID da liga do usuário, definido dinamicamente
let dadosTempos = {}; // Cache para os resultados de buscarTempos
let dadosMinimos = {}; // Cache para os resultados de buscarMinimos

// Mapeia nossas siglas para os IDs da API CoinGecko
const coinGeckoIds = { BTC: 'bitcoin', LTC: 'litecoin', BNB: 'binancecoin', POL: 'polygon-ecosystem-token', XRP: 'ripple', DOGE: 'dogecoin', ETH: 'ethereum', TRX: 'tron', SOL: 'solana' };

// Mapeia cada moeda ao seu divisor específico para tratar o valor de block_reward
const divisoresMoedas = { RLT: 1e6, RST: 1e6, BTC: 1e10, LTC: 1e8, BNB: 1e10, POL: 1e10, XRP: 1e6, DOGE: 1e4, ETH: 1e10, TRX: 1e10, SOL: 1e9 };

// Definição dos conjuntos de moedas por liga (usando spread operator para evitar repetição)
const moedasb1 = { RLT: "RLT", RST: "RST", BTC: "SAT", LTC: "LTC_SMALL" };
const moedasb2 = { ...moedasb1, BNB: "BNB_SMALL" };
const moedasb3 = { ...moedasb2, POL: "MATIC_SMALL" };
const moedasp1 = { ...moedasb3, XRP: "XRP_SMALL" };
const moedasp2 = { ...moedasp1, DOGE: "DOGE_SMALL" };
const moedasp3 = { ...moedasp2, ETH: "ETH_SMALL" };
const moedaso1 = { ...moedasp3, TRX: "TRX_SMALL" };
const moedaso2 = { ...moedaso1, SOL: "SOL_SMALL" };
const moedasd = { RST: "RST", BTC: "SAT", LTC: "LTC_SMALL", BNB: "BNB_SMALL", POL: "MATIC_SMALL", XRP: "XRP_SMALL", DOGE: "DOGE_SMALL", ETH: "ETH_SMALL", TRX: "TRX_SMALL", SOL: "SOL_SMALL" };

// Mapeia o ID da liga ao seu conjunto de moedas correspondente
const ligaMoedasMap = { "68af01ce48490927df92d687": moedasb1, "68af01ce48490927df92d686": moedasb2, "68af01ce48490927df92d685": moedasb3, "68af01ce48490927df92d684": moedasp1, "68af01ce48490927df92d683": moedasp2, "68af01ce48490927df92d682": moedasp3, "68af01ce48490927df92d681": moedaso1, "68af01ce48490927df92d680": moedaso2, "68af01ce48490927df92d67f": moedaso2, "68af01ce48490927df92d67e": moedaso2, "68af01ce48490927df92d67d": moedaso2, "68af01ce48490927df92d67c": moedaso2, "68af01ce48490927df92d67b": moedasd, "68af01ce48490927df92d67a": moedasd, "68af01ce48490927df92d679": moedasd };
const hojeUTC = new Date().toISOString().slice(0, 10);

// ============================================================================
// FUNÇÕES DE API (Busca de dados externos)
// ============================================================================

/**
 * Busca os preços atuais das criptomoedas em USD e BRL.
 * @returns {Promise<Object>} Um objeto com os preços. Ex: { BTC: { usd: 50000, brl: 250000 } }
 */
async function getCryptoPrices() {
  const ids = Object.values(coinGeckoIds).join(',');
  const url = `https://summer-night-03c0.rk-foxx-159.workers.dev/?https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd,brl`;
  const prices = {};
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("API de cotações falhou");
    const data = await res.json();
    for (const [symbol, id] of Object.entries(coinGeckoIds)) {
      if (data[id]) {
        prices[symbol] = { usd: data[id].usd, brl: data[id].brl };
      }
    }
    console.log("Cotações carregadas:", prices);
    return prices;
  } catch (err) {
    console.error("Erro ao buscar preços:", err);
    return {};
  }
}

/**
 * Busca dados de tempo de bloco, recompensa e poder da rede para a liga atual, de forma paralela.
 * @returns {Promise<Object>} Um objeto com os resultados agrupados.
 */
async function buscarTempos() {
    const moedas = ligaMoedasMap[urlLiga] ?? {};
    const resultados = { duration: {}, blockReward: {}, totalPower: {} };
    const promises = [];
    const groupMap = { duration: { key: 'tempo' }, block_reward: { key: 'bloco' }, total_power: { key: 'poderrede' } };

    for (const [moeda, token] of Object.entries(moedas)) {
        for (const [apiGroup, { key: suffix }] of Object.entries(groupMap)) {
            const url = `https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/league/network-info-by-day?from=${hojeUTC}&to=${hojeUTC}&currency=${token}&groupBy=${apiGroup}&leagueId=${urlLiga}`;
            promises.push(
                fetch(url)
                    .then(resp => resp.ok ? resp.json() : { data: [] })
                    .then(json => {
                        let value = json.data[0]?.value ?? null;
                        if (apiGroup === 'block_reward' && value !== null) {
                            const divisor = divisoresMoedas[moeda];
                            if (divisor) value = value / divisor;
                        }
                        if (apiGroup === 'duration') resultados.duration[`${moeda}${suffix}`] = value;
                        else if (apiGroup === 'block_reward') resultados.blockReward[`${moeda}${suffix}`] = value;
                        else if (apiGroup === 'total_power') resultados.totalPower[`${moeda}${suffix}`] = value;
                    })
                    .catch(err => console.error(`Erro em ${moeda} (${apiGroup}):`, err))
            );
        }
    }
    await Promise.all(promises);
    console.log("Dados da Liga:", resultados);
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
    if (!resp.ok) throw new Error("API de config de carteira falhou");
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
// FUNÇÕES AUXILIARES (HELPERS)
// ============================================================================

/** Converte poder bruto para uma string formatada (Ghs, Ths, Phs, Ehs). */
function convertPower(value) {
  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) return "-";
  if (numericValue >= 1e9) return (numericValue / 1e9).toFixed(3).replace('.', ',') + ' Ehs';
  if (numericValue >= 1e6) return (numericValue / 1e6).toFixed(3).replace('.', ',') + ' Phs';
  if (numericValue >= 1e3) return (numericValue / 1e3).toFixed(3).replace('.', ',') + ' Ths';
  return numericValue.toFixed(3).replace('.', ',') + ' Ghs';
}

/** Trunca um número para um N de casas decimais, sem arredondar. */
function truncateNumber(num, places) {
  if (num == null || !isFinite(num)) return num;
  const factor = Math.pow(10, places);
  return Math.trunc(num * factor) / factor;
}

/** Define o conteúdo de uma célula com um número simples, sem zeros à direita. */
function setCell(id, value, decimals = 6) {
  const el = document.getElementById(id);
  if (!el) return;
  if (value == null || !isFinite(value)) { el.innerText = "-"; return; }
  const truncatedValue = truncateNumber(value, decimals);
  el.innerText = truncatedValue.toLocaleString('pt-BR', { maximumFractionDigits: decimals });
}

/** Define o conteúdo de uma célula com texto simples. */
function setText(id, text) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerText = text ?? "-";
}

/** Define o conteúdo de uma célula com valores de cripto, USD e BRL. */
function setComplexCell(id, cryptoValue, decimals, moeda, cryptoPrices) {
  const el = document.getElementById(id);
  if (!el) return;
  if (cryptoValue == null || !isFinite(cryptoValue)) { el.innerHTML = "-"; return; }

  const truncatedCryptoValue = truncateNumber(cryptoValue, decimals);
  const cryptoFormatted = truncatedCryptoValue.toLocaleString('pt-BR', { maximumFractionDigits: decimals });
  const prices = cryptoPrices[moeda];
  if (!prices) { el.innerHTML = cryptoFormatted; return; }

  const usdValue = cryptoValue * prices.usd;
  const brlValue = cryptoValue * prices.brl;
  const usdFormatted = usdValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  const brlFormatted = brlValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  el.innerHTML = `${cryptoFormatted}<br>${usdFormatted}<br>${brlFormatted}`;
}

// ============================================================================
// LÓGICA PRINCIPAL (Orquestração e Atualização da UI)
// ============================================================================

/**
 * Função principal que orquestra a busca de todos os dados e aciona a atualização da interface.
 */
async function calcular() {
  const linkSala = document.getElementById("linkSala").value.trim();
  if (linkSala === "") { alert("Preencha o link da sala!"); return; }

  document.getElementById('nome').innerText = "Carregando...";
  document.getElementById('avatar').style.display = 'none';

  try {
    const pricesPromise = getCryptoPrices();
    const profileResponse = await fetch(`https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/profile/public-user-profile-data/${linkSala}`);
    const profileJson = await profileResponse.json();
    const profileData = profileJson.data;
    
    urlLiga = profileData.league_id;
    
    document.getElementById('nome').innerText = profileData.name;
    document.getElementById('avatar').src = `https://avatars.rollercoin.com/static/avatars/thumbnails/50/${profileData.avatar_id}.png`;
    document.getElementById('avatar').style.display = 'block';
    document.getElementById('ligaAtual').innerText = profileData.league.title.en;

    const powerResponse = await fetch(`https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/profile/user-power-data/${profileData.avatar_id}`);
    const powerJson = await powerResponse.json();
    const poderAtual = powerJson.data.current_power;
    document.getElementById('poderAtual').innerText = convertPower(poderAtual);
    
    const [cryptoPrices, tempos, minimos] = await Promise.all([ pricesPromise, buscarTempos(), buscarMinimos() ]);
    dadosTempos = tempos;
    dadosMinimos = minimos;
    
    atualizarTabela(poderAtual, cryptoPrices);

  } catch (error) {
    console.error("Erro fatal na função calcular:", error);
    document.getElementById('nome').innerText = "Erro ao carregar.";
    alert("Ocorreu um erro ao buscar os dados. Verifique o link da sala e o console para mais detalhes.");
  }
}

/**
 * Preenche a tabela de resultados com base nos dados calculados.
 * @param {number | string} poderAtual - O poder do usuário.
 * @param {Object} cryptoPrices - O objeto com as cotações das moedas.
 */
function atualizarTabela(poderAtual, cryptoPrices) {
  if (!urlLiga || !dadosTempos || !dadosMinimos) return;

  const moedasAtivas = ligaMoedasMap[urlLiga] ?? {};
  const { duration, blockReward, totalPower } = dadosTempos;

  for (const [moeda, balanceKey] of Object.entries(moedasAtivas)) {
    // 1. Converter todas as entradas para números e validar
    const poderAtualNum = Number(poderAtual);
    const tempoSec = Number(duration[`${moeda}tempo`]);
    const bloco = Number(blockReward[`${moeda}bloco`]);
    const poderRede = Number(totalPower[`${moeda}poderrede`]);
    const minimo = Number(dadosMinimos?.[balanceKey]);
    
    // 2. Cálculos robustos
    const tempoMin = isFinite(tempoSec) && tempoSec > 0 ? (tempoSec / 60) : null;
    
    let fblk = null;
    const poderTotal = poderRede + poderAtualNum;
    if (isFinite(bloco) && isFinite(poderTotal) && poderTotal > 0) {
      fblk = (poderAtualNum / poderTotal) * bloco;
    }
    
    const fdia = (isFinite(tempoSec) && tempoSec > 0 && fblk !== null) ? (86400 / tempoSec) * fblk : null;
    const fmes = fdia !== null ? (fdia * 30) : null;

    // 3. Cálculo de saque com validações
    let saqueTexto = "X";
    if (!["RLT", "RST", "LTC"].includes(moeda)) {
      if (isFinite(minimo) && minimo > 0 && fblk > 0 && isFinite(tempoSec) && tempoSec > 0) {
        const dias = ((minimo / fblk) * (tempoSec / 60)) / 1440;
        saqueTexto = `${dias.toFixed(2).replace('.', ',')} dias`;
      } else {
        saqueTexto = "-";
      }
    }

    // 4. Atualizar a UI
    setCell(`${moeda}tempo`, tempoMin, 2);
    setCell(`${moeda}bloco`, bloco, 8);
    setText(`${moeda}saque`, saqueTexto);
    setComplexCell(`${moeda}fblk`, fblk, 8, moeda, cryptoPrices);
    setComplexCell(`${moeda}fdia`, fdia, 6, moeda, cryptoPrices);
    setComplexCell(`${moeda}fmes`, fmes, 6, moeda, cryptoPrices);
  }
  console.log("Tabela atualizada com lógica robusta!");
}
