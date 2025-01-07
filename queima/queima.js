function getLevelDescription(level) {
        switch (level) {
            case 0: return { text: 'Common', color: '' };
            case 1: return { text: 'Uncommon', color: '#2bff00' };
            case 2: return { text: 'Rare', color: '#00eaff' };
            case 3: return { text: 'Epic', color: '#ff00bb' };
            case 4: return { text: 'Legendary', color: '#fffb00' };
            case 5: return { text: 'Unreal', color: '#ff0000' };
            case 6: return { text: 'Legacy', color: '#ecab4e' };
            default: return { text: 'Legacy', color: '#ecab4e' };
        }
}


// Função para preencher as tabelas
    function preencherTabela(tableId, minerDetails) {
      const table = document.getElementById(tableId);
      table.innerHTML = ''; // Limpar conteúdo anterior

      // Criar cabeçalhos
      const headers = ['Level', 'Nome', 'Power', 'Bonus', 'Unitário', 'Total', 'Filename'];
      const headerRow = document.createElement('tr');
      headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
      });
      table.appendChild(headerRow);

      // Adicionar os dados dos mineradores
minerDetails.forEach((miner, index) => {
    const row = document.createElement('tr');

    const levelInfo = getLevelDescription(miner.level);
    const levelSpan = `<span style="color: ${levelInfo.color}; font-weight: bold;">${levelInfo.text}</span> ${miner.name}`;
    
    row.innerHTML = `
        <td>${levelSpan}</td>
        <td>${miner.power}</td>
        <td>${miner.bonus}</td>
        <td>${miner.unitario}</td>
        <td>${miner.total}</td>
        <td>${miner.filename}</td>
    `;

    table.appendChild(row);
});
    }

// Adiciona um único evento keydown para ambos os campos
document.querySelectorAll("#field1, #field2").forEach(function (field) {
  field.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      organizar(); // Chama a função organizar quando ENTER for pressionado
    }
  });
});

// Função para carregar o script e acessar os dados
function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

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

    const minerCounts = miners.reduce((acc, miner) => {
      const { miner_id, type } = miner;
      if (!acc[miner_id]) {
        acc[miner_id] = { type, quantity: 0 };
      }
      acc[miner_id].quantity += 1;
      return acc;
    }, {});

    const minerDetails = [];

    // Carregar os scripts dinamicamente
    await Promise.all([
      loadScript('https://wminerrc.github.io/calculator/data/basic_miners.js'),
      loadScript('https://wminerrc.github.io/calculator/data/merge_miners.js'),
      loadScript('https://wminerrc.github.io/calculator/data/old/merge_miners.js')
    ]);

    // Agora podemos acessar os dados carregados
    for (const [miner_id, { type, quantity }] of Object.entries(minerCounts)) {
      let minerInfo;

      if (type === "basic") {
        minerInfo = window.basic_miners;
      } else if (type === "merge") {
        minerInfo = window.merge_miners;
      } else if (type === "old_merge") {
        minerInfo = window.old_merge_miners;
      } else {
        console.warn(`Tipo desconhecido para miner_id ${miner_id}: ${type}`);
        continue;
      }

      const specificMiner = minerInfo.find(miner => miner.miner_id === miner_id);
if (specificMiner) {
  const power = specificMiner.power;
  const bonus = specificMiner.bonus_power / 100;
  const field3 = parseFloat(document.getElementById('field3').value); // Valor de field3
  const field4 = parseFloat(document.getElementById('field4').value); // Valor de field4

  // Calculando o unitário
  const unitario = Math.round((((power / (field3 * 1000)) + (bonus / field4)) * 1000));

  // Calculando o total
  const total = unitario * quantity;

  const minerData = {
    miner_id,
    type,
    level: type === "old_merge" ? 6 : specificMiner.level, // Condição para ajustar o level
    name: specificMiner.name.en,
    power,
    bonus,
    canBeSold: specificMiner.is_can_be_sold_on_mp,
    filename: specificMiner.filename,
    quantity,
    unitario, // Adicionando o campo unitario
    total // Adicionando o campo total
 };
  minerDetails.push(minerData);
  } else {
    console.warn(`Miner com o ID especificado não encontrado: ${miner_id}`);
  }
}


    //console.log("Mineradores na Sala:", minerDetails);

    // Dividir os minerDetails em dois arrays
    const canBeSoldMinerDetails = minerDetails.filter(miner => miner.canBeSold);
    const cannotBeSoldMinerDetails = minerDetails.filter(miner => !miner.canBeSold);

    // Ordena os arrays pelo atributo 'power' do maior para o menor
    canBeSoldMinerDetails.sort((a, b) => b.unitario - a.unitario);
    cannotBeSoldMinerDetails.sort((a, b) => b.unitario - a.unitario);

    // Preencher as tabelas com os dados
    preencherTabela('salaneg', canBeSoldMinerDetails);
    preencherTabela('salaineg', cannotBeSoldMinerDetails);

    // Exibir as tabelas
    document.getElementById('salaneg').style.display = 'table';
    document.getElementById('salaineg').style.display = 'table';

   

    console.log("Mineradores na Sala Negociáveis:", canBeSoldMinerDetails);
    console.log("Mineradores na Sala Inegociáveis:", cannotBeSoldMinerDetails);

    // Processamento do campo field2
    let fieldContent = document.getElementById('field2').value.trim();
    if (!fieldContent) {
      alert("Por favor, insira um valor no Campo 2.");
      return;
    }

    // Divida o texto em partes separadas por "open"
    let parts = fieldContent.split(/open\s*/);
    let resultArray = [];

    // Verifique a primeira parte
