// Adiciona um único evento keydown para ambos os campos
document.querySelectorAll("#field1, #field2").forEach(function (field) {
  field.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      organizar(); // Chama a função organizar quando ENTER for pressionado
    }
  });
});

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

    // Processa a lista de mineradores
    miners.forEach((miner) => {
      const quantity = 1;
      const existingMiner = minerArray.find((m) => m.miner_id === miner.miner_id);

      if (existingMiner) {
        existingMiner.Quantity += quantity;
      } else {
        minerArray.push({
          Level: miner.level,
          Nome: miner.name,
          Power: miner.power,
          Bonus: miner.bonus_percent / 100,
          Quantity: quantity,
          Vende: 
        });
      }
    });

    console.log("Salas:", minerArray);

    const fieldContent = document.getElementById("field2").value;
    const parts = fieldContent.split(/open\s*/);
    const resultArray = [];

    if (parts[0].trim() && !/^\d/.test(parts[0].trim())) {
      parts[0] = "Level 0 " + parts[0];
    } else {
      parts[0] = "Level " + parts[0];
    }

    for (let i = 0; i < parts.length; i++) {
      let currentPart = parts[i].trim();
      if (!currentPart) continue;

      const setCount = (currentPart.match(/Set/g) || []).length;
      if (setCount === 1) {
        currentPart = currentPart.replace(/(Set)(.*?)(Size:)/, "$1 0 $2 $3");
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
    cleanedField2 = cleanedField2.replace(/(set badge|Cells|Miner details|open)/g, "").trim();

    console.log(cleanedField2);

    const minerRegex = /Level\s+(\d+)\s+([A-Za-z0-9\s\-\']+?)\s+Set\s+([A-Za-z0-9\s\-\']+?)\s+Size:\s+(\d+)\s+Power\s+([\d.,]+)\s+(Th\/s|Ph\/s|Gh\/s|Eh\/s)\s+Bonus\s+([\d.]+)\s+%\s+Quantity:\s+(\d+)\s+(Can(?:'t)?\sbe\sSold)/gm;
    const fieldArray = [];
    let match;

    while ((match = minerRegex.exec(cleanedField2)) !== null) {
      let power = parseFloat(match[5].replace(",", "."));
      let unit = match[6];

      if (unit === "Eh/s") power *= 1e9;
      else if (unit === "Ph/s") power *= 1e6;
      else if (unit === "Th/s") power *= 1e3;

      fieldArray.push({
        Level: parseInt(match[1]),
        Nome: match[2].trim(),
        Power: parseFloat(power.toFixed(3)),
        Bonus: parseFloat(match[7]),
        Quantity: parseInt(match[8]),
        Vende: match[9],
      });
    }

    console.log("Inventário:", fieldArray);
  } catch (error) {
    console.error("Erro ao processar:", error);
  }
}
