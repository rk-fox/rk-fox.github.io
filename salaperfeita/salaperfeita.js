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

    // Processar os dados e contar repetições
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

    // Pegar o valor do Campo 2
    const field2 = document.getElementById("field2").value.trim();
    if (!field2) {
      alert("Por favor, insira um valor no Campo 2.");
      return;
    }

    // Expressão regular para extrair os dados necessários
    const minerRegex = /open\s+([A-Za-z\s]+)\s+Set\s+Size:\s+(\d+)\s+Cells\s+Power\s+([\d,.]+)\s+(Th|Gh|Ph)\/s\s+Bonus\s+([\d.]+)\s+%\s+Quantity:\s+(\d+)\s+(can be sold|can't be sold|Miner details|open)/g;
    
    const minerArray = [];
    let match;

    // Encontrar todas as ocorrências
    while ((match = minerRegex.exec(field2)) !== null) {
      // Processar o nome
      const nome = match[1].trim();

      // Processar o poder
      let power = parseFloat(match[3].replace(',', '.'));
      const unit = match[4];

      if (unit === 'Th') {
        power *= 1000; // Multiplicar por 1000 para Th/s
      } else if (unit === 'Ph') {
        power *= 1000000; // Multiplicar por 1000000 para Ph/s
      }

      // Adicionar o minerador ao array
      const miner = {
        Nome: nome,
        Size: parseInt(match[2], 10),
        Power: power,
        Bonus: parseFloat(match[5]),
        Quantity: parseInt(match[6], 10),
      };

      minerArray.push(miner);
    }

    // Exibir o array de mineradores no console
    console.log("Array de Mineradores:", minerArray);

    alert("Dados processados com sucesso! Verifique o console para mais detalhes.");
  } catch (error) {
    console.error("Erro ao organizar os dados:", error);
    alert("Ocorreu um erro ao processar os dados. Verifique o console para mais informações.");
  }
}
