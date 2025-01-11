let result = [];

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
        result = data.values.map(row => [
            row[0], 
            row[1],  
            row[2], 
            row[23],
            row[28],
            row[24], 
            row[29],
            row[25], 
            row[30],
            row[26], 
            row[31],
            row[27],
            row[32],
            row[38],
            row[39],
        ]);

        // Exibindo o resultado no console
        console.log(result);

        // Chama a função para preencher os dropdowns após o carregamento de dados
        populateDropdowns();

    } catch (error) {
        console.error("Erro ao carregar dados da planilha:", error);
    }
}

// Função para processar os dados e preencher os dropdowns
function populateDropdowns() {
    if (result.length === 0) return; // Verifica se result está vazio

    const miners = result.map(row => {
        const name = row[0]; // Nome
        if (!name) return null;

        const classifications = ["Comum"]; // Começa com "Comum" para todos

        // Verifica as classificações específicas e adiciona ao array de classificações
        if (row[3] !== "-") classifications.push("Incomum");   // Coluna Z
        if (row[5] !== "-") classifications.push("Rara");      // Coluna AA
        if (row[7] !== "-") classifications.push("Épica");     // Coluna AB
        if (row[9] !== "-") classifications.push("Lendária");  // Coluna AC
        if (row[11] !== "-") classifications.push("Unreal");   // Coluna AD
        if (row[13] !== "-") classifications.push("Legacy");   // Coluna AO

        return { name, classifications };
    }).filter(miner => miner !== null);

    // Preenche o dropdown de nomes
    populateNameDropdown(miners);

    // Adiciona o evento de mudança no nome da miner
    const nameDropdown = document.getElementById("name-dropdown");
    nameDropdown.addEventListener("change", (event) => {
        const selectedMinerName = event.target.value;
        const selectedMiner = miners.find(miner => miner.name === selectedMinerName);

        if (selectedMiner) {
            populateClassificationDropdown(selectedMiner.classifications);
        }
    });
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
    loadGoogleSheetData(); // Agora chama loadGoogleSheetData que por sua vez chama populateDropdowns
});
