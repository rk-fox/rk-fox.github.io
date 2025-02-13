function getLevelDescription(level) {
        switch (level) {
            case 0: return { text: 'Common', color: '' };
            case 1: return { text: 'Uncommon', color: '#2bff00' };
            case 2: return { text: 'Rare', color: '#00eaff' };
            case 3: return { text: 'Epic', color: '#ff00bb' };
            case 4: return { text: 'Legendary', color: '#fffb00' };
            case 5: return { text: 'Unreal', color: '#ff0000' };
            case 6: return { text: 'Legacy', color: '#ecab4e' };
            default: return { text: 'Unknown', color: '' };
        }
}


// Função para preencher as tabelas
function preencherTabela(tableId, minerDetails) {
  const table = document.getElementById(tableId);
  table.innerHTML = ''; // Limpar conteúdo anterior

  // Criar cabeçalhos
  const headers = ['Miner', 'Power', 'Bonus', 'Qtd', 'Unitário', 'Total'];

  // Criar o cabeçalho da tabela com título dinâmico
  const thead = document.createElement('thead');
  const titleRow = document.createElement('tr');
  
  let title = '';  // Variável para armazenar o título da tabela
  
  // Definir título de acordo com o ID da tabela
  if (tableId === 'salaneg') {
    title = 'Miners NEGOCIÁVEIS da Sala';
  } else if (tableId === 'salaineg') {
    title = 'Miners INEGOCIÁVEIS da Sala';
  } else if (tableId === 'invneg') {
    title = 'Miners NEGOCIÁVEIS do Inventário';
  } else if (tableId === 'invineg') {
    title = 'Miners INEGOCIÁVEIS do Inventário';
  }

  // Adicionar o título como uma célula com colspan="5"
  const titleCell = document.createElement('th');
  titleCell.colSpan = 6;
  titleCell.textContent = title;
  titleRow.appendChild(titleCell);
  thead.appendChild(titleRow);
  
  // Criar a linha dos cabeçalhos
  const headerRow = document.createElement('tr');
  headers.forEach(header => {
    const th = document.createElement('th');
    th.textContent = header;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  // Adicionar o <thead> à tabela
  table.appendChild(thead);

  let totalUnitario = 0;
  let totalTotal = 0;

  // Adicionar os dados dos mineradores
  minerDetails.forEach((miner) => {
    const row = document.createElement('tr');

    const levelInfo = getLevelDescription(miner.level);
    const levelSpan = `<span style="color: ${levelInfo.color}; font-weight: bold;">${levelInfo.text}</span> ${miner.name}`;
    
    row.innerHTML = `
        <td><img src="https://static.rollercoin.com/static/img/market/miners/${miner.filename}.gif?v=1" alt="${miner.filename}" style="width: 50px; height: auto;"><br>${levelSpan}</td>
        <td>${miner.power}</td>
        <td>${miner.bonus}</td>
        <td>${miner.quantity}</td>
        <td>${miner.unitario}</td>
        <td>${miner.total}</td>
    `;

    // Acumular os valores de Unitário e Total
    totalUnitario += miner.unitario;
    totalTotal += miner.total;

    table.appendChild(row);
  });

    //Adicionar a linha de totais
 //   const totalRow = document.createElement('tr');
//    totalRow.innerHTML = `
//    <td colspan="3">Totais</td>
//    <td>${totalUnitario}</td>
//    <td>${totalTotal}</td>
//  `;
//  table.appendChild(totalRow);

// Adicionar linha de somatórios
    const sumRow = document.createElement('tr');
    sumRow.innerHTML = `
        <td colspan="5" style="font-weight: bold; text-align: right;">Total:</td>
        <td style="font-weight: bold;">${totalTotal}</td>
    `;
    table.appendChild(sumRow);
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
    const field1Value = document.getElementById("field1").value.trim();
    const field2Value = document.getElementById("field2").value.trim();

    // Verificar se pelo menos um campo está preenchido
    if (!field1Value && !field2Value) {
      alert("Por favor, preencha pelo menos um dos campos (Perfil ou Inventário).");
      return;
    }

    // Verificar e processar o Campo 1
    if (field1Value) {
      const profileUrl = `https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/profile/public-user-profile-data/${field1Value}`;
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
    }

  // Verificar e processar o Campo 2
if (field2Value) {

    // Processamento do campo field2
    let fieldContent = document.getElementById('field2').value.trim();
    if (!fieldContent) {
        alert("Por favor, insira um valor no Campo 2.");
        return;
    }

    // --- Remover cabeçalho e rodapé (suporta inglês, português e espanhol) ---
    // Remove tudo até (e inclusive) o trecho de cabeçalho
    fieldContent = fieldContent.replace(
      /[\s\S]*?(?:Items arranged in your rooms will not appear on this page\.|Os itens organizados em sua sala não aparecerão nesta página\.|Los objetos colocados en tus salas no aparecerán en esta página\.?)\s*/,
      ''
    );
    // Remove tudo a partir (inclusive) do trecho de rodapé
    fieldContent = fieldContent.replace(
      /\s*(?:About us|Sobre nós|Sobre nosotros)[\s\S]*/,
      ''
    );
    // --------------------------------------------------------------------------

    // Divida o texto em partes separadas por "open"
    let parts = fieldContent.split(/open\s*/);
    let resultArray = [];

    // Função para prefixar cada parte com "Level"
    // Se o primeiro token for composto APENAS por dígitos, assume que o nível já foi informado;
    // caso contrário, insere "Level 0 " (ou "Level 6 " se começar com "Rating star")
    const prefixPart = (text) => {
        text = text.trim();
        if (text.startsWith("Rating star")) {
            return "Level 6 " + text;
        }
        // Pega o primeiro token (palavra) para testar se é somente dígito
        let firstToken = text.split(/\s+/)[0];
        if (text && !/^\d+$/.test(firstToken)) {
            return "Level 0 " + text;
        } else {
            return "Level " + text;
        }
    };

    // Prefixa a primeira parte
    parts[0] = prefixPart(parts[0]);

    // Itera e processa cada parte, além de prefixar a parte seguinte
    for (let i = 0; i < parts.length; i++) {
        let currentPart = parts[i].trim();
        if (!currentPart) continue;

        // Se houver apenas um "Set", insere o valor 0 para o campo "set"
        let setCount = (currentPart.match(/Set/g) || []).length;
        if (setCount === 1) {
            // Aceita também "Tamanho:" e "Tamaño:" além de "Size:"
            currentPart = currentPart.replace(/(Set)(.*?)(Size:|Tamanho:|Tamaño:)/, '$1 0 $2 $3');
        }
        resultArray.push(currentPart);

        // Prefixa a próxima parte, se existir
        if (i < parts.length - 1) {
            parts[i + 1] = prefixPart(parts[i + 1]);
        }
    }

    let cleanedField2 = resultArray.join(" open ");
    // Remove elementos de interface indesejados (agora inclui "Celdas" para o espanhol)
    cleanedField2 = cleanedField2.replace(
      /(Rating star|set badge|Cells|Células|Celdas|Miner details|Detalhes da máquina|Información del minero|open)/g,
      ''
    ).trim();
    cleanedField2 = cleanedField2.replace(/\s+/g, " ").trim();

    // --- Regex para capturar dados dos miners (suporta inglês, português e espanhol) ---
    const minerRegex = /Level\s+(?<level>\d+)\s+(?<name>.+?)\s+Set\s+(?<set>.*?)\s+(?:(?:Size:)|(?:Tamanho:)|(?:Tamaño:))\s*(?<size>\d+)\s+(?:(?:Power)|(?:Poder))\s+(?<power>[\d.,]+)\s?(?<unit>[A-Za-z/]+)\s+(?:(?:Bonus)|(?:Bônus)|(?:Bonificación))\s+(?<bonus>[\d.,]+)\s*%\s+(?:(?:Quantity:)|(?:Qtd:)|(?:Cant:))\s*(?<quantity>\d+)\s+(?<canBeSold>(?:(?:Can't be sold)|(?:Can be sold)|(?:Não pode ser vendido)|(?:Pode ser vendido)|(?:No se puede vender)|(?:Se puede vender)))/g;

    let canBeSoldArray = [];
    let cannotBeSoldArray = [];
    let match;

    // Itera sobre as correspondências encontradas
    while ((match = minerRegex.exec(cleanedField2)) !== null) {
        let { level, name, power, unit, bonus, quantity, canBeSold } = match.groups;

        // Converte unidades para Gh/s
        power = parseFloat(power.replace(/,/g, ''));
        if (unit === "Eh/s") power *= 1e9;
        else if (unit === "Ph/s") power *= 1e6;
        else if (unit === "Th/s") power *= 1e3;

        // Obter os valores dos campos field3 e field4 (evitando NaN)
        const field3 = parseFloat(document.getElementById("field3").value) || 1;
        const field4 = parseFloat(document.getElementById("field4").value) || 1;

        // Calcular valores unitário e total
        const unitario = Math.round((((power / (field3 * 1000)) + (bonus / field4)) * 1000));
        const total = unitario * parseInt(quantity, 10);

        const miner = {
            level: parseInt(level, 10),
            name: name.trim(),
            power: power.toFixed(0),
            bonus: parseFloat(bonus),
            quantity: parseInt(quantity, 10),
            filename: name.trim()
                .replace(/'/g, '')
                .replace(/’/g, '')
                .replace(/\+/g, 'plus')
                .replace(/-/g, '_')
                .replace(/\s+/g, '_')
                .replace(/,/g, '')
                .replace(/\./g, '')
                .toLowerCase(),
            unitario,
            total,
        };

        // Se o texto indicar que pode ser vendido, adiciona ao array respectivo
        if (/(Can be sold|Pode ser vendido|Se puede vender)/.test(canBeSold)) {
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

}

    
  } catch (error) {
    console.error("Erro ao processar:", error);
  }
}
