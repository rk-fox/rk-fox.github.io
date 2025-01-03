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
        existingMiner.Quantity += miner.Quantity;
      } else {
        minerArray.push(miner);
      }
    }

    // Exibir o array unificado de mineradores no console
    console.log("Array Unificado de Mineradores:", minerArray);

    // Seleção dos 70 mineradores mais fortes
    minerArray.sort((a, b) => calculatePowerTotal(b) - calculatePowerTotal(a)); // Ordenar por PowerTotal
    const top70miners = minerArray.slice(0, 70); // Pegar os 70 mais fortes

    // Seleção dos 50 mineradores com os maiores bônus
    minerArray.sort((a, b) => b.Bonus - a.Bonus); // Ordenar por Bonus
    const top50miners = minerArray.slice(0, 50); // Pegar os 50 maiores bônus

    // Combinação dos 70 mais fortes e 50 com maior bônus (sem duplicar)
    const filteredMiners = [...new Set([...top70miners, ...top50miners])];

    console.log("Mineradores Filtrados:", filteredMiners);

    // Função para calcular o PowerTotal
    function calculatePowerTotal(miner) {
      return miner.Power * (1 + miner.Bonus);
    }

    // Função de otimização de mochila (Knapsack)
    function knapsack(miners, sizeLimit) {
      const dp = new Array(sizeLimit + 1).fill(0); // Array para armazenar o melhor PowerTotal para cada tamanho
      const selectedMiners = new Array(sizeLimit + 1).fill(null); // Para armazenar a combinação de mineradores escolhidos

      miners.forEach(miner => {
        const minerPowerTotal = calculatePowerTotal(miner);
        // Atualizar os valores de dp do final para o começo para evitar sobrescrever os resultados durante o cálculo
        for (let size = sizeLimit; size >= miner.Size; size--) {
          const newPower = dp[size - miner.Size] + minerPowerTotal;
          if (newPower > dp[size]) {
            dp[size] = newPower;
            selectedMiners[size] = miner;
          }
        }
      });

      return { totalPower: dp[sizeLimit], selectedMiners: selectedMiners[sizeLimit] };
    }

    // Executar a otimização de mochila para encontrar a melhor combinação
    const result = knapsack(filteredMiners, 528);

    // Exibir o resultado no console
    console.log("Melhor Combinação de Mineradores:", result.selectedMiners);
    console.log("Power Total:", result.totalPower);

    alert("Dados processados com sucesso! Verifique o console para mais detalhes.");
  } catch (error) {
    console.error("Erro ao organizar os dados:", error);
    alert("Ocorreu um erro ao processar os dados. Verifique o console para mais informações.");
  }
}
