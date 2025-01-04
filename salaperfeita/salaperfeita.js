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

// Supondo que `field2` seja o campo de texto
let fieldContent = document.getElementById('field2').value;

// Divida o texto em partes separadas por "open"
let parts = fieldContent.split(/open\s*/);

// Inicialize o array para armazenar os resultados
let resultArray = [];

// Verifique se a primeira entrada começa com número; caso contrário, adicione "Level 0"
if (parts[0].trim() && !/^\d/.test(parts[0].trim())) {
    parts[0] = "Level 0 " + parts[0];
}
    
// Itere pelas partes para processar o conteúdo
for (let i = 0; i < parts.length; i++) {
    let currentPart = parts[i].trim(); // Remove espaços extras

    // Pule entradas vazias
    if (!currentPart) continue;

    // Contar quantas vezes "Set" aparece na parte atual
    let setCount = (currentPart.match(/Set/g) || []).length;

    // Se houver exatamente um "Set", adicionar "0" entre "Set" e "Size"
    if (setCount === 1) {
        currentPart = currentPart.replace(/(Set)(.*?)(Size:)/, '$1 0 $2 $3');
    }

    // Verifique o início da próxima parte
    if (i < parts.length - 1) { // Exceto o último elemento
        let nextPart = parts[i + 1].trim();

        // Se a próxima parte não começar com um número, insira "Level 0"
        if (nextPart && !/^\d/.test(nextPart)) {
            parts[i + 1] = "Level 0 " + parts[i + 1];
        } else if (nextPart) {
            parts[i + 1] = "Level " + parts[i + 1];
        }
    }

    // Adicione a parte processada ao array de resultados
    resultArray.push(currentPart);
}

// Opcional: converta o array novamente em uma string
let cleanedField2 = resultArray.join(" open ");

// Remova os textos indesejados
cleanedField2 = cleanedField2.replace(/(set badge|Cells|Can be sold|Can't be sold|Miner details|open)/g, '').trim();

// Exiba o resultado no console para ver o texto processado
console.log("Texto Limpo:", cleanedField2);

// Regex ajustado para capturar as informações de cada entrada
let minerRegex = /Level\s+(\d+)\s+([A-Za-z0-9\s\-\']+?)\s+Set\s+(\d+)\s+Size:\s+(\d+)\s+Power\s+([\d.,]+)\s+(Th\/s|Ph\/s|Gh\/s|Eh\/s)\s+Bonus\s+([\d.]+)\s+%\s+Quantity:\s+(\d+)/gm;

// Inicializa o array para armazenar as entradas processadas
let fieldArray = [];

let match;

// Procura as entradas no texto com o regex
while ((match = minerRegex.exec(cleanedField2)) !== null) {
    // Variáveis para armazenar os dados extraídos
    let power = parseFloat(match[5].replace(',', '.')); // Power convertido para número
    let unit = match[6]; // Unidade de Power (Th/s, Ph/s, Gh/s, Eh/s)

    // Conversão das unidades de medida para Gh/s (somente se necessário)
    if (unit === 'Eh/s') {
        power *= 1000000000; // Eh/s para Gh/s
        unit = 'Gh/s';  // Atualiza para Gh/s após a conversão
    } else if (unit === 'Ph/s') {
        power *= 1000000; // Ph/s para Gh/s
        unit = 'Gh/s';  // Atualiza para Gh/s após a conversão
    } else if (unit === 'Th/s') {
        power *= 1000; // Th/s para Gh/s
        unit = 'Gh/s';  // Atualiza para Gh/s após a conversão
    }
    // 'Gh/s' já está em Gh/s, não precisa de alteração

    // Ajuste para Set: pegar o valor entre os termos "Set" e "Size"
    let set = match[3].trim();  // O valor de Set está em match[3]

    // Ajuste para Nome: pegar o valor antes do termo "Set"
    let nome = match[2].trim(); // O valor de Nome está em match[2]

    // Cada entrada é capturada e organizada no formato desejado
    let minerData = {
        Level: match[1],         // Level
        Nome: nome,              // Nome (antes de "Set")
        Set: set,                // Set (entre "Set" e "Size")
        Size: match[4],          // Size (já capturado em match[4])
        Power: power,            // Power (em Gh/s) com 3 casas decimais
        Bonus: match[7].replace(',', '.'), // Bonus
        Quantity: match[8]       // Quantity
    };

    // Adiciona os dados ao array
    fieldArray.push(minerData);
}

// Exibe o array com os dados processados
console.log(fieldArray);


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
