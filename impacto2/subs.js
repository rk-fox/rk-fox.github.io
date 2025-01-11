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
async function populateDropdowns() {
    if (result.length === 0) return; // Verifica se result está vazio

    // Preenche o dropdown de nomes
    populateNameDropdown(result);

    // Adiciona o evento de mudança no nome da miner
    const nameDropdown = document.getElementById("name-dropdown");
    nameDropdown.addEventListener("change", (event) => {
        const selectedMinerName = event.target.value;

        // Encontra o miner selecionado no array result
        const selectedMinerRow = result.find(row => row[0] === selectedMinerName); // row[0] contém o nome

        if (selectedMinerRow) {
            const classifications = ["Comum"]; // Começa com "Comum" para todos

            // Verifica as classificações específicas e adiciona ao array de classificações
if (selectedMinerRow[3] !== "-" && selectedMinerRow[3] !== "#N/A") classifications.push("Incomum");   // Coluna Z
if (selectedMinerRow[5] !== "-" && selectedMinerRow[5] !== "#N/A") classifications.push("Rara");      // Coluna AA
if (selectedMinerRow[7] !== "-" && selectedMinerRow[7] !== "#N/A") classifications.push("Épica");     // Coluna AB
if (selectedMinerRow[9] !== "-" && selectedMinerRow[9] !== "#N/A") classifications.push("Lendária");  // Coluna AC
if (selectedMinerRow[11] !== "-" && selectedMinerRow[11] !== "#N/A") classifications.push("Unreal");   // Coluna AD
if (selectedMinerRow[13] !== "-" && selectedMinerRow[13] !== "#N/A") classifications.push("Legacy");   // Coluna AO


            // Preenche o dropdown de classificações
            populateClassificationDropdown(classifications);
        }
    });
}

// Preenche o dropdown de nomes com filtro usando input e datalist
function populateNameDropdown(result) {
    const nameDropdown = document.getElementById("name-dropdown");
    nameDropdown.innerHTML = ""; // Limpa o dropdown

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Filtrar nomes...";
    input.className = "filter-input";
    nameDropdown.appendChild(input);

    const datalist = document.createElement("datalist");
    datalist.id = "names-list";
    result.forEach(row => {
        const name = row[0]; // Nome
        if (name) {
            const option = document.createElement("option");
            option.value = name;
            datalist.appendChild(option);
        }
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

// Função para limpar o campo de texto quando clicado
function clearInputOnClick() {
    const input = document.querySelector('.filter-input');
    
    // Adiciona um evento de clique que limpa o texto
    input.addEventListener('click', () => {
        input.value = ''; // Limpa o conteúdo do campo de texto
    });
}

// Chama a função assim que a página for carregada
document.addEventListener("DOMContentLoaded", clearInputOnClick);

// Inicializa o script ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    loadGoogleSheetData(); // Agora chama loadGoogleSheetData que por sua vez chama populateDropdowns
});
