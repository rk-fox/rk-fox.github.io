async function organizar() {
  // Captura o valor do primeiro campo
  const userLink = document.getElementById("field1").value.trim();

  if (!userLink) {
    alert("Por favor, insira um valor no Campo 1.");
    return;
  }

  try {
    // URL para buscar o avatar_id
    const profileUrl = `https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/profile/public-user-profile-data/${userLink}`;

    // Requisição para obter o JSON com avatar_id
    const profileResponse = await fetch(profileUrl);
    const profileData = await profileResponse.json();

    if (!profileData?.data?.avatar_id) {
      alert("Erro: avatar_id não encontrado.");
      return;
    }

    const avatarId = profileData.data.avatar_id;

    // URL para buscar os dados do miner
    const minerUrl = `https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/profile/user-power-data/${avatarId}`;

    // Requisição para obter os dados do miner
    const minerResponse = await fetch(minerUrl);
    const minerData = await minerResponse.json();

    if (!minerData?.data?.miners || minerData.data.miners.length === 0) {
      alert("Erro: Dados de mineradores não encontrados.");
      return;
    }

    const miners = minerData.data.miners;

    // Processar os dados e contar repetições por miner.name e miner.level
    const minerCount = {};

    miners.forEach((miner) => {
      const key = `${miner.name}_L${miner.level}`;
      if (!minerCount[key]) {
        minerCount[key] = 0;
      }
      minerCount[key]++;
    });

    // Exibir os dados no console ou manipular como desejar
    console.log("Detalhes dos mineradores:", miners);
    console.log("Contagem por nome e nível:", minerCount);

    // Exemplo: Gerar uma saída em formato simples
    let output = "Detalhes dos Mineradores:\n\n";
    miners.forEach((miner) => {
      output += `Nome: ${miner.name}, Largura: ${miner.width}, Nível: ${miner.level}, Poder: ${miner.power}, Bônus (%): ${miner.bonus_percent}, Está no conjunto: ${miner.is_in_set}\n`;
    });

    output += "\nContagem por Nome e Nível:\n";
    for (const [key, count] of Object.entries(minerCount)) {
      output += `${key}: ${count}\n`;
    }

    alert(output);
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
    alert("Ocorreu um erro ao processar os dados. Verifique o console para mais detalhes.");
  }
}
