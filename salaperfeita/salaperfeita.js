async function organizar() {
  const userLink = document.getElementById("field1").value.trim();

  if (!userLink) {
    alert("Por favor, insira um valor no Campo 1.");
    return;
  }

  try {
    const profileUrl = `https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/profile/public-user-profile-data/${userLink}`;

    const profileResponse = await fetch(profileUrl);
    const profileData = await profileResponse.json();

    if (!profileData?.data?.avatar_id) {
      alert("Erro: avatar_id não encontrado.");
      return;
    }

    const avatarId = profileData.data.avatar_id;

    const minerUrl = `https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/profile/user-power-data/${avatarId}`;

    const minerResponse = await fetch(minerUrl);
    const minerData = await minerResponse.json();

    if (!minerData?.data?.miners) {
      alert("Erro: Dados de mineradores não encontrados ou inválidos.");
      return;
    }

    const miners = Array.isArray(minerData.data.miners) ? minerData.data.miners : [];

    if (miners.length === 0) {
      alert("Nenhum minerador encontrado.");
      return;
    }

    const minerCount = {};

    miners.forEach((miner) => {
      const key = `${miner.name}_L${miner.level}`;
      if (!minerCount[key]) {
        minerCount[key] = 0;
      }
      minerCount[key]++;
    });

    console.log("Detalhes dos mineradores:", miners);
    console.log("Contagem por nome e nível:", minerCount);

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
