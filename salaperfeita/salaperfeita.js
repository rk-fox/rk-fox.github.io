document.getElementById("field1").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    organizar(); // Chama a função organizar quando ENTER for pressionado
  }
});

document.getElementById("field2").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    organizar(); // Chama a função organizar quando ENTER for pressionado
  }
});

async function organizar() {
  try {
    
    let maxCapacity = 528; // Valor default

    // Função para atualizar o maxCapacity com base no radio button selecionado
    function updateMaxCapacity() {
      const selectedRadio = document.querySelector('input[name="capacity"]:checked');
      if (selectedRadio) {
        maxCapacity = parseInt(selectedRadio.value, 10);
      }
    }
    
    updateMaxCapacity(); // Atualiza maxCapacity com o valor do radio button selecionad
    
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

   // Inicializar o array
const minerArray = [];

// Iterar sobre os miners
miners.forEach(miner => {
  // Quantidade inicial sempre 1
  const quantity = 1;

  // Encontrar mineradora existente pelo miner_id
  const existingMiner = minerArray.find(m => m.miner_id === miner.miner_id);

  if (existingMiner) {
    // Incrementar a quantidade se já existir
    existingMiner.Quantity += quantity;
  } else {
    // Adicionar uma nova mineradora ao array
    minerArray.push({
      miner_id: miner.miner_id,  // Adiciona o miner_id para comparação futura
      Level: miner.level,
      Nome: miner.name,
      Power: miner.power,
      Bonus: miner.bonus_percent / 100,
      Size: miner.width,
      Quantity: quantity
    });
  }
});

// Exibir o resultado
console.log("Salas:", minerArray);

// Supondo que `field2` seja o campo de texto
let fieldContent = document.getElementById('field2').value;

fieldContent = fieldContent.replace(
  /[\s\S]*?(?:Items arranged in your rooms will not appear on this page\.|Os itens organizados em sua sala não aparecerão nesta página\.|Los objetos colocados en tus salas no aparecerán en esta página\.?)\s*/,
  ''
);
fieldContent = fieldContent.replace(
  /\s*(?:About us|Sobre nós|Sobre nosotros)[\s\S]*/,
  ''
);

// Divida o texto em partes separadas por "open"
let parts = fieldContent.split(/open\s*/);

// Inicialize o array para armazenar os resultados
let resultArray = [];

// Verifique se a primeira entrada começa com número; caso contrário, adicione "Level 0"
if (parts[0].trim() && !/^\d/.test(parts[0].trim())) {
    parts[0] = "Level 0 " + parts[0];
} else {
    parts[0] = "Level " + parts[0];
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
    currentPart = currentPart.replace(/(Set)(.*?)(Size:|Tamanho:|Tamaño:)/, '$1 0 $2 $3');
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
cleanedField2 = cleanedField2.replace(
  /(Rating star|set badge|Cells|Células|Celdas|Miner details|Detalhes da máquina|Información del minero|menu-button|hamster|\[object Object\]|open)/gi,
  ''
).trim();


// Regex ajustado para capturar as informações de cada entrada
const minerRegex = /Level\s+(?<level>\d+)\s+(?<name>.+?)\s+Set\s+(?<set>.*?)\s+(?:(?:Size:)|(?:Tamanho:)|(?:Tamaño:))\s*(?<size>\d+)\s+(?:(?:Power)|(?:Poder))\s+(?<power>[\d.,]+)\s?(?<unit>[A-Za-z/]+)\s+(?:(?:Bonus)|(?:Bônus)|(?:Bonificación))\s+(?<bonus>[\d.,]+)\s*%\s+(?:(?:Quantity:)|(?:Qtd:)|(?:Cant:))\s*(?<quantity>\d+)\s+(?<canBeSold>(?:(?:Can't be sold)|(?:Can be sold)|(?:Não pode ser vendido)|(?:Pode ser vendido)|(?:No se puede vender)|(?:Se puede vender)))(?=\s+Level\s+\d+|$)/g;

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
        Level: parseInt(match[1]),         // Level
        Nome: nome,              // Nome (antes de "Set")
        Set: set,                // Set (entre "Set" e "Size")
        Size: parseInt(match[4]),          // Size (já capturado em match[4])
        Power: parseInt(power),            // Power (em Gh/s) com 3 casas decimais
        Bonus: parseFloat(match[7]), // Bonus
        Quantity: parseInt(match[8])       // Quantity
    };

    // Adiciona os dados ao array
    fieldArray.push(minerData);
}

// Exibe o array com os dados processados
console.log("Inventário:", fieldArray);

    const unifiedArray = [...minerArray];

    fieldArray.forEach(miner => {
      const existingMiner = unifiedArray.find(m => m.Nome === miner.Nome && m.Bonus === miner.Bonus);

      if (existingMiner) {
        existingMiner.Quantity += miner.Quantity;
      } else {
        unifiedArray.push(miner);
      }
    });

    // Ordenar o bestSet pelo Power de cada miner (do maior para o menor)
    unifiedArray.sort((a, b) => b.Power - a.Power);
    
    console.log("Unificados:", unifiedArray);

    const items = unifiedArray.flatMap(miner => 
      Array(miner.Quantity).fill({
        Level: miner.Level,
        Nome: miner.Nome,
        Power: miner.Power,
        Bonus: miner.Bonus,
        Size: miner.Size,        
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

    // Ordenar o bestSet pelo Power de cada miner (do maior para o menor)
    bestSet.sort((a, b) => b.Power - a.Power);

    const totalPower = bestSet.reduce((sum, miner) => sum + miner.Power, 0);
    const totalBonus = (bestSet.reduce((sum, miner) => sum + miner.Bonus, 0)).toFixed(2);
    const finalPower = (totalPower * (1 + (totalBonus/100))).toFixed(0);

    console.log("Otimização:", bestSet);
    console.log("Total Miners Power:", totalPower);
    console.log("Total Miners Bonus:", totalBonus);
    console.log("PODER TOTAL:", finalPower);

  } catch (error) {
    console.error("Erro ao organizar os dados:", error);
    alert("Ocorreu um erro ao processar os dados. Verifique o console para mais informações.");
  }
}
