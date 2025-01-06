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



    // Combina as partes e remove texto irrelevante
    let cleanedField2 = resultArray.join(" open ");
    cleanedField2 = cleanedField2.replace(/(set badge|Cells|Miner details|open)/g, '').trim();
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

console.log("teste:", match[1], match[2], match[3], match[4], match[5], match[6], match[7], match[8], match[9]);

      
      
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
