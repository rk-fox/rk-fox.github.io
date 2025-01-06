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
    const fieldContent = document.getElementById("field2").value.trim();

    if (!fieldContent) {
      console.error("O campo field2 está vazio.");
      return;
    }

    const parts = fieldContent.split(/open\s*/);
    const resultArray = [];

    // Processa cada parte do conteúdo
    parts.forEach((part, index) => {
      let currentPart = part.trim();
      if (!currentPart) return;

      // Adiciona prefixo "Level 0" se necessário
      if (index === 0 && !/^\d/.test(currentPart)) {
        currentPart = "Level 0 " + currentPart;
      }

      const setCount = (currentPart.match(/Set/g) || []).length;
      if (setCount === 1) {
        currentPart = currentPart.replace(/(Set)(.*?)(Size:)/, "$1 0 $2 $3");
      }

      resultArray.push(currentPart);
    });

    // Combina as partes e remove texto irrelevante
    let cleanedField2 = resultArray.join(" open ");
    cleanedField2 = cleanedField2.replace(/(set badge|Cells|Miner details|open)/gi, "").trim();
    cleanedField2 = cleanedField2.replace(/\s+/g, " ").trim();

    console.log("Texto limpo:", cleanedField2);

    // Regex para capturar dados dos miners
    const minerRegex = /Level\s+(\d+)\s+([A-Za-z0-9\s\-\']+?)\s+Set\s+([A-Za-z0-9\s\-\']+?)\s+Size:\s+(\d+)\s+Power\s+([\d.,]+)\s+(Th\/s|Ph\/s|Gh\/s|Eh\/s)\s+Bonus\s+([\d.]+)\s+%\s+Quantity:\s+(\d+)\s+(Can(?:'t)?\sbe\sSold)/gm;

    const fieldArray = [];
    let match;

    // Processa cada correspondência na regex
    while ((match = minerRegex.exec(cleanedField2)) !== null) {
      let power = parseFloat(match[5].replace(',', '.'));
      const unit = match[6];

      // Converte unidades para Gh/s
      if (unit === "Eh/s") power *= 1e9;
      else if (unit === "Ph/s") power *= 1e6;
      else if (unit === "Th/s") power *= 1e3;

      const minerData = {
        Level: parseInt(match[1]),
        Nome: match[2].trim(),
        Set: match[3].trim(),
        Size: parseInt(match[4]),
        Power: Math.round(power),
        Bonus: parseFloat(match[7]),
        Quantity: parseInt(match[8]),
        CanBeSold: match[9].trim()
      };

      fieldArray.push(minerData);
    }

    console.log("Inventário:", fieldArray);
    if (fieldArray.length === 0) {
      console.warn("Nenhum miner foi capturado. Verifique o texto de entrada e a regex.");
    }

  } catch (error) {
    console.error("Erro ao processar:", error);
  }
}
