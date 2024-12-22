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
    const miners = jsonData.data.miners.map(miner => ({
      miner_id: miner.miner_id,
      user_rack_id: miner.placement.user_rack_id,
      name: miner.name,
      width: miner.width,
      level: miner.level,
      power: miner.power,
      filename: miner.filename,
      bonus_percent: miner.bonus_percent,
      is_in_set: miner.is_in_set
    }));

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

    // Simulando a remoção de miners e calculando o impacto no total
    const minerImpacts = miners.map(miner => {
      const remainingPower = totalPower - miner.power;
      const remainingBonusPercent = totalBonusPercent - miner.bonus_percent;
      const newAdjustedPower = remainingPower * ((100 + remainingBonusPercent) / 100);
      const impact = newAdjustedPower - adjustedPower;
      return { ...miner, impact };
    });

    // Ordenando os miners pelo impacto (negativo mais próximo de zero até o mais distante)
    minerImpacts.sort((a, b) => b.impact - a.impact);

    // Exibindo os dados no console
    console.log("Miners Data:", miners);
    console.log("Racks Data:", racks);
    console.log("Total Power:", totalPower);
    console.log("Total Bonus Percent:", totalBonusPercent);
    console.log("Adjusted Power (Power * ((100 + Bonus Percent) / 100)):", adjustedPower);
    console.log("Miner Impacts (sorted):", minerImpacts);
  })
  .catch(error => {
    console.error("Erro ao obter dados da API:", error);
  });
