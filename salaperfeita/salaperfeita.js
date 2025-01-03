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
    const minerArray = [];
    miners.forEach(miner => {
      const key = `${miner.name}_${miner.bonus_percent}`;

      // Verifica se o miner já existe no array e adiciona a quantidade
      const existingMiner = minerArray.find(m => m.Nome === miner.name && m.bonus_percent === miner.bonus_percent);
      
      if (existingMiner) {
        existingMiner.Quantity += 1; // Incrementa a quantidade
      } else {
        // Se o miner não existe no array, adiciona-o com a quantidade inicial
        minerArray.push({
          Nome: miner.name,
          Power: miner.power,
          Bonus: miner.bonus_percent / 100,
          Largura: miner.width,
          Quantity: 1
        });
      }

      console.log("Minerador Detalhes:", {
        Nome: miner.name,
        Largura: miner.width,
        Poder: miner.power,
        BônusPercentual: miner.bonus_percent / 100,
      });
    });

    // Exibir contagem de Miners com a quantidade
    console.log("Array de Mineradores com Quantidade:", minerArray);

    // Pegar o valor do Campo 2
    const field2 = document.getElementById("field2").value.trim();
    if (!field2) {
      alert("Por favor, insira um valor no Campo 2.");
      return;
    }

    // Expressão regular para extrair os dados necessários
    const minerRegex = /open\s+([A-Za-z\s]+)\s+Set\s+Size:\s+(\d+)\s+Cells\s+Power\s+([\d,.]+)\s+(Th\/s|Ph\/s|Gh\/s)\s+Bonus\s+([\d.]+)\s+%\s+Quantity:\s+(\d+)\s+/g;

    const minerArray2 = [];
    let match;

    // Encontrar todas as ocorrências
    while ((match = minerRegex.exec(field2)) !== null) {
      // Ajustando o valor de Power conforme a unidade
      let power = parseFloat(match[3].replace(',', '.'));
      const unit = match[4];

      if (unit === 'Th/s') {
        power *= 1000; // Multiplicar por 1000
      } else if (unit === 'Ph/s') {
        power *= 1000000; // Multiplicar por 1000000
      }
      // Se for 'Gh/s', mantemos o valor de power original

      const miner = {
        Nome: match[1].trim(),
        Size: parseInt(match[2], 10),
        Power: power,
        Bonus: parseFloat(match[5]),
        Quantity: parseInt(match[6], 10),
      };

      minerArray2.push(miner);
    }

    // Exibir o array de mineradores no console
    console.log("Array de Mineradores Processado:", minerArray2);

    alert("Dados processados com sucesso! Verifique o console para mais detalhes.");
  } catch (error) {
    console.error("Erro ao organizar os dados:", error);
    alert("Ocorreu um erro ao processar os dados. Verifique o console para mais informações.");
  }
}