if (parts[0].trim().startsWith("Rating star")) {
    parts[0] = "Level 6 " + parts[0];
} else if (parts[0].trim() && !/^\d/.test(parts[0].trim())) {
    parts[0] = "Level 0 " + parts[0];
} else {
    parts[0] = "Level " + parts[0];
}

// Iterar e processar
for (let i = 0; i < parts.length; i++) {
    let currentPart = parts[i].trim();
    if (!currentPart) continue;

    let setCount = (currentPart.match(/Set/g) || []).length;

    if (setCount === 1) {
        currentPart = currentPart.replace(/(Set)(.*?)(Size:)/, '$1 0 $2 $3');
    }

    if (i < parts.length - 1) {
        let nextPart = parts[i + 1].trim();
        if (nextPart.startsWith("Rating star")) {
            parts[i + 1] = "Level 6 " + nextPart;
        } else if (nextPart && !/^\d/.test(nextPart)) {
            parts[i + 1] = "Level 0 " + nextPart;
        } else if (nextPart) {
            parts[i + 1] = "Level " + nextPart;
        }
    }

    resultArray.push(currentPart);
}

let cleanedField2 = resultArray.join(" open ");
cleanedField2 = cleanedField2.replace(/(Rating star|set badge|Cells|Miner details|open)/g, '').trim();
cleanedField2 = cleanedField2.replace(/\s+/g, " ").trim();


    // Regex para capturar dados dos miners
    const minerRegex = /Level (?<level>\d+) (?<name>.+?) Set (?<set>.+?) Size: (?<size>\d+) Power (?<power>[\d.,]+)\s?(?<unit>[A-Za-z/]+) Bonus (?<bonus>[\d.,]+) % Quantity: (?<quantity>\d+) (?<canBeSold>Can|Can't) be sold/g;

    let canBeSoldArray = [];
    let cannotBeSoldArray = [];
    let match;

    // Itera sobre as correspondências
    while ((match = minerRegex.exec(cleanedField2)) !== null) {
        let { level, name, power, unit, bonus, quantity, canBeSold } = match.groups;

        // Converte unidades para Gh/s
        power = parseFloat(power.replace(/,/g, ''));
        if (unit === "Eh/s") power *= 1e9;
        else if (unit === "Ph/s") power *= 1e6;
        else if (unit === "Th/s") power *= 1e3;

      // Obter os valores dos campos field3 e field4
        const field3 = parseFloat(document.getElementById("field3").value) || 1; // Valor de field3 (evita NaN)
        const field4 = parseFloat(document.getElementById("field4").value) || 1; // Valor de field4 (evita NaN)

        // Calcular unitario e total
        const unitario = Math.round((((power / (field3 * 1000)) + (bonus / field4)) * 1000));
        const total = unitario * parseInt(quantity, 10);

        const miner = {
    level: parseInt(level, 10),
    name: name.trim(),
    power,
    bonus: parseFloat(bonus),
    quantity: parseInt(quantity, 10),
    filename: name.trim()
        .replace(/'/g, '')         // Remove o apóstrofo simples (')
        .replace(/’/g, '')         // Remove o apóstrofo (’)
        .replace(/\+/g, 'plus')       // Substitui o + por underscore (_)
        .replace(/-/g, '_')        // Substitui o hífen (-) por underscore (_)
        .replace(/\s+/g, '_')      // Substitui o espaço por underscore (_)
        .toLowerCase(),             // Converte tudo para minúsculas
    unitario,
    total,
};

        if (canBeSold === "Can") {
            canBeSoldArray.push(miner);
        } else {
            cannotBeSoldArray.push(miner);
        }
    }

    // Ordena os arrays pelo atributo 'power' do maior para o menor
    canBeSoldArray.sort((a, b) => b.unitario - a.unitario);
    cannotBeSoldArray.sort((a, b) => b.unitario - a.unitario);

    // Preencher as tabelas com os dados
    preencherTabela('invneg', canBeSoldArray);
    preencherTabela('invineg', cannotBeSoldArray);

    // Exibir as tabelas
    document.getElementById('invneg').style.display = 'table';
    document.getElementById('invineg').style.display = 'table';

    console.log("Inventário Negociável:", canBeSoldArray);
    console.log("Inventário Inegociável:", cannotBeSoldArray);

    if (canBeSoldArray.length === 0 && cannotBeSoldArray.length === 0) {
      console.warn("Nenhum miner foi capturado. Verifique o texto de entrada e a regex.");
    }

    return { canBeSoldArray, cannotBeSoldArray };



    
  } catch (error) {
    console.error("Erro ao processar:", error);
  }
}
