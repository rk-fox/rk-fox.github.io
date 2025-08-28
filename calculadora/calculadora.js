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

// 🔹 Função para determinar a liga
//function getLigaInfo(value) {
    //if (value < 5_000_000)  return { nome: "BRONZE 1", link: "68af01ce48490927df92d687" };
    //if (value < 30_000_000) return { nome: "BRONZE 2", link: "68af01ce48490927df92d686" };
    //if (value < 100_000_000) return { nome: "BRONZE 3", link: "68af01ce48490927df92d685" };
    //if (value < 200_000_000) return { nome: "PRATA 1", link: "68af01ce48490927df92d684" };
    //if (value < 500_000_000) return { nome: "PRATA 2", link: "68af01ce48490927df92d683" };
    //if (value < 1_000_000_000) return { nome: "PRATA 3", link: "68af01ce48490927df92d682" };
    //if (value < 2_000_000_000) return { nome: "OURO 1", link: "68af01ce48490927df92d681" };
    //if (value < 5_000_000_000) return { nome: "OURO 2", link: "68af01ce48490927df92d680" };
    //if (value < 15_000_000_000) return { nome: "OURO 3", link: "68af01ce48490927df92d67f" };
    //if (value < 50_000_000_000) return { nome: "PLATINA 1", link: "68af01ce48490927df92d67e" };
    //if (value < 100_000_000_000) return { nome: "PLATINA 2", link: "68af01ce48490927df92d67d" };
    //if (value < 200_000_000_000) return { nome: "PLATINA 3", link: "68af01ce48490927df92d67c" };
    //if (value < 400_000_000_000) return { nome: "DIAMANTE 1", link: "68af01ce48490927df92d67b" };
    //if (value < 10_000_000_000_000) return { nome: "DIAMANTE 2", link: "68af01ce48490927df92d67a" };
    //return { nome: "DIAMANTE 3", link: "68af01ce48490927df92d679" };
//}


    const linkSala = document.getElementById("linkSala");
    const poderConta = document.getElementById("poderConta");
    const unidadePoder = document.getElementById("unidadePoder");

    // Desativa o outro input quando um é preenchido
    linkSala.addEventListener("input", () => {
      if (linkSala.value.trim() !== "") {
        poderConta.disabled = true;
        unidadePoder.disabled = true;
      } else {
        poderConta.disabled = false;
        unidadePoder.disabled = false;
      }
    });

    poderConta.addEventListener("input", () => {
      if (poderConta.value.trim() !== "") {
        linkSala.disabled = true;
      } else {
        linkSala.disabled = false;
      }
    });

    async function calcular() {
    const linkSala = document.getElementById("linkSala");
    const poderConta = document.getElementById("poderConta");
    const unidadePoder = document.getElementById("unidadePoder");

    // 🔹 Validação inicial
    if (linkSala.value.trim() === "" && poderConta.value.trim() === "") {
        alert("Preencha um dos campos antes de calcular!");
        return;
    }
    if (linkSala.value.trim() !== "" && poderConta.value.trim() !== "") {
        alert("Apenas um campo deve ser preenchido!");
        return;
    }

    // 🔹 Caso seja preenchido o poder manualmente
    if (poderConta.value.trim() !== "") {
        alert(`Poder informado: ${poderConta.value} ${unidadePoder.value}`);
        return;
    }

    // 🔹 Caso seja preenchido o link da sala (faz o fetch na API)
    try {
        const userSala = linkSala.value.trim();

        const profileResponse = await fetch(`https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/profile/public-user-profile-data/${userSala}`); 
        const profileData = await profileResponse.json();
        const userName = profileData.data.name; 
        const avatarId = profileData.data.avatar_id;
        const urlLiga = profileData.data.league_id;
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

        // Determinar liga
        //const ligaInfo = getLigaInfo(ligaAtual);

        // Atualizar na tela
        document.getElementById('poderAtual').innerText = poderConvertido; 
        document.getElementById('ligaAtual').innerText = ligaAtual;

        console.log("Poder Atual:", poderConvertido);

    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }
}
