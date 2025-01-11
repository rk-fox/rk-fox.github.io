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

// Função para carregar dados da planilha Google Sheets
async function loadGoogleSheetData() {
    const sheetId = "1Qj0XBNaI6hihidQV0krraWD2AJr1nDukrFW8DUf_094";
    const sheetName = "Database";
    const range = "C4:AO"; // Inclui coluna C até AO
    const apiKey = "AIzaSyBP12YfPrz9MhCH3J7boeondSm7HYVCUvA"; // Substitua pela sua API Key

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!${range}?key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.values) {
            console.error("Nenhum dado encontrado na planilha.");
            return [];
        }

        return data.values;
    } catch (error) {
        console.error("Erro ao carregar dados da planilha:", error);
        return [];
    }
}

// Função para processar os dados e preencher os dropdowns
async function populateDropdowns() {
    const sheetData = await loadGoogleSheetData();

    if (sheetData.length === 0) return;

    const names = [];
    const classifications = new Set(["Comum"]); // Inicia com "Comum"

    sheetData.forEach(row => {
        const name = row[0]; // Coluna C
        if (!name) return;

        names.push(name);

        // Verifica colunas Z a AD e AO para as classificações
        if (row[22]) classifications.add("Incomum");   // Coluna Z
        if (row[23]) classifications.add("Rara");      // Coluna AA
        if (row[24]) classifications.add("Épica");    // Coluna AB
        if (row[25]) classifications.add("Lendária"); // Coluna AC
        if (row[26]) classifications.add("Unreal");   // Coluna AD
        if (row[41]) classifications.add("Legacy");   // Coluna AO
    });

    populateNameDropdown(names);
    populateClassificationDropdown([...classifications]);
}

// Preenche o dropdown de nomes com filtro
function populateNameDropdown(names) {
    const nameDropdown = document.getElementById("name-dropdown");
    nameDropdown.innerHTML = ""; // Limpa o dropdown

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Filtrar nomes...";
    input.className = "filter-input";
    nameDropdown.appendChild(input);

    const list = document.createElement("div");
    list.className = "dropdown-list";
    names.forEach(name => {
        const option = document.createElement("div");
        option.className = "dropdown-item";
        option.textContent = name;
        option.onclick = () => selectName(name);
        list.appendChild(option);
    });
    nameDropdown.appendChild(list);

    input.addEventListener("input", () => {
        const filter = input.value.toLowerCase();
        const items = list.querySelectorAll(".dropdown-item");
        items.forEach(item => {
            if (item.textContent.toLowerCase().includes(filter)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });
}

// Preenche o dropdown de classificações
function populateClassificationDropdown(classifications) {
    const classificationDropdown = document.getElementById("classification-dropdown");
    classificationDropdown.innerHTML = ""; // Limpa o dropdown

    classifications.forEach(classification => {
        const option = document.createElement("option");
        option.value = classification;
        option.textContent = classification;
        classificationDropdown.appendChild(option);
    });
}

// Ação ao selecionar um nome
function selectName(name) {
    console.log("Nome selecionado:", name);
    // Aqui você pode adicionar a lógica para quando um nome for selecionado
}

// Inicializa o script ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    populateDropdowns();
});
