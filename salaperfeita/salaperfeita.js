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

// Regex ajustado para capturar as informações de cada entrada
let minerRegex = /Level\s+(\d+)\s+([A-Za-z0-9\s\-\']+?)\s+Set\s+([A-Za-z0-9\s\-\']+?)\s+Size:\s+(\d+)\s+Power\s+([\d.,]+)\s+(Th\/s|Ph\/s|Gh\/s|Eh\/s)\s+Bonus\s+([\d.]+)\s+%\s+Quantity:\s+(\d+)/gm;

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
const seenMiners = new Map(); // Usado para verificar e armazenar miners já processadas

fieldArray.forEach(miner => {
  // Cria uma chave única para identificar o miner, considerando Nome, Power e Bonus
  const minerKey = `${miner.Nome}-${miner.Power}-${miner.Bonus}`;

  // Verifica se a combinação Nome-Power-Bonus já foi vista
  if (seenMiners.has(minerKey)) {
    // Se já foi, cria uma nova instância com bônus 0, mas não altera o nome, power e bonus
    const newMiner = { ...miner, Bonus: 0 }; // Clonando o objeto e alterando o bônus para 0
    unifiedArray.push(newMiner);
  } else {
    // Se não foi, mantém o bônus original e adiciona a miner
    unifiedArray.push(miner);
    seenMiners.set(minerKey, true); // Marca que essa combinação foi processada
  }
});

// Ordenar a lista do maior para o menor poder
unifiedArray.sort((a, b) => b.Power - a.Power);

console.log("Unificados:", unifiedArray);

// A lógica de distribuição das miners dentro do dp e selection parece estar correta
const items = unifiedArray.flatMap(miner => {
  return Array(miner.Quantity).fill({
    Level: miner.Level,
    Nome: miner.Nome,
    Power: miner.Power,
    Bonus: miner.Bonus, // Este será o bônus original para o primeiro miner
    Size: miner.Size,
  }).map((item, index) => {
    // Se não for o primeiro item da mesma miner_id, define o bônus como 0
    if (index > 0) {
      item.Bonus = 0;
    }
    return item;
  });
});

// Lógica de otimização (Knapsack)
const dp = Array.from({ length: maxCapacity + 1 }, () => 0);
const selected = Array.from({ length: maxCapacity + 1 }, () => []);

for (const item of items) {
  for (let size = maxCapacity; size >= item.Size; size--) {
    const value = item.Power * (1 + (item.Bonus / 100)); // Aplica o bônus corretamente
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
const finalPower = (totalPower * (1 + (totalBonus / 100))).toFixed(0);

console.log("Otimização:", bestSet);
console.log("Total Miners Power:", totalPower);
console.log("Total Miners Bonus:", totalBonus);
console.log("PODER TOTAL:", finalPower);


  } catch (error) {
    console.error("Erro ao organizar os dados:", error);
    alert("Ocorreu um erro ao processar os dados. Verifique o console para mais informações.");
  }
}
