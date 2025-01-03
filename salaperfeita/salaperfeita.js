async function organizar() {
  try {
    // Captura o valor do primeiro campo
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

    // Organizar os dados do campo 2
    const field2Data = document.getElementById("field2").value.trim();
    const minerDetails = processMinerDetails(field2Data);

    // Exibir os mineradores organizados
    console.log("Mineradores Organizados:", minerDetails);

    // Processar os dados do minerador e contar repetições
    const minerCount = {};
    miners.forEach(miner => {
      const key = `${miner.name}_${miner.level}`;
      minerCount[key] = (minerCount[key] || 0) + 1;

      console.log("Minerador Detalhes:", {
        Nome: miner.name,
        Largura: miner.width,
        Nível: miner.level,
        Poder: miner.power,
        BônusPercentual: miner.bonus_percent,
      });
    });

    // Exibir contagem de repetições
    console.log("Contagem de Miners por Nome e Nível:", minerCount);
    alert("Dados processados com sucesso! Verifique o console para mais detalhes.");
  } catch (error) {
    console.error("Erro ao organizar os dados:", error);
    alert("Ocorreu um erro ao processar os dados. Verifique o console para mais informações.");
  }
}

// Função para processar os dados do campo 2
function processMinerDetails(data) {
  const minerPattern = /([A-Za-z\s\+]+)\s+Set\s+Size:\s+(\d+)\s+Cells\s+Power\s+([0-9.,]+)\s+Th\/s\s+Bonus\s+([0-9.]+)%\s+Quantity:\s+(\d+)\s+/g;
  let matches;
  const minerDetails = [];

  // Expressão regular para encontrar e extrair os dados
  while ((matches = minerPattern.exec(data)) !== null) {
    const [_, name, size, power, bonus, quantity] = matches;
    minerDetails.push({
      Nome: name.trim(),
      Size: parseInt(size, 10),
      Power: parseFloat(power.replace(',', '.')),
      Bonus: parseFloat(bonus),
      Quantity: parseInt(quantity, 10),
    });
  }

  return minerDetails;
}
