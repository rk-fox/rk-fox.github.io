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

    // Extraindo dados de data.racks
    const racks = jsonData.data.racks.map(rack => ({
      _id: rack._id,
      room_level: rack.placement.room_level,
      x: rack.placement.x,
      y: rack.placement.y
    }));

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
    console.log("Racks Data:", racks);
    console.log("Total Power:", formattedTotalPower);
    console.log("Total Bonus Percent:", totalBonusPercent);
    console.log("Adjusted Power (formatted):", formattedAdjustedPower);
    console.log("Miner Impacts (sorted):", minerImpacts.map(impact => ({
      name: impact.name,
      power: impact.formattedPower, // Exibe o valor formatado
      bonus_percent: impact.bonus_percent,
      formattedImpact: impact.formattedImpact, // Exibe o impacto formatado
    })));
  })
  .catch(error => {
    console.error("Erro ao obter dados da API:", error);
  });
