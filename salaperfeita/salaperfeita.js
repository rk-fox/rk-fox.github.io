async function organizar() {
  try {
    const userLink = document.getElementById("field1").value.trim();
    if (!userLink) {
      alert("Por favor, insira um valor no Campo 1.");
      return;
    }

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

    const minerArray = [];

    miners.forEach(miner => {
      // Remover termos específicos do nome da miner
      const cleanName = miner.name
        .replace(/\b(can be sold|can't be sold|Miner details)\b/g, '')
        .trim();

      const existingMiner = minerArray.find(m => m.Nome === cleanName && m.Bonus === miner.bonus_percent / 100);

      if (existingMiner) {
        existingMiner.Quantity += 1;
      } else {
        minerArray.push({
          Nome: cleanName,
          Power: miner.power,
          Bonus: miner.bonus_percent / 100,
          Size: miner.width,
          Quantity: 1
        });
      }
    });

    console.log("Dados da API:", minerArray);

    const field2 = document.getElementById("field2").value.trim();
const fieldArray = [];

if (field2) {
    // Passo 1: Remover ocorrências indesejadas
    let cleanedField2 = field2.replace(/\b(Can't be sold|Miner details|open|Can be sold)\b/gi, '').trim();

  console.log(cleanedField2);

    // Passo 2: Adicionar "0 " antes de mineradores sem número no início
    cleanedField2 = cleanedField2.replace(/^(?=[A-Za-z])/gm, '0 ');

    // Passo 3: Aplicar regex para extrair dados
    const minerRegex = /^(?:(\d+)|0)\s+([A-Za-z\s]+?)\s+Set\s+Size:\s+(\d+)\s+Cells\s+Power\s+([\d.,]+)\s+(Th\/s|Ph\/s|Gh\/s|Eh\/s)\s+Bonus\s+([\d.]+)\s+%\s+Quantity:\s+(\d+)/gm;
    let match;

    while ((match = minerRegex.exec(cleanedField2)) !== null) {
        const level = parseInt(match[1], 10);
        let power = parseFloat(match[4].replace(',', '.'));
        const unit = match[5];

        // Converter unidades de medida
        if (unit === 'Th/s') {
            power *= 1000;
        } else if (unit === 'Ph/s') {
            power *= 1000000;
        } else if (unit === 'Eh/s') {
            power *= 1000000000;
        }

        // Criar objeto minerador
        const miner = {
            Level: level,
            Nome: match[2].trim(),
            Size: parseInt(match[3], 10),
            Power: power,
            Bonus: parseFloat(match[6]),
            Quantity: parseInt(match[7], 10),
        };

        fieldArray.push(miner);
    }
}

console.log("Dados do Campo 2:", fieldArray);

    const unifiedArray = [...minerArray];

    fieldArray.forEach(miner => {
      const existingMiner = unifiedArray.find(m => m.Nome === miner.Nome && m.Bonus === miner.Bonus);

      if (existingMiner) {
        existingMiner.Quantity += miner.Quantity;
      } else {
        unifiedArray.push(miner);
      }
    });

    console.log("Array Unificado:", unifiedArray);

    const maxCapacity = 528;
    const items = unifiedArray.flatMap(miner => 
      Array(miner.Quantity).fill({
        Power: miner.Power,
        Bonus: miner.Bonus,
        Size: miner.Size,
        Nome: miner.Nome,
      })
    );

    const dp = Array.from({ length: maxCapacity + 1 }, () => 0);
    const selected = Array.from({ length: maxCapacity + 1 }, () => []);

    for (const item of items) {
      for (let size = maxCapacity; size >= item.Size; size--) {
        const value = item.Power * (1 + (item.Bonus/100));
        if (dp[size - item.Size] + value > dp[size]) {
          dp[size] = dp[size - item.Size] + value;
          selected[size] = [...selected[size - item.Size], item];
        }
      }
    }

    const bestSet = selected[maxCapacity];

    const totalPower = bestSet.reduce((sum, miner) => sum + miner.Power, 0);
    const totalBonus = bestSet.reduce((sum, miner) => sum + miner.Bonus, 0);
    const finalPower = totalPower * (1 + (totalBonus/100));

    console.log("Melhor conjunto selecionado:", bestSet);
    console.log("Somatório do Power:", totalPower);
    console.log("Somatório do Bonus:", totalBonus);
    console.log("Resultado Final (Power * (1 + (Bonus/100))):", finalPower);

    alert(`Processamento concluído! 
      - Somatório do Power: ${totalPower} 
      - Somatório do Bônus: ${(totalBonus).toFixed(2)}% 
      - Resultado Final: ${finalPower}`);
  } catch (error) {
    console.error("Erro ao organizar os dados:", error);
    alert("Ocorreu um erro ao processar os dados. Verifique o console para mais informações.");
  }
}
