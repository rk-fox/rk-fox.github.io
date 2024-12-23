// Função para calcular o bônus extra com base nos IDs específicos
function applyBonusAdjustment(miners, targetIds, fullSetBonus, partialSetBonus) {
  // Filtra as miners do grupo específico
  const matchingMiners = miners.filter(miner => targetIds.includes(miner.miner_id));

  // Define o bônus adicional com base na quantidade de IDs encontrados
  const bonusAdjustment =
    matchingMiners.length === 4
      ? fullSetBonus
      : matchingMiners.length >= 2
      ? partialSetBonus
      : 0;

  // Aplica o ajuste no bônus de cada miner correspondente
  matchingMiners.forEach(miner => {
    miner.bonus_percent += bonusAdjustment;
  });
}

// Função para converter valores de poder
function convertPower(value) {
  if (value >= 1e6) {
    return (value / 1e6).toFixed(3).replace('.', ',') + ' Phs';
  }
  if (value >= 1e3) {
    return (value / 1e3).toFixed(3).replace('.', ',') + ' Ths';
  }
  return value.toFixed(3).replace('.', ',') + ' Ghs';
}

// Fazendo uma requisição à API para obter dados dinâmicos
fetch("https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/game/room-config/61e852b4dc27dc001969efa3")
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    return response.json();
  })
  .then(jsonData => {
    // Extraindo dados de data.miners
    const miners = [];
    const minerCount = {}; // Para contar repetições

    jsonData.data.miners.forEach(miner => {
      const key = `${miner.miner_id}_${miner.level}`;
      if (!minerCount[key]) {
        minerCount[key] = { count: 0, isFirst: true };
      }
      minerCount[key].count++;

      miners.push({
        miner_id: miner.miner_id,
        user_rack_id: miner.placement.user_rack_id,
        name: miner.name,
        width: miner.width,
        level: miner.level,
        power: miner.power,
        formattedPower: convertPower(miner.power), // Formata o valor de power para exibição
        filename: miner.filename,
        bonus_percent: minerCount[key].isFirst ? miner.bonus_percent / 100 : 0, // Apenas a primeira mantém o bônus dividido por 100
        is_in_set: miner.is_in_set,
        repetitions: minerCount[key].isFirst ? "NÃO" : minerCount[key].count, // Indica se é repetido
      });

      minerCount[key].isFirst = false; // Marca as subsequentes como não sendo as primeiras
    });

    // Aplicando ajustes nos bônus para os dois grupos de IDs específicos
    applyBonusAdjustment(miners, 
      ["66f1c200e0dd3530daa2eadf", "66f1c1b9e0dd3530daa2e9df", "66f1c18fe0dd3530daa2e8dd", "66f1c1dee0dd3530daa2ea96"], 
      10, // 10% para todas as 4
      5   // 5% para 2 ou 3
    );
    applyBonusAdjustment(miners, 
      ["6687cf817643815232d65da6", "6687cfd57643815232d65e39", "6687cf557643815232d65d5c", "6687cfae7643815232d65def"], 
      7,  // 7% para todas as 4
      2   // 2% para 2 ou 3
    );

    // Somando power e bonus_percent
    const totalPower = miners.reduce((sum, miner) => sum + miner.power, 0);
    const totalBonusPercent = miners.reduce((sum, miner) => sum + miner.bonus_percent, 0);
    const adjustedPower = totalPower * ((100 + totalBonusPercent) / 100);

    // Convertendo valores para exibição
    const formattedTotalPower = convertPower(totalPower);
    const formattedAdjustedPower = convertPower(adjustedPower);

    // Simulando a remoção de miners e calculando o impacto no total
    const minerImpacts = miners.map(miner => {
      const remainingPower = totalPower - miner.power;
      const remainingBonusPercent = totalBonusPercent - miner.bonus_percent;
      const newAdjustedPower = remainingPower * ((100 + remainingBonusPercent) / 100);
      const impact = newAdjustedPower - adjustedPower; // Alteração na fórmula do impacto

      return { 
        ...miner, 
        impact, 
        formattedImpact: convertPower(Math.abs(impact)) // Formata o impacto
      };
    });

    // Ordenando os miners pelo impacto (negativo mais próximo de zero até o mais distante)
    minerImpacts.sort((a, b) => b.impact - a.impact); // Ajuste na ordenação

    // Exibindo os dados no console
    console.log("Miners Data (formatted):", miners.map(miner => ({
      miner_id: miner.miner_id,
      name: miner.name,
      level: miner.level,
      power: miner.formattedPower, // Exibe o valor formatado
      bonus_percent: miner.bonus_percent,
      repetitions: miner.repetitions,
    })));
    console.log("Total Power:", formattedTotalPower);
    console.log("Total Bonus Percent:", totalBonusPercent);
    console.log("Adjusted Power (formatted):", formattedAdjustedPower);
    console.log("Miner Impacts (sorted):", minerImpacts.map(impact => ({
      name: impact.name,
      formattedImpact: impact.formattedImpact, // Exibe o impacto formatado
    })));
  })
  .catch(error => {
    console.error("Erro ao obter dados da API:", error);
  });
