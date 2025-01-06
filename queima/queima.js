// Adiciona um único evento keydown para ambos os campos
document.querySelectorAll("#field1, #field2").forEach(function (field) {
  field.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      organizar(); // Chama a função organizar quando ENTER for pressionado
    }
  });
});

async function organizar() {
 
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

    cleanedField2 = cleanedField2
      .replace(/\s+/g, " ") // Substituir múltiplos espaços por um único espaço
      .replace(/\r?\n|\r/g, "") // Remover quebras de linha
      .trim();
    console.log(cleanedField2);

    const minerRegex = /Level\s+(\d+)\s+([A-Za-z0-9\s\-\']+?)\s+Set\s+([A-Za-z0-9\s\-\']+?)\s+Size:\s+(\d+)\s+Power\s+([\d.,]+)\s+(Th\/s|Ph\/s|Gh\/s|Eh\/s)\s+Bonus\s+([\d.]+)\s+%\s+Quantity:\s+(\d+)\s+(Can(?:'t)?\sbe\sSold)/gm;
    // Inicializa o array para armazenar as entradas processadas
let fieldArray = [];

let match;

// Procura as entradas no texto com o regex
while ((match = minerRegex.exec(cleanedField2)) !== null) {
    // Variáveis para armazenar os dados extraídos
    let power = parseFloat(match[5].replace(',', '.')); // Power convertido para número
    let unit = match[6]; // Unidade de Power (Th/s, Ph/s, Gh/s, Eh/s)

  // Conversão de unidades
  if (unit === "Eh/s") power *= 1e9;
  else if (unit === "Ph/s") power *= 1e6;
  else if (unit === "Th/s") power *= 1e3;

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
console.log("Inventário:", fieldArray);
    
  } catch (error) {
    console.error("Erro ao processar:", error);
  }
}
