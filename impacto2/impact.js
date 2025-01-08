// Função para carregar os scripts dinamicamente
function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = resolve;  // Resolve a promessa quando o script carregar
    script.onerror = reject;  // Rejeita a promessa se ocorrer erro no carregamento
    document.head.appendChild(script);
  });
}

// Função para carregar múltiplos scripts
async function loadAllScripts() {
  const urls = [
    'https://wminerrc.github.io/calculator/data/basic_miners.js',
    'https://wminerrc.github.io/calculator/data/merge_miners.js',
    'https://wminerrc.github.io/calculator/data/old/merge_miners.js'
  ];

  try {
    // Usando Promise.all com await para carregar todos os scripts simultaneamente
    await Promise.all(urls.map(url => loadScript(url)));
    console.log("Todos os scripts foram carregados com sucesso!");
  } catch (error) {
    console.error("Erro ao carregar os scripts:", error);
  }
}

// Função para calcular o bônus extra com base nos IDs específicos
function applyBonusAdjustment(miners, targetIds, fullSetBonus, partialSetBonus) {
  // Filtra as miners do grupo específico
  const matchingMiners = miners.filter(miner => targetIds.includes(miner.miner_id));

  // Define o impacto adicional com base na quantidade de IDs encontrados
  const bonusAdjustment =
    matchingMiners.length === 4
      ? fullSetBonus
      : matchingMiners.length >= 2
      ? partialSetBonus
      : 0;

  // Aplica o ajuste no bônus de cada miner correspondente
  matchingMiners.forEach(miner => {
    miner.setBonus += bonusAdjustment;
  });
}

// Função para calcular o bônus extra com base nos IDs específicos
function applyImpact4Adjustment(miners, targetIds, fullSet4Impact, partialSet4Impact) {
  // Filtra as miners do grupo específico
  const matchingMiners = miners.filter(miner => targetIds.includes(miner.miner_id));

  // Define o impacto adicional com base na quantidade de IDs encontrados
  const impact4Adjustment =
    matchingMiners.length === 4
      ? fullSet4Impact
      : matchingMiners.length >= 2
      ? partialSet4Impact
      : 0;

  // Aplica o ajuste no bônus de cada miner correspondente
  matchingMiners.forEach(miner => {
    miner.setImpact += impact4Adjustment;
  });
}

// Função para calcular o bônus extra com base nos IDs específicos
function applyImpact3Adjustment(miners, targetIds, fullSet3Impact, partialSet3Impact) {
  // Filtra as miners do grupo específico
  const matchingMiners = miners.filter(miner => targetIds.includes(miner.miner_id));

  // Define o impacto adicional com base na quantidade de IDs encontrados
  const impact3Adjustment =
    matchingMiners.length === 3
      ? fullSet3Impact
      : matchingMiners.length === 2
      ? partialSet3Impact
      : 0;

  // Aplica o ajuste no bônus de cada miner correspondente
  matchingMiners.forEach(miner => {
    miner.setImpact += impact3Adjustment;
  });
}

// Função para converter valores de poder
function convertPower(value) {
  const absValue = Math.abs(value); // Obter o valor absoluto
  if (absValue >= 1e6) {
    return (value / 1e6).toFixed(3).replace('.', ',') + ' Phs';
  }
  if (absValue >= 1e3) {
    return (value / 1e3).toFixed(3).replace('.', ',') + ' Ths';
  }
  return value.toFixed(3).replace('.', ',') + ' Ghs';
}

function getLevelDescription(level, type) {
        switch (level) {
            case 0: return { text: 'Common', color: '' };
            case 1:
            if (type === 'merge') {
                return { text: 'Uncommon', color: '#2bff00' };
            } else if (type === 'old_merge') {
                return { text: 'Legacy', color: '#ecab4e' };
            }
            break;
            case 2: return { text: 'Rare', color: '#00eaff' };
            case 3: return { text: 'Epic', color: '#ff00bb' };
            case 4: return { text: 'Legendary', color: '#fffb00' };
            case 5: return { text: 'Unreal', color: '#ff0000' };
            default: return { text: 'Unknown', color: '' };
        }
}

