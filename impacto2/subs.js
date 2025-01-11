let result = [];

function openPopup(event) {
    const popup = document.getElementById("popup");
    popup.style.display = "flex"; // Exibe o popup

    // Identifica qual imagem foi clicada
    const clickedImage = event.target; // Obtem a imagem clicada
    let imageId = clickedImage.id;

    // Remove os 3 primeiros caracteres de imageId
    imageId = imageId.substring(3);

    // Atualiza o conteúdo de #popup-left
    const popupLeft = document.getElementById("popup-left");
    if (popupLeft) {
    // Copia os dados existentes da página para preencher o popup
        const imgSrc = document.getElementById(`img${imageId}`)?.src || "";
        const nomeText = document.getElementById(`nome${imageId}`)?.innerText || "N/A";
        const poderText = document.getElementById(`poder${imageId}`)?.innerText || "N/A";
        const bonusText = document.getElementById(`bonus${imageId}`)?.innerText || "N/A";
        const impactText = document.getElementById(`impact${imageId}`)?.innerText || "N/A";
    // Preenche o popup com os dados extraídos
        popupLeft.innerHTML = `
            <table>
                <tbody>
                    <tr>
                        <td>Miner:</td>
                        <td>
                            <div>
                                <img src="${imgSrc}" style="margin: auto; width: 120px; height: auto;">
                            </div>
                            <div>
                                <span style="margin-top: 2px;">${nomeText}</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Poder:</td>
                        <td style="font-weight: bold">${poderText}</td>
                    </tr>
                    <tr>
                        <td>Bônus:</td>
                        <td style="font-weight: bold">${bonusText}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold">Impacto Total:</td>
                        <td style="font-weight: bold">${impactText}</td>
                    </tr>
                </tbody>
            </table>
        `;
    }
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
            const classifications = []; // Começa com "Comum" para todos

            // Verifica as classificações específicas e adiciona ao array de classificações
if (selectedMinerRow[1] !== "-" && selectedMinerRow[3] !== "#N/A") classifications.push("Comum");   // Começa com "Comum" para todos
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

    // Cria o rótulo "Miner:"
    const minerLabel = document.createElement("label");
    minerLabel.innerText = "Miner:";  // Definindo o texto "Miner:"
    minerLabel.style.display = "block";  // Garante que "Miner:" fique em uma linha separada
    nameDropdown.appendChild(minerLabel);  // Adiciona o rótulo ao dropdown

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Filtrar nomes...";
    input.className = "filter-input";
    nameDropdown.appendChild(input);

    // Cria o rótulo "Level:"
    const levelLabel = document.createElement("label");
    levelLabel.innerText = "Level:";  // Definindo o texto "Level:"
    levelLabel.style.display = "block";  // Garante que "Level:" fique em uma linha separada
    nameDropdown.appendChild(levelLabel);  // Adiciona o rótulo "Level:" ao dropdown

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

// Adiciona o evento de mudança para a classificação
const classificationDropdown = document.getElementById("classification-dropdown");
classificationDropdown.addEventListener("change", updateNewContent);


function updateNewContent() {
    const nameDropdown = document.getElementById("name-dropdown");
    const classificationDropdown = document.getElementById("classification-dropdown");
    const newDiv = document.getElementById("new");

    // Obter valores selecionados
    const selectedName = nameDropdown.querySelector("input")?.value;
    const selectedClassification = classificationDropdown.value;

    if (!selectedName || !selectedClassification) {
        newDiv.innerHTML = "<p>Selecione um nome e uma classificação.</p>";
        return;
    }

    // Encontrar a linha correspondente no array result
    const selectedMinerRow = result.find(row => row[0] === selectedName);

    if (!selectedMinerRow) {
        newDiv.innerHTML = "<p>Miner não encontrado nos dados.</p>";
        return;
    }

    // Mapear as classificações para os índices corretos
    const classificationMap = {
        "Comum": [0, 1, 2],
        "Incomum": [0, 3, 4],
        "Rara": [0, 5, 6],
        "Épica": [0, 7, 8],
        "Lendária": [0, 9, 10],
        "Unreal": [0, 11, 12],
        "Legacy": [0, 13, 14]
    };

    const indices = classificationMap[selectedClassification];
    if (!indices) {
        newDiv.innerHTML = "<p>Classificação inválida.</p>";
        return;
    }
    
    const nameText = selectedMinerRow[indices[0]] || "N/A";
    const poderText = selectedMinerRow[indices[1]] || "N/A";
    const bonusText = selectedMinerRow[indices[1]] || "N/A";

    // Atualizar o conteúdo do elemento "new"
    newDiv.innerHTML = `
        <table>
            <tbody>
                <tr>
                    <td>Miner:</td>
                    <td>${selectedClassification} ${nameText}</td>
                </tr>
                <tr>
                    <td>Poder:</td>
                    <td>${poderText}</td>
                </tr>
                <tr>
                    <td>Bônus:</td>
                    <td>${bonusText}</td>
                </tr>
            </tbody>
        </table>
    `;
}


// Função para limpar o campo de texto quando clicado
function clearInputOnClick() {
    document.addEventListener('focus', (event) => {
        // Verifica se o elemento focado é o input correto
        if (event.target && event.target.matches('.filter-input')) {
            event.target.value = ''; // Limpa o conteúdo do campo de texto

            // Obtém a referência para a div com id 'new' e limpa o conteúdo
            const newDiv = document.getElementById("new");
            if (newDiv) {
                newDiv.innerHTML = '';
            }
        }
    }, true); // Use captura para garantir que o evento "focus" seja capturado corretamente
}

// Inicializa o script ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    clearInputOnClick(); // Adiciona o evento para limpar o campo de texto
    loadGoogleSheetData(); // Agora chama loadGoogleSheetData que por sua vez chama populateDropdowns
});
