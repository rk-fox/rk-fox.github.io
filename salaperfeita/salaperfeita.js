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
      throw new Error("Erro ao acessar os dados do perfil.");
    }

    const profileData = await profileResponse.json();
    const avatarId = profileData?.data?.avatar_id;

    if (!avatarId) {
      alert("Avatar ID não encontrado.");
      return;
    }

    // URL para acessar os dados do miner
    const minerUrl = `https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/game/room-config/${avatarId}`;
    const minerResponse = await fetch(minerUrl);

    if (!minerResponse.ok) {
      throw new Error("Erro ao acessar os dados do minerador.");
    }

    const minerData = await minerResponse.json();
    const miners = minerData?.data?.miner;

    if (!miners || !Array.isArray(miners)) {
      alert("Dados do minerador não encontrados.");
      return;
    }

    // Processar os dados e contar repetições
    const minerCount = {};
    miners.forEach(miner => {
      const key = `${miner.name}_${miner.level}`;
      minerCount[key] = (minerCount[key] || 0) + 1;

      console.log("Minerador:", {
        Name: miner.name,
        Width: miner.width,
        Level: miner.level,
        Power: miner.power,
        BonusPercent: miner.bonus_percent,
      });
    });

    // Exibir contagem de repetições
    console.log("Contagem de Miners por Nome e Nível:", minerCount);
    alert("Dados processados com sucesso! Verifique o console para mais detalhes.");
  } catch (error) {
    console.error("Erro:", error);
    alert("Ocorreu um erro ao processar os dados. Verifique o console para mais informações.");
  }
}
