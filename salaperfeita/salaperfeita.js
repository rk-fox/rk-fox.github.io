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

    // Unificar os dados em um único array
    const minerArray = [];

    // Processar os dados da primeira fonte (API do Rollercoin)
    miners.forEach(miner => {
      const existingMiner = minerArray.find(m => m.Nome === miner.name && m.Bonus === miner.bonus_percent / 100);

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

    // Processar os dados da segunda fonte (Campo 2)
    const field2 = document.getElementById("field2").value.trim();
    if (field2) {
      const minerRegex = /open\s+([A-Za-z\s]+)\s+Set\s+Size:\s+(\d+)\s+Cells\s+Power\s+([\d,.]+)\s+(Th\/s|Ph\/s|Gh\/s)\s+Bonus\s+([\d.]+)\s+%\s+Quantity:\s+(\d+)\s+/g;
      let match;

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
          Bonus: parseFloat(match[5]) / 100,
          Quantity: parseInt(match[6], 10),
        };

        const existingMiner = minerArray.find(m => m.Nome === miner.Nome && m.Bonus === miner.Bonus);
        if (existingMiner) {
          existingMiner.Quantity += miner.Quantity;
        } else {
          minerArray.push(miner);
        }
      }
    }

    // Implementação do algoritmo da mochila (otimizado)
    const maxCapacity = 528;
    const items = minerArray.flatMap(miner => 
      Array(miner.Quantity).fill({
        Power: miner.Power,
        Bonus: miner.Bonus,
        Size: miner.Size,
        Nome: miner.Nome,
      })
    );

    const dp = Array.from({ length: maxCapacity + 1 }, () => 0);
    const selected = Array.from({ length: maxCapacity + 1 }, () => []);

    for (const item of items) {
      for (let size = maxCapacity; size >= item.Size; size--) {
        const value = item.Power * (1 + item.Bonus);
        if (dp[size - item.Size] + value > dp[size]) {
          dp[size] = dp[size - item.Size] + value;
          selected[size] = [...selected[size - item.Size], item];
        }
      }
    }

    // Obter o melhor conjunto
    const bestSet = selected[maxCapacity];

    // Calcular somatórios e exibir resultados
    const totalPower = bestSet.reduce((sum, miner) => sum + miner.Power, 0);
    const totalBonus = bestSet.reduce((sum, miner) => sum + miner.Bonus, 0);
    const finalPower = totalPower * (1 + totalBonus);

    console.log("Melhor conjunto selecionado:", bestSet);
    console.log("Somatório do Power:", totalPower);
    console.log("Somatório do Bonus:", totalBonus);
    console.log("Resultado Final (Power * (1 + Bonus)):", finalPower);

    alert(`Processamento concluído! 
      - Somatório do Power: ${totalPower} 
      - Somatório do Bônus: ${(totalBonus).toFixed(2)}% 
      - Resultado Final: ${finalPower}`);
  } catch (error) {
    console.error("Erro ao organizar os dados:", error);
    alert("Ocorreu um erro ao processar os dados. Verifique o console para mais informações.");
  }
}