document.getElementById('searchButton').addEventListener('click', async () => {
    const userLink = document.getElementById('linkInput').value;

    if (!userLink) {
        alert('Por favor, digite o link da sala.');
        return;
    }

    try {
        const profileResponse = await fetch(`https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/profile/public-user-profile-data/${userLink}`); 
        const profileData = await profileResponse.json();
        const userName = profileData.data.name; 
        const avatarId = profileData.data.avatar_id;

        if (!avatarId || !userName) {
            alert('Erro ao obter o avatar_id ou nome.');
            return;
        }

        const avatarUrl = `https://avatars.rollercoin.com/static/avatars/thumbnails/50/${avatarId}.png`;
        document.getElementById('avatar').src = avatarUrl;
        document.getElementById('avatar').style.display = 'block';
        document.getElementById('welcomeMessage').innerText = `Olá, ${userName}!`;

        const powerDataResponse = await fetch(`https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/profile/user-power-data/${avatarId}`);
        const powerData = await powerDataResponse.json();
        let minersPower = powerData.data.miners;
        let totalbonusPercent = powerData.data.bonus_percent;

        totalbonusPercent = parseFloat((totalbonusPercent / 100).toFixed(2));

        let total_orig = minersPower * (1 + (totalbonusPercent / 100));

        console.log("Miners Power:", convertPower(minersPower));
        console.log("Miners Bonus:", totalbonusPercent + '%');
        console.log("Total Power:", convertPower(total_orig));

        // Fazendo uma requisição à API para obter dados dinâmicos
        fetch(`https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/game/room-config/${avatarId}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
          })
          .then(jsonData => {
            
// Array para armazenar mineradores processados
let miners = [];
const minerCount = {}; // Para contar repetições gerais


loadAllScripts();
            
function processMiners(minerList) {
  // Primeiro, conta todas as repetições gerais
  minerList.forEach(miner => {
    const key = `${miner.miner_id}_${miner.level}`;
    if (!minerCount[key]) {
      minerCount[key] = { count: 0, firstAssigned: false }; // Adiciona flag para controlar a primeira ocorrência
    }
    minerCount[key].count++; // Incrementa o contador total para essa combinação
  });

  // Em seguida, monta a lista final com as informações desejadas
  minerList.forEach(miner => {
    const key = `${miner.miner_id}_${miner.level}`;
    const totalRepetitions = minerCount[key].count; // Total de repetições geral
    const isFirst = !minerCount[key].firstAssigned; // Verifica se é a primeira ocorrência

    // Obter a informação sobre o tipo de minerador
    let isCanBeSold = false; // Valor padrão
    let minerInfo = null;

    // Carregar dados de acordo com o tipo do minerador
    if (miner.type === 'basic') {
      minerInfo = window.basic_miners;
    } else if (miner.type === 'merge') {
      minerInfo = window.merge_miners;
    } else if (miner.type === 'old_merge') {
      minerInfo = window.old_merge_miners;
    }

    // Verifica se o minerador está presente no tipo correto e ajusta is_can_be_sold_on_mp
    if (minerInfo) {
      const minerData = minerInfo.find(m => m.miner_id === miner.miner_id);
      if (minerData) {
        isCanBeSold = minerData.is_can_be_sold_on_mp || false; // Define como false caso não exista
      }
    }

    // Adiciona o minerador à lista final
    miners.push({
      miner_id: miner.miner_id,
      user_rack_id: miner.placement?.user_rack_id || null,
      name: miner.name || "Desconhecido",
      width: miner.width || 0,
      level: miner.level || 1,
      power: miner.power || 0,
      formattedPower: convertPower(miner.power || 0),
      filename: miner.filename || "N/A",
      bonus_percent: isFirst ? (miner.bonus_percent || 0) / 100 : 0,
      is_in_set: miner.is_in_set || false,
      is_can_be_sold_on_mp: isCanBeSold,  // Define o valor de is_can_be_sold_on_mp
      repetitions: isFirst ? "Não" : totalRepetitions,
      setImpact: 0,
      setBonus: 0,
      type: miner.type || "desconhecido",
    });

    // Marca a primeira ocorrência como atribuída
    minerCount[key].firstAssigned = true;
  });

  console.log("Miners processados:", miners);
}

// Filtro adicional baseado na opção selecionada
const selectedOption = document.querySelector('input[name="option"]:checked').value;
if (selectedOption === 'op1') {
  miners = miners.filter(miner => miner.width === 1);
} else if (selectedOption === 'op2') {
  miners = miners.filter(miner => miner.width === 2);
}

// Filtro adicional negociável
const selectedOption2 = document.querySelector('input[name="neg"]:checked').value;
if (selectedOption2 === 'op1') {
  miners = miners.filter(miner => miner.is_can_be_sold_on_mp === true);
} else if (selectedOption2 === 'op2') {
  miners = miners.filter(miner => miner.is_can_be_sold_on_mp === false);
}

            
    // Aplicando ajustes nos bônus para os dois grupos de IDs específicos
    applyBonusAdjustment(miners, 
      ["66f1c200e0dd3530daa2eadf", "66f1c1b9e0dd3530daa2e9df", "66f1c18fe0dd3530daa2e8dd", "66f1c1dee0dd3530daa2ea96"], 
      10, // 10% para todas as 4
      5   // 5% para 2 ou 3
    );
    applyBonusAdjustment(miners, 
      ["6687cf817643815232d65da6", "6687cfd57643815232d65e39", "6687cf557643815232d65d5c", "6687cfae7643815232d65def"], 
      7,  // 7% para todas as 4
      2   // 2% para 2 ou 3
    );
    // Aplicando ajustes no impacto para os seis grupos de IDs específicos
    applyImpact3Adjustment(miners, 
      ["67338357d9b2852bde4b077d", "67338298d9b2852bde4afb0d", "67338415d9b2852bde4b0dc6"], 
      15000000, // 10% para todas as 3
      7500000   // 5% para 2
    );
    applyImpact3Adjustment(miners, 
      ["66c31b17b82bcb27662d302b", "66c31aecb82bcb27662d2f53", "66c31b3eb82bcb27662d30d8"], 
      10000000,  // 7% para todas as 3
      5000000   // 2% para 2
    );
    applyImpact3Adjustment(miners, 
      ["66ead1cde0dd3530da969ea9", "66ead191e0dd3530da969e5f", "66ead1fbe0dd3530da969ef3"], 
      8000000,  // 7% para todas as 3
      5000000   // 2% para 2
    );
    applyImpact4Adjustment(miners, 
      ["6687cea87643815232d65882", "6687cefd7643815232d65d11", "6687ce4e7643815232d65297", "6687ced67643815232d65cc8"], 
      3000000,  // 7% para todas as 4
      2000000   // 2% para 2 ou 3
    );
    applyImpact4Adjustment(miners, 
      ["6687cd307643815232d64077", "6687cdc47643815232d64726", "6687ccfc7643815232d6402d", "6687cd837643815232d640c1"], 
      2500000,  // 7% para todas as 4
      1500000   // 2% para 2 ou 3
    );
    applyImpact4Adjustment(miners, 
      ["674df56acbe1e47b27075ab6", "674df5c5cbe1e47b27075b51", "674df539cbe1e47b27075a68", "674df599cbe1e47b27075b04"], 
      25000000,  // 7% para todas as 4
      10000000   // 2% para 2 ou 3
    );
    
    // Extraindo dados de data.racks
    const racks = jsonData.data.racks.map(rack => ({
      _id: rack._id,
      room_level: rack.placement.room_level,
      x: rack.placement.x,
      y: rack.placement.y
    }));

    // Associando miner.placement.user_rack_id com rack._id
    miners.forEach(miner => {
      const rack = racks.find(r => r._id === miner.user_rack_id);
      if (rack) {
        miner.room_level = rack.room_level;
        miner.rack_x = rack.x;
        miner.rack_y = rack.y;
      }
    });

    // Simulando a remoção de miners e calculando o impacto no total
    let minerImpacts = miners.map(miner => {
      const remainingPower = minersPower - miner.power;
      const remainingBonusPercent = totalbonusPercent - miner.bonus_percent;
      const newAdjustedPower = remainingPower * ((100 + remainingBonusPercent - miner.setBonus) / 100);
      const impact = (newAdjustedPower - total_orig) - miner.setImpact; // Alteração na fórmula do impacto
      
      return { 
        ...miner, 
        impact, 
        formattedImpact: convertPower((impact)) // Formata o impacto
      };
    });

    
    // Ordenando os miners pelo impacto (negativo mais próximo de zero até o mais distante)
    minerImpacts.sort((a, b) => b.impact - a.impact); // Ajuste na ordenação

        // Exibindo os dados no console
    console.log("Miner Impacts (sorted):", minerImpacts.map(impact => ({
      name: impact.name,
      level: impact.level,
      power: impact.formattedPower, // Exibe o valor formatado
      bonus_percent: impact.bonus_percent,
      setBonus: impact.setBonus,
      setImpact: impact.setImpact,
      formattedImpact: impact.formattedImpact, // Exibe o impacto formatado
      room_level: impact.room_level, // Novo dado de rack
      rack_x: impact.rack_x,         // Novo dado de rack
      rack_y: impact.rack_y,          // Novo dado de rack
      type: impact.type,
      is_can_be_sold_on_mp: impact.is_can_be_sold_on_mp,
    })));

            const top10NegativeResults = minerImpacts.slice(0, 10);

      const updateElement = (index, miner) => {
    if (miner) {
        const levelInfo = getLevelDescription(miner.level, miner.type);
        const levelSpan = `<span style="color: ${levelInfo.color}; font-weight: bold;">${levelInfo.text}</span> ${miner.name}`;
        document.getElementById(`nome${index}`).innerHTML = levelSpan;
        document.getElementById(`img${index}`).src = `https://static.rollercoin.com/static/img/market/miners/${miner.filename}.gif?v=1`;
        document.getElementById(`img${index}`).style.display = 'block';
        document.getElementById(`sell${index}`).innerText = miner.is_can_be_sold_on_mp ? 'Negociável' : 'Inegociável'; 
        document.getElementById(`poder${index}`).innerText = convertPower(miner.power);
        document.getElementById(`bonus${index}`).innerText = `${(miner.bonus_percent).toFixed(2).replace('.', ',')}%`;
        document.getElementById(`impact${index}`).innerText = convertPower(miner.impact);
        if (miner.setBonus > 0) {                      
            document.getElementById(`set${index}`).innerText = `${(miner.setBonus).toFixed(2).replace('.', ',')}%`;
        } else if (miner.setImpact > 0) {
            document.getElementById(`set${index}`).innerText = convertPower(miner.setImpact);
        } else {
            document.getElementById(`set${index}`).innerText = miner.is_in_set ? 'Sim' : 'Não';
        }
        document.getElementById(`merge${index}`).innerText = miner.repetitions;
        document.getElementById(`rack${index}`).innerText = `Sala: ${miner.room_level + 1}, Linha: ${miner.rack_y + 1}, Rack: ${miner.rack_x + 1}`;
    } else {
        document.getElementById(`nome${index}`).innerText = '';
    }
};

            top10NegativeResults.forEach((miner, i) => updateElement(i + 1, miner));
  }) 
  
          } catch (error) {
        console.error("Erro ao obter dados da API:", error);
    }
});
