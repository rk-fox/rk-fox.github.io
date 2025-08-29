let urlLiga = ""; // variável global

// 🔹 Variáveis globais para guardar os dados
let dadosPrecos = {};
let dadosTempos = {};
let dadosMinimos = {};

// =========================
// Buscar preços
// =========================
async function getCryptoPrices() {
  const url = "https://summer-night-03c0.rk-foxx-159.workers.dev/?https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,litecoin,binancecoin,polygon-ecosystem-token,ripple,dogecoin,ethereum,tron&vs_currencies=usd,brl";
  
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Erro na requisição da API");
    
    dadosPrecos = await res.json(); // 🔹 salva global
    
    console.log("Cotações em tempo real:", dadosPrecos);

  } catch (err) {
    console.error("Erro ao buscar preços:", err);
  }
}

// =========================
// Buscar tempos (duration, bloco, poder rede)
// =========================
const hojeUTC = new Date().toISOString().slice(0, 10);

async function buscarTempos() {
  let resultados = {};
  let resultados2 = {};
  let resultados3 = {};

  const moedas = ligaMoedasMap[urlLiga] ?? {};

  for (let [moeda, token] of Object.entries(moedas)) {
    try {
      // duration
      let resp = await fetch(`https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/league/network-info-by-day?from=${hojeUTC}&to=${hojeUTC}&currency=${token}&groupBy=duration&leagueId=${urlLiga}`);
      let json = await resp.json();
      resultados[`${moeda}tempo`] = json.data[0]?.value ?? null;

      // bloco
      resp = await fetch(`https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/league/network-info-by-day?from=${hojeUTC}&to=${hojeUTC}&currency=${token}&groupBy=block_reward&leagueId=${urlLiga}`);
      json = await resp.json();
      resultados2[`${moeda}bloco`] = json.data[0]?.value ?? null;

      // poder rede
      resp = await fetch(`https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/league/network-info-by-day?from=${hojeUTC}&to=${hojeUTC}&currency=${token}&groupBy=total_power&leagueId=${urlLiga}`);
      json = await resp.json();
      resultados3[`${moeda}poderrede`] = json.data[0]?.value ?? null;

    } catch (err) {
      console.error(`Erro ao buscar dados de ${moeda}:`, err);
    }
  }

  dadosTempos = { duration: resultados, blockReward: resultados2, totalPower: resultados3 }; // 🔹 salva global
  console.log("Dados de tempos:", dadosTempos);
}

// =========================
// Buscar mínimos
// =========================
async function buscarMinimos() {
  const url = "https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/wallet/get-currencies-config";

  const chavesDesejadas = [
    "RST", "SAT", "LTC_SMALL", "BNB_SMALL", "MATIC_SMALL",
    "XRP_SMALL", "DOGE_SMALL", "ETH_SMALL", "TRX_SMALL", "SOL_SMALL"
  ];

  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error("Erro ao buscar dados da API");

    const json = await resp.json();
    const moedas = json.data.currencies_config;

    const resultados = {};
    for (let moeda of moedas) {
      if (chavesDesejadas.includes(moeda.balance_key)) {
        resultados[moeda.balance_key] = moeda.min;
      }
    }

    dadosMinimos = resultados; // 🔹 salva global
    console.log("Mínimos das moedas:", dadosMinimos);

  } catch (err) {
    console.error("Erro ao buscar mínimos:", err);
    dadosMinimos = {};
  }
}

// =========================
// Calcular (usar dados já buscados)
// =========================
async function calcular() {
  const linkSala = document.getElementById("linkSala");
  
  if (linkSala.value.trim() === "") {
    alert("Preencha o link da sala!");
    return;
  }

  try {
    const userSala = linkSala.value.trim();

    const profileResponse = await fetch(`https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/profile/public-user-profile-data/${userSala}`); 
    const profileData = await profileResponse.json();

    const userName = profileData.data.name; 
    const avatarId = profileData.data.avatar_id;
    urlLiga = profileData.data.league_id;
    const ligaAtual = profileData.data.league.title.en;

    if (!avatarId || !userName) {
      alert('Erro ao obter o avatar_id ou nome.');
      return;
    }

    document.getElementById('avatar').src = `https://avatars.rollercoin.com/static/avatars/thumbnails/50/${avatarId}.png`;
    document.getElementById('avatar').style.display = 'block';
    document.getElementById('nome').innerText = userName;

    document.getElementById('ligaAtual').innerText = ligaAtual;

    // 🔹 Aqui você usa dadosPrecos, dadosTempos e dadosMinimos
    console.log("Dados para cálculo:");
    console.log("Preços:", dadosPrecos);
    console.log("Tempos:", dadosTempos);
    console.log("Mínimos:", dadosMinimos);

    // 🔹 Agora só falta você aplicar suas fórmulas e atualizar a tabela
    // exemplo (BTC): reward = (blockReward / totalPower) * poderConta
    // exemplo: verificar mínimo em dadosMinimos["SAT"]

  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
}

// =========================
// Executar funções iniciais
// =========================
getCryptoPrices();
buscarMinimos();
