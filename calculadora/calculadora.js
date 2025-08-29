let urlLiga = ""; // variável global


async function getCryptoPrices() {
      const url = "https://summer-night-03c0.rk-foxx-159.workers.dev/?https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,litecoin,binancecoin,polygon-ecosystem-token,ripple,dogecoin,ethereum,tron&vs_currencies=usd,brl";
      
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Erro na requisição da API");
        
        const data = await res.json();
        
        // Exibe no console
        console.log("Cotações em tempo real:");
        console.log("BTC:", data.bitcoin.usd, "USD /", data.bitcoin.brl, "BRL");
        console.log("LTC:", data.litecoin.usd, "USD /", data.litecoin.brl, "BRL");
        console.log("BNB:", data.binancecoin.usd, "USD /", data.binancecoin.brl, "BRL");
        console.log("POL:", data["polygon-ecosystem-token"].usd, "USD /", data["polygon-ecosystem-token"].brl, "BRL");
        console.log("XRP:", data.ripple.usd, "USD /", data.ripple.brl, "BRL");
        console.log("DOGE:", data.dogecoin.usd, "USD /", data.dogecoin.brl, "BRL");
        console.log("ETH:", data.ethereum.usd, "USD /", data.ethereum.brl, "BRL");
        console.log("TRX:", data.tron.usd, "USD /", data.tron.brl, "BRL");
        
      } catch (err) {
        console.error("Erro ao buscar preços:", err);
      }
    }

    // Executa assim que o site abre
    getCryptoPrices();

// 🔹 Função para converter poder em Ghs / Ths / Phs / Ehs
function convertPower(value) {
    const absValue = Math.abs(value);
    const numericValue = parseFloat(value);

    if (absValue >= 1e9) {
        return (numericValue / 1e9).toFixed(3).replace('.', ',') + ' Ehs';
    }
    if (absValue >= 1e6) {
        return (numericValue / 1e6).toFixed(3).replace('.', ',') + ' Phs';
    }
    if (absValue >= 1e3) {
        return (numericValue / 1e3).toFixed(3).replace('.', ',') + ' Ths';
    }
    return numericValue.toFixed(3).replace('.', ',') + ' Ghs';
}


    const linkSala = document.getElementById("linkSala");


// Dicionário de moedas e tokens correspondentes
const moedasb1 = {
  RLT: "RLT",
  RST: "RST",
  BTC: "SAT",
  LTC: "LTC_SMALL",
};

const moedasb2 = {
  RLT: "RLT",
  RST: "RST",
  BTC: "SAT",
  LTC: "LTC_SMALL",
  BNB: "BNB_SMALL",
};

const moedasb3 = {
  RLT: "RLT",
  RST: "RST",
  BTC: "SAT",
  LTC: "LTC_SMALL",
  BNB: "BNB_SMALL",
  POL: "MATIC_SMALL",
};

const moedasp1 = {
  RLT: "RLT",
  RST: "RST",
  BTC: "SAT",
  LTC: "LTC_SMALL",
  BNB: "BNB_SMALL",
  POL: "MATIC_SMALL",
  XRP: "XRP_SMALL",
};

const moedasp2 = {
  RLT: "RLT",
  RST: "RST",
  BTC: "SAT",
  LTC: "LTC_SMALL",
  BNB: "BNB_SMALL",
  POL: "MATIC_SMALL",
  XRP: "XRP_SMALL",
  DOGE: "DOGE_SMALL",
};

const moedasp3 = {
  RLT: "RLT",
  RST: "RST",
  BTC: "SAT",
  LTC: "LTC_SMALL",
  BNB: "BNB_SMALL",
  POL: "MATIC_SMALL",
  XRP: "XRP_SMALL",
  DOGE: "DOGE_SMALL",
  ETH: "ETH_SMALL",
};

const moedaso1 = {
  RLT: "RLT",
  RST: "RST",
  BTC: "SAT",
  LTC: "LTC_SMALL",
  BNB: "BNB_SMALL",
  POL: "MATIC_SMALL",
  XRP: "XRP_SMALL",
  DOGE: "DOGE_SMALL",
  ETH: "ETH_SMALL",
  TRX: "TRX_SMALL",
};
const moedaso2 = {
  RLT: "RLT",
  RST: "RST",
  BTC: "SAT",
  LTC: "LTC_SMALL",
  BNB: "BNB_SMALL",
  POL: "MATIC_SMALL",
  XRP: "XRP_SMALL",
  DOGE: "DOGE_SMALL",
  ETH: "ETH_SMALL",
  TRX: "TRX_SMALL",
  SOL: "SOL_SMALL"
};
const moedasd = {
  RST: "RST",
  BTC: "SAT",
  LTC: "LTC_SMALL",
  BNB: "BNB_SMALL",
  POL: "MATIC_SMALL",
  XRP: "XRP_SMALL",
  DOGE: "DOGE_SMALL",
  ETH: "ETH_SMALL",
  TRX: "TRX_SMALL",
  SOL: "SOL_SMALL"
};

