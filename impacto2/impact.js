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

    // Exibindo os dados no console
    console.log("Miners Data:", miners);
    console.log("Racks Data:", racks);
  })
  .catch(error => {
    console.error("Erro ao obter dados da API:", error);
  });
