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
    const minerRegex = /Level (?<level>\d+) (?<name>.+?) Set (?<set>.+?) Size: (?<size>\d+) Power (?<power>[\d.,]+)\s?(?<unit>[A-Za-z/]+) Bonus (?<bonus>[\d.,]+) % Quantity: (?<quantity>\d+) (?<canBeSold>Can|Can't) be sold/g;

    let fieldArray = [];
    let match;

    // Itera sobre as correspondências
    while ((match = minerRegex.exec(cleanedField2)) !== null) {
        let { level, name, set, size, power, unit, bonus, quantity, canBeSold } = match.groups;

        // Converte unidades para Gh/s
        power = parseFloat(power.replace(/,/g, ''));
        if (unit === "Eh/s") power *= 1e9;
        else if (unit === "Ph/s") power *= 1e6;
        else if (unit === "Th/s") power *= 1e3;

        // Adiciona o objeto correspondente ao array
        fieldArray.push({
            level: parseInt(level, 10),
            name: name.trim(),
            set: set.trim(),
            size: parseInt(size, 10),
            power,
            unit: "Gh/s",
            bonus: parseFloat(bonus),
            quantity: parseInt(quantity, 10),
            canBeSold: canBeSold === "Can",
        });
    }

    console.log("Inventário:", fieldArray);
    if (fieldArray.length === 0) {
      console.warn("Nenhum miner foi capturado. Verifique o texto de entrada e a regex.");
    }

    return fieldArray;
  } catch (error) {
    console.error("Erro ao processar:", error);
  }
}




    
    // Processa cada correspondência na regex
    //while ((match = minerRegex.exec(cleanedField2)) !== null) {
//      let power = parseFloat(match[5].replace(',', '.'));
      //const unit = match[6];
//
      // Converte unidades para Gh/s
      //if (unit === "Eh/s") power *= 1e9;
      //else if (unit === "Ph/s") power *= 1e6;
      //else if (unit === "Th/s") power *= 1e3;

       // Ajuste para Set: pegar o valor entre os termos "Set" e "Size"
    //let set = match[3].trim();  // O valor de Set está em match[3]

    // Ajuste para Nome: pegar o valor antes do termo "Set"
    //let nome = match[2].trim(); // O valor de Nome está em match[2]

      // Cada entrada é capturada e organizada no formato desejado
    //let minerData = {
        //Level: parseInt(match[1]),         // Level
        //Nome: nome,              // Nome (antes de "Set")
        //Set: set,                // Set (entre "Set" e "Size")
        //Size: parseInt(match[4]),          // Size (já capturado em match[4])
        //Power: parseInt(power),            // Power (em Gh/s) com 3 casas decimais
        //Bonus: parseFloat(match[7]), // Bonus
        //Quantity: parseInt(match[8]),       // Quantity
        //CanBeSold: match[9].trim()
      //};
//
      //fieldArray.push(minerData);
    //}


