async function organizar() {
  try {
    // Captura o valor do primeiro campo (ID de usuário)
    const userLink = document.getElementById("field1").value.trim();
    if (!userLink) {
      alert("Por favor, insira um valor no Campo 1.");
      return;
    }

    // URL para acessar o avatar_id
    const profileUrl = `https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/profile/public-user-profile-data/${userLink}`;
    const profileResponse = await fetch(profileUrl);

    if (!profileResponse.ok) {
      throw new Error("Erro ao acessar os dados do perfil. Verifique o ID inserido.");
    }

    const profileData = await profileResponse.json();
    const avatarId = profileData?.data?.avatar_id;

    if (!avatarId) {
      alert("Avatar ID não encontrado. Verifique o ID do usuário inserido.");
      return;
    }

    // URL para acessar os dados do miner
    const minerUrl = `https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/game/room-config/${avatarId}`;
    const minerResponse = await fetch(minerUrl);

    if (!minerResponse.ok) {
      throw new Error("Erro ao acessar os dados do minerador.");
    }

    const minerData = await minerResponse.json();
    const miners = minerData?.data?.miners;

    if (!miners || !Array.isArray(miners)) {
      alert("Dados dos mineradores não encontrados ou estão em formato inesperado.");
      return;
    }

    // Unificar os dois arrays
    const minerArray = [];

    // Processar os dados da primeira fonte (API do Rollercoin)
    miners.forEach(miner => {
      const key = `${miner.name}_${miner.bonus_percent}`;
      const existingMiner = minerArray.find(m => m.Nome === miner.name && m.bonus_percent === miner.bonus_percent);
      
      if (existingMiner) {
        existingMiner.Quantity += 1;
      } else {
        minerArray.push({
          Nome: miner.name,
          Power: miner.power,
          Bonus: miner.bonus_percent / 100,
          Size: miner.width,
          Quantity: 1
        });
      }
    });

    // Pegar o valor do Campo 2
    const field2 = document.getElementById("field2").value.trim();
    if (!field2) {
      alert("Por favor, insira um valor no Campo 2.");
      return;
    }

    // Expressão regular para extrair os dados do Campo 2
    const minerRegex = /open\s+([A-Za-z\s]+)\s+Set\s+Size:\s+(\d+)\s+Cells\s+Power\s+([\d,.]+)\s+(Th\/s|Ph\/s|Gh\/s)\s+Bonus\s+([\d.]+)\s+%\s+Quantity:\s+(\d+)\s+/g;
    let match;

    // Encontrar todas as ocorrências
    while ((match = minerRegex.exec(field2)) !== null) {
      let power = parseFloat(match[3].replace(',', '.'));
      const unit = match[4];

      if (unit === 'Th/s') {
        power *= 1000;
      } else if (unit === 'Ph/s') {
        power *= 1000000;
      }

      const miner = {
        Nome: match[1].trim(),
        Size: parseInt(match[2], 10),
        Power: power,
        Bonus: parseFloat(match[5]),
        Quantity: parseInt(match[6], 10),
      };

      // Verifica se o miner já existe no minerArray e soma a quantidade se necessário
      const existingMiner = minerArray.find(m => m.Nome === miner.Nome && m.Bonus === miner.Bonus);

      if (existingMiner) {
        existingMiner.Quantity += miner.Quantity; // Incrementa a quantidade
      } else {
        minerArray.push(miner); // Adiciona o miner ao array se não existir
      }
    }

    // Função de otimização de mochila (Knapsack) com retorno da melhor combinação
    function knapsack(Items, maxWeight) {
      const dp = Array(maxWeight + 1).fill(0); // dp[i] será o maior PowerTotal com peso i
      const solution = Array(maxWeight + 1).fill(null); // Para armazenar a solução

      for (let i = 0; i < Items.length; i++) {
        const item = Items[i];
        const value = item.Power * (1 + item.Bonus); // PowerTotal do miner
        const weight = item.Size * item.Quantity; // Peso total (Size * Quantity)

        // Iterar de trás para frente para garantir que cada item só seja considerado uma vez
        for (let w = maxWeight; w >= weight; w--) {
          if (dp[w] < dp[w - weight] + value) {
            dp[w] = dp[w - weight] + value;
            solution[w] = solution[w - weight] ? [...solution[w - weight], item] : [item]; // Armazena a combinação de mineradores
          }
        }
      }

      return solution[maxWeight]; // Retorna a combinação de mineradores
    }

    // Chamar a função Knapsack
    const maxSize = 528;
    const bestCombination = knapsack(minerArray, maxSize);

    if (bestCombination) {
      console.log("Melhor combinação de mineradores:", bestCombination);
      alert(`A melhor combinação de mineradores foi:\n${bestCombination.map(m => `${m.Nome} (PowerTotal: ${(m.Power * (1 + m.Bonus)).toFixed(2)})`).join("\n")}`);
    } else {
      console.log("Nenhuma combinação possível.");
      alert("Nenhuma combinação possível encontrada.");
    }

  } catch (error) {
    console.error("Erro ao organizar os dados:", error);
    alert("Ocorreu um erro ao processar os dados. Verifique o console para mais informações.");
  }
}