// 🔹 Mapa que associa liga -> conjunto de moedas
const ligaMoedasMap = {
  "68af01ce48490927df92d687": moedasb1,
  "68af01ce48490927df92d686": moedasb2,
  "68af01ce48490927df92d685": moedasb3,
  "68af01ce48490927df92d684": moedasp1,
  "68af01ce48490927df92d683": moedasp2,
  "68af01ce48490927df92d682": moedasp3,
  "68af01ce48490927df92d681": moedaso1,
  "68af01ce48490927df92d680": moedaso2,
  "68af01ce48490927df92d67f": moedaso2,
  "68af01ce48490927df92d67e": moedaso2,
  "68af01ce48490927df92d67d": moedaso2,
  "68af01ce48490927df92d67c": moedaso2,
  "68af01ce48490927df92d67b": moedasd,
  "68af01ce48490927df92d67a": moedasd,
  "68af01ce48490927df92d679": moedasd,
};

// Pegar a data UTC no formato YYYY-MM-DD
const hojeUTC = new Date().toISOString().slice(0, 10);

// Função para buscar os dados
async function buscarTempos() {
  let resultados = {};
  let resultados2 = {};
  let resultados3 = {};

  const moedas = ligaMoedasMap[urlLiga] ?? {};

  // 🔹 duration
  for (let [moeda, token] of Object.entries(moedas)) {
    const url = `https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/league/network-info-by-day?from=${hojeUTC}&to=${hojeUTC}&currency=${token}&groupBy=duration&leagueId=${urlLiga}`;
    try {
      const resp = await fetch(url);
      const json = await resp.json();
      resultados[`${moeda}tempo`] = json.data[0]?.value ?? null;
    } catch (err) {
      console.error(`Erro ao buscar ${moeda} (duration):`, err);
      resultados[`${moeda}tempo`] = null;
    }
  }

  // 🔹 block_reward
  for (let [moeda, token] of Object.entries(moedas)) {
    const url = `https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/league/network-info-by-day?from=${hojeUTC}&to=${hojeUTC}&currency=${token}&groupBy=block_reward&leagueId=${urlLiga}`;
    try {
      const resp = await fetch(url);
      const json = await resp.json();
      resultados2[`${moeda}bloco`] = json.data[0]?.value ?? null;
    } catch (err) {
      console.error(`Erro ao buscar ${moeda} (bloco):`, err);
      resultados2[`${moeda}bloco`] = null;
    }
  }

  // 🔹 total_power
  for (let [moeda, token] of Object.entries(moedas)) {
    const url = `https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/league/network-info-by-day?from=${hojeUTC}&to=${hojeUTC}&currency=${token}&groupBy=total_power&leagueId=${urlLiga}`;
    try {
      const resp = await fetch(url);
      const json = await resp.json();
      resultados3[`${moeda}poderrede`] = json.data[0]?.value ?? null;
    } catch (err) {
      console.error(`Erro ao buscar ${moeda} (poderrede):`, err);
      resultados3[`${moeda}poderrede`] = null;
    }
  }

  console.log("Duration:", resultados);
  console.log("Block Reward:", resultados2);
  console.log("Total Power:", resultados3);

  // 🔹 Retorna tudo junto
  return { duration: resultados, blockReward: resultados2, totalPower: resultados3 };
}


    async function calcular() {
    const linkSala = document.getElementById("linkSala");
    const poderConta = document.getElementById("poderConta");
    const unidadePoder = document.getElementById("unidadePoder");

    // 🔹 Validação inicial
    if (linkSala.value.trim() === "" && poderConta.value.trim() === "") {
        alert("Preencha o link da sala!");
        return;
    }

    // 🔹 Caso seja preenchido o link da sala (faz o fetch na API)
    try {
        const userSala = linkSala.value.trim();

        const profileResponse = await fetch(`https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/profile/public-user-profile-data/${userSala}`); 
        const profileData = await profileResponse.json();
        const userName = profileData.data.name; 
        const avatarId = profileData.data.avatar_id;
        urlLiga = profileData.data.league_id;
        const ligaAtual = profileData.data.league.title.en;

          console.log(urlLiga);
          console.log(ligaAtual);

          
          

        if (!avatarId || !userName) {
            alert('Erro ao obter o avatar_id ou nome.');
            return;
        }

        const avatarUrl = `https://avatars.rollercoin.com/static/avatars/thumbnails/50/${avatarId}.png`;
        document.getElementById('avatar').src = avatarUrl;
        document.getElementById('avatar').style.display = 'block';
        document.getElementById('nome').innerText = userName;
        

        const powerDataResponse = await fetch(`https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/profile/user-power-data/${avatarId}`);
        const powerData = await powerDataResponse.json();
        //const ligaAtual = powerData.data.max_power;
        const poderAtual = powerData.data.current_power;

        // Converter poder
        const poderConvertido = convertPower(poderAtual);


        // Atualizar na tela
        document.getElementById('poderAtual').innerText = poderConvertido; 
        document.getElementById('ligaAtual').innerText = ligaAtual;

        console.log("Poder Atual:", poderConvertido);
        console.log("Poder Estendido:", poderAtual);

        // Executa
        buscarTempos();

          atualizarTabela(poderAtual);

    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }

          
}

