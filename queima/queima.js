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
        const minerData = {
          miner_id,
          type,
          level: specificMiner.level,
          name: specificMiner.name.en,
          power: specificMiner.power,
          bonus: specificMiner.bonus_power / 100,
          canBeSold: specificMiner.is_can_be_sold_on_mp,
          filename: specificMiner.filename,
          quantity
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
    if (parts[0].trim() && !/^\d/.test(parts[0].trim())) {
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
            if (nextPart && !/^\d/.test(nextPart)) {
                parts[i + 1] = "Level 0 " + parts[i + 1];
            } else if (nextPart) {
                parts[i + 1] = "Level " + parts[i + 1];
            }
        }

        resultArray.push(currentPart);
    }

    let cleanedField2 = resultArray.join(" open ");
    cleanedField2 = cleanedField2.replace(/(set badge|Cells|Miner details|open)/g, '').trim();
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

        const miner = {
    level: parseInt(level, 10),
    name: name.trim(),
    power,
    bonus: parseFloat(bonus),
    quantity: parseInt(quantity, 10),
    filename: name.trim()
        .replace(/'/g, '')        // Remove o apóstrofo (')
        .replace(/+/g, 'plus')
        .replace(/-/g, '_')       // Substitui o hífen (-) por underscore (_)
        .replace(/\s+/g, '_')     // Substitui o espaço por underscore (_)
        .toLowerCase()            // Converte tudo para minúsculas
};

        if (canBeSold === "Can") {
            canBeSoldArray.push(miner);
        } else {
            cannotBeSoldArray.push(miner);
        }
    }

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
