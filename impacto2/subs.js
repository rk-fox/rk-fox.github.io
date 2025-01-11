// Função para abrir o popup
function openPopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "flex"; // Exibe o popup
}

// Função para fechar o popup
function closePopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none"; // Oculta o popup
}

// Adiciona o evento de clique para as imagens com a classe "popup-trigger"
document.querySelectorAll(".popup-trigger").forEach(item => {
    item.addEventListener("click", openPopup);
});

async function loadGoogleSheetData() {
    const sheetId = "1Qj0XBNaI6hihidQV0krraWD2AJr1nDukrFW8DUf_094";
    const sheetName = "Database";
    const range = "C4:AP"; // Inclui as colunas C até AP
    const apiKey = "AIzaSyBP12YfPrz9MhCH3J7boeondSm7HYVCUvA"; // Substitua pela sua API Key

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!${range}?key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.values) {
            console.error("Nenhum dado encontrado na planilha.");
            return [];
        }

        // Extraímos apenas as colunas desejadas e exibimos o resultado
        const result = data.values.map(row => [
            row[0],  // Nome (Coluna C)
            row[1],  // PComum (Coluna D)
            row[2],  // BComum (Coluna E)
            row[22], // PIncomum (Coluna Z)
            row[23], // BIncomum (Coluna AA)
            row[24], // PRara (Coluna AB)
            row[25], // BRara (Coluna AC)
            row[26], // PEpica (Coluna AD)
            row[27], // BEpica (Coluna AE)
            row[28], // PUnreal (Coluna AF)
            row[29], // BUnreal (Coluna AG)
            row[30], // PLegacy (Coluna AH)
            row[31], // BLegacy (Coluna AI)
        ]);

        // Exibindo o resultado no console
        console.log(result);

        return result;
    } catch (error) {
        console.error("Erro ao carregar dados da planilha:", error);
        return [];
    }
}

// Função para processar os dados e preencher os dropdowns
async function populateDropdowns() {
    const sheetData = await loadGoogleSheetData();

    if (sheetData.length === 0) return;

    const miners = [];
    const allClassifications = new Set(["Comum"]); // Inicia com "Comum"

    // Processa cada miner e suas classificações
    sheetData.forEach(row => {
        const name = row[0]; // Coluna C
        if (!name) return;

        const classifications = new Set(["Comum"]); // Começa com "Comum" para todos

        // Verifica as colunas de classificações específicas para cada miner
        if (row[22]) classifications.add("Incomum");   // Coluna Z
        if (row[23]) classifications.add("Rara");      // Coluna AA
        if (row[24]) classifications.add("Épica");     // Coluna AB
        if (row[25]) classifications.add("Lendária");  // Coluna AC
        if (row[26]) classifications.add("Unreal");    // Coluna AD
        if (row[41]) classifications.add("Legacy");    // Coluna AO

        miners.push({ name, classifications: [...classifications] });
    });

    populateNameDropdown(miners);
}

// Preenche o dropdown de nomes com filtro usando input e datalist
function populateNameDropdown(miners) {
    const nameDropdown = document.getElementById("name-dropdown");
    nameDropdown.innerHTML = ""; // Limpa o dropdown

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Filtrar nomes...";
    input.className = "filter-input";
    nameDropdown.appendChild(input);

    const datalist = document.createElement("datalist");
    datalist.id = "names-list";
    miners.forEach(miner => {
        const option = document.createElement("option");
        option.value = miner.name;
        datalist.appendChild(option);
    });
    nameDropdown.appendChild(datalist);

    input.setAttribute("list", "names-list"); // Associa o datalist ao input

    input.addEventListener("input", () => {
        const filter = input.value.toLowerCase();
        const options = datalist.querySelectorAll("option");
        options.forEach(option => {
            if (option.value.toLowerCase().includes(filter)) {
                option.style.display = "block";
            } else {
                option.style.display = "none";
            }
        });
    });

    input.addEventListener("change", () => {
        const selectedMiner = miners.find(miner => miner.name === input.value);
        if (selectedMiner) {
            populateClassificationDropdown(selectedMiner.classifications);
        }
    });
}

// Preenche o dropdown de classificações com as classificações da miner selecionada
function populateClassificationDropdown(classifications) {
    const classificationDropdown = document.getElementById("classification-dropdown");
    classificationDropdown.innerHTML = ""; // Limpa o dropdown

    // Adiciona as opções de classificação disponíveis para a miner selecionada
    classifications.forEach(classification => {
        const option = document.createElement("option");
        option.value = classification;
        option.textContent = classification;
        classificationDropdown.appendChild(option);
    });
}

// Inicializa o script ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    populateDropdowns();
});

