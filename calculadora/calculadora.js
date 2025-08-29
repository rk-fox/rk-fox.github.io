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

    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }

          
}

// Função para buscar os "min" das moedas desejadas
async function buscarMinimos() {
  const url = "https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/wallet/get-currencies-config";

  // Lista das moedas que você quer filtrar
  const chavesDesejadas = [
    "RST", "SAT", "LTC_SMALL", "BNB_SMALL", "MATIC_SMALL",
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

// 🔹 Lista de moedas que aparecem na tabela
const moedasTabela = [
  "RLT", "RST", "BTC", "LTC", "BNB",
  "POL", "XRP", "DOGE", "ETH", "TRX", "SOL"
];

// 🔹 Função para atualizar a tabela
function atualizarTabela(resultados, minimos, poderAtual) {
  moedasTabela.forEach(moeda => {
    try {
      const tempo = resultados[`${moeda}tempo`] ?? null;
      const bloco = resultados[`${moeda}bloco`] ?? null;   // supondo que vc já tenha capturado o reward/block
      const poderRede = resultados[`${moeda}poderrede`] ?? null; // supondo que tenha guardado isso também

      if (!tempo || !bloco || !poderRede) {
        console.warn(`Dados incompletos para ${moeda}`);
        return;
      }

      // 🔹 Cálculos
      const tempoMin = (tempo / 60).toFixed(2); 
      const fblk = (poderAtual / (poderRede + poderAtual)) * bloco;
      const fdia = (86400 / tempo) * fblk;
      const fmes = fdia * 30;

      let saque = "-";
      if (!["RLT", "RST", "LTC"].includes(moeda)) {
        const minimo = minimos[moedaMap[moeda]] ?? null;
        if (minimo) {
          saque = ((minimo / fblk) * tempo / 60).toFixed(1) + " dias";
        }
      }

      // 🔹 Atualizar na tabela
      document.getElementById(`${moeda}tempo`).innerText = tempoMin;
      document.getElementById(`${moeda}bloco`).innerText = bloco;
      document.getElementById(`${moeda}fblk`).innerText = fblk.toFixed(6);
      document.getElementById(`${moeda}fdia`).innerText = fdia.toFixed(6);
      document.getElementById(`${moeda}fmes`).innerText = fmes.toFixed(6);
      document.getElementById(`${moeda}saque`).innerText = saque;

    } catch (err) {
      console.error(`Erro ao atualizar ${moeda}:`, err);
    }
  });
}

// 🔹 Mapeamento de tokens para balance_key usado no buscarMinimos()
const moedaMap = {
  "RLT": "RLT",
  "RST": "RST",
  "BTC": "SAT",
  "LTC": "LTC_SMALL",
  "BNB": "BNB_SMALL",
  "POL": "MATIC_SMALL",
  "XRP": "XRP_SMALL",
  "DOGE": "DOGE_SMALL",
  "ETH": "ETH_SMALL",
  "TRX": "TRX_SMALL",
  "SOL": "SOL_SMALL"
};