// Função para buscar os "min" das moedas desejadas
async function buscarMinimos() {
  const url = "https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/wallet/get-currencies-config";

  // Lista das moedas que você quer filtrar
  const chavesDesejadas = [
    "SAT", "BNB_SMALL", "MATIC_SMALL",
    "XRP_SMALL", "DOGE_SMALL", "ETH_SMALL", "TRX_SMALL", "SOL_SMALL"
  ];

  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error("Erro ao buscar dados da API");

    const json = await resp.json();
    const moedas = json.data.currencies_config;

    // Filtrar apenas as moedas desejadas
    const resultados = {};

    for (let moeda of moedas) {
      if (chavesDesejadas.includes(moeda.balance_key)) {
        resultados[moeda.balance_key] = moeda.min;
      }
    }

    console.log("Mínimos das moedas:", resultados);
    return resultados;

  } catch (err) {
    console.error("Erro ao buscar mínimos:", err);
    return {};
  }
}

// Executar função
buscarMinimos();




// ------- helpers de escrita -------
function setCell(id, value, decimals = 6, suffix = "") {
  const el = document.getElementById(id);
  if (!el) return;
  if (value == null || !isFinite(value)) {
    el.innerText = "-";
  } else {
    el.innerText = Number(value).toFixed(decimals) + (suffix || "");
  }
}
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.innerText = text;
}

// ------- atualização da tabela -------
function atualizarTabela(poderAtual) {
  // guardas
  if (!urlLiga) {
    console.warn("urlLiga não definida ainda.");
    return;
  }
  if (!dadosTempos || !dadosTempos.duration || !dadosTempos.blockReward || !dadosTempos.totalPower) {
    console.warn("dadosTempos ainda não foi preenchido.");
    return;
  }
  // conjunto de moedas válidas para a liga atual
  const moedasAtivas = ligaMoedasMap[urlLiga] ?? {};

  const duration = dadosTempos.duration;       // ex.: { RLTtempo: 600, BTCtempo: 900, ... }
  const blockReward = dadosTempos.blockReward; // ex.: { RLTbloco: 0.1, BTCbloco: 2500, ... }
  const totalPower = dadosTempos.totalPower;   // ex.: { RLTpoderrede: 1.2e12, ... }

  for (const [moeda, balanceKey] of Object.entries(moedasAtivas)) {
    // ler valores brutos
    const tempoSec   = Number(duration[`${moeda}tempo`]);       // segundos por bloco
    const bloco      = Number(blockReward[`${moeda}bloco`]);    // recompensa por bloco (na moeda)
    const poderRede  = Number(totalPower[`${moeda}poderrede`]); // poder total da rede

    // cálculos
    const tempoMin   = isFinite(tempoSec) && tempoSec > 0 ? (tempoSec / 60) : null; // exibir na coluna TEMPO
    const fblk       = (isFinite(bloco) && isFinite(poderRede) && isFinite(poderAtual))
                       ? (poderAtual / (poderRede + poderAtual)) * bloco
                       : null;
    const fdia       = (isFinite(tempoSec) && tempoSec > 0 && isFinite(fblk))
                       ? (86400 / tempoSec) * fblk
                       : null;
    const fmes       = isFinite(fdia) ? (fdia * 30) : null;

    // Saque: não calcular para RLT, RST, LTC
    let saqueTexto = "-";
    if (!["RLT", "RST", "LTC"].includes(moeda)) {
      const minimo = Number(dadosMinimos?.[balanceKey]); // ex.: "SAT", "MATIC_SMALL", etc.
      // fórmula pedida: minimo / fblk * (tempoSec / 60)  => minutos
      // para exibir em "dias" como no seu exemplo, dividimos por 1440:
      const minutosParaSaque = (isFinite(minimo) && isFinite(fblk) && fblk > 0 && isFinite(tempoSec) && tempoSec > 0)
        ? (minimo / fblk) * (tempoSec / 60)
        : null;

      if (isFinite(minutosParaSaque)) {
        const dias = minutosParaSaque / 1440;
        saqueTexto = `${dias.toFixed(2)} dias`;
      } else {
        saqueTexto = "-";
      }
    }

    // escrever na tabela
    setCell(`${moeda}tempo`, tempoMin, 2);   // TEMPO = segundos/60 (min)
    setCell(`${moeda}bloco`, bloco, 8);      // RECOMPENSA por bloco
    setCell(`${moeda}fblk`,  fblk, 8);       // FARM por bloco
    setCell(`${moeda}fdia`,  fdia, 6);       // FARM por dia
    setCell(`${moeda}fmes`,  fmes, 6);       // FARM por mês
    setText(`${moeda}saque`, saqueTexto);    // SAQUE (ou "-")
  }
}


